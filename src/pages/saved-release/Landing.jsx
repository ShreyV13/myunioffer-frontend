import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { GraduationCap, Check, ChevronDown, ArrowRight, Menu, X, MessageSquare, Star, PenTool, Mic } from 'lucide-react';

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Will the AI write my personal statement for me?", a: "No. Your statement should sound like you, not a robot. Our AI asks you questions, challenges your thinking, and helps you figure out what to say. It coaches you through the process instead of handing you a template. That's what admissions tutors want to see." },
    { q: "How is this different from ChatGPT?", a: "ChatGPT gives everyone the same generic advice and tries to write your statement for you. Admissions tutors can spot that immediately. Our AI is built specifically for UK university applications. It knows what different subjects require, has access to 1000+ real resources, and coaches you to find your own voice instead of giving you someone else's." },
    { q: "What subjects do you cover?", a: "Everything. Medicine, Dentistry, Law, Economics, Engineering, Computer Science, Maths, Physics, History, English, PPE, Psychology, Architecture, and more. Tell the AI what you're applying for and it automatically tailors its coaching to your subject." },
    { q: "What is Rate My PS?", a: "Paste your personal statement and get an instant score out of 100 with a detailed breakdown across five categories: opening, academic engagement, experiences, structure, and voice. It highlights specific phrases that work and flags anything that sounds generic or AI-written. Think of it as getting admissions tutor feedback in 10 seconds." },
    { q: "What does the Draft Builder do?", a: "It takes everything you've discussed with the AI coach, your experiences, reflections, reading, and lets you arrange it into the three UCAS sections. Then it generates a structured scaffold with coaching prompts showing you exactly where to expand. You fill in the gaps in your own voice." },
    { q: "Can I cancel my subscription?", a: "Yes, cancel anytime. You keep access until the end of your billing period. If you want a refund, email support@myunioffer.com and we'll sort it out, no questions asked." },
    { q: "Who built this?", a: "A team of first-year students from LSE, KCL, Cambridge, Imperial, and Warwick who went through UCAS months ago. We built the tool we wished we had when we were applying." },
    { q: "Is there a free option?", a: "Yes. The free tier gives you 2 personal statement and 2 interview coaching messages every day, forever. No credit card needed. Paid plans give you more daily usage for when you're doing serious drafting." },
  ];

  const testimonials = [
    { text: "Its great, it helped so much with figuring out the next steps like for what supercurriculars I should be doing next by building on what ive done so far", label: "Early user" },
    { text: "And its also not just a yes-man like chatgpt, its critical of my plans", label: "Early user" },
    { text: "i had no idea what supercurriculars to do but it gave me unique suggestions after I gave what i had already done. Like it based it off my interests", label: "Early user" },
    { text: "I actually have a plan after using it even tho i had nothing figured out before", label: "Early user" },
    { text: "The ai site responds within a few seconds, the quality of information that it responds with is helpful, if you ask the right questions the site guides you step by step", label: "Early user" },
    { text: "the site is rlly good!!", label: "Early user" },
  ];

  function TestimonialRotator() {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="overflow-hidden">
        <motion.div className="flex gap-6" animate={{ x: [0, -1800] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex gap-6 flex-shrink-0">
              {testimonials.map((t, i) => (
                <div key={i} className="w-80 flex-shrink-0 bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <div className="text-coral-300 text-3xl font-display leading-none mb-3">"</div>
                  <p className="text-gray-900 font-medium text-sm leading-relaxed mb-4">{t.text}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-coral-400" />
                    <span className="text-gray-400 text-xs font-medium">{t.label}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    );
  }

  function Counter({ target, suffix = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!isInView) return;
      const num = parseInt(target.replace(/[^0-9]/g, ''));
      const duration = 1500;
      const steps = 40;
      const increment = num / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) { setCount(num); clearInterval(timer); }
        else setCount(Math.floor(current));
      }, duration / steps);
      return () => clearInterval(timer);
    }, [isInView, target]);
    return <span ref={ref}>{isInView ? count + suffix : "0" + suffix}</span>;
  }

  const { scrollYProgress } = useScroll();
  const subjects = ['Medicine', 'Economics', 'Computer Science', 'Law', 'Engineering', 'PPE', 'Maths', 'Physics', 'History', 'Psychology', 'Dentistry', 'Architecture', 'English', 'Chemistry', 'Business', 'Biology', 'Veterinary', 'Nursing', 'Politics', 'Philosophy', 'Geography', 'Sociology', 'Modern Languages', 'Music', 'Accounting', 'Data Science'];

  const tools = [
    { icon: Star, num: "01", label: "Rate My PS", title: "Know exactly where you stand", desc: "Paste your personal statement and get a score out of 100, with a breakdown across five categories. It highlights specific phrases that work, flags anything that sounds generic or AI-written, and tells you exactly what to fix. Like getting admissions tutor feedback in 10 seconds." },
    { icon: PenTool, num: "02", label: "Draft Builder", title: "From conversations to first draft", desc: "The AI organises everything you've discussed into building blocks. You drag them into the three UCAS sections, star your strongest material, and it generates a structured scaffold with coaching prompts showing you where to expand. You fill the gaps in your own voice." },
    { icon: Mic, num: "03", label: "Interview Prep", title: "Practice with real questions", desc: "Questions that actually come up in interviews for your specific course, sourced from real applicants. Get honest feedback on your answers. Walk into your interview having already practised the hard ones." },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 100% center; } }
        @keyframes scrollMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.333%); } }
        .marquee-scroll { animation: scrollMarquee 25s linear infinite; }
      `}</style>

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
              <span className="text-xl font-display font-bold">myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span></span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Features</a>
              <a href="#demo" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Demo</a>
              <a href="#testimonials" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Testimonials</a>
              <Link to="/pricing" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</Link>
              <Link to="/about" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">About Us</Link>
              <Link to="/login" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Log In</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </div>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <motion.div className="md:hidden py-4 flex flex-col gap-4 border-t border-gray-100 mt-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              {[['#features','Features'],['#demo','Demo'],['#testimonials','Testimonials']].map(([href,label]) => (
                <a key={label} href={href} onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">{label}</a>
              ))}
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Pricing</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">About Us</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Log In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center mt-2">Get Started</Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="pt-20 pb-24 px-6 hero-pattern relative overflow-hidden">
        <motion.div className="absolute -top-40 -right-40 w-96 h-96 bg-coral-200 rounded-full opacity-[0.08] blur-3xl pointer-events-none hidden md:block" />
        <motion.div className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-300 rounded-full opacity-[0.06] blur-3xl pointer-events-none hidden md:block" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-50 border border-coral-100 rounded-full text-sm font-medium text-coral-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              120+ students have already signed up
            </div>
          </motion.div>

          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-gray-900">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>Get into your</motion.div>
            <motion.div className="mt-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3 }}>
              <span className="gradient-text" style={{ backgroundSize: '200% auto', animation: 'shimmer 3s ease-in-out infinite alternate' }}>dream university.</span>
            </motion.div>
          </div>

          <motion.div className="h-1 gradient-primary rounded-full mx-auto mt-2 mb-4" initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }} />

          <motion.p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            AI coaching, PS scoring, draft building, and interview prep. Everything you need to stand out, built by students who just got in.
          </motion.p>
          <motion.p className="text-base text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}>
            Tailored to your subject. Trained on 1000+ real resources. Available 24/7.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <Link to="/signup" className="btn-primary text-lg px-8 py-4">Start Free <ArrowRight className="w-5 h-5" /></Link>
            <a href="#demo" className="btn-secondary text-lg px-8 py-4">Watch the Demo</a>
          </motion.div>
          <motion.p className="text-gray-400 text-sm mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>Free to try. No credit card required.</motion.p>
        </div>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 relative overflow-hidden">
        <motion.div className="absolute -top-32 right-0 w-72 h-72 bg-coral-200 rounded-full opacity-[0.04] blur-3xl pointer-events-none" initial={{ x: 50 }} whileInView={{ x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 2, ease: "easeOut" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">The application process is broken.</h2>
            <motion.div className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-6" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-600 max-w-xl mx-auto">Everyone tells you to "be yourself" and "show passion." Nobody actually shows you how.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "The generic AI problem", text: "Copy-paste an AI-written PS and admissions tutors will spot it instantly. They read hundreds every cycle. Same structure, same phrases, zero personality.", response: "We coach your thinking instead." },
              { label: "The cost barrier", text: "Private consultants charge £6,000 to £35,000. Tutors charge £50 to £100 an hour. Most families can't afford that.", response: "We start at £8.99/month. Free tier included." },
              { label: "The gap", text: '"Show passion." "Be yourself." None of it tells you what a Medicine tutor wants to read or how a Cambridge interviewer picks who gets an offer.', response: "Our AI knows your subject." },
            ].map((item, i) => (
              <motion.div key={i} className="group cursor-default bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}>
                <motion.div className="h-1 rounded-full gradient-primary mb-5" initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }} />
                <div className="text-coral-500 font-display font-bold text-xs uppercase tracking-wider mb-3">{item.label}</div>
                <p className="text-gray-900 font-display font-semibold leading-snug mb-3">{item.text}</p>
                <p className="text-coral-500 text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{item.response}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURES - CREATIVE FLOW ==================== */}
      <section id="features" className="py-16 md:py-24 px-4 md:px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #f07a62 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <motion.div className="absolute -bottom-32 left-0 w-80 h-80 bg-coral-200 rounded-full opacity-[0.04] blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Everything you need to stand out</h2>
            <motion.div className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-6" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-600 max-w-xl mx-auto">Not just a chatbot. A complete application toolkit that coaches, scores, builds, and prepares.</p>
          </motion.div>

          {/* AI Coach - hero feature with accent bar */}
          <motion.div className="relative p-8 md:p-10 mb-16 overflow-hidden" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className="absolute top-0 left-0 w-1.5 h-full gradient-primary rounded-full" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-coral-100 rounded-full opacity-[0.08] blur-2xl" />
            <div className="flex flex-col md:flex-row gap-8 items-start pl-6 relative z-10">
              <div className="flex-1">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">AI Coach</div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">A mentor that asks the hard questions <span className="gradient-text">so your statement sounds like you.</span></h3>
                <p className="text-gray-600 leading-relaxed text-base md:text-lg">Most AI tools hand you a finished statement. Admissions tutors spot that in seconds. Our AI never writes a word for you. It asks the questions that help you figure out what you actually want to say, tailored to what your subject demands.</p>
              </div>
              <motion.div className="flex-shrink-0 hidden md:block" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.3, duration: 0.6 }}>
                <div className="w-36 h-36 bg-coral-50 rounded-2xl flex items-center justify-center border border-coral-100">
                  <MessageSquare className="w-14 h-14 text-coral-400" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Three tools - connected timeline flow */}
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical connecting line */}
            <motion.div
              className="absolute left-[27px] md:left-[31px] top-0 bottom-0 hidden sm:block"
              style={{ width: '2px', background: 'linear-gradient(to bottom, #f9a08c, #f07a62, #e74d32)' }}
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="space-y-10">
              {tools.map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <motion.div key={i} className="flex gap-4 md:gap-8 items-start relative"
                    initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}>
                    {/* Circle node */}
                    <motion.div className="w-14 h-14 md:w-16 md:h-16 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-coral-500/20 relative z-10"
                      initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200 }}>
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
                      <motion.div className="absolute top-0 left-0 w-full h-1 gradient-primary origin-left"
                        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.4 + i * 0.2, ease: [0.16, 1, 0.3, 1] }} />
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider">{tool.label}</span>
                        <span className="text-gray-300 font-display font-bold text-xs">{tool.num}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-3">{tool.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{tool.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Stats bar with animated counters */}
          <motion.div className="mt-16 rounded-2xl border border-gray-100 overflow-hidden" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <div className="h-1 gradient-primary" />
            <div className="p-6 md:p-8 flex flex-wrap justify-center gap-8 md:gap-14">
              {[
                { num: "1000", suffix: "+", label: "real resources" },
                { num: "24", suffix: "/7", label: "always available" },
                { num: "99", suffix: "%", label: "cheaper than tutoring" },
                { num: "120", suffix: "+", label: "students signed up" },
              ].map((stat, i) => (
                <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.1 + i * 0.15 }}>
                  <div className="text-2xl md:text-3xl font-display font-bold text-coral-500">
                    <Counter target={stat.num} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== SUBJECT MARQUEE ==================== */}
      <div className="py-4 bg-white overflow-hidden border-y border-gray-100">
        <div className="flex gap-5 whitespace-nowrap marquee-scroll">
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex gap-5">
              {subjects.map((s, i) => (
                <span key={i} className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-coral-400" />{s}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ==================== VIDEO DEMO ==================== */}
      <section id="demo" className="py-16 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">See it in action</h2>
            <motion.div className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-4" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-500 text-sm">Watch a real walkthrough: coaching, drafting, and scoring a personal statement.</p>
          </motion.div>

          {/* Video embed container */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/10 border border-gray-200"
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <iframe
              src="https://www.youtube.com/embed/tTKcgx3UlGw?rel=0&modestbranding=1"
              className="w-full aspect-video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* Before/After PS comparison */}
          <motion.div className="mt-14 max-w-2xl mx-auto" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">What coaching actually looks like</p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div className="bg-white rounded-2xl p-6 border-2 border-gray-200 relative" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8 }}>
                <div className="absolute -top-3 left-4 bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Before</div>
                <p className="text-gray-500 text-sm leading-relaxed italic mt-2">"I have always been passionate about medicine since a young age. Seeing my grandmother suffer in hospital made me realise I wanted to help people and make a difference in the world."</p>
              </motion.div>
              <motion.div className="bg-white rounded-2xl p-6 border-2 border-coral-200 relative" initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.15 }}>
                <div className="absolute -top-3 left-4 gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full">After coaching</div>
                <p className="text-gray-900 text-sm leading-relaxed mt-2">"When my grandmother was in hospital, the geriatrician knelt beside her bed and switched to simpler words because her English was fading. The junior doctor behind her was scribbling notes. I remember thinking those two people were doing completely different jobs in the same room, and I wanted to understand why."</p>
              </motion.div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">Same student. Same experience. One sounds like everyone else. The other sounds like them.</p>
          </motion.div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section id="testimonials" className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">What students are saying</h2>
            <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-4" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-600 max-w-lg mx-auto">Real feedback from students using myunioffer ai. Unedited.</p>
          </motion.div>
          <TestimonialRotator />
        </div>
      </section>

      {/* ==================== PRICING TEASER ==================== */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Start free. Upgrade when you're ready.</h2>
            <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-6" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-600 max-w-lg mx-auto mb-8">The free tier gives you daily coaching sessions, forever. Paid plans start at £8.99/month for more usage when you're doing serious drafting and interview prep.</p>
            <Link to="/pricing" className="btn-primary px-8 py-4 text-lg">See Plans <ArrowRight className="w-5 h-5" /></Link>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Free tier included</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> No credit card needed</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Frequently asked questions</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} className="card overflow-hidden" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}>
                <button className="w-full p-6 flex items-center justify-between text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-6 pb-6 text-gray-600 leading-relaxed">{faq.a}</motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-16 md:py-24 px-4 md:px-6 gradient-primary relative overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            Your application is too important to wing it.
          </motion.h2>
          <motion.p className="text-lg text-white/90 mb-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.1 }}>
            Start coaching your personal statement and interviews today. It's free.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.2 }}>
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-coral-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <section className="py-10 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-sm mb-2">Questions? <a href="mailto:support@myunioffer.com" className="text-coral-500 font-semibold hover:text-coral-600 transition-colors">support@myunioffer.com</a></p>
          <p className="text-gray-400 text-xs">We respond within 24 hours</p>
        </div>
      </section>

      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center"><GraduationCap className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-display font-bold">myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span></span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-600">
            <Link to="/privacy" className="hover:text-coral-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-coral-500 transition-colors">Terms</Link>
            <Link to="/about" className="hover:text-coral-500 transition-colors">Team</Link>
            <Link to="/pricing" className="hover:text-coral-500 transition-colors">Pricing</Link>
            <a href="mailto:support@myunioffer.com" className="hover:text-coral-500 transition-colors">Support</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/myunioffer_ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#E4405F' }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              Instagram
            </a>
            <a href="https://www.linkedin.com/in/shrey-verma-669a87284" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold" style={{ background: '#0A66C2' }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 text-center text-sm text-gray-400">© 2026 myunioffer ai</div>
      </footer>
    </div>
  );
}
