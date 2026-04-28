import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowLeft,
  ArrowRight,
  User,
  ChevronDown,
} from 'lucide-react';

export default function About() {
  const [expandedMember, setExpandedMember] = useState(null);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

  const storyItems = [
    { 
      label: "Where we started", 
      title: "We had amazing teachers. Most students don't.",
      text: "We were lucky. Our teachers sat with us for hours, read our personal statements five or six times, and pushed us to rewrite until it was good. We got into LSE, Cambridge, Imperial, KCL, and Warwick partly because of that. But we watched friends at other schools get told \"looks good\" and sent off with nothing. Same grades, completely different outcomes.",
      stat: "5",
      statLabel: "universities we got into"
    },
    { 
      label: "What we realised", 
      title: "The help that works costs thousands.",
      text: "Private consultants charge £6,000 to £35,000. Tutors charge £50 to £100 an hour. The students who can afford it get coached on exactly what to write and say. Everyone else figures it out alone. We thought that was genuinely unfair. We still do.",
      stat: "£6,000+",
      statLabel: "what private consultants charge"
    },
    { 
      label: "What we did about it", 
      title: "We built the mentor we wished everyone had.",
      text: "Five first-years, no investors, no marketing department. We took everything from our own applications and trained an AI on it. It coaches you the way our teachers coached us. Hard questions, honest feedback, real depth. Available to everyone, for less than a tenner a month. Or for free.",
      stat: "£8.99",
      statLabel: "per month, with a free tier"
    },
  ];

  function StoryTabs() {
    const [activeTab, setActiveTab] = useState(0);
    const item = storyItems[activeTab];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Tab buttons */}
        <div className="flex gap-2 mb-8 justify-center">
          {storyItems.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeTab === i
                  ? 'gradient-primary text-white shadow-md shadow-coral-500/20'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Main content */}
              <div className="flex-1">
                <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">{item.label}</div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 leading-tight">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </div>

              {/* Stat highlight */}
              <div className="flex-shrink-0 w-full md:w-48">
                <div className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 max-w-[200px] mx-auto md:max-w-none">
                  <motion.div 
                    className="text-3xl md:text-4xl font-display font-bold text-coral-500 mb-1"
                    key={`stat-${activeTab}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    {item.stat}
                  </motion.div>
                  <div className="text-xs text-gray-500">{item.statLabel}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {storyItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeTab === i ? 'bg-coral-500 w-8' : 'bg-gray-200 w-3 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
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

  const team = [
    { 
      name: "Shrey Verma", 
      uni: "LSE", 
      course: "PPE",
      role: "Founder & Humanities Lead",
      photo: "/team-shrey.jpg",
      subjects: "PPE, Politics, International Relations, History, Law, Philosophy & Humanities",
      bio: "Founded myunioffer ai after going through the UCAS process and realising how expensive and inaccessible good application coaching is. Leads the Humanities specialist coaching, training the AI with real application insights from the LSE admissions process.",
      contribution: "Built the entire AI coaching system from scratch. Curated the Humanities interview questions and personal statement database. Covers all humanities and social science applications.",
      color: "#f96a50",
    },
    { 
      name: "Pavan Kovuri", 
      uni: "Warwick", 
      course: "Economics",
      role: "Economics & Business Lead",
      subjects: "Economics, Business, Finance, Accounting, Management",
      bio: "Studying Economics at the University of Warwick. Went through the application process for one of the most competitive economics programmes in the country. Understands what economics departments want to see in personal statements and interviews.",
      contribution: "Leads the Economics and Business coaching, training the AI on economics-specific interview questions, quantitative reasoning, and how to demonstrate genuine analytical thinking in personal statements.",
      color: "#f96a50",
    },
    { 
      name: "Suhas Parsaboina", 
      uni: "KCL", 
      course: "Medicine",
      role: "Medicine Lead",
      subjects: "Medicine, Dentistry, Veterinary, Nursing, Biomedical Sciences",
      bio: "Studying Medicine at King's College London. Successfully navigated one of the most competitive application processes in the country, including MMIs, UCAT, and the medical school personal statement. Knows exactly what medical schools look for and what trips applicants up.",
      contribution: "Leads the Medicine coaching, training the AI with real MMI questions, medical school personal statement structures, and the specific qualities medical schools look for in applicants.",
      color: "#f96a50",
    },
    { 
      name: "Adyan Shahid", 
      uni: "Cambridge", 
      course: "Computer Science",
      role: "CS & Maths Lead",
      subjects: "Computer Science, Mathematics, Data Science, Statistics",
      bio: "Reading Computer Science at the University of Cambridge. Went through one of the most rigorous admissions processes in the country, including the Cambridge interview system. Brings deep understanding of how universities select for analytical thinking and problem-solving.",
      contribution: "Leads the CS and Maths coaching, training the AI on Cambridge-style interview questions, logical reasoning approaches, and how to demonstrate genuine intellectual curiosity in personal statements for quantitative subjects.",
      color: "#f96a50",
    },
    { 
      name: "Girish Radhakrishnan", 
      uni: "Imperial", 
      course: "Chemical Engineering",
      role: "Engineering & Sciences Lead",
      subjects: "Chemical Engineering, Engineering, Chemistry, Physics, Natural Sciences",
      bio: "Studying Chemical Engineering at Imperial College London. Experienced the Imperial application process first-hand including their specific interview and admissions testing requirements.",
      contribution: "Leads the Engineering coaching, training the AI on Imperial-style application approaches, engineering personal statements, technical interviews, and how to demonstrate practical problem-solving ability.",
      color: "#f96a50",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold hidden sm:inline">
              myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span>
            </span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main>
        {/* Hero with parallax and floating blobs */}
        <section className="relative overflow-hidden pt-16 pb-20 px-6">
          <motion.div 
            className="absolute -top-32 -right-32 w-80 h-80 bg-coral-200 rounded-full opacity-[0.07] blur-3xl pointer-events-none"
            style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, -60]) }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-60 h-60 bg-coral-300 rounded-full opacity-[0.05] blur-3xl pointer-events-none"
            style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 40]) }}
          />

          <motion.div className="max-w-5xl mx-auto text-center relative z-10" style={{ y: heroY }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-2 leading-tight">
                We got in. Now we're helping
              </h1>
              <motion.h1 
                className="text-3xl md:text-5xl font-display font-bold gradient-text mb-6 leading-tight pb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                you get in.
              </motion.h1>
            </motion.div>
            <motion.div 
              className="h-0.5 gradient-primary rounded-full mx-auto mt-10 mb-10"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              We remember the sleepless nights rewriting personal statements, the anxiety before interviews, the constant "is this even good enough?" Most students don't have access to the guidance that makes the difference. So we built it.
            </motion.p>
          </motion.div>
        </section>

        {/* Stats bar - counting numbers */}
        <section className="py-8 px-6 bg-gray-50 border-y border-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-12">
              {[
                { num: "5", suffix: "", label: "universities" },
                { num: "5", suffix: "", label: "subject areas" },
                { num: "1000", suffix: "+", label: "resources" },
                { num: "120", suffix: "+", label: "students signed up" },
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="text-2xl font-display font-bold text-coral-500">
                    <Counter target={stat.num} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our story - interactive tabs */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">Our story</h2>
              <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
            </motion.div>

            <StoryTabs />
          </div>
        </section>

        {/* Team section */}
        <section className="py-24 px-6 bg-gray-50 relative overflow-hidden">
          <motion.div 
            className="absolute -top-32 right-0 w-72 h-72 bg-coral-200 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-4"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">Meet the team</h2>
              <motion.div className="h-0.5 w-12 gradient-primary rounded-full mx-auto mb-4" initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
              <p className="text-gray-500 max-w-lg mx-auto">Every subject specialist is a real student who successfully applied in that field. Tap anyone to learn more.</p>
            </motion.div>
            
            {/* University visual bar */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              {['LSE', 'Warwick', 'KCL', 'Cambridge', 'Imperial'].map((uni, i) => (
                <motion.div 
                  key={i} 
                  className="px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.05, borderColor: '#f96a50' }}
                >
                  🎓 {uni}
                </motion.div>
              ))}
            </motion.div>

            {/* Team cards */}
            <div className="space-y-4">
              {team.map((member, i) => {
                const isExpanded = expandedMember === i;
                return (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded-2xl bg-white border-2 border-gray-100 hover:border-coral-100 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setExpandedMember(isExpanded ? null : i)}
                  >
                    {/* Colored top accent line */}
                    <div className="h-1" style={{ background: member.color }} />

                    {/* Always visible header */}
                    <div className="p-6 flex items-center gap-5">
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-xl object-cover border-2 border-coral-200" />
                        ) : (
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center border-2" style={{ borderColor: member.color, background: member.color + '10' }}>
                            <User className="w-7 h-7" style={{ color: member.color }} />
                          </div>
                        )}
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-display font-bold text-gray-900">{member.name}</h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-coral-50 border border-coral-200 rounded-full text-xs text-coral-600 font-bold">
                            🎓 {member.uni}
                          </span>
                        </div>
                        <div className="text-sm font-medium" style={{ color: member.color }}>{member.role}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{member.course}</div>
                      </div>

                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="h-px bg-gray-100 mb-5" />
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: member.color }}>About</div>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                              </div>
                              <div>
                                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: member.color }}>Contribution to the AI</div>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.contribution}</p>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {member.subjects.split(', ').map((subject, j) => (
                                <motion.span 
                                  key={j} 
                                  className="px-3 py-1 rounded-full text-xs font-medium"
                                  style={{ background: member.color + '10', color: member.color }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: j * 0.04 }}
                                >
                                  {subject}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="py-10 px-6 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 text-sm mb-2">
              Questions? <a href="mailto:support@myunioffer.com" className="text-coral-500 font-semibold hover:text-coral-600 transition-colors">support@myunioffer.com</a>
            </p>
            <p className="text-gray-400 text-xs">We respond within 24 hours</p>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-5xl mx-auto gradient-primary rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-white/90 mb-6">Join students from across the UK preparing their applications with AI coaching.</p>
              <Link 
                to="/signup" 
                className="inline-flex items-center gap-2 bg-white text-coral-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
              >
                Start Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
