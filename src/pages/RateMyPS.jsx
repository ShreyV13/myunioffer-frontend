import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, Lock, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

const SCORE_BANDS = [
  { min: 80, max: 100, label: 'Submission-ready', color: '#34d399', bg: 'rgba(52,211,153,0.12)', glow: 'rgba(52,211,153,0.25)' },
  { min: 65, max: 79, label: 'Strong draft, room to sharpen', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', glow: 'rgba(96,165,250,0.25)' },
  { min: 50, max: 64, label: 'Solid start, key areas need depth', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', glow: 'rgba(251,191,36,0.25)' },
  { min: 35, max: 49, label: 'Needs significant work', color: '#fb923c', bg: 'rgba(251,146,60,0.12)', glow: 'rgba(251,146,60,0.25)' },
  { min: 0, max: 34, label: 'Fundamental issues to address', color: '#f87171', bg: 'rgba(248,113,113,0.12)', glow: 'rgba(248,113,113,0.25)' },
];

function getBand(score) {
  return SCORE_BANDS.find(b => score >= b.min && score <= b.max) || SCORE_BANDS[4];
}

const CATEGORY_LABELS_SHORT = { opening_and_hook: 'Opening', academic_engagement: 'Academic', experiences_and_reflection: 'Reflection', structure_and_flow: 'Structure', voice_and_authenticity: 'Voice' };
const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS_SHORT);
const CATEGORY_LABELS_FULL = { opening_and_hook: 'Opening & Hook', academic_engagement: 'Academic Engagement', experiences_and_reflection: 'Experiences & Reflection', structure_and_flow: 'Structure & Flow', voice_and_authenticity: 'Voice & Authenticity' };

const SUBJECT_SUGGESTIONS = [
  'Medicine', 'Dentistry', 'Law', 'Economics', 'Computer Science', 'Engineering',
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Psychology', 'History',
  'English', 'Philosophy', 'Politics', 'PPE', 'Architecture', 'Business',
  'Veterinary Medicine', 'Nursing', 'Natural Sciences', 'Biochemistry',
  'Biomedical Sciences', 'Geography', 'Sociology', 'Modern Languages',
  'Classics', 'Music', 'Art', 'Accounting', 'Data Science',
];

function ScoreRing({ score, size = 180, strokeWidth = 7, band, landed }) {
  const radius = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ * (1 - score / 100);
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {landed && <motion.div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 40px ${band.glow}, 0 0 80px ${band.glow}` }} initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0.3] }} transition={{ duration: 1.5, ease: 'easeOut' }} />}
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={band.color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ filter: landed ? `drop-shadow(0 0 6px ${band.glow})` : 'none', transition: 'stroke-dashoffset 0.08s, stroke 0.3s' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold tabular-nums" style={{ fontSize: size * 0.33, lineHeight: 1, color: band.color }}>{score}</span>
        <span className="text-xs font-semibold mt-0.5" style={{ color: band.color, opacity: 0.5 }}>/100</span>
      </div>
    </div>
  );
}

function RadarChart({ scores, size = 220 }) {
  const cx = size/2, cy = size/2, maxVal = 20, as = (2*Math.PI)/5, off = -Math.PI/2;
  const p = (a,v) => { const r=(v/maxVal)*(size*0.38); return {x:cx+r*Math.cos(a+off),y:cy+r*Math.sin(a+off)}; };
  const pts = CATEGORY_KEYS.map((k,i) => p(i*as, scores[k]||0));
  const path = pts.map((pt,i) => `${i===0?'M':'L'}${pt.x},${pt.y}`).join(' ')+'Z';
  return (
    <svg width={size} height={size} className="mx-auto">
      {[5,10,15,20].map(lv => { const lps=CATEGORY_KEYS.map((_,i)=>p(i*as,lv)); return <path key={lv} d={lps.map((pt,i)=>`${i===0?'M':'L'}${pt.x},${pt.y}`).join(' ')+'Z'} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>; })}
      {CATEGORY_KEYS.map((_,i)=>{const e=p(i*as,maxVal);return <line key={i} x1={cx} y1={cy} x2={e.x} y2={e.y} stroke="rgba(255,255,255,0.06)" strokeWidth={1}/>;  })}
      <motion.path d={path} fill="rgba(249,106,80,0.15)" stroke="#f96a50" strokeWidth={2} initial={{opacity:0,scale:0.3}} animate={{opacity:1,scale:1}} transition={{duration:0.8,delay:0.3,ease:[0.16,1,0.3,1]}} style={{transformOrigin:`${cx}px ${cy}px`}}/>
      {pts.map((pt,i)=><motion.circle key={i} cx={pt.x} cy={pt.y} r={3.5} fill="#f96a50" stroke="#1a1a1a" strokeWidth={2} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5+i*0.08}}/>)}
      {CATEGORY_KEYS.map((k,i)=>{const lp=p(i*as,maxVal+4.5);const cb=getBand((scores[k]||0)*5);return(<g key={k}><text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-medium" fill="rgba(255,255,255,0.45)">{CATEGORY_LABELS_SHORT[k]}</text><text x={lp.x} y={lp.y+13} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold" fill={cb.color}>{scores[k]}</text></g>);})}
    </svg>
  );
}


export default function RateMyPS() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const tier = userProfile?.plan || 'free';

  const [pageState, setPageState] = useState('input');
  const [psText, setPsText] = useState('');
  const [subject, setSubject] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');
  const [showPsText, setShowPsText] = useState(false);
  const [result, setResult] = useState(null);
  const apiReturned = useRef(false);
  const targetScoreRef = useRef(50);
  const [displayNumber, setDisplayNumber] = useState(0);
  const [landed, setLanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scanLine, setScanLine] = useState(0);
  const animRef = useRef(null);
  const subjectRef = useRef(null);
  const scoringStartRef = useRef(0);
  const rangeRef = useRef(90);

  const charCount = psText.length;
  const filtered = subject.length > 0 ? SUBJECT_SUGGESTIONS.filter(s => s.toLowerCase().includes(subject.toLowerCase())) : SUBJECT_SUGGESTIONS;
  const hasPaidAccess = result ? (result.detailed_feedback !== null && result.detailed_feedback !== undefined) : false;

  function handleSubmit() {
    setError('');
    if (!currentUser) { navigate('/signup'); return; }
    const cleaned = psText.trim();
    if (cleaned.length < 100) { setError('Your statement is too short to rate. Paste your full draft.'); return; }
    if (cleaned.length > 5000) { setError('Over 5,000 characters. UCAS statements are 4,000 max. Trim it down.'); return; }
    setPageState('scoring'); apiReturned.current = false; setResult(null); setLanded(false); setProgress(0); setScanLine(0);
    scoringStartRef.current = Date.now(); rangeRef.current = 90;

    fetch(`${API_BASE}/rate-ps`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUser.uid, tier, ps_text: cleaned, subject: subject || null }),
    })
      .then(res => { if (!res.ok) return res.json().then(d => { throw new Error(d.detail || 'Rating failed'); }); return res.json(); })
      .then(data => { setResult(data); targetScoreRef.current = data.score; apiReturned.current = true; })
      .catch(err => { setError(err.message || 'Something went wrong. Try again.'); setPageState('input'); });
  }

  // Smooth animation
  useEffect(() => {
    if (pageState !== 'scoring') return;
    const startTime = scoringStartRef.current || Date.now();
    let apiReturnedAt = null;

    function tick() {
      const now = Date.now();
      const totalElapsed = now - startTime;
      const hasResult = apiReturned.current;
      const target = targetScoreRef.current;

      if (hasResult && !apiReturnedAt) apiReturnedAt = now;

      // Progress bar: ease-out, caps at 90% until API, then fills slowly to 100%
      if (!hasResult) {
        const raw = totalElapsed / 40000;
        setProgress(Math.min(1 - Math.pow(1 - raw, 3), 0.90) * 100);
      } else {
        const sinceLanded = now - apiReturnedAt;
        const remaining = 100 - 90;
        setProgress(Math.min(90 + remaining * (sinceLanded / 16000), landed ? 100 : 99) );
      }

      // Scan line: loops through PS text
      setScanLine((totalElapsed / 5000) % 1 * 100);

      // Range narrows: slow before API, moderate after
      if (!hasResult) {
        rangeRef.current = Math.max(rangeRef.current - 0.06, 28);
      } else {
        rangeRef.current = Math.max(rangeRef.current - 0.35, 0);
      }

      if (rangeRef.current <= 0 && hasResult) {
        setDisplayNumber(target); setLanded(true); setProgress(100);
        setTimeout(() => setPageState('results'), 1200);
        return;
      }

      const center = hasResult ? target : 55;
      const half = rangeRef.current / 2;
      const lo = Math.max(0, Math.floor(center - half));
      const hi = Math.min(100, Math.floor(center + half));
      setDisplayNumber(Math.floor(Math.random() * (hi - lo + 1)) + lo);

      const speed = rangeRef.current > 50 ? 50 : rangeRef.current > 20 ? 70 : rangeRef.current > 8 ? 120 : rangeRef.current > 3 ? 180 : 250;
      animRef.current = setTimeout(tick, speed);
    }
    animRef.current = setTimeout(tick, 50);
    return () => { if (animRef.current) clearTimeout(animRef.current); };
  }, [pageState]);

  const displayBand = getBand(displayNumber);
  const band = result ? getBand(result.score) : displayBand;

  function handleReset() {
    setPageState('input'); setResult(null); setDisplayNumber(0); setError(''); setProgress(0); setLanded(false); setShowPsText(false); rangeRef.current = 90;
  }

  useEffect(() => {
    function h(e) { if (subjectRef.current && !subjectRef.current.contains(e.target)) setShowSuggestions(false); }
    document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h);
  }, []);

  const isActive = pageState === 'scoring' || pageState === 'results';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1a1a1a' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(249,106,80,0.05) 0%, transparent 50%)' }} />

      {pageState === 'scoring' && (
        <div className="fixed top-0 left-0 right-0 z-[60] h-0.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="h-full gradient-primary transition-none" style={{ width: `${progress}%` }} />
        </div>
      )}

      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(34,34,34,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center"><GraduationCap className="w-4.5 h-4.5 text-white" /></div>
            <span className="text-lg font-display font-bold text-white">myuni<span className="text-coral-500">offer</span> <span className="text-white/40">ai</span></span>
          </Link>
          <div className="flex items-center gap-4">
            {currentUser && <Link to="/chat" className="text-white/50 hover:text-white/80 transition-colors font-medium text-sm flex items-center gap-1.5"><ArrowLeft className="w-4 h-4" /> Chat</Link>}
            {!currentUser && <Link to="/signup" className="gradient-primary text-white font-semibold text-sm px-4 py-2 rounded-xl">Sign Up Free</Link>}
          </div>
        </div>
      </nav>

      {/* ═══ INPUT STATE: single centered column ═══ */}
      {pageState === 'input' && (
        <div className="flex-1 flex flex-col items-center px-6 py-10 lg:py-16 relative z-10">
          <div className="w-full max-w-2xl">
            <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-3">Rate My Personal Statement</h1>
              <p className="text-white/40 text-base max-w-md mx-auto">Paste your draft. Get scored against the same rubric admissions tutors use. Takes 30 seconds.</p>
            </motion.div>

            <motion.div className="flex flex-wrap justify-center gap-2 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              {['Opening & Hook', 'Academic Depth', 'Reflection', 'Structure', 'Voice'].map((c, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(249,106,80,0.08)', color: 'rgba(249,106,80,0.6)', border: '1px solid rgba(249,106,80,0.12)' }}>{c}</span>
              ))}
            </motion.div>

            <motion.div className="mb-3 relative" ref={subjectRef} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <input type="text" value={subject}
                onChange={e => { setSubject(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="What subject are you applying for? (optional)"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-coral-500/30 transition-all"
                style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.08)' }} />
              {showSuggestions && filtered.length > 0 && (
                <div className="absolute z-20 left-0 right-0 mt-1 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto" style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {filtered.map(s => <button key={s} onClick={() => { setSubject(s); setShowSuggestions(false); }} className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">{s}</button>)}
                </div>
              )}
            </motion.div>

            <motion.div className="relative mb-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <textarea value={psText} onChange={e => { setPsText(e.target.value); setError(''); }}
                placeholder="Paste your personal statement here..."
                className="w-full rounded-2xl p-5 text-sm text-white/90 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-coral-500/30 transition-all placeholder:text-white/20"
                style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.08)', minHeight: '260px' }}
                onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleSubmit(); }} />
              <div className="absolute bottom-3 right-4">
                <span className={`text-xs font-medium ${charCount > 4700 ? 'text-red-400' : charCount > 3500 ? 'text-amber-400' : 'text-white/20'}`}>
                  {charCount > 0 ? `${charCount.toLocaleString()} chars` : ''}
                </span>
              </div>
            </motion.div>

            {error && <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}

            <motion.button onClick={handleSubmit} disabled={psText.trim().length < 50}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="w-full gradient-primary text-white font-semibold py-4 rounded-xl text-base shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0">
              Rate My PS
            </motion.button>
            <p className="text-xs text-white/20 text-center mt-3">{currentUser ? 'Free to use. Takes about 30 seconds.' : 'Create a free account first. Takes 10 seconds.'}</p>

            <motion.div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/25" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500/60" /> Scored out of 100</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-coral-400/60" /> 5 admissions categories</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" /> Calibrated against real standards</span>
            </motion.div>
          </div>
        </div>
      )}

      {/* ═══ SCORING STATE: split layout with transition ═══ */}
      {pageState === 'scoring' && (
        <div className="flex-1 flex flex-col lg:flex-row relative z-10">
          {/* Left: PS text with scanning line (hidden on mobile) */}
          <motion.div
            className="hidden lg:flex w-1/2 flex-col overflow-y-auto p-6 lg:p-10"
            style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Your Personal Statement</h2>
            <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="absolute left-0 right-0 h-10 pointer-events-none z-20 transition-none"
                style={{ top: `${scanLine}%`, background: 'linear-gradient(180deg, transparent 0%, rgba(249,106,80,0.1) 50%, transparent 100%)' }} />
              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap relative z-10">{psText}</p>
            </div>
          </motion.div>

          {/* Right: scoring ring */}
          <motion.div
            className="flex-1 lg:w-1/2 flex items-center justify-center p-6"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-center">
              <ScoreRing score={displayNumber} size={200} band={displayBand} landed={landed} />
              <div className="mt-8 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-pulse" />
                <span className="text-sm text-white/40 font-medium">
                  {!apiReturned.current ? 'Reading your statement...' : landed ? 'Done' : 'Finalising score...'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ═══ RESULTS STATE ═══ */}
      {pageState === 'results' && result && (
        <div className="flex-1 flex flex-col lg:flex-row relative z-10">
          {/* Left: PS text (desktop) */}
          <div className="hidden lg:flex w-1/2 flex-col overflow-y-auto p-6 lg:p-10" style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Your Personal Statement</h2>
              <button onClick={handleReset} className="text-xs text-coral-400 hover:text-coral-300 font-medium transition-colors">Rate another</button>
            </div>
            <div className="rounded-2xl p-6" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{psText}</p>
            </div>
          </div>

          {/* Right: results */}
          <div className="w-full lg:w-1/2 overflow-y-auto p-6 lg:p-10">
            {/* Mobile: collapsible PS */}
            <div className="lg:hidden mb-4">
              <button onClick={() => setShowPsText(!showPsText)} className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium text-white/40" style={{ background: '#242424' }}>
                <span>View your statement</span>
                {showPsText ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showPsText && <div className="mt-2 rounded-xl p-4" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)' }}><p className="text-xs text-white/60 leading-relaxed whitespace-pre-wrap">{psText}</p></div>}
            </div>

            {/* Score */}
            <motion.div initial={{ scale: 1.3, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex justify-center mb-4">
              <ScoreRing score={result.score} size={140} band={band} landed={true} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center mb-8">
              <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: band.bg, color: band.color }}>{band.label}</div>
            </motion.div>

            {/* Summary */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
              <div className="rounded-xl p-5" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Biggest issue</p>
                <p className="text-sm text-white/80 leading-relaxed">{result.summary}</p>
              </div>
            </motion.div>

            {/* PAID */}
            {hasPaidAccess && result.category_scores && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-6">
                <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 text-center">Category Breakdown</p>
                <RadarChart scores={result.category_scores} />
              </motion.div>
            )}
            {hasPaidAccess && result.detailed_feedback && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="mb-6">
                <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Detailed Feedback</p>
                <div className="rounded-xl p-5" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{result.detailed_feedback}</p>
                </div>
              </motion.div>
            )}

            {/* FREE: paywall */}
            {!hasPaidAccess && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="relative">
                <div className="select-none mb-4" style={{ filter: 'blur(6px)', pointerEvents: 'none' }}>
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 text-center">Category Breakdown</p>
                  <RadarChart scores={{ opening_and_hook: 9, academic_engagement: 11, experiences_and_reflection: 7, structure_and_flow: 12, voice_and_authenticity: 10 }} />
                </div>
                <div className="select-none" style={{ filter: 'blur(6px)', pointerEvents: 'none' }}>
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Detailed Feedback</p>
                  <div className="rounded-xl p-5" style={{ background: '#242424' }}>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Your opening relies on a generic statement that could belong to any applicant. Instead of telling the reader you've
                      always been passionate, drop them into a specific moment that sparked your curiosity. The work experience paragraph
                      describes what you did but never explains what it changed about your understanding. Admissions tutors want to see
                      how your thinking evolved, not a timeline of activities. Your closing paragraph trails off without connecting back
                      to your opening or pointing forward with conviction.
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center" style={{ top: '15%' }}>
                  <div className="text-center px-4">
                    <div className="relative rounded-2xl p-7 max-w-xs mx-auto overflow-hidden" style={{ background: '#242424' }}>
                      <div className="absolute inset-0 rounded-2xl" style={{ padding:'1px', background:'linear-gradient(135deg,#f96a50,#f59e0b,#f96a50,#f59e0b)', backgroundSize:'300% 300%', animation:'borderShift 4s ease infinite', mask:'linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)', maskComposite:'exclude', WebkitMaskComposite:'xor' }}/>
                      <style>{`@keyframes borderShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}`}</style>
                      <div className="relative z-10">
                        <Lock className="w-7 h-7 text-coral-400 mx-auto mb-3" />
                        <h3 className="font-display font-bold text-white text-base mb-2">See how to improve your score</h3>
                        <p className="text-white/40 text-xs mb-5 leading-relaxed">Category breakdown, paragraph-by-paragraph feedback, and the 3 changes that would make the biggest difference.</p>
                        <Link to="/pricing" className="inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3 px-5 rounded-xl shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
                          Unlock Full Feedback <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-xs text-white/20 mt-3">From £9.99/month. Cancel anytime.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-6 flex flex-col items-center gap-3 lg:hidden">
              <button onClick={handleReset} className="text-sm text-coral-400 hover:text-coral-300 font-medium transition-colors">Rate another statement</button>
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-white/20">{result.ratings_used}/{result.ratings_limit} ratings used this month</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
