import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../data/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || mobileOpen ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: scrolled || mobileOpen ? "1px solid #f0e8dc" : "1px solid transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
        padding: "0 1.25rem",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          height: "clamp(110px, 10vw, 140px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img
              src="/src/assets/logo.png"
              alt="eBOSS Logo"
              style={{ width: "clamp(90px, 10vw, 120px)", height: "clamp(90px, 10vw, 140px)", objectFit: "contain" }}
              onError={e => { e.target.style.display = "none"; }}
            />
          </a>

          {/* Desktop Nav */}
          <div style={{
            display: "flex", alignItems: "center", gap: 32,
          }} className="nav-desktop">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} style={{
                fontSize: 16, color: "#374151", textDecoration: "none", fontWeight: 500,
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.target.style.color = "#ff9c43"}
                onMouseLeave={e => e.target.style.color = "#374151"}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="nav-hamburger"
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              padding: "8px", borderRadius: 8,
              flexDirection: "column", gap: 5, alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{
              display: "block", width: 24, height: 2,
              background: "#1a1208", borderRadius: 2,
              transformOrigin: "center",
              transition: "transform 0.25s, opacity 0.25s",
              transform: mobileOpen ? "translateY(7px) rotate(45deg)" : "none",
            }} />
            <span style={{
              display: "block", width: 24, height: 2,
              background: "#1a1208", borderRadius: 2,
              transition: "opacity 0.25s",
              opacity: mobileOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", width: 24, height: 2,
              background: "#1a1208", borderRadius: 2,
              transformOrigin: "center",
              transition: "transform 0.25s, opacity 0.25s",
              transform: mobileOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99,
        background: "rgba(26,18,8,0.45)",
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? "auto" : "none",
        transition: "opacity 0.3s ease",
      }} onClick={closeMobile} className="nav-overlay" />

      <div
        className="nav-drawer"
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(280px, 80vw)",
          zIndex: 100,
          background: "#ffffff",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          padding: "100px 2rem 2rem",
          display: "flex", flexDirection: "column", gap: 8,
          transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.label}
            href={l.href}
            onClick={closeMobile}
            style={{
              fontSize: 18, fontWeight: 600, color: "#1a1208",
              textDecoration: "none", padding: "12px 0",
              borderBottom: i < NAV_LINKS.length - 1 ? "1px solid #f0e8dc" : "none",
              transition: "color 0.2s",
              display: "block",
            }}
            onMouseEnter={e => e.target.style.color = "#ff9c43"}
            onMouseLeave={e => e.target.style.color = "#1a1208"}
          >
            {l.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}