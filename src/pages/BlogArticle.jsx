import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { articles } from '../blog/articles';

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";
const mutedText = "rgba(255,255,255,0.52)";

function setMetaTags(a) {
  document.title = a.metaTitle;
  const set = (attr, key, val) => { let el = document.querySelector(`meta[${attr}="${key}"]`); if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); } el.setAttribute('content', val); };
  set('name','description',a.description); set('property','og:title',a.metaTitle); set('property','og:description',a.description);
  set('property','og:url',`https://myunioffer.com/blog/${a.slug}`); set('property','og:type','article'); set('property','og:site_name','myunioffer ai');
  set('name','twitter:card','summary'); set('name','twitter:title',a.metaTitle); set('name','twitter:description',a.description);
}

function setJsonLd(a) {
  let el = document.querySelector('script[data-blog-jsonld]');
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.setAttribute('data-blog-jsonld','true'); document.head.appendChild(el); }
  el.textContent = JSON.stringify({"@context":"https://schema.org","@type":"Article","headline":a.title,"description":a.description,"author":{"@type":"Person","name":a.author},"publisher":{"@type":"Organization","name":"myunioffer ai","url":"https://myunioffer.com"},"datePublished":a.date,"url":`https://myunioffer.com/blog/${a.slug}`});
}

function InlineCTA() {
  return <span style={{ color: coral, fontWeight: 500 }}>If you want personalised advice for your subject, <Link to="/signup" style={{ color: coral, textDecoration: "underline" }}>try the free AI coach</Link>. It takes 30 seconds.</span>;
}

function MidArticleCTA() {
  return (
    <div style={{ margin: "2.5rem 0", padding: "1.5rem", borderRadius: "0.8rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${border}` }}>
      <p style={{ ...D, fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>This is exactly what the AI coach does</p>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.65, marginBottom: "1rem" }}>It asks you the questions that draw out your thinking, stores your reflections, and when you're ready to write, the Draft Builder turns everything into a structured first draft.</p>
      <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.5rem 1.2rem", borderRadius: "0.5rem", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none" }}>Try it free <ArrowRight size={13} /></Link>
    </div>
  );
}

function EndArticleCTA() {
  return (
    <div style={{ margin: "3rem 0 2rem", borderRadius: "1rem", padding: "2.5rem 2rem", textAlign: "center", background: `linear-gradient(135deg, ${coral}, #e74d32)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.08), transparent 50%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3 style={{ ...D, fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: "0.4rem" }}>Get personalised advice for your application</h3>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.88rem", maxWidth: 420, margin: "0 auto 0.3rem" }}>Tell the AI coach what subject you're applying for and get a specific plan. Free, no credit card.</p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", marginBottom: "1.2rem" }}>Built by students at LSE, Cambridge, Imperial, Warwick, and KCL.</p>
        <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fff", color: "#e74d32", padding: "0.7rem 1.4rem", borderRadius: "0.6rem", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none" }}>Start free <ArrowRight size={14} /></Link>
      </div>
    </div>
  );
}

export default function BlogArticle() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  useEffect(() => {
    if (article) { setMetaTags(article); setJsonLd(article); }
    return () => { const j = document.querySelector('script[data-blog-jsonld]'); if (j) j.remove(); };
  }, [article]);

  if (!article) return <Navigate to="/blog" />;

  const sections = article.body.split(/\n(?=## )/);
  const midpoint = article.midCtaAfterSection != null ? article.midCtaAfterSection : Math.floor(sections.length / 2);

  return (
    <div style={{ background: bg, color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Nav active="Blog" />

      <article style={{ padding: "3rem 2rem 5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", marginBottom: "2rem" }}><ArrowLeft size={14} /> All articles</Link>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 style={{ ...D, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "1rem" }}>{article.title}</h1>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem", marginBottom: "2.5rem" }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: coral, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 700, color: "#fff" }}>{article.authorInitials}</div>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>{article.author}</span>
              <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.3)" }}>{article.authorUni}</span>
              <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.3)" }}>{article.date}</span>
              <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.3)" }}>{article.readTime}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {sections.map((section, i) => (
              <React.Fragment key={i}>
                <ReactMarkdown components={{
                  h2: ({children}) => <h2 style={{ ...D, fontSize: "1.3rem", fontWeight: 800, marginTop: "2.5rem", marginBottom: "1rem" }}>{children}</h2>,
                  p: ({children}) => <p style={{ color: "rgba(255,255,255,0.68)", marginBottom: "1.2rem", lineHeight: 1.75, fontSize: "1rem" }}>{children}</p>,
                  strong: ({children}) => <strong style={{ fontWeight: 600, color: "#fff" }}>{children}</strong>,
                  ul: ({children}) => <ul style={{ margin: "1rem 0", paddingLeft: "1.3rem", listStyleType: "disc", color: "rgba(255,255,255,0.68)", lineHeight: 1.75, fontSize: "1rem" }}>{children}</ul>,
                  ol: ({children}) => <ol style={{ margin: "1rem 0", paddingLeft: "1.3rem", listStyleType: "decimal", color: "rgba(255,255,255,0.68)", lineHeight: 1.75, fontSize: "1rem" }}>{children}</ol>,
                  li: ({children}) => <li style={{ marginBottom: "0.5rem" }}>{children}</li>,
                }}>{section}</ReactMarkdown>
                {i === 0 && <p style={{ color: "rgba(255,255,255,0.68)", marginBottom: "1.2rem", lineHeight: 1.75, fontSize: "1rem" }}><InlineCTA /></p>}
                {i === midpoint && <MidArticleCTA />}
              </React.Fragment>
            ))}
            <EndArticleCTA />
          </motion.div>

          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", marginTop: "2rem" }}><ArrowLeft size={14} /> Back to all articles</Link>
        </div>
      </article>

      <footer style={{ borderTop: `1px solid ${border}`, padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.12)" }}>© 2026 myunioffer ai</div>
      </footer>
    </div>
  );
}
