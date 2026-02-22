import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowRight,
  Check,
  Brain,
  Target,
  Users,
  Shield,
  MessageSquare,
  ChevronDown
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function WaitlistLanding() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [bottomEmail, setBottomEmail] = useState('');
  const [bottomSubmitted, setBottomSubmitted] = useState(false);

  async function handleWaitlist(e, emailValue, setSubmittedFn) {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'waitlist'), {
        email: emailValue.trim().toLowerCase(),
        joinedAt: serverTimestamp(),
        source: 'website'
      });
      setSubmittedFn(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  const faqs = [
    {
      q: "What exactly is myunioffer ai?",
      a: "It's an AI coaching tool built specifically for UK university applications. It helps you craft your personal statement and prepare for interviews — not by writing for you, but by asking the right questions to draw out your best story."
    },
    {
      q: "Who built this?",
      a: "A team of students from LSE, Cambridge, Imperial, and Warwick who just went through the exact same application process. We trained the AI on what actually works."
    },
    {
      q: "What do I get for joining the waitlist?",
      a: "Early access before everyone else, plus an exclusive launch discount on all plans. No commitment, no payment — just your email."
    },
    {
      q: "When does it launch?",
      a: "We're in the final stages of testing and improving the AI. Launch is coming in the next few weeks. Waitlist members will be the first to know."
    },
    {
      q: "Is it free?",
      a: "There will be a free tier so you can try it out. Paid plans unlock more features and unlimited coaching. Waitlist members get a special discount."
    }
  ];

  const renderSuccess = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
    >
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Check className="w-5 h-5 text-green-600" />
      </div>
      <div>
        <div className="font-semibold text-green-800 text-sm">You're on the list!</div>
        <div className="text-green-600 text-xs">We'll email you the moment we launch — with your exclusive discount.</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Banner */}
      <div className="bg-gray-900 text-white text-center py-2.5 px-6 text-sm font-medium">
        <span className="text-coral-400">🚀 Coming Soon</span> — join the waitlist for early access + exclusive launch discount
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-coral-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">How It Works</a>
              <a href="#why-us" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Why Us</a>
              <a href="#pricing" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</a>
              <a href="#waitlist-bottom" className="btn-primary">
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="pt-20 pb-16 px-6 hero-pattern">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-50 border border-coral-100 rounded-full text-sm font-medium text-coral-600 mb-6">
              <span className="w-2 h-2 bg-coral-500 rounded-full animate-pulse" />
              Launching soon — join the waitlist
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.1] mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get into your{' '}
            <span className="gradient-text">dream university</span>
          </motion.h1>

          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AI-powered personal statement coaching and interview preparation — built by students from LSE, Cambridge, Imperial, KCL, and Warwick.
          </motion.p>

          {/* Discount callout - above form */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-50 border-2 border-green-300 rounded-2xl text-base font-bold text-green-700 mb-6 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            🎁 Waitlist members get an exclusive launch discount — not available after launch
          </motion.div>

          {/* Hero Waitlist Form */}
          <motion.div 
            className="max-w-md mx-auto mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {submitted ? renderSuccess() : (
              <form onSubmit={(e) => handleWaitlist(e, email, setSubmitted)} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input flex-1 min-w-0"
                  required
                />
                <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap px-6 py-3">
                  {loading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p className="text-xs text-gray-400 mt-3">Free · No payment required · Early access + exclusive discount</p>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {['LSE', 'KCL', 'Cambridge', 'Imperial', 'Warwick'].map((uni, i) => (
              <div key={i} className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-sm font-semibold text-gray-600">
                🎓 {uni}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== THE PROBLEM ==================== */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">The problem with university applications</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every year, thousands of students with perfect grades get rejected because their personal statement didn't stand out or their interview fell flat.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "😰", title: "The anxiety is real", desc: "You've worked hard for years. Now your entire future depends on one 4,000-character statement and a 20-minute interview. The pressure is overwhelming." },
              { emoji: "💸", title: "Help is expensive", desc: "Private tutors charge £50-100/hour. Application consultants charge £6,000-35,000. Most families simply can't afford that kind of support." },
              { emoji: "🎯", title: "Generic advice doesn't work", desc: "ChatGPT gives you the same generic advice it gives everyone else. Teachers are stretched thin. You need subject-specific, personalised coaching." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== THE SOLUTION ==================== */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">What we're building</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">An AI coach that actually understands your subject — trained by real students who just got into the UK's top universities.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <MessageSquare className="w-6 h-6 text-white" />, title: "Personal Statement Coaching", desc: "The AI asks you thoughtful questions to draw out your story. It doesn't write for you — it helps you figure out what to say. Subject-specific, based on what actually gets people in." },
              { icon: <Target className="w-6 h-6 text-white" />, title: "Interview Preparation", desc: "Practise with real interview questions from top UK universities. Get feedback on your answers. Build confidence before the real thing." },
              { icon: <Brain className="w-6 h-6 text-white" />, title: "Tailored to your subject", desc: "Whether you're applying for Medicine, Engineering, Economics, Law, or anything else — the AI adapts to your specific subject. Trained by real students in each field. Not generic advice. Real expertise." },
              { icon: <Users className="w-6 h-6 text-white" />, title: "Optional 1-on-1 Sessions", desc: "Book a personal session with one of our coaches for a deep-dive PS review or intensive mock interview. The AI coaches you daily, the human gives you the edge." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="card card-hover p-8 flex gap-5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY US ==================== */}
      <section id="why-us" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why we're different</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Coaches, not writes", desc: "Other AI tools write your PS for you — admissions tutors can spot that instantly. Ours asks you the questions that help you discover what to say. Your statement stays authentically yours." },
              { title: "Subject-specialist, not generic", desc: "A Medicine application is nothing like an Economics one. Our AI is trained by students from LSE, Cambridge, Imperial, and Warwick — each covering their subject area." },
              { title: "Built by people who just got in", desc: "We got lucky — amazing teachers, hours of preparation, and insights into what admissions tutors want. We've embedded everything we learned into this AI. Most students don't have what we had. Now they can." },
              { title: "99% cheaper than the alternative", desc: "Private application consultants charge £6,000-35,000. A personal tutor costs £50-100/hour. We're building the same quality of coaching for less than the price of a night out." },
            ].map((item, i) => (
              <motion.div 
                key={i}
                className="card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TEAM ==================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">The team behind the AI</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Real students at real universities who went through the same process you're about to face.</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {[
              { name: "Shrey Verma", uni: "LSE", course: "PPE", role: "Founder & Humanities Lead" },
              { name: "Suhas Parsaboina", uni: "KCL", course: "Medicine", role: "Medicine Lead" },
              { name: "Adyan Shahid", uni: "Cambridge", course: "Computer Science", role: "CS & Maths Lead" },
              { name: "Girish Radhakrishnan", uni: "Imperial", course: "Chemical Engineering", role: "Engineering & Sciences Lead" },
              { name: "More coming", uni: "Top UK Universities", course: "Arts & more", role: "Recruiting" },
            ].map((member, i) => (
              <motion.div 
                key={i}
                className="card p-5 text-center flex-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-coral-50 border border-coral-200 rounded-full text-xs text-coral-600 font-bold mb-2">
                  🎓 {member.uni}
                </div>
                <div className="font-display font-bold text-gray-900 text-sm mb-0.5">{member.name}</div>
                <div className="text-gray-500 text-xs font-medium">{member.course}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRICING PREVIEW ==================== */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gray-900">Simple pricing</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-6">These are our standard prices at launch.</p>
            
            <div className="max-w-lg mx-auto p-5 bg-green-50 border-2 border-green-300 rounded-2xl shadow-sm mb-4">
              <div className="text-lg font-display font-bold text-green-800 mb-1">🎁 Waitlist members don't pay these prices</div>
              <p className="text-green-700 text-sm">Join the waitlist to unlock a significant discount on all paid plans. This offer disappears once we launch — it will never be available again.</p>
              <a href="#waitlist-bottom" className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-green-800 hover:text-green-900 transition-colors">
                Join the waitlist now →
              </a>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Free", price: "£0", period: "", features: ["2 PS messages/day", "2 Interview messages/day", "All 5 subject specialists"], cta: "Included for everyone" },
              { name: "Single Mode", price: "£14.99", period: "/month", features: ["100 messages/day", "PS or Interview mode", "All subject specialists", "Email support"], cta: "Discounted for waitlist" },
              { name: "Premium", price: "£19.99", period: "/month", features: ["Unlimited messages", "PS + Interview", "All subject specialists", "Priority support"], cta: "Discounted for waitlist" },
            ].map((plan, i) => (
              <motion.div 
                key={i}
                className={`card p-6 text-center ${plan.popular ? 'border-2 border-coral-500 shadow-lg shadow-coral-500/10' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.popular && (
                  <div className="text-xs font-bold text-coral-500 uppercase tracking-wider mb-3">Most Popular</div>
                )}
                <div className="text-lg font-display font-bold text-gray-900 mb-1">{plan.name}</div>
                <div className="mb-4">
                  <span className="text-3xl font-display font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-coral-500 font-semibold">{plan.cta}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">Secure payments via Stripe · Cancel anytime · Full refunds available</p>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Questions?</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL WAITLIST CTA ==================== */}
      <section id="waitlist-bottom" className="py-20 px-6" style={{background: '#3a3a3a', borderTop: '1px solid rgba(240,122,98,0.15)'}}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Don't leave your application to chance</h2>
            <p className="text-gray-300 mb-3">
              Join the waitlist now. Be the first to access the AI when we launch.
            </p>
            <p className="text-coral-400 font-semibold mb-8">
              🎁 Waitlist members get an exclusive discount — this offer disappears once we go live.
            </p>
            <div className="max-w-md mx-auto mb-4">
              {bottomSubmitted ? renderSuccess() : (
                <form onSubmit={(e) => handleWaitlist(e, bottomEmail, setBottomSubmitted)} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={bottomEmail}
                    onChange={(e) => setBottomEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="input flex-1 min-w-0"
                    required
                  />
                  <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap px-6 py-3">
                    {loading ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
              )}
            </div>
            <p className="text-gray-500 text-xs">No spam · Unsubscribe anytime · Your email is safe with us</p>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold">
              myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span>
            </span>
          </div>
          <div className="flex gap-8 text-sm text-gray-600">
            <Link to="/privacy" className="hover:text-coral-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-coral-500 transition-colors">Terms</Link>
            <a href="mailto:support@myunioffer.com" className="hover:text-coral-500 transition-colors">Support</a>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 myunioffer ai
          </div>
        </div>
      </footer>
    </div>
  );
}
