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
  
  // Load userSubject from studentProfile when it changes
  useEffect(() => {
    if (studentProfile?.subject) {
      setUserSubject(studentProfile.subject);
    }
  }, [studentProfile]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const { currentUser, userProfile, studentProfile, logout, checkDailyMessages, incrementMessageCount, updateStudentProfile, saveChatsToFirebase, loadChatsFromFirebase } = useAuth();
  const navigate = useNavigate();

  // Load chats from Firebase
  useEffect(() => {
    async function loadChats() {
      if (currentUser) {
        const savedChats = await loadChatsFromFirebase(currentUser.uid);
        if (savedChats && savedChats.length > 0) {
          setChats(savedChats);
        }
      }
    }
    loadChats();
  }, [currentUser]);

  // Save chats to Firebase whenever chats change
  useEffect(() => {
    if (currentUser && chats.length > 0) {
      saveChatsToFirebase(currentUser.uid, chats);
    }
  }, [chats, currentUser]);

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

  // Check daily messages on load
  useEffect(() => {
    async function checkMessages() {
      if (currentUser) {
        const status = await checkDailyMessages(currentUser.uid);
        setUsage({ used: status.used, limit: status.limit });
      }
    }
    checkMessages();
  }, [currentUser]);

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
    if (usage.used >= usage.limit) {
      setMessages(prev => [...prev, {
        role: 'system',
        content: `You've reached your daily limit of ${usage.limit} messages. Upgrade your plan for more messages!`
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
      await incrementMessageCount(currentUser.uid);
      
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
    setMessages([]);
    setCurrentChatId(null);
    setSessionId('session_' + Math.random().toString(36).substr(2, 9));
    setError(null);
    setShowSidebar(false);
  }

  function handleSelectChat(chat) {
    setCurrentChatId(chat.id);
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
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-100">
        {/* Logo */}
        <div className="p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold">
              myuni<span className="text-coral-500">offer</span>
            </span>
          </Link>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 py-2.5 gradient-primary text-white rounded-xl font-medium shadow-sm hover:shadow-md transition-shadow"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-2">
            Recent Chats
          </div>
          {recentChats.length === 0 ? (
            <div className="text-sm text-gray-400 px-2 py-4">
              No chats yet. Start a conversation!
            </div>
          ) : (
            <div className="space-y-1">
              {recentChats.map(chat => (
                <button
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors group ${
                    currentChatId === chat.id 
                      ? 'bg-coral-50 text-coral-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-50" />
                  <span className="flex-1 truncate">{chat.title}</span>
                  <button
                    onClick={(e) => handleDeleteChat(chat.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
                  >
                    <Trash2 className="w-3 h-3 text-gray-400" />
                  </button>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Section */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 bg-coral-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-coral-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 truncate">
                {userProfile?.displayName || currentUser?.email?.split('@')[0]}
              </div>
              <div className="text-xs text-gray-500">{planName} Plan</div>
            </div>
          </div>
          <div className="space-y-1 mt-2">
            <Link 
              to="/settings" 
              className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            <Link 
              to="/pricing" 
              className="flex items-center gap-3 px-3 py-2 text-sm text-coral-600 hover:bg-coral-50 rounded-lg transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>Upgrade Plan</span>
            </Link>
            <button
              onClick={handleSwitchAccount}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Switch Account</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex-shrink-0 glass border-b border-gray-100 px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Mobile menu & Logo */}
            <div className="flex items-center gap-3">
              <button 
                className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowSidebar(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              <Link to="/" className="flex items-center gap-2 md:hidden">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
              </Link>
            </div>

            {/* Center: Mode Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setMode('ps')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === 'ps' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="hidden sm:inline">Personal Statement</span>
                <span className="sm:hidden">PS</span>
              </button>
              <button
                onClick={() => setMode('interview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  mode === 'interview' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="hidden sm:inline">Interview Prep</span>
                <span className="sm:hidden">Interview</span>
              </button>
            </div>

            {/* Right: Usage & User (mobile) */}
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">
                <span className="hidden sm:inline">{usage.limit - usage.used} left today</span>
                <span className="sm:hidden">{usage.limit - usage.used}</span>
              </div>
              
              {/* User menu - mobile only */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-coral-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-coral-600" />
                  </div>
                </button>

                {showUserMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
                      <div className="p-3 border-b border-gray-100">
                        <div className="font-medium text-gray-900 truncate text-sm">{currentUser?.email}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                          {userProfile?.plan === 'premium' && <Crown className="w-3 h-3 text-amber-500" />}
                          {planName} Plan
                        </div>
                      </div>
                      <div className="p-2">
                        <Link 
                          to="/settings" 
                          className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <Link 
                          to="/pricing" 
                          className="flex items-center gap-3 px-3 py-2 text-sm text-coral-600 hover:bg-coral-50 rounded-lg"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Sparkles className="w-4 h-4" />
                          Upgrade
                        </Link>
                        <button
                          onClick={handleSwitchAccount}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Switch Account
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 ? (
            <div className="max-w-2xl mx-auto h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-coral-500/20">
                {mode === 'ps' ? (
                  <FileText className="w-8 h-8 text-white" />
                ) : (
                  <MessageSquare className="w-8 h-8 text-white" />
                )}
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                {mode === 'ps' ? 'Personal Statement Coach' : 'Interview Preparation'}
              </h2>
              <p className="text-gray-500 mb-8 max-w-md">
                {mode === 'ps' 
                  ? "I'll help you discover and articulate your unique story. Tell me about yourself and what you want to study."
                  : "Let's practice interview questions together. Tell me what subject you're applying for."
                }
              </p>

              {/* Quick prompts */}
              <div className="grid sm:grid-cols-2 gap-3 w-full max-w-lg">
                {mode === 'ps' ? (
                  <>
                    <button 
                      onClick={() => setInput("I want to study medicine and I'm not sure how to start my personal statement")}
                      className="p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-coral-300 hover:shadow-sm transition-all"
                    >
                      <div className="text-sm font-medium text-gray-900 mb-1">Start my statement</div>
                      <div className="text-xs text-gray-500">Get help with structure and opening</div>
                    </button>
                    <button 
                      onClick={() => setInput("Can you help me brainstorm experiences to include in my statement?")}
                      className="p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-coral-300 hover:shadow-sm transition-all"
                    >
                      <div className="text-sm font-medium text-gray-900 mb-1">Brainstorm experiences</div>
                      <div className="text-xs text-gray-500">Identify what to include</div>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setInput("Give me a practice interview question for medicine")}
                      className="p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-coral-300 hover:shadow-sm transition-all"
                    >
                      <div className="text-sm font-medium text-gray-900 mb-1">Practice questions</div>
                      <div className="text-xs text-gray-500">Get real interview questions</div>
                    </button>
                    <button 
                      onClick={() => setInput("How should I structure my interview answers?")}
                      className="p-4 bg-white border border-gray-200 rounded-xl text-left hover:border-coral-300 hover:shadow-sm transition-all"
                    >
                      <div className="text-sm font-medium text-gray-900 mb-1">Answer frameworks</div>
                      <div className="text-xs text-gray-500">Learn how to structure responses</div>
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : ''}`}>
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-500">
                          myunioffer AI
                        </span>
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'gradient-primary text-white rounded-br-md' 
                        : msg.role === 'system'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-white border border-gray-100 rounded-bl-md shadow-sm'
                    }`}>
                      <div className={`whitespace-pre-wrap ${msg.role === 'assistant' ? 'prose-ai' : ''}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-coral-400 rounded-full typing-dot" />
                        <div className="w-2 h-2 bg-coral-400 rounded-full typing-dot" />
                        <div className="w-2 h-2 bg-coral-400 rounded-full typing-dot" />
                      </div>
                      {serverWaking && (
                        <span className="text-xs text-gray-400 ml-2">
                          Server waking up...
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Error Banner */}
        {error && (
          <div className="px-4 pb-2">
            <div className="max-w-3xl mx-auto flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-amber-500 hover:text-amber-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-white">
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleNewChat}
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                title="New chat"
              >
                <Plus className="w-5 h-5" />
              </button>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'ps' ? "Tell me about yourself and what you want to study..." : "Ask for a practice question or interview help..."}
                className="input flex-1"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex-shrink-0 w-11 h-11 gradient-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-coral-500/25 hover:shadow-coral-500/35 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-400">
              <span>{usage.used}/{usage.limit} messages today</span>
              {usage.used >= usage.limit && (
                <Link to="/pricing" className="text-coral-500 hover:text-coral-600 font-medium">
                  Upgrade for more →
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setShowSidebar(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 md:hidden flex flex-col shadow-xl"
            >
              {/* Mobile sidebar header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-display font-bold">
                    myuni<span className="text-coral-500">offer</span>
                  </span>
                </Link>
                <button 
                  onClick={() => setShowSidebar(false)} 
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* New Chat Button */}
              <div className="p-3">
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center justify-center gap-2 py-2.5 gradient-primary text-white rounded-xl font-medium"
                >
                  <Plus className="w-4 h-4" />
                  New Chat
                </button>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto px-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-2">
                  Recent Chats
                </div>
                {recentChats.length === 0 ? (
                  <div className="text-sm text-gray-400 px-2 py-4">
                    No chats yet
                  </div>
                ) : (
                  <div className="space-y-1">
                    {recentChats.map(chat => (
                      <button
                        key={chat.id}
                        onClick={() => handleSelectChat(chat)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm ${
                          currentChatId === chat.id 
                            ? 'bg-coral-50 text-coral-700' 
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 flex-shrink-0 opacity-50" />
                        <span className="flex-1 truncate">{chat.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Section */}
              <div className="p-3 border-t border-gray-100">
                <div className="text-sm text-gray-500 mb-3 px-2">
                  {usage.used}/{usage.limit} messages used today
                </div>
                <div className="space-y-1">
                  <Link 
                    to="/pricing" 
                    className="flex items-center gap-3 px-3 py-2 text-coral-600 bg-coral-50 rounded-lg text-sm font-medium"
                    onClick={() => setShowSidebar(false)}
                  >
                    <Sparkles className="w-4 h-4" />
                    Upgrade Plan
                  </Link>
                  <Link 
                    to="/settings" 
                    className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                    onClick={() => setShowSidebar(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <button
                    onClick={handleSwitchAccount}
                    className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Switch Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
