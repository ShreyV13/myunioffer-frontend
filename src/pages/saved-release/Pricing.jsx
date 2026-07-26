import React, { useState, useRef, useEffect } from 'react';
import Nav from '../../components/Nav';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { GraduationCap, Check, ArrowLeft, ArrowRight, Crown, CalendarCheck, Clock, MessageSquare, Shield, X, Brain, PenTool, BarChart3 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://uniprep-backend-dtlq.onrender.com';
const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const bg = "#131316";
const cardBg = "rgba(255,255,255,0.025)";
const border = "rgba(255,255,255,0.06)";

export default function Pricing() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(null);
  const [searchParams] = useSearchParams();
  const fromPage = searchParams.get('from');
  const isPremium = userProfile?.plan === 'premium';

  function Counter({ target, suffix = "" }) {
    const ref = useRef(null);
    const v = useInView(ref, { once: true });
    const [c, setC] = useState(0);
    useEffect(() => { if (!v) return; const n = parseInt(target.replace(/[^0-9]/g,'')); let cur = 0; const t = setInterval(() => { cur += n/30; if (cur >= n) { setC(n); clearInterval(t); } else setC(Math.floor(cur)); }, 40); return () => clearInterval(t); }, [v, target]);
    return <span ref={ref}>{v ? c + suffix : "0" + suffix}</span>;
  }

  async function handleSubscribe() {
    if (!currentUser) { window.location.href = '/signup?redirect=pricing'; return; }
    setLoading('premium');
    try {
      const res = await fetch(`${API_BASE}/create-checkout-session`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.uid, user_email: currentUser.email, plan_id: 'premium',
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}${fromPage ? '&from=' + fromPage : ''}`,
          cancel_url: window.location.href })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) { console.error('Checkout error:', err); }
    setLoading(null);
  }

  return (
    <div style={{ background: bg, color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <Nav active="Pricing" />

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem", position: "relative" }}>
        <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "50vw", height: "50vw", maxWidth: 600, borderRadius: "50%", background: coral, opacity: 0.03, filter: "blur(120px)", pointerEvents: "none" }} />

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
          <h1 style={{ ...D, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "0 0 1rem" }}>
            Don't leave your application <span style={{ color: coral }}>to chance.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 520, margin: "0 auto" }}>
            Thousands of students with perfect grades get rejected every year because their personal statement didn't stand out.
          </p>
        </motion.div>

        {/* Value anchor */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ maxWidth: 600, margin: "0 auto 3rem", borderRadius: "1rem", border: `1px solid ${coral}20`, background: `${coral}06`, padding: "1.8rem", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", marginBottom: "0.4rem" }}>A private admissions tutor costs</p>
          <div style={{ ...D, fontSize: "2.8rem", fontWeight: 800, color: "rgba(255,255,255,0.12)", textDecoration: "line-through", marginBottom: "0.3rem" }}>£200+/month</div>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem" }}>myunioffer ai is <span style={{ color: coral, fontWeight: 700 }}>£9.99/month</span>. Less than £2.50 a week.</p>
        </motion.div>

        {/* Two plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.2rem", maxWidth: 900, margin: "0 auto 5rem" }}>
          {/* Free */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ padding: "2.2rem", borderRadius: "1.1rem", background: cardBg, border: `1px solid ${border}` }}>
            <div style={{ width: 40, height: 40, borderRadius: "0.7rem", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
              <MessageSquare size={20} color="rgba(255,255,255,0.4)" />
            </div>
            <h3 style={{ ...D, fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.3rem" }}>Free</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", marginBottom: "1.2rem" }}>Try the coaching. See if it works.</p>
            <div style={{ marginBottom: "1.5rem" }}>
              <span style={{ ...D, fontSize: "2.5rem", fontWeight: 800 }}>£0</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}> /forever</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
              {['PS + Interview coaching daily', 'Subject-specific AI', 'Rate My PS (score only)', 'Interview coaching'].map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}><Check size={14} color="#22c55e" />{f}</div>
              ))}
              {['Full PS feedback', 'Draft Builder', 'Thinking mode', '1000+ resources'].map((f, j) => (
                <div key={`n${j}`} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.4)" }}><X size={14} color="rgba(255,255,255,0.3)" />{f}</div>
              ))}
            </div>
            <Link to={currentUser ? "/chat" : "/signup"} style={{ display: "block", textAlign: "center", padding: "0.75rem", borderRadius: "0.65rem", background: "rgba(255,255,255,0.06)", color: "#fff", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", border: `1px solid ${border}` }}>
              {currentUser ? 'Continue Free' : 'Sign Up Free'}
            </Link>
          </motion.div>

          {/* Premium */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ padding: "2.2rem", borderRadius: "1.1rem", background: cardBg, border: `2px solid ${coral}40`, position: "relative" }}>
            <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", fontSize: "0.68rem", fontWeight: 700, padding: "0.25rem 0.8rem", borderRadius: 100 }}>Recommended</div>
            <div style={{ width: 40, height: 40, borderRadius: "0.7rem", background: `linear-gradient(135deg, ${coral}, #e74d32)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
              <Crown size={20} color="#fff" />
            </div>
            <h3 style={{ ...D, fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.3rem" }}>Premium</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem", marginBottom: "1.2rem" }}>Everything you need. No limits on access.</p>
            <div style={{ marginBottom: "0.3rem" }}>
              <span style={{ ...D, fontSize: "2.5rem", fontWeight: 800 }}>£9.99</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem" }}> /mo</span>
            </div>
            <p style={{ color: coral, fontSize: "0.68rem", fontWeight: 600, marginBottom: "1.5rem" }}>Less than £2.50/week. Cancel anytime.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
              {['More daily coaching messages', 'PS + Interview coaching', 'Rate My PS with full feedback', 'Draft Builder', 'Thinking mode', '1000+ real resources', 'Priority support', 'Cancel anytime'].map((f, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.65)" }}><Check size={14} color={coral} />{f}</div>
              ))}
            </div>
            {isPremium ? (
              <button disabled style={{ width: "100%", padding: "0.75rem", borderRadius: "0.65rem", background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.3)", fontWeight: 700, fontSize: "0.88rem", border: "none", cursor: "not-allowed" }}>Current Plan</button>
            ) : (
              <button onClick={handleSubscribe} disabled={loading === 'premium'}
                style={{ width: "100%", padding: "0.75rem", borderRadius: "0.65rem", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", fontWeight: 700, fontSize: "0.88rem", border: "none", cursor: "pointer", boxShadow: `0 4px 20px ${coral}20` }}>
                {loading === 'premium' ? 'Loading...' : currentUser ? 'Subscribe Now' : 'Sign Up to Subscribe'}
              </button>
            )}
          </motion.div>
        </div>

        {/* 1-on-1 Sessions */}
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ maxWidth: 900, margin: "0 auto 4rem", padding: "2.5rem", borderRadius: "1.1rem", background: cardBg, border: `1px solid ${border}`, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2rem" }}>
          <div style={{ width: 52, height: 52, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.9rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CalendarCheck size={24} color="#fff" />
          </div>
          <div style={{ flex: 1, minWidth: 250 }}>
            <h3 style={{ ...D, fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.4rem" }}>1-on-1 with a student at a top university</h3>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.6 }}>Get matched with a real student from your degree area. 60-minute PS feedback or mock interview session.</p>
          </div>
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ ...D, fontSize: "2rem", fontWeight: 800, color: coral }}>£29.99</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>per session</div><div style={{ color: "rgba(249,106,80,0.7)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.6rem" }}>Launch pricing. Increasing to £34.99 soon.</div>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeuFh9xiG17oow0iPtCkNAf2w8mzRIp0XsZEqjot-GoOpGnFg/viewform" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-block", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.5rem 1.2rem", borderRadius: "0.5rem", fontSize: "0.8rem", fontWeight: 700, textDecoration: "none" }}>Book a Session</a>
          </div>
        </motion.div>

        {/* Guarantees */}
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {[{ icon: Shield, text: "Cancel anytime" }, { icon: Shield, text: "Secure via Stripe" }, { icon: Clock, text: "Launch pricing" }].map((g, i) => {
            const Icon = g.icon;
            return <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}><Icon size={14} color="#22c55e" />{g.text}</span>;
          })}
        </div>
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", marginBottom: "2rem" }}>
          Not ready? <Link to={currentUser ? "/chat" : "/signup"} style={{ color: coral, fontWeight: 600, textDecoration: "none" }}>Try it free</Link>. No credit card required.
        </p>
      </main>
    </div>
  );
}
