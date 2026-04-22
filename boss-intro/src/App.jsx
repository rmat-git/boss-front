import { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── Replace with your actual YouTube video ID ───────────────────────────────
const YOUTUBE_VIDEO_ID = "UDLKp0DqoFU"; // e.g. "dQw4w9WgXcQ"

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Business Types", href: "#business-types" },
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

const BUSINESS_TYPES = [
  {
    label: "Sole Proprietorship",
    icon: "👤",
    agency: "DTI",
    agencyFull: "Department of Trade and Industry",
    color: "#ff9c43",
    docs: ["DTI Certificate of Business Name Registration", "Owner's Valid Government ID"],
    conditional: "Lease Contract (if rented)",
  },
  {
    label: "Partnership",
    icon: "🤝",
    agency: "SEC",
    agencyFull: "Securities and Exchange Commission",
    color: "#3b82f6",
    docs: ["SEC Certificate (Articles of Partnership)", "Partnership Resolution / SPA", "Authorized Rep's Valid ID"],
    conditional: "Lease Contract (if rented)",
  },
  {
    label: "Corporation / OPC",
    icon: "🏢",
    agency: "SEC",
    agencyFull: "Securities and Exchange Commission",
    color: "#10b981",
    docs: ["SEC Certificate of Incorporation", "Board Resolution or Secretary's Certificate", "Authorized Rep's Valid ID"],
    conditional: "Lease Contract (if rented) · Franchise Agreement (if applicable)",
  },
  {
    label: "Cooperative",
    icon: "🌐",
    agency: "CDA",
    agencyFull: "Cooperative Development Authority",
    color: "#8b5cf6",
    docs: ["CDA Certificate of Registration", "Board Resolution / SPA", "Authorized Rep's Valid ID"],
    conditional: "Lease Contract (if rented)",
  },
];

const AGENCIES = [
  "BPLO", "Bureau of Fire Protection", "Zoning Division", "City Health Office",
  "Office of the Building Official", "CENRO", "BTTMD", "City Administrator",
  "City Veterinarian", "City Agriculture", "Tourism Office",
];


const STATS = [
  { value: "11", label: "Departments in parallel" },
  { value: "4", label: "Processing phases" },
  { value: "3–7", label: "Working days (RA 11032)" },
  { value: "100%", label: "Digital submission" },
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
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <img
            src="/src/assets/logo.png"
            alt="eBOSS Logo"
            style={{ width: 72, height: 72, objectFit: "contain" }}
            onError={e => { e.target.style.display = "none"; }}
          />
          <div>
            <div style={{ fontSize: 25, fontWeight: 800, color: "#e07620", letterSpacing: "-0.3px", lineHeight: 1 }}>
              eBOSS
            </div>
            <div style={{ fontSize: 9, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", lineHeight: 1.3 }}>
              Bacolod City · EBIS 4.0
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} style={{
              fontSize: 14, color: "#374151", textDecoration: "none", fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#ff9c43"}
              onMouseLeave={e => e.target.style.color = "#374151"}
            >
              {l.label}
            </a>
          ))}
        </div>

        

        {/* CTA */}
        <div style={{ display: "flex", gap: 8 }}>
          <a href="#" style={{
            width: 100, boxSizing: "border-box", textAlign: "center",
            padding: "9px 20px",
            background: "transparent", color: "#374151",
            border: "1.5px solid #e2e8f0",
            borderRadius: 8, textDecoration: "none",
            fontSize: 14, fontWeight: 600,
            transition: "all 0.2s",
            display: "inline-block",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#ffd9a8"; e.currentTarget.style.color = "#ff9c43"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#374151"; }}
          >
            Log In
          </a>
          <a href="#" style={{
            width: 100, boxSizing: "border-box", textAlign: "center",
            padding: "9px 20px",
            background: "#ff9c43", color: "white",
            borderRadius: 8, textDecoration: "none",
            fontSize: 14, fontWeight: 700,
            transition: "background 0.2s, transform 0.15s",
            display: "inline-block",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Register
          </a>
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
      padding: "120px 2rem 80px",
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
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#fff3e6", border: "1px solid #ffd9a8",
          borderRadius: 999, padding: "6px 16px",
          fontSize: 12, fontWeight: 700, color: "#e07620",
          letterSpacing: "0.08em", textTransform: "uppercase",
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff9c43", display: "inline-block" }} />
          Electronic Business Integrated System 4.0
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
          fontWeight: 800,
          color: "#1a1208",
          letterSpacing: "-1.5px",
          lineHeight: 1.08,
          marginBottom: 24,
          maxWidth: 780,
        }}>
            Bacolod City's <br />
          <span style={{ color: "#ff9c43" }}>Business </span> One<br />
          Stop Shop
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "#64748b",
          lineHeight: 1.75,
          maxWidth: 560,
          marginBottom: 40,
        }}>
          Welcome to Bacolod City's Business One Stop Shop — from document submission and multi-department clearance to payment and QR-secured permit issuance — in one seamless platform.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 72 }}>
          <a href="#" style={{
            width: 200, boxSizing: "border-box", textAlign: "center",
            padding: "14px 32px",
            background: "#ff9c43", color: "white",
            borderRadius: 10, textDecoration: "none",
            fontSize: 15, fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,156,67,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,156,67,0.35)"; }}
          >
            eBusiness→
          </a>

            <a href="#" style={{
            width: 200, boxSizing: "border-box", textAlign: "center",
            padding: "14px 32px",
            background: "#ff9c43", color: "white",
            borderRadius: 10, textDecoration: "none",
            fontSize: 15, fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,156,67,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,156,67,0.35)"; }}
          >
            eRPT→
          </a>

            <a href="#" style={{
            width: 200, boxSizing: "border-box", textAlign: "center",
            padding: "14px 32px",
            background: "#ff9c43", color: "white",
            borderRadius: 10, textDecoration: "none",
            fontSize: 15, fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,156,67,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,156,67,0.35)"; }}
          >
            eBuilding →
          </a>

            <a href="#" style={{
            width: 200, boxSizing: "border-box", textAlign: "center",
            padding: "14px 32px",
            background: "#ff9c43", color: "white",
            borderRadius: 10, textDecoration: "none",
            fontSize: 15, fontWeight: 700,
            boxShadow: "0 6px 24px rgba(255,156,67,0.35)",
            transition: "all 0.2s",
            display: "inline-block",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#e07620"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(255,156,67,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ff9c43"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(255,156,67,0.35)"; }}
          >
            eMiscellaneous →
          </a>


          <a href="#how-it-works" style={{
            width: 200, boxSizing: "border-box", textAlign: "center",
            padding: "14px 28px",
            background: "white", color: "#1a1208",
            border: "1.5px solid #e2e8f0",
            borderRadius: 10, textDecoration: "none",
            fontSize: 15, fontWeight: 600,
            transition: "all 0.2s",
            display: "inline-block",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#ffd9a8"; e.currentTarget.style.color = "#ff9c43"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#1a1208"; }}
          >
            Learn how it works
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          maxWidth: 700,
          padding: "28px 0",
          borderTop: "1px solid #f0e8dc",
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", fontWeight: 800, color: "#ff9c43", letterSpacing: "-1px", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, lineHeight: 1.4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Agency Strip ─────────────────────────────────────────────────────────────

function AgencyStrip() {
  const doubled = [...AGENCIES, ...AGENCIES];

  return (
    <div style={{
      background: "#1a0f00",
      padding: "18px 0",
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)",
        letterSpacing: "0.12em", textTransform: "uppercase",
        textAlign: "center", marginBottom: 12,
      }}>
        Participating Departments & Offices
      </div>
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-track" style={{ display: "flex", gap: 0, whiteSpace: "nowrap" }}>
          {doubled.map((agency, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 20,
              padding: "0 28px",
              fontSize: 13, fontWeight: 600,
              color: i % AGENCIES.length === 0 ? "#ff9c43" : "rgba(255,255,255,0.5)",
            }}>
              {agency}
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,156,67,0.3)", display: "inline-block" }} />
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
        notes: "DTI for Single Proprietorship (original & photocopy) · SEC Registration with Articles of Inc. for Corporation/Association/Partnership/OPC (original & photocopy) — include updated GIS from SEC if registration is not recent · CDA Registration for Cooperatives (original & photocopy)",
      },
      {
        title: "Proof of Business Location",
        notes: "If renting: Notarized Contract of Lease · If not renting: Notarized Affidavit of Non-rental (sole prop) / Secretary's Certificate (corp.) / Proof of ownership",
      },
      {
        title: "Franchise / Tradename Documents (if applicable)",
        notes: "Franchise Agreement / Certificate of Dealership / IPO Registration if the business will use another tradename rather than its own",
      },
      {
        title: "Required Clearances",
        notes: "BARANGAY · ZONING · CITY HEALTH OFFICE Clearance / Sanitary Permit to Operate (original & photocopy) · ENRO · OBO",
      },
      {
        title: "Special Clearances (as applicable by business type)",
        notes: "Agri Products / Agriculture related → City Agriculture Office · Cooperatives → City Cooperatives and Livelihood Development Office · Meat and Poultry products → City Veterinary Office · Tourism Related → City Tourism Office · 3 Major Markets & Manukan Country → City Ad Clearance · EGAMES, Cockfighting and the like → valid Resolution of No Objection (RONO) from SP",
      },
      {
        title: "Owner's Valid ID with Specimen Signature (clear photocopy)",
        notes: null,
      },
    ],
    proxyNote: {
      toProcess: "Authorization letter · ID of grantor and Authorized Representative",
      toSign: "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative · Corporation: Recent Notarized Secretary's Certificate · Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)",
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
        responsible: "Reah Marie P. Rom — License Inspector II · Winnie C. Pabalinas — Licensing Officer I · Mary Ann D. Eder — Clerk III",
      },
      {
        client: "Proceed to City Treasurer's Office–License Division for assessment and payment, then return to CMO–Permits and License Division to present the Official Receipt as proof of payment.",
        agency: "BPLO receives and reviews all submitted documents prior to printing of Mayor's Permit and verification by the BPLO Head.",
        fees: "c/o CTO",
        time: "30 minutes",
        responsible: "CTO Assessment Officer · CTO Cashier",
      },
      {
        client: "Receive the Mayor's Permit.",
        agency: "3.1 BPLO Head approves the Mayor's Permit.\n3.2 BPLO Frontliner releases the approved Mayor's Permit.",
        fees: "None",
        time: "30 minutes – 1 hour",
        responsible: "Printing: Virman T. Akol — Clerk III · Recommending Approval: Stela Rose J. Rayos — Licensing Officer IV · Release: BPLO Frontliners",
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
      toProcess: "Authorization letter · ID of grantor and Authorized Representative",
      toSign: "Sole Prop: Recent Notarized Special Power of Attorney (SPA) + Valid ID of grantor and authorized representative · Corporation: Recent Notarized Secretary's Certificate · Corp/Companies: Company ID with designation of Grantor and Authorized Representative (in the absence of company ID with designation, any valid ID must be supported with recent General Information Sheet or GIS)",
    },
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

// ─── How It Works (Steps & Requirements) ─────────────────────────────────────

function HowItWorks() {
  const [ref, visible] = useInView(0.1);
  const [mode, setMode] = useState("new");
  const data = PERMIT_DATA[mode];

  return (
    <section id="how-it-works" style={{ padding: "100px 2rem", background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div ref={ref} style={{
          textAlign: "center", marginBottom: 48,
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.55s ease",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ff9c43", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
            Requirements & Procedure
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#1a1208", letterSpacing: "-0.5px", marginBottom: 16 }}>
            Application for Mayor's Permit
          </h2>
          <p style={{ fontSize: 15, color: "#64748b", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>
            Select the permit type below to view the complete checklist of requirements and step-by-step procedure flow as prescribed by the City Mayor's Office — Permits and Licensing Division.
          </p>

          {/* Toggle Switch */}
          <div style={{
            display: "inline-flex",
            background: "#f5f0eb",
            borderRadius: 999,
            padding: 5,
            gap: 4,
            border: "1px solid #f0e8dc",
          }}>
            {[
              { key: "new", label: "🆕 New Business Permit" },
              { key: "renewal", label: "🔄 Renewal of Permit" },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => setMode(opt.key)}
                style={{
                  padding: "10px 28px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "inherit",
                  background: mode === opt.key ? "#ff9c43" : "transparent",
                  color: mode === opt.key ? "white" : "#64748b",
                  boxShadow: mode === opt.key ? "0 4px 14px rgba(255,156,67,0.35)" : "none",
                  transition: "all 0.25s ease",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meta Info Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          marginBottom: 36,
          padding: "18px 24px",
          background: "#fff8f0",
          borderRadius: 14,
          border: "1px solid #ffd9a8",
        }}>
          {[
            { label: "Office / Division", value: data.office },
            { label: "Classification", value: data.classification },
            { label: "Transaction Type", value: data.transaction },
            { label: "Who May Avail", value: data.whoMayAvail },
            { label: "Total Processing Time", value: data.totalTime },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#e07620", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 13.5, color: "#374151", fontWeight: 500, lineHeight: 1.45 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Two-column: Requirements | Procedure */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>

          {/* ── Left: Checklist of Requirements ── */}
          <div>
            <SectionCard title="📋 Checklist of Requirements" accent="#ff9c43">

              {/* For Encoding */}
              <SubHeading label="For Encoding" />
              {data.encodingDocs.map((doc, i) => (
                <DocItem key={i} number={i + 1} title={doc.title} notes={doc.notes} />
              ))}

              {/* Proxy/Representative Note */}
              <div style={{
                marginTop: 16,
                padding: "13px 15px",
                background: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: 10,
                fontSize: 14,
                color: "#78350f",
                lineHeight: 1.6,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>📝 If transacting on behalf of the Owner:</div>
                <div style={{ marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>To Process only: </span>
                  {data.proxyNote.toProcess}
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>To Sign: </span>
                  {data.proxyNote.toSign}
                </div>
              </div>

              {/* Upon Receiving */}
              <SubHeading label="Upon Receiving / Submission" top={20} />
              {data.receivingDocs.map((doc, i) => (
                <DocItem key={i} number={i + 1} title={doc} notes={null} />
              ))}

              {/* Where to Secure */}
              <div style={{
                marginTop: 14,
                padding: "10px 14px",
                background: "#f0fdf4",
                border: "1px solid #86efac",
                borderRadius: 10,
                fontSize: 14,
                color: "#14532d",
              }}>
                <span style={{ fontWeight: 700 }}>📍 Where to Secure: </span>{data.whereToSecure}
              </div>
            </SectionCard>
          </div>

          {/* ── Right: Procedure Flow ── */}
          <div>
            <SectionCard title="🔄 Procedure Flow" accent="#3b82f6">
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {data.steps.map((step, i) => (
                  <StepBlock key={i} index={i} step={step} isLast={i === data.steps.length - 1} />
                ))}
              </div>

              {/* Total time summary */}
              <div style={{
                marginTop: 20,
                padding: "12px 16px",
                background: "#fff8f0",
                border: "1px solid #ffd9a8",
                borderRadius: 10,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>⏱</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#e07620", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Processing Time</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#1a1208" }}>{data.totalTime}</div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* RA 11032 Note */}
        <div style={{
          marginTop: 28,
          padding: "16px 24px",
          background: "#fff8f0", border: "1px solid #ffd9a8",
          borderRadius: 12, fontSize: 13.5, color: "#9a3412",
          textAlign: "center", lineHeight: 1.6,
        }}>
          <strong>⚖️ RA 11032 (Ease of Doing Business Act):</strong> Simple transactions must be processed within{" "}
          <strong>3 working days</strong>; complex ones within <strong>7 working days</strong>. EBIS 4.0 tracks each department's clearance status in real time.
        </div>
      </div>
    </section>
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
        <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1208" }}>{title}</span>
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
      fontSize: 11.5,
    }}>
      {label}
    </div>
  );
}

function DocItem({ number, title, notes }) {
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
        width: 20, height: 20, borderRadius: "50%",
        background: "#ff9c4318",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800, color: "#ff9c43",
        flexShrink: 0, marginTop: 1,
      }}>
        {number}
      </span>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: "#1a1208", lineHeight: 1.45 }}>{title}</div>
        {notes && (
          <div style={{ fontSize: 14, color: "#5b6572", marginTop: 3, lineHeight: 1.5 }}>{notes}</div>
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
          fontSize: 13, fontWeight: 800, color: "white",
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
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
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
            <div style={{ fontSize: 11, fontWeight: 700, color: "#e07620", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>
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
            fontSize: 13,
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
      fontSize: 13,
    }}>
      <span style={{ fontWeight: 700, color: color }}>{label}:</span>
      <span style={{ color: "#374151" }}>{value}</span>
    </div>
  );
}

// ─── Business Types ───────────────────────────────────────────────────────────

function BusinessTypes() {
  const [ref, visible] = useInView(0.1);
  const [active, setActive] = useState("sole");
  const activeType = BUSINESS_TYPES.find(b => b.label.toLowerCase().startsWith(active)) || BUSINESS_TYPES[0];

  const keys = ["sole", "partnership", "corp", "coop"];

  return (
    <section id="business-types" style={{ padding: "100px 2rem", background: "#fff8f2" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div ref={ref} style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start",
          opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-20px)",
          transition: "all 0.55s ease",
        }}>

          {/* Left: copy */}
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ff9c43", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
              Coverage
            </div>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#1a1208", letterSpacing: "-0.5px", marginBottom: 16 }}>
              All business structures,<br />one portal.
            </h2>
            <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.7, marginBottom: 32 }}>
              Whether you're a DTI-registered sole proprietor, an SEC-registered corporation, or a CDA-registered cooperative, EBIS 4.0 dynamically loads the exact document requirements for your structure.
            </p>

            {/* Tabs */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {BUSINESS_TYPES.map((bt, i) => {
                const isActive = active === keys[i];
                return (
                  <button
                    key={bt.label}
                    onClick={() => setActive(keys[i])}
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 18px",
                      background: isActive ? "white" : "transparent",
                      border: `1.5px solid ${isActive ? bt.color + "60" : "transparent"}`,
                      borderRadius: 12,
                      cursor: "pointer", textAlign: "left",
                      boxShadow: isActive ? `0 4px 16px ${bt.color}18` : "none",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "white"; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ fontSize: 22 }}>{bt.icon}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? bt.color : "#1a1208" }}>{bt.label}</div>
                      <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 1 }}>Registered via {bt.agency} · {bt.agencyFull}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: document preview */}
          <div style={{
            background: "white", borderRadius: 18, padding: "28px",
            border: "1px solid #f0e8dc",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.55s ease 0.1s",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Required Documents — {activeType.label}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {activeType.docs.map((doc, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "12px 14px",
                  background: "#fafafa", borderRadius: 10,
                  border: "1px solid #f0e8dc",
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: activeType.color + "18",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: activeType.color,
                    flexShrink: 0, marginTop: 1,
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.5 }}>{doc}</span>
                </div>
              ))}
            </div>

            <div style={{
              padding: "11px 14px",
              background: "#fff8f0", borderRadius: 10,
              border: "1px solid #ffd9a8",
              fontSize: 12, color: "#9a3412", lineHeight: 1.55,
            }}>
              <strong>📎 Conditional:</strong> {activeType.conditional}
            </div>

            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #f5f0eb" }}>
              <div style={{ fontSize: 11, color: "#94a3b8", lineHeight: 1.6 }}>
                ✓ All documents submitted digitally · No initial office visit required
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// ─── Video Section ────────────────────────────────────────────────────────────

function VideoSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section style={{ padding: "60px 2rem 100px", background: "white" }}>
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
      <BusinessTypes />
      <VideoSection />
      <Footer />
    </div>
  );
}