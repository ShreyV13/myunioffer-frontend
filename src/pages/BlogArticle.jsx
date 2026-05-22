import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { articles } from '../blog/articles';

function setMetaTags(article) {
  document.title = article.metaTitle;

  const setOrCreate = (attr, key, value) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
    el.setAttribute('content', value);
  };

  setOrCreate('name', 'description', article.description);
  setOrCreate('property', 'og:title', article.metaTitle);
  setOrCreate('property', 'og:description', article.description);
  setOrCreate('property', 'og:url', `https://myunioffer.com/blog/${article.slug}`);
  setOrCreate('property', 'og:type', 'article');
  setOrCreate('property', 'og:site_name', 'myunioffer ai');
  setOrCreate('name', 'twitter:card', 'summary');
  setOrCreate('name', 'twitter:title', article.metaTitle);
  setOrCreate('name', 'twitter:description', article.description);
}

function setJsonLd(article) {
  let el = document.querySelector('script[data-blog-jsonld]');
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.setAttribute('data-blog-jsonld', 'true'); document.head.appendChild(el); }
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "author": { "@type": "Person", "name": article.author },
    "publisher": { "@type": "Organization", "name": "myunioffer ai", "url": "https://myunioffer.com" },
    "datePublished": article.date,
    "url": `https://myunioffer.com/blog/${article.slug}`,
  });
}

function InlineCTA() {
  return (
    <span className="text-coral-500 font-medium">
      If you want personalised advice for your subject, <Link to="/signup" className="underline hover:text-coral-600 transition-colors">try the free AI coach</Link>. It takes 30 seconds.
    </span>
  );
}

function MidArticleCTA() {
  return (
    <div className="my-10 rounded-xl px-6 py-5 bg-gray-50 border border-gray-100">
      <p className="text-gray-900 font-display font-semibold text-base mb-2">This is exactly what the AI coach does</p>
      <p className="text-gray-500 text-sm mb-4">It asks you the questions that draw out your thinking, stores your reflections as you go, and when you're ready to write, the Draft Builder turns everything into a structured first draft. You never lose a thought.</p>
      <Link to="/signup" className="inline-flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, #f96a50, #e74d32)' }}>
        Try it free <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

function EndArticleCTA() {
  return (
    <div className="mt-12 mb-8 rounded-2xl px-6 py-8 md:px-8 md:py-10 text-center" style={{ background: 'linear-gradient(135deg, #f96a50, #e74d32)' }}>
      <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Get personalised advice for your application</h3>
      <p className="text-white/85 text-sm md:text-base mb-2 max-w-md mx-auto">Tell the AI coach what subject you're applying for and get a specific plan for your summer. Free, no credit card needed.</p>
      <p className="text-white/60 text-xs mb-6">Built by students at LSE, Cambridge, Imperial, Warwick, and KCL.</p>
      <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-coral-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm md:text-base">
        Start free <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function BlogArticle() {
  const { slug } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) {
      setMetaTags(article);
      setJsonLd(article);
    }
    return () => {
      const jsonLd = document.querySelector('script[data-blog-jsonld]');
      if (jsonLd) jsonLd.remove();
    };
  }, [article]);

  if (!article) return <Navigate to="/blog" />;

  // Split body into paragraphs for CTA insertion
  const sections = article.body.split(/\n(?=## )/);
  const midpoint = article.midCtaAfterSection != null ? article.midCtaAfterSection : Math.floor(sections.length / 2);

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

      {/* Article */}
      <article className="px-6 pt-10 pb-16">
        <div className="max-w-[700px] mx-auto">
          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-coral-500 transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> All articles
          </Link>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 leading-tight mb-4">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold" style={{ background: '#f96a50' }}>{article.authorInitials}</div>
                <span className="text-sm text-gray-600 font-medium">{article.author}</span>
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-400">{article.authorUni}</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-400">{article.date}</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-400">{article.readTime}</span>
            </div>
          </motion.div>

          {/* Body with CTAs inserted */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="blog-article-body">
            {sections.map((section, i) => (
              <React.Fragment key={i}>
                <ReactMarkdown components={{
                  h2: ({children}) => <h2 className="text-xl md:text-2xl font-display font-bold text-gray-900 mt-10 mb-4">{children}</h2>,
                  p: ({children, node}) => {
                    // Inject inline CTA after the 2nd paragraph of the first section
                    const isFirstSection = i === 0;
                    const pIndex = node?.position?.start?.line;
                    return <p className="text-gray-700 mb-5 leading-[1.75]" style={{ fontSize: '17px' }}>{children}</p>;
                  },
                  strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  ul: ({children}) => <ul className="my-4 pl-5 list-disc text-gray-700 space-y-2" style={{ fontSize: '17px', lineHeight: 1.75 }}>{children}</ul>,
                  ol: ({children}) => <ol className="my-4 pl-5 list-decimal text-gray-700 space-y-2" style={{ fontSize: '17px', lineHeight: 1.75 }}>{children}</ol>,
                  li: ({children}) => <li>{children}</li>,
                }}>{section}</ReactMarkdown>

                {/* Inline CTA after first section */}
                {i === 0 && (
                  <p className="text-gray-700 mb-5 leading-[1.75]" style={{ fontSize: '17px' }}>
                    <InlineCTA />
                  </p>
                )}

                {/* Mid-article CTA at halfway point */}
                {i === midpoint && <MidArticleCTA />}
              </React.Fragment>
            ))}

            {/* End CTA */}
            <EndArticleCTA />
          </motion.div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-coral-500 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
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
