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
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden"
      >
        <motion.div
          className="flex gap-6"
          animate={{ x: [0, -1800] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
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

  // Demo conversations
  const demoChats = [
    {
      subject: "Medicine",
      mode: "Personal Statement",
      messages: [
        { role: "user", text: "I'm applying for Medicine at UCL and Imperial. I have some work experience but I'm not sure how to write about it in my personal statement" },
        { role: "ai", text: "What work experience have you done? And more importantly, what actually made you think differently? Not \"I saw medicine is hard.\" What genuinely stuck with you?" },
        { role: "user", text: "I did a week at a GP surgery and two days shadowing at a hospital. I saw some interesting stuff but I don't know what's worth writing about" },
        { role: "ai", text: "Was there a patient interaction or a decision a doctor made that surprised you? Even small things count. The trap most students fall into is writing \"I saw a surgery and it was fascinating.\" Admissions tutors have read that thousands of times. What's something that genuinely stuck with you?" },
        { role: "user", text: "there was one patient at the GP who kept coming back every week even though there was nothing physically wrong with them. the doctor spent ages talking to them each time and I didn't really understand why at first" },
        { role: "ai", text: "That's gold. The gap between \"why is the doctor wasting time?\" and \"oh, I get it now\" is where your story lives. Did you figure out why, or did the doctor explain it?" },
        { role: "user", text: "I asked the doctor after and she said the patient was lonely and coming to the GP was basically their only social interaction. she said sometimes the most important thing you do as a doctor is just listen. I hadn't thought about medicine like that before" },
        { role: "ai", text: "That's your statement. You noticed a pattern, you were curious enough to ask, and it shifted how you understand the job. Don't write \"I learned medicine involves empathy.\" Write what you just told me: the patient returning weekly, the doctor giving them time, and the moment you realised that sometimes the most valuable thing a doctor offers isn't a diagnosis. That's what UCL and Imperial want to read." },
      ]
    },
    {
      subject: "Economics",
      mode: "Interview Prep",
      messages: [
        { role: "user", text: "I have an economics interview at Cambridge next week and I don't know what to expect, I'm really nervous" },
        { role: "ai", text: "That's normal. Cambridge economics interviews are 20-30 minutes, a mix of conceptual questions, problem-solving, and your personal statement. They're not testing whether you know everything. They want to see how you think. Let's do a mock right now. Here's one: suppose the government introduces a new tax on carbon emissions. How might this affect inflation, employment, and consumer welfare? Think out loud." },
        { role: "user", text: "so the tax would make energy more expensive for businesses so they'd pass that on to consumers through higher prices, so inflation goes up. and some businesses might not be able to afford the tax so they'd cut jobs. but it's supposed to be good for the environment so there's a trade-off between short term economic pain and long term benefits" },
        { role: "ai", text: "Good start, you've got the core mechanism. But push deeper. Does this hit all households equally? Do lower-income families feel it differently? Could the tax create jobs elsewhere, like in renewables? And \"good for the environment\" is too vague for Cambridge. Frame it in economic terms. What kind of market failure are emissions?" },
        { role: "user", text: "okay so the tax is regressive because poorer households spend more of their income on energy. and new jobs could come from renewable energy companies. and pollution is a negative externality so the tax internalises that cost, which makes the market more efficient" },
        { role: "ai", text: "You've genuinely levelled up. The regressivity point is exactly the distributional analysis that impresses. The externality framing is the key insight: carbon imposes costs not reflected in prices, so too much gets produced. The tax moves toward the socially optimal level. Now an interviewer would press further: how do you set the right tax rate? What if other countries don't implement one? Is a tax even the best tool, or would cap-and-trade work better? That's where the real complexity sits." },
      ]
    },
    {
      subject: "Computer Science",
      mode: "Personal Statement",
      messages: [
        { role: "user", text: "I'm applying for Computer Science at Imperial and Edinburgh. I've done some coding projects but I'm not sure what to put in my personal statement, it all feels a bit basic" },
        { role: "ai", text: "That's usually because you're underestimating what makes your work interesting. The projects matter less than why you did them and what they revealed about how you think. What have you actually built? Don't worry about whether it sounds impressive." },
        { role: "user", text: "I made a chess game in python and a to-do list app, and I've been messing around with some machine learning stuff but nothing serious. I also did a bit of web dev for a school project" },
        { role: "ai", text: "A chess game is way more interesting than you think. Did you build an AI opponent? Did you struggle with minimax, game tree search, optimisation? Imperial and Edinburgh want depth over breadth. One project where you genuinely problem-solved beats five polished but shallow ones. Which project taught you the most?" },
        { role: "user", text: "the chess one probably, I spent ages trying to make the computer play smart moves. I tried minimax but it was way too slow so I had to figure out alpha-beta pruning on my own from reading about it online" },
        { role: "ai", text: "That's your statement right there. You hit a real problem, recognised why it was happening, and independently researched a proper solution. Don't say \"I made a chess game.\" Say you wanted to build an AI opponent, discovered that a naive approach choked on search space, and dug into alpha-beta pruning to prune the game tree efficiently. That shows algorithmic thinking, self-directed learning, and genuine curiosity. That's what Imperial cares about." },
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
      mode: "Personal Statement",
      messages: [
        { role: "user", text: "I'm applying for Music at a conservatoire and I'm not sure what to write about in my personal statement, I feel like just saying I play piano isn't enough" },
        { role: "ai", text: "You're right, that's invisible. Conservatoires want to understand why you play and what kind of musician you're becoming. Not \"I love Chopin\" but what specifically about his work fascinates you. What's something about your playing that you've genuinely puzzled over recently? Not something impressive. Something that actually bothered you." },
        { role: "user", text: "I've been working on Chopin's Ballade No. 1 and I can play all the notes but my teacher keeps saying it doesn't sound like I mean it. I don't really know what she means by that" },
        { role: "ai", text: "That's your statement right there. Your teacher is pointing at the gap between technical competence and musical intention. Conservatoires see hundreds of students who can play the notes. They want musicians who mean what they play. What have you learned about yourself by confronting that gap? Has it changed how you practise or how you listen to other pianists?" },
        { role: "user", text: "she says the coda section sounds like I'm just getting through the notes instead of building towards something. like I speed up because I'm nervous not because the music needs it. I think she's right but I don't know how to fix it" },
        { role: "ai", text: "You've just identified that your instinct in high-pressure moments is to retreat into safety. That's self-knowledge most musicians don't have at your level. Frame the Ballade as a mirror in your statement: what has wrestling with that coda taught you about the difference between technical security and artistic commitment? That's not \"I overcame a challenge.\" That's \"I'm beginning to understand what separates a pianist from a musician.\" Conservatoires want exactly that." },
      ]
    },
    {
      subject: "PPE",
      mode: "Interview Prep",
      messages: [
        { role: "user", text: "I have an Oxford PPE interview and I'm terrified, I don't know what they're going to ask me" },
        { role: "ai", text: "PPE interviews follow patterns. They're testing how you think, not what you know. Let's do a practice round. Here's one: teachers are leaving the profession in record numbers to become plumbers. Who should pay for their retraining, the government, the individual, or their new employer? Think out loud." },
        { role: "user", text: "I guess the government should pay because teachers are a public good and we need them, so if they're leaving then the government has failed to make teaching attractive enough. but also the individual chose to leave so maybe they should pay for their own retraining" },
        { role: "ai", text: "Good instincts, you've found the tension. But push back on yourself: if the government failed, should taxpayers fund people leaving? That rewards the failure. And is it really a free choice if teaching salaries can't sustain a living? The real question is what problem are you solving: keeping teachers, helping people retrain, or sharing costs fairly? An economist cares about incentives, a philosopher about fairness, a politician about feasibility. Untangle those." },
        { role: "user", text: "okay so if the goal is keeping teachers then you raise salaries, not pay for retraining. but if someone's already decided to leave, maybe the employer who benefits should contribute. like the plumbing company gets a trained worker so they should invest in that. and I suppose fairness depends on whether you think education is a right or a service" },
        { role: "ai", text: "Now you're thinking like a PPE student. You separated the problem from the mechanism. You recognised that raising salaries is different from funding exits. And your last point is the real killer: the entire framing changes depending on whether education is a right or a service. That's where philosophy enters economics. An Oxford interviewer will love that, because policy debates aren't really about plumbing. They're about competing values underneath." },
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
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Subject tabs */}
        <div className="flex items-center gap-1.5 md:gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
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
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">How It Works</a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Why Us</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Testimonials</a>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Pricing</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-coral-500 transition-colors font-medium">About Us</Link>
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
          className="absolute -top-40 -right-40 w-96 h-96 bg-coral-200 rounded-full opacity-[0.08] blur-3xl pointer-events-none hidden md:block"
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-300 rounded-full opacity-[0.06] blur-3xl pointer-events-none hidden md:block"
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-coral-50 border border-coral-100 rounded-full text-sm font-medium text-coral-600 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              120+ students have already signed up
            </div>
          </motion.div>

          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 text-gray-900">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Get into your
            </motion.div>
            <motion.div
              className="mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
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
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.p 
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your personal statement won't write itself. Other AI tools will write it for you. Admissions tutors will notice. We coach you to write it yourself.
          </motion.p>

          <motion.p 
            className="text-base text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            AI coaching for personal statements and interviews. For any subject, any university.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Free to try. No credit card required.
          </motion.p>


        </div>
      </section>

      {/* ==================== PROBLEM ==================== */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 relative overflow-hidden">
        <motion.div 
          className="absolute -top-32 right-0 w-72 h-72 bg-coral-200 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
          initial={{ x: 50 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
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
                label: "The generic AI problem", 
                text: "Copy-paste an AI-written PS and admissions tutors will spot it instantly. They read hundreds every cycle. Same structure, same phrases, zero personality.",
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
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top accent bar */}
                <motion.div 
                  className="h-1 rounded-full gradient-primary mb-5"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="text-coral-500 font-display font-bold text-xs uppercase tracking-wider mb-3">{item.label}</div>
                <p className="text-gray-900 font-display font-semibold leading-snug mb-3">{item.text}</p>
                <p className="text-coral-500 text-sm font-medium md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{item.response}</p>
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
                <span key={i} className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-coral-400" />
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
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">See it in action</h2>
            <motion.div className="h-0.5 w-16 gradient-primary rounded-full mx-auto mb-4" initial={{ width: 0 }} whileInView={{ width: 64 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-500 text-sm">Real conversations with the AI across different subjects. Not scripts.</p>
          </motion.div>

          <DemoCarousel />

          {/* Before/After PS snippet */}
          <motion.div 
            className="mt-14 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">What coaching actually looks like</p>
            <div className="grid md:grid-cols-2 gap-4">
              <motion.div 
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 relative"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute -top-3 left-4 bg-gray-200 text-gray-600 text-xs font-bold px-3 py-1 rounded-full">Before</div>
                <p className="text-gray-500 text-sm leading-relaxed italic mt-2">"I have always been passionate about medicine since a young age. Seeing my grandmother suffer in hospital made me realise I wanted to help people and make a difference in the world."</p>
              </motion.div>
              <motion.div 
                className="bg-white rounded-2xl p-6 border-2 border-coral-200 relative"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute -top-3 left-4 gradient-primary text-white text-xs font-bold px-3 py-1 rounded-full">After coaching</div>
                <p className="text-gray-900 text-sm leading-relaxed mt-2">"When my grandmother was in hospital, the geriatrician knelt beside her bed and switched to simpler words because her English was fading. The junior doctor behind her was scribbling notes. I remember thinking those two people were doing completely different jobs in the same room, and I wanted to understand why."</p>
              </motion.div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-4">Same student. Same experience. One sounds like everyone else. The other sounds like them.</p>
          </motion.div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-6 bg-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #f07a62 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
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
              className="absolute left-[27px] md:left-7 top-0"
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
                  className="flex gap-4 md:gap-8 items-start relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.3 }}
                >
                  {/* Circle on the line */}
                  <motion.div 
                    className="w-12 h-12 md:w-14 md:h-14 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-coral-500/20 relative z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-white font-display font-bold text-xl">{step.num}</span>
                  </motion.div>

                  {/* Content card */}
                  <motion.div 
                    className="flex-1 bg-gray-50 rounded-2xl p-5 md:p-7 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 8 }}
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
            initial={{ opacity: 0, y: 10 }}
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
      <section id="why-us" className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 overflow-hidden relative">
        <motion.div 
          className="absolute -bottom-32 left-0 w-80 h-80 bg-coral-200 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
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
            initial={{ opacity: 0, y: 8 }}
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
                whileInView={{ opacity: 1, y: 0 }}
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
              whileInView={{ opacity: 1, y: 0 }}
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
              whileInView={{ opacity: 1, y: 0 }}
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
            initial={{ opacity: 0, y: 10 }}
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
                  initial={{ opacity: 0, y: 10 }}
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gray-900">Start free. Upgrade when you're ready.</h2>
            <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-6" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            <p className="text-gray-600 max-w-lg mx-auto mb-8">
              The free tier gives you daily coaching sessions, forever. Paid plans start at £8.99/month for more usage when you're doing serious drafting and interview prep.
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
      <section id="faq" className="py-16 md:py-24 px-4 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">Frequently asked questions</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                className="card overflow-hidden"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
      <section className="py-16 md:py-24 px-4 md:px-6 gradient-primary relative overflow-hidden">
        {/* Floating shapes */}
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
