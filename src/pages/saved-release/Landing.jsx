import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView, useMotionTemplate } from 'framer-motion';
import { GraduationCap, ArrowRight, ChevronDown, Play, Check } from 'lucide-react';

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const bg = "#151519";
const cardBg = "rgba(255,255,255,0.025)";
const border = "rgba(255,255,255,0.06)";
const mutedText = "rgba(255,255,255,0.42)";
const bodyText = "rgba(255,255,255,0.55)";

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >{children}</motion.div>
  );
}

/* ── LineReveal: Framer-style line-by-line mask reveal ────────────── */
/* Each line slides up from behind an overflow clip as one unit.     */
/* Reusable across all pages as the standard heading animation.      */
function LineReveal({ lines, delay = 0, show = true, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const shouldAnimate = show && inView;
  return (
    <div ref={ref} style={style}>
      {lines.map((line, i) => {
        const text = typeof line === "string" ? line : line.text;
        const color = typeof line === "string" ? undefined : line.color;
        return (
          <div key={i} style={{ overflow: "hidden", paddingBottom: "0.05em" }}>
            <motion.div
              initial={{ y: "100%" }}
              animate={shouldAnimate ? { y: "0%" } : {}}
              transition={{ duration: 0.7, delay: delay + i * 0.12, ease: [0.4, 0, 0.15, 1] }}
              style={{ color: color || "inherit" }}
            >{text}</motion.div>
          </div>
        );
      })}
    </div>
  );
}

/* ── SectionReveal: heading + subtitle with mask reveal ──────────── */
function SectionReveal({ label, heading, subtitle, center = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} style={{ textAlign: center ? "center" : "left", marginBottom: "5rem" }}>
      {label && (
        <div style={{ overflow: "hidden" }}>
          <motion.div initial={{ y: "100%" }} animate={inView ? { y: "0%" } : {}} transition={{ duration: 0.5, ease: [0.4, 0, 0.15, 1] }}>
            <Label text={label} />
          </motion.div>
        </div>
      )}
      <div style={{ overflow: "hidden" }}>
        <motion.h2
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.4, 0, 0.15, 1] }}
          style={{ ...D, fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 1.2rem" }}
        >{heading}</motion.h2>
      </div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: mutedText, fontSize: "0.95rem", maxWidth: 520, margin: center ? "0 auto" : 0 }}
        >{subtitle}</motion.p>
      )}
    </div>
  );
}

function ScaleImg({ src, alt }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return (
    <motion.div ref={ref} style={{ y }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img src={src} alt={alt}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", display: "block", borderRadius: "0.9rem", border: `1px solid ${border}`, boxShadow: `0 25px 60px rgba(0,0,0,0.35)` }}
      />
    </motion.div>
  );
}

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    let current = 0;
    const timer = setInterval(() => { current += num / 35; if (current >= num) { setCount(num); clearInterval(timer); } else setCount(Math.floor(current)); }, 40);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return <span ref={ref}>{isInView ? count + suffix : "0" + suffix}</span>;
}

function Label({ text }) {
  return <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase", color: coral, marginBottom: "1rem" }}>{text}</p>;
}

/* ── Circle reveal transition (Mythic-style) ─────────────────────── */
function CircleReveal({ children, bgColor = bg }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end 60%"] });
  const radius = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const clipPath = useMotionTemplate`circle(${radius}% at 50% 50%)`;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.div style={{ clipPath, background: bgColor }}>
        {children}
      </motion.div>
    </div>
  );
}

