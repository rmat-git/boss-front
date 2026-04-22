import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── Replace with your actual YouTube video ID ───────────────────────────────
const YOUTUBE_VIDEO_ID = "UDLKp0DqoFU"; // e.g. "dQw4w9WgXcQ"

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "New Permit", href: "#how-it-works" },
  { label: "Renewal", href: "#renewal" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact-us" },
];

const PHASES = [
  {
    number: "01",
    title: "Register & Apply",
    color: "#ff9c43",
    icon: "📋",
    desc: "Provide a valid email and upload required documents — DTI, SEC, or CDA registration, Owner's ID, and Lease Contract if your place is rented.",
  },
  {
    number: "02",
    title: "BPLO Review & Clearances",
    color: "#3b82f6",
    icon: "🏛️",
    desc: "Your application is simultaneously routed to all required departments — BFP, Zoning, CHO, OBO, BENRO, and more — for concurrent approval.",
  },
  {
    number: "03",
    title: "Assessment & Payment",
    color: "#10b981",
    icon: "💳",
    desc: "Receive your billing statement and pay online via GCash, PayMaya, DBP Visa, or Landbank — or settle over the counter at the Treasury Office.",
  },
  {
    number: "04",
    title: "Receive Your Permit",
    color: "#8b5cf6",
    icon: "📜",
    desc: "Your digital Mayor's Permit is emailed automatically with an embedded QR code for verification. Pick up a hard copy at BPLO if preferred.",
  },
];

const AGENCIES = [
  "BPLO", "Bureau of Fire Protection", "Zoning Division", "City Health Office",
  "Office of the Building Official", "CENRO", "BTTMD", "City Administrator",
  "City Veterinarian", "City Agriculture", "Tourism Office",
];


// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
      borderBottom: scrolled ? "1px solid #f0e8dc" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      transition: "all 0.3s ease",
      padding: "0 2rem",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", height: 120,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>

        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
          <img
            src="/src/assets/logo.png"
            alt="eBOSS Logo"
            style={{ width: 100, height: 120, objectFit: "contain" }}
            onError={e => { e.target.style.display = "none"; }}
          />
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} style={{
              fontSize: 18, color: "#374151", textDecoration: "none", fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#ff9c43"}
              onMouseLeave={e => e.target.style.color = "#374151"}
            >
              {l.label}
            </a>
          ))}
        </div>

      </div>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="about" style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff8f0 0%, #ffffff 45%, #fff3e6 100%)",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "10px 2rem 80px",
      position: "relative", overflow: "hidden",
    }}>

      {/* Decorative background circles */}
      <div style={{
        position: "absolute", top: -120, right: -120,
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,156,67,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -80, left: -80,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,156,67,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative" }}>

        {/* Badge */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff3e6", border: "1px solid #ffd9a8",
            borderRadius: 999, padding: "6px 16px",
            fontSize: 12, fontWeight: 700, color: "#e07620",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff9c43", display: "inline-block" }} />
            Electronic Business Integrated System 4.0
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
          fontWeight: 800,
          color: "#1a1208",
          letterSpacing: "-1.5px",
          lineHeight: 1.08,
          marginBottom: 24,
          textAlign: "center"
        }}>
            Bacolod City<br />
          e<span style={{ color: "#ff9c43" }}>Business </span> One Stop Shop<br />
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "#64748b",
          lineHeight: 1.75,
          marginBottom: 40,
          textAlign: "center",
        }}>
          Welcome to Bacolod City's Business One Stop Shop
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginTop: 56, marginBottom: 72 }}>
          <a href="#how-it-works" style={{
            width: 300, boxSizing: "border-box", textAlign: "center",
            padding: "14px 32px",
            background: "#ff9c43", color: "white",
            borderRadius: 12, textDecoration: "none",
            fontSize: 17, fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block", alignItems: "center", gap: 10,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,156,67,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,156,67,0.35)"; }}
          >
            New Business Permit
          </a>

          <a href="#renewal" style={{
            width: 300, boxSizing: "border-box", textAlign: "center",
            padding: "14px 32px",
            background: "#ff9c43", color: "white",
            borderRadius: 12, textDecoration: "none",
            fontSize: 17, fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block", alignItems: "center", gap: 10,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,156,67,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,156,67,0.35)"; }}
          >
            Renewal of Permit
          </a>
        </div>

        </div>
    </section>
  );
}

