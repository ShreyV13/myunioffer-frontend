import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { subjects } from '../subjects/subjectData';

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";
const mutedText = "rgba(255,255,255,0.52)";

export default function Subjects() {
  useEffect(() => {
    document.title = 'UCAS subject guides — personalised advice for every course | myunioffer';
    const setOrCreate = (attr, key, value) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    setOrCreate('name', 'description', 'Free UCAS application advice for every subject. What admissions tutors look for, recommended reading, supercurriculars, and common mistakes.');
  }, []);

  return (
    <div style={{ background: bg, color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${border}`, background: "rgba(19,19,22,0.8)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.55rem", textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.55rem", display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={18} color="#fff" /></div>
            <span style={{ ...D, fontSize: "1.1rem", fontWeight: 700 }}>myuni<span style={{ color: coral }}>offer</span> <span style={{ color: "rgba(255,255,255,0.35)" }}>ai</span></span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Link to="/subjects" style={{ color: coral, textDecoration: "none", fontSize: "0.82rem", fontWeight: 600 }}>Subjects</Link>
            <Link to="/blog" style={{ color: mutedText, textDecoration: "none", fontSize: "0.82rem", fontWeight: 500 }}>Blog</Link>
            <Link to="/pricing" style={{ color: mutedText, textDecoration: "none", fontSize: "0.82rem", fontWeight: 500 }}>Pricing</Link>
            <Link to="/login" style={{ color: mutedText, textDecoration: "none", fontSize: "0.82rem", fontWeight: 500 }}>Log In</Link>
            <Link to="/signup" style={{ background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.5rem 1.3rem", borderRadius: "0.55rem", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
          </div>
        </div>
      </nav>

      <section style={{ padding: "5rem 2rem 2rem", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: coral, marginBottom: "1rem" }}>Subject guides</p>
          <h1 style={{ ...D, fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1rem" }}>UCAS advice for <span style={{ color: coral }}>your subject</span></h1>
          <p style={{ color: mutedText, fontSize: "0.95rem", maxWidth: 500, margin: "0 auto" }}>What admissions tutors look for, what to read, what supercurriculars matter, and the mistakes everyone else makes.</p>
        </motion.div>
      </section>

      <section style={{ padding: "2rem 2rem 5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.7rem" }}>
          {subjects.map((s, i) => (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.025 }}>
              <Link to={`/subjects/${s.slug}`} style={{ display: "block", padding: "1.2rem 1.4rem", borderRadius: "0.8rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${border}`, textDecoration: "none", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${coral}30`}
                onMouseLeave={e => e.currentTarget.style.borderColor = border}>
                <p style={{ ...D, fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.3rem" }}>{s.name}</p>
                <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.heroHook}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ padding: "4rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ borderRadius: "1.1rem", padding: "3.5rem 2rem", textAlign: "center", background: `linear-gradient(135deg, ${coral}, #e74d32)`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.08), transparent 50%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ ...D, fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>Don't see your subject?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>The AI coach covers every UCAS subject. Tell it what you're applying for.</p>
            <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fff", color: "#e74d32", padding: "0.7rem 1.4rem", borderRadius: "0.6rem", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none" }}>Start free <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: `1px solid ${border}`, padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.12)" }}>© 2026 myunioffer ai</div>
      </footer>
    </div>
  );
}
