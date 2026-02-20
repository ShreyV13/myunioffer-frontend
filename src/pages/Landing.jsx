import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Sparkles,
  Check,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Brain,
  Target,
  Users,
  Zap,
  Shield,
  Clock,
  MessageSquare,
  User
} from 'lucide-react';

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Placeholder team - replace names/descriptions when you have real people
  const team = [
    { name: "Coming Soon", uni: "LSE", course: "PPE", role: "Founder & Economics Lead", desc: "Built the AI coaching system and leads the Economics & PPE application specialist." },
    { name: "Coming Soon", uni: "KCL", course: "Medicine", role: "Medicine Lead", desc: "Trains the Medicine AI agent with real interview questions and PS insights from the KCL application process." },
    { name: "Coming Soon", uni: "Cambridge", course: "Computer Science", role: "STEM Lead", desc: "Brings Cambridge CS application expertise to the STEM coaching agent." },
    { name: "Coming Soon", uni: "Imperial", course: "Engineering", role: "Engineering Specialist", desc: "Adds Imperial Engineering application knowledge to the STEM agent." },
    { name: "Coming Soon", uni: "Warwick", course: "Economics", role: "Economics Specialist", desc: "Strengthens the Economics agent with Warwick-specific application insights." },
  ];

  const faqs = [
    {
      q: "Will the AI write my personal statement for me?",
      a: "No. We believe your statement should be authentically yours. Our AI coaches ask thoughtful questions to help you discover and articulate your own story. We guide your thinking — we never write for you."
    },
    {
      q: "How is this different from ChatGPT?",
      a: "Our AI is specifically built for UK university applications. It knows what admissions tutors look for, understands UCAS requirements, and has access to 1000+ real interview questions, sample answers, and successful personal statements — not generic advice."
    },
    {
      q: "What subjects do you cover?",
      a: "We cover Medicine & Healthcare, STEM (Maths, Physics, Computer Science, Engineering), Economics & Business (including PPE), Humanities (History, Law, English, Psychology), and Arts (Architecture, Art, Music, Design). Just tell the AI what you're applying for and it automatically tailors the coaching to your subject."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, absolutely. There are no contracts or commitments. You can cancel your subscription at any time and continue using the service until the end of your billing period."
    },
    {
      q: "Who are the specialist coaches?",
      a: "Our coaches are first-year students at top UK universities — LSE, KCL, Cambridge, Imperial, Warwick — who just went through the exact same application process. They train the AI and offer optional 1-on-1 sessions."
    }
  ];

  return (
    <div className="min-h-screen bg-[#323232]">
      {/* Announcement Banner */}
      <div style={{background: '#1e1e1e'}} className="text-[#ddd] text-center py-2.5 px-4 text-sm font-medium">
        <span className="text-[#f07a62]">🚀 Launch Pricing</span> — early access discount available for a limited time.{' '}
        <Link to="/pricing" className="underline hover:text-coral-300 transition-colors">See plans →</Link>
      </div>

      {/* Navigation */}
      <nav className="fixed top-10 left-0 right-0 z-50 glass border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-[rgba(240,122,98,0.2)]">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold">
                myuni<span className="text-[#f07a62]">offer</span><span className="text-[#999]">.ai</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-[#bbb] hover:text-[#f07a62] transition-colors font-medium">How It Works</a>
              <a href="#why-us" className="text-[#bbb] hover:text-[#f07a62] transition-colors font-medium">Why Us</a>
              <Link to="/about" className="text-[#bbb] hover:text-[#f07a62] transition-colors font-medium">Team</Link>
              <Link to="/pricing" className="text-[#bbb] hover:text-[#f07a62] transition-colors font-medium">Pricing</Link>
              <Link to="/login" className="text-[#bbb] hover:text-[#f07a62] transition-colors font-medium">Login</Link>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>

            <button 
              className="md:hidden p-2 text-[#bbb]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden pt-4 pb-2 border-t border-[rgba(255,255,255,0.06)] mt-4"
            >
              <div className="flex flex-col gap-3">
                <a href="#how-it-works" className="text-[#bbb] py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#why-us" className="text-[#bbb] py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Why Us</a>
                <Link to="/about" className="text-[#bbb] py-2 font-medium">Team</Link>
                <Link to="/pricing" className="text-[#bbb] py-2 font-medium">Pricing</Link>
                <Link to="/login" className="text-[#bbb] py-2 font-medium">Login</Link>
                <Link to="/signup" className="btn-primary mt-2">Get Started</Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="pt-40 pb-20 px-6 hero-pattern">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(240,122,98,0.1)] border border-[rgba(240,122,98,0.15)] rounded-full text-[#f07a62] font-medium text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Application Coaching
            </div>
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Get into your{' '}
            <span className="gradient-text">dream university</span>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-[#bbb] max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            AI coaching for personal statements and interviews — trained by students at LSE, Cambridge, Imperial, KCL, and Warwick who got in last year.
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
            className="text-[#999] text-sm mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Free to try · No credit card required
          </motion.p>

          {/* Uni trust bar */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {['LSE', 'KCL', 'Cambridge', 'Imperial', 'Warwick'].map((uni, i) => (
              <div key={i} className="px-4 py-2 bg-[#323232] rounded-xl border border-[rgba(255,255,255,0.06)] shadow-none text-sm font-semibold text-[#bbb]">
                🎓 {uni}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-24 px-6 bg-[#323232]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">How it works</h2>
            <p className="text-[#bbb] max-w-xl mx-auto">Not a writing tool. Not a chatbot. A specialist coaching system designed for UK university applications.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { num: "1", title: "Tell the AI about your application", desc: "Just start chatting. Tell the AI what you're applying for, which universities you're targeting, and what stage you're at. It automatically understands your subject area and tailors everything — no menus, no setup, just conversation." },
              { num: "2", title: "Get coached, not written for", desc: "The AI asks you targeted questions based on 1000+ real resources — successful personal statements, past interview questions, and what admissions tutors actually look for. It draws out your authentic story." },
              { num: "3", title: "Build confidence and stand out", desc: "Iterate on your PS with expert feedback. Run mock interviews with real questions. Go into your application knowing exactly how to present yourself — because you've already practised with the best." },
            ].map((step, i) => (
              <motion.div 
                key={i}
                className="card card-hover p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-5">
                  <span className="text-white font-display font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-lg font-display font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-[#bbb] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Quick demo-style info */}
          <motion.div 
            className="card p-6 flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-[rgba(240,122,98,0.1)] rounded-lg flex items-center justify-center"><MessageSquare className="w-5 h-5 text-[#f07a62]" /></div>
              <div className="w-10 h-10 bg-[rgba(240,122,98,0.1)] rounded-lg flex items-center justify-center"><Brain className="w-5 h-5 text-[#f07a62]" /></div>
              <div className="w-10 h-10 bg-[rgba(240,122,98,0.1)] rounded-lg flex items-center justify-center"><Target className="w-5 h-5 text-[#f07a62]" /></div>
            </div>
            <div>
              <p className="text-[#bbb] text-sm leading-relaxed">
                <span className="font-semibold text-white">PS Mode</span> guides your personal statement. <span className="font-semibold text-white">Interview Mode</span> prepares you for real questions. Both are tailored to your specific subject and university — not generic templates.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== WHY US (USPs) ==================== */}
      <section id="why-us" className="py-24 px-6 bg-[#2c2c2c]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Why students choose us</h2>
            <p className="text-[#bbb] max-w-xl mx-auto">There are other AI tools out there. Here's why this one is different.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <motion.div 
              className="card card-hover p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-5">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2 text-white">Coaches your thinking, not your writing</h3>
              <p className="text-[#bbb] leading-relaxed">Most AI tools write your PS for you — which admissions tutors can spot instantly. Ours asks you the questions that help you figure out what to say. Your statement stays authentically yours. That's what gets you the offer.</p>
            </motion.div>

            <motion.div 
              className="card card-hover p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-5">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2 text-white">Subject-specialist, not generic</h3>
              <p className="text-[#bbb] leading-relaxed">A Medicine application is nothing like an Economics one. We have 5 specialist AI agents — each trained on real resources from LSE, Cambridge, KCL, Imperial, Warwick, and other top UK universities. Your coach knows your subject.</p>
            </motion.div>

            <motion.div 
              className="card card-hover p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2 text-white">Built by people who just got in</h3>
              <p className="text-[#bbb] leading-relaxed">We're not a faceless tech company. We're first-year students who went through UCAS, PS, and interviews months ago. We know exactly what it feels like — the stress, the uncertainty, the "is this good enough?" We built the mentor we wished we'd had.</p>
            </motion.div>

            <motion.div 
              className="card card-hover p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2 text-white">Premium coaching, student pricing</h3>
              <p className="text-[#bbb] leading-relaxed">UniAdmissions charges £6,000–£35,000. Private tutors charge £50–100/hour. Other AI tools are either not subject-specific or not built for UK applications. We're specialist, we're affordable, and we're available 24/7. No compromises.</p>
            </motion.div>
          </div>

          {/* 1000+ Resources callout */}
          <motion.div 
            className="card p-6 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-display font-bold text-[#f07a62] mb-1">1000+</div>
            <p className="text-[#bbb] text-sm">Real interview questions, successful personal statements, and sample answers — all from top UK universities and continually growing.</p>
          </motion.div>
        </div>
      </section>

      {/* ==================== TEAM PREVIEW ==================== */}
      <section id="team" className="py-24 px-6 bg-[#323232]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">The people behind the AI</h2>
            <p className="text-[#bbb] max-w-xl mx-auto">Every subject agent is trained by a real student who successfully applied in that field. These are the people shaping your coaching experience.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                className="card card-hover p-5 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Placeholder photo */}
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[rgba(255,255,255,0.1)]">
                  <User className="w-7 h-7 text-gray-300" />
                </div>
                <div className="font-display font-bold text-white text-sm mb-0.5">{member.name}</div>
                <div className="text-[#f07a62] font-semibold text-xs mb-1">{member.uni} — {member.course}</div>
                <div className="text-[#999] text-xs leading-relaxed">{member.role}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/about" className="inline-flex items-center gap-2 text-[#f07a62] font-semibold hover:text-[#f07a62] transition-colors">
              Learn more about the team <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF STATS ==================== */}
      <section className="py-16 px-6 bg-[#2c2c2c]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="flex flex-wrap justify-center gap-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-[#f07a62]">5</div>
              <div className="text-xs text-[#999] mt-1 font-medium">Specialist AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-[#f07a62]">1000+</div>
              <div className="text-xs text-[#999] mt-1 font-medium">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-[#f07a62]">5</div>
              <div className="text-xs text-[#999] mt-1 font-medium">Top UK Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-[#f07a62]">99%</div>
              <div className="text-xs text-[#999] mt-1 font-medium">Cheaper Than Tutoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-[#f07a62]">24/7</div>
              <div className="text-xs text-[#999] mt-1 font-medium">Always Available</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== PRICING TEASER ==================== */}
      <section className="py-24 px-6 bg-[#323232]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Launch pricing available</h2>
            <p className="text-[#bbb] max-w-xl mx-auto mb-6">
              We're just getting started — so we're offering early access pricing for a limited time. Start free, and upgrade when you're ready. Prices will increase after the launch period.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/pricing" className="btn-primary px-8 py-4 text-lg">
                See Plans & Pricing <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-[#999]">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#5cb85c]" /> Free tier available</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#5cb85c]" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#5cb85c]" /> Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="py-24 px-6 bg-[#2c2c2c]">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Frequently asked questions</h2>
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
                  className="w-full p-6 flex items-center justify-between text-left font-semibold text-white hover:bg-[#2c2c2c] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-[#999] transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-6 pb-6 text-[#bbb] leading-relaxed"
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
      <section className="py-24 px-6 rounded-none" style={{background: '#3a3a3a', borderTop: '1px solid rgba(240,122,98,0.15)', borderBottom: '1px solid rgba(240,122,98,0.15)'}}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to stand out?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8" style={{color: '#bbb'}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Start crafting an application that shows the real you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/signup" 
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 px-6 border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold">
              myuni<span className="text-[#f07a62]">offer</span><span className="text-[#999]">.ai</span>
            </span>
          </Link>
          <div className="flex gap-8 text-sm text-[#bbb]">
            <a href="#" className="hover:text-[#f07a62] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#f07a62] transition-colors">Terms</a>
            <Link to="/about" className="hover:text-[#f07a62] transition-colors">Our Team</Link>
            <Link to="/pricing" className="hover:text-[#f07a62] transition-colors">Pricing</Link>
            <a href="mailto:hello@myunioffer.ai" className="hover:text-[#f07a62] transition-colors">Contact</a>
          </div>
          <div className="text-sm text-[#999]">
            © 2026 myunioffer.ai
          </div>
        </div>
      </footer>
    </div>
  );
}