export default function Landing() {
  const [introPhase, setIntroPhase] = useState(0); // 0=centered, 1=moving, 2=settled
  const loaded = introPhase >= 1;
  const [openFaq, setOpenFaq] = useState(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [navLogoPos, setNavLogoPos] = useState({ top: 11, left: 32 });

  useEffect(() => {
    // Calculate where the nav logo sits
    const calcPos = () => {
      const left = Math.max(32, (window.innerWidth - 1300) / 2 + 32);
      setNavLogoPos({ top: 11, left });
    };
    calcPos();
    window.addEventListener("resize", calcPos);
    const t1 = setTimeout(() => setIntroPhase(1), 900);
    const t2 = setTimeout(() => setIntroPhase(2), 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); window.removeEventListener("resize", calcPos); };
  }, []);

  /* ── Hero scroll-away ──────────────────────────────────────────── */
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(heroProgress, [0, 0.5], [0, -80]);

  const faqs = [
    { q: "Will the AI write my personal statement for me?", a: "No. Our AI asks you questions, challenges your thinking, and helps you figure out what to say. It coaches instead of writing." },
    { q: "How is this different from ChatGPT?", a: "ChatGPT gives generic advice and tries to write for you. Our AI is built specifically for UK university applications and coaches you to find your own voice." },
    { q: "What subjects do you cover?", a: "Everything. Medicine, Dentistry, Law, Economics, Engineering, Computer Science, Maths, Physics, History, English, PPE, Psychology, Architecture, and more." },
    { q: "What is Rate My PS?", a: "Paste your personal statement and get a score out of 100 with a breakdown across five categories. It flags what works and what sounds generic." },
    { q: "What does the Draft Builder do?", a: "Arrange your material into three UCAS sections. The AI generates a structured scaffold. You fill in the gaps in your own voice." },
    { q: "Can I cancel?", a: "Yes, anytime. You keep access until the end of your billing period." },
    { q: "Who built this?", a: "First-year students from LSE, KCL, Cambridge, Imperial, and Warwick who went through UCAS months ago." },
    { q: "Is there a free option?", a: "Yes. Daily coaching sessions, forever. No credit card needed." },
  ];

  const testimonials = [
    { text: "Its great, it helped so much with figuring out the next steps like for what supercurriculars I should be doing next by building on what ive done so far" },
    { text: "And its also not just a yes-man like chatgpt, its critical of my plans" },
    { text: "i had no idea what supercurriculars to do but it gave me unique suggestions after I gave what i had already done. Like it based it off my interests" },
    { text: "I actually have a plan after using it even tho i had nothing figured out before" },
    { text: "The ai site responds within a few seconds, the quality of information that it responds with is helpful, if you ask the right questions the site guides you step by step" },
    { text: "the site is rlly good!!" },
  ];

  const subjects = ['Medicine','Economics','Computer Science','Law','Engineering','PPE','Maths','Physics','History','Psychology','Dentistry','Architecture','English','Chemistry','Business','Biology','Veterinary','Nursing','Politics','Philosophy','Geography','Sociology','Modern Languages','Music','Data Science'];

  return (
    <div style={{ background: bg, color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Dark overlay (fades out when logo starts moving) ────────── */}
      {(
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: introPhase >= 1 ? 0 : 1 }}
          transition={{ duration: 0.7 }}
          style={{ position: "fixed", inset: 0, zIndex: 99, background: bg, pointerEvents: "none" }}
        />
      )}

      {/* ── Moving logo (travels from center to nav position) ─────── */}
      {(
        <motion.div
          initial={{ top: "calc(50vh - 32px)", left: "calc(50vw - 80px)", scale: 2.2, opacity: 0 }}
          animate={
            introPhase === 0
              ? { top: "calc(50vh - 32px)", left: "calc(50vw - 80px)", scale: 2.2, opacity: 1 }
              : { top: navLogoPos.top, left: navLogoPos.left, scale: 1, opacity: introPhase >= 2 ? 0 : 1 }
          }
          transition={{ duration: introPhase === 0 ? 0.4 : 0.85, ease: [0.4, 0, 0.15, 1] }}
          style={{ position: "fixed", zIndex: 101, display: "flex", alignItems: "center", gap: "0.55rem", pointerEvents: "none" }}
        >
          <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.55rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap size={18} color="#fff" />
          </div>
          <span style={{ ...D, fontSize: "1.1rem", fontWeight: 700 }}>myuni<span style={{ color: coral }}>offer</span> <span style={{ color: "rgba(255,255,255,0.35)" }}>ai</span></span>
        </motion.div>
      )}

      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(21,21,25,0.82)", backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${border}`,
        }}
      >
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.55rem", textDecoration: "none", opacity: introPhase >= 2 ? 1 : 0, transition: "opacity 0.3s" }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.55rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={18} color="#fff" />
            </div>
            <span style={{ ...D, fontSize: "1.1rem", fontWeight: 700 }}>myuni<span style={{ color: coral }}>offer</span> <span style={{ color: "rgba(255,255,255,0.35)" }}>ai</span></span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <Link to="/pricing" style={{ color: mutedText, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Pricing</Link>
            <Link to="/rate-my-ps" style={{ color: mutedText, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Rate My PS</Link>
            <Link to="/login" style={{ color: mutedText, textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }}>Log In</Link>
            <Link to="/signup" style={{ background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.5rem 1.3rem", borderRadius: "0.55rem", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero (sticky, scrolls away) ───────────────────────────────── */}
      <div ref={heroRef} style={{ position: "relative" }}>
        <section style={{ position: "sticky", top: 56, height: "calc(100vh - 56px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          {/* Background elements */}
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.035, 0.06, 0.035] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "-25%", right: "-12%", width: "60vw", height: "60vw", maxWidth: 800, maxHeight: 800, borderRadius: "50%", background: coral, filter: "blur(120px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none" }} />

          <motion.div style={{ opacity: heroOpacity, y: heroY, textAlign: "center", padding: "0 2rem", maxWidth: 1100, position: "relative", zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", padding: "0.3rem 0.85rem", borderRadius: 100, background: `${coral}0c`, border: `1px solid ${coral}20`, marginBottom: "2.5rem" }}>
              <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "block" }} />
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>Built by students from LSE, Cambridge, Imperial, KCL & Warwick</span>
            </motion.div>

            <LineReveal
              lines={[
                { text: "Get into your" },
                { text: "dream university.", color: coral },
              ]}
              delay={0.3}
              show={loaded}
              style={{ ...D, fontSize: "clamp(3rem, 8vw, 6.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "1.8rem" }}
            />

            <motion.p initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ delay: 0.8, duration: 0.6 }}
              style={{ fontSize: "clamp(1rem, 1.6vw, 1.15rem)", color: mutedText, lineHeight: 1.65, maxWidth: 560, margin: "0 auto 0.8rem" }}>
              AI coaching, PS scoring, draft building, and interview prep. Built by students who just got in.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}
              style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.25)", marginBottom: "2.5rem" }}>
              Tailored to your subject. Available 24/7.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.95 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", justifyContent: "center" }}>
              <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.85rem 1.8rem", borderRadius: "0.7rem", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 30px ${coral}25` }}>
                Start Free <ArrowRight size={16} />
              </Link>
              <a href="#demo" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "transparent", color: "rgba(255,255,255,0.55)", padding: "0.85rem 1.8rem", borderRadius: "0.7rem", fontSize: "1rem", fontWeight: 600, textDecoration: "none", border: `1px solid ${border}` }}>
                Watch Demo
              </a>
            </motion.div>
          </motion.div>
        </section>
        {/* Extra scroll space so hero can fade */}
        <div style={{ height: "40vh" }} />
      </div>

      {/* ── Subject marquee ───────────────────────────────────────────── */}
      <div style={{ overflow: "hidden", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, padding: "0.75rem 0", background: bg, position: "relative", zIndex: 2 }}>
        <motion.div style={{ display: "flex", gap: "1.5rem", whiteSpace: "nowrap" }} animate={{ x: ["0%", "-33.333%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
          {[...Array(3)].map((_, rep) => (
            <div key={rep} style={{ display: "flex", gap: "1.5rem", flexShrink: 0 }}>
              {subjects.map((s, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.18)" }}>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: coral, display: "block", opacity: 0.5 }} />{s}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Video showcase ────────────────────────────────────────────── */}
      <section id="demo" style={{ padding: "7rem 2rem", maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <Reveal>
          <div style={{ position: "relative", borderRadius: "1rem", overflow: "hidden", border: `1px solid ${border}`, boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 80px ${coral}06` }}>
            {!videoPlaying ? (
              <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setVideoPlaying(true)}>
                <img src="/screenshots/rate-my-ps.png" alt="Rate My PS" style={{ width: "100%", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div whileHover={{ scale: 1.1 }}
                    animate={{ boxShadow: [`0 0 0px ${coral}00`, `0 0 50px ${coral}50`, `0 0 0px ${coral}00`] }}
                    transition={{ boxShadow: { duration: 2, repeat: Infinity }, scale: { type: "spring", stiffness: 300 } }}
                    style={{ width: 85, height: 85, borderRadius: "50%", background: `linear-gradient(135deg, ${coral}, #e74d32)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Play size={32} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
                  </motion.div>
                </div>
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>Watch the full walkthrough</span>
                </div>
              </div>
            ) : (
              <iframe src="https://www.youtube.com/embed/tTKcgx3UlGw?rel=0&modestbranding=1&autoplay=1" style={{ width: "100%", aspectRatio: "16/9", border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            )}
          </div>
        </Reveal>
      </section>

      {/* ── Problem (circle reveal transition) ────────────────────────── */}
      <CircleReveal bgColor="#1c1c22">
        <section style={{ padding: "7rem 2rem 8rem", maxWidth: 1200, margin: "0 auto" }}>
          <SectionReveal label="The problem" heading="The application process is broken." subtitle='Everyone tells you to "be yourself" and "show passion." Nobody actually shows you how.' />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem" }}>
            {[
              { label: "The generic AI problem", text: 'Copy-paste an AI-written PS and admissions tutors will spot it instantly. Same structure, same phrases, zero personality.', response: "We coach your thinking instead." },
              { label: "The cost barrier", text: "Private consultants charge £6,000 to £35,000. Tutors charge £50 to £100 an hour. Most families can't afford that.", response: "We start at £9.99/month." },
              { label: "The gap", text: '"Show passion." "Be yourself." None of it tells you what a Medicine tutor wants to read or how a Cambridge interviewer picks who gets an offer.', response: "Our AI knows your subject." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, borderColor: `${coral}25` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ padding: "2.2rem", borderRadius: "1.1rem", background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.05)`, height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: 3, width: "100%", background: `linear-gradient(90deg, ${coral}, #e74d32)`, borderRadius: 2, marginBottom: "1.5rem", transformOrigin: "left" }} />
                  <p style={{ fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: coral, marginBottom: "0.8rem" }}>{item.label}</p>
                  <p style={{ fontSize: "0.92rem", color: bodyText, lineHeight: 1.65, flex: 1, marginBottom: "1.2rem" }}>{item.text}</p>
                  <p style={{ fontSize: "0.82rem", color: coral, fontWeight: 600 }}>{item.response}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>
      </CircleReveal>

      {/* ── Product showcase ──────────────────────────────────────────── */}
      <section style={{ padding: "6rem 2rem 8rem", maxWidth: 1300, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionReveal label="How it works" heading="Everything you need to stand out" subtitle="Not just a chatbot. A complete application toolkit." />

        {[
          { num: "01", label: "AI Coach", title: <>A mentor that asks the hard questions <span style={{ color: coral }}>so your statement sounds like you.</span></>, desc: "Our AI never writes a word for you. It asks the questions that help you figure out what you actually want to say, tailored to what your subject demands.", img: "/screenshots/chatbot.png", alt: "AI coaching", flip: false },
          { num: "02", label: "Rate My PS", title: <>Know exactly where you stand. <span style={{ color: coral }}>In 10 seconds.</span></>, desc: "Paste your personal statement and get a score out of 100 with a breakdown across five categories. It flags what works and what sounds generic.", img: "/screenshots/rate-my-ps.png", alt: "PS scoring", flip: true },
          { num: "03", label: "Draft Builder", title: <>From conversations <span style={{ color: coral }}>to first draft.</span></>, desc: "Drag your strongest material into three UCAS sections. The AI generates a structured scaffold. You fill the gaps in your own voice.", img: "/screenshots/draft-builder.png", alt: "Draft Builder", flip: false },
        ].map((f, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: f.flip ? "8fr 4fr" : "4fr 8fr", gap: "3rem", alignItems: "center", marginBottom: i < 2 ? "10rem" : 0 }}>
            {f.flip && <ScaleImg src={f.img} alt={f.alt} />}
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.2rem" }}>
                <span style={{ ...D, fontSize: "3.5rem", fontWeight: 800, color: `${coral}12`, lineHeight: 1 }}>{f.num}</span>
                <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: coral }}>{f.label}</span>
              </div>
              <h3 style={{ ...D, fontSize: "clamp(1.6rem, 2.8vw, 2.3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 1.2rem" }}>{f.title}</h3>
              <p style={{ fontSize: "0.95rem", color: bodyText, lineHeight: 1.75 }}>{f.desc}</p>
            </Reveal>
            {!f.flip && <ScaleImg src={f.img} alt={f.alt} />}
          </div>
        ))}
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 2rem", display: "flex", justifyContent: "center", gap: "5rem", flexWrap: "wrap" }}>
          {[{ num: "1000", suffix: "+", label: "real resources" }, { num: "24", suffix: "/7", label: "always available" }, { num: "99", suffix: "%", label: "cheaper than tutoring" }].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{ textAlign: "center" }}>
                <div style={{ ...D, fontSize: "2rem", fontWeight: 800, color: coral }}><Counter target={s.num} suffix={s.suffix} /></div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.22)", marginTop: "0.2rem" }}>{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Before / After ────────────────────────────────────────────── */}
      <section style={{ padding: "8rem 2rem", maxWidth: 900, margin: "0 auto" }}>
        <SectionReveal label="What coaching looks like" heading="Same student. Same experience." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
          <Reveal>
            <div style={{ padding: "2rem", borderRadius: "1rem", background: cardBg, border: `2px solid rgba(255,255,255,0.06)`, position: "relative", height: "100%" }}>
              <span style={{ position: "absolute", top: -11, left: 18, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)", fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: 100 }}>Before</span>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.75, fontStyle: "italic", marginTop: "0.8rem" }}>"I have always been passionate about medicine since a young age. Seeing my grandmother suffer in hospital made me realise I wanted to help people and make a difference in the world."</p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div style={{ padding: "2rem", borderRadius: "1rem", background: cardBg, border: `2px solid ${coral}20`, position: "relative", height: "100%" }}>
              <span style={{ position: "absolute", top: -11, left: 18, background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: 100 }}>After coaching</span>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginTop: "0.8rem" }}>"When my grandmother was in hospital, the geriatrician knelt beside her bed and switched to simpler words because her English was fading. The junior doctor behind her was scribbling notes. I remember thinking those two people were doing completely different jobs in the same room, and I wanted to understand why."</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2}><p style={{ textAlign: "center", fontSize: "0.78rem", color: "rgba(255,255,255,0.18)", marginTop: "1.5rem" }}>One sounds like everyone else. The other sounds like them.</p></Reveal>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section style={{ padding: "4rem 0 8rem" }}>
        <div style={{ padding: "0 2rem" }}>
          <SectionReveal heading="What students are saying" subtitle="Real feedback. Unedited." />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", overflow: "hidden", padding: "0 2rem" }}>
          <motion.div style={{ display: "flex", gap: "1rem" }} animate={{ x: [0, -1500] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
            {[...Array(3)].map((_, rep) => (
              <div key={rep} style={{ display: "flex", gap: "1rem", flexShrink: 0 }}>
                {testimonials.map((t, i) => (
                  <div key={i} style={{ width: 300, flexShrink: 0, padding: "1.6rem", borderRadius: "1rem", background: cardBg, border: `1px solid ${border}` }}>
                    <span style={{ fontSize: "2rem", lineHeight: 1, color: `${coral}35`, ...D }}>"</span>
                    <p style={{ fontSize: "0.84rem", color: bodyText, lineHeight: 1.65, marginBottom: "1rem" }}>{t.text}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: coral, display: "block", opacity: 0.5 }} />
                      <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", fontWeight: 600 }}>Early user</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────── */}
      <section style={{ padding: "4rem 2rem 8rem", maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <Label text="Pricing" />
          <h2 style={{ ...D, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1rem" }}>Start free. Upgrade when you're ready.</h2>
          <p style={{ color: mutedText, fontSize: "0.95rem", maxWidth: 520, margin: "0 auto 2.5rem" }}>The free tier gives you daily coaching sessions, forever. Premium is £9.99/month for full access.</p>
          <Link to="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.85rem 1.8rem", borderRadius: "0.7rem", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none", boxShadow: `0 4px 30px ${coral}20` }}>See Plans <ArrowRight size={15} /></Link>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            {["Free tier included", "No credit card needed", "Cancel anytime"].map((t, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}><Check size={13} color="#22c55e" />{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ padding: "4rem 2rem 8rem", maxWidth: 800, margin: "0 auto" }}>
        <SectionReveal heading="Frequently asked questions" />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <motion.div whileHover={{ borderColor: `${coral}20` }} style={{ borderRadius: "0.8rem", background: cardBg, border: `1px solid ${border}`, overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "1.2rem 1.4rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "transparent", border: "none", cursor: "pointer", color: "#fff", fontSize: "0.92rem", fontWeight: 600, textAlign: "left" }}>
                  {faq.q}
                  <ChevronDown size={16} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0, marginLeft: "1rem", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }} />
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.3 }} style={{ padding: "0 1.4rem 1.2rem", color: bodyText, fontSize: "0.88rem", lineHeight: 1.7 }}>{faq.a}</motion.div>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section style={{ padding: "0 2rem 5rem", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ borderRadius: "1.3rem", padding: "5rem 3rem", textAlign: "center", background: `linear-gradient(135deg, ${coral}, #e74d32)`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.08), transparent 50%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06), transparent 50%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ ...D, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, margin: "0 0 0.8rem" }}>Your application is too important to wing it.</h2>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.75)", marginBottom: "2rem" }}>Start coaching your personal statement today. It's free.</p>
              <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fff", color: "#e74d32", padding: "0.9rem 2rem", borderRadius: "0.7rem", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>Get Started Free <ArrowRight size={16} /></Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "3rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.45rem", display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={15} color="#fff" /></div>
            <span style={{ ...D, fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>myuni<span style={{ color: coral }}>offer</span> <span style={{ color: "rgba(255,255,255,0.3)" }}>ai</span></span>
          </Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
            {[{ l: "Subjects", t: "/subjects" }, { l: "Blog", t: "/blog" }, { l: "Pricing", t: "/pricing" }, { l: "Team", t: "/about" }, { l: "Privacy", t: "/privacy" }, { l: "Terms", t: "/terms" }].map((link, i) => (
              <Link key={i} to={link.t} style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.8rem", textDecoration: "none", fontWeight: 500 }}>{link.l}</Link>
            ))}
            <a href="mailto:support@myunioffer.com" style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.8rem", textDecoration: "none", fontWeight: 500 }}>Support</a>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "1.5rem auto 0", textAlign: "center", fontSize: "0.72rem", color: "rgba(255,255,255,0.12)" }}>© 2026 myunioffer ai</div>
      </footer>
    </div>
  );
}
