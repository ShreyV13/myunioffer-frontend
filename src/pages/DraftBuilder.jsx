import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, ArrowLeft, Sparkles, AlertTriangle, Check, ChevronDown, ChevronUp, Loader2, Settings, Crown, BookOpen, Briefcase, Star, Lightbulb, Zap, PenTool, X, RotateCcw, GripVertical } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

const SECTIONS = {
  motivation: { num: 1, key: 'motivation', title: 'Why this subject?', target: 800, color: '#f96a50', bg: 'rgba(249,106,80,0.08)', border: 'rgba(249,106,80,0.20)', glow: 'rgba(249,106,80,0.15)' },
  preparation: { num: 2, key: 'preparation', title: 'How have you prepared?', target: 1800, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.20)', glow: 'rgba(96,165,250,0.15)' },
  experiences: { num: 3, key: 'experiences', title: 'What have you done?', target: 1200, color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.20)', glow: 'rgba(52,211,153,0.15)' },
};

const TYPE_STYLES = {
  experience: { icon: Briefcase, color: '#34d399', bg: 'rgba(52,211,153,0.12)', label: 'Experience' },
  academic: { icon: BookOpen, color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', label: 'Academic' },
  supercurricular: { icon: Star, color: '#a78bfa', bg: 'rgba(167,139,250,0.12)', label: 'Supercurricular' },
  reading: { icon: BookOpen, color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', label: 'Reading' },
  reflection: { icon: Lightbulb, color: '#f97316', bg: 'rgba(249,115,22,0.12)', label: 'Reflection' },
};

function StepIndicator({ current }) {
  const steps = ['Your material', 'Arrange', 'Your draft'];
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {steps.map((label, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5">
            <motion.div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative"
              style={{ background: i <= current ? 'rgba(249,106,80,0.15)' : 'rgba(255,255,255,0.04)', color: i <= current ? '#f96a50' : 'rgba(255,255,255,0.2)', border: `1.5px solid ${i <= current ? 'rgba(249,106,80,0.4)' : 'rgba(255,255,255,0.08)'}` }}
              animate={i === current ? { boxShadow: ['0 0 0px rgba(249,106,80,0)', '0 0 20px rgba(249,106,80,0.3)', '0 0 0px rgba(249,106,80,0)'] } : {}}
              transition={i === current ? { duration: 2, repeat: Infinity } : {}}>
              {i < current ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </motion.div>
            <span className="text-[10px] font-medium" style={{ color: i <= current ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)' }}>{label}</span>
          </div>
          {i < 2 && <div className="w-16 h-px mb-5" style={{ background: i < current ? 'rgba(249,106,80,0.3)' : 'rgba(255,255,255,0.06)' }} />}
        </React.Fragment>
      ))}
    </div>
  );
}

function DraggableCard({ card, source, onDragStart, onClick, isAssigned, isPriority, onStar, onRemove, delay = 0 }) {
  const ts = TYPE_STYLES[card.type] || TYPE_STYLES.experience;
  const Icon = ts.icon;
  const [flipped, setFlipped] = useState(false);

  function handleDragStart(e) {
    e.dataTransfer.setData('application/json', JSON.stringify({ cardId: card.id, source }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart && onDragStart(card, source);
  }

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 25 }} className="group relative" style={{ perspective: '600px' }}>
      <motion.div className="relative" style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        {/* Front */}
        <div draggable onDragStart={handleDragStart}
          className="rounded-2xl px-4 py-3 relative overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(20px)', border: `1px solid ${isPriority ? 'rgba(251,191,36,0.4)' : 'rgba(255,255,255,0.08)'}`, boxShadow: isPriority ? '0 0 20px rgba(251,191,36,0.1)' : 'none', backfaceVisibility: 'hidden' }}
          onClick={onClick}>
          <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full" style={{ background: ts.color }} />
          <div className="flex items-center gap-3 pl-2">
            <GripVertical className="w-3.5 h-3.5 text-white/15 flex-shrink-0" />
            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: ts.bg }}>
              <Icon className="w-3.5 h-3.5" style={{ color: ts.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white/80 truncate">{card.title}</p>
              <p className="text-[10px] font-medium" style={{ color: ts.color }}>{ts.label}</p>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {card.detail && <button onClick={e => { e.stopPropagation(); setFlipped(true); }} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/5"><RotateCcw className="w-3 h-3 text-white/30" /></button>}
              {isAssigned && onStar && <button onClick={e => { e.stopPropagation(); onStar(); }} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/5"><Star className="w-3 h-3" style={{ color: isPriority ? '#fbbf24' : 'rgba(255,255,255,0.2)', fill: isPriority ? '#fbbf24' : 'none' }} /></button>}
              {isAssigned && onRemove && <button onClick={e => { e.stopPropagation(); onRemove(); }} className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-white/5"><X className="w-3 h-3 text-white/20" /></button>}
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-2xl px-4 py-3 overflow-hidden cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          onClick={() => setFlipped(false)}>
          <p className="text-[10px] text-white/50 leading-relaxed line-clamp-3">{card.detail || 'No reflection recorded'}</p>
          <p className="text-[9px] text-white/20 mt-1 italic">tap to flip back</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DropZone({ sectionKey, cards, onDropCard, onStar, onRemove, onDragStartCard, dragOverTarget, onTapAssign }) {
  const meta = SECTIONS[sectionKey];
  const isOver = dragOverTarget === sectionKey;
  const charEstimate = cards.reduce((sum, c) => sum + (c.detail?.length || 80), 0);
  const fillPct = Math.min(charEstimate / meta.target * 100, 100);

  function handleDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
  function handleDrop(e) {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      onDropCard(data.cardId, data.source, sectionKey);
    } catch {}
  }

  return (
    <motion.div onDragOver={handleDragOver} onDrop={handleDrop}
      className="rounded-2xl p-4 relative overflow-hidden transition-all duration-200"
      style={{
        background: isOver ? `${meta.bg}` : cards.length > 0 ? meta.bg : 'rgba(255,255,255,0.015)',
        border: `1.5px ${isOver ? 'solid' : cards.length > 0 ? 'solid' : 'dashed'} ${isOver ? meta.color : cards.length > 0 ? meta.border : 'rgba(255,255,255,0.06)'}`,
        boxShadow: isOver ? `0 0 30px ${meta.glow}, inset 0 0 30px ${meta.glow}` : 'none',
      }}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>

      {cards.length > 0 && !isOver && <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${meta.glow} 0%, transparent 60%)` }} />}

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>{meta.num}</span>
          <span className="text-xs font-semibold" style={{ color: meta.color }}>{meta.title}</span>
        </div>
        <span className="text-[10px] tabular-nums" style={{ color: meta.color, opacity: 0.6 }}>~{meta.target} chars</span>
      </div>

      <div className="h-1 rounded-full mb-3 relative z-10" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <motion.div className="h-full rounded-full" style={{ background: meta.color }} initial={{ width: 0 }} animate={{ width: `${fillPct}%` }} transition={{ duration: 0.5 }} />
      </div>

      <div className="space-y-2 relative z-10 min-h-[48px]">
        <AnimatePresence mode="popLayout">
          {cards.map(card => (
            <DraggableCard key={card.id} card={card} source={sectionKey} onDragStart={onDragStartCard} isAssigned
              isPriority={card.priority} onStar={() => onStar(card, sectionKey)} onRemove={() => onRemove(card, sectionKey)}
              onClick={() => onTapAssign(card, sectionKey)} />
          ))}
        </AnimatePresence>
        {cards.length === 0 && (
          <div className="text-center py-6 rounded-xl" style={{ border: isOver ? 'none' : '1px dashed rgba(255,255,255,0.04)' }}>
            <p className="text-[10px] italic" style={{ color: isOver ? meta.color : 'rgba(255,255,255,0.15)' }}>
              {isOver ? 'Drop here' : 'Drag cards here'}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ScaffoldSection({ sectionKey, text, annotations, expanded, onToggle }) {
  const meta = SECTIONS[sectionKey];
  if (!meta) return null;
  const parts = (text || '').split(/(\[EXPAND[^\]]*\])/g);
  const sectionAnns = (annotations || []).filter(a => a.section === sectionKey);
  const cleanChars = (text || '').replace(/\[EXPAND[^\]]*\]/g, '').length;
  const fillPct = Math.min(cleanChars / meta.target * 100, 100);

  return (
    <motion.div className="rounded-2xl overflow-hidden relative"
      style={{ border: `1px solid ${expanded ? meta.border : 'rgba(255,255,255,0.06)'}` }}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {expanded && <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${meta.glow} 0%, transparent 50%)` }} />}

      <button className="w-full px-5 py-4 flex items-center justify-between relative z-10" onClick={onToggle} style={{ background: expanded ? meta.bg : 'rgba(255,255,255,0.02)' }}>
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>{meta.num}</span>
          <div>
            <span className="text-sm font-semibold text-white/80 block text-left">{meta.title}</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-20 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ background: meta.color, width: `${fillPct}%`, transition: 'width 0.5s' }} />
              </div>
              <span className="text-[10px] tabular-nums" style={{ color: meta.color }}>{cleanChars}/{meta.target}</span>
            </div>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-5 pb-5 relative z-10">
              {sectionAnns.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {sectionAnns.map((ann, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium"
                      style={{ background: ann.type === 'strength' ? 'rgba(52,211,153,0.1)' : ann.type === 'gap' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)', color: ann.type === 'strength' ? '#34d399' : ann.type === 'gap' ? '#fbbf24' : '#f87171', border: `1px solid ${ann.type === 'strength' ? 'rgba(52,211,153,0.2)' : ann.type === 'gap' ? 'rgba(251,191,36,0.2)' : 'rgba(248,113,113,0.2)'}` }}>
                      {ann.type === 'strength' ? <Check className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {ann.text}
                    </span>
                  ))}
                </div>
              )}
              <div className="rounded-xl p-5 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: meta.color, opacity: 0.4 }} />
                <div className="text-sm leading-[1.8] pl-3">
                  {parts.map((part, i) => {
                    if (part.startsWith('[EXPAND')) {
                      const instruction = part.replace('[EXPAND:', '').replace('[EXPAND', '').replace(']', '').trim();
                      return (
                        <motion.span key={i} className="block my-2 px-3 py-2.5 rounded-xl text-xs leading-relaxed"
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}
                          style={{ background: `linear-gradient(135deg, ${meta.bg}, rgba(255,255,255,0.02))`, border: `1px solid ${meta.border}` }}>
                          <PenTool className="w-3 h-3 inline mr-1.5 -mt-0.5" style={{ color: meta.color }} />
                          <span style={{ color: meta.color, opacity: 0.8 }}>{instruction || 'Expand this section in your own words.'}</span>
                        </motion.span>
                      );
                    }
                    return <span key={i} className="text-white/65">{part}</span>;
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


export default function DraftBuilder() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const tier = userProfile?.plan || 'free';
  const isFree = tier === 'free';

  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scaffoldLoading, setScaffoldLoading] = useState(false);
  const [scaffold, setScaffold] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [expandedSection, setExpandedSection] = useState('motivation');

  const [pool, setPool] = useState([]);
  const [assigned, setAssigned] = useState({ motivation: [], preparation: [], experiences: [] });
  const [dragOverTarget, setDragOverTarget] = useState(null);
  const [tapModal, setTapModal] = useState(null); // { card, source } for mobile fallback

  useEffect(() => {
    if (!currentUser) { setError('Sign in to use the Draft Builder.'); setLoading(false); return; }
    if (isFree) { setError('The Draft Builder is a paid feature.'); setLoading(false); return; }
    fetch(`${API_BASE}/get-ps-brief`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: currentUser.uid }) })
      .then(res => { if (!res.ok) return res.json().then(d => { throw new Error(d.detail || 'Failed to load'); }); return res.json(); })
      .then(data => {
        setBrief(data);
        setPool((data.cards || []).map((c, i) => ({ ...c, id: `card_${i}`, priority: false })));
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [currentUser, isFree]);

  // Universal move: handles drag-drop AND tap-assign
  const moveCard = useCallback((cardId, fromSource, toTarget) => {
    if (fromSource === toTarget) return;

    let card = null;

    // Find and remove from source
    if (fromSource === 'pool') {
      setPool(prev => { card = prev.find(c => c.id === cardId); return prev.filter(c => c.id !== cardId); });
    } else {
      setAssigned(prev => {
        card = prev[fromSource]?.find(c => c.id === cardId);
        return { ...prev, [fromSource]: prev[fromSource].filter(c => c.id !== cardId) };
      });
    }

    // Add to target (use setTimeout to ensure state has updated)
    setTimeout(() => {
      if (!card) return;
      if (toTarget === 'pool') {
        setPool(prev => [...prev, { ...card, priority: false }]);
      } else {
        setAssigned(prev => ({ ...prev, [toTarget]: [...prev[toTarget], { ...card, priority: toTarget === fromSource ? card.priority : false }] }));
      }
    }, 0);
  }, []);

  function handleDrop(cardId, fromSource, toTarget) {
    moveCard(cardId, fromSource, toTarget);
    setDragOverTarget(null);
  }

  function toggleStar(card, sectionKey) {
    setAssigned(prev => ({ ...prev, [sectionKey]: prev[sectionKey].map(c => c.id === card.id ? { ...c, priority: !c.priority } : c) }));
  }

  // Tap handler: for pool cards opens section picker, for assigned cards opens move/remove picker
  function handleTap(card, source) {
    setTapModal({ card, source });
  }

  const totalAssigned = assigned.motivation.length + assigned.preparation.length + assigned.experiences.length;
  const totalCards = totalAssigned + pool.length;

  function handleBuild() {
    setScaffoldLoading(true);
    const sa = {};
    for (const [key, cards] of Object.entries(assigned)) {
      if (cards.length > 0) sa[key] = cards.map(c => ({ title: c.title, detail: c.detail || '', priority: c.priority }));
    }
    fetch(`${API_BASE}/generate-ps`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUser.uid, tier, section_assignments: Object.keys(sa).length > 0 ? sa : null }) })
      .then(res => { if (!res.ok) return res.json().then(d => { throw new Error(d.detail || 'Build failed'); }); return res.json(); })
      .then(data => { setScaffold(data.sections); setAnnotations(data.annotations || []); setScaffoldLoading(false); setStep(2); })
      .catch(err => { setError(err.message); setScaffoldLoading(false); });
  }

  // Track dragover for visual feedback
  function handleGlobalDragOver(e) { e.preventDefault(); }

  return (
    <div className="min-h-screen flex flex-col relative" style={{ background: '#111113' }} onDragOver={handleGlobalDragOver}>
      <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(249,106,80,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(96,165,250,0.04) 0%, transparent 50%)' }} />

      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(17,17,19,0.85)', backdropFilter: 'blur(16px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center"><GraduationCap className="w-4.5 h-4.5 text-white" /></div>
            <span className="text-lg font-display font-bold text-white">myuni<span className="text-coral-500">offer</span> <span className="text-white/40">ai</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/chat" className="text-white/40 hover:text-white/70 transition-colors text-sm flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Chat</Link>
            <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.08)' }} />
            {!isFree && <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(249,106,80,0.15)', color: '#f96a50' }}><Crown className="w-3 h-3" /> {tier === 'premium' ? 'Premium' : tier.toUpperCase()}</span>}
            <Link to="/settings" className="text-white/30 hover:text-white/60 transition-colors"><Settings className="w-4 h-4" /></Link>
          </div>
        </div>
      </nav>

      {loading && <div className="flex-1 flex items-center justify-center"><Loader2 className="w-5 h-5 text-coral-400 animate-spin" /></div>}

      {!loading && error && (
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="text-center max-w-lg">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(249,106,80,0.1)', border: '1px solid rgba(249,106,80,0.2)' }}><Sparkles className="w-7 h-7 text-coral-400" /></div>
            <h2 className="text-xl font-display font-bold text-white mb-3">Your Draft Builder isn't ready yet</h2>
            <p className="text-sm text-white/50 leading-relaxed mb-6">Chat with the coach about your subject, experiences, and reflections first. The Draft Builder turns those conversations into a structured starting point.</p>
            <div className="rounded-xl p-5 mb-6 text-left" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">How to unlock it</p>
              {['Tell the coach what subject you are applying for', 'Share your experiences: work, volunteering, projects, reading', 'Reflect on what those experiences taught you', 'Come back here when you have enough material'].map((s, i) => (
                <div key={i} className="flex items-start gap-3 mb-2.5"><span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ background: 'rgba(249,106,80,0.15)', color: '#f96a50' }}>{i + 1}</span><p className="text-sm text-white/50">{s}</p></div>
              ))}
            </div>
            <Link to="/chat" className="inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3.5 px-6 rounded-xl text-sm shadow-lg shadow-coral-500/20">Start coaching <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      )}

      {!loading && !error && brief && (
        <div className="flex-1 px-6 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <StepIndicator current={step} />

            {/* ═══ STEP 0: BRIEF ═══ */}
            {step === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-center mb-8">
                  <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">Your material</h1>
                  <p className="text-white/35 text-sm">Everything from your coaching conversations. Review it, then arrange into your PS.</p>
                  {brief.subject && <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(249,106,80,0.08)', color: 'rgba(249,106,80,0.6)', border: '1px solid rgba(249,106,80,0.15)' }}>Applying for: {brief.subject}</span>}
                </div>
                {brief.gaps?.length > 0 && (
                  <div className="mb-6 rounded-xl px-4 py-3" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.12)' }}>
                    <div className="flex items-center gap-2 mb-1.5"><AlertTriangle className="w-3.5 h-3.5 text-amber-400" /><span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">Gaps</span></div>
                    {brief.gaps.map((g, i) => <p key={i} className="text-xs text-white/40 mb-0.5">{g}</p>)}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  <AnimatePresence>{pool.map((card, i) => <DraggableCard key={card.id} card={card} source="pool" delay={i * 0.03} onClick={() => {}} />)}</AnimatePresence>
                </div>
                <div className="text-center">
                  <button onClick={() => setStep(1)} className="gradient-primary text-white font-semibold py-3.5 px-8 rounded-xl text-sm shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">Arrange into sections <ArrowRight className="w-4 h-4" /></button>
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 1: BUILDER ═══ */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-center mb-6">
                  <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">Arrange your material</h1>
                  <p className="text-white/35 text-sm">Drag cards into sections. Star your strongest material. The AI will follow your arrangement.</p>
                </div>

                {/* Pool */}
                {pool.length > 0 && (
                  <div className="mb-6 rounded-2xl p-4 transition-all duration-200"
                    style={{ background: dragOverTarget === 'pool' ? 'rgba(255,255,255,0.04)' : 'transparent', border: `1.5px dashed ${dragOverTarget === 'pool' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}` }}
                    onDragOver={e => { e.preventDefault(); setDragOverTarget('pool'); }}
                    onDragLeave={() => setDragOverTarget(null)}
                    onDrop={e => { e.preventDefault(); try { const d = JSON.parse(e.dataTransfer.getData('application/json')); handleDrop(d.cardId, d.source, 'pool'); } catch {} }}>
                    <p className="text-[10px] font-semibold text-white/25 uppercase tracking-wider mb-2">Not yet placed ({pool.length})</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <AnimatePresence mode="popLayout">
                        {pool.map(card => (
                          <DraggableCard key={card.id} card={card} source="pool" onDragStart={() => {}}
                            onClick={() => handleTap(card, 'pool')} />
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Tap modal (mobile fallback + reassign) */}
                <AnimatePresence>
                  {tapModal && (
                    <motion.div className="fixed inset-0 z-[100] flex items-center justify-center px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div className="absolute inset-0 bg-black/60" onClick={() => setTapModal(null)} />
                      <motion.div className="relative rounded-2xl p-6 max-w-sm w-full" style={{ background: '#1a1a1c', border: '1px solid rgba(255,255,255,0.1)' }}
                        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}>
                        <p className="text-sm font-semibold text-white mb-1">{tapModal.source === 'pool' ? 'Place in section' : 'Move to'}</p>
                        <p className="text-xs text-white/35 mb-4 truncate">{tapModal.card.title}</p>
                        <div className="space-y-2">
                          {Object.entries(SECTIONS).map(([key, meta]) => {
                            const isCurrent = tapModal.source === key;
                            return (
                              <button key={key} onClick={() => { if (!isCurrent) { moveCard(tapModal.card.id, tapModal.source, key); setTapModal(null); } }}
                                disabled={isCurrent}
                                className="w-full rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-30 disabled:hover:scale-100"
                                style={{ background: meta.bg, border: `1px solid ${meta.border}` }}>
                                <span className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold" style={{ background: meta.bg, color: meta.color }}>{meta.num}</span>
                                <span className="text-xs font-semibold" style={{ color: meta.color }}>{meta.title}</span>
                                {isCurrent && <span className="text-[9px] ml-auto" style={{ color: meta.color }}>current</span>}
                                {!isCurrent && <span className="text-[10px] ml-auto" style={{ color: meta.color, opacity: 0.4 }}>{assigned[key].length} items</span>}
                              </button>
                            );
                          })}
                          {tapModal.source !== 'pool' && (
                            <button onClick={() => { moveCard(tapModal.card.id, tapModal.source, 'pool'); setTapModal(null); }}
                              className="w-full rounded-xl px-4 py-3 flex items-center gap-3 transition-all hover:scale-[1.02]"
                              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                              <X className="w-4 h-4 text-white/30" />
                              <span className="text-xs font-semibold text-white/40">Remove from section</span>
                            </button>
                          )}
                        </div>
                        <button onClick={() => setTapModal(null)} className="w-full text-center text-xs text-white/25 mt-3 py-2 hover:text-white/40 transition-colors">Cancel</button>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Section drop zones */}
                <div className="space-y-3 mb-8">
                  {Object.keys(SECTIONS).map(key => (
                    <div key={key}
                      onDragEnter={() => setDragOverTarget(key)}
                      onDragLeave={e => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOverTarget(null); }}
                    >
                      <DropZone sectionKey={key} cards={assigned[key]} dragOverTarget={dragOverTarget}
                        onDropCard={handleDrop}
                        onStar={toggleStar}
                        onRemove={(card, sk) => moveCard(card.id, sk, 'pool')}
                        onDragStartCard={() => {}}
                        onTapAssign={(card, sk) => handleTap(card, sk)} />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button onClick={() => setStep(0)} className="text-sm text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/25">{totalAssigned}/{totalCards} placed</span>
                    <button onClick={handleBuild} disabled={scaffoldLoading || totalAssigned === 0}
                      className="gradient-primary text-white font-semibold py-3 px-6 rounded-xl text-sm shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2">
                      {scaffoldLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Building...</> : <><Zap className="w-4 h-4" /> Build my draft</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ STEP 2: DRAFT ═══ */}
            {step === 2 && scaffold && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-center mb-6">
                  <h1 className="text-2xl lg:text-3xl font-display font-bold text-white mb-2">Your draft scaffold</h1>
                  <p className="text-white/35 text-sm">Expand the highlighted prompts. Rewrite in your voice. This is your starting point.</p>
                </div>
                <div className="mb-6 rounded-xl px-4 py-3 flex items-start gap-3" style={{ background: 'rgba(96,165,250,0.05)', border: '1px solid rgba(96,165,250,0.12)' }}>
                  <Zap className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-300/70">This is a scaffold built from your arrangement. Expand each section, replace generic phrasing, and use Rate My PS to check your score.</p>
                </div>
                <div className="space-y-3 mb-8">
                  {Object.keys(SECTIONS).map(key => (
                    <ScaffoldSection key={key} sectionKey={key} text={scaffold[key]} annotations={annotations}
                      expanded={expandedSection === key} onToggle={() => setExpandedSection(expandedSection === key ? null : key)} />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button onClick={() => setStep(1)} className="text-sm text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Rearrange</button>
                  <div className="flex items-center gap-3">
                    <button onClick={() => { setScaffold(null); handleBuild(); }} disabled={scaffoldLoading} className="text-sm text-coral-400 hover:text-coral-300 font-medium transition-colors flex items-center gap-1.5 disabled:opacity-30"><RotateCcw className="w-3.5 h-3.5" /> Rebuild</button>
                    <Link to="/rate-my-ps" className="inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3 px-5 rounded-xl text-sm shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">Rate my draft <ArrowRight className="w-4 h-4" /></Link>
                  </div>
                </div>
                <p className="text-xs text-white/15 text-center mt-6">Rewrite this scaffold in your own voice before submitting anywhere.</p>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
