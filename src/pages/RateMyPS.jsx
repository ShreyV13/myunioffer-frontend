import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Lock, ArrowLeft } from 'lucide-react';
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

const CATEGORY_LABELS = {
  opening_and_hook: 'Opening & Hook',
  academic_engagement: 'Academic Engagement',
  experiences_and_reflection: 'Experiences & Reflection',
  structure_and_flow: 'Structure & Flow',
  voice_and_authenticity: 'Voice & Authenticity',
};
const CATEGORY_LABELS_SHORT = {
  opening_and_hook: 'Opening',
  academic_engagement: 'Academic',
  experiences_and_reflection: 'Reflection',
  structure_and_flow: 'Structure',
  voice_and_authenticity: 'Voice',
};
const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS);

const SUBJECT_SUGGESTIONS = [
  'Medicine', 'Dentistry', 'Law', 'Economics', 'Computer Science', 'Engineering',
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Psychology', 'History',
  'English', 'Philosophy', 'Politics', 'PPE', 'Architecture', 'Business',
  'Veterinary Medicine', 'Nursing', 'Natural Sciences', 'Biochemistry',
  'Biomedical Sciences', 'Geography', 'Sociology', 'Modern Languages',
  'Classics', 'Music', 'Art', 'Accounting', 'Data Science',
];

