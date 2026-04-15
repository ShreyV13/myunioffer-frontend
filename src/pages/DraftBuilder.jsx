import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowLeft, ArrowRight, Sparkles, AlertTriangle, Check, ChevronDown, ChevronUp, Loader2, Settings, Crown, BookOpen, Briefcase, Star, Lightbulb, GripVertical, Zap, PenTool } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

const SECTION_META = {
  motivation: { num: 1, title: 'Why this subject?', target: 800, color: '#f96a50', bg: 'rgba(249,106,80,0.10)', border: 'rgba(249,106,80,0.25)' },
  preparation: { num: 2, title: 'How have you prepared?', target: 1800, color: '#60a5fa', bg: 'rgba(96,165,250,0.10)', border: 'rgba(96,165,250,0.25)' },
  experiences: { num: 3, title: 'What have you done?', target: 1200, color: '#34d399', bg: 'rgba(52,211,153,0.10)', border: 'rgba(52,211,153,0.25)' },
};

const CARD_TYPES = {
  experience: { icon: Briefcase, color: '#34d399', bg: 'rgba(52,211,153,0.10)', border: 'rgba(52,211,153,0.20)', label: 'Experience' },
  academic: { icon: BookOpen, color: '#60a5fa', bg: 'rgba(96,165,250,0.10)', border: 'rgba(96,165,250,0.20)', label: 'Academic' },
  supercurricular: { icon: Star, color: '#a78bfa', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.20)', label: 'Supercurricular' },
  reading: { icon: BookOpen, color: '#fbbf24', bg: 'rgba(251,191,36,0.10)', border: 'rgba(251,191,36,0.20)', label: 'Reading' },
  reflection: { icon: Lightbulb, color: '#f97316', bg: 'rgba(249,115,22,0.10)', border: 'rgba(249,115,22,0.20)', label: 'Reflection' },
};

function MaterialCard({ card, index, onAssign, compact }) {
  const ct = CARD_TYPES[card.type] || CARD_TYPES.experience;
  const Icon = ct.icon;
  return (
    <motion.div
      layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-xl p-3 cursor-pointer transition-all duration-200 group"
      style={{ background: ct.bg, border: `1px solid ${ct.border}` }}
      onClick={onAssign}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: ct.bg }}>
          <Icon className="w-3.5 h-3.5" style={{ color: ct.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xs font-semibold text-white/80 truncate">{card.title}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded font-medium flex-shrink-0" style={{ background: ct.bg, color: ct.color }}>{ct.label}</span>
          </div>
          {card.detail && !compact && <p className="text-[10px] text-white/35 leading-relaxed line-clamp-2">{card.detail}</p>}
        </div>
        {onAssign && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
            <ArrowRight className="w-3.5 h-3.5 text-white/30" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ScaffoldRenderer({ text }) {
  if (!text) return null;
  const parts = text.split(/(\[EXPAND[^\]]*\])/g);
  return (
    <div className="text-sm leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith('[EXPAND')) {
          const instruction = part.replace('[EXPAND:', '').replace('[EXPAND', '').replace(']', '').trim();
          return (
            <span key={i} className="inline-block my-1.5 px-3 py-2 rounded-lg text-xs leading-relaxed w-full" style={{ background: 'rgba(249,106,80,0.08)', border: '1px solid rgba(249,106,80,0.15)', color: 'rgba(249,106,80,0.7)' }}>
              <PenTool className="w-3 h-3 inline mr-1.5 -mt-0.5" style={{ color: '#f96a50' }} />
              {instruction || 'Expand this section with your own words and details.'}
            </span>
          );
        }
        return <span key={i} className="text-white/70">{part}</span>;
      })}
    </div>
  );
}


