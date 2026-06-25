import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Pages - Waitlist mode
import WaitlistLanding from './pages/WaitlistLanding';
import Landing from './pages/saved-release/Landing';
import AboutPage from './pages/saved-release/About';
import PricingPageNew from './pages/saved-release/Pricing';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Pages - Keep for existing/internal users
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Success from './pages/Success';
import RateMyPS from './pages/RateMyPS';
import DraftBuilder from './pages/DraftBuilder';
import Blog from './pages/Blog';
import BlogArticle from './pages/BlogArticle';
import Subjects from './pages/Subjects';
import SubjectPage from './pages/SubjectPage';
import Admin from './pages/Admin';

// SAVED FOR RELEASE: Landing, Pricing, About are in src/pages/saved-release/
// When ready to launch, swap WaitlistLanding back to Landing and restore all routes

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { currentUser, resendVerification, reloadUser } = useAuth();
  const [resent, setResent] = React.useState(false);
  const [checking, setChecking] = React.useState(false);
  const [notVerified, setNotVerified] = React.useState(false);
  const [resendError, setResendError] = React.useState('');
  
  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (!currentUser.emailVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{background: '#2b2b2b'}}>
        <div className="max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
            <span className="text-2xl">📧</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Verify your email</h1>
          <p className="text-white/60 text-sm mb-2">We sent a verification link to:</p>
          <p className="text-white font-medium mb-6">{currentUser.email}</p>
          <p className="text-white/50 text-sm mb-2">Click the link in the email to activate your account.</p>
          <div className="px-4 py-2.5 rounded-xl mb-6" style={{background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <p className="text-yellow-300/90 text-sm font-medium">⚠️ Can't find the email? Check your spam or junk folder.</p>
          </div>
          {notVerified && (
            <div className="mb-4 px-4 py-2.5 rounded-xl text-sm text-red-300" style={{background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.2)'}}>
              Email not verified yet. Click the link in your email first.
            </div>
          )}
          {resent && (
            <div className="mb-4 px-4 py-2.5 rounded-xl text-sm text-green-300" style={{background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.2)'}}>
              ✓ Verification email resent! Check your spam/junk folder.
            </div>
          )}
          <div className="flex flex-col gap-3">
            <button 
              onClick={async () => { 
                setChecking(true); 
                setNotVerified(false);
                const verified = await reloadUser(); 
                if (!verified) {
                  setNotVerified(true);
                }
                setChecking(false);
              }} 
              className="px-6 py-3 rounded-xl font-semibold text-white transition-all" 
              style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}
              disabled={checking}
            >
              {checking ? 'Checking...' : "I've verified — let me in"}
            </button>
            <button 
              onClick={async () => { 
                try {
                  setResendError('');
                  await resendVerification(); 
                  setResent(true); 
                } catch (err) {
                  console.error('Resend error:', err);
                  if (err.code === 'auth/too-many-requests') {
                    setResendError('Too many attempts. Please wait a few minutes before trying again.');
                  } else {
                    setResendError('Could not resend email. Please wait a moment and try again.');
                  }
                }
              }} 
              className="px-6 py-3 rounded-xl font-medium text-white/60 hover:text-white/80 transition-colors"
              disabled={resent}
            >
              {resent ? 'Email sent ✓' : 'Resend verification email'}
            </button>
            {resendError && (
              <div className="px-4 py-2.5 rounded-xl text-sm text-red-300" style={{background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.2)'}}>
                {resendError}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return children;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPageNew />} />
              <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* Hidden routes - for existing/internal users only */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/success" element={<Success />} />
      <Route path="/draft-builder" element={<DraftBuilder />} />
              <Route path="/rate-my-ps" element={<RateMyPS />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/subjects/:slug" element={<SubjectPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogArticle />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
