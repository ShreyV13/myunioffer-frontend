import React, { useEffect } from 'react';
import Nav from '../components/Nav';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { articles } from '../blog/articles';

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";
const mutedText = "rgba(255,255,255,0.52)";

export default function Blog() {
  useEffect(() => {
    document.title = 'Blog: UCAS advice from students who just got in | myunioffer';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Practical guides for personal statements, supercurriculars, and interviews.');
    else { const t = document.createElement('meta'); t.name = 'description'; t.content = 'Practical guides for personal statements, supercurriculars, and interviews.'; document.head.appendChild(t); }
  }, []);

  return (
    <div style={{ background: bg, color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <Nav active="Blog" />

      <section style={{ padding: "5rem 2rem 2rem", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: coral, marginBottom: "1rem" }}>myunioffer blog</p>
          <h1 style={{ ...D, fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Advice from students who <span style={{ color: coral }}>just got in</span></h1>
          <p style={{ color: mutedText, maxWidth: 480, margin: "0 auto", fontSize: "0.95rem" }}>Practical guides for personal statements, supercurriculars, and interviews.</p>
        </motion.div>
      </section>

      <section style={{ padding: "2rem 2rem 5rem" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {articles.map((a, i) => (
            <motion.div key={a.slug} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link to={`/blog/${a.slug}`} style={{ display: "block", padding: "1.8rem 0", borderBottom: `1px solid ${border}`, textDecoration: "none", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderBottomColor = `${coral}30`}
                onMouseLeave={e => e.currentTarget.style.borderBottomColor = border}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem" }}>
                  <h2 style={{ ...D, fontSize: "1.1rem", fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{a.title}</h2>
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{a.date}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{a.description}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.6rem" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: coral, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.55rem", fontWeight: 700, color: "#fff" }}>{a.authorInitials}</div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>{a.author}</span>
                  <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>{a.readTime}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${border}`, padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.12)" }}>© 2026 myunioffer ai</div>
      </footer>
    </div>
  );
}