// ─── Circular Score Ring ────────────────────────────────────────────────
function ScoreRing({ score, size = 180, strokeWidth = 7, band, landed }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow */}
      {landed && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 40px ${band.glow}, 0 0 80px ${band.glow}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      )}
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={band.color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: landed ? `drop-shadow(0 0 6px ${band.glow})` : 'none' }}
          transition={{ duration: 0.08 }}
        />
      </svg>
      {/* Inner content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-bold tabular-nums" style={{ fontSize: size * 0.33, lineHeight: 1, color: band.color }}>
          {score}
        </span>
        <span className="text-xs font-semibold mt-0.5" style={{ color: band.color, opacity: 0.5 }}>/100</span>
      </div>
    </div>
  );
}

// ─── Radar Chart ────────────────────────────────────────────────────────
function RadarChart({ scores, size = 220 }) {
  const cx = size / 2, cy = size / 2;
  const maxVal = 20;
  const levels = [5, 10, 15, 20];
  const angleStep = (2 * Math.PI) / 5;
  const offset = -Math.PI / 2; // start from top

  function polarToCart(angle, val) {
    const r = (val / maxVal) * (size * 0.38);
    return { x: cx + r * Math.cos(angle + offset), y: cy + r * Math.sin(angle + offset) };
  }

  const keys = CATEGORY_KEYS;
  const dataPoints = keys.map((k, i) => polarToCart(i * angleStep, scores[k] || 0));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';

  return (
    <svg width={size} height={size} className="mx-auto">
      {/* Grid levels */}
      {levels.map(lv => {
        const pts = keys.map((_, i) => polarToCart(i * angleStep, lv));
        const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
        return <path key={lv} d={path} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />;
      })}
      {/* Axis lines */}
      {keys.map((_, i) => {
        const end = polarToCart(i * angleStep, maxVal);
        return <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />;
      })}
      {/* Data fill */}
      <motion.path
        d={dataPath}
        fill="rgba(249,106,80,0.15)"
        stroke="#f96a50"
        strokeWidth={2}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* Data points */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i} cx={p.x} cy={p.y} r={3.5}
          fill="#f96a50" stroke="#1a1a1a" strokeWidth={2}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.08 }}
        />
      ))}
      {/* Labels */}
      {keys.map((k, i) => {
        const lp = polarToCart(i * angleStep, maxVal + 4.5);
        const score = scores[k] || 0;
        const catBand = getBand(score * 5);
        return (
          <g key={k}>
            <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-medium" fill="rgba(255,255,255,0.45)">
              {CATEGORY_LABELS_SHORT[k]}
            </text>
            <text x={lp.x} y={lp.y + 13} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold" fill={catBand.color}>
              {score}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Skeleton Preview (shown on right side in input state) ──────────────
function SkeletonPreview() {
  return (
    <div className="w-full max-w-sm mx-auto opacity-[0.25]">
      {/* Fake score ring */}
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full" style={{ border: '6px solid rgba(255,255,255,0.08)' }}>
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <div className="w-10 h-6 rounded bg-white/10" />
          </div>
        </div>
      </div>
      {/* Fake band label */}
      <div className="flex justify-center mb-6">
        <div className="w-40 h-6 rounded-full bg-white/8" />
      </div>
      {/* Fake summary */}
      <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div className="w-20 h-3 rounded bg-white/8 mb-3" />
        <div className="space-y-2">
          <div className="w-full h-3 rounded bg-white/6" />
          <div className="w-4/5 h-3 rounded bg-white/6" />
        </div>
      </div>
      {/* Fake bars */}
      <div className="space-y-3">
        {[60, 45, 35, 55, 50].map((w, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-20 h-3 rounded bg-white/6" />
            <div className="flex-1 h-2 rounded-full bg-white/4">
              <div className="h-full rounded-full bg-white/8" style={{ width: `${w}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function RateMyPS() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const tier = userProfile?.plan || 'free';
  const isFree = tier === 'free';

  const [pageState, setPageState] = useState('input');
  const [psText, setPsText] = useState('');
  const [subject, setSubject] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState('');

  const [result, setResult] = useState(null);
  const apiReturned = useRef(false);

  const [displayNumber, setDisplayNumber] = useState(0);
  const [animPhase, setAnimPhase] = useState('idle');
  const [progress, setProgress] = useState(0); // 0-100 for top bar
  const [scanLine, setScanLine] = useState(0); // 0-100 for scanning effect
  const phaseTimerRef = useRef(null);
  const subjectRef = useRef(null);

  const charCount = psText.length;

  const filtered = subject.length > 0
    ? SUBJECT_SUGGESTIONS.filter(s => s.toLowerCase().includes(subject.toLowerCase()))
    : SUBJECT_SUGGESTIONS;

  function handleSubmit() {
    setError('');
    if (!currentUser) { navigate('/signup'); return; }
    const cleaned = psText.trim();
    if (cleaned.length < 100) { setError('Your statement is too short to rate. Paste your full draft.'); return; }
    if (cleaned.length > 5000) { setError('Over 5,000 characters. UCAS statements are 4,000 max. Trim it down.'); return; }

    setPageState('scoring');
    apiReturned.current = false;
    setResult(null);
    setAnimPhase('random');
    setProgress(0);
    setScanLine(0);

    fetch(`${API_BASE}/rate-ps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUser.uid, tier, ps_text: cleaned, subject: subject || null }),
    })
      .then(res => { if (!res.ok) return res.json().then(d => { throw new Error(d.detail || 'Rating failed'); }); return res.json(); })
      .then(data => { setResult(data); apiReturned.current = true; })
      .catch(err => { setError(err.message || 'Something went wrong. Try again.'); setPageState('input'); setAnimPhase('idle'); });
  }

  // ── Progress bar + scan line (runs during scoring) ──
  useEffect(() => {
    if (pageState !== 'scoring') return;
    const start = Date.now();
    const totalMs = 30000;
    let raf;
    function tick() {
      const elapsed = Date.now() - start;
      const pct = Math.min(elapsed / totalMs, 1);
      // Ease-out curve so it slows down towards the end
      const eased = 1 - Math.pow(1 - pct, 2.5);
      setProgress(Math.min(eased * 100, animPhase === 'landed' ? 100 : 95));
      // Scan line loops through the PS text
      setScanLine((elapsed / 4000) % 1 * 100);
      if (animPhase !== 'landed') raf = requestAnimationFrame(tick);
      else { setProgress(100); }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pageState, animPhase]);

  // ── Score animation engine ──
  const phaseStartRef = useRef(Date.now());
  useEffect(() => { phaseStartRef.current = Date.now(); }, [animPhase]);

  useEffect(() => {
    if (animPhase === 'idle' || animPhase === 'landed') return;
    const targetScore = result?.score || 0;

    function tick() {
      const elapsed = Date.now() - phaseStartRef.current;
      const hasResult = apiReturned.current;

      if (animPhase === 'random') {
        setDisplayNumber(Math.floor(Math.random() * 90) + 10);
        if (elapsed > 14000 && hasResult) { setAnimPhase('narrow'); return; }
      } else if (animPhase === 'narrow') {
        const lo = Math.max(0, targetScore - 18), hi = Math.min(100, targetScore + 18);
        setDisplayNumber(Math.floor(Math.random() * (hi - lo + 1)) + lo);
        if (elapsed > 6000) { setAnimPhase('close'); return; }
      } else if (animPhase === 'close') {
        const lo = Math.max(0, targetScore - 7), hi = Math.min(100, targetScore + 7);
        setDisplayNumber(Math.floor(Math.random() * (hi - lo + 1)) + lo);
        if (elapsed > 5000) { setAnimPhase('converge'); return; }
      } else if (animPhase === 'converge') {
        const lo = Math.max(0, targetScore - 2), hi = Math.min(100, targetScore + 2);
        setDisplayNumber(Math.floor(Math.random() * (hi - lo + 1)) + lo);
        if (elapsed > 3000) {
          setDisplayNumber(targetScore);
          setAnimPhase('landed');
          setTimeout(() => setPageState('results'), 1200);
          return;
        }
      }
      const speed = animPhase === 'random' ? 50 : animPhase === 'narrow' ? 80 : animPhase === 'close' ? 130 : 220;
      phaseTimerRef.current = setTimeout(tick, speed);
    }
    phaseTimerRef.current = setTimeout(tick, 50);
    return () => { if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current); };
  }, [animPhase, result]);

  const displayBand = getBand(displayNumber);
  const band = result ? getBand(result.score) : displayBand;

  function handleReset() {
    setPageState('input'); setAnimPhase('idle'); setResult(null); setDisplayNumber(0); setError(''); setProgress(0);
  }

  // Close suggestions on outside click
  useEffect(() => {
    function h(e) { if (subjectRef.current && !subjectRef.current.contains(e.target)) setShowSuggestions(false); }
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: '#1a1a1a' }}>
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 30%, rgba(249,106,80,0.04) 0%, transparent 60%)',
      }} />

      {/* Top progress bar (scoring only) */}
      {pageState === 'scoring' && (
        <div className="fixed top-0 left-0 right-0 z-[60] h-0.5" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <motion.div
            className="h-full gradient-primary"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      )}

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(34,34,34,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-lg font-display font-bold text-white">
              myuni<span className="text-coral-500">offer</span> <span className="text-white/40">ai</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {currentUser && (
              <Link to="/chat" className="text-white/50 hover:text-white/80 transition-colors font-medium text-sm flex items-center gap-1.5">
                <ArrowLeft className="w-4 h-4" /> Chat
              </Link>
            )}
            {!currentUser && (
              <Link to="/signup" className="gradient-primary text-white font-semibold text-sm px-4 py-2 rounded-xl">Sign Up Free</Link>
            )}
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col lg:flex-row relative z-10">

        {/* ═══ LEFT SIDE ═══ */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r flex flex-col" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {pageState === 'input' ? (
            <div className="flex-1 flex flex-col p-6 lg:p-10">
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">Rate My Personal Statement</h1>
                <p className="text-white/40 text-sm">Paste your draft below. Scored against what admissions tutors actually look for.</p>
              </div>

              {/* Subject input */}
              <div className="mb-4 relative" ref={subjectRef}>
                <label className="block text-xs font-semibold text-white/30 uppercase tracking-wider mb-1.5">Subject (optional)</label>
                <input
                  type="text" value={subject}
                  onChange={e => { setSubject(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="e.g. Medicine, Economics, Computer Science..."
                  className="w-full rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-coral-500/40 transition-all"
                  style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                {showSuggestions && filtered.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 rounded-xl overflow-hidden shadow-2xl max-h-48 overflow-y-auto" style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {filtered.map(s => (
                      <button key={s} onClick={() => { setSubject(s); setShowSuggestions(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors">{s}</button>
                    ))}
                  </div>
                )}
              </div>

              {/* Textarea */}
              <div className="flex-1 relative mb-4">
                <textarea
                  value={psText}
                  onChange={e => { setPsText(e.target.value); setError(''); }}
                  placeholder="Paste your personal statement here..."
                  className="w-full h-full min-h-[300px] lg:min-h-0 rounded-2xl p-5 text-sm text-white/90 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-coral-500/40 transition-all placeholder:text-white/20"
                  style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.08)' }}
                  onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleSubmit(); }}
                />
                <div className="absolute bottom-3 right-4">
                  <span className={`text-xs font-medium ${charCount > 4700 ? 'text-red-400' : charCount > 3500 ? 'text-amber-400' : 'text-white/25'}`}>
                    {charCount.toLocaleString()} chars
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl text-sm text-red-300" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>
              )}

              <button onClick={handleSubmit} disabled={psText.trim().length < 50}
                className="w-full gradient-primary text-white font-semibold py-4 rounded-xl text-base shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg">
                Rate My PS
              </button>
              <p className="text-xs text-white/25 text-center mt-2">
                {currentUser ? 'Free. Takes about 30 seconds.' : 'Free account required. Takes 10 seconds to sign up.'}
              </p>
            </div>
          ) : (
            /* PS text display with scanning effect */
            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Your Personal Statement</h2>
                {pageState === 'results' && (
                  <button onClick={handleReset} className="text-xs text-coral-400 hover:text-coral-300 font-medium transition-colors">Rate another</button>
                )}
              </div>
              <div className="rounded-2xl p-6 relative overflow-hidden" style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.06)' }}>
                {/* Scanning highlight */}
                {pageState === 'scoring' && (
                  <div
                    className="absolute left-0 right-0 h-8 pointer-events-none transition-none"
                    style={{
                      top: `${scanLine}%`,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(249,106,80,0.08) 50%, transparent 100%)',
                    }}
                  />
                )}
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap relative z-10">{psText}</p>
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT SIDE ═══ */}
        <div className="w-full lg:w-1/2 flex flex-col relative overflow-hidden">

          {/* Input state: skeleton preview */}
          {pageState === 'input' && (
            <div className="flex-1 flex items-center justify-center p-6 lg:p-10">
              <div className="w-full">
                <p className="text-center text-xs font-semibold text-white/20 uppercase tracking-wider mb-8">Your results will appear here</p>
                <SkeletonPreview />
              </div>
            </div>
          )}

          {/* Scoring: animated ring */}
          {pageState === 'scoring' && (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <ScoreRing score={displayNumber} band={displayBand} landed={animPhase === 'landed'} />
                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral-400 animate-pulse" />
                  <span className="text-sm text-white/40 font-medium">
                    {animPhase === 'random' ? 'Reading your statement...' :
                     animPhase === 'narrow' ? 'Scoring against rubric...' :
                     animPhase === 'close' ? 'Finalising score...' :
                     animPhase === 'converge' ? 'Almost there...' : 'Done'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {pageState === 'results' && result && (
            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
              {/* Score ring (smaller in results) */}
              <motion.div initial={{ scale: 1.3, opacity: 0.7 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="flex justify-center mb-4">
                <ScoreRing score={result.score} size={140} band={band} landed={true} />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }} className="text-center mb-8">
                <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: band.bg, color: band.color }}>
                  {band.label}
                </div>
              </motion.div>

              {/* Summary (all users) */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.4 }} className="mb-6">
                <div className="rounded-xl p-5" style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Biggest issue</p>
                  <p className="text-sm text-white/80 leading-relaxed">{result.summary}</p>
                </div>
              </motion.div>

              {/* PAID: Radar chart */}
              {!isFree && result.category_scores && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="mb-6">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 text-center">Category Breakdown</p>
                  <RadarChart scores={result.category_scores} />
                </motion.div>
              )}

              {/* PAID: Detailed feedback */}
              {!isFree && result.detailed_feedback && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.4 }} className="mb-6">
                  <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Detailed Feedback</p>
                  <div className="rounded-xl p-5" style={{ background: '#2a2a2a', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{result.detailed_feedback}</p>
                  </div>
                </motion.div>
              )}

              {/* FREE: Blurred paywall */}
              {isFree && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.4 }} className="relative">
                  {/* Fake radar */}
                  <div className="select-none mb-4" style={{ filter: 'blur(6px)', pointerEvents: 'none' }}>
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2 text-center">Category Breakdown</p>
                    <RadarChart scores={{ opening_and_hook: 9, academic_engagement: 11, experiences_and_reflection: 7, structure_and_flow: 12, voice_and_authenticity: 10 }} />
                  </div>
                  {/* Fake feedback */}
                  <div className="select-none" style={{ filter: 'blur(6px)', pointerEvents: 'none' }}>
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">Detailed Feedback</p>
                    <div className="rounded-xl p-5" style={{ background: '#2a2a2a' }}>
                      <p className="text-sm text-white/60 leading-relaxed">
                        Your opening relies on a generic statement that could belong to any applicant. Instead of telling the reader you've
                        always been passionate, drop them into a specific moment that sparked your curiosity. The work experience paragraph
                        describes what you did but never explains what it changed about your understanding. Admissions tutors want to see
                        how your thinking evolved, not a timeline of activities. Your closing paragraph trails off without connecting back
                        to your opening or pointing forward with conviction.
                      </p>
                    </div>
                  </div>

                  {/* CTA overlay with animated border */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ top: '15%' }}>
                    <div className="text-center px-4">
                      <div className="relative rounded-2xl p-7 max-w-xs mx-auto overflow-hidden" style={{ background: '#2a2a2a' }}>
                        {/* Animated gradient border */}
                        <div className="absolute inset-0 rounded-2xl" style={{
                          padding: '1px',
                          background: 'linear-gradient(135deg, #f96a50, #f59e0b, #f96a50, #f59e0b)',
                          backgroundSize: '300% 300%',
                          animation: 'borderShift 4s ease infinite',
                          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          maskComposite: 'exclude',
                          WebkitMaskComposite: 'xor',
                        }} />
                        <style>{`@keyframes borderShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
                        <div className="relative z-10">
                          <Lock className="w-7 h-7 text-coral-400 mx-auto mb-3" />
                          <h3 className="font-display font-bold text-white text-base mb-2">See how to improve your score</h3>
                          <p className="text-white/40 text-xs mb-5 leading-relaxed">
                            Category breakdown, paragraph-by-paragraph feedback, and the 3 changes that would make the biggest difference.
                          </p>
                          <Link to="/pricing"
                            className="inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3 px-5 rounded-xl shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
                            Unlock Full Feedback <ArrowRight className="w-4 h-4" />
                          </Link>
                          <p className="text-xs text-white/20 mt-3">From £9.99/month. Cancel anytime.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-8 text-center">
                <span className="text-xs text-white/20">{result.ratings_used}/{result.ratings_limit} ratings used this month</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
