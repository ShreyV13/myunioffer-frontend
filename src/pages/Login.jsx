import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

const coral = "#f96a50";
const bg = "#131316";
const border = "rgba(255,255,255,0.06)";
const D = { fontFamily: "'Outfit', sans-serif" };

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const redirect = searchParams.get('redirect');

  async function handleSubmit(e) {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      fetch(import.meta.env.VITE_API_URL + '/health').catch(() => {});
      await login(email, password);
      navigate(redirect === 'pricing' ? '/pricing' : '/chat');
    } catch (err) {
      if (err.code === 'auth/user-not-found') setError('No account with this email. Sign up instead?');
      else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') setError('Incorrect password.');
      else if (err.code === 'auth/invalid-email') setError('Please enter a valid email.');
      else if (err.code === 'auth/too-many-requests') setError('Too many attempts. Try again later.');
      else setError('Failed to sign in. Please try again.');
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
          <h1 style={{ ...D, fontSize: "1.5rem", fontWeight: 800, textAlign: "center", marginBottom: "0.3rem", color: "#fff" }}>Welcome back</h1>
          <p style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", fontSize: "0.85rem", marginBottom: "2rem" }}>Sign in to continue</p>

          {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.8rem", borderRadius: "0.6rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)", color: "#f87171", fontSize: "0.82rem", marginBottom: "1.2rem" }}><AlertCircle size={16} />{error}</motion.div>}

          <form onSubmit={handleSubmit}>
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
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} placeholder="••••••••" required />
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "0.8rem", borderRadius: "0.65rem", background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "0.5rem" }}>
              {loading ? 'Signing in...' : 'Sign In'}{!loading && <ArrowRight size={15} />}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "1.5rem" }}>
          Don't have an account? <Link to={redirect ? `/signup?redirect=${redirect}` : "/signup"} style={{ color: coral, fontWeight: 600, textDecoration: "none" }}>Sign up free</Link>
        </p>
      </motion.div>
    </div>
  );
}
