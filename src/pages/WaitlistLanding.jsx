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
  ChevronDown,
  Menu,
  X
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
  const [mobileMenu, setMobileMenu] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get('utm_source') || 'direct';
  const utmMedium = urlParams.get('utm_medium') || 'none';

  async function handleWaitlist(e, emailValue, setSubmittedFn) {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, 'waitlist'), {
        email: emailValue.trim().toLowerCase(),
        joinedAt: serverTimestamp(),
        source: utmSource,
        medium: utmMedium
      });
      setSubmittedFn(true);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  const faqs = [
    { q: "What exactly is myunioffer ai?", a: "It's an AI coaching tool built specifically for UK university applications. It helps you craft your personal statement and prepare for interviews. It doesn't write for you. It asks the right questions to help you figure out what to say." },
    { q: "Who built this?", a: "A team of students from LSE, Cambridge, Imperial, KCL, and Warwick who literally just went through the exact same application process. We trained the AI on what actually works." },
    { q: "What do I get for joining the waitlist?", a: "Early access before everyone else, plus an exclusive launch discount on all plans. No commitment, no payment. Just your email." },
    { q: "When does it launch?", a: "March 31st 2026. Waitlist members get access first." },
    { q: "Is it free?", a: "There's a free tier so you can try it out. Paid plans unlock more features and more messages. Waitlist members get a discount that won't be available after launch." },
    { q: "How is this different from ChatGPT?", a: "ChatGPT gives everyone the same generic advice and tries to write your statement for you. Admissions tutors can spot that immediately. Our AI coaches you through the process by asking questions specific to your subject and your experiences. It pushes you to think deeper instead of handing you a template." }
  ];

  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"><Check className="w-5 h-5 text-green-600" /></div>
      <div>
        <div className="font-semibold text-green-800 text-sm">You're on the list!</div>
        <div className="text-green-600 text-xs">We'll email you the moment we launch, with your exclusive discount.</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-900 text-white text-center py-2.5 px-6 text-sm font-medium">
        <span className="text-coral-400">🚀 Launching March 31st</span> · Join the waitlist for early access + exclusive discount
      </div>

      <nav className="sticky top-0 z-50 glass border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-coral-500/20"><GraduationCap className="w-5 h-5 text-white" /></div>
              <span className="text-xl font-display font-bold">myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">How It Works</a>
              <a href="#why-us" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Why Us</a>
              <a href="#testimonials" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</a>
              <a href="#follow" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Follow</a>
              <a href="#waitlist-bottom" className="btn-primary">Join Waitlist</a>
            </div>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-gray-600 hover:text-coral-500 transition-colors">
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileMenu && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4 flex flex-col gap-4">
              <a href="#how-it-works" onClick={() => setMobileMenu(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">How It Works</a>
              <a href="#why-us" onClick={() => setMobileMenu(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Why Us</a>
              <a href="#testimonials" onClick={() => setMobileMenu(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Testimonials</a>
              <a href="#pricing" onClick={() => setMobileMenu(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</a>
              <a href="#follow" onClick={() => setMobileMenu(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Follow</a>
              <a href="#waitlist-bottom" onClick={() => setMobileMenu(false)} className="btn-primary text-center">Join Waitlist</a>
            </div>
          )}
        </div>
      </nav>

      <section className="pt-20 pb-16 px-6 hero-pattern">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-50 border border-coral-100 rounded-full text-sm font-medium text-coral-600 mb-6">
              <span className="w-2 h-2 bg-coral-500 rounded-full animate-pulse" />Launching March 31st
            </div>
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-[1.1] mb-4 text-gray-900" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Get into your{' '}<span className="gradient-text">dream university</span>
          </motion.h1>
          <motion.p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            AI-powered personal statement coaching and interview preparation. Built by students from LSE, Cambridge, Imperial, KCL, and Warwick.
          </motion.p>
          <motion.div className="inline-flex items-center gap-2 px-6 py-3.5 bg-green-50 border-2 border-green-300 rounded-2xl text-base font-bold text-green-700 mb-6 shadow-sm" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.25 }}>
            🎁 Waitlist members get an exclusive launch discount that disappears once we go live
          </motion.div>
          <motion.div className="max-w-md mx-auto mb-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            {submitted ? renderSuccess() : (
              <form onSubmit={(e) => handleWaitlist(e, email, setSubmitted)} className="flex flex-col sm:flex-row gap-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="input flex-1 min-w-0" required />
                <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap px-6 py-3">{loading ? 'Joining...' : 'Join Waitlist'}</button>
              </form>
            )}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <p className="text-xs text-gray-400 mt-3">Free · No payment required · Early access + exclusive discount</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">🚀 120+ students have already joined the waitlist</p>
          </motion.div>
          <motion.div className="flex flex-wrap justify-center gap-3 mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            {['LSE', 'KCL', 'Cambridge', 'Imperial', 'Warwick'].map((uni, i) => (
              <div key={i} className="px-4 py-2 bg-white rounded-xl border border-gray-100 shadow-sm text-sm font-semibold text-gray-600">🎓 {uni}</div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why most applications fall short</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Every year, thousands of students with perfect grades get rejected because their personal statement didn't stand out or their interview fell flat.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: "😰", title: "The pressure is insane", desc: "You've worked hard for years. Now your entire future comes down to one 4,000-character statement and a 20-minute interview. No wonder everyone's stressed." },
              { emoji: "💸", title: "Good help costs a fortune", desc: "Private tutors charge £50-100/hour. Application consultants charge £6,000-35,000. Most families simply can't afford that level of support." },
              { emoji: "🤖", title: "ChatGPT gives everyone the same thing", desc: "Generic AI gives you the same template it gives everyone else. Teachers are stretched thin. You need coaching that's specific to your subject and your story." },
            ].map((item, i) => (
              <motion.div key={i} className="card p-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">What we're building</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">An AI coach that actually understands your subject. Trained by real students who just got into the UK's top universities.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <MessageSquare className="w-6 h-6 text-white" />, title: "Personal Statement Coaching", desc: "The AI asks you thoughtful questions to draw out your story. It doesn't write for you. It helps you figure out what to say and pushes you to go deeper. Subject-specific, based on what actually gets people in." },
              { icon: <Target className="w-6 h-6 text-white" />, title: "Interview Preparation", desc: "Practise with real interview questions from top UK universities. Get feedback on your answers and learn how to think on your feet. Build genuine confidence before the real thing." },
              { icon: <Brain className="w-6 h-6 text-white" />, title: "Tailored to your subject", desc: "Medicine is nothing like Economics which is nothing like Engineering. The AI adapts to your specific subject because it was trained by students who study it. Not generic advice, real expertise." },
              { icon: <Users className="w-6 h-6 text-white" />, title: "Optional 1-on-1 Sessions", desc: "Want a human touch? Book a personal session with one of our coaches for a deep-dive PS review or mock interview. The AI coaches you daily, the human gives you the extra edge." },
            ].map((item, i) => (
              <motion.div key={i} className="card card-hover p-8 flex gap-5" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="why-us" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why we're different</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Coaches you, doesn't write for you", desc: "Other AI tools write your personal statement for you. Admissions tutors can spot that instantly and it will hurt your application. Ours asks you questions that help you discover what to say. Your statement stays authentically yours." },
              { title: "Subject-specific, not one-size-fits-all", desc: "A Medicine application is completely different from an Economics one. Our AI is trained by students from LSE, Cambridge, Imperial, KCL, and Warwick, each covering their own subject area." },
              { title: "Built by students who literally just got in", desc: "We got lucky with great teachers and hours of preparation that gave us insights into what admissions tutors actually want. We've put everything we learned into this AI so that students who don't have what we had can still get the same level of support." },
              { title: "99% cheaper than the alternative", desc: "Private application consultants charge £6,000-35,000. A personal tutor costs £50-100/hour. We're building the same quality of coaching for less than the price of a night out." },
            ].map((item, i) => (
              <motion.div key={i} className="card p-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <h3 className="text-lg font-display font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      

            <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">The team behind the AI</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Real students at real universities who went through the same process you're about to face.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Shrey Verma", uni: "LSE", course: "PPE" },
              { name: "Suhas Parsaboina", uni: "KCL", course: "Medicine" },
              { name: "Adyan Shahid", uni: "Cambridge", course: "Computer Science" },
              { name: "Girish Radhakrishnan", uni: "Imperial", course: "Chemical Engineering" },
              { name: "Pavan Kovuri", uni: "Warwick", course: "Economics" },
            ].map((member, i) => (
              <motion.div key={i} className="card p-5 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-coral-50 border border-coral-200 rounded-full text-xs text-coral-600 font-bold mb-2">🎓 {member.uni}</div>
                <div className="font-display font-bold text-gray-900 text-sm mb-0.5">{member.name}</div>
                <div className="text-gray-500 text-xs font-medium">{member.course}</div>
              </motion.div>
            ))}
            <motion.div className="card p-5 text-center flex flex-col items-center justify-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <div className="text-2xl mb-1">🎯</div>
              <div className="font-display font-bold text-gray-900 text-sm mb-0.5">5 universities</div>
              <div className="text-gray-500 text-xs font-medium">1 mission</div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gray-900">Don't take our word for it</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Real messages from students who tested MyUniOffer before launch. Unedited.</p>
          </motion.div>
          <div className="max-w-3xl mx-auto" style={{columns: '2', columnGap: '12px'}}>
            {[
              {src: '/testimonial-6.jpg', delay: 0},
              {src: '/testimonial-3.jpg', delay: 0.05},
              {src: '/testimonial-7.jpg', delay: 0.1},
              {src: '/testimonial-5.jpg', delay: 0.15},
              {src: '/testimonial-4.jpg', delay: 0.2},
              {src: '/testimonial-2.png', delay: 0.25},
            ].map((t, i) => (
              <motion.div key={i} className="mb-3 rounded-2xl overflow-hidden shadow-lg border border-gray-100" style={{breakInside: 'avoid'}} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: t.delay }}>
                <img src={t.src} alt="Student feedback" className="w-full h-auto block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 text-gray-900">Simple pricing</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-6">These are our standard prices at launch.</p>
            <div className="max-w-lg mx-auto p-5 bg-green-50 border-2 border-green-300 rounded-2xl shadow-sm mb-4">
              <div className="text-lg font-display font-bold text-green-800 mb-1">🎁 Waitlist members don't pay these prices</div>
              <p className="text-green-700 text-sm">Join the waitlist to unlock a discount on all paid plans. This offer disappears once we launch and it will never be available again.</p>
              <a href="#waitlist-bottom" className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-green-800 hover:text-green-900 transition-colors">Join the waitlist now →</a>
            </div>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { name: "Free", price: "£0", period: "", features: ["2 PS + 2 Interview messages/day", "PS + Interview mode", "All 5 subject specialists"], cta: "Included for everyone" },
              { name: "Single Mode", price: "£8.99", period: "/month", features: ["Increased daily usage", "PS or Interview mode", "All subject specialists", "Email support"], cta: "Discounted for waitlist" },
              { name: "Premium", price: "£12.99", period: "/month", features: ["Extended daily usage", "PS + Interview mode", "All subject specialists", "Priority support"], cta: "Discounted for waitlist" },
            ].map((plan, i) => (
              <motion.div key={i} className="card p-6 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-lg font-display font-bold text-gray-900 mb-1">{plan.name}</div>
                <div className="mb-4">
                  <span className="text-3xl font-display font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6 text-left">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600"><Check className="w-4 h-4 text-green-500 flex-shrink-0" />{f}</li>
                  ))}
                </ul>
                <div className="text-xs text-coral-500 font-semibold">{plan.cta}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8"><p className="text-sm text-gray-500">Secure payments via Stripe · Cancel anytime · Full refunds available</p></div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Questions?</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} className="card overflow-hidden" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (<div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{faq.a}</div>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="follow" className="py-16 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">Follow the journey</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
              We're just some students trying to make uni applications less stressful for everyone. Follow us for launch updates, behind the scenes, bloopers, and advice you can actually use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://www.instagram.com/myunioffer_ai/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl font-bold text-white text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                style={{background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'}}>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Follow on Instagram
              </a>
              <a href="https://www.linkedin.com/in/shrey-verma-669a87284" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] text-base">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Follow on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="waitlist-bottom" className="py-20 px-6" style={{background: '#3a3a3a', borderTop: '1px solid rgba(240,122,98,0.15)'}}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Don't leave your application to chance</h2>
            <p className="text-gray-300 mb-3">Join the waitlist now. Be the first to access the AI when we launch on March 31st.</p>
            <p className="text-coral-400 font-semibold mb-8">🎁 Waitlist members get an exclusive discount that disappears once we go live.</p>
            <div className="max-w-md mx-auto mb-4">
              {bottomSubmitted ? renderSuccess() : (
                <form onSubmit={(e) => handleWaitlist(e, bottomEmail, setBottomSubmitted)} className="flex flex-col sm:flex-row gap-3">
                  <input type="email" value={bottomEmail} onChange={(e) => setBottomEmail(e.target.value)} placeholder="Enter your email" className="input flex-1 min-w-0" required />
                  <button type="submit" disabled={loading} className="btn-primary whitespace-nowrap px-6 py-3">{loading ? 'Joining...' : 'Join Waitlist'}</button>
                </form>
              )}
            </div>
            <p className="text-gray-500 text-xs">No spam · Unsubscribe anytime · Your email is safe with us</p>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center"><GraduationCap className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-display font-bold">myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span></span>
          </div>
          <div className="flex gap-8 text-sm text-gray-600">
            <Link to="/privacy" className="hover:text-coral-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-coral-500 transition-colors">Terms</Link>
            <a href="mailto:support@myunioffer.com" className="hover:text-coral-500 transition-colors">Support</a>
          </div>
          <div className="text-sm text-gray-500">© 2026 myunioffer ai</div>
        </div>
      </footer>
    </div>
  );
}
