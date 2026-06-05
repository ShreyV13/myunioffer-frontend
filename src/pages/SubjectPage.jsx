import { useRef, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { subjects } from "../subjects/subjectData";
const subjectData = Object.fromEntries(subjects.map(s => [s.slug, s]));
import { ArrowRight, ArrowUpRight, BookOpen, AlertTriangle, Sparkles, ChevronRight } from "lucide-react";

/* ── Fonts ────────────────────────────────────────────────────────────────── */
const D = { fontFamily: "'Outfit', sans-serif" };
const S = { fontFamily: "'DM Sans', sans-serif" };
const coral = "#f96a50";
const coralEnd = "#e74d32";

/* ── Reveal on scroll ─────────────────────────────────────────────────────── */
function Reveal({ children, style = {}, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref} style={style} className={className}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

/* ── Staggered word heading (Elrune style) ────────────────────────────────── */
function WordReveal({ words, style = {}, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const arr = typeof words === "string" ? words.split(" ") : words;
  return (
    <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.32em", ...style }}>
      {arr.map((w, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            style={{ display: "inline-block", color: color || "inherit" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >{w}</motion.span>
        </span>
      ))}
    </div>
  );
}

/* ── Section label (small caps) ───────────────────────────────────────────── */
function SectionLabel({ text, color: c = "rgba(255,255,255,0.2)" }) {
  return (
    <p style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: c, margin: "0 0 1.2rem" }}>{text}</p>
  );
}

/* ── Magnetic button ──────────────────────────────────────────────────────── */
function Magnetic({ children, onClick, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy, ...style }}
      onMouseMove={(e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
    >{children}</motion.button>
  );
}

/* ── Horizontal rule with label ───────────────────────────────────────────── */
function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "0 2rem", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
      {label && <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.12)" }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
    </div>
  );
}

/* ── Pull quote ───────────────────────────────────────────────────────────── */
function PullQuote({ text }) {
  return (
    <Reveal>
      <blockquote style={{
        margin: "3rem 0", padding: "2rem 0 2rem 2rem",
        borderLeft: `3px solid ${coral}`,
        ...D, fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", fontWeight: 500,
        lineHeight: 1.5, color: "rgba(255,255,255,0.72)", fontStyle: "italic",
      }}>
        {text}
      </blockquote>
    </Reveal>
  );
}

/* ── Counter pill ─────────────────────────────────────────────────────────── */
function CountPill({ n, total }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "0.3rem",
      fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em",
      color: coral, background: `${coral}12`, border: `1px solid ${coral}25`,
      padding: "0.25rem 0.65rem", borderRadius: 100,
    }}>{n}/{total}</span>
  );
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function SubjectPage() {
  const { subject: slug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const data = subjectData[slug];
  useEffect(() => { if (!data) navigate("/subjects"); window.scrollTo(0, 0); }, [slug]);
  if (!data) return null;

  const { name, heroHook, metaDesc, color = coral, accentColor = coralEnd, whatTutorsLookFor, reading = [], supercurriculars: supercurricularsRaw, commonMistakes: commonMistakesRaw = [], howWeHelp: howWeHelpRaw, relatedSubjects = [] } = data;

  /* Parse paragraphs from long-form text */
  const tutorParas = whatTutorsLookFor ? whatTutorsLookFor.split(/\n\n+/).filter(p => p.trim().length > 0) : [];
  const superParas = typeof supercurricularsRaw === "string" ? supercurricularsRaw.split(/\n\n+/).filter(p => p.trim().length > 0) : [];
  const mistakes = Array.isArray(commonMistakesRaw) ? commonMistakesRaw : [];
  const helpText = typeof howWeHelpRaw === "string" ? howWeHelpRaw : "";

  /* reading uses desc not note */
  const books = reading.map(r => ({ ...r, note: r.desc || r.note || "" }));

  /* Extract a pull quote: longest sentence from first tutor paragraph */
  const pullQuote = tutorParas.length > 0
    ? tutorParas[0].split(/(?<=[.!?])\s+/).reduce((a, b) => b.length > a.length ? b : a, "")
    : "";

  return (
    <div style={{ background: "#0a0a0a", color: "#fff", overflowX: "hidden", ...S }}>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(10,10,10,0.8)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.28)" }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>myunioffer ai</Link>
            <ChevronRight size={11} />
            <Link to="/subjects" style={{ color: "inherit", textDecoration: "none" }}>Subjects</Link>
            <ChevronRight size={11} />
            <span style={{ color: "#fff", fontWeight: 600 }}>{name}</span>
          </div>
          <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{
            background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, border: "none", cursor: "pointer",
            color: "#fff", fontWeight: 700, fontSize: "0.78rem", padding: "0.45rem 1.2rem", borderRadius: "0.6rem",
          }}>Start free</Magnetic>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden" }}>
        {/* Background orbs */}
        <motion.div style={{ y: heroY, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "-20%", right: "-15%", width: "65vw", height: "65vw", maxWidth: 850, maxHeight: 850, borderRadius: "50%", background: color, filter: "blur(140px)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.04, 0.09, 0.04] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            style={{ position: "absolute", bottom: "10%", left: "-12%", width: "45vw", height: "45vw", maxWidth: 600, maxHeight: 600, borderRadius: "50%", background: accentColor, filter: "blur(120px)" }}
          />
          {/* Grid overlay */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity, position: "relative", zIndex: 10, maxWidth: 1400, margin: "0 auto", padding: "0 2rem", width: "100%", paddingBottom: "6rem" }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.9rem", borderRadius: 100, border: `1px solid ${color}40`, background: `${color}0a`, marginBottom: "3rem" }}
          >
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "block" }} />
            <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color }}>UCAS {name} Guide</span>
          </motion.div>

          {/* Title: each word on its own line for large screens */}
          <h1 style={{ ...D, fontSize: "clamp(4.5rem, 13vw, 12rem)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em", margin: "0 0 3rem" }}>
            <WordReveal words={name} delay={0.15} />
          </h1>

          {/* Subtitle + CTA row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "rgba(255,255,255,0.42)", lineHeight: 1.6, maxWidth: 520, margin: 0 }}
            >{heroHook}</motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}
            >
              <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, border: "none", cursor: "pointer",
                color: "#fff", fontWeight: 700, fontSize: "0.95rem", padding: "0.9rem 1.7rem", borderRadius: "0.8rem",
                boxShadow: `0 0 60px ${coral}30`,
              }}>Start free coaching <ArrowRight size={16} /></Magnetic>
              <Magnetic onClick={() => navigate("/rate-my-ps")} style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer",
                color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.95rem", padding: "0.9rem 1.7rem", borderRadius: "0.8rem",
              }}>Rate my PS</Magnetic>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)" }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2))" }} />
        </motion.div>
      </section>

      <Divider />

      {/* ── What tutors look for (editorial, sticky label) ────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "8rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Left: sticky heading */}
          <div style={{ position: "sticky", top: 80 }}>
            <Reveal>
              <SectionLabel text="What tutors actually look for" />
              <WordReveal
                words="The real criteria."
                style={{ ...D, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem" }}
              />
              <WordReveal
                words="Not the prospectus version."
                delay={0.15}
                color={coral}
                style={{ ...D, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }}
              />
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, maxWidth: 380, marginTop: "1.5rem" }}>
                Based on real admissions feedback and what students who got offers actually did differently.
              </p>
            </Reveal>
          </div>

          {/* Right: flowing paragraphs */}
          <div>
            {tutorParas.map((para, i) => (
              <div key={i}>
                {i === 1 && pullQuote && <PullQuote text={pullQuote} />}
                <Reveal delay={i * 0.05}>
                  <p style={{
                    fontSize: "1.02rem", color: "rgba(255,255,255,0.52)", lineHeight: 1.85,
                    marginBottom: "2rem",
                  }}>{para}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mid CTA banner ────────────────────────────────────────────── */}
      <section style={{ padding: "0 2rem", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div style={{
            borderRadius: "1.2rem", padding: "3rem 2.5rem",
            background: `linear-gradient(135deg, ${coral}, ${coralEnd})`,
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 50%, rgba(255,255,255,0.12), transparent 55%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 0.5rem" }}>Free to start</p>
              <h3 style={{ ...D, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, margin: 0 }}>Get coached on your {name} statement</h3>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", position: "relative", zIndex: 1 }}>
              <button onClick={() => navigate(`/signup?subject=${slug}`)} style={{ background: "#fff", color: coralEnd, fontWeight: 700, fontSize: "0.9rem", padding: "0.75rem 1.5rem", borderRadius: "0.65rem", border: "none", cursor: "pointer" }}>Start free</button>
              <button onClick={() => navigate("/rate-my-ps")} style={{ background: "transparent", color: "#fff", fontWeight: 600, fontSize: "0.9rem", padding: "0.75rem 1.5rem", borderRadius: "0.65rem", border: "1px solid rgba(255,255,255,0.35)", cursor: "pointer" }}>Rate my PS</button>
            </div>
          </div>
        </Reveal>
      </section>

      <Divider label="Reading" />

      {/* ── Reading list ──────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "8rem 2rem" }}>
        <Reveal style={{ marginBottom: "4rem" }}>
          <SectionLabel text="Recommended reading" />
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
            <WordReveal words="What to read before you apply." style={{ ...D, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1 }} />
            <CountPill n={books.length} total={books.length} />
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {books.map((book, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <motion.div
                whileHover={{ x: 10, borderColor: `${coral}40` }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{
                  display: "grid", gridTemplateColumns: "3.5rem 1fr", gap: "1.2rem",
                  padding: "1.5rem 1.6rem", borderRadius: "1rem",
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span style={{ ...D, fontSize: "1.8rem", fontWeight: 800, color: `${coral}30`, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem" }}>{book.title}</span>
                    {book.author && <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.28)" }}>{book.author}</span>}
                  </div>
                  <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, margin: 0 }}>{book.note}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <Divider label="Supercurriculars" />

      {/* ── Supercurriculars (editorial prose) ─────────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "8rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          {/* Right side: heading (swapped for visual variety) */}
          <div>
            {superParas.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p style={{
                  fontSize: "1.02rem", color: "rgba(255,255,255,0.52)", lineHeight: 1.85,
                  marginBottom: "2rem",
                }}>{para}</p>
              </Reveal>
            ))}
          </div>
          <div style={{ position: "sticky", top: 80 }}>
            <Reveal>
              <SectionLabel text="Supercurriculars" />
              <WordReveal
                words="What to do outside school."
                style={{ ...D, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "0.5rem" }}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, maxWidth: 380, marginTop: "1.5rem" }}>
                Pick 2-3 and go deep. Admissions tutors can tell the difference between a checkbox and genuine engagement.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{
                display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "2rem",
                background: "transparent", border: `1px solid ${coral}50`, cursor: "pointer",
                color: coral, fontWeight: 700, fontSize: "0.85rem", padding: "0.7rem 1.3rem", borderRadius: "0.7rem",
              }}>Get personalised advice <ArrowUpRight size={14} /></Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider label="Mistakes" />

      {/* ── Common mistakes (large numbers, editorial) ─────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "8rem 2rem" }}>
        <Reveal style={{ marginBottom: "5rem", textAlign: "center" }}>
          <SectionLabel text="Common mistakes" color={`${coral}80`} />
          <WordReveal
            words="What kills most applications."
            color={coral}
            style={{ ...D, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, justifyContent: "center" }}
          />
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))", gap: "1.5rem" }}>
          {mistakes.map((m, i) => {
            const text = typeof m === "string" ? m : m.description || m.title || "";
            return (
              <Reveal key={i} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -6, borderColor: `${coral}35` }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{
                    display: "grid", gridTemplateColumns: "4.5rem 1fr", gap: "0.8rem",
                    padding: "2rem", borderRadius: "1.2rem",
                    background: `${coral}06`, border: `1px solid ${coral}12`,
                    height: "100%",
                  }}
                >
                  <span style={{ ...D, fontSize: "3.5rem", fontWeight: 800, lineHeight: 1, color: `${coral}20` }}>{String(i + 1).padStart(2, "0")}</span>
                  <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, margin: 0, alignSelf: "center" }}>{text}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Divider label="How we help" />

      {/* ── How we help (with mini chat preview) ──────────────────────── */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "8rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <Reveal>
              <SectionLabel text="How myunioffer ai helps" />
              <WordReveal
                words={`Your ${name} coach.`}
                style={{ ...D, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "2rem" }}
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.85, marginBottom: "2.5rem" }}>{helpText}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
                <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{
                  display: "inline-flex", alignItems: "center", gap: "0.45rem",
                  background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, border: "none", cursor: "pointer",
                  color: "#fff", fontWeight: 700, fontSize: "0.9rem", padding: "0.85rem 1.6rem", borderRadius: "0.75rem",
                  boxShadow: `0 0 50px ${coral}28`,
                }}>Start free coaching <ArrowRight size={15} /></Magnetic>
                <Magnetic onClick={() => navigate("/rate-my-ps")} style={{
                  background: "transparent", border: "1px solid rgba(255,255,255,0.12)", cursor: "pointer",
                  color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: "0.9rem", padding: "0.85rem 1.6rem", borderRadius: "0.75rem",
                }}>Try Rate My PS free</Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Mini chat preview (Xtract-inspired embedded UI) */}
          <Reveal delay={0.15}>
            <div style={{
              borderRadius: "1.2rem", overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{ padding: "0.7rem 1rem", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ display: "flex", gap: "0.3rem" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                </div>
                <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.25)", fontWeight: 600 }}>myunioffer ai</span>
                <span style={{ marginLeft: "auto", fontSize: "0.6rem", padding: "0.15rem 0.45rem", borderRadius: 4, background: `${coral}18`, color: coral, fontWeight: 700 }}>{name}</span>
              </div>
              <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {/* Student message */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: coral, borderRadius: "1rem 1rem 0.3rem 1rem", padding: "0.65rem 0.9rem", maxWidth: "75%", fontSize: "0.82rem", lineHeight: 1.5 }}>
                    I'm applying for {name} but I'm not sure what to write about.
                  </div>
                </div>
                {/* AI response */}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1rem 1rem 1rem 0.3rem", padding: "0.65rem 0.9rem", maxWidth: "80%", fontSize: "0.82rem", lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
                    That's normal at this stage. Let's start with what you've done so far. Have you had any experiences, reading, or conversations about {name.toLowerCase()} that genuinely made you think?
                  </div>
                </div>
                {/* Student */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ background: coral, borderRadius: "1rem 1rem 0.3rem 1rem", padding: "0.65rem 0.9rem", maxWidth: "75%", fontSize: "0.82rem", lineHeight: 1.5 }}>
                    I did some work experience and I've been reading a bit...
                  </div>
                </div>
                {/* AI */}
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "1rem 1rem 1rem 0.3rem", padding: "0.65rem 0.9rem", maxWidth: "80%", fontSize: "0.82rem", lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
                    Good. Tell me about one specific moment during work experience that surprised you or changed how you think about the field.
                  </div>
                </div>
                {/* Typing indicator */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ background: `${coral}60`, borderRadius: "1rem", padding: "0.5rem 0.8rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}
                  >...</motion.div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related subjects ──────────────────────────────────────────── */}
      {relatedSubjects.length > 0 && (
        <section style={{ padding: "2rem 2rem 4rem", maxWidth: 1400, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <Reveal style={{ marginBottom: "1.2rem" }}>
            <h3 style={{ ...D, fontWeight: 700, fontSize: "1rem", margin: 0, color: "rgba(255,255,255,0.4)" }}>Explore other subjects</h3>
          </Reveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {relatedSubjects.map((s, i) => (
              <Reveal key={s} delay={i * 0.03}>
                <Link to={`/subjects/${s}`} style={{ textDecoration: "none" }}>
                  <motion.div whileHover={{ scale: 1.06, borderColor: "rgba(255,255,255,0.25)" }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    style={{ padding: "0.45rem 0.95rem", borderRadius: "0.55rem", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)", fontSize: "0.82rem", fontWeight: 600, textTransform: "capitalize" }}>
                    {s.replace(/-/g, " ")}
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding: "10rem 2rem 8rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "65vw", height: "65vw", maxWidth: 750, maxHeight: 750, borderRadius: "50%", background: color, filter: "blur(110px)", pointerEvents: "none" }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <SectionLabel text="Get started" color={`${coral}60`} />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 style={{ ...D, fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, margin: "0 0 1.5rem" }}>
              Your {name} application starts here.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.35)", marginBottom: "2.5rem" }}>Free coaching. No card required. Start today.</p>
            <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, border: "none", cursor: "pointer",
              color: "#fff", fontWeight: 700, fontSize: "1.05rem", padding: "1.05rem 2.2rem", borderRadius: "0.85rem",
              boxShadow: `0 0 70px ${coral}35`,
            }}>Start free coaching <ArrowRight size={17} /></Magnetic>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
