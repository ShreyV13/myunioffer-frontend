import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowLeft,
  ArrowRight,
  User,
  ChevronDown,
} from 'lucide-react';

export default function About() {
  const [expandedMember, setExpandedMember] = useState(null);

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
    },
    { 
      name: "Pavan Kovuri", 
      uni: "Warwick", 
      course: "Economics",
      role: "Economics & Business Lead",
      subjects: "Economics, Business, Finance, Accounting, Management",
      bio: "Studying Economics at the University of Warwick. Went through the application process for one of the most competitive economics programmes in the country. Understands what economics departments want to see in personal statements and interviews.",
      contribution: "Leads the Economics and Business coaching, training the AI on economics-specific interview questions, quantitative reasoning, and how to demonstrate genuine analytical thinking in personal statements.",
    },
    { 
      name: "Suhas Parsaboina", 
      uni: "KCL", 
      course: "Medicine",
      role: "Medicine Lead",
      subjects: "Medicine, Dentistry, Veterinary, Nursing, Biomedical Sciences",
      bio: "Studying Medicine at King's College London. Successfully navigated one of the most competitive application processes in the country, including MMIs, UCAT, and the medical school personal statement. Knows exactly what medical schools look for and what trips applicants up.",
      contribution: "Leads the Medicine coaching, training the AI with real MMI questions, medical school personal statement structures, and the specific qualities medical schools look for in applicants.",
    },
    { 
      name: "Adyan Shahid", 
      uni: "Cambridge", 
      course: "Computer Science",
      role: "CS & Maths Lead",
      subjects: "Computer Science, Mathematics, Data Science, Statistics",
      bio: "Reading Computer Science at the University of Cambridge. Went through one of the most rigorous admissions processes in the country, including the Cambridge interview system. Brings deep understanding of how universities select for analytical thinking and problem-solving.",
      contribution: "Leads the CS and Maths coaching, training the AI on Cambridge-style interview questions, logical reasoning approaches, and how to demonstrate genuine intellectual curiosity in personal statements for quantitative subjects.",
    },
    { 
      name: "Girish Radhakrishnan", 
      uni: "Imperial", 
      course: "Chemical Engineering",
      role: "Engineering & Sciences Lead",
      subjects: "Chemical Engineering, Engineering, Chemistry, Physics, Natural Sciences",
      bio: "Studying Chemical Engineering at Imperial College London. Experienced the Imperial application process first-hand including their specific interview and admissions testing requirements.",
      contribution: "Leads the Engineering coaching, training the AI on Imperial-style application approaches, engineering personal statements, technical interviews, and how to demonstrate practical problem-solving ability.",
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
        {/* Hero - big, bold */}
        <section className="max-w-5xl mx-auto px-6 pt-16 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
              We got in. Now we're<br />helping <span className="gradient-text">you</span> get in.
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
              We remember the sleepless nights rewriting personal statements, the anxiety before interviews, the constant "is this even good enough?" Most students don't have access to the guidance that makes the difference. So we built it.
            </p>
          </motion.div>
        </section>

        {/* Our story - compact horizontal scroll-in */}
        <section className="bg-gray-50 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { label: "The problem", highlight: "best guidance", text: "The students who get in aren't always the smartest. They're the ones who had someone show them what admissions tutors actually want. Most students don't have that." },
                { label: "What we built", highlight: "always there", text: "A mentor that's available at 2am the night before your deadline. Trained by people who got the offers you're chasing. Subject-specific, not generic. Available whenever you need it." },
                { label: "Why it matters", highlight: "not fair", text: "Rich kids hire £6,000 consultants. We built the same quality of guidance for less than the price of a night out. Nobody should miss out on a good university because they couldn't afford help." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">{item.label}</div>
                  <p className="text-gray-600 leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team section - expandable cards */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">Meet the team</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Every subject specialist is a real student who successfully applied in that field. Tap any card to learn more.</p>
            </motion.div>
            
            <div className="space-y-4">
              {team.map((member, i) => {
                const isExpanded = expandedMember === i;
                return (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded-2xl border-2 border-gray-100 hover:border-coral-100 transition-colors duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                    onClick={() => setExpandedMember(isExpanded ? null : i)}
                  >
                    {/* Always visible header */}
                    <div className="p-6 flex items-center gap-5">
                      {/* Photo */}
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {member.photo ? (
                          <img src={member.photo} alt={member.name} className="w-16 h-16 rounded-xl object-cover border-2 border-coral-200" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-coral-200">
                            <User className="w-7 h-7 text-coral-300" />
                          </div>
                        )}
                      </motion.div>

                      {/* Name and role */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-display font-bold text-gray-900">{member.name}</h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-coral-50 border border-coral-200 rounded-full text-xs text-coral-600 font-bold">
                            🎓 {member.uni}
                          </span>
                        </div>
                        <div className="text-coral-500 text-sm font-medium">{member.role}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{member.course}</div>
                      </div>

                      {/* Expand icon */}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
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
                          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="h-px bg-gray-100 mb-5" />
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">About</div>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contribution to the AI</div>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.contribution}</p>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {member.subjects.split(', ').map((subject, j) => (
                                <span key={j} className="px-3 py-1 bg-gray-50 rounded-full text-xs text-gray-500 font-medium">
                                  {subject}
                                </span>
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

        {/* Support - minimal */}
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
            viewport={{ once: true }}
            className="max-w-5xl mx-auto gradient-primary rounded-3xl p-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-white/90 mb-6">Join students from across the UK preparing their applications with AI coaching.</p>
            <Link 
              to="/signup" 
              className="inline-flex items-center gap-2 bg-white text-coral-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              Start Free <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
