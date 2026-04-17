import React, { useState, useRef, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useScroll, useInView } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, Check, ArrowLeft, ArrowRight, Crown, CalendarCheck, Clock, MessageSquare, Shield, X, Brain, PenTool, BarChart3, Zap } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';

export default function Pricing() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(null);
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get('from');

  function Counter({ target, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!isInView) return;
      const num = parseInt(target.replace(/[^0-9]/g, ''));
      let current = 0;
      const timer = setInterval(() => { current += num / 30; if (current >= num) { setCount(num); clearInterval(timer); } else setCount(Math.floor(current)); }, 40);
      return () => clearInterval(timer);
    }, [isInView, target]);
    return <span ref={ref}>{isInView ? count + suffix : "0" + suffix}</span>;
  }

  async function handleSubscribe() {
    if (!currentUser) { window.location.href = '/signup?redirect=pricing'; return; }
    setLoading('premium');
    try {
      const res = await fetch(`${API_BASE}/create-checkout-session`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.uid, user_email: currentUser.email, plan_id: 'premium',
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}${fromPage ? '&from=' + fromPage : ''}`,
          cancel_url: window.location.href })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { console.error('Checkout error:', err); }
    setLoading(null);
  }

  const isPremium = userProfile?.plan === 'premium';

  const featureComparison = [
    { feature: 'Daily coaching messages', free: 'Limited', premium: 'Extended' },
    { feature: 'Subject-specific AI coaching', free: true, premium: true },
    { feature: 'Rate My PS', free: 'Score only', premium: 'Full line-by-line feedback' },
    { feature: 'Draft Builder', free: false, premium: true },
    { feature: 'Thinking mode', free: false, premium: true },
    { feature: 'Response depth', free: 'Brief', premium: 'Detailed' },
    { feature: 'Interview coaching', free: true, premium: true },
    { feature: '1000+ resources', free: false, premium: true },
    { feature: 'Priority support', free: false, premium: true },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = "/"} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" /><span className="font-medium">Back</span>
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background: 'linear-gradient(135deg, #f96a50, #e74d32)'}}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold hidden sm:inline">myuni<span style={{color: '#f96a50'}}>offer</span> <span className="text-gray-400">ai</span></span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 relative overflow-hidden">
        <motion.div className="absolute -top-40 -right-40 w-80 h-80 bg-coral-200 rounded-full opacity-[0.06] blur-3xl pointer-events-none" />
        <motion.div className="absolute top-60 -left-40 w-60 h-60 bg-coral-300 rounded-full opacity-[0.04] blur-3xl pointer-events-none" />

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4 relative z-10">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 leading-tight">
            Don't leave your application<br /><span className="gradient-text">to chance.</span>
          </h1>
          <motion.div className="h-0.5 gradient-primary rounded-full mx-auto mt-2 mb-6" initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 0.4 }} />
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Thousands of students with perfect grades get rejected every year because their personal statement didn't stand out. Preparation is the difference.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div className="flex flex-wrap justify-center gap-10 py-8 mb-6" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {[{ num: "120", suffix: "+", label: "students signed up" }, { num: "1000", suffix: "+", label: "resources" }, { num: "99", suffix: "%", label: "cheaper than tutoring" }].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-display font-bold text-coral-500"><Counter target={stat.num} suffix={stat.suffix} /></div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Value anchor FIRST */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="max-w-2xl mx-auto mb-12">
          <div className="relative overflow-hidden rounded-2xl border-2 border-coral-100">
            <div className="absolute inset-0 gradient-primary opacity-[0.04]" />
            <div className="relative z-10 p-6 text-center">
              <p className="text-gray-500 text-sm mb-2">A private admissions tutor costs</p>
              <div className="text-4xl md:text-5xl font-display font-bold text-gray-200 line-through mb-1">£200+/month</div>
              <p className="text-gray-600 text-sm">myunioffer.ai is <span className="font-bold text-coral-500">£9.99/month</span>. That's <span className="font-bold text-gray-800">less than £2.50 a week.</span></p>
            </div>
          </div>
        </motion.div>

        {/* Two plans side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
          {/* Free */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="card p-8 relative">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-5">
              <MessageSquare className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-1">Free</h3>
            <p className="text-gray-500 text-sm mb-5">Try the coaching. See if it works for you.</p>
            <div className="mb-6">
              <span className="text-4xl font-display font-bold text-gray-900">£0</span>
              <span className="text-sm text-gray-500">/forever</span>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'PS + Interview coaching daily',
                'Subject-specific AI coaching',
                'Rate My PS (score only)',
                'Interview coaching',
              ].map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{f}
                </li>
              ))}
              {[
                'Full PS feedback',
                'Draft Builder',
                'Thinking mode',
                '1000+ resources',
                'Priority support',
              ].map((f, j) => (
                <li key={`no-${j}`} className="flex items-start gap-2.5 text-sm text-gray-400">
                  <span className="w-4 h-4 flex-shrink-0 mt-0.5 text-center text-gray-300">✕</span>{f}
                </li>
              ))}
            </ul>
            <Link to={currentUser ? "/chat" : "/signup"} className="block text-center w-full py-3 rounded-xl font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all">
              {currentUser ? 'Continue Free' : 'Sign Up Free'}
            </Link>
          </motion.div>

          {/* Premium */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="card p-8 relative border-2 border-coral-500 shadow-xl shadow-coral-500/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-white text-xs font-semibold px-4 py-1 rounded-full">Recommended</div>

            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-1">Premium</h3>
            <p className="text-gray-500 text-sm mb-5">Everything you need. No limits on what you can access.</p>
            <div className="mb-1">
              <span className="text-4xl font-display font-bold text-gray-900">£9.99</span>
              <span className="text-sm text-gray-500">/mo</span>
            </div>
            <p className="text-[11px] text-coral-500 font-medium mb-5">less than £2.50 a week. Cancel anytime.</p>

            <ul className="space-y-3 mb-8">
              {[
                'More daily coaching messages',
                'PS + Interview coaching',
                'Rate My PS with full line-by-line feedback',
                'Draft Builder to structure your statement',
                'Thinking mode for deeper responses',
                '1000+ real resources',
                'Priority support',
              ].map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-coral-500 flex-shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>

            {isPremium ? (
              <button disabled className="w-full py-3.5 rounded-xl font-semibold bg-gray-100 text-gray-500 cursor-not-allowed">Current Plan</button>
            ) : (
              <button onClick={handleSubscribe} disabled={loading === 'premium'}
                className="w-full py-3.5 rounded-xl font-semibold btn-primary text-base">
                {loading === 'premium' ? 'Loading...' : currentUser ? 'Subscribe Now' : 'Sign Up to Subscribe'}
              </button>
            )}
          </motion.div>
        </div>

        {/* What you get with Premium - visual showcase */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 text-center">What Premium unlocks</h2>
          <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-10" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              { icon: MessageSquare, title: 'AI Coach', desc: 'Extended daily messages. Pushes your thinking on PS and interviews. Tailored to your subject.' },
              { icon: BarChart3, title: 'Rate My PS', desc: 'Score out of 100 with line-by-line feedback. Every weak sentence highlighted. Every fix explained.' },
              { icon: PenTool, title: 'Draft Builder', desc: 'Your coaching conversations become building blocks. Arrange them into UCAS sections. Get a structured scaffold.' },
              { icon: Brain, title: 'Thinking Mode', desc: 'The AI takes longer to think. The response is deeper, more specific, and quotes your exact words back to you.' },
            ].map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div key={i} className="rounded-2xl p-6 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{background: 'rgba(249,106,80,0.08)'}}>
                    <Icon className="w-5 h-5" style={{color: '#f96a50'}} />
                  </div>
                  <h3 className="text-sm font-display font-bold text-gray-900 mb-1.5">{feat.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Feature comparison table */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 text-center">Free vs Premium</h2>
          <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-8" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          <div className="card overflow-hidden">
            <table className="w-full text-sm" style={{borderCollapse: 'separate', borderSpacing: 0}}>
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-900"></th>
                  <th className="text-center p-4 font-semibold text-gray-500">Free</th>
                  <th className="text-center p-4 font-semibold text-coral-500">Premium</th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, i) => (
                  <tr key={i} className={i < featureComparison.length - 1 ? 'border-b border-gray-50' : ''}>
                    <td className="p-4 text-gray-600">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.free === true ? <Check className="w-4 h-4 text-green-500 mx-auto" /> :
                       row.free === false ? <span className="text-gray-300">✕</span> :
                       <span className="text-xs text-gray-400">{row.free}</span>}
                    </td>
                    <td className="p-4 text-center">
                      {row.premium === true ? <Check className="w-4 h-4 text-coral-500 mx-auto" /> :
                       <span className="text-xs text-gray-700 font-medium">{row.premium}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 text-center">Premium users get significantly more daily messages than free users.</p>
            </div>
          </div>
        </motion.div>

        {/* Loss aversion */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 text-center">What happens without it</h2>
          <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-8" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div className="rounded-2xl p-6 border-2 border-gray-200 relative" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="absolute -top-3 left-4 bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Without Premium</div>
              <ul className="space-y-3 mt-3 text-sm text-gray-500">
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-300 flex-shrink-0 mt-0.5" />You don't know what's weak until an admissions tutor reads it</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-300 flex-shrink-0 mt-0.5" />Your PS sounds like every other applicant's</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-300 flex-shrink-0 mt-0.5" />You have no structured way to turn ideas into a first draft</li>
                <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-300 flex-shrink-0 mt-0.5" />Free messages run out when you're in the middle of drafting</li>
              </ul>
            </motion.div>
            <motion.div className="rounded-2xl p-6 border-2 border-coral-200 relative" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <div className="absolute -top-3 left-4 gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full">With Premium</div>
              <ul className="space-y-3 mt-3 text-sm text-gray-700">
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-coral-500 flex-shrink-0 mt-0.5" />Every weak sentence highlighted before you submit</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-coral-500 flex-shrink-0 mt-0.5" />An AI that pushes you until your voice comes through</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-coral-500 flex-shrink-0 mt-0.5" />A structured draft built from your own material</li>
                <li className="flex items-start gap-2"><Check className="w-4 h-4 text-coral-500 flex-shrink-0 mt-0.5" />Enough coaching to get through a full drafting session</li>
              </ul>
            </motion.div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">All for less than the price of one hour with a tutor.</p>
        </motion.div>

        {/* Comparison to alternatives */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="mb-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 text-center">How we compare</h2>
          <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-8" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          <div className="card overflow-hidden">
            <table className="w-full text-sm" style={{borderCollapse: 'separate', borderSpacing: 0}}>
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 font-semibold text-gray-900"></th>
                  <th className="text-center p-4 font-semibold text-coral-500">myunioffer.ai</th>
                  <th className="text-center p-4 font-semibold text-gray-500">Private tutors</th>
                  <th className="text-center p-4 font-semibold text-gray-500">Agencies</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['PS Coaching', true, true, true],
                  ['Interview Prep', true, 'Sometimes', true],
                  ['Instant PS Scoring', true, false, false],
                  ['Line-by-line Feedback', true, false, true],
                  ['Draft Builder', true, false, false],
                  ['Available 24/7', true, false, false],
                ].map(([feature, us, tutors, agencies], i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="p-4 text-gray-600">{feature}</td>
                    <td className="p-4 text-center">{us === true ? <Check className="w-4 h-4 text-coral-500 mx-auto" /> : <span className="text-gray-400">{us}</span>}</td>
                    <td className="p-4 text-center">{tutors === true ? <Check className="w-4 h-4 text-gray-400 mx-auto" /> : tutors === false ? <span className="text-gray-300">✕</span> : <span className="text-gray-400">{tutors}</span>}</td>
                    <td className="p-4 text-center">{agencies === true ? <Check className="w-4 h-4 text-gray-400 mx-auto" /> : agencies === false ? <span className="text-gray-300">✕</span> : <span className="text-gray-400">{agencies}</span>}</td>
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-semibold text-gray-900">Price</td>
                  <td className="p-4 text-center font-bold text-coral-500">£9.99/mo</td>
                  <td className="p-4 text-center text-gray-500">£50-100/hr</td>
                  <td className="p-4 text-center text-gray-500">£6,000-35,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 1-on-1 Sessions */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2 text-center">1-on-1 Sessions</h2>
          <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-8" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />
          <div className="card p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <CalendarCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Personal session with a specialist</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Get matched with a real student from your chosen degree area, someone who successfully applied to the same course at a top university. They'll give you personalised PS feedback or run a realistic mock interview.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['60-minute session', 'Subject-matched specialist', 'PS feedback or mock interview'].map((tag, j) => (
                    <span key={j} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 text-xs font-medium">
                      <Check className="w-3.5 h-3.5 text-green-500" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="text-4xl font-display font-bold text-coral-500">£29.99</div>
                <div className="text-gray-500 text-sm mb-3">per session</div>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeuFh9xiG17oow0iPtCkNAf2w8mzRIp0XsZEqjot-GoOpGnFg/viewform" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-6 py-2.5">Book a Session</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guarantees */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" /> Cancel anytime, no contracts</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" /> Secure payment via Stripe</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-green-500" /> Launch pricing, won't last forever</span>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">All payments processed securely through Stripe. We never see your card details. Full refunds available, just email support@myunioffer.com.</p>
        </motion.div>

        {/* Free tier reminder */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-center">
          <p className="text-gray-500 text-lg">
            Not ready?{' '}
            <Link to={currentUser ? "/chat" : "/signup"} className="text-coral-600 font-semibold hover:text-coral-700">Try it free</Link>
            . No credit card required.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Email{' '}<a href="mailto:support@myunioffer.com" className="text-coral-500 hover:text-coral-600">support@myunioffer.com</a>{' '}for help
          </p>
        </motion.div>
      </main>
    </div>
  );
}
