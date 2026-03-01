import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Tier limits per mode
const TIER_LIMITS = {
  free: { ps: 2, interview: 2 },
  ps: { ps: 100, interview: 3 },
  interview: { ps: 3, interview: 100 },
  premium: { ps: -1, interview: -1 }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user profile in Firestore
  async function createUserProfile(user, displayName = '') {
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      email: user.email,
      displayName: displayName || user.displayName || '',
      plan: 'free',
      messagesUsedToday: 0,
      lastMessageDate: new Date().toISOString().split('T')[0],
      createdAt: serverTimestamp(),
      studentProfile: {
        subject: null,
        universities: [],
        activities: []
      }
    };
    
    await setDoc(userRef, userData);
    setStudentProfile(userData.studentProfile);
    return userData;
  }

  // Get user profile from Firestore
  async function getUserProfile(uid) {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      setStudentProfile(data.studentProfile || { subject: null, universities: [], activities: [] });
      return data;
    }
    return null;
  }

  // Update student profile
  async function updateStudentProfile(uid, updates) {
    try {
      const userRef = doc(db, 'users', uid);
      const current = studentProfile || { subject: null, universities: [], activities: [] };
      
      // Merge updates intelligently
      const newProfile = {
        subject: updates.subject || current.subject,
        universities: updates.universities?.length > 0 
          ? [...new Set([...current.universities, ...updates.universities])].slice(0, 10)
          : current.universities,
        activities: updates.activities?.length > 0 
          ? [...new Set([...current.activities, ...updates.activities])].slice(0, 20)
          : current.activities
      };
      
      await updateDoc(userRef, { studentProfile: newProfile });
      setStudentProfile(newProfile);
      return newProfile;
    } catch (err) {
      console.error('Failed to update student profile:', err);
      return null;
    }
  }

  // Save chats to Firebase
  async function saveChatsToFirebase(uid, chats) {
    try {
      const userRef = doc(db, 'users', uid);
      // Keep only last 20 chats to avoid document size limits
      const chatsToSave = chats.slice(0, 20);
      await updateDoc(userRef, { savedChats: chatsToSave });
    } catch (err) {
      console.error('Failed to save chats:', err);
    }
  }

  // Load chats from Firebase
  async function loadChatsFromFirebase(uid) {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data().savedChats || [];
      }
      return [];
    } catch (err) {
      console.error('Failed to load chats:', err);
      return [];
    }
  }

  // Sign up
  async function signup(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    
    // Send verification email with redirect back to our site
    await sendEmailVerification(result.user, {
      url: 'https://myunioffer.com/chat',
      handleCodeInApp: false
    });
    
    const profile = await createUserProfile(result.user, displayName);
    setUserProfile(profile);
    
    return result;
  }

  // Resend verification email
  async function resendVerification() {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      await sendEmailVerification(auth.currentUser, {
        url: 'https://myunioffer.com/chat',
        handleCodeInApp: false
      });
    }
  }

  // Force reload user to check verification status
  async function reloadUser() {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setCurrentUser({...auth.currentUser});
      return auth.currentUser.emailVerified;
    }
    return false;
  }

  // Login
  async function login(email, password) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const profile = await getUserProfile(result.user.uid);
    setUserProfile(profile);
    return result;
  }

  // Logout
  async function logout() {
    setUserProfile(null);
    setStudentProfile(null);
    return signOut(auth);
  }

  // Reset password
  async function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // Check and reset daily messages per mode
  async function checkDailyMessages(uid, mode = 'ps') {
    const today = new Date().toISOString().split('T')[0];
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      const plan = data.plan || 'free';
      const tierLimits = TIER_LIMITS[plan] || { ps: 3, interview: 3 };
      const limit = tierLimits[mode] || 3;
      
      const modeKey = `messagesUsed_${mode}`;
      
      // Reset if new day
      if (data.lastMessageDate !== today) {
        await updateDoc(userRef, {
          messagesUsed_ps: 0,
          messagesUsed_interview: 0,
          lastMessageDate: today
        });
        return { used: 0, limit, canSend: true };
      }
      
      const used = data[modeKey] || 0;
      return { used, limit, canSend: limit === -1 || used < limit };
    }
    
    return { used: 0, limit: 3, canSend: true };
  }

  // Increment message count per mode
  async function incrementMessageCount(uid, mode = 'ps') {
    const today = new Date().toISOString().split('T')[0];
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    const modeKey = `messagesUsed_${mode}`;
    
    if (userSnap.exists()) {
      const data = userSnap.data();
      const currentCount = data.lastMessageDate === today ? (data[modeKey] || 0) : 0;
      
      await updateDoc(userRef, {
        [modeKey]: currentCount + 1,
        lastMessageDate: today
      });
    }
  }

  // Update user plan
  async function updateUserPlan(uid, plan, customerId, subscriptionId) {
    const userRef = doc(db, 'users', uid);
    const updates = { plan };
    if (customerId) updates.stripeCustomerId = customerId;
    if (subscriptionId) updates.stripeSubscriptionId = subscriptionId;
    await updateDoc(userRef, updates);
    setUserProfile(prev => ({ ...prev, plan, stripeCustomerId: customerId || prev?.stripeCustomerId, stripeSubscriptionId: subscriptionId || prev?.stripeSubscriptionId }));
  }

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        let profile = await getUserProfile(user.uid);
        if (!profile) {
          profile = await createUserProfile(user);
        }
        setUserProfile(profile);
      } else {
        setUserProfile(null);
        setStudentProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    studentProfile,
    signup,
    login,
    logout,
    resetPassword,
    resendVerification,
    reloadUser,
    checkDailyMessages,
    incrementMessageCount,
    updateUserPlan,
    updateStudentProfile,
    saveChatsToFirebase,
    loadChatsFromFirebase
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
