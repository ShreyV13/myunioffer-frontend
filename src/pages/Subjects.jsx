import Nav from '../components/Nav';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, ArrowRight, ArrowUpRight } from 'lucide-react';
import { subjects } from '../subjects/subjectData';

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";
const mutedText = "rgba(255,255,255,0.52)";

function SubjectRow({ subject, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link to={`/subjects/${subject.slug}`} style={{ textDecoration: "none", display: "block" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ padding: "1.1rem 0", borderBottom: `1px solid ${border}`, position: "relative", overflow: "hidden" }}>
          {/* Hover background glow */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg, ${coral}06, transparent 60%)`, pointerEvents: "none" }}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem" }}>
              {/* Number */}
              <motion.span
                animate={{ color: hovered ? coral : "rgba(255,255,255,0.08)" }}
                transition={{ duration: 0.25 }}
                style={{ ...D, fontSize: "0.75rem", fontWeight: 700, width: "1.8rem", flexShrink: 0 }}
              >{String(index + 1).padStart(2, "0")}</motion.span>

              {/* Subject name */}
              <motion.span
                animate={{ x: hovered ? 12 : 0, color: hovered ? "#fff" : "rgba(255,255,255,0.75)" }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ ...D, fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 700 }}
              >{subject.name}</motion.span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
              {/* Description (visible on hover) */}
              <motion.span
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", maxWidth: 300, textAlign: "right", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}
              >{subject.heroHook}</motion.span>

              {/* Arrow */}
              <motion.div
                animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0, rotate: hovered ? 0 : -45 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArrowUpRight size={18} color={coral} />
              </motion.div>
            </div>
          </div>

          {/* Animated coral underline */}
          <motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: coral, transformOrigin: "left" }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

function LineReveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} style={style}>
      <div style={{ overflow: "hidden" }}>
        <motion.div
          initial={{ y: "105%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.15, 1] }}
        >{children}</motion.div>
      </div>
    </div>
  );
}

export default function Subjects() {
  const navigate = useNavigate();

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
      {/* Nav */}
      <Nav active="Subjects" />

      {/* Hero */}
      <section style={{ padding: "6rem 2rem 3rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)", width: "60vw", height: "60vw", maxWidth: 700, borderRadius: "50%", background: coral, opacity: 0.03, filter: "blur(120px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <LineReveal style={{ ...D, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: "0.2rem" }}>
            Pick your subject.
          </LineReveal>
          <LineReveal delay={0.1} style={{ ...D, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, color: coral, marginBottom: "2rem" }}>
            Get the playbook.
          </LineReveal>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
            style={{ color: mutedText, fontSize: "1.05rem", maxWidth: 500, lineHeight: 1.6 }}>
            What admissions tutors look for, what to read, what supercurriculars matter, and the mistakes that kill applications.
          </motion.p>
        </div>
      </section>

      {/* Subject list */}
      <section style={{ padding: "2rem 2rem 6rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ borderTop: `1px solid ${border}` }}>
            {subjects.filter(s => ["medicine","law","economics","computer-science","engineering","ppe","mathematics"].includes(s.slug)).map((s, i) => (
              <SubjectRow key={s.slug} subject={s} index={i} />
            ))}
          </div>

          {/* Coming soon */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ padding: "2rem 0", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.82rem", marginBottom: "0.4rem" }}>More subjects coming soon</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4rem" }}>
              {["History", "Physics", "Psychology", "Architecture", "English", "Dentistry", "Chemistry"].map((s, i) => (
                <span key={i} style={{ padding: "0.3rem 0.7rem", borderRadius: "0.4rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${border}`, fontSize: "0.72rem", color: "rgba(255,255,255,0.18)" }}>{s}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 2rem 5rem", maxWidth: 1000, margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ borderRadius: "1.1rem", padding: "3.5rem 2rem", textAlign: "center", background: `linear-gradient(135deg, ${coral}, #e74d32)`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.08), transparent 50%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ ...D, fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#fff", marginBottom: "0.5rem" }}>Don't see your subject?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>The AI coach covers every UCAS subject. Tell it what you're applying for.</p>
            <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fff", color: "#e74d32", padding: "0.75rem 1.5rem", borderRadius: "0.65rem", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none" }}>Start free <ArrowRight size={15} /></Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.45rem", display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={15} color="#fff" /></div>
            <span style={{ ...D, fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>myuni<span style={{ color: coral }}>offer</span> <span style={{ color: "rgba(255,255,255,0.3)" }}>ai</span></span>
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {[{l:"Subjects",t:"/subjects"},{l:"Blog",t:"/blog"},{l:"Pricing",t:"/pricing"},{l:"Team",t:"/about"},{l:"Privacy",t:"/privacy"},{l:"Terms",t:"/terms"}].map((lk,i) => <Link key={i} to={lk.t} style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.8rem", textDecoration: "none", fontWeight: 500 }}>{lk.l}</Link>)}
            <a href="mailto:support@myunioffer.com" style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.8rem", textDecoration: "none", fontWeight: 500 }}>Support</a>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "1.5rem auto 0", textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.12)" }}>© 2026 myunioffer ai</div>
      </footer>
    </div>
  );
}
