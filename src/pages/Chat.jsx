import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  RefreshCw
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

export default function Chat() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverWaking, setServerWaking] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('ps');
  const [usage, setUsage] = useState({ used: 0, limit: 3 });
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sessionId, setSessionId] = useState(() => 'session_' + Math.random().toString(36).substr(2, 9));
  const [userSubject, setUserSubject] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const activeChatRef = useRef(null);
  
  const { currentUser, userProfile, studentProfile, logout, checkDailyMessages, incrementMessageCount, updateStudentProfile, saveChatsToFirebase, loadChatsFromFirebase } = useAuth();
  const navigate = useNavigate();

  // Load userSubject from studentProfile when it changes
  useEffect(() => {
    if (studentProfile?.subject) {
      setUserSubject(studentProfile.subject);
    }
  }, [studentProfile]);

  // Load chats from Firebase
  useEffect(() => {
    async function loadChats() {
      if (currentUser && loadChatsFromFirebase) {
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

  // Save chats to Firebase whenever chats change
  useEffect(() => {
    if (currentUser && chats.length > 0 && saveChatsToFirebase) {
      saveChatsToFirebase(currentUser.uid, chats);
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

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

    setError(null);

    // Check if user can send message
    if (usage.limit !== -1 && usage.used >= usage.limit) {
      const plan = userProfile?.plan || 'free';
      let upgradeMsg;
      if (plan === 'free') {
        upgradeMsg = `You've used your 3 free ${mode === 'ps' ? 'Personal Statement' : 'Interview'} messages today. Subscribe to continue!`;
      } else if (plan === 'ps' && mode === 'interview') {
        upgradeMsg = "Interview prep isn't included in your PS plan. Upgrade to Premium for both PS and Interview coaching!";
      } else if (plan === 'interview' && mode === 'ps') {
        upgradeMsg = "PS coaching isn't included in your Interview plan. Upgrade to Premium for both PS and Interview coaching!";
      } else {
        upgradeMsg = "You've reached your daily limit. Upgrade for more messages!";
      }
      setMessages(prev => [...prev, {
        role: 'system',
        content: upgradeMsg
      }]);
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Create or update chat
    const chatTitle = userMessage.slice(0, 40) + (userMessage.length > 40 ? '...' : '');
    if (!currentChatId) {
      const newChatId = 'chat_' + Date.now();
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

    // Retry function with exponential backoff
    async function fetchWithRetry(retries = 3, delay = 2000) {
      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout per attempt

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
            }),
            signal: controller.signal
          });

          clearTimeout(timeoutId);

          if (!res.ok) {
            throw new Error('Server error');
          }

          return await res.json();
        } catch (err) {
          console.log(`Attempt ${attempt} failed:`, err.message);
          
          if (attempt === retries) {
            throw err; // Final attempt failed
          }
          
          // Wait before retrying (server might be waking up)
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 1.5; // Increase delay for next attempt
        }
      }
    }

    try {
      const data = await fetchWithRetry(3, 3000);

      clearTimeout(wakingTimeout);
      setServerWaking(false);
      
      // Only increment message count AFTER successful response
      await incrementMessageCount(currentUser.uid, mode);
      
      // Save detected subject for use across modes
      if (data.detected_subject || data.detected_category) {
        const subject = data.detected_subject || data.detected_category;
        setUserSubject(subject);
        // Save to Firebase via student profile
        await updateStudentProfile(currentUser.uid, { subject });
      }
      
      // Update student profile if AI extracted new info
      if (data.profile_updates) {
        const updates = data.profile_updates;
        if (updates.subject || updates.universities?.length > 0 || updates.activities?.length > 0) {
          await updateStudentProfile(currentUser.uid, updates);
        }
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response,
        agent: data.agent,
        detectedSubject: data.detected_subject
      }]);

      // Update usage
      setUsage(prev => ({ ...prev, used: prev.used + 1 }));

    } catch (err) {
      clearTimeout(wakingTimeout);
      setServerWaking(false);
      console.error(err);
      
      // Don't count failed messages - remove the user message from display
      setMessages(prev => prev.slice(0, -1));
      
      setError('Couldn\'t connect to the server. Your message was not counted. Please try again.');
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
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (currentChatId === chatId) {
      handleNewChat();
    }
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
    <div className="h-screen flex" style={{background: '#2b2b2b'}}>
      {/* Sidebar */}
      <aside className="hidden md:flex w-[260px] flex-col" style={{background: '#242424'}}>
        <div className="px-5 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f07a62, #d9614d)'}}>
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white">
              myuni<span style={{color: '#f07a62'}}>offer</span> <span style={{color: '#666'}}>ai</span>
            </span>
          </Link>
        </div>

        <div className="px-3 mb-1">
          <button onClick={handleNewChat} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/8 rounded-lg transition-colors" style={{border: '1px solid rgba(255,255,255,0.1)'}}>
            <Plus className="w-4 h-4" /> New chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 mt-3">
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
              <div className="text-[11px]" style={{color: '#999'}}>{planName} · {usage.limit === -1 ? '∞' : usage.limit - usage.used} left</div>
            </div>
          </div>
          <div className="space-y-0.5">
            {userProfile?.plan === 'free' && (
              <Link to="/pricing" className="flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/6 rounded-lg transition-colors font-medium" style={{color: '#f07a62'}}>
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
              <button className="md:hidden p-2 -ml-2 text-white/60 hover:bg-white/8 rounded-lg" onClick={() => setShowSidebar(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" className="flex items-center gap-1.5 md:hidden">
                <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f07a62, #d9614d)'}}>
                  <GraduationCap className="w-3.5 h-3.5 text-white" />
                </div>
              </Link>
            </div>
            <div className="flex p-0.5 rounded-lg bg-white/8">
              <button onClick={() => setMode('ps')} className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-all ${mode === 'ps' ? 'bg-white/12 text-white' : 'hover:bg-white/6'}`} style={mode !== 'ps' ? {color: '#aaa'} : {}}>
                <span className="hidden sm:inline">Personal Statement</span><span className="sm:hidden">PS</span>
              </button>
              <button onClick={() => setMode('interview')} className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium transition-all ${mode === 'interview' ? 'bg-white/12 text-white' : 'hover:bg-white/6'}`} style={mode !== 'interview' ? {color: '#aaa'} : {}}>
                <span className="hidden sm:inline">Interview Prep</span><span className="sm:hidden">Interview</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] hidden sm:inline" style={{color: '#aaa'}}>{usage.limit === -1 ? '∞' : usage.limit - usage.used} messages left</span>
              <div className="md:hidden relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="p-1.5 hover:bg-white/8 rounded-lg">
                  <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center"><User className="w-3.5 h-3.5 text-white/60" /></div>
                </button>
                {showUserMenu && (<>
                  <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-xl shadow-2xl z-20 overflow-hidden" style={{background: '#333', border: '1px solid rgba(255,255,255,0.1)'}}>
                    <div className="p-3" style={{borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
                      <div className="font-medium text-white truncate text-[13px]">{currentUser?.email}</div>
                      <div className="text-[11px] text-white/50 mt-0.5">{planName} · {usage.limit === -1 ? '∞' : usage.limit - usage.used} left</div>
                    </div>
                    <div className="p-1.5">
                      <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/70 hover:bg-white/8 rounded-lg" onClick={() => setShowUserMenu(false)}><Settings className="w-3.5 h-3.5" /> Settings</Link>
                      <Link to="/pricing" className="flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/8 rounded-lg" style={{color: '#f07a62'}} onClick={() => setShowUserMenu(false)}><Sparkles className="w-3.5 h-3.5" /> Upgrade</Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/50 hover:bg-white/8 rounded-lg"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
                    </div>
                  </div>
                </>)}
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-6">
              <div className="max-w-xl w-full text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #f07a62, #d9614d)', boxShadow: '0 8px 24px rgba(240,122,98,0.2)'}}>
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
                    { text: "I'm applying for medicine — help me start my PS", label: "Start my PS" },
                    { text: "Help me figure out what experiences to include", label: "Brainstorm experiences" },
                    { text: "I've got a draft — can you help me improve it?", label: "Review my draft" },
                    { text: "What do admissions tutors actually want to see?", label: "What makes a great PS" },
                  ] : [
                    { text: "Give me a real interview question for my subject", label: "Practise a question" },
                    { text: "Run a full mock interview with me", label: "Mock interview" },
                    { text: "How should I structure my answers?", label: "Answer frameworks" },
                    { text: "What mistakes do most people make in interviews?", label: "Common mistakes" },
                  ]).map((prompt, i) => (
                    <button key={i} onClick={() => { setInput(prompt.text); inputRef.current?.focus(); }}
                      className="px-4 py-3 rounded-xl text-left hover:bg-white/8 transition-all text-[13px] leading-snug" style={{border: '1px solid rgba(255,255,255,0.12)', color: '#ccc'}}>
                      {prompt.label} →
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                  {msg.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] bg-white/10 text-white px-4 py-3 rounded-2xl rounded-br-sm text-[15px] leading-relaxed">
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </div>
                  ) : msg.role === 'system' ? (
                    <div className="flex justify-center">
                      <div className="bg-amber-900/20 text-amber-200 px-4 py-2.5 rounded-xl text-[13px] max-w-md text-center" style={{border: '1px solid rgba(217,169,60,0.2)'}}>{msg.content}</div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background: 'linear-gradient(135deg, #f07a62, #d9614d)'}}>
                        <GraduationCap className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0 text-[15px] leading-relaxed" style={{color: '#eee'}}>
                        <div className="whitespace-pre-wrap prose-ai">{msg.content}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #f07a62, #d9614d)'}}>
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
        <div className="flex-shrink-0 px-4 pb-4 pt-2">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl focus-within:ring-1 focus-within:ring-white/10 transition-all" style={{background: '#353535', border: '1px solid rgba(255,255,255,0.1)'}}>
              <textarea ref={inputRef} value={input}
                onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px'; }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
                placeholder={mode === 'ps' ? "Tell me what you're applying for..." : "Ask me anything about interviews..."}
                className="w-full bg-transparent border-none outline-none resize-none text-white placeholder-white/40 text-[15px] leading-relaxed px-4 pt-3.5 pb-12 max-h-[150px]"
                rows={1} disabled={loading} />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                <button type="button" onClick={handleNewChat} className="p-1.5 text-white/40 hover:text-white/70 hover:bg-white/8 rounded-md transition-colors" title="New chat">
                  <Plus className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-[12px]" style={{color: '#999'}}>{usage.limit === -1 ? '∞' : usage.used + '/' + usage.limit}</span>
                  <button type="submit" disabled={loading || !input.trim()} className="p-1.5 rounded-lg text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all" style={{background: 'linear-gradient(135deg, #f07a62, #d9614d)'}}>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            {usage.limit !== -1 && usage.used >= usage.limit && (
              <div className="text-center mt-2">
                <Link to="/pricing" className="text-[12px] font-medium" style={{color: '#f07a62'}}>Daily limit reached — upgrade for more →</Link>
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
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f07a62, #d9614d)'}}><GraduationCap className="w-4 h-4 text-white" /></div>
                <span className="font-display font-bold text-white">myuni<span style={{color: '#f07a62'}}>offer</span> <span style={{color: '#666'}}>ai</span></span>
              </Link>
              <button onClick={() => setShowSidebar(false)} className="p-1.5 text-white/50 hover:text-white/80"><X className="w-5 h-5" /></button>
            </div>
            <div className="px-3 mb-1">
              <button onClick={handleNewChat} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/8 rounded-lg transition-colors" style={{border: '1px solid rgba(255,255,255,0.1)'}}>
                <Plus className="w-4 h-4" /> New chat
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 mt-3">
              {recentChats.length === 0 ? (
                <div className="text-xs text-white/40 px-2 py-8 text-center">Your conversations will appear here</div>
              ) : (
                <div className="space-y-0.5">
                  <div className="text-[11px] font-medium text-white/40 uppercase tracking-wider px-2 mb-2">Recent</div>
                  {recentChats.map(chat => (
                    <button key={chat.id} onClick={() => handleSelectChat(chat)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[13px] ${currentChatId === chat.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/6'}`}>
                      <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
                      <span className="flex-1 truncate">{chat.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3" style={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
              <div className="text-[12px] text-white/50 mb-2 px-2">{usage.limit === -1 ? '∞' : usage.used + '/' + usage.limit} messages today</div>
              <Link to="/pricing" className="flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-white/6 rounded-lg font-medium" style={{color: '#f07a62'}} onClick={() => setShowSidebar(false)}><Sparkles className="w-3.5 h-3.5" /> Upgrade</Link>
              <Link to="/settings" className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/70 hover:bg-white/6 rounded-lg" onClick={() => setShowSidebar(false)}><Settings className="w-3.5 h-3.5" /> Settings</Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-white/50 hover:bg-white/6 rounded-lg"><LogOut className="w-3.5 h-3.5" /> Sign out</button>
            </div>
          </motion.aside>
        </>)}
      </AnimatePresence>
    </div>
  );
}