// ─── Agency Strip ─────────────────────────────────────────────────────────────

function AgencyStrip() {
  return (
    <div style={{
      background: "#1a0f00",
      padding: "28px 2rem",
      borderTop: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.12em", textTransform: "uppercase",
          textAlign: "center", marginBottom: 18,
        }}>
          Participating Departments &amp; Offices
        </div>
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 0",
        }}>
          {AGENCIES.map((agency, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 16,
              padding: "0 24px",
              fontSize: 13, fontWeight: 600,
              color: i === 0 ? "#ff9c43" : "rgba(255,255,255,0.5)",
            }}>
              {agency}
              {i < AGENCIES.length - 1 && (
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,156,67,0.3)", display: "inline-block", flexShrink: 0 }} />
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Permit Data ──────────────────────────────────────────────────────────────

const PERMIT_DATA = {
  new: {
    label: "New Business Permit",
    office: "City Mayor's Office - Permits and License Division",
    classification: "Simple",
    transaction: "G2B - Government to Business Entity",
    whoMayAvail: "All Business Owners",
    totalTime: "2 hours and 30 minutes",
    encodingDocs: [
      {
        title: "Duly Filled-Up & Signed Application Form",
        notes: null,
      },
      {
        title: "Business Registration Certificate",
        notes: [
          "DTI for Single Proprietorship (original & photocopy)",
          "SEC Registration with Articles of Inc. for Corporation/Association/Partnership/OPC (original & photocopy) — include updated GIS from SEC if registration is not recent",
          "CDA Registration for Cooperatives (original & photocopy)"
        ],
      },
      {
        title: "Proof of Business Location",
        notes: [
          "If renting: Notarized Contract of Lease",
          "If not renting: Notarized Affidavit of Non-rental (sole prop) / Secretary's Certificate (corp.) / Proof of ownership"
        ],
      },
      {
        title: "Franchise / Tradename Documents (if applicable)",
        notes: [
          "Franchise Agreement / Certificate of Dealership / IPO Registration if the business will use another tradename rather than its own"
        ],
      },
      {
        title: "Required Clearances",
        notes: [
          "BARANGAY",
          "ZONING",
          "CITY HEALTH OFFICE Clearance / Sanitary Permit to Operate (original & photocopy)",
          "ENRO",
          "OBO"
        ],
      },
      {
        title: "Special Clearances (as applicable by business type)",
        notes: [
          "Agri Products / Agriculture related → City Agriculture Office",
          "Cooperatives → City Cooperatives and Livelihood Development Office",
          "Meat and Poultry products → City Veterinary Office",
          "Tourism Related → City Tourism Office",
          "3 Major Markets & Manukan Country → City Ad Clearance",
          "EGAMES, Cockfighting and the like → valid Resolution of No Objection (RONO) from SP"
        ],
      },
      {
        title: "Owner's Valid ID with Specimen Signature (clear photocopy)",
        notes: null,
      },
    ],
    proxyNote: {
      toProcess: [
        "Authorization letter",
        "ID of grantor and Authorized Representative"
      ],
      toSign: [
        "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative",
        "Corporation: Recent Notarized Secretary's Certificate",
        "Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)"
      ],
    },
    receivingDocs: [
      "Submit business application form with attached documentary requirements",
      "Assessment Form with Official Receipt (Original)",
      "VALID Fire Safety Inspection Certificate (FSIC) from the Bureau of Fire Protection (BFP) — original & photocopy",
    ],
    whereToSecure: "CMO Permits & Licensing Office",
    steps: [
      {
        client: "Secure Business Application Form from BPLO and process the necessary requirements and clearances.",
        agency: "BPLO Frontliner accepts application and evaluates completeness of documents submitted for encoding and instructs the client to process the necessary requirements/clearances.",
        fees: "None",
        time: "1 hour",
        responsible: [
          "Reah Marie P. Rom — License Inspector II",
          "Winnie C. Pabalinas — Licensing Officer I",
          "Mary Ann D. Eder — Clerk III"
        ],
      },
      {
        client: "Proceed to City Treasurer's Office–License Division for assessment and payment, then return to CMO–Permits and License Division to present the Official Receipt as proof of payment.",
        agency: "BPLO receives and reviews all submitted documents prior to printing of Mayor's Permit and verification by the BPLO Head.",
        fees: "c/o CTO",
        time: "30 minutes",
        responsible: [
          "CTO Assessment Officer",
          "CTO Cashier"
        ],
      },
      {
        client: "Receive the Mayor's Permit.",
        agency: "3.1 BPLO Head approves the Mayor's Permit.\n3.2 BPLO Frontliner releases the approved Mayor's Permit.",
        fees: "None",
        time: "30 minutes – 1 hour",
        responsible: [
          "Printing: Virman T. Akol — Clerk III",
          "Recommending Approval: Stela Rose J. Rayos — Licensing Officer IV",
          "Release: BPLO Frontliners"
        ],
      },
    ],
  },
  renewal: {
    label: "Renewal of Business Permit",
    office: "City Mayor's Office - Permits and License Division",
    classification: "Simple",
    transaction: "G2B - Government to Business Entity",
    whoMayAvail: "All Business Owners",
    totalTime: "4 hours",
    encodingDocs: [
      {
        title: "Previous Year's Mayor's Permit",
        notes: "Present Original or Photocopy — with Valid ID (if owner) or Authorization Letter / SPA with ID of owner and ID of the representative (if authorized representative)",
      },
    ],
    proxyNote: {
      toProcess: [
        "Authorization letter",
        "ID of grantor and Authorized Representative"
      ],
      toSign: [
        "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative",
        "Corporation: Recent Notarized Secretary's Certificate",
        "Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)"
      ],},
    receivingDocs: [
      "Duly signed pre-printed Application Form with Clearances: BARANGAY · ZONING · CITY HEALTH OFFICE Clearance / Sanitary Permit to Operate (original & photocopy) · ENRO · OBO",
      "VALID Fire Safety Inspection Certificate (FSIC) from Bureau of Fire Protection (BFP) — original & photocopy",
      "Assessment Form with Official Receipt",
      "Special Clearances (as applicable by business type): Agri Products / Agriculture related → City Agriculture Office · Cooperatives → City Cooperatives and Livelihood Development Office · Meat and Poultry products → City Veterinary Office · Tourism Related → City Tourism Office · 3 Major Markets & Manukan Country → City Ad Clearance",
      "Other Supporting Documents (as applicable): Security Agencies → Valid License to Operate from Camp Crame NCR · Firearms and Ammunitions → Valid License to Operate from Camp Crame · Recruitment Agencies (Abroad) → Valid License to Operate from POEA · Manpower Services (Local) → Valid Certificate of Registration from DOLE · Pawnshops, Money Service Businesses, Remittance and Transfer Company w/ Virtual Currency Exchange Services, Money Changers and Foreign Exchange → Valid Certificate of Registration from Bangko Sentral ng Pilipinas (BSP) · EGAMES, Cockfighting and the like → valid Resolution of No Objection (RONO) from SP",
    ],
    whereToSecure: "CMO - Permits & Licensing Office",
    steps: [
      {
        client: "Secure Business Application Form from BPLO.",
        agency: "1.1 BPLO Frontliner accepts application and evaluates completeness of documents submitted for encoding.\n1.2 Advise the client to either proceed to Assessment and pay, or process the necessary requirements and clearances.",
        fees: "c/o CTO–License Division",
        time: "1–2 hours",
        responsible: "Reah Marie P. Rom — License Inspector II · Winnie C. Pabalinas — Licensing Officer I · Mary Ann D. Eder — Clerk III · c/o CTO–License Division",
      },
      {
        client: "Submit the application form with attached complete requirements and Assessment Form or Official Receipt as proof of payment.",
        agency: "BPLO receives and reviews all submitted documents prior to printing of Mayor's Permit and verification by the Head.",
        fees: "—",
        time: "—",
        responsible: "BPLO Review Staff",
      },
      {
        client: "Receive the Mayor's Permit.",
        agency: "3.1 BPLO Head approves the Mayor's Permit.\n3.2 BPLO Frontliner releases the approved Mayor's Permit.",
        fees: "None",
        time: "1 hour",
        responsible: "Printing: Virman T. Akol — Clerk III · Recommending Approval: Stela Rose J. Rayos — Licensing Officer IV · Release: BPLO Frontliners",
      },
    ],
  },
};

// ─── Viewer Placeholder ───────────────────────────────────────────────────────

function ViewerPlaceholder({ label, accentColor = "#ff9c43" }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: accentColor + "06",
      border: `2px dashed ${accentColor}40`,
      borderRadius: 14,
      padding: "40px 24px",
      textAlign: "center",
      gap: 16,
      minHeight: 340,
    }}>
      <div style={{
        width: 68, height: 68, borderRadius: 18,
        background: accentColor + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32,
      }}>
        📄
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1208", marginBottom: 6 }}>
          Document Viewer
        </div>
        <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, maxWidth: 240 }}>
          This area will display {label} — PDFs, downloadable forms, or requirement lists.
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
        {["Application Form (PDF)", "Requirements Checklist", "Fee Schedule"].map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px",
            background: "white",
            border: "1px solid #f0e8dc",
            borderRadius: 9,
            opacity: 0.55,
          }}>
            <span style={{ fontSize: 14 }}>📎</span>
            <span style={{ fontSize: 13, color: "#64748b", fontStyle: "italic" }}>{item}</span>
            <div style={{
              marginLeft: "auto", padding: "3px 10px",
              background: "#f5f0eb", borderRadius: 999,
              fontSize: 11, color: "#94a3b8", fontWeight: 600,
            }}>
              Coming soon
            </div>
          </div>
        ))}
      </div>
      <div style={{
        padding: "8px 16px",
        background: "white",
        border: `1.5px dashed ${accentColor}70`,
        borderRadius: 999,
        fontSize: 11, color: accentColor,
        fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
      }}>
        Placeholder — Content TBD
      </div>
    </div>
  );
}

