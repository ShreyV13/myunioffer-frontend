import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../contexts/AuthContext';
import { 
  GraduationCap, 
  Send, 
  Settings, 
  LogOut, 
  Plus, 
  User,
  Sparkles,
  FileText,
  MessageSquare,
  Menu,
  X,
  Crown,
  Trash2,
  AlertCircle,
  RefreshCw,
  Zap,
  Star,
  ChevronDown
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const chatsRef = useRef([]);
  const wordQueueRef = useRef([]);
  const smoothTextRef = useRef('');
  const smoothAgentRef = useRef('');
  const smoothSubjRef = useRef(null);

  // Smooth streaming: drain word queue at fixed rate
  useEffect(() => {
    const interval = setInterval(() => {
      if (wordQueueRef.current.length > 0) {
        // Take up to 2 words per tick for natural pacing
        const batch = wordQueueRef.current.splice(0, 1);
        smoothTextRef.current += batch.join('');
        setMessages(prev => {
          const updated = [...prev];
          if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
            updated[updated.length - 1] = {
              role: 'assistant',
              content: smoothTextRef.current,
              agent: smoothAgentRef.current,
              detectedSubject: smoothSubjRef.current
            };
          }
          return updated;
        });
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  const [currentChatId, setCurrentChatId] = useState(null);
  const [thinking, setThinking] = useState(false);
  const [showInputMenu, setShowInputMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverWaking, setServerWaking] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('ps');
  const draftBuilderShownRef = useRef(false);
  const subjectChipLockedRef = useRef(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [subjectInput, setSubjectInput] = useState("");



  function handleSubjectChipSelect(subj) {
    if (subj.trim()) { setUserSubject(subj.trim()); if (currentUser) updateStudentProfile(currentUser.uid, { subject: subj.trim() }); }
    subjectChipLockedRef.current = true;
    setShowSubjectDropdown(false);
  }
  const [usage, setUsage] = useState({ used: 0, limit: 3 });
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sessionId, setSessionId] = useState(() => 'session_' + Math.random().toString(36).substr(2, 9));
  const [userSubject, setUserSubject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [showToolsGate, setShowToolsGate] = useState(false);

  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const activeChatRef = useRef(null);
  
  const { currentUser, userProfile, studentProfile, logout, checkDailyMessages, incrementMessageCount, updateStudentProfile, saveChatsToFirebase, loadChatsFromFirebase } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Read subject from URL param (from subject pages)
  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    if (subjectParam && !userSubject && !subjectChipLockedRef.current) {
      const formatted = subjectParam.charAt(0).toUpperCase() + subjectParam.slice(1);
      setUserSubject(formatted);
      if (currentUser) updateStudentProfile(currentUser.uid, { subject: formatted });
    }
  }, [searchParams]);

  // Security: check if account is blocked
  if (userProfile?.securityStatus === 'blocked') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 className="text-white text-xl font-display font-bold mb-2">Account suspended</h2>
          <p className="text-gray-400 text-sm mb-6">Your account has been suspended by our automated security system due to repeated policy violations. If you believe this is an error, contact <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:underline">support@myunioffer.com</a></p>
        </div>
      </div>
    );
  }
  if (userProfile?.securityStatus === 'restricted') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 className="text-white text-xl font-display font-bold mb-2">Account temporarily restricted</h2>
          <p className="text-gray-400 text-sm mb-6">Your account has been temporarily restricted by our automated security system. You'll be able to use myunioffer again in 24 hours. If you believe this is an error, contact <a href="mailto:support@myunioffer.com" className="text-coral-500 hover:underline">support@myunioffer.com</a></p>
        </div>
      </div>
    );
  }

  // CRITICAL: isUnlimited MUST be after useAuth() - DO NOT MOVE THIS
  const isUnlimited = userProfile?.plan === 'premium';

  // Load userSubject from studentProfile when it changes
  useEffect(() => {
    if (studentProfile?.subject && !userSubject && !subjectChipLockedRef.current) {
      setUserSubject(studentProfile.subject);
    }
  }, [studentProfile]);

  // Load chats from Firebase (only once when user logs in)
  const chatsLoadedRef = useRef(false);
  useEffect(() => {
    async function loadChats() {
      if (currentUser && loadChatsFromFirebase && !chatsLoadedRef.current) {
        chatsLoadedRef.current = true;
        try {
          const savedChats = await loadChatsFromFirebase(currentUser.uid);
          if (savedChats && savedChats.length > 0) {
            setChats(savedChats);
          }
        } catch (err) {
          console.error('Failed to load chats:', err);
        }
      }
    }
    loadChats();
  }, [currentUser, loadChatsFromFirebase]);

  // Keep chatsRef in sync
  useEffect(() => { chatsRef.current = chats; }, [chats]);

  // Save chats to Firebase whenever chats change (debounced)
  useEffect(() => {
    if (currentUser && chats.length > 0 && saveChatsToFirebase) {
      const timeout = setTimeout(() => {
        saveChatsToFirebase(currentUser.uid, chats);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [chats, currentUser, saveChatsToFirebase]);

  // Save messages to current chat whenever messages change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      setChats(prev => prev.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages: messages, updatedAt: new Date().toISOString() }
          : chat
      ));
    }
  }, [messages, currentChatId]);

  // Force save when streaming finishes (loading goes from true to false)
  // Uses ref to always get latest chats, small delay ensures sync has completed
  useEffect(() => {
    if (!loading && currentUser && chatsRef.current.length > 0 && saveChatsToFirebase) {
      const timeout = setTimeout(() => {
        saveChatsToFirebase(currentUser.uid, chatsRef.current);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Refocus input after AI finishes responding
  useEffect(() => {
    if (!loading) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [loading]);

  // Check daily messages per mode
  useEffect(() => {
    async function checkMessages() {
      if (currentUser) {
        const status = await checkDailyMessages(currentUser.uid, mode);
        setUsage({ used: status.used, limit: status.limit });
      }
    }
    checkMessages();
  }, [currentUser, mode]);

  // Wake up server on load (pre-warm)
  useEffect(() => {
    // Ping health endpoint to wake server
    const wakeServer = async () => {
      try {
        await fetch(`${API_BASE}/health`);
        console.log('Server is awake');
      } catch (e) {
        // Retry after 2 seconds if first ping fails
        setTimeout(async () => {
          try {
            await fetch(`${API_BASE}/health`);
          } catch (e2) {
            console.log('Server still waking...');
          }
        }, 2000);
      }
    };
    wakeServer();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
  }

  // Draft Builder recommendation sentences (rotated randomly)
  const DRAFT_BUILDER_SENTENCES = [
    "\n\nIf you want to turn everything we've discussed into a structured first draft across the three UCAS sections, [try the Draft Builder](/draft-builder).",
    "\n\nWhen you're ready to put this all together, the [Draft Builder](/draft-builder) can lay out your material across the three UCAS sections for you.",
    "\n\nI'm an advisory coach, so I can't write it for you, but the [Draft Builder](/draft-builder) can take what we've discussed and structure it across your three sections.",
    "\n\nOnce you've got your opening sentences down, the [Draft Builder](/draft-builder) can help you organise everything else into the three UCAS sections.",
    "\n\nIf you want a structured scaffold to work from, the [Draft Builder](/draft-builder) takes your material and lays it out across all three UCAS sections.",
    "\n\nReady to start putting it all together? The [Draft Builder](/draft-builder) can structure everything we've covered into the three UCAS sections for you."
  ];

  const WRITING_TRIGGERS = [
    "help me start", "help me write", "can we write", "how do i begin",
    "how do i start", "how should i start", "start writing", "begin writing",
    "write my", "draft my", "structure my", "how should i structure",
    "what should i write", "where do i start writing", "ready to write",
    "start my statement", "start on my ps", "start my ps", "begin my ps",
    "help me with my statement", "put it together", "how do i put this together",
    "how should i open", "how do i open", "help me begin", "just start",
    "can we start", "let's start writing", "lets start writing",
    "how's the best way", "best way to start", "what's the best way"
  ];

  function shouldShowDraftBuilder(userMsg, msgCount) {
    if (draftBuilderShownRef.current) return false;
    if (msgCount < 5) return false;
    const lower = userMsg.toLowerCase();
    return WRITING_TRIGGERS.some(trigger => lower.includes(trigger));
  }

  function getDraftBuilderSentence() {
    draftBuilderShownRef.current = true;
    return DRAFT_BUILDER_SENTENCES[Math.floor(Math.random() * DRAFT_BUILDER_SENTENCES.length)];
  }

    async function sendMessage(text) {
    if (!text || loading) return;

    setError(null);

    // Check if user can send message
    if (!isUnlimited && usage.used >= usage.limit) {
      const plan = userProfile?.plan || 'free';
      let upgradeMsg;
      if (plan === 'free') {
        upgradeMsg = "You've used your free messages for today. Come back tomorrow, or upgrade for more.";
      } else if (plan === 'ps' && mode === 'interview') {
        upgradeMsg = "Interview prep isn't included in your plan. Upgrade to Premium for both PS and Interview coaching!";
      } else if (plan === 'interview' && mode === 'ps') {
        upgradeMsg = "PS coaching isn't included in your plan. Upgrade to Premium for both PS and Interview coaching!";
      } else {
        upgradeMsg = "You've reached your daily limit. Upgrade for more messages!";
      }
      setMessages(prev => [...prev, {
        role: 'system',
        content: upgradeMsg
      }]);
      return;
    }

    const userMessage = text;
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Create or update chat
    const chatTitle = userMessage.slice(0, 40) + (userMessage.length > 40 ? '...' : '');
    if (!currentChatId) {
      const newChatId = 'chat_' + Date.now();
      draftBuilderShownRef.current = false;
      subjectChipLockedRef.current = false;
      setCurrentChatId(newChatId);
      activeChatRef.current = newChatId;
      setChats(prev => [{
        id: newChatId,
        title: chatTitle,
        mode: mode,
        sessionId: sessionId,
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }, ...prev]);
    }

    // Show "waking up" message after 5 seconds
    const wakingTimeout = setTimeout(() => {
      setServerWaking(true);
    }, 5000);

    try {
      const res = await fetch(`${API_BASE}/chat-stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          mode: mode,
          session_id: sessionId,
          user_id: currentUser.uid,
          tier: userProfile?.plan || 'free',
          subject: userSubject,
          student_profile: studentProfile,
          thinking: thinking
        })
      });

      clearTimeout(wakingTimeout);
      setServerWaking(false);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        if (res.status === 429 && errData.detail?.upgrade_message) {
          setMessages(prev => [...prev, { role: 'system', content: errData.detail.upgrade_message }]);
          setLoading(false);
          return;
        }
        throw new Error('Server error');
      }

      // Check if response is JSON (easter egg) instead of SSE stream
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.response && data.response.includes('---EASTER_EGG_DELAY---')) {
          const parts = data.response.split('\n\n---EASTER_EGG_DELAY---\n\n');
          setMessages(prev => [...prev, { role: 'assistant', content: parts[0], agent: 'myunioffer Personal Mode' }]);
          setLoading(false);
          await new Promise(resolve => setTimeout(resolve, 15000));
          setMessages(prev => [...prev, { role: 'assistant', content: parts[1], agent: 'myunioffer Personal Mode' }]);
          inputRef.current?.focus();
          return;
        }
        setMessages(prev => [...prev, { role: 'assistant', content: data.response, agent: data.agent || 'myunioffer Personal Mode' }]);
        setLoading(false);
        inputRef.current?.focus();
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let streamedText = '';
      let agentName = '';
      let detectedSubj = null;

      // Add empty assistant message that we'll update
      smoothTextRef.current = '';
      wordQueueRef.current = [];
      setMessages(prev => [...prev, { role: 'assistant', content: '', agent: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.type === 'meta') {
                agentName = data.agent;
                detectedSubj = data.detected_subject;
                smoothAgentRef.current = data.agent || '';
                smoothSubjRef.current = data.detected_subject;
                if ((detectedSubj || data.detected_category) && !subjectChipLockedRef.current) {
                  // Subject locking: only set subject if not already set
                  const subject = detectedSubj || data.detected_category;
                  if (subj.trim()) { setUserSubject(subj.trim()); if (currentUser) updateStudentProfile(currentUser.uid, { subject: subj.trim() }); } subjectChipLockedRef.current = true;
                  await updateStudentProfile(currentUser.uid, { subject });
                }
              } else if (data.type === 'token') {
                // Check for easter egg delay marker
                if (data.text.includes('---EASTER_EGG_DELAY---')) {
                  // Clean up the first message (remove any trailing whitespace/newlines before marker)
                  const cleanFirst = streamedText.replace(/\n*$/, '');
                  setMessages(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                      role: 'assistant',
                      content: cleanFirst,
                      agent: agentName,
                      detectedSubject: detectedSubj
                    };
                    return updated;
                  });
                  // Wait 15 seconds
                  await new Promise(resolve => setTimeout(resolve, 15000));
                  // Start a new message for the final reveal
                  streamedText = '';
                  smoothTextRef.current = '';
                  wordQueueRef.current = [];
                  setMessages(prev => [...prev, { role: 'assistant', content: '', agent: agentName }]);
                } else {
                  streamedText += data.text;
                  // Queue words for smooth display instead of dumping chunks
                  const words = data.text.split(/(?<=\s)/);
                  wordQueueRef.current.push(...words);
                }
              } else if (data.type === 'done') {
                // Wait for word queue to drain smoothly instead of flushing
                while (wordQueueRef.current.length > 0) {
                  await new Promise(r => setTimeout(r, 50));
                }
                // Inject Draft Builder recommendation if appropriate
                const userMsgCount = messages.filter(m => m.role === 'user').length + 1; // +1 for current message not yet in state
                if (shouldShowDraftBuilder(userMessage, userMsgCount)) {
                  const dbSentence = getDraftBuilderSentence();
                  streamedText += dbSentence;
                  smoothTextRef.current += dbSentence;
                  setMessages(prev => {
                    const updated = [...prev];
                    if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
                      updated[updated.length - 1] = { ...updated[updated.length - 1], content: smoothTextRef.current };
                    }
                    return updated;
                  });
                }
                if (data.usage) {
                  setUsage({ used: data.usage.used || 0, limit: data.usage.limit || 3 });
                }
                if (data.profile_updates) {
                  const updates = data.profile_updates;
                  if (updates.subject || updates.universities?.length > 0 || updates.activities?.length > 0) {
                    const cleanUpdates = Object.fromEntries(Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null));
                    if (Object.keys(cleanUpdates).length > 0) await updateStudentProfile(currentUser.uid, cleanUpdates);
                  }
                }
                await incrementMessageCount(currentUser.uid, mode);
              }
            } catch (parseErr) {
              // skip malformed SSE lines
            }
          }
        }
      }

    } catch (err) {
      clearTimeout(wakingTimeout);
      setServerWaking(false);
      console.error(err);
      
      // Fallback to non-streaming endpoint - remove empty streaming message if it exists
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant' && !last.content) return prev.slice(0, -1);
        return prev;
      });
      try {
        const res = await fetch(`${API_BASE}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: userMessage,
            mode: mode,
            session_id: sessionId,
            user_id: currentUser.uid,
            tier: userProfile?.plan || 'free',
            subject: userSubject,
            student_profile: studentProfile
          })
        });
        
        if (res.ok) {
          const data = await res.json();
          
          // Handle easter egg with delayed second message
          if (data.response && data.response.includes('---EASTER_EGG_DELAY---')) {
            const parts = data.response.split('\n\n---EASTER_EGG_DELAY---\n\n');
            setMessages(prev => [...prev, { role: 'assistant', content: parts[0], agent: 'myunioffer Personal Mode' }]);
            setLoading(false);
            // Wait 15 seconds then show the final message
            await new Promise(resolve => setTimeout(resolve, 15000));
            setMessages(prev => [...prev, { role: 'assistant', content: parts[1], agent: 'myunioffer Personal Mode' }]);
            return;
          }
          
          await incrementMessageCount(currentUser.uid, mode);
          if ((data.detected_subject || data.detected_category) && !subjectChipLockedRef.current) {
            setUserSubject(data.detected_subject || data.detected_category);
            await updateStudentProfile(currentUser.uid, { subject: data.detected_subject || data.detected_category });
          }
          setMessages(prev => [...prev, { role: 'assistant', content: data.response, agent: data.agent, detectedSubject: data.detected_subject }]);
          setUsage(prev => ({ ...prev, used: prev.used + 1 }));
        } else {
          throw new Error('Fallback also failed');
        }
      } catch (fallbackErr) {
        setMessages(prev => prev.filter(m => m.content !== ''));
        setError('Couldn\'t connect to the server. Your message was not counted. Please try again.');
      }
    }

    setLoading(false);
    inputRef.current?.focus();
  }

  function handleNewChat() {
    if (loading) return; // Don't create new chat while waiting for response
    setMessages([]);
    setCurrentChatId(null);
    activeChatRef.current = null;
    setSessionId('session_' + Math.random().toString(36).substr(2, 9));
    setError(null);
    setShowSidebar(false);
  }

  function handleSelectChat(chat) {
    if (loading) return; // Don't switch while waiting for response
    setCurrentChatId(chat.id);
    activeChatRef.current = chat.id;
    setMode(chat.mode);
    setSessionId(chat.sessionId || 'session_' + Math.random().toString(36).substr(2, 9));
    setMessages(chat.messages || []);
    setError(null);
    setShowSidebar(false);
  }

  function handleDeleteChat(chatId, e) {
    e.stopPropagation();
    setDeleteConfirm(chatId);
  }

  function confirmDeleteChat() {
    if (!deleteConfirm) return;
    setChats(prev => prev.filter(c => c.id !== deleteConfirm));
    if (currentChatId === deleteConfirm) {
      handleNewChat();
    }
    setDeleteConfirm(null);
  }

  async function handleLogout() {
    try {
      // Clear local state
      setMessages([]);
      setChats([]);
      setCurrentChatId(null);
      setUserSubject(null);
      // Logout from Firebase
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  }

  async function handleSwitchAccount() {
    try {
      setMessages([]);
      setChats([]);
      setCurrentChatId(null);
      setUserSubject(null);
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Failed to switch account:', err);
    }
  }

  const planName = userProfile?.plan === 'premium' ? 'Premium' : 
                   userProfile?.plan === 'ps' ? 'PS Coach' :
                   userProfile?.plan === 'interview' ? 'Interview Prep' : 'Free';

  const recentChats = chats.slice(0, 10);


  return (
    <div className="chat-container flex no-bounce" style={{background: '#2b2b2b'}}>
      {/* Sidebar */}
      <aside className={`hidden md:flex flex-col transition-all duration-200 ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-[260px]'}`} style={{background: '#242424'}}>
        <div className="px-5 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white">
              myuni<span style={{color: '#f96a50'}}>offer</span> <span style={{color: '#666'}}>ai</span>
            </span>
          </Link>
        </div>

        <div className="px-3 mb-1">
          <button onClick={handleNewChat} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/8 rounded-lg transition-colors" style={{border: '1px solid rgba(255,255,255,0.1)'}}>
            <Plus className="w-4 h-4" /> New chat
          </button>
        </div>

        <div className="px-3 mt-3 mb-1">
          <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider px-2 mb-2">Tools</div>
          <Link to="/rate-my-ps" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/70 hover:bg-white/6 transition-colors">
            <Star className="w-3.5 h-3.5" /> Rate My PS
          </Link>
          {isUnlimited ? (
            <Link to="/draft-builder" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/70 hover:bg-white/6 transition-colors">
              <FileText className="w-3.5 h-3.5" /> Draft Builder
            </Link>
          ) : (
            <button onClick={() => setShowToolsGate(true)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/70 hover:bg-white/6 transition-colors text-left">
              <FileText className="w-3.5 h-3.5" /> Draft Builder
              <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded" style={{background: 'rgba(249,106,80,0.15)', color: '#f96a50'}}>PRO</span>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-3 mt-3" style={{WebkitOverflowScrolling: 'touch'}}>
          {recentChats.length === 0 ? (
            <div className="text-xs text-white/40 px-2 py-8 text-center">Your conversations will appear here</div>
          ) : (
            <div className="space-y-0.5">
              <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider px-2 mb-2">Recent</div>
              {recentChats.map(chat => (
                <button key={chat.id} onClick={() => handleSelectChat(chat)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] transition-colors group ${
                    currentChatId === chat.id ? 'bg-white/10 text-white' : 'hover:bg-white/6'
                  }`} style={currentChatId !== chat.id ? {color: '#bbb'} : {}}>
                  <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                  <span className="flex-1 truncate">{chat.title}</span>
                  <button onClick={(e) => handleDeleteChat(chat.id, e)} className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-white/10 rounded transition-all">
                    <Trash2 className="w-3 h-3 text-white/50" />
                  </button>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-3" style={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
          <div className="flex items-center gap-2.5 px-2 py-1.5 mb-2">
            <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-white/60" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium text-white truncate">{userProfile?.displayName || currentUser?.email?.split('@')[0]}</div>
              <div className="text-[11px]" style={{color: '#999'}}>{planName}</div>
            </div>
          </div>
          <div className="space-y-0.5">
            {userProfile?.plan === 'free' && (
              <Link to="/pricing" className="flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/6 rounded-lg transition-colors font-medium" style={{color: '#f96a50'}}>
                <Sparkles className="w-3.5 h-3.5" /> Upgrade plan
              </Link>
            )}
            <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/6 rounded-lg transition-colors" style={{color: '#bbb'}}>
              <Settings className="w-3.5 h-3.5" /> Settings
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/6 rounded-lg transition-colors" style={{color: '#999'}}>
              <LogOut className="w-3.5 h-3.5" /> Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0" style={{background: '#2b2b2b'}}>
        <header className="flex-shrink-0 px-4 py-2.5" style={{borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="hidden md:block p-2 -ml-2 text-white/60 hover:bg-white/8 rounded-lg" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
                <Menu className="w-5 h-5" />
              </button>
              <button className="md:hidden p-2 -ml-2 text-white/60 hover:bg-white/8 rounded-lg" onClick={() => setShowSidebar(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <button onClick={() => { if (window.confirm('Leave the chat and go to the home page?')) { window.location.href = '/'; }}} className="flex items-center gap-1.5 md:hidden">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
                  <GraduationCap className="w-3.5 h-3.5 text-white" />
                </div>
              </button>
            </div>
            <div className="flex p-0.5 rounded-lg bg-white/8">
              {userSubject && (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.35rem",
                    background: "rgba(249,106,80,0.12)", border: "1px solid rgba(249,106,80,0.25)",
                    borderRadius: "0.45rem", padding: "0.3rem 0.7rem",
                    color: "#f96a50", fontSize: "0.75rem", fontWeight: 600,
                    cursor: "pointer", whiteSpace: "nowrap"
                  }}
                >
                  {userSubject}
                  <ChevronDown size={12} />
                </button>
                {showSubjectDropdown && (<>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSubjectDropdown(false)} />
                  <div style={{
                    position: "absolute", top: "100%", left: 0, marginTop: "0.3rem",
                    background: "#1e1e24", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem", padding: "0.4rem", zIndex: 100,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.4)"
                  }}>
                    <input
                      autoFocus
                      type="text"
                      value={subjectInput}
                      onChange={e => setSubjectInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleSubjectChipSelect(subjectInput); }}
                      placeholder="Type your subject..."
                      style={{
                        width: 170, padding: "0.4rem 0.6rem", borderRadius: "0.35rem",
                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff", fontSize: "0.78rem", outline: "none"
                      }}
                    />
                  </div>
                </>)}
              </div>
            )}
            <button onClick={() => setMode('ps')} className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-all ${mode === 'ps' ? 'bg-white/12 text-white' : 'hover:bg-white/6'}`} style={mode !== 'ps' ? {color: '#aaa'} : {}}>
                <span className="hidden sm:inline">Personal Statement</span><span className="sm:hidden">PS</span>
              </button>
              <button onClick={() => setMode('interview')} className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-all ${mode === 'interview' ? 'bg-white/12 text-white' : 'hover:bg-white/6'}`} style={mode !== 'interview' ? {color: '#aaa'} : {}}>
                <span className="hidden sm:inline">Interview Prep</span><span className="sm:hidden">Interview</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              
              <div className="md:hidden relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="p-1.5 hover:bg-white/8 rounded-lg">
                  <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center"><User className="w-3.5 h-3.5 text-white/60" /></div>
                </button>
                {showUserMenu && (<>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-xl shadow-2xl z-20 overflow-hidden" style={{background: '#333', border: '1px solid rgba(255,255,255,0.1)'}}>
                    <div className="p-3" style={{borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
                      <div className="font-medium text-white truncate text-[13px]">{currentUser?.email}</div>
                      <div className="text-[11px] text-white/50 mt-0.5">{planName}</div>
                    </div>
                    <div className="p-1.5">
                      <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/70 hover:bg-white/8 rounded-lg" onClick={() => setShowUserMenu(false)}><Settings className="w-3.5 h-3.5" /> Settings</Link>
                      <Link to="/pricing" className="flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/8 rounded-lg" style={{color: '#f96a50'}} onClick={() => setShowUserMenu(false)}><Sparkles className="w-3.5 h-3.5" /> Upgrade</Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/50 hover:bg-white/8 rounded-lg"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
                    </div>
                  </div>
                </>)}
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto no-bounce" style={{WebkitOverflowScrolling: 'touch'}}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6">
              <div className="max-w-xl w-full text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)', boxShadow: '0 8px 24px rgba(240,122,98,0.2)'}}>
                  <GraduationCap className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                  {mode === 'ps' ? 'What are you applying for?' : 'Ready to practise?'}
                </h1>
                <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed mb-10">
                  {mode === 'ps'
                    ? "Tell me your subject and universities. I'll help you build a statement that's authentically yours."
                    : "Tell me your subject. I'll hit you with real interview questions and coach you through your answers."}
                </p>
                <div className="grid grid-cols-2 gap-2.5 max-w-lg mx-auto">
                  {(mode === 'ps' ? [
                    { text: "Help me start my personal statement", label: "Start my PS" },
                    { text: "Help me figure out what experiences to include in my personal statement", label: "Brainstorm experiences" },
                    { text: "I've got a draft, can you help me improve it?", label: "Review my draft" },
                    { text: "What do admissions tutors actually want to see?", label: "What makes a great PS" },
                    { text: "What supercurriculars should I do for my subject?", label: "Supercurriculars" },
                    { text: "What books, podcasts or courses should I explore for my subject?", label: "Reading & courses" },
                  ] : [
                    { text: "Give me a real interview question", label: "Practise a question" },
                    { text: "Run a full mock interview with me", label: "Mock interview" },
                    { text: "How should I structure my answers?", label: "Answer structures" },
                    { text: "What mistakes do most people make in interviews?", label: "Common mistakes" },
                  ]).map((prompt, i) => (
                    <button key={i} onClick={() => sendMessage(prompt.text)}
                      className="px-4 py-3 rounded-xl text-left hover:bg-white/8 transition-all text-[13px] leading-snug" style={{border: '1px solid rgba(255,255,255,0.12)', color: '#ccc'}}>
                      {prompt.label} →
                    </button>
                  ))}
                </div>

                {mode === 'ps' && (
                  <div className="flex gap-2.5 max-w-lg mx-auto mt-6">
                    <Link to="/rate-my-ps" className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl hover:bg-white/8 transition-all text-left" style={{border: '1px solid rgba(249,106,80,0.25)', background: 'rgba(249,106,80,0.05)'}}>
                      <Star className="w-4 h-4 flex-shrink-0" style={{color: '#f96a50'}} />
                      <div>
                        <div className="text-[13px] font-medium" style={{color: '#f96a50'}}>Rate My PS</div>
                        <div className="text-[11px] text-white/40">Already have a draft? Get a score.</div>
                      </div>
                    </Link>
                    {isUnlimited ? (
                      <Link to="/draft-builder" className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl hover:bg-white/8 transition-all text-left" style={{border: '1px solid rgba(249,106,80,0.25)', background: 'rgba(249,106,80,0.05)'}}>
                        <FileText className="w-4 h-4 flex-shrink-0" style={{color: '#f96a50'}} />
                        <div>
                          <div className="text-[13px] font-medium" style={{color: '#f96a50'}}>Draft Builder</div>
                          <div className="text-[11px] text-white/40">Turn coaching into a first draft.</div>
                        </div>
                      </Link>
                    ) : (
                      <button onClick={() => setShowToolsGate(true)} className="flex-1 flex items-center gap-2.5 px-4 py-3 rounded-xl hover:bg-white/8 transition-all text-left" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
                        <FileText className="w-4 h-4 flex-shrink-0 text-white/50" />
                        <div>
                          <div className="text-[13px] font-medium text-white/80">Draft Builder <span className="text-[10px] font-bold ml-1 px-1.5 py-0.5 rounded" style={{background: 'rgba(249,106,80,0.15)', color: '#f96a50'}}>PRO</span></div>
                          <div className="text-[11px] text-white/40">Turn coaching into a first draft.</div>
                        </div>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {msg.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="max-w-[85%] sm:max-w-[75%] bg-white/10 text-white px-4 py-3 rounded-2xl rounded-br-sm text-[15px] leading-relaxed">
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </div>
                  ) : msg.role === 'system' ? (
                    <div className="flex justify-center">
                      <div className="bg-amber-900/20 text-amber-200 px-4 py-2.5 rounded-xl text-[13px] max-w-md text-center" style={{border: '1px solid rgba(217,169,60,0.2)'}}>{msg.content}</div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
                        <GraduationCap className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 text-[15px] leading-relaxed" style={{color: '#eee'}}>

                        <div className="prose-ai"><ReactMarkdown components={{
                          p: ({children}) => <p className="mb-3 last:mb-0">{children}</p>,
                          strong: ({children}) => <strong className="font-semibold" style={{color: 'inherit'}}>{children}</strong>,
                          ul: ({children}) => <ul className="my-3 pl-5 list-disc">{children}</ul>,
                          ol: ({children}) => <ol className="my-3 pl-5 list-decimal">{children}</ol>,
                          li: ({children}) => <li className="mb-1">{children}</li>,
                          h3: ({children}) => <p className="font-semibold mb-2" style={{color: 'inherit'}}>{children}</p>,
                          h2: ({children}) => <p className="font-semibold mb-2" style={{color: 'inherit'}}>{children}</p>,
                          code: ({children}) => <span>{children}</span>,
                        }}>{(msg.content || '').replace(/\\\(.*?\\\)/g, '').replace(/\\\[.*?\\\]/g, '').replace(/\$\$.*?\$\$/g, '').replace(/\$.*?\$/g, '')}</ReactMarkdown></div>

                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
                    <GraduationCap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="pt-2">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-white/30 rounded-full typing-dot" />
                      <div className="w-2 h-2 bg-white/30 rounded-full typing-dot" />
                      <div className="w-2 h-2 bg-white/30 rounded-full typing-dot" />
                    </div>
                    {serverWaking && <span className="text-[11px] text-white/40 mt-1 block">Waking up server...</span>}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {error && (
          <div className="px-4 pb-2">
            <div className="max-w-3xl mx-auto flex items-center gap-2 p-3 bg-red-900/20 rounded-xl text-red-200 text-[13px]" style={{border: '1px solid rgba(239,68,68,0.2)'}}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
              <button onClick={() => setError(null)} className="ml-auto text-red-300/60 hover:text-red-200"><X className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex-shrink-0 px-4 pb-4 pt-2" style={{paddingBottom: 'max(1rem, env(safe-area-inset-bottom))'}}>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl focus-within:ring-1 focus-within:ring-white/10 transition-all" style={{background: '#353535', border: '1px solid rgba(255,255,255,0.1)'}}>
              <textarea ref={inputRef} value={input}
                onChange={(e) => { const maxChars = (userProfile?.plan === 'free' || !userProfile?.plan) ? 2000 : 4500; if (e.target.value.length <= maxChars) { setInput(e.target.value); } e.target.style.height = '0px'; e.target.style.height = (e.target.value === '' ? 'auto' : Math.min(e.target.scrollHeight, 150) + 'px'); }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
                placeholder={mode === 'ps' ? "Tell me what you're applying for..." : "Ask me anything about interviews..."}
                className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-white/40 text-[15px] leading-relaxed px-4 pt-3.5 pb-12 max-h-[150px]"
                rows={1} disabled={loading} />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                <div className="relative">
                  <button type="button" onClick={() => setShowInputMenu(!showInputMenu)} className="p-1.5 text-white/40 hover:text-white/70 hover:bg-white/8 rounded-md transition-colors" title="Options">
                    {thinking && !showInputMenu ? <Zap className="w-3.5 h-3.5" style={{color: '#f96a50'}} /> : <Plus className={`w-4 h-4 transition-transform duration-200 ${showInputMenu ? 'rotate-45' : ''}`} />}
                  </button>
                  {showInputMenu && (<>
                    <div className="fixed inset-0 z-10" onClick={() => setShowInputMenu(false)} />
                    <div className="absolute bottom-full left-0 mb-2 w-56 rounded-xl py-2 shadow-xl z-20" style={{background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)'}}>
                      <button onClick={() => { handleNewChat(); setShowInputMenu(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                        <Plus className="w-4 h-4" /> New chat
                      </button>
                      <div className="h-px mx-3 my-1" style={{background: 'rgba(255,255,255,0.06)'}} />
                      <Link to="/rate-my-ps" className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setShowInputMenu(false)}>
                        <Star className="w-4 h-4" /> Rate My PS
                      </Link>
                      {isUnlimited ? (
                        <Link to="/draft-builder" className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setShowInputMenu(false)}>
                          <FileText className="w-4 h-4" /> Draft Builder
                        </Link>
                      ) : (
                        <button onClick={() => { setShowToolsGate(true); setShowInputMenu(false); }} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                          <FileText className="w-4 h-4" /> Draft Builder <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded" style={{background: 'rgba(249,106,80,0.15)', color: '#f96a50'}}>PRO</span>
                        </button>
                      )}
                      <div className="h-px mx-3 my-1" style={{background: 'rgba(255,255,255,0.06)'}} />
                      <div className="px-4 py-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4" style={{color: thinking ? '#f96a50' : 'rgba(255,255,255,0.4)'}} />
                            <span className="text-sm font-medium" style={{color: thinking ? '#f96a50' : 'rgba(255,255,255,0.7)'}}>Thinking mode</span>
                          </div>
                          {(userProfile?.plan && userProfile.plan !== 'free') ? (
                            <button onClick={() => setThinking(!thinking)} className="w-9 h-5 rounded-full p-0.5 transition-all duration-200" style={{background: thinking ? '#f96a50' : 'rgba(255,255,255,0.15)'}}>
                              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${thinking ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                          ) : (
                            <Link to="/pricing" className="text-[10px] font-bold px-2 py-0.5 rounded" style={{background: 'rgba(249,106,80,0.15)', color: '#f96a50'}} onClick={() => setShowInputMenu(false)}>UPGRADE</Link>
                          )}
                        </div>
                        <p className="text-[11px] mt-1.5" style={{color: thinking ? 'rgba(249,106,80,0.6)' : 'rgba(255,255,255,0.25)'}}>
                          {thinking ? 'On. Deeper coaching, fewer daily messages.' : 'Deeper responses for serious drafting.'}
                        </p>
                      </div>
                    </div>
                  </>)}
                </div>
                <div className="flex items-center gap-3">
                  {input.length > ((userProfile?.plan === 'free' || !userProfile?.plan) ? 1500 : 4000) && <span className="text-[12px]" style={{color: input.length >= ((userProfile?.plan === 'free' || !userProfile?.plan) ? 2000 : 4500) ? '#f96a50' : '#999'}}>{input.length}/{(userProfile?.plan === 'free' || !userProfile?.plan) ? 2000 : 4500}</span>}
                  <button type="submit" disabled={loading || !input.trim()} className="p-1.5 rounded-lg text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            {!isUnlimited && usage.used >= usage.limit && (
              <div className="text-center mt-2">
                <Link to="/pricing" className="text-[12px] font-medium" style={{color: '#f96a50'}}>Daily limit reached, upgrade for more →</Link>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {showSidebar && (<>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setShowSidebar(false)} />
          <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: 'spring', damping: 25 }} className="fixed inset-y-0 left-0 w-[260px] z-50 md:hidden flex flex-col" style={{background: '#242424'}}>
            <div className="flex items-center justify-between px-5 py-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}><GraduationCap className="w-4 h-4 text-white" /></div>
                <span className="font-display font-bold text-white">myuni<span style={{color: '#f96a50'}}>offer</span> <span style={{color: '#666'}}>ai</span></span>
              </Link>
              <button onClick={() => setShowSidebar(false)} className="p-1.5 text-white/50 hover:text-white/80"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-3 mb-1">
              <button onClick={handleNewChat} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/8 rounded-lg transition-colors" style={{border: '1px solid rgba(255,255,255,0.1)'}}>
                <Plus className="w-4 h-4" /> New chat
              </button>
            </div>
            <div className="px-3 mt-3 mb-1">
              <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider px-2 mb-2">Tools</div>
              <Link to="/rate-my-ps" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/70 active:bg-white/6 transition-colors" onClick={() => setShowSidebar(false)}>
                <Star className="w-3.5 h-3.5" /> Rate My PS
              </Link>
              {isUnlimited ? (
                <Link to="/draft-builder" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/70 active:bg-white/6 transition-colors" onClick={() => setShowSidebar(false)}>
                  <FileText className="w-3.5 h-3.5" /> Draft Builder
                </Link>
              ) : (
                <button onClick={() => { setShowToolsGate(true); setShowSidebar(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-white/70 active:bg-white/6 transition-colors text-left">
                  <FileText className="w-3.5 h-3.5" /> Draft Builder
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded" style={{background: 'rgba(249,106,80,0.15)', color: '#f96a50'}}>PRO</span>
                </button>
              )}
            </div>
            <div className="flex-1 overflow-y-auto px-3 mt-3" style={{WebkitOverflowScrolling: 'touch'}}>
              {recentChats.length === 0 ? (
                <div className="text-xs text-white/40 px-2 py-8 text-center">Your conversations will appear here</div>
              ) : (
                <div className="space-y-0.5">
                  <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider px-2 mb-2">Recent</div>
                  {recentChats.map(chat => (
                    <div key={chat.id} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] ${currentChatId === chat.id ? 'bg-white/10 text-white' : 'text-white/70 active:bg-white/6'}`}>
                      <button onClick={() => handleSelectChat(chat)} className="flex items-center gap-2.5 flex-1 min-w-0 text-left">
                        <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                        <span className="flex-1 truncate">{chat.title}</span>
                      </button>
                      <button onClick={(e) => handleDeleteChat(chat.id, e)} className="p-1 rounded hover:bg-white/10 flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5 text-white/40" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3" style={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
              <Link to="/pricing" className="flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/6 rounded-lg font-medium" style={{color: '#f96a50'}} onClick={() => setShowSidebar(false)}><Sparkles className="w-3.5 h-3.5" /> Upgrade</Link>
              <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/70 hover:bg-white/6 rounded-lg" onClick={() => setShowSidebar(false)}><Settings className="w-3.5 h-3.5" /> Settings</Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/50 hover:bg-white/6 rounded-lg"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
            </div>
          </motion.aside>
        </>)}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setDeleteConfirm(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative rounded-2xl p-6 max-w-sm mx-4 shadow-2xl" style={{background: '#333', border: '1px solid rgba(255,255,255,0.1)'}} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/15 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg">Delete chat?</h3>
            </div>
            <p className="text-white/60 text-sm mb-6">This can't be undone. The entire conversation will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/8 transition-colors" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
                Cancel
              </button>
              <button onClick={confirmDeleteChat} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Draft Builder Feature Gate Modal */}
      {showToolsGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setShowToolsGate(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative rounded-2xl p-6 max-w-sm mx-4 shadow-2xl" style={{background: '#333', border: '1px solid rgba(255,255,255,0.1)'}} onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background: 'rgba(249,106,80,0.15)'}}>
                <FileText className="w-5 h-5" style={{color: '#f96a50'}} />
              </div>
              <h3 className="text-white font-semibold text-lg">Draft Builder</h3>
            </div>
            <p className="text-white/70 text-sm mb-2 leading-relaxed">Turn your coaching conversations into a structured first draft. The Draft Builder organises your material, lets you arrange it into UCAS sections, and generates a scaffold you fill in yourself.</p>
            <p className="text-white/50 text-sm mb-6">Available with Premium for £9.99/month.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowToolsGate(false)} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/8 transition-colors" style={{border: '1px solid rgba(255,255,255,0.12)'}}>
                Not now
              </button>
              <Link to="/pricing" className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white text-center transition-colors" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}} onClick={() => setShowToolsGate(false)}>
                See Premium
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
