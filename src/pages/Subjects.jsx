import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';
import { subjects } from '../subjects/subjectData';

export default function Subjects() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    document.title = 'UCAS subject guides — personalised advice for every course | myunioffer';
    const setOrCreate = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    setOrCreate('name', 'description', 'Free UCAS application advice for every subject. What admissions tutors look for, recommended reading, supercurriculars, and common mistakes. Written by students who just got in.');
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
              <Link to="/#features" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Features</Link>
              <Link to="/subjects" className="text-coral-500 font-medium">Subjects</Link>
              <Link to="/blog" className="text-gray-600 hover:text-coral-500 transition-colors font-medium">Blog</Link>
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
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Home</Link>
              <Link to="/subjects" onClick={() => setMobileMenuOpen(false)} className="text-coral-500 font-medium">Subjects</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Blog</Link>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Pricing</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Log In</Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-center mt-2">Get Started</Link>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="pt-16 pb-8 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">Subject guides</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">UCAS advice for your subject</h1>
            <p className="text-gray-500 max-w-lg mx-auto">What admissions tutors look for, what to read, what supercurriculars matter, and the mistakes everyone else makes. Pick your subject.</p>
          </motion.div>
        </div>
      </section>

      {/* Subject Grid */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {subjects.map((subject, i) => (
              <motion.div key={subject.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.03 }}>
                <Link to={`/subjects/${subject.slug}`} className="block px-5 py-4 rounded-xl border border-gray-100 hover:border-coral-200 hover:shadow-sm transition-all group">
                  <p className="font-display font-semibold text-gray-900 group-hover:text-coral-500 transition-colors">{subject.name}</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{subject.heroHook}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 gradient-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Don't see your subject?</h2>
          <p className="text-white/80 mb-6">The AI coach covers every UCAS subject. Tell it what you're applying for and it tailors the advice.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-coral-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Start free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center"><GraduationCap className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-display font-bold">myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span></span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-600">
            <Link to="/subjects" className="hover:text-coral-500 transition-colors">Subjects</Link>
            <Link to="/blog" className="hover:text-coral-500 transition-colors">Blog</Link>
            <Link to="/privacy" className="hover:text-coral-500 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-coral-500 transition-colors">Terms</Link>
            <Link to="/about" className="hover:text-coral-500 transition-colors">Team</Link>
            <Link to="/pricing" className="hover:text-coral-500 transition-colors">Pricing</Link>
            <a href="mailto:support@myunioffer.com" className="hover:text-coral-500 transition-colors">Support</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 text-center text-sm text-gray-400">&copy; 2026 myunioffer ai</div>
      </footer>
    </div>
  );
}
