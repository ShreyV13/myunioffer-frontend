import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { subjects } from '../subjects/subjectData';

function setMetaTags(subject) {
  document.title = subject.metaTitle;
  const setOrCreate = (attr, key, value) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute('content', value);
  };
  setOrCreate('name', 'description', subject.metaDesc);
  setOrCreate('property', 'og:title', subject.metaTitle);
  setOrCreate('property', 'og:description', subject.metaDesc);
  setOrCreate('property', 'og:url', `https://myunioffer.com/subjects/${subject.slug}`);
  setOrCreate('property', 'og:type', 'website');
  setOrCreate('property', 'og:site_name', 'myunioffer ai');
  setOrCreate('name', 'twitter:card', 'summary');
  setOrCreate('name', 'twitter:title', subject.metaTitle);
  setOrCreate('name', 'twitter:description', subject.metaDesc);
}

function setJsonLd(subject) {
  let el = document.querySelector('script[data-subject-jsonld]');
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.setAttribute('data-subject-jsonld', 'true'); document.head.appendChild(el); }
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${subject.name} UCAS application advice`,
    "description": subject.metaDesc,
    "publisher": { "@type": "Organization", "name": "myunioffer ai", "url": "https://myunioffer.com" },
    "url": `https://myunioffer.com/subjects/${subject.slug}`,
  });
}

export default function SubjectPage() {
  const { slug } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const subject = subjects.find(s => s.slug === slug);
  const otherSubjects = subjects.filter(s => s.slug !== slug).slice(0, 8);

  useEffect(() => {
    if (subject) {
      setMetaTags(subject);
      setJsonLd(subject);
    }
    return () => {
      const jsonLd = document.querySelector('script[data-subject-jsonld]');
      if (jsonLd) jsonLd.remove();
    };
  }, [subject]);

  if (!subject) return <Navigate to="/subjects" />;

  const signupUrl = `/signup?subject=${encodeURIComponent(subject.name.toLowerCase())}`;

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

      <div className="px-6 pt-10 pb-16">
        <div className="max-w-[700px] mx-auto">

          {/* Breadcrumb */}
          <Link to="/subjects" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-coral-500 transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> All subjects
          </Link>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 leading-tight mb-4">
              {subject.name} UCAS application: what you need to know
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-6">{subject.heroHook}</p>
            <Link to={signupUrl} className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-coral-500/20 hover:shadow-xl hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #f96a50, #e74d32)' }}>
              Get free personalised advice for {subject.name} <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-3">Built by students at LSE, Cambridge, Imperial, Warwick, and KCL</p>
          </motion.div>

          {/* What admissions tutors look for */}
          <motion.div className="mt-14" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-4">What admissions tutors look for</h2>
            {subject.whatTutorsLookFor.split('\n\n').map((p, i) => (
              <p key={i} className="text-gray-700 mb-5 leading-[1.75]" style={{ fontSize: '17px' }}>{p}</p>
            ))}
          </motion.div>

          {/* Recommended reading */}
          <motion.div className="mt-12" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-4">Recommended reading</h2>
            <div className="space-y-5">
              {subject.reading.map((book, i) => (
                <div key={i}>
                  <p className="font-semibold text-gray-900" style={{ fontSize: '17px' }}>{book.title} <span className="font-normal text-gray-400">by {book.author}</span></p>
                  <p className="text-gray-600 mt-1 leading-relaxed" style={{ fontSize: '16px' }}>{book.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mid CTA */}
          <div className="my-12 rounded-xl px-6 py-5 bg-gray-50 border border-gray-100">
            <p className="text-gray-900 font-display font-semibold text-base mb-2">Get a personalised {subject.name} plan</p>
            <p className="text-gray-500 text-sm mb-4">The AI coach gives you specific reading, supercurriculars, and reflection prompts for {subject.name}. Free, no credit card.</p>
            <Link to={signupUrl} className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #f96a50, #e74d32)' }}>
              Start free <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Supercurriculars */}
          <motion.div className="mt-12" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-4">Supercurriculars that actually matter</h2>
            {subject.supercurriculars.split('\n\n').map((p, i) => (
              <p key={i} className="text-gray-700 mb-5 leading-[1.75]" style={{ fontSize: '17px' }}>{p}</p>
            ))}
          </motion.div>

          {/* Common mistakes */}
          <motion.div className="mt-12" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-4">Common mistakes</h2>
            <div className="space-y-4">
              {subject.commonMistakes.map((mistake, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-coral-400 font-bold text-lg leading-none mt-0.5">x</span>
                  <p className="text-gray-700 leading-relaxed" style={{ fontSize: '17px' }}>{mistake}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* How we help */}
          <motion.div className="mt-12" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mb-4">How myunioffer helps with {subject.name}</h2>
            <p className="text-gray-700 leading-[1.75]" style={{ fontSize: '17px' }}>{subject.howWeHelp}</p>
          </motion.div>

          {/* End CTA */}
          <div className="mt-12 mb-8 rounded-2xl px-6 py-8 md:px-8 md:py-10 text-center" style={{ background: 'linear-gradient(135deg, #f96a50, #e74d32)' }}>
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Start your {subject.name} application the right way</h3>
            <p className="text-white/85 text-sm md:text-base mb-2 max-w-md mx-auto">Free AI coaching for your UCAS application. No credit card, no catch.</p>
            <p className="text-white/60 text-xs mb-6">Built by students at LSE, Cambridge, Imperial, Warwick, and KCL.</p>
            <Link to={signupUrl} className="inline-flex items-center gap-2 bg-white text-coral-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm md:text-base">
              Get my {subject.name} plan <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Other subjects */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Explore other subjects</p>
            <div className="flex flex-wrap gap-2">
              {otherSubjects.map(s => (
                <Link key={s.slug} to={`/subjects/${s.slug}`} className="px-3 py-1.5 rounded-full text-sm text-gray-600 hover:text-coral-500 transition-colors" style={{ border: '1px solid #e5e7eb' }}>
                  {s.name}
                </Link>
              ))}
            </div>
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-coral-500 hover:text-coral-600 transition-colors mt-4 font-medium">
              Read more on our blog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>

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