// ─── Shared Permit Section ────────────────────────────────────────────────────

function PermitSection({ id, data, bg, accentColor, borderColor, siblingHref, siblingLabel }) {
  const [ref, visible] = useInView(0.06);

  return (
    <section id={id} style={{ padding: "100px 2rem", background: bg, scrollMarginTop: 120 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div ref={ref} style={{
          textAlign: "center", marginBottom: 44,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.55s ease",
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: accentColor, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
            Requirements & Procedure
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#1a1208", letterSpacing: "-0.5px", marginBottom: 14 }}>
            {data.label}
          </h2>
          <p style={{ fontSize: 16, color: "#64748b", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            Complete checklist of requirements and step-by-step procedure flow as prescribed by the City Mayor's Office — Permits and Licensing Division.
          </p>
        </div>

        {/* Meta Info Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 0,
          marginBottom: 36,
          borderRadius: 14,
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
        }}>
          {[
            { label: "Classification", value: data.classification },
            { label: "Transaction Type", value: data.transaction },
            { label: "Who May Avail", value: data.whoMayAvail },
            { label: "Total Processing Time", value: data.totalTime },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              padding: "16px 20px",
              background: "white",
              borderRight: i < arr.length - 1 ? `1px solid ${borderColor}` : "none",
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 14.5, color: "#1a1208", fontWeight: 600, lineHeight: 1.4 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: Left (Requirements + Procedure) | Right (Viewer) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>

          {/* ── Left: Requirements + Procedure stacked ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

            <SectionCard title="📋 Checklist of Requirements" accent={accentColor}>
              <SubHeading label="For Encoding" />
              {data.encodingDocs.map((doc, i) => (
                <DocItem key={i} number={i + 1} title={doc.title} notes={doc.notes} accentColor={accentColor} />
              ))}
              <div style={{
                marginTop: 14, padding: "13px 15px",
                background: "#fffbeb", border: "1px solid #fde68a",
                borderRadius: 10, fontSize: 14, color: "#78350f", lineHeight: 1.65,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>📝 If transacting on behalf of the Owner:</div>
                <div style={{ marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>To Process only: </span>{data.proxyNote.toProcess}
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>To Sign: </span>{data.proxyNote.toSign}
                </div>
              </div>
              <SubHeading label="Upon Receiving / Submission" top={18} />
              {data.receivingDocs.map((doc, i) => (
                <DocItem key={i} number={i + 1} title={doc} notes={null} accentColor={accentColor} />
              ))}
              <div style={{
                marginTop: 12, padding: "11px 14px",
                background: "#f0fdf4", border: "1px solid #86efac",
                borderRadius: 10, fontSize: 14, color: "#14532d", lineHeight: 1.6,
              }}>
                <span style={{ fontWeight: 700 }}>📍 Where to Secure: </span>{data.whereToSecure}
              </div>
            </SectionCard>

            <SectionCard title="🔄 Procedure Flow" accent="#3b82f6">
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {data.steps.map((step, i) => (
                  <StepBlock key={i} index={i} step={step} isLast={i === data.steps.length - 1} />
                ))}
              </div>
              <div style={{
                marginTop: 22, padding: "14px 18px",
                background: "#fff8f0", border: "1px solid #ffd9a8",
                borderRadius: 10, display: "flex", alignItems: "center", gap: 12,
              }}>
                <span style={{ fontSize: 22 }}>⏱</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#e07620", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                    Total Processing Time
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1208" }}>{data.totalTime}</div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── Right: Document Viewer (sticky) ── */}
          <div style={{ position: "sticky", top: 140 }}>
            <SectionCard title="📂 Documents & Forms" accent={accentColor}>
              <ViewerPlaceholder label={`${data.label} documents`} accentColor={accentColor} />
            </SectionCard>
          </div>
        </div>

        {/* RA 11032 Note */}
        <div style={{
          marginTop: 32, padding: "16px 24px",
          background: "#fff8f0", border: "1px solid #ffd9a8",
          borderRadius: 12, fontSize: 15, color: "#9a3412",
          textAlign: "center", lineHeight: 1.7,
        }}>
          <strong>⚖️ RA 11032 (Ease of Doing Business Act):</strong> Simple transactions must be processed within{" "}
          <strong>3 working days</strong>; complex ones within <strong>7 working days</strong>. EBIS 4.0 tracks each department's clearance status in real time.
        </div>
      </div>
    </section>
  );
}

// ─── New Business Permit ──────────────────────────────────────────────────────

function HowItWorks() {
  return (
    <PermitSection
      id="how-it-works"
      data={PERMIT_DATA.new}
      bg="#ffffff"
      accentColor="#ff9c43"
      borderColor="#ffd9a8"
      siblingHref="#renewal"
      siblingLabel="Renewal"
    />
  );
}

// ─── Renewal of Business Permit ───────────────────────────────────────────────

function RenewalSection() {
  return (
    <PermitSection
      id="renewal"
      data={PERMIT_DATA.renewal}
      bg="#f5f9ff"
      accentColor="#3b82f6"
      borderColor="#bfdbfe"
      siblingHref="#how-it-works"
      siblingLabel="New Permit"
    />
  );
}

function SectionCard({ title, accent, children }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      border: "1px solid #f0e8dc",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 20px",
        borderBottom: "1px solid #f5f0eb",
        background: "#fafaf9",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ width: 3, height: 18, borderRadius: 2, background: accent, flexShrink: 0 }} />
        <span style={{ fontSize: 26, fontWeight: 700, color: "#1a1208" }}>{title}</span>
      </div>
      <div style={{ padding: "18px 20px" }}>
        {children}
      </div>
    </div>
  );
}

function SubHeading({ label, top = 0 }) {
  return (
    <div style={{
      marginTop: top,
      marginBottom: 10,
      fontSize: 10,
      fontWeight: 700,
      color: "#ff9c43",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}>
      {label}
    </div>
  );
}

function DocItem({ number, title, notes, accentColor = "#ff9c43" }) {
  return (
    <div style={{
      display: "flex", gap: 10,
      padding: "10px 13px",
      background: "#fafafa",
      borderRadius: 9,
      border: "1px solid #f0e8dc",
      marginBottom: 6,
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: "50%",
        background: accentColor + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 800, color: accentColor,
        flexShrink: 0, marginTop: 2,
      }}>
        {number}
      </span>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: "#1a1208", lineHeight: 1.45 }}>{title}</div>
        {notes && (
          Array.isArray(notes) ? (
            <ul style={{ margin: "4px 0 0 0", paddingLeft: 18, fontSize: 14, color: "#5b6572", lineHeight: 1.5 }}>
              {notes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          ) : (
            <div style={{ fontSize: 14, color: "#5b6572", marginTop: 3, lineHeight: 1.5 }}>{notes}</div>
          )
        )}
      </div>
    </div>
  );
}

function StepBlock({ index, step, isLast }) {
  return (
    <div style={{ position: "relative" }}>
      {!isLast && (
        <div style={{
          position: "absolute",
          left: 14,
          top: 36,
          bottom: -16,
          width: 2,
          background: "linear-gradient(to bottom, #3b82f620, transparent)",
          borderRadius: 1,
        }} />
      )}
      <div style={{ display: "flex", gap: 12 }}>
        {/* Step number circle */}
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#3b82f6",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, fontWeight: 800, color: "white",
          flexShrink: 0, zIndex: 1,
        }}>
          {index + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Client action */}
          <div style={{
            padding: "9px 12px",
            background: "#f0f7ff",
            borderRadius: 9,
            border: "1px solid #bfdbfe",
            marginBottom: 6,
          }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
              Client
            </div>
            <div style={{ fontSize: 14.5, color: "#1e3a8a", lineHeight: 1.5 }}>{step.client}</div>
          </div>
          {/* Agency action */}
          <div style={{
            padding: "9px 12px",
            background: "#fafafa",
            borderRadius: 9,
            border: "1px solid #f0e8dc",
            marginBottom: 6,
          }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#e07620", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
              Agency Action
            </div>
            <div style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.5, whiteSpace: "pre-line" }}>{step.agency}</div>
          </div>
          {/* Meta row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <MetaBadge label="Fees" value={step.fees} color="#10b981" />
            <MetaBadge label="Time" value={step.time} color="#8b5cf6" />
          </div>
          {/* Responsible persons */}
          <div style={{
            marginTop: 6,
            padding: "7px 10px",
            background: "#f8f4f0",
            borderRadius: 8,
            fontSize: 12.5,
            color: "#64748b",
            lineHeight: 1.5,
          }}>
            <span style={{ fontWeight: 700, color: "#94a3b8" }}>👤 Responsible: </span>
            {step.responsible}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaBadge({ label, value, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      padding: "4px 10px",
      background: color + "10",
      border: `1px solid ${color}30`,
      borderRadius: 999,
      fontSize: 12.5,
    }}>
      <span style={{ fontWeight: 700, color: color }}>{label}:</span>
      <span style={{ color: "#374151" }}>{value}</span>
    </div>
  );
}

// ─── Video Section ────────────────────────────────────────────────────────────

function VideoSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section style={{ padding: "60px 2rem 100px", background: "#fff8f0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div ref={ref} style={{
          background: "white",
          border: "1px solid #f0e8dc",
          borderRadius: 20,
          padding: "28px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.55s ease",
        }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#ff9c43", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>
              Video Tutorial
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1a1208", letterSpacing: "-0.2px", marginBottom: 4 }}>
              How to use eBOSS EBIS 4.0
            </h2>
            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>
              Watch this quick guide to understand the step-by-step online business permit application process.
            </p>
          </div>

          <div style={{
            position: "relative",
            paddingBottom: "56.25%",
            height: 0, overflow: "hidden",
            borderRadius: 12,
            background: "#f8f4f0",
            border: "1px solid #f0e8dc",
          }}>
            <iframe
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="eBOSS EBIS 4.0 Tutorial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}



// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
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

  return (
    <footer style={{ background: "#1a0f00", color: "rgba(255,255,255,0.45)", padding: "56px 2rem 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexWrap: "wrap", gap: 40, marginBottom: 48,
        }}>

          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <img
                src="/src/assets/logo.png"
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

          {/* Link columns */}
          <div style={{ display: "flex", gap: 56, flexWrap: "wrap" }}>
            {FOOTER_COLS.map(col => (
              <div key={col.heading}>
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
                    }}
                      onMouseEnter={e => e.target.style.color = "rgba(255,255,255,0.7)"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
                    >
                      {l}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontSize: 12 }}>
            © 2025 EBIS 4.0 — Bacolod City Government. Republic of the Philippines. All rights reserved.
          </span>
          <span style={{ fontSize: 12 }}>
            Data Privacy Act (RA 10173) Compliant · RA 11032 (Ease of Doing Business) · JMC Standards
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", margin: 0, padding: 0 }}>
      <Navbar />
      <Hero />
      <AgencyStrip />
      <HowItWorks />
      <RenewalSection />
      <VideoSection />
      <Footer />
    </div>
  );
}