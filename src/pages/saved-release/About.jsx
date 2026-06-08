import React, { useState, useRef, useEffect } from 'react';
import Nav from '../../components/Nav';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { GraduationCap, ArrowLeft, ArrowRight, User, ChevronDown, Check } from 'lucide-react';

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true });
  const [c, setC] = useState(0);
  useEffect(() => { if (!v) return; const n = parseInt(target.replace(/[^0-9]/g,'')); let cur = 0; const t = setInterval(() => { cur += n/30; if (cur >= n) { setC(n); clearInterval(t); } else setC(Math.floor(cur)); }, 45); return () => clearInterval(t); }, [v, target]);
  return <span ref={ref}>{v ? c + suffix : "0" + suffix}</span>;
}

export default function About() {
  const [expandedMember, setExpandedMember] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const story = [
    { label: "Where we started", title: "We had amazing teachers. Most students don't.", text: "We were lucky. Our teachers sat with us for hours, read our personal statements five or six times, and pushed us to rewrite until it was good. We got into LSE, Cambridge, Imperial, KCL, and Warwick partly because of that. But we watched friends at other schools get told \"looks good\" and sent off with nothing. Same grades, completely different outcomes.", stat: "5", statLabel: "universities we got into" },
    { label: "What we realised", title: "The help that works costs thousands.", text: "Private consultants charge £6,000 to £35,000. Tutors charge £50 to £100 an hour. The students who can afford it get coached on exactly what to write and say. Everyone else figures it out alone. We thought that was genuinely unfair. We still do.", stat: "£6,000+", statLabel: "what consultants charge" },
    { label: "What we did about it", title: "We built the mentor we wished everyone had.", text: "Five first-years, no investors, no marketing department. We took everything from our own applications and trained an AI on it. It coaches you the way our teachers coached us. Hard questions, honest feedback, real depth. Available to everyone, for less than a tenner a month. Or for free.", stat: "£9.99", statLabel: "per month, with a free tier" },
  ];

  const team = [
    { name: "Shrey Verma", uni: "LSE", course: "PPE", role: "Founder, Social Sciences & Humanities Lead", photo: "/team-shrey.jpg", photoScale: 1.25, photoPos: "25% 25%",
      subjects: "PPE, Politics, International Relations, History, Law, Philosophy & Humanities",
      bio: "Founded myunioffer ai after going through the UCAS process and realising how expensive and inaccessible good application coaching is. Leads the Humanities specialist coaching, training the AI with real application insights from the LSE admissions process.",
      contribution: "Built the entire AI coaching system from scratch. Curated the Humanities interview questions and personal statement database. Covers all humanities and social science applications." },
    { name: "Pavan Kovuri", uni: "Warwick", course: "Economics", role: "Economics & Business Lead", photo: "/team-pavan.jpg", photoPos: "0 0%",
      subjects: "Economics, Business, Finance, Accounting, Management",
      bio: "Studying Economics at the University of Warwick. Went through the application process for one of the most competitive economics programmes in the country.",
      contribution: "Leads the Economics and Business coaching, training the AI on economics-specific interview questions, quantitative reasoning, and how to demonstrate genuine analytical thinking in personal statements." },
    { name: "Suhas Parsaboina", uni: "KCL", course: "Medicine", role: "Medicine Lead", photo: "/team-suhas.jpg", photoScale: 5.3, photoPos: "52% 52%",
      subjects: "Medicine, Dentistry, Veterinary, Nursing, Biomedical Sciences",
      bio: "Studying Medicine at King's College London. Successfully navigated one of the most competitive application processes in the country, including MMIs, UCAT, and the medical school personal statement.",
      contribution: "Leads the Medicine coaching, training the AI with real MMI questions, medical school personal statement structures, and the specific qualities medical schools look for in applicants." },
    { name: "Girish Radhakrishnan", uni: "Imperial", course: "Chemical Engineering", role: "Engineering & Sciences Lead", photo: "/team-girish.jpg", photoScale: 2, photoPos: "center 10%",
      subjects: "Chemical Engineering, Engineering, Chemistry, Physics, Natural Sciences",
      bio: "Studying Chemical Engineering at Imperial College London. Experienced the Imperial application process first-hand including their specific interview and admissions testing requirements.",
      contribution: "Leads the Engineering coaching, training the AI on Imperial-style application approaches, engineering personal statements, technical interviews, and how to demonstrate practical problem-solving ability." },
    { name: "Adyan Shahid", uni: "Cambridge", course: "Computer Science", role: "CS & Maths Lead",
      subjects: "Computer Science, Mathematics, Data Science, Statistics",
      bio: "Reading Computer Science at the University of Cambridge. Went through one of the most rigorous admissions processes in the country, including the Cambridge interview system.",
      contribution: "Leads the CS and Maths coaching, training the AI on Cambridge-style interview questions, logical reasoning approaches, and how to demonstrate genuine intellectual curiosity in personal statements for quantitative subjects." },
  ];

  const item = story[activeTab];

  return (
    <div style={{ background: bg, color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <Nav active="Team" />

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "4rem 2rem" }}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h1 style={{ ...D, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 1rem" }}>
            We got in. Now we're helping <span style={{ color: coral }}>you get in.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 600, margin: "0 auto", lineHeight: 1.65 }}>
            We remember the sleepless nights rewriting personal statements, the anxiety before interviews. Most students don't have access to the guidance that makes the difference. So we built it.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "3rem", padding: "1.5rem 0", marginBottom: "4rem", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
          {[{ n: "5", s: "", l: "universities" }, { n: "5", s: "", l: "subject areas" }, { n: "1000", s: "+", l: "resources" }, { n: "120", s: "+", l: "students signed up" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ ...D, fontSize: "1.8rem", fontWeight: 800, color: coral }}><Counter target={s.n} suffix={s.s} /></div>
              <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: "0.15rem" }}>{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* Story tabs */}
        <section style={{ marginBottom: "5rem" }}>
          <h2 style={{ ...D, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, textAlign: "center", marginBottom: "2rem" }}>Our story</h2>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginBottom: "2.5rem" }}>
            {story.map((s, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{
                padding: "0.55rem 1.2rem", borderRadius: "0.6rem", fontSize: "0.82rem", fontWeight: 700, border: "none", cursor: "pointer",
                background: activeTab === i ? `linear-gradient(135deg, ${coral}, #e74d32)` : "rgba(255,255,255,0.04)",
                color: activeTab === i ? "#fff" : "rgba(255,255,255,0.4)",
                transition: "all 0.25s"
              }}>{s.label}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
              style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: coral, marginBottom: "0.8rem" }}>{item.label}</p>
                <h3 style={{ ...D, fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.15, marginBottom: "1rem" }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontSize: "0.92rem" }}>{item.text}</p>
              </div>
              <div style={{ flexShrink: 0, width: 180 }}>
                <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${border}`, textAlign: "center" }}>
                  <motion.div key={`s${activeTab}`} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}
                    style={{ ...D, fontSize: "2.2rem", fontWeight: 800, color: coral, marginBottom: "0.3rem" }}>{item.stat}</motion.div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>{item.statLabel}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "2rem" }}>
            {story.map((_, i) => (
              <button key={i} onClick={() => setActiveTab(i)} style={{ height: 4, borderRadius: 2, border: "none", cursor: "pointer", transition: "all 0.25s",
                width: activeTab === i ? 28 : 10,
                background: activeTab === i ? coral : "rgba(255,255,255,0.1)"
              }} />
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: "4rem" }}>
          <h2 style={{ ...D, fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, textAlign: "center", marginBottom: "0.5rem" }}>Meet the team</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", fontSize: "0.88rem", marginBottom: "1.5rem" }}>Every specialist is a real student who successfully applied in that field.</p>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {['LSE', 'Warwick', 'KCL', 'Cambridge', 'Imperial'].map((uni, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i }}
                style={{ padding: "0.4rem 0.9rem", borderRadius: "0.5rem", background: "rgba(255,255,255,0.03)", border: `1px solid ${border}`, fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                {uni}
              </motion.span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {team.map((m, i) => {
              const open = expandedMember === i;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setExpandedMember(open ? null : i)}
                  style={{ borderRadius: "1rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${open ? coral + '30' : border}`, cursor: "pointer", overflow: "hidden", transition: "border-color 0.25s" }}>
                  <div style={{ padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                    {m.photo ? (
                      <div style={{ width: 52, height: 52, borderRadius: "0.7rem", overflow: "hidden", border: `2px solid ${coral}30`, flexShrink: 0 }}>
                        <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${m.photoScale || 1})`, transformOrigin: m.photoPos || "top center", objectPosition: m.photoPos || "top center" }} />
                      </div>
                    ) : (
                      <div style={{ width: 52, height: 52, borderRadius: "0.7rem", border: `2px solid ${coral}30`, background: `${coral}08`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <User size={24} color={coral} />
                      </div>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
                        <span style={{ ...D, fontSize: "1rem", fontWeight: 800 }}>{m.name}</span>
                        <span style={{ padding: "0.15rem 0.5rem", borderRadius: 100, background: `${coral}10`, border: `1px solid ${coral}25`, fontSize: "0.68rem", fontWeight: 700, color: coral }}>{m.uni}</span>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: coral, fontWeight: 600, marginTop: "0.1rem" }}>{m.role}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: "0.1rem" }}>{m.course}</div>
                    </div>
                    <ChevronDown size={18} color="rgba(255,255,255,0.2)" style={{ transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "rotate(0)", flexShrink: 0 }} />
                  </div>

                  <AnimatePresence>
                    {open && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                        <div style={{ padding: "0 1.5rem 1.5rem" }}>
                          <div style={{ height: 1, background: border, marginBottom: "1.2rem" }} />
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                            <div>
                              <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: coral, marginBottom: "0.5rem" }}>About</p>
                              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{m.bio}</p>
                            </div>
                            <div>
                              <p style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: coral, marginBottom: "0.5rem" }}>Contribution to the AI</p>
                              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{m.contribution}</p>
                            </div>
                          </div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "1rem" }}>
                            {m.subjects.split(', ').map((s, j) => (
                              <motion.span key={j} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: j * 0.03 }}
                                style={{ padding: "0.25rem 0.6rem", borderRadius: 100, background: `${coral}0c`, color: coral, fontSize: "0.7rem", fontWeight: 600 }}>{s}</motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ borderRadius: "1.1rem", padding: "3.5rem 2rem", textAlign: "center", background: `linear-gradient(135deg, ${coral}, #e74d32)`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.08), transparent 50%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ ...D, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", marginBottom: "0.6rem" }}>Ready to get started?</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem", fontSize: "0.95rem" }}>Join students from across the UK preparing with AI coaching.</p>
            <Link to="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "#fff", color: "#e74d32", padding: "0.8rem 1.6rem", borderRadius: "0.65rem", fontSize: "0.95rem", fontWeight: 700, textDecoration: "none" }}>Start Free <ArrowRight size={15} /></Link>
          </div>
        </motion.div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.82rem", marginTop: "2rem" }}>
          Questions? <a href="mailto:support@myunioffer.com" style={{ color: coral, fontWeight: 600, textDecoration: "none" }}>support@myunioffer.com</a>
        </p>
      </main>
    </div>
  );
}
