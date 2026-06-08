import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X } from 'lucide-react';

const D = { fontFamily: "'Outfit', sans-serif" };
const coral = "#f96a50";
const border = "rgba(255,255,255,0.06)";
const mutedText = "rgba(255,255,255,0.52)";

export default function Nav({ active }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const linkStyle = (name) => ({
    color: active === name ? coral : mutedText,
    textDecoration: "none",
    fontSize: "0.82rem",
    fontWeight: active === name ? 600 : 500,
    padding: "0.5rem 0.15rem"
  });

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${border}`, background: "rgba(19,19,22,0.8)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.55rem", textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${coral}, #e74d32)`, borderRadius: "0.55rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GraduationCap size={18} color="#fff" />
            </div>
            <span style={{ ...D, fontSize: "1.1rem", fontWeight: 700 }}>myuni<span style={{ color: coral }}>offer</span> <span style={{ color: "rgba(255,255,255,0.35)" }}>ai</span></span>
          </Link>

          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <Link to="/subjects" style={linkStyle("Subjects")}>Subjects</Link>
              <Link to="/blog" style={linkStyle("Blog")}>Blog</Link>
              <Link to="/pricing" style={linkStyle("Pricing")}>Pricing</Link>
              <Link to="/login" style={linkStyle("Log In")}>Log In</Link>
              <Link to="/signup" style={{ background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.5rem 1.3rem", borderRadius: "0.55rem", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
            </div>
          )}

          {isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Link to="/signup" style={{ background: `linear-gradient(135deg, ${coral}, #e74d32)`, color: "#fff", padding: "0.45rem 1rem", borderRadius: "0.55rem", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}>Get Started</Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", color: "#fff" }}>
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          )}
        </div>
      </nav>

      {isMobile && mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          style={{ position: "fixed", top: 56, left: 0, right: 0, zIndex: 49, background: "rgba(19,19,22,0.95)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${border}`, padding: "1rem 2rem" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link to="/subjects" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, padding: "0.5rem 0" }}>Subjects</Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, padding: "0.5rem 0" }}>Blog</Link>
            <Link to="/pricing" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, padding: "0.5rem 0" }}>Pricing</Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.95rem", fontWeight: 500, padding: "0.5rem 0" }}>Log In</Link>
          </div>
        </motion.div>
      )}
    </>
  );
}

export { Nav };
