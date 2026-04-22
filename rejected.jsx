const PAYMENT_METHODS = [
  { label: "GCash", icon: "📱", type: "Digital Wallet", color: "#0076CE" },
  { label: "PayMaya", icon: "💜", type: "Digital Wallet", color: "#6B2D8B" },
  { label: "DBP Visa", icon: "🏦", type: "Banking Network", color: "#003087" },
  { label: "Landbank", icon: "🏧", type: "Banking Network", color: "#006B3C" },
  { label: "Over the Counter", icon: "🏛️", type: "Treasury Office", color: "#78350f" },
];

// ─── Payment Methods ──────────────────────────────────────────────────────────

function PaymentSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section style={{ padding: "100px 2rem", background: "white" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div ref={ref} style={{
          textAlign: "center", marginBottom: 56,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.55s ease",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ff9c43", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Payment
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontWeight: 800, color: "#1a1208", letterSpacing: "-0.5px", marginBottom: 14 }}>
            Pay your way.
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>
            Multiple payment channels available — online digital wallets, banking networks, and over-the-counter at the Treasury Office.
          </p>
        </div>

        <div style={{
          display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
        }}>
          {PAYMENT_METHODS.map((pm, i) => (
            <div key={pm.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "24px 28px",
              background: "white",
              border: "1.5px solid #f0e8dc",
              borderRadius: 14,
              minWidth: 140,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.45s ease ${0.08 * i}s`,
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#ffd9a8"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,156,67,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#f0e8dc"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 30, marginBottom: 10 }}>{pm.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1208", marginBottom: 4 }}>{pm.label}</div>
              <div style={{
                fontSize: 11, color: "white",
                background: pm.type === "Digital Wallet" ? "#ff9c43" : pm.type === "Banking Network" ? "#64748b" : "#78350f",
                borderRadius: 6, padding: "3px 8px", fontWeight: 600,
              }}>
                {pm.type}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 40, textAlign: "center",
          fontSize: 13, color: "#94a3b8",
        }}>
          Online payments trigger automatic issuance of an Electronic Official Receipt (e-OR)
        </div>
      </div>
    </section>
  );
}


// ─── Track Application ────────────────────────────────────────────────────────

function TrackSection() {
  const [ref, visible] = useInView();
  const [refNo, setRefNo] = useState("");

  return (
    <section id="track" style={{ padding: "100px 2rem", background: "white" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div ref={ref} style={{
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.55s ease",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ff9c43", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Status Tracker
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1a1208", letterSpacing: "-0.5px", marginBottom: 12 }}>
            Track your application
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", marginBottom: 40, lineHeight: 1.7 }}>
            Enter your Application Number to view real-time progress across all four processing phases.
          </p>

          <div style={{
            display: "flex", gap: 0,
            border: "1.5px solid #ffd9a8",
            borderRadius: 12, overflow: "hidden",
            boxShadow: "0 6px 24px rgba(255,156,67,0.1)",
            background: "white",
          }}>
            <input
              type="text"
              placeholder="e.g. APP-2025-04891"
              value={refNo}
              onChange={e => setRefNo(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && refNo) alert(`Tracking: ${refNo}`); }}
              style={{
                flex: 1, padding: "16px 20px",
                fontSize: 15, border: "none", outline: "none",
                background: "transparent", color: "#1a1208",
                fontFamily: "monospace",
              }}
            />
            <button
              onClick={() => refNo && alert(`Tracking: ${refNo}`)}
              style={{
                padding: "16px 28px",
                background: "#ff9c43", color: "white",
                border: "none", cursor: "pointer",
                fontSize: 14, fontWeight: 700,
                transition: "background 0.2s",
                flexShrink: 0,
                fontFamily: "inherit",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#e07620"}
              onMouseLeave={e => e.currentTarget.style.background = "#ff9c43"}
            >
              Track →
            </button>
          </div>

          <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>
            Your Application Number and Business Account Number were sent to your email after submission.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const [ref, visible] = useInView(0.1);

  return (
    <section id="how-it-works" style={{ padding: "100px 2rem", background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div ref={ref} style={{
          textAlign: "center", marginBottom: 64,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.55s ease",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ff9c43", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            The Process
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#1a1208", letterSpacing: "-0.5px", marginBottom: 16 }}>
            From application to permit,<br />in four steps.
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            EBIS 4.0 routes your application through all required offices simultaneously — no queuing, no back-and-forth.
          </p>
        </div>

        {/* Phase cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}>
          {PHASES.map((phase, i) => (
            <PhaseCard key={phase.number} phase={phase} index={i} parentVisible={visible} />
          ))}
        </div>

        {/* Compliance note */}
        <div style={{
          marginTop: 40,
          padding: "16px 24px",
          background: "#fff8f0", border: "1px solid #ffd9a8",
          borderRadius: 12, fontSize: 13, color: "#9a3412",
          textAlign: "center", lineHeight: 1.6,
        }}>
          <strong>⏱ RA 11032 (Ease of Doing Business Act):</strong> Simple transactions must be processed within{" "}
          <strong>3 working days</strong>; complex ones within <strong>7 working days</strong>. EBIS 4.0 tracks each department's status in real time.
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase, index, parentVisible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 16,
        padding: "28px 24px",
        border: `1.5px solid ${hovered ? phase.color + "60" : "#f0e8dc"}`,
        boxShadow: hovered ? `0 8px 28px ${phase.color}20` : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.25s ease",
        opacity: parentVisible ? 1 : 0,
        transform: parentVisible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${0.1 + index * 0.1}s`,
        cursor: "default",
        position: "relative",
      }}
    >
      {/* Phase number */}
      <div style={{
        fontSize: 11, fontWeight: 800, color: phase.color,
        letterSpacing: "0.1em", textTransform: "uppercase",
        marginBottom: 14,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: "50%",
          background: phase.color + "15",
          fontSize: 13,
        }}>
          {phase.icon}
        </span>
        Phase {phase.number}
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 700, color: "#1a1208", marginBottom: 10, letterSpacing: "-0.2px" }}>
        {phase.title}
      </h3>
      <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.65 }}>
        {phase.desc}
      </p>

      {/* Bottom accent bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 24, right: 24, height: 3,
        borderRadius: "0 0 12px 12px",
        background: hovered ? `linear-gradient(90deg, ${phase.color}, ${phase.color}80)` : "transparent",
        transition: "background 0.3s ease",
      }} />
    </div>
  );
}