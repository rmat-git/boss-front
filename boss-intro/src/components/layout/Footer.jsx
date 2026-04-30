import logomitcs from "../../assets/logo-m.png";

const FOOTER_COLS = [
  {
    heading: "Services",
    links: ["New Application", "Renew Permit", "Track Application", "Pay Fees Online"],
  },
  {
    heading: "Departments",
    links: ["BPLO", "Bureau of Fire Protection", "City Health Office", "Zoning Division"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Privacy Policy", "Terms of Use", "Contact BPLO"],
  },
];

const LinkCol = ({ col }) => (
  <div>
    <div style={{
      fontSize: 11, fontWeight: 700,
      color: "rgba(255,255,255,0.55)",
      letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16,
    }}>
      {col.heading}
    </div>
    {col.links.map(l => (
      <div key={l} style={{ marginBottom: 10 }}>
        <a href="#" style={{
          fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none",
          transition: "color 0.2s",
          WebkitTapHighlightColor: "transparent",
        }}
          onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
        >
          {l}
        </a>
      </div>
    ))}
  </div>
);

const Brand = () => (
  <div style={{ maxWidth: 280 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <img
        src={logomitcs}
        alt="eBOSS"
        style={{ width: 30, height: 30, objectFit: "contain" }}
        onError={e => { e.target.style.display = "none"; }}
      />
      <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}>
        eBOSS Portal — Bacolod City
      </span>
    </div>
    <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.3)" }}>
      Developed by the Management Information Technology and Computer Services Department (MITCS), Bacolod City Government.
    </p>
  </div>
);

export default function Footer() {
  return (
    <footer style={{ background: "#1a0f00", color: "rgba(255,255,255,0.45)" }}>

      <div style={{ padding: "clamp(32px, 5vw, 56px) clamp(1.25rem, 4vw, 2rem) 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "clamp(24px, 5vw, 40px)",
            marginBottom: "clamp(28px, 5vw, 48px)",
          }}>
            <Brand />
            {FOOTER_COLS.map(col => <LinkCol key={col.heading} col={col} />)}
          </div>

          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 8,
          }}>
            <span style={{ fontSize: 12 }}>
              © 2025 EBIS 4.0 — Bacolod City Government. Republic of the Philippines. All rights reserved.
            </span>
            <span style={{ fontSize: 12 }}>
              Data Privacy Act (RA 10173) Compliant · RA 11032 (Ease of Doing Business) · JMC Standards
            </span>
          </div>

        </div>
      </div>

    </footer>
  );
}