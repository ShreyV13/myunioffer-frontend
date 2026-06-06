import { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { subjects } from "../subjects/subjectData";
import { ArrowRight, ArrowUpRight, ChevronRight, GraduationCap } from "lucide-react";
const subjectData = Object.fromEntries(subjects.map(s => [s.slug, s]));

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const coralEnd = "#e74d32";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";

function Reveal({ children, style = {}, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} style={style} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
  );
}

function WordReveal({ words, style = {}, color, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const arr = typeof words === "string" ? words.split(" ") : words;
  return (
    <div ref={ref} style={{ display: "flex", flexWrap: "wrap", gap: "0 0.3em", ...style }}>
      {arr.map((w, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span style={{ display: "inline-block", color: color || "inherit" }} initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.55, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
        </span>
      ))}
    </div>
  );
}

function Magnetic({ children, onClick, style }) {
  const ref = useRef(null); const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18 }); const sy = useSpring(y, { stiffness: 260, damping: 18 });
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy, ...style }}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.22); y.set((e.clientY - r.top - r.height / 2) * 0.22); }}
      onMouseLeave={() => { x.set(0); y.set(0); }} onClick={onClick}>{children}</motion.button>
  );
}

function Label({ text }) { return <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: coral, margin: "0 0 1rem" }}>{text}</p>; }
function Line() { return <div style={{ height: 1, background: border, margin: "0 auto", maxWidth: 1400 }} />; }

