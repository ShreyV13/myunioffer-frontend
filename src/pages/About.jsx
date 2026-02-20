import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowLeft,
  ArrowRight,
  User,
  MapPin,
  BookOpen,
  Briefcase,
  Quote
} from 'lucide-react';

export default function About() {
  // Replace with real info when you have it
  const team = [
    { 
      name: "Coming Soon", 
      uni: "LSE", 
      course: "PPE",
      role: "Founder & Economics Lead",
      subjects: "Economics, PPE, Finance, Business",
      bio: "Founded myunioffer.ai after going through the UCAS process and realising how expensive and inaccessible good application coaching is. Leads the Economics & PPE specialist agent, training it with real application insights from the LSE admissions process.",
      contribution: "Built the entire AI coaching system. Designed the master agent architecture with 5 subject specialists. Curated the Economics interview questions and personal statement database."
    },
    { 
      name: "Coming Soon", 
      uni: "KCL", 
      course: "Medicine",
      role: "Medicine Lead",
      subjects: "Medicine, Dentistry, Veterinary, Nursing",
      bio: "A first-year medical student at King's College London who went through one of the most competitive application processes in the UK. Knows exactly what medical school admissions tutors look for — and what trips applicants up.",
      contribution: "Trains the Medicine AI agent with real MMI questions, personal statement structures, and the specific qualities medical schools look for. Ensures the AI understands work experience, ethical scenarios, and motivation questions."
    },
    { 
      name: "Coming Soon", 
      uni: "Cambridge", 
      course: "Computer Science",
      role: "STEM Lead",
      subjects: "Computer Science, Mathematics, Physics",
      bio: "Reading Computer Science at Cambridge. Went through the Cambridge admissions process including the rigorous interview system. Brings deep understanding of how Oxbridge selects for analytical thinking and problem-solving.",
      contribution: "Leads the STEM agent, training it on Cambridge-style interview questions, technical problem-solving approaches, and how to demonstrate genuine intellectual curiosity in personal statements."
    },
    { 
      name: "Coming Soon", 
      uni: "Imperial", 
      course: "Engineering",
      role: "Engineering Specialist",
      subjects: "Engineering, Physics, Design",
      bio: "Studying Engineering at Imperial College London — one of the top engineering schools in the world. Experienced the Imperial application process first-hand including their specific interview and admissions testing requirements.",
      contribution: "Adds Imperial-specific engineering application knowledge to the STEM agent. Helps train the AI on engineering personal statements, technical interviews, and how to demonstrate practical problem-solving."
    },
    { 
      name: "Coming Soon", 
      uni: "Warwick", 
      course: "Economics",
      role: "Economics Specialist",
      subjects: "Economics, Finance, Quantitative subjects",
      bio: "Studying Economics at the University of Warwick, known for its world-class Economics department. Successfully navigated the competitive admissions process and understands what makes an Economics application stand out.",
      contribution: "Strengthens the Economics agent with Warwick-specific insights, econometrics-focused interview preparation, and how to demonstrate mathematical and analytical ability in personal statements."
    },
  ];

  return (
    <div className="min-h-screen bg-[#323232]">
      {/* Header */}
      <header className="glass border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[#bbb] hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold hidden sm:inline">
              myuni<span className="text-[#f07a62]">offer</span><span className="text-[#999]">.ai</span>
            </span>
          </Link>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            We got in. Now we're helping you get in.
          </h1>
          <p className="text-[#bbb] max-w-2xl mx-auto leading-relaxed">
            We remember the sleepless nights rewriting our personal statements for the tenth time. The anxiety before interviews. The feeling of "is this even good enough?" We went through it all — and came out the other side with offers from the UK's best universities. Now we've built the tool that would have made it so much easier.
          </p>
        </motion.div>

        {/* Why trust us pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <motion.div className="card p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-lg font-display font-bold text-white mb-2">We know what gets you rejected</h3>
            <p className="text-[#bbb] text-sm leading-relaxed">
              Generic personal statements. Stumbling in interviews. Not knowing what admissions tutors actually want. We made those mistakes in our own early drafts — and learned exactly how to fix them. The AI is trained on what works, because we lived it.
            </p>
          </motion.div>

          <motion.div className="card p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-display font-bold text-white mb-2">Your mentor at 2am when you need one</h3>
            <p className="text-[#bbb] text-sm leading-relaxed">
              The night before your UCAS deadline, your teacher isn't answering emails. Your parents don't understand what Oxbridge wants. Your friends are as stressed as you. We built the mentor that's always there — trained by people who got the offers you're chasing, available whenever you need it.
            </p>
          </motion.div>

          <motion.div className="card p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="text-3xl mb-4">🏷️</div>
            <h3 className="text-lg font-display font-bold text-white mb-2">The coaching you deserve, at a price you can afford</h3>
            <p className="text-[#bbb] text-sm leading-relaxed">
              Rich kids hire £6,000 consultants and get in. That's not fair. We built something that gives you the same quality of guidance — subject-specific, based on real data from successful applications — for less than the price of a night out. This is the great equaliser.
            </p>
          </motion.div>
        </div>

        {/* Full Team Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-10 text-center">Meet the team</h2>
          
          <div className="space-y-6">
            {team.map((member, i) => (
              <motion.div 
                key={i}
                className="card p-8 flex flex-col md:flex-row gap-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Photo placeholder */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="w-24 h-24 bg-[rgba(255,255,255,0.06)] rounded-2xl flex items-center justify-center mx-auto md:mx-0 border-2 border-[rgba(255,255,255,0.1)]">
                    <User className="w-10 h-10 text-gray-300" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-display font-bold text-white">{member.name}</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[rgba(240,122,98,0.1)] text-[#f07a62] rounded-full text-xs font-semibold">
                      {member.role}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-[#999] mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {member.uni}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> {member.course}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" /> Covers: {member.subjects}
                    </span>
                  </div>

                  <p className="text-[#bbb] text-sm leading-relaxed mb-3">{member.bio}</p>
                  
                  <div className="p-4 bg-[#2c2c2c] rounded-xl">
                    <p className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-1">Their contribution to the AI</p>
                    <p className="text-[#bbb] text-sm leading-relaxed">{member.contribution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Become a coach CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="card p-8 text-center bg-[#2c2c2c] border-[rgba(255,255,255,0.06)]">
            <h3 className="text-xl font-display font-bold text-white mb-2">Are you at a top UK university?</h3>
            <p className="text-[#bbb] text-sm mb-4 max-w-lg mx-auto">
              We're looking for first-year students to become subject coaches — your face on the site, your expertise training the AI, and earn money doing it.
            </p>
            <a href="mailto:hello@myunioffer.ai" className="btn-primary inline-flex text-sm px-6 py-3">
              Get in touch <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Testimonials placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 text-center">What students say</h2>
          <div className="card p-12 text-center max-w-2xl mx-auto">
            <Quote className="w-10 h-10 text-coral-200 mx-auto mb-4" />
            <p className="text-[#999] italic mb-4">We're just launching — real testimonials from our first users will appear here soon.</p>
            <p className="text-sm text-[#999]">Want to be one of our first users and share your experience?</p>
            <Link to="/signup" className="inline-flex items-center gap-2 text-[#f07a62] font-semibold mt-4 hover:text-[#f07a62] transition-colors">
              Try it free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-12 text-center" style={{background: '#3a3a3a', border: '1px solid rgba(240,122,98,0.15)'}}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-white/90 mb-6">Join students from across the UK preparing their applications with AI coaching.</p>
          <Link 
            to="/signup" 
            className="btn-primary text-lg px-8 py-4"
          >
            Start Free <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
