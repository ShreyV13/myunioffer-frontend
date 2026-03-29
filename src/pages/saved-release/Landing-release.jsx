import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Check,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  MessageSquare,
} from 'lucide-react';

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Will the AI write my personal statement for me?", a: "No. Your statement should sound like you, not a robot. Our AI asks you questions, challenges your thinking, and helps you figure out what to say. It coaches you through the process instead of handing you a template. That's what admissions tutors want to see." },
    { q: "How is this different from ChatGPT?", a: "ChatGPT gives everyone the same generic advice and tries to write your statement for you. Admissions tutors can spot that immediately. Our AI is built specifically for UK university applications. It knows what different subjects require, has access to 1000+ real resources, and coaches you to find your own voice instead of giving you someone else's." },
    { q: "What subjects do you cover?", a: "Everything. Medicine, Dentistry, Law, Economics, Engineering, Computer Science, Maths, Physics, History, English, PPE, Psychology, Architecture, and more. Tell the AI what you're applying for and it automatically tailors its coaching to your subject." },
    { q: "Can I cancel my subscription?", a: "Yes, cancel anytime. You keep access until the end of your billing period. If you want a refund, email support@myunioffer.com and we'll sort it out, no questions asked." },
    { q: "Who built this?", a: "A team of first-year students from LSE, KCL, Cambridge, Imperial, and Warwick who went through UCAS months ago. We built the tool we wished we had when we were applying." },
    { q: "Is there a free option?", a: "Yes. The free tier gives you 2 personal statement and 2 interview coaching messages every day, forever. No credit card needed. Paid plans give you more daily usage for when you're doing serious drafting." },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-center py-2.5 px-6 text-sm font-medium">
        <span className="text-coral-400">120+ students already signed up.</span>{' '}
        Launch pricing available for a limited time.{' '}
        <Link to="/pricing" className="underline hover:text-coral-300 transition-colors">See plans</Link>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 glass border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-coral-500/20">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">How It Works</a>
              <a href="#why-us" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Why Us</a>
              <a href="#faq" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">FAQ</a>
              <Link to="/pricing" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</Link>
              <Link to="/login" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Log In</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <motion.div className="md:hidden py-4 flex flex-col gap-4 border-t border-gray-100 mt-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">How It Works</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Why Us</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">FAQ</a>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Log In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center mt-2">Get Started</Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="pt-20 pb-24 px-6 hero-pattern">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-50 border border-coral-100 rounded-full text-sm font-medium text-coral-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              120+ students have already signed up
            </div>
          </motion.div>

          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-gray-900">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get into your
            </motion.div>
            <motion.div
              className="gradient-text mt-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              dream university.
            </motion.div>
          </div>

          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Your personal statement won't write itself. And ChatGPT can't coach you through it. We can.
          </motion.p>

          <motion.p 
            className="text-base text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            AI coaching for personal statements and interviews. For any subject, any university.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              See How It Works
            </a>
          </motion.div>

          <motion.p 
            className="text-gray-400 text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Free to try. No credit card required.
          </motion.p>
        </div>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">The application process is broken.</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Everyone tells you to "be yourself" and "show passion." Nobody actually shows you how. And the people who could help? Most students can't access them.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-4">The ChatGPT problem</div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-2">ChatGPT writes your PS. Tutors notice instantly.</h3>
              <p className="text-gray-600 text-sm leading-relaxed">They read hundreds of AI-generated statements every cycle. Same structure, same phrases, zero personality. If it sounds like it could belong to anyone, it won't get you in.</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-4">The cost barrier</div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-2">Good guidance costs thousands. That's not fair.</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Admissions consultants charge £6,000 to £35,000. Personal tutors charge £50 to £100 an hour. The students who get the best help are the ones whose families can pay for it.</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-4">The gap</div>
              <h3 className="text-lg font-display font-bold text-gray-900 mb-2">Generic advice won't get you into a competitive course.</h3>
              <p className="text-gray-600 text-sm leading-relaxed">"Show passion." "Be yourself." "Start early." You've heard it all. None of it tells you what a Medicine admissions tutor actually wants to read, or how a Cambridge interviewer decides who gets an offer. You need subject-specific coaching, not motivational posters.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== OUR STORY ==================== */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Horizontal connecting line */}
            <motion.div 
              className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-transparent via-coral-300 to-transparent hidden md:block"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
              >
                <motion.div 
                  className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-coral-500/20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <span className="text-white text-xl">📝</span>
                </motion.div>
                <h3 className="font-display font-bold text-gray-900 mb-1">We applied</h3>
                <p className="text-gray-500 text-sm">UCAS, personal statements, interviews. We did all of it last year.</p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-coral-500/20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <span className="text-white text-xl">🎓</span>
                </motion.div>
                <h3 className="font-display font-bold text-gray-900 mb-1">We got in</h3>
                <p className="text-gray-500 text-sm">LSE, KCL, Cambridge, Imperial, Warwick. Five students, five universities.</p>
              </motion.div>

              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-coral-500/20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                >
                  <span className="text-white text-xl">🚀</span>
                </motion.div>
                <h3 className="font-display font-bold text-gray-900 mb-1">We built this</h3>
                <p className="text-gray-500 text-sm">So you don't have to figure it out alone like we did.</p>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/signup" className="inline-flex items-center gap-2 btn-primary px-6 py-3">
              Try it free <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Like having a mentor who knows your subject</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Not a writing tool. Not a chatbot. A coaching system built for UK university applications.</p>
          </motion.div>

          {/* Left-line timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line on the left */}
            <motion.div 
              className="absolute left-7 top-0 hidden md:block"
              style={{width: '2px', background: 'linear-gradient(to bottom, #f9a08c, #f07a62, #e74d32)', transformOrigin: 'top'}}
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            />

            <div className="space-y-8">
              {[
                { num: "1", title: "Tell it about your application", desc: "Just start talking. \"I'm applying for Medicine at UCL and Imperial.\" The AI figures out your subject, your level, and what you need. No forms, no setup." },
                { num: "2", title: "It asks you the hard questions", desc: "Not \"tell me about yourself.\" More like \"you mentioned shadowing a GP, what did you actually learn about patient communication that surprised you?\" It pushes you deeper than you'd go alone." },
                { num: "3", title: "Your application starts standing out", desc: "Your personal statement sounds like no one else could have written it. Your interview answers feel natural. Because you've practised with something that knows exactly what your subject demands." },
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  className="flex gap-8 items-start relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.3 }}
                >
                  {/* Circle on the line */}
                  <motion.div 
                    className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-coral-500/20 relative z-10"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <span className="text-white font-display font-bold text-xl">{step.num}</span>
                  </motion.div>

                  {/* Content card */}
                  <motion.div 
                    className="flex-1 bg-gray-50 rounded-2xl p-7 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <h3 className="text-xl font-display font-bold mb-2 text-gray-900">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Two modes */}
          <motion.div 
            className="mt-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.div 
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-coral-50 rounded-xl flex items-center justify-center mx-auto mb-3"><MessageSquare className="w-6 h-6 text-coral-500" /></div>
                <h4 className="font-display font-bold text-gray-900 mb-1">PS Mode</h4>
                <p className="text-gray-500 text-sm">Coaches your personal statement draft by draft. Asks the questions admissions tutors would ask.</p>
              </motion.div>
              <motion.div 
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-coral-50 rounded-xl flex items-center justify-center mx-auto mb-3"><GraduationCap className="w-6 h-6 text-coral-500" /></div>
                <h4 className="font-display font-bold text-gray-900 mb-1">Interview Mode</h4>
                <p className="text-gray-500 text-sm">Real practice questions for your subject. Feedback on your answers. Builds your confidence for the real thing.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== WHY US ==================== */}
      <section id="why-us" className="py-24 px-6 bg-gray-50 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why students choose us</h2>
          </motion.div>

          {/* Feature 1 - full width with accent */}
          <motion.div 
            className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden mb-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full gradient-primary rounded-l-2xl" />
            <div className="flex flex-col md:flex-row gap-8 items-start pl-4">
              <div className="flex-1">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">Coaching, not writing</div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Most AI tools hand you a finished statement. Ours makes you write a better one yourself.</h3>
                <p className="text-gray-600 leading-relaxed">Admissions tutors can spot an AI-written personal statement in seconds. Our AI never writes a single sentence for you. It asks the questions that help you figure out what you actually want to say. Your statement stays authentically yours.</p>
              </div>
              <motion.div 
                className="flex-shrink-0 hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-32 h-32 bg-coral-50 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-1">🎯</div>
                    <div className="text-coral-500 text-xs font-bold">Your voice</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features 2 & 3 - two column with reveal animations */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="h-1.5 gradient-primary" />
              <div className="p-8">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">Subject-specific</div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">It knows your subject.</h3>
                <p className="text-gray-600 leading-relaxed">A Medicine application has nothing in common with an Economics one. The AI detects your subject automatically and tailors everything: the questions it asks, the feedback it gives, the standards it holds you to.</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <div className="h-1.5 gradient-primary" />
              <div className="p-8">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">Affordable</div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Premium coaching, student pricing.</h3>
                <p className="text-gray-600 leading-relaxed">Admissions consultants charge thousands. We start at £8.99 a month. There's also a free tier that gives you daily sessions, forever. Nobody should miss out because they couldn't afford help applying.</p>
              </div>
            </motion.div>
          </div>

          {/* Stats - animated counters feel */}
          <motion.div 
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-1 gradient-primary" />
            <div className="p-6 flex flex-wrap justify-center gap-10">
              {[
                { num: "1000+", label: "real resources" },
                { num: "24/7", label: "always available" },
                { num: "99%", label: "cheaper than tutoring" },
                { num: "120+", label: "students signed up" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <div className="text-2xl font-display font-bold text-coral-500">{stat.num}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TEAM - integrated with credentials ==================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Built by students who just got in</h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-2">Every subject specialist is a real student who went through UCAS, wrote a personal statement, and got an offer. They train the AI for their field.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {[
              { name: "Shrey Verma", uni: "LSE", course: "PPE", subject: "Humanities" },
              { name: "Pavan Kovuri", uni: "Warwick", course: "Economics", subject: "Economics & Business" },
              { name: "Suhas Parsaboina", uni: "KCL", course: "Medicine", subject: "Medicine" },
              { name: "Adyan Shahid", uni: "Cambridge", course: "Comp Sci", subject: "CS & Maths" },
              { name: "Girish R.", uni: "Imperial", course: "Chem Eng", subject: "Engineering" },
            ].map((member, i) => (
              <motion.div 
                key={i}
                className="card card-hover p-4 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 150, damping: 15 }}
              >
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-coral-50 border border-coral-200 rounded-full text-xs text-coral-600 font-bold mb-2">
                  🎓 {member.uni}
                </div>
                <div className="font-display font-bold text-gray-900 text-sm">{member.name}</div>
                <div className="text-gray-400 text-xs mt-0.5">{member.course}</div>
                <div className="text-coral-500 text-xs font-medium mt-1">{member.subject}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/about" className="inline-flex items-center gap-2 text-coral-500 font-semibold hover:text-coral-600 transition-colors text-sm">
              More about the team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">What students are saying</h2>
            <p className="text-gray-600 max-w-lg mx-auto">Real feedback from students using myunioffer ai. Unedited.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-gray-50 rounded-2xl p-7 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-coral-300 text-4xl font-display leading-none mb-3">"</div>
              <p className="text-gray-900 font-medium leading-relaxed mb-4">I actually have a plan after using it, even though I had nothing figured out before.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-coral-400" />
                <span className="text-gray-400 text-xs font-medium">Early user</span>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gray-50 rounded-2xl p-7 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-coral-300 text-4xl font-display leading-none mb-3">"</div>
              <p className="text-gray-900 font-medium leading-relaxed mb-4">I had no idea what supercurriculars to do, but it gave me unique suggestions based on what I'd already done. It based its recommendations off my actual interests.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-coral-400" />
                <span className="text-gray-400 text-xs font-medium">Early user</span>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gray-50 rounded-2xl p-7 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <div className="text-coral-300 text-4xl font-display leading-none mb-3">"</div>
              <p className="text-gray-900 font-medium leading-relaxed mb-4">Responds within a few seconds. The quality of information is genuinely helpful. If you ask the right questions, the site guides you step by step.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-coral-400" />
                <span className="text-gray-400 text-xs font-medium">Early user</span>
              </div>
            </motion.div>

            <motion.div 
              className="bg-gray-50 rounded-2xl p-7 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-coral-300 text-4xl font-display leading-none mb-3">"</div>
              <p className="text-gray-900 font-medium leading-relaxed mb-4">It helped so much with figuring out next steps, like what supercurriculars I should be doing by building on what I've done so far. And it's not just a yes-man like ChatGPT. It's actually critical of my plans.</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-coral-400" />
                <span className="text-gray-400 text-xs font-medium">Early user</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== PRICING TEASER ==================== */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Start free. Upgrade when you're ready.</h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              The free tier gives you daily coaching sessions, forever. Paid plans start at £8.99/month for more usage when you're doing serious drafting and interview prep. Launch pricing won't last.
            </p>
            <Link to="/pricing" className="btn-primary px-8 py-4 text-lg">
              See Plans <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Free tier included</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> No credit card needed</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-4">
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
                  className="w-full p-6 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6 text-gray-600 leading-relaxed"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-24 px-6 gradient-primary">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Your application is too important to wing it.
          </motion.h2>
          <motion.p className="text-lg text-white/90 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            Start coaching your personal statement and interviews today. It's free.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-coral-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <section className="py-10 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-sm mb-2">
            Questions? <a href="mailto:support@myunioffer.com" className="text-coral-500 font-semibold hover:text-coral-600 transition-colors">support@myunioffer.com</a>
          </p>
          <p className="text-gray-400 text-xs">We respond within 24 hours</p>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold">
              myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span>
            </span>
          </Link>
          <div className="flex gap-8 text-sm text-gray-600">
            <Link to="/privacy" className="hover:text-coral-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-coral-500 transition-colors">Terms</Link>
            <Link to="/about" className="hover:text-coral-500 transition-colors">Team</Link>
            <Link to="/pricing" className="hover:text-coral-500 transition-colors">Pricing</Link>
            <a href="mailto:support@myunioffer.com" className="hover:text-coral-500 transition-colors">Support</a>
          </div>
          <div className="text-sm text-gray-400">© 2026 myunioffer ai</div>
        </div>
      </footer>
    </div>
  );
}