export default function SubjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.97]);

  const data = subjectData[slug];
  useEffect(() => { if (!data) navigate("/subjects"); window.scrollTo(0, 0); }, [slug]);
  if (!data) return null;

  const { name, heroHook, whatTutorsLookFor, reading = [], supercurriculars: supercurricularsRaw, commonMistakes: commonMistakesRaw = [], howWeHelp: howWeHelpRaw, relatedSubjects = [] } = data;
  const tutorParas = whatTutorsLookFor ? whatTutorsLookFor.split(/\n\n+/).filter(p => p.trim()) : [];
  const superParas = typeof supercurricularsRaw === "string" ? supercurricularsRaw.split(/\n\n+/).filter(p => p.trim()) : [];
  const mistakes = Array.isArray(commonMistakesRaw) ? commonMistakesRaw : [];
  const helpText = typeof howWeHelpRaw === "string" ? howWeHelpRaw : "";
  const books = reading.map(r => ({ ...r, note: r.desc || r.note || "" }));
  const allSentences = tutorParas.join(" ").split(/(?<=[.!?])\s+/);
  const pullQuote = allSentences.filter(s => s.length > 60 && s.length < 200).sort((a, b) => b.length - a.length)[0] || "";

  return (
    <div style={{ background: bg, color: "#fff", overflowX: "hidden", fontFamily: "'DM Sans', sans-serif" }}>

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(19,19,22,0.8)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "inherit", textDecoration: "none" }}>
              <div style={{ width: 24, height: 24, background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, borderRadius: "0.35rem", display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={13} color="#fff" /></div>
              myunioffer ai
            </Link>
            <ChevronRight size={11} />
            <Link to="/subjects" style={{ color: "inherit", textDecoration: "none" }}>Subjects</Link>
            <ChevronRight size={11} />
            <span style={{ color: "#fff", fontWeight: 600 }}>{name}</span>
          </div>
          <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{
            background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, border: "none", cursor: "pointer",
            color: "#fff", fontWeight: 700, fontSize: "0.78rem", padding: "0.45rem 1.2rem", borderRadius: "0.55rem",
          }}>Start free</Magnetic>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={{ minHeight: "90vh", display: "flex", alignItems: "flex-end", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-8%", width: "50vw", height: "50vw", maxWidth: 700, maxHeight: 700, borderRadius: "50%", background: coral, opacity: 0.04, filter: "blur(120px)", pointerEvents: "none" }} />
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, width: "100%", position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto", padding: "0 2rem 5rem" }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.3rem 0.85rem", borderRadius: 100, background: `${coral}0c`, border: `1px solid ${coral}20`, marginBottom: "2.5rem" }}>
            <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: coral, display: "block" }} />
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: coral }}>UCAS {name} Guide</span>
          </motion.div>
          <h1 style={{ ...D, fontSize: "clamp(4rem, 12vw, 11rem)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.045em", margin: "0 0 2.5rem" }}>
            <WordReveal words={name} delay={0.1} />
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "2rem" }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }}
              style={{ fontSize: "clamp(1rem, 1.7vw, 1.2rem)", color: "rgba(255,255,255,0.38)", lineHeight: 1.6, maxWidth: 500, margin: 0 }}>{heroHook}</motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{
                display: "inline-flex", alignItems: "center", gap: "0.45rem",
                background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, border: "none", cursor: "pointer",
                color: "#fff", fontWeight: 700, fontSize: "0.92rem", padding: "0.85rem 1.6rem", borderRadius: "0.75rem", boxShadow: `0 4px 24px ${coral}25`,
              }}>Start free coaching <ArrowRight size={15} /></Magnetic>
              <Magnetic onClick={() => navigate("/rate-my-ps")} style={{
                background: "transparent", border: `1px solid ${border}`, cursor: "pointer",
                color: "rgba(255,255,255,0.45)", fontWeight: 600, fontSize: "0.92rem", padding: "0.85rem 1.6rem", borderRadius: "0.75rem",
              }}>Rate my PS</Magnetic>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <Line />

      {/* What tutors look for */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "7rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div style={{ position: "sticky", top: 76 }}>
            <Reveal><Label text="What tutors actually look for" />
              <h2 style={{ ...D, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, margin: 0 }}>
                The real criteria.<br /><span style={{ color: coral }}>Not the prospectus version.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}><p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, maxWidth: 370, marginTop: "1.4rem" }}>Based on what students who got offers actually did differently.</p></Reveal>
          </div>
          <div>
            {tutorParas.map((para, i) => (
              <div key={i}>
                {i === 1 && pullQuote && (
                  <Reveal><blockquote style={{ margin: "2.5rem 0", padding: "1.8rem 0 1.8rem 1.8rem", borderLeft: `3px solid ${coral}`, ...D, fontSize: "clamp(1.15rem, 2vw, 1.45rem)", fontWeight: 500, lineHeight: 1.5, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>{pullQuote}</blockquote></Reveal>
                )}
                <Reveal delay={i * 0.04}><p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.85, marginBottom: "1.8rem" }}>{para}</p></Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coral CTA strip */}
      <section style={{ padding: "0 2rem", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div style={{ borderRadius: "1.1rem", padding: "2.5rem 2.2rem", background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.2rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 85% 50%, rgba(255,255,255,0.1), transparent 55%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h3 style={{ ...D, fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", fontWeight: 800, color: "#fff", lineHeight: 1.15, margin: 0 }}>Get coached on your {name} statement</h3>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.82rem", margin: "0.3rem 0 0", fontWeight: 500 }}>Free to start. No card required.</p>
            </div>
            <button onClick={() => navigate(`/signup?subject=${slug}`)} style={{ position: "relative", zIndex: 1, background: "#fff", color: coralEnd, fontWeight: 700, fontSize: "0.88rem", padding: "0.7rem 1.4rem", borderRadius: "0.6rem", border: "none", cursor: "pointer" }}>Start free</button>
          </div>
        </Reveal>
      </section>

      <div style={{ padding: "3.5rem 0" }}><Line /></div>

      {/* Reading list */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "3.5rem 2rem 7rem" }}>
        <Reveal style={{ marginBottom: "3.5rem" }}>
          <Label text="Recommended reading" />
          <h2 style={{ ...D, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, margin: 0 }}>What to read before you apply.</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {books.map((book, i) => (
            <Reveal key={i} delay={i * 0.03}>
              <motion.div whileHover={{ x: 8, background: "rgba(255,255,255,0.02)" }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ display: "grid", gridTemplateColumns: "3rem 1fr", gap: "1.2rem", padding: "1.3rem 1.4rem", borderRadius: "0.9rem", border: `1px solid ${border}`, background: "transparent" }}>
                <span style={{ ...D, fontSize: "1.6rem", fontWeight: 800, color: `${coral}25`, lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.45rem", marginBottom: "0.3rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{book.title}</span>
                    {book.author && <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>{book.author}</span>}
                  </div>
                  <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.65, margin: 0 }}>{book.note}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      <Line />

      {/* Supercurriculars */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "7rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            {superParas.map((para, i) => (
              <Reveal key={i} delay={i * 0.04}><p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.85, marginBottom: "1.8rem" }}>{para}</p></Reveal>
            ))}
          </div>
          <div style={{ position: "sticky", top: 76 }}>
            <Reveal><Label text="Supercurriculars" />
              <h2 style={{ ...D, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, margin: 0 }}>What to do outside school.</h2>
            </Reveal>
            <Reveal delay={0.12}><p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.7, maxWidth: 370, marginTop: "1.4rem" }}>Pick 2-3 and go deep. Admissions tutors can tell the difference between a checkbox and genuine engagement.</p></Reveal>
            <Reveal delay={0.2}>
              <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginTop: "1.8rem", background: "transparent", border: `1px solid ${coral}35`, cursor: "pointer", color: coral, fontWeight: 700, fontSize: "0.82rem", padding: "0.65rem 1.2rem", borderRadius: "0.6rem" }}>Get personalised advice <ArrowUpRight size={13} /></Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      <Line />

      {/* Common mistakes */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "7rem 2rem" }}>
        <Reveal style={{ marginBottom: "4rem", textAlign: "center" }}>
          <Label text="Common mistakes" />
          <h2 style={{ ...D, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, margin: 0 }}>
            <span style={{ color: coral }}>What kills</span> most applications.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "1rem" }}>
          {mistakes.map((m, i) => {
            const text = typeof m === "string" ? m : m.description || m.title || "";
            return (
              <Reveal key={i} delay={i * 0.05}>
                <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  style={{ display: "grid", gridTemplateColumns: "4rem 1fr", gap: "0.6rem", padding: "1.8rem", borderRadius: "1rem", background: `${coral}06`, border: `1px solid ${coral}10`, height: "100%" }}>
                  <span style={{ ...D, fontSize: "3rem", fontWeight: 800, lineHeight: 1, color: `${coral}18` }}>{String(i + 1).padStart(2, "0")}</span>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.75, margin: 0, alignSelf: "center" }}>{text}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Line />

      {/* How we help + chat preview */}
      <section style={{ maxWidth: 1400, margin: "0 auto", padding: "7rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <Reveal><Label text="How myunioffer ai helps" />
              <h2 style={{ ...D, fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.02, margin: "0 0 1.8rem" }}>Your {name} coach.</h2>
            </Reveal>
            <Reveal delay={0.08}><p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.85, marginBottom: "2.2rem" }}>{helpText}</p></Reveal>
            <Reveal delay={0.16}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, border: "none", cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: "0.88rem", padding: "0.8rem 1.5rem", borderRadius: "0.7rem", boxShadow: `0 4px 20px ${coral}20` }}>Start free coaching <ArrowRight size={14} /></Magnetic>
                <Magnetic onClick={() => navigate("/rate-my-ps")} style={{ background: "transparent", border: `1px solid ${border}`, cursor: "pointer", color: "rgba(255,255,255,0.42)", fontWeight: 600, fontSize: "0.88rem", padding: "0.8rem 1.5rem", borderRadius: "0.7rem" }}>Try Rate My PS free</Magnetic>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div style={{ borderRadius: "1.1rem", overflow: "hidden", border: `1px solid ${border}`, background: "#1a1a1f", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
              <div style={{ padding: "0.6rem 0.9rem", background: "rgba(255,255,255,0.03)", borderBottom: `1px solid ${border}`, display: "flex", alignItems: "center", gap: "0.45rem" }}>
                <div style={{ display: "flex", gap: "0.25rem" }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: "#ff5f57" }} /><div style={{ width: 7, height: 7, borderRadius: "50%", background: "#febc2e" }} /><div style={{ width: 7, height: 7, borderRadius: "50%", background: "#28c840" }} /></div>
                <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontWeight: 600, marginLeft: "0.3rem" }}>myunioffer ai</span>
                <span style={{ marginLeft: "auto", fontSize: "0.58rem", padding: "0.12rem 0.4rem", borderRadius: 3, background: `${coral}18`, color: coral, fontWeight: 700 }}>{name}</span>
              </div>
              <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.65rem", minHeight: 260 }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ background: coral, borderRadius: "0.9rem 0.9rem 0.25rem 0.9rem", padding: "0.55rem 0.8rem", maxWidth: "72%", fontSize: "0.78rem", lineHeight: 1.5, color: "#fff" }}>I'm applying for {name} but I'm not sure what to write about.</div></div>
                <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "0.9rem 0.9rem 0.9rem 0.25rem", padding: "0.55rem 0.8rem", maxWidth: "78%", fontSize: "0.78rem", lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>That's normal at this stage. Have you had any experiences or reading about {name.toLowerCase()} that genuinely made you think?</div></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}><div style={{ background: coral, borderRadius: "0.9rem 0.9rem 0.25rem 0.9rem", padding: "0.55rem 0.8rem", maxWidth: "72%", fontSize: "0.78rem", lineHeight: 1.5, color: "#fff" }}>I did some work experience and I've been reading a bit...</div></div>
                <div style={{ display: "flex", justifyContent: "flex-start" }}><div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "0.9rem 0.9rem 0.9rem 0.25rem", padding: "0.55rem 0.8rem", maxWidth: "78%", fontSize: "0.78rem", lineHeight: 1.5, color: "rgba(255,255,255,0.65)" }}>Tell me about one specific moment during work experience that surprised you or changed how you think.</div></div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}><motion.div animate={{ opacity: [0.3, 0.65, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ background: `${coral}55`, borderRadius: "0.8rem", padding: "0.4rem 0.7rem", fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>...</motion.div></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related subjects */}
      {relatedSubjects.length > 0 && (<><Line /><section style={{ padding: "3rem 2rem 3.5rem", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: "1rem" }}><h3 style={{ ...D, fontWeight: 700, fontSize: "0.95rem", margin: 0, color: "rgba(255,255,255,0.35)" }}>Explore other subjects</h3></Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {relatedSubjects.map((s, i) => (
            <Reveal key={s} delay={i * 0.025}><Link to={`/subjects/${s}`} style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ scale: 1.05, borderColor: `${coral}30` }} transition={{ type: "spring", stiffness: 320, damping: 22 }}
                style={{ padding: "0.4rem 0.85rem", borderRadius: "0.5rem", border: `1px solid ${border}`, color: "rgba(255,255,255,0.42)", fontSize: "0.8rem", fontWeight: 600, textTransform: "capitalize" }}>{s.replace(/-/g, " ")}</motion.div>
            </Link></Reveal>
          ))}
        </div>
      </section></>)}

      {/* Final CTA */}
      <section style={{ padding: "0 2rem", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <div style={{ borderRadius: "1.4rem", padding: "5rem 3rem", textAlign: "center", background: `linear-gradient(135deg, ${coral}, ${coralEnd})`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1), transparent 50%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08), transparent 50%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ ...D, fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1, margin: "0 0 0.8rem" }}>Your {name} application starts here.</h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>Free coaching. No card required.</p>
              <Magnetic onClick={() => navigate(`/signup?subject=${slug}`)} style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "#fff", border: "none", cursor: "pointer", color: coralEnd, fontWeight: 700, fontSize: "1rem", padding: "0.95rem 2rem", borderRadius: "0.75rem" }}>Start free coaching <ArrowRight size={16} /></Magnetic>
            </div>
          </div>
        </Reveal>
      </section>
      <div style={{ height: "4rem" }} />
    </div>
  );
}
