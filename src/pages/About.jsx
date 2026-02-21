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
      name: "Shrey Verma", 
      uni: "LSE", 
      course: "PPE",
      role: "Founder & Humanities Lead",
      photo: "/team-shrey.jpg",
      subjects: "Economics, PPE, Politics, International Relations, History, Law, Philosophy & Humanities",
      bio: "Founded myunioffer ai after going through the UCAS process and realising how expensive and inaccessible good application coaching is. Leads the Economics, PPE, and Humanities specialist agents, training them with real application insights from the LSE admissions process.",
      contribution: "Built the entire AI coaching system. Designed the master agent architecture with 5 subject specialists. Curated the Economics and Humanities interview questions and personal statement database. Covers all humanities and social science applications.",
      confirmed: true
    },
    { 
      name: "Recruiting", 
      uni: "Top UK University", 
      course: "Medicine",
      role: "Medicine Lead",
      subjects: "Medicine, Dentistry, Veterinary, Nursing, Biomedical Sciences",
      bio: "We're looking for a medical student from a top UK university who recently went through the competitive application process. Someone who knows exactly what medical school admissions tutors look for — and what trips applicants up.",
      contribution: "Will train the Medicine AI agent with real MMI questions, personal statement structures, and the specific qualities medical schools look for.",
      confirmed: false
    },
    { 
      name: "Adyan Shahid", 
      uni: "Cambridge", 
      course: "Computer Science",
      role: "STEM Lead",
      subjects: "Computer Science, Mathematics, Physics, Engineering",
      bio: "Reading Computer Science at the University of Cambridge. Went through one of the most rigorous admissions processes in the country, including the Cambridge interview system. Brings deep understanding of how top universities select for analytical thinking and problem-solving.",
      contribution: "Leads the STEM agent, training it on Cambridge-style interview questions, technical problem-solving approaches, and how to demonstrate genuine intellectual curiosity in personal statements.",
      confirmed: true
    },
    { 
      name: "Girish Radhakrishnan", 
      uni: "Imperial", 
      course: "Chemical Engineering",
      role: "Engineering Lead",
      subjects: "Chemical Engineering, Engineering, Physics, Design",
      bio: "Studying Chemical Engineering at Imperial College London — one of the top engineering schools in the world. Experienced the Imperial application process first-hand including their specific interview and admissions testing requirements.",
      contribution: "Leads the Engineering section of the STEM agent, training it on Imperial-style application approaches, engineering personal statements, technical interviews, and how to demonstrate practical problem-solving ability.",
      confirmed: true
    },
    { 
      name: "Recruiting", 
      uni: "Top UK University", 
      course: "Arts",
      role: "Arts Lead",
      subjects: "Architecture, Art, Music, Design, Theatre, Film",
      bio: "We're looking for an arts student from a top UK university. Someone who understands portfolio-based applications, creative interviews, and how to showcase artistic vision in personal statements.",
      contribution: "Will lead the Arts agent, training it on creative application approaches, portfolio presentation, and how to demonstrate artistic thinking.",
      confirmed: false
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

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            We got in. Now we're helping you get in.
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We remember the sleepless nights rewriting our personal statements for the tenth time. The anxiety before interviews. The feeling of "is this even good enough?" We went through it all — and came out the other side with offers from the UK's best universities. Now we've built the tool that would have made it so much easier.
          </p>
        </motion.div>

        {/* Why trust us pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <motion.div className="card p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-lg font-display font-bold text-gray-900 mb-2">We know what gets you rejected</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Generic personal statements. Stumbling in interviews. Not knowing what admissions tutors actually want. We made those mistakes in our own early drafts — and learned exactly how to fix them. The AI is trained on what works, because we lived it.
            </p>
          </motion.div>

          <motion.div className="card p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-display font-bold text-gray-900 mb-2">Your mentor at 2am when you need one</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              The night before your UCAS deadline, your teacher isn't answering emails. Your parents don't know what admissions tutors want. Your friends are as stressed as you. We built the mentor that's always there — trained by people who got the offers you're chasing, available whenever you need it.
            </p>
          </motion.div>

          <motion.div className="card p-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="text-3xl mb-4">🏷️</div>
            <h3 className="text-lg font-display font-bold text-gray-900 mb-2">The coaching you deserve, at a price you can afford</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
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
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-10 text-center">Meet the team</h2>
          
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
                {/* Photo / Status */}
                <div className="flex-shrink-0 text-center md:text-left">
                  {member.confirmed && member.photo ? (
                    <img src={member.photo} alt={member.name} className="w-24 h-24 rounded-2xl object-cover mx-auto md:mx-0 border-2 border-coral-200" />
                  ) : member.confirmed ? (
                    <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto md:mx-0 border-2 border-coral-200">
                      <User className="w-10 h-10 text-coral-300" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl flex flex-col items-center justify-center mx-auto md:mx-0 border-2 border-dashed border-gray-200">
                      <User className="w-8 h-8 text-gray-300 mb-1" />
                      <span className="text-[10px] text-gray-400 font-medium">OPEN ROLE</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-display font-bold text-gray-900">{member.name}</h3>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-coral-50 text-coral-600 rounded-full text-xs font-semibold">
                      {member.role}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
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

                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{member.bio}</p>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Their contribution to the AI</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.contribution}</p>
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
          <div className="card p-8 text-center bg-gray-50 border-gray-100">
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Are you at a top UK university?</h3>
            <p className="text-gray-600 text-sm mb-4 max-w-lg mx-auto">
              We're looking for first-year students to become subject coaches — your face on the site, your expertise training the AI, and earn money doing it.
            </p>
            <a href="mailto:shrey@myunioffer.com" className="btn-primary inline-flex text-sm px-6 py-3">
              Get in touch <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* Support section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="card p-8 text-center">
            <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Need help or want a refund?</h3>
            <p className="text-gray-600 text-sm mb-4 max-w-lg mx-auto">
              We're here for you. Whether you have a question about the AI, need help with your account, or want to cancel and get a refund — just email us.
            </p>
            <a href="mailto:support@myunioffer.com" className="inline-flex items-center gap-2 text-coral-500 font-semibold hover:text-coral-600 transition-colors">
              support@myunioffer.com <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-gray-400 text-xs mt-3">Cancel anytime · Full refunds available · We respond within 24 hours</p>
          </div>
        </motion.div>

        {/* Testimonials placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8 text-center">What students say</h2>
          <div className="card p-12 text-center max-w-2xl mx-auto">
            <Quote className="w-10 h-10 text-coral-200 mx-auto mb-4" />
            <p className="text-gray-500 italic mb-4">We're just launching — real testimonials from our first users will appear here soon.</p>
            <p className="text-sm text-gray-400">Want to be one of our first users and share your experience?</p>
            <Link to="/signup" className="inline-flex items-center gap-2 text-coral-500 font-semibold mt-4 hover:text-coral-600 transition-colors">
              Try it free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-primary rounded-3xl p-12 text-center"
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
      </main>
    </div>
  );
}
