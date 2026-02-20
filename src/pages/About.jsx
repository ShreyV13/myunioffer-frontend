import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ArrowLeft,
  ArrowRight,
  Stethoscope,
  Code,
  TrendingUp,
  BookOpen,
  Palette,
  MapPin,
  Quote
} from 'lucide-react';

export default function About() {
  const coaches = [
    { icon: Stethoscope, subject: "Medicine", detail: "Healthcare, Dentistry, Veterinary", status: "Specialist" },
    { icon: Code, subject: "STEM", detail: "Comp Sci, Engineering, Maths, Physics", status: "Specialist" },
    { icon: TrendingUp, subject: "Economics", detail: "Economics, Finance, Business, PPE", status: "Specialist" },
    { icon: BookOpen, subject: "Humanities", detail: "History, Law, English, Psychology", status: "Specialist" },
    { icon: Palette, subject: "Arts", detail: "Architecture, Art, Music, Design", status: "Coming Soon" },
  ];

  const universities = [
    { name: "LSE", full: "London School of Economics" },
    { name: "KCL", full: "King's College London" },
    { name: "Cambridge", full: "University of Cambridge" },
    { name: "Imperial", full: "Imperial College London" },
    { name: "Warwick", full: "University of Warwick" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass border-b border-gray-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-display font-bold hidden sm:inline">
              myuni<span className="text-coral-500">offer</span><span className="text-gray-400">.ai</span>
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
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Built by students who just did it
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We're first-year students at the UK's top universities. We went through UCAS, personal statements, and interviews just months ago — and built the tool we wished we'd had.
          </p>
        </motion.div>

        {/* Why Us - 3 pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <motion.div 
            className="card p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <div className="text-3xl mb-4">🎓</div>
            <h3 className="text-lg font-display font-bold text-gray-900 mb-2">The best unis, the right courses</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our team are first-year students at LSE, KCL, Cambridge, Imperial, and Warwick. Some of the best universities in the UK for their respective subjects — and they're the ones training the AI you'll use.
            </p>
          </motion.div>

          <motion.div 
            className="card p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-3xl mb-4">💡</div>
            <h3 className="text-lg font-display font-bold text-gray-900 mb-2">We literally just did this</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We're first-years. We just went through UCAS, personal statements, and interviews months ago. We know exactly what it's like, what we struggled with, and how much we wished we had a mentor available whenever we needed one. That's exactly what this AI is.
            </p>
          </motion.div>

          <motion.div 
            className="card p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl mb-4">🏷️</div>
            <h3 className="text-lg font-display font-bold text-gray-900 mb-2">Premium quality, student price</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Other specialist AI tools are either not subject-specific or cost thousands. UniAdmissions charges £6,000–£35,000. Private tutors charge £50–100/hour. We give you a subject-specialist AI coach from £11.99/month.
            </p>
          </motion.div>
        </div>

        {/* Our University Network */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-8 text-center">Our university network</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {universities.map((uni, i) => (
              <motion.div 
                key={i}
                className="card px-6 py-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-coral-500" />
                  <div>
                    <div className="font-display font-bold text-gray-900">{uni.name}</div>
                    <div className="text-xs text-gray-500">{uni.full}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subject Coaches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 text-center">Subject specialist coaches</h2>
          <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
            Each subject area is led by a student who successfully applied in that field. They train the AI and offer optional 1-on-1 sessions.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {coaches.map((coach, i) => {
              const Icon = coach.icon;
              return (
                <motion.div 
                  key={i}
                  className="card card-hover p-6 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-1">{coach.subject}</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{coach.detail}</p>
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${
                    coach.status === 'Coming Soon' 
                      ? 'bg-gray-100 text-gray-500' 
                      : 'bg-coral-50 text-coral-600'
                  }`}>
                    {coach.status}
                  </span>
                </motion.div>
              );
            })}
          </div>

          <motion.p 
            className="text-center text-gray-500 mt-8 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="mailto:hello@myunioffer.ai" className="text-coral-500 font-semibold hover:text-coral-600 transition-colors">
              Are you a student at a top UK uni? Become a subject coach →
            </a>
          </motion.p>
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
