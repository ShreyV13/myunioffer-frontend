import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X, ArrowRight } from 'lucide-react';
import { articles } from '../blog/articles';

export default function Blog() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    document.title = 'Blog: UCAS advice from students who just got in | myunioffer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Practical guides for personal statements, supercurriculars, and interviews. Written by first-year students at LSE, Cambridge, Warwick, KCL, and Imperial.');
    else {
      const tag = document.createElement('meta');
      tag.name = 'description';
      tag.content = 'Practical guides for personal statements, supercurriculars, and interviews. Written by first-year students at LSE, Cambridge, Warwick, KCL, and Imperial.';
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Nav - matches Landing.jsx */}
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
              <Link to="/blog" className="text-coral-500 font-medium">Blog</Link>
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
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Home</Link>
              <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-coral-500 font-medium">Blog</Link>
              <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">Pricing</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 font-medium">About Us</Link>
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
            <p className="text-coral-500 font-display font-bold text-sm uppercase tracking-wider mb-3">myunioffer blog</p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Advice from students who just got in</h1>
            <p className="text-gray-500 max-w-lg mx-auto">Practical guides for personal statements, supercurriculars, and interviews. Written by students at LSE, Cambridge, Warwick, KCL, and Imperial.</p>
          </motion.div>
        </div>
      </section>

      {/* Article List */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="divide-y divide-gray-100">
            {articles.map((article, i) => (
              <motion.div key={article.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link to={`/blog/${article.slug}`} className="block py-8 group">
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <h2 className="text-lg md:text-xl font-display font-bold text-gray-900 group-hover:text-coral-500 transition-colors leading-snug">{article.title}</h2>
                    <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">{article.date}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{article.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-semibold" style={{ background: '#f96a50' }}>{article.authorInitials}</div>
                      <span className="text-xs text-gray-400">{article.author}, {article.authorUni}</span>
                    </div>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                    <span className="text-xs text-gray-300 sm:hidden">·</span>
                    <span className="text-xs text-gray-400 sm:hidden">{article.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 gradient-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">Get personalised advice for your application</h2>
          <p className="text-white/80 mb-6">Tell the AI coach your subject and get a specific plan for your summer. Free, no credit card needed.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-coral-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
            Start free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer - matches Landing.jsx */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center"><GraduationCap className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-display font-bold">myuni<span className="text-coral-500">offer</span> <span className="text-gray-400">ai</span></span>
          </Link>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-600">
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
