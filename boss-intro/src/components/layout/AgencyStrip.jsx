import { AGENCIES } from "../../data/constants";

export default function AgencyStrip() {
  return (
    <div style={{
      background: "#1a0f00",
      padding: "28px 0",
      borderTop: "1px solid rgba(255,255,255,0.04)",
    }}>
      <style>{`
        .agency-strip-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .agency-strip-heading {
          font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.3);
          letter-spacing: 0.12em; text-transform: uppercase;
          text-align: center; margin-bottom: 18px;
        }

        /* Desktop: single flex row */
        .agency-strip-desktop {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 0;
        }
        .agency-strip-mobile { display: none; }

        /* Mobile: 2-col centered grid */
        @media (max-width: 640px) {
          .agency-strip-inner { padding: 0 12px; }
          .agency-strip-desktop { display: none; }
          .agency-strip-mobile {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <div className="agency-strip-inner">
        <div className="agency-strip-heading">
          Participating Departments &amp; Offices
        </div>

        {/* Desktop layout */}
        <div className="agency-strip-desktop">
          {AGENCIES.map((agency, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 16,
              padding: "0 24px",
              fontSize: 13, fontWeight: 600,
              color: i === 0 ? "#ff9c43" : "rgba(255,255,255,0.5)",
            }}>
              {agency}
              {i < AGENCIES.length - 1 && (
                <span style={{
                  width: 4, height: 4, borderRadius: "50%",
                  background: "rgba(255,156,67,0.3)",
                  display: "inline-block", flexShrink: 0,
                }} />
              )}
            </span>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="agency-strip-mobile">
          {AGENCIES.map((agency, i) => (
            <span key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: 8, padding: "8px 6px",
              fontSize: 12, fontWeight: 700,
              color: i === 0 ? "#ff9c43" : "rgba(255,255,255,0.5)",
              whiteSpace: "nowrap",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "rgba(255,156,67,0.35)",
                display: "inline-block", flexShrink: 0,
              }} />
              {agency}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}