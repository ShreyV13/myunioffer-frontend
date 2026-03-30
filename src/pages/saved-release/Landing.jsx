import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
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

  // Animated counter hook
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

  // Demo conversations
  const demoChats = [
    {
      subject: "Medicine",
      mode: "Personal Statement",
      messages: [
        { role: "user", text: "I'm applying for Medicine at Imperial and UCL. I have some work experience but I'm not sure how to write about it." },
        { role: "ai", text: "Good. Tell me about one specific moment during your work experience that changed how you think about medicine. Not the whole placement. Just one moment." },
        { role: "user", text: "I watched a doctor explain a terminal diagnosis to a patient's family. It was really hard to watch." },
        { role: "ai", text: "That's a strong experience. But \"really hard to watch\" is what every applicant writes. What did you notice about how the doctor handled it? Their tone, the pauses, the way they sat? What would you have done differently? Imperial wants to see your ability to reflect on what you observed, not just that you were there." },
        { role: "user", text: "The doctor sat down at the same level as the family. She didn't rush. She let them ask questions even though she had other patients." },
        { role: "ai", text: "Now that's a personal statement paragraph. The detail about sitting at the same level shows you understand non-verbal communication in medicine. The observation about not rushing despite other patients shows you're thinking about the tension between empathy and efficiency. Write it exactly like you just told me." },
      ]
    },
    {
      subject: "Economics",
      mode: "Personal Statement",
      messages: [
        { role: "user", text: "I want to study Economics at Warwick or LSE. I've read Freakonomics and I'm interested in behavioural economics." },
        { role: "ai", text: "Every economics applicant mentions Freakonomics. That's fine as a starting point, but you need to go deeper. What specific idea from behavioural economics have you explored beyond that book? Have you read any actual papers or thought about a real-world problem through that lens?" },
        { role: "user", text: "I read about the nudge theory and how the government uses it for pensions auto-enrolment." },
        { role: "ai", text: "Better. Now here's what would make LSE pay attention: don't just describe what nudge theory is. Take a position. Do you think auto-enrolment is genuinely helping people, or is it paternalistic? What are the limits of nudging when people face genuine financial constraints? Show them you can think critically, not just summarise." },
        { role: "user", text: "I think it works for people who can afford to save but just procrastinate. But for people on minimum wage, nudging them into a pension they can't afford feels like it's ignoring the real problem." },
        { role: "ai", text: "That's a strong argument. You've just identified a distributional critique of behavioural policy that most undergrads don't reach until second year. Write that up. Lead with the tension between behavioural and structural explanations. That's the kind of thinking that gets you an offer." },
      ]
    },
    {
      subject: "Computer Science",
      mode: "Interview Prep",
      messages: [
        { role: "user", text: "I have a Cambridge interview for Computer Science next week. Can you help me practise?" },
        { role: "ai", text: "Let's go. Cambridge CS interviews test how you think under pressure, not what you've memorised. Here's a question: you have a list of n integers. How would you find whether any two of them sum to a given target? Talk me through your thinking." },
        { role: "user", text: "I'd use two nested loops to check every pair. That would be O(n squared)." },
        { role: "ai", text: "That works but it's the brute force answer. They already know you can do that. They want to see you optimise. What data structure could you use to bring it down to O(n)? Think about what information you're recalculating unnecessarily in the nested loop." },
        { role: "user", text: "A hash set? For each number, check if target minus that number is already in the set?" },
        { role: "ai", text: "Exactly. Now the interviewer would push you further: what if the list is sorted? Can you do it without extra space? Think about two pointers. And here's the real Cambridge trick: they might then ask you to prove why the two-pointer approach is correct. Can you sketch that argument?" },
      ]
    },
    {
      subject: "Architecture",
      mode: "Personal Statement",
      messages: [
        { role: "user", text: "I want to study Architecture at the Bartlett or Bath. I have a portfolio but I'm not sure what to write in my personal statement." },
        { role: "ai", text: "Architecture admissions care less about what you've designed and more about how you see the world. Walk me through a building or a space you've been in recently that made you feel something. Not one you read about. One you actually stood inside." },
        { role: "user", text: "There's this brutalist car park in my town. Everyone thinks it's ugly but I think it's actually quite beautiful in a weird way." },
        { role: "ai", text: "That's a much more interesting answer than saying you love the Shard. Why do you find it beautiful? Is it the raw concrete, the repetition, the way light hits it? And here's the real question: why does everyone else think it's ugly? What does that tension between your perception and theirs tell you about how people experience space?" },
        { role: "user", text: "I think people just see a grey block. But when you actually walk through it, the ramps create these really dramatic shadows in the afternoon and you can see the city framed through the openings at each level." },
        { role: "ai", text: "You've just described something an architecture tutor would love to read. The gap between how a building looks from outside and how it feels to move through it. That's a fundamentally architectural observation. Write it exactly like that. Don't try to use technical language. The way you naturally described the shadows and the framing is more compelling than any textbook terminology." },
      ]
    },
    {
      subject: "Music",
      mode: "Interview Prep",
      messages: [
        { role: "user", text: "I have a conservatoire interview for Music at the Royal Academy. How should I prepare beyond my performance pieces?" },
        { role: "ai", text: "They'll almost certainly ask you to do some aural analysis or sight-reading, but the conversation part is where most people slip up. They want to know how you listen, not just how you play. Let me ask you something: what piece of music have you listened to recently that changed how you think about your own playing?" },
        { role: "user", text: "I heard a recording of Glenn Gould playing Bach's Goldberg Variations. His tempo choices are so different from what I'd been taught." },
        { role: "ai", text: "Good choice. But don't just say his tempos are different. The interviewer will push you: different how? Faster in some variations, slower in others? And why do those choices work even though they break convention? What does that tell you about the relationship between a score and an interpretation?" },
        { role: "user", text: "I think he treated the score more like a starting point than a set of instructions. Like the music was a conversation between him and Bach rather than just following what was written." },
        { role: "ai", text: "That's a sophisticated way of thinking about performance vs interpretation. Now bring it back to you: has listening to Gould changed how you approach a score? Do you feel more permission to make your own choices? If an interviewer asks what kind of musician you want to be, this is your answer. Not technical ability. Your relationship with the music itself." },
      ]
    },
    {
      subject: "PPE",
      mode: "Interview Prep",
      messages: [
        { role: "user", text: "I have an Oxford PPE interview. I'm terrified. What do they actually ask?" },
        { role: "ai", text: "Oxford PPE interviews aren't about knowing things. They're about thinking out loud. Let me give you one: should the government tax sugary drinks? Don't just say yes or no. Think about what framework you'd use to answer that question." },
        { role: "user", text: "Yes, because it reduces obesity and saves the NHS money." },
        { role: "ai", text: "That's the obvious answer. The interviewer would immediately push: is it the government's role to decide what people eat? What about personal freedom? And economically, who actually bears the cost of the tax, the consumer or the producer? It depends on price elasticity. Can you explain why?" },
        { role: "user", text: "If demand is inelastic then consumers bear most of the tax because they keep buying it anyway?" },
        { role: "ai", text: "Exactly. Now here's the PPE twist: is demand for sugary drinks actually inelastic? And does it differ by income group? If poorer households spend a larger share of income on these drinks and demand is inelastic for them, then the tax is regressive even if it improves health outcomes. That's the tension. In the interview, showing you can hold both sides of that tension is more impressive than having the right answer." },
      ]
    },
  ];

  function DemoCarousel() {
    const [activeChat, setActiveChat] = useState(0);
    const [visibleMessages, setVisibleMessages] = useState(0);
    const chat = demoChats[activeChat];

    useEffect(() => {
      setVisibleMessages(0);
      const timers = chat.messages.map((_, i) => 
        setTimeout(() => setVisibleMessages(prev => Math.max(prev, i + 1)), 600 + i * 1200)
      );
      return () => timers.forEach(clearTimeout);
    }, [activeChat]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subject tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {demoChats.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveChat(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeChat === i 
                  ? 'gradient-primary text-white shadow-md' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-coral-200 hover:text-coral-500'
              }`}
            >
              {c.subject}
              <span className={`ml-1.5 text-[10px] ${activeChat === i ? 'text-white/70' : 'text-gray-400'}`}>
                {c.mode === "Interview Prep" ? "Interview" : "PS"}
              </span>
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 bg-gray-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <span className="text-xs font-medium text-gray-400 ml-2">myunioffer ai</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{background: '#2a2a2a', color: '#f07a62'}}>{chat.subject}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{background: '#2a2a2a', color: '#888'}}>{chat.mode}</span>
            </div>
          </div>
          <div className="p-5 space-y-3 overflow-y-auto" style={{background: '#1a1a1a', minHeight: '380px', maxHeight: '480px'}}>
            {chat.messages.map((msg, i) => (
              <div
                key={`${activeChat}-${i}`}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{
                  opacity: i < visibleMessages ? 1 : 0,
                  transform: i < visibleMessages ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}
              >
                <div
                  className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                    msg.role === 'user' ? 'rounded-tr-md' : 'rounded-tl-md'
                  }`}
                  style={{
                    background: msg.role === 'user' ? '#f07a62' : '#2a2a2a',
                  }}
                >
                  <p className="text-sm leading-relaxed" style={{color: msg.role === 'user' ? '#ffffff' : '#e0e0e0'}}>
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
            {visibleMessages < chat.messages.length && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-md px-4 py-3" style={{background: '#2a2a2a'}}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '0ms'}} />
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '150ms'}} />
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{animationDelay: '300ms'}} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setActiveChat(prev => prev === 0 ? demoChats.length - 1 : prev - 1)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-coral-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Previous
          </button>
          <div className="flex gap-1.5">
            {demoChats.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveChat(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  activeChat === i ? 'bg-coral-500 w-5' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setActiveChat(prev => prev === demoChats.length - 1 ? 0 : prev + 1)}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-coral-500 transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </motion.div>
    );
  }

  // Parallax ref
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);
  const heroBlobX = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const heroBlobY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 100% center; }
        }
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
      <section className="pt-20 pb-24 px-6 hero-pattern relative overflow-hidden">
        {/* Floating gradient blobs */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-coral-200 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
          style={{ x: heroBlobX, y: heroBlobY }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-300 rounded-full opacity-[0.06] blur-3xl pointer-events-none"
          style={{ x: useTransform(scrollYProgress, [0, 0.5], [0, -60]), y: useTransform(scrollYProgress, [0, 0.5], [0, 40]) }}
        />
        <motion.div className="max-w-5xl mx-auto text-center relative z-10" style={{ y: heroY }}>
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
              className="mt-1"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="gradient-text" style={{ 
                backgroundSize: '200% auto',
                animation: 'shimmer 3s ease-in-out infinite alternate'
              }}>dream university.</span>
            </motion.div>
          </div>

          {/* Animated underline */}
          <motion.div 
            className="h-1 gradient-primary rounded-full mx-auto mt-2 mb-4"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />

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


        </motion.div>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <section className="py-24 px-6 bg-gray-50 relative overflow-hidden">
        <motion.div 
          className="absolute -top-32 right-0 w-72 h-72 bg-coral-200 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">The application process is broken.</h2>
            <motion.div 
              className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <p className="text-gray-600 max-w-xl mx-auto">Everyone tells you to "be yourself" and "show passion." Nobody actually shows you how.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                label: "The ChatGPT problem", 
                text: "ChatGPT writes your PS. Admissions tutors read hundreds of AI-generated statements every cycle. They notice instantly.",
                response: "We coach your thinking instead."
              },
              { 
                label: "The cost barrier", 
                text: "Private consultants charge £6,000 to £35,000. Tutors charge £50 to £100 an hour. Most families can't afford that.",
                response: "We start at £8.99/month. Free tier included."
              },
              { 
                label: "The gap", 
                text: '"Show passion." "Be yourself." None of it tells you what a Medicine tutor wants to read or how a Cambridge interviewer picks who gets an offer.',
                response: "Our AI knows your subject."
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group cursor-default bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top accent bar */}
                <motion.div 
                  className="h-1 rounded-full gradient-primary mb-5"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="text-coral-500 font-display font-bold text-xs uppercase tracking-wider mb-3">{item.label}</div>
                <p className="text-gray-900 font-display font-semibold leading-snug mb-3">{item.text}</p>
                <p className="text-coral-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.response}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SUBJECT MARQUEE ==================== */}
      <div className="py-4 bg-white overflow-hidden border-y border-gray-100">
        <motion.div 
          className="flex gap-5 whitespace-nowrap"
          animate={{ x: [0, -2000] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(3)].map((_, rep) => (
            <div key={rep} className="flex gap-5">
              {['Medicine', 'Economics', 'Computer Science', 'Law', 'Engineering', 'PPE', 'Maths', 'Physics', 'History', 'Psychology', 'Dentistry', 'Architecture', 'English', 'Chemistry', 'Business', 'Biology', 'Veterinary', 'Nursing', 'Politics', 'Philosophy', 'Geography', 'Sociology', 'Modern Languages', 'Music', 'Accounting', 'Data Science'].map((subject, i) => (
                <span key={i} className="text-xs font-medium text-gray-300 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-coral-300" />
                  {subject}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>


      {/* ==================== LIVE DEMO ==================== */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">See it in action</h2>
            <motion.div className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-4" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-500 text-sm">Real conversations with the AI across different subjects. Not scripts.</p>
          </motion.div>

          <DemoCarousel />
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #f07a62 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Like having a mentor who knows your subject</h2>
            <motion.div 
              className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
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
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
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
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.3 }}
                >
                  {/* Circle on the line */}
                  <motion.div 
                    className="w-14 h-14 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-coral-500/20 relative z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-white font-display font-bold text-xl">{step.num}</span>
                  </motion.div>

                  {/* Content card */}
                  <motion.div 
                    className="flex-1 bg-gray-50 rounded-2xl p-7 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1, delay: 0.35 + i * 0.3, ease: [0.16, 1, 0.3, 1] }}
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
            viewport={{ once: true, margin: "-80px" }}
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
        </div>
      </section>

      {/* ==================== WHY US ==================== */}
      <section id="why-us" className="py-24 px-6 bg-gray-50 overflow-hidden relative">
        <motion.div 
          className="absolute -bottom-32 left-0 w-80 h-80 bg-coral-200 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Why students choose us</h2>
            <motion.div 
              className="h-0.5 w-16 gradient-primary rounded-full mx-auto mt-2"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          {/* Feature 1 - full width with accent */}
          <motion.div 
            className="bg-white rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute top-0 left-0 w-1.5 h-full gradient-primary rounded-l-2xl" />
            <div className="flex flex-col md:flex-row gap-8 items-start pl-4">
              <div className="flex-1">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">Coaching, not writing</div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">Most AI tools hand you a finished statement. Ours makes you write a <span className="gradient-text">better one yourself.</span></h3>
                <p className="text-gray-600 leading-relaxed">Admissions tutors can spot an AI-written personal statement in seconds. Our AI never writes a single sentence for you. It asks the questions that help you figure out what you actually want to say. Your statement stays authentically yours.</p>
              </div>
              <motion.div 
                className="flex-shrink-0 hidden md:block"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
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
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-1.5 gradient-primary" />
              <div className="p-8">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">Subject-specific</div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">It knows <span className="gradient-text">your subject.</span></h3>
                <p className="text-gray-600 leading-relaxed">A Medicine application has nothing in common with an Economics one. The AI detects your subject automatically and tailors everything: the questions it asks, the feedback it gives, the standards it holds you to.</p>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-1.5 gradient-primary" />
              <div className="p-8">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">Affordable</div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Premium coaching, <span className="gradient-text">student pricing.</span></h3>
                <p className="text-gray-600 leading-relaxed">Admissions consultants charge thousands. We start at £8.99 a month. There's also a free tier that gives you daily sessions, forever. Nobody should miss out because they couldn't afford help applying.</p>
              </div>
            </motion.div>
          </div>

          {/* Stats - animated counters feel */}
          <motion.div 
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="h-1 gradient-primary" />
            <div className="p-6 flex flex-wrap justify-center gap-10">
              {[
                { num: "1000", suffix: "+", label: "real resources" },
                { num: "24", suffix: "/7", label: "always available" },
                { num: "99", suffix: "%", label: "cheaper than tutoring" },
                { num: "120", suffix: "+", label: "students signed up" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: 0.1 + i * 0.15 }}
                >
                  <div className="text-2xl font-display font-bold text-coral-500">
                    <Counter target={stat.num} suffix={stat.suffix} />
                  </div>
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
          <motion.div className="text-center mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
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
                viewport={{ once: true, margin: "-80px" }}
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
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">What students are saying</h2>
            <p className="text-gray-600 max-w-lg mx-auto">Real feedback from students using myunioffer ai. Unedited.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              className="bg-gray-50 rounded-2xl p-7 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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
              viewport={{ once: true, margin: "-80px" }}
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
              viewport={{ once: true, margin: "-80px" }}
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
              viewport={{ once: true, margin: "-80px" }}
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Start free. Upgrade when you're ready.</h2>
            <motion.div 
              className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />
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
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className="card overflow-hidden"
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
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
      <section className="py-24 px-6 gradient-primary relative overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            Your application is too important to wing it.
          </motion.h2>
          <motion.p className="text-lg text-white/90 mb-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.1 }}>
            Start coaching your personal statement and interviews today. It's free.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.2 }}>
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
