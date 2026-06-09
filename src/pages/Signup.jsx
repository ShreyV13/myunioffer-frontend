import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock, User, ArrowRight, AlertCircle, Check } from 'lucide-react';

const coral = "#f96a50";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";
const D = { fontFamily: "'Outfit', sans-serif" };

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect');

  async function handleSubmit(e) {
    e.preventDefault(); setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      fetch(import.meta.env.VITE_API_URL + '/health').catch(() => {});
      await signup(email, password, name);
      const sub = searchParams.get('subject');
      navigate(redirect === 'pricing' ? '/pricing' : sub ? '/chat?subject=' + encodeURIComponent(sub) : '/chat');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('An account with this email already exists');
      else if (err.code === 'auth/weak-password') setError('Password is too weak');
      else setError('Failed to create account. Please try again.');
    }
    setLoading(false);
  }

  const inputStyle = { width: "100%", padding: "0.75rem 0.75rem 0.75rem 2.8rem", borderRadius: "0.6rem", background: "rgba(255,255,255,0.04)", border: `1px solid ${border}`, color: "#fff", fontSize: "0.88rem", outline: "none" };

  return (
    <div style={{ background: bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "'DM Sans', sans-serif" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ width: "100%", maxWidth: 420 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "2.5rem" }}>
          <div style={{ width: 42, height: 42, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={22} color="#fff" /></div>
          <span style={{ ...D, fontSize: "1.4rem", fontWeight: 700, color: "#fff" }}>myuni<span style={{ color: coral }}>offer</span> <span style={{ color: "rgba(255,255,255,0.35)" }}>ai</span></span>
        </Link>

        <div style={{ padding: "2.2rem", borderRadius: "1.1rem", background: "rgba(255,255,255,0.025)", border: `1px solid ${border}` }}>
          <h1 style={{ ...D, fontSize: "1.5rem", fontWeight: 800, textAlign: "center", marginBottom: "0.3rem", color: "#fff" }}>Create your account</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", fontSize: "0.85rem", marginBottom: "2rem" }}>Start your journey to your dream university</p>

          {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem", borderRadius: "0.6rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.82rem", marginBottom: "1.2rem" }}><AlertCircle size={16} />{error}</motion.div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem" }}>Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="Your name" required />
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem" }}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="you@example.com" required />
              </div>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} style={{ position: "absolute", left: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="At least 6 characters" required minLength={6} />
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.8rem", borderRadius: "0.65rem", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "0.5rem" }}>
              {loading ? 'Creating account...' : 'Create Account'}{!loading && <ArrowRight size={15} />}
            </button>
          </form>

          <div style={{ marginTop: "1.5rem", paddingTop: "1.2rem", borderTop: `1px solid ${border}` }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.45)", marginBottom: "0.6rem" }}>Free account includes:</p>
            {['Daily coaching messages', 'All subjects', 'PS coaching', 'Interview prep'].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.35rem" }}><Check size={13} color={coral} />{b}</div>
            ))}
          </div>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} style={{ color: coral, fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
