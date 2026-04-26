export default function Hero() {
  return (
    <section id="about" style={{
      background: "linear-gradient(160deg, #fff8f0 0%, #ffffff 45%, #fff3e6 100%)",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "clamp(36vh, 20vw, 23vh) 1.25rem clamp(20vh, 12vw, 20vh)",
      position: "relative", overflow: "hidden",
      width: "100%",
      boxSizing: "border-box",
    }}>

      {/* Decorative background circles */}
      <div style={{
        position: "absolute", top: -120, right: -120,
        width: "clamp(240px, 40vw, 500px)", height: "clamp(240px, 40vw, 500px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,156,67,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80,
        width: "clamp(180px, 30vw, 400px)", height: "clamp(180px, 30vw, 400px)",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,156,67,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>

        {/* Badge */}
        <div style={{ textAlign: "center", marginBottom: "clamp(16px, 4vw, 28px)" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff3e6", border: "1px solid #ffd9a8",
            borderRadius: 999, padding: "6px 14px",
            fontSize: "clamp(10px, 2.5vw, 12px)", fontWeight: 700, color: "#e07620",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff9c43", display: "inline-block", flexShrink: 0 }} />
            <span>Electronic Business Integrated System 4.0</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2rem, 7vw, 4.5rem)",
          fontWeight: 800,
          color: "#1a1208",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
          marginBottom: "clamp(14px, 3vw, 24px)",
          textAlign: "center",
        }}>
          Bacolod City<br />
          e<span style={{ color: "#ff9c43" }}>Business </span>One Stop Shop
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)",
          color: "#64748b",
          lineHeight: 1.75,
          marginBottom: "clamp(24px, 5vw, 40px)",
          textAlign: "center",
          padding: "0 1rem",
        }}>
          Welcome to Bacolod City's Business One Stop Shop
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "clamp(12px, 3vw, 20px)",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "clamp(28px, 6vw, 56px)",
          marginBottom: "clamp(32px, 8vw, 72px)",
        }}
          className="hero-ctas"
        >
          <a href="#how-it-works" style={{
            width: "clamp(200px, 42vw, 300px)",
            boxSizing: "border-box", textAlign: "center",
            padding: "clamp(12px, 3vw, 14px) 24px",
            background: "#ff9c43", color: "white",
            borderRadius: 12, textDecoration: "none",
            fontSize: "clamp(15px, 3.5vw, 17px)", fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block",
            WebkitTapHighlightColor: "transparent",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            New Business Permit
          </a>

          <a href="#renewal" style={{
            width: "clamp(200px, 42vw, 300px)",
            boxSizing: "border-box", textAlign: "center",
            padding: "clamp(12px, 3vw, 14px) 24px",
            background: "#ff9c43", color: "white",
            borderRadius: 12, textDecoration: "none",
            fontSize: "clamp(15px, 3.5vw, 17px)", fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block",
            WebkitTapHighlightColor: "transparent",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Renewal of Permit
          </a>
        </div>

      </div>

      {/* Stack buttons on very small screens */}
      <style>{`
        @media (max-width: 420px) {
          .hero-ctas { flex-direction: column !important; align-items: center !important; }
          .hero-ctas a { width: min(320px, 90vw) !important; }
        }
      `}</style>
    </section>
  );
}