export default function DraftBuilder() {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const tier = userProfile?.plan || 'free';
  const isFree = tier === 'free';

  const [pageState, setPageState] = useState('loading'); // loading | brief | editor | error
  const [brief, setBrief] = useState(null);
  const [error, setError] = useState('');
  const [scaffold, setScaffold] = useState(null);
  const [scaffoldLoading, setScaffoldLoading] = useState(false);
  const [annotations, setAnnotations] = useState([]);
  const [expandedSection, setExpandedSection] = useState('motivation');
  const [editorText, setEditorText] = useState({ motivation: '', preparation: '', experiences: '' });

  // Fetch brief on mount
  useEffect(() => {
    if (!currentUser) { setPageState('error'); setError('Sign in to use the Draft Builder.'); return; }
    if (isFree) { setPageState('error'); setError('The Draft Builder is a paid feature.'); return; }
    
    fetch(`${API_BASE}/get-ps-brief`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUser.uid }),
    })
      .then(res => { if (!res.ok) return res.json().then(d => { throw new Error(d.detail || 'Failed to load'); }); return res.json(); })
      .then(data => { setBrief(data); setPageState('brief'); })
      .catch(err => { setError(err.message); setPageState('error'); });
  }, [currentUser, isFree]);

  function handleGenerateScaffold() {
    setScaffoldLoading(true);
    fetch(`${API_BASE}/generate-ps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUser.uid, tier }),
    })
      .then(res => { if (!res.ok) return res.json().then(d => { throw new Error(d.detail || 'Generation failed'); }); return res.json(); })
      .then(data => {
        setScaffold(data.sections);
        setAnnotations(data.annotations || []);
        setEditorText({
          motivation: data.sections.motivation || '',
          preparation: data.sections.preparation || '',
          experiences: data.sections.experiences || '',
        });
        setScaffoldLoading(false);
        setPageState('editor');
      })
      .catch(err => { setError(err.message); setScaffoldLoading(false); });
  }

  function getCharCount(key) {
    // Count only the student's text, not [EXPAND] markers
    const text = editorText[key] || '';
    return text.replace(/\[EXPAND[^\]]*\]/g, '').length;
  }

  const totalChars = getCharCount('motivation') + getCharCount('preparation') + getCharCount('experiences');

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#1a1a1a' }}>
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(249,106,80,0.05) 0%, transparent 50%)' }} />

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b" style={{ background: 'rgba(34,34,34,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center"><GraduationCap className="w-4.5 h-4.5 text-white" /></div>
            <span className="text-lg font-display font-bold text-white">myuni<span className="text-coral-500">offer</span> <span className="text-white/40">ai</span></span>
          </Link>
          <div className="flex items-center gap-3">
            {currentUser && (
              <>
                <Link to="/chat" className="text-white/40 hover:text-white/70 transition-colors text-sm flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Chat</Link>
                <div className="w-px h-4" style={{ background: 'rgba(255,255,255,0.1)' }} />
                {!isFree && <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(249,106,80,0.15)', color: '#f96a50' }}><Crown className="w-3 h-3" /> {tier === 'premium' ? 'Premium' : tier.toUpperCase()}</span>}
                <Link to="/settings" className="text-white/30 hover:text-white/60 transition-colors"><Settings className="w-4 h-4" /></Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ═══ LOADING ═══ */}
      {pageState === 'loading' && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-6 h-6 text-coral-400 animate-spin mx-auto mb-3" />
            <p className="text-sm text-white/30">Loading your material...</p>
          </div>
        </div>
      )}

      {/* ═══ ERROR ═══ */}
      {pageState === 'error' && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-4" />
            <p className="text-sm text-white/60 mb-6">{error}</p>
            <Link to="/chat" className="inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3 px-5 rounded-xl text-sm">
              Go to coach <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      {/* ═══ BRIEF ═══ */}
      {pageState === 'brief' && brief && (
        <div className="flex-1 px-6 py-10 lg:py-14 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-3">Draft Builder</h1>
              <p className="text-white/40 text-base max-w-lg mx-auto">Your coaching conversations have been turned into building blocks. Review your material, then generate a scaffold to start writing.</p>
              {brief.subject && (
                <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full" style={{ background: 'rgba(249,106,80,0.08)', border: '1px solid rgba(249,106,80,0.15)' }}>
                  <span className="text-xs font-medium text-coral-400">Applying for: {brief.subject}</span>
                </div>
              )}
            </motion.div>

            {/* Gaps */}
            {brief.gaps && brief.gaps.length > 0 && (
              <motion.div className="mb-8 rounded-xl p-4" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Gaps in your material</span>
                </div>
                {brief.gaps.map((g, i) => (
                  <p key={i} className="text-xs text-white/50 leading-relaxed mb-1">{g}</p>
                ))}
                <Link to="/chat" className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium mt-2 transition-colors">
                  Go back to coach to fill gaps <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            )}

            {/* Material cards */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold text-white/30 uppercase tracking-wider">Your material ({brief.total_items} items)</h2>
                <span className="text-xs text-white/20">From your coaching conversations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
                <AnimatePresence>
                  {brief.cards && brief.cards.map((card, i) => (
                    <MaterialCard key={i} card={card} index={i} compact={false} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Section preview */}
            <motion.div className="mb-10" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Your PS structure</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {Object.entries(SECTION_META).map(([key, meta]) => (
                  <div key={key} className="rounded-xl p-4" style={{ background: meta.bg, border: `1px solid ${meta.border}` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>{meta.num}</span>
                      <span className="text-sm font-semibold" style={{ color: meta.color }}>{meta.title}</span>
                    </div>
                    <p className="text-[10px] text-white/30">Target: ~{meta.target.toLocaleString()} characters</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Generate button */}
            <motion.div className="text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <button
                onClick={handleGenerateScaffold}
                disabled={scaffoldLoading || brief.quality === 'empty'}
                className="gradient-primary text-white font-semibold py-4 px-8 rounded-xl text-base shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-30 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {scaffoldLoading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Generating scaffold...</>
                ) : (
                  <><Sparkles className="w-4 h-4" /> Generate my scaffold</>
                )}
              </button>
              <p className="text-xs text-white/20 mt-3">Creates a compressed starting point with coaching annotations. You'll rewrite and expand it.</p>
              {brief.quality === 'thin' && (
                <p className="text-xs text-amber-400/60 mt-2">Your profile is thin. The scaffold will have placeholder sections. Chat with the coach more for better results.</p>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* ═══ EDITOR ═══ */}
      {pageState === 'editor' && scaffold && (
        <div className="flex-1 px-6 py-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Editor header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-display font-bold text-white">Your scaffold is ready</h1>
                <p className="text-xs text-white/35 mt-1">Expand the orange prompts. Rewrite in your voice. This is your starting point, not your final draft.</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-display font-bold tabular-nums" style={{ color: totalChars > 4000 ? '#f87171' : totalChars > 3500 ? '#fbbf24' : '#34d399' }}>
                  {totalChars.toLocaleString()}
                </div>
                <div className="text-[10px] text-white/25">/ 4,000 characters</div>
              </div>
            </div>

            {/* Disclaimer banner */}
            <div className="mb-6 rounded-xl px-4 py-3 flex items-start gap-3" style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.15)' }}>
              <Zap className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-blue-300 font-medium">This is a scaffold, not a finished statement.</p>
                <p className="text-[10px] text-white/35 mt-0.5">It's built from your coaching conversations. Expand each section, replace generic phrasing with your own words, and use Rate My PS to check your score when done.</p>
              </div>
            </div>

            {/* Sections */}
            {Object.entries(SECTION_META).map(([key, meta]) => {
              const isExpanded = expandedSection === key;
              const chars = getCharCount(key);
              const pct = Math.min((chars / meta.target) * 100, 100);
              const sectionAnnotations = annotations.filter(a => a.section === key);

              return (
                <motion.div key={key} className="mb-4 rounded-xl overflow-hidden" style={{ border: `1px solid ${isExpanded ? meta.border : 'rgba(255,255,255,0.06)'}`, background: isExpanded ? 'rgba(255,255,255,0.02)' : '#1e1e1e' }}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * meta.num }}>

                  {/* Section header */}
                  <button className="w-full px-5 py-4 flex items-center justify-between" onClick={() => setExpandedSection(isExpanded ? null : key)}>
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: meta.bg, color: meta.color }}>{meta.num}</span>
                      <div className="text-left">
                        <span className="text-sm font-semibold text-white/80">{meta.title}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="w-24 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: meta.color }} />
                          </div>
                          <span className="text-[10px] tabular-nums" style={{ color: meta.color }}>{chars}/{meta.target}</span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-5 pb-5">
                          {/* Annotations */}
                          {sectionAnnotations.length > 0 && (
                            <div className="mb-3 space-y-1.5">
                              {sectionAnnotations.map((ann, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px] leading-relaxed">
                                  {ann.type === 'strength' && <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />}
                                  {ann.type === 'gap' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />}
                                  {ann.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />}
                                  <span className="text-white/40">{ann.text}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Scaffold text with EXPAND markers */}
                          <div className="rounded-xl p-5" style={{ background: '#242424', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <ScaffoldRenderer text={editorText[key]} />
                          </div>

                          {/* Editable textarea */}
                          <div className="mt-3">
                            <label className="text-[10px] text-white/25 uppercase tracking-wider mb-1.5 block">Edit and expand this section</label>
                            <textarea
                              value={editorText[key]}
                              onChange={e => setEditorText(prev => ({ ...prev, [key]: e.target.value }))}
                              className="w-full rounded-xl p-4 text-sm text-white/80 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-coral-500/30 transition-all placeholder:text-white/15"
                              style={{ background: '#1e1e1e', border: '1px solid rgba(255,255,255,0.08)', minHeight: key === 'preparation' ? '200px' : '140px' }}
                              placeholder="Start writing or edit the scaffold above..."
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Bottom bar */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button onClick={() => setPageState('brief')} className="text-sm text-white/30 hover:text-white/60 transition-colors flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to material
              </button>
              <div className="flex items-center gap-3">
                <button onClick={handleGenerateScaffold} disabled={scaffoldLoading}
                  className="text-sm text-coral-400 hover:text-coral-300 font-medium transition-colors flex items-center gap-1.5 disabled:opacity-30">
                  {scaffoldLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Regenerate scaffold
                </button>
                <Link to="/rate-my-ps" className="inline-flex items-center gap-2 gradient-primary text-white font-semibold py-3 px-5 rounded-xl text-sm shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                  Rate my draft <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <p className="text-xs text-white/15 text-center mt-6">This scaffold is a starting point built from your coaching sessions. Rewrite it in your own voice before submitting.</p>
          </div>
        </div>
      )}
    </div>
  );
}
