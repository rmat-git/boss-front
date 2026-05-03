import { useState, useEffect } from "react";
import { useIsMobile } from "../../hooks/useIsMobile"; // FIX #1: removed duplicate inline hook, import shared

// ─── FIX #3: Removed module-level DOM side-effect (document.createElement at import time).
// @keyframes fadeSlideIn has been moved to App.css / index.css.
// The style injection below is deleted — it ran outside any React lifecycle,
// was fragile in SSR/test environments, and bypassed React's style management.

// ─── SectionCard ──────────────────────────────────────────────────────────────

export function SectionCard({ title, accent, children }) {
  // FIX #8: useIsMobile() called once here via shared hook (not per-instance)
  const isMobile = useIsMobile();

  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      border: "1px solid #f0e8dc",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: isMobile ? "12px 16px" : "14px 20px",
        borderBottom: "1px solid #f5f0eb",
        background: "#fafaf9",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{ width: 3, height: 18, borderRadius: 2, background: accent, flexShrink: 0 }} />
        <span style={{
          fontSize: isMobile ? 14 : 15,
          fontWeight: 700,
          color: "#1a1208"
        }}>
          {title}
        </span>
      </div>
      <div style={{ padding: isMobile ? "14px 16px" : "18px 20px" }}>
        {children}
      </div>
    </div>
  );
}

// ─── SubHeading ───────────────────────────────────────────────────────────────

export function SubHeading({ label, top = 0, accentColor = "#ff9c43" }) {
  return (
    <div style={{
      marginTop: top,
      marginBottom: 10,
      fontSize: 10,
      fontWeight: 700,
      color: accentColor,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    }}>
      {label}
    </div>
  );
}

// ─── DocItem ──────────────────────────────────────────────────────────────────

// FIX #23: DocItem now calls useIsMobile() internally, consistent with all
// other UI components. The isMobile prop is kept as an optional override for
// call sites that already have the value, but the hook is the fallback.
export function DocItem({ number, title, notes, accentColor = "#ff9c43", onClick, isSelected, isMobile: isMobileProp }) {
  const isMobileHook = useIsMobile();
  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileHook;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        gap: 10,
        padding: isMobile ? "9px 11px" : "10px 13px",
        background: isSelected ? accentColor + "12" : "#fafafa",
        borderRadius: 9,
        border: `1px solid ${isSelected ? accentColor + "60" : "#f0e8dc"}`,
        marginBottom: 6,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.18s ease",
        boxShadow: isSelected ? `0 0 0 2px ${accentColor}25` : "none",
      }}
    >
      <span style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: isSelected ? accentColor : accentColor + "18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 800,
        color: isSelected ? "white" : accentColor,
        flexShrink: 0,
        marginTop: 2,
        transition: "all 0.18s ease",
      }}>
        {number}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: isMobile ? 14 : 14.5,
          fontWeight: 600,
          color: "#1a1208",
          lineHeight: 1.45,
          overflowWrap: "break-word"
        }}>
          {title}
        </div>
        {notes && (
          Array.isArray(notes) ? (
            <ul style={{
              margin: "4px 0 0 0",
              paddingLeft: 18,
              fontSize: isMobile ? 13 : 14,
              color: "#5b6572",
              lineHeight: 1.5,
              overflowWrap: "break-word"
            }}>
              {notes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          ) : (
            <div style={{
              fontSize: isMobile ? 13 : 14,
              color: "#5b6572",
              marginTop: 3,
              lineHeight: 1.5,
              overflowWrap: "break-word"
            }}>
              {notes}
            </div>
          )
        )}
      </div>
      {onClick && (
        <span style={{
          alignSelf: "center",
          flexShrink: 0,
          fontSize: 10,
          color: isSelected ? accentColor : "#d1c9c0",
          transition: "color 0.18s ease",
        }}>
          ▶
        </span>
      )}
    </div>
  );
}

// ─── AccordionDocItem ─────────────────────────────────────────────────────────
//
// Header-only row for the New Permit encodingDocs list.
// • Shows title + original ▶ arrow only — no inline bullet expansion.
// • Clicking loads the item's bullets + downloadable files into the right panel
//   (desktop) or the modal (mobile) via onDocClick.
// • isDocSelected drives the selected highlight state (mirrors DocItem behaviour).

export function AccordionDocItem({
  number,
  title,
  accentColor = "#ff9c43",
  onDocClick,
  isDocSelected,
  isMobile: isMobileProp,
}) {
  const isMobileHook = useIsMobile();
  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileHook;

  return (
    <div
      onClick={onDocClick}
      style={{
        display: "flex",
        gap: 10,
        padding: isMobile ? "9px 11px" : "10px 13px",
        background: isDocSelected ? accentColor + "12" : "#fafafa",
        borderRadius: 9,
        border: `1px solid ${isDocSelected ? accentColor + "60" : "#f0e8dc"}`,
        marginBottom: 6,
        cursor: "pointer",
        transition: "all 0.18s ease",
        boxShadow: isDocSelected ? `0 0 0 2px ${accentColor}25` : "none",
        userSelect: "none",
      }}
      onMouseEnter={e => { if (!isDocSelected) e.currentTarget.style.background = accentColor + "08"; }}
      onMouseLeave={e => { if (!isDocSelected) e.currentTarget.style.background = "#fafafa"; }}
    >
      {/* Number badge */}
      <span style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: isDocSelected ? accentColor : accentColor + "18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 800,
        color: isDocSelected ? "white" : accentColor,
        flexShrink: 0,
        marginTop: 2,
        transition: "all 0.18s ease",
      }}>
        {number}
      </span>

      {/* Title */}
      <div style={{
        flex: 1,
        fontSize: isMobile ? 14 : 14.5,
        fontWeight: 600,
        color: "#1a1208",
        lineHeight: 1.45,
        overflowWrap: "break-word",
        alignSelf: "center",
      }}>
        {title}
      </div>

      {/* Original ▶ arrow */}
      <span style={{
        alignSelf: "center",
        flexShrink: 0,
        fontSize: 10,
        color: isDocSelected ? accentColor : "#d1c9c0",
        transition: "color 0.18s ease",
      }}>
        ▶
      </span>
    </div>
  );
}

// ─── ClearanceItem ────────────────────────────────────────────────────────────
//
// Compact clickable row for individual clearance entries inside the
// Required Clearances / Special Clearances sub-sections.
// Shows the clearance name + issuing office, fires onClick to load right panel.

export function ClearanceItem({ title, office, accentColor = "#ff9c43", onClick, isSelected, isMobile: isMobileProp }) {
  const isMobileHook = useIsMobile();
  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileHook;

  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: isMobile ? "7px 10px" : "8px 12px",
        background: isSelected ? accentColor + "12" : "#fafafa",
        borderRadius: 8,
        border: `1px solid ${isSelected ? accentColor + "55" : "#f0e8dc"}`,
        cursor: "pointer",
        transition: "all 0.15s ease",
        boxShadow: isSelected ? `0 0 0 2px ${accentColor}20` : "none",
        userSelect: "none",
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = accentColor + "08"; }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "#fafafa"; }}
    >
      {/* Dot indicator */}
      <span style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: isSelected ? accentColor : accentColor + "50",
        flexShrink: 0,
        transition: "background 0.15s ease",
      }} />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: isMobile ? 12.5 : 13,
          fontWeight: 600,
          color: isSelected ? accentColor : "#1a1208",
          lineHeight: 1.35,
          overflowWrap: "break-word",
          transition: "color 0.15s ease",
        }}>
          {title}
        </div>
        {office && (
          <div style={{
            fontSize: isMobile ? 11 : 11.5,
            color: "#94a3b8",
            marginTop: 1,
            lineHeight: 1.3,
          }}>
            {office}
          </div>
        )}
      </div>

      {/* Arrow */}
      <span style={{
        flexShrink: 0,
        fontSize: 10,
        color: isSelected ? accentColor : "#d1c9c0",
        transition: "color 0.15s ease",
      }}>
        ▶
      </span>
    </div>
  );
}

// ─── MetaBadge ────────────────────────────────────────────────────────────────

export function MetaBadge({ label, value, color }) {
  // FIX #8: still calls useIsMobile() — now uses shared hook, one listener total
  const isMobile = useIsMobile();

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      padding: isMobile ? "3px 8px" : "4px 10px",
      background: color + "10",
      border: `1px solid ${color}30`,
      borderRadius: 999,
      fontSize: isMobile ? 11.5 : 12.5,
    }}>
      <span style={{ fontWeight: 700, color: color }}>{label}:</span>
      <span style={{ color: "#374151" }}>{value}</span>
    </div>
  );
}

// ─── StepBlock ────────────────────────────────────────────────────────────────

// FIX #11: added accentColor prop — defaults to "#3b82f6" to preserve existing
// appearance, but now accepts the section's accentColor for correct theming
// (e.g. orange for New Permit sections).
export function StepBlock({ index, step, isLast, onClick, isSelected, isMobile, accentColor = "#3b82f6" }) {
  return (
    <div
      style={{
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        borderRadius: 12,
        border: `1.5px solid ${isSelected ? accentColor + "60" : "transparent"}`,
        background: isSelected ? accentColor + "0d" : "transparent",
        padding: isSelected ? (isMobile ? "8px 8px 8px 3px" : "10px 10px 10px 4px") : "0",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? `0 0 0 3px ${accentColor}15` : "none",
      }}
      onClick={onClick}
    >
      {!isLast && (
        <div style={{
          position: "absolute",
          left: 14,
          top: 36,
          bottom: -16,
          width: 2,
          background: `linear-gradient(to bottom, ${accentColor}20, transparent)`,
          borderRadius: 1,
        }} />
      )}
      <div style={{ display: "flex", gap: isMobile ? 10 : 12 }}>
        {/* Step number circle */}
        <div style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: isSelected ? accentColor : accentColor + "cc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 15,
          fontWeight: 800,
          color: "white",
          flexShrink: 0,
          zIndex: 1,
          transition: "background 0.18s ease",
        }}>
          {index + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Client action */}
          <div style={{
            padding: isMobile ? "8px 10px" : "9px 12px",
            background: accentColor + "0d",
            borderRadius: 9,
            border: `1px solid ${accentColor}30`,
            marginBottom: 6,
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
            }}>
              <div style={{
                fontSize: isMobile ? 12.5 : 13.5,
                fontWeight: 700,
                color: accentColor,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}>
                Client
              </div>
              {onClick && (
                <span style={{
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 600,
                  color: accentColor,
                  background: accentColor + "18",
                  border: `1px solid ${accentColor}30`,
                  borderRadius: 999,
                  padding: "2px 8px",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}>
                  view docs ›
                </span>
              )}
            </div>
            <div style={{
              fontSize: isMobile ? 13.5 : 14.5,
              color: accentColor + "dd",
              lineHeight: 1.5
            }}>
              {step.client}
            </div>
          </div>
          {/* Agency action */}
          <div style={{
            padding: isMobile ? "8px 10px" : "9px 12px",
            background: "#fafafa",
            borderRadius: 9,
            border: "1px solid #f0e8dc",
            marginBottom: 6,
          }}>
            <div style={{
              fontSize: isMobile ? 12.5 : 13.5,
              fontWeight: 700,
              color: "#e07620",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 3
            }}>
              Agency Action
            </div>
            <div style={{
              fontSize: isMobile ? 13.5 : 14.5,
              color: "#374151",
              lineHeight: 1.5,
              whiteSpace: "pre-line"
            }}>
              {step.agency}
            </div>
          </div>
          {/* Meta row */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {step.fees !== undefined && (
              <MetaBadge label="Fees" value={step.fees} color="#10b981" />
            )}
            {step.time !== undefined && (
              <MetaBadge label="Time" value={step.time} color="#3b82f6" />
            )}
          </div>
          {/* Responsible persons */}
          {step.responsible && (
            <div style={{
              marginTop: 8,
              padding: isMobile ? "7px 10px" : "8px 12px",
              background: "#fafaf9",
              borderRadius: 8,
              border: "1px solid #f0e8dc",
              fontSize: isMobile ? 12 : 13,
              color: "#6b7280",
              lineHeight: 1.55,
            }}>
              <span style={{ fontWeight: 700, color: "#374151" }}>👤 Responsible: </span>
              {Array.isArray(step.responsible)
                ? step.responsible.join(" · ")
                : step.responsible}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DOC_REGISTRY ─────────────────────────────────────────────────────────────

const DOC_REGISTRY = {
  req_0: {
    title: "Proof of Registration",
    icon: "📋",
    notes: [
      "Issued by SEC for all kinds of Corporations, Associations and Partnership",
      "Issued by DTI for Sole / Single Proprietor",
      "Issued by the Cooperative Development Authority for Cooperatives",
      "Other Requirements if applicable: Franchise Agreement, Intellectual Property Office (IPO) registration, etc.",
    ],
    files: [
      { name: "Business Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Instructions for Filling Out the Form", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_1: {
    title: "Proof of Right to Use Location",
    icon: "📍",
    notes: [
      "If owned: Proof of ownership – Tax Declaration / Land Tax Receipt or Building Permit",
      "If not owned by the applicant: Contract of Lease / Memorandum of Agreement / Affidavit of Consent or Conformity from the property owner supported by Proof of ownership or CENTENARIO",
    ],
    files: [
      { name: "Notarized Lease Contract Template", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Affidavit of Non-rental (Sole Prop)", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Secretary's Certificate Template (Corp)", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
    ],
  },
  req_2: {
    title: "Valid Identification (ID) Card",
    icon: "🪪",
    notes: [
      "ID Card of the Owner",
      "If applicable: ID of Authorized Representative with supporting SPA or Secretary Certificate",
    ],
    files: [
      { name: "Accepted Valid IDs List", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },
  // ── Required Clearances — one entry per clearance ─────────────────────────
  req_clearance_0: {
    title: "Barangay Clearance",
    icon: "🏘️",
    where: "Barangay Hall",
    files: [
      { name: "Barangay Clearance Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_1: {
    title: "Fire Safety Inspection Certificate (FSIC)",
    icon: "🔥",
    where: "Bureau of Fire Protection (BFP)",
    files: [
      { name: "BFP FSIC Requirements Checklist", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "Fire Safety Inspection Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_2: {
    title: "Zoning Clearance",
    icon: "🗺️",
    where: "Zoning Division",
    files: [
      { name: "Zoning Clearance Application Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Zoning Requirements Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_3: {
    title: "City Health Office Clearance / Sanitary Permit to Operate",
    icon: "🏥",
    where: "City Health Office",
    files: [
      { name: "Sanitary Permit Application Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "City Health Clearance Requirements", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_4: {
    title: "Office of the Building Official (OBO) Clearance",
    icon: "🏗️",
    where: "Office of the Building Official",
    files: [
      { name: "OBO Clearance Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_clearance_5: {
    title: "CENRO Clearance",
    icon: "🌿",
    where: "CENRO",
    files: [
      { name: "CENRO Clearance Requirements", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  // ── Special Clearances — one entry per clearance ───────────────────────────
  req_special_0: {
    title: "City Agriculture Office Clearance",
    icon: "🌾",
    where: "City Agriculture Office",
    applicableTo: "Agri Products / Agriculture related businesses",
    files: [
      { name: "City Agriculture Clearance Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_1: {
    title: "City Veterinary Office Clearance",
    icon: "🐄",
    where: "City Veterinary Office",
    applicableTo: "Meat and Poultry products",
    files: [
      { name: "Veterinary Clearance Requirements", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_2: {
    title: "City Tourism Office Clearance",
    icon: "🏖️",
    where: "City Tourism Office",
    applicableTo: "Tourism Related businesses",
    files: [
      { name: "Tourism Clearance Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_3: {
    title: "City Administrator Clearance",
    icon: "🏛️",
    where: "Office of the City Administrator",
    applicableTo: "3 Major Markets & Manukan Country",
    files: [
      { name: "City Administrator Clearance Form", tag: "Form", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_4: {
    title: "BTTMD Clearance",
    icon: "🚌",
    where: "BTTMD",
    applicableTo: "BTTMD-regulated businesses",
    files: [
      { name: "BTTMD Clearance Requirements", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_special_5: {
    title: "Resolution of No Objection (RONO)",
    icon: "📜",
    where: "Sangguniang Panlungsod (SP)",
    applicableTo: "EGAMES, Cockfighting and the like",
    files: [
      { name: "RONO Application Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "RONO Sample Form", tag: "Sample", tagColor: "#f59e0b", href: "/downloads/reference.pdf" },
    ],
  },
  new_step_0: {
    title: "Step 1 — Application & Encoding (New)",
    icon: "📝",
    files: [
      { name: "Business Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Requirements Checklist (New Permit)", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "BPLO Counter Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  new_step_1: {
    title: "Step 2 — Assessment & Payment (New)",
    icon: "💳",
    files: [
      { name: "CTO Assessment Form", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Fee Schedule 2025", tag: "Reference", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Online Payment Guide (GCash / PayMaya)", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  new_step_2: {
    title: "Step 3 — Receive Mayor's Permit (New)",
    icon: "📜",
    files: [
      { name: "Mayor's Permit Sample (for reference)", tag: "Sample", tagColor: "#f59e0b", href: "/downloads/reference.pdf" },
      { name: "QR Verification Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "Hard Copy Pickup Instructions", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },
  renewal_step_0: {
    title: "Step 1 — Application & Encoding (Renewal)",
    icon: "📝",
    files: [
      { name: "Pre-printed Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Requirements Checklist (Renewal)", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "BPLO Counter Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  renewal_step_1: {
    title: "Step 2 — Submit & Review (Renewal)",
    icon: "📂",
    files: [
      { name: "Document Submission Checklist", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "Assessment Form", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
    ],
  },
  renewal_step_2: {
    title: "Step 3 — Receive Mayor's Permit (Renewal)",
    icon: "📜",
    files: [
      { name: "Mayor's Permit Sample (for reference)", tag: "Sample", tagColor: "#f59e0b", href: "/downloads/reference.pdf" },
      { name: "QR Verification Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "Hard Copy Pickup Instructions", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },
};

export function DocumentViewer({ selectedKey, label, accentColor = "#ff9c43" }) {
  const isMobile = useIsMobile();
  const docSet = selectedKey ? DOC_REGISTRY[selectedKey] : null;

  if (!docSet) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: accentColor + "06",
        border: `2px dashed ${accentColor}40`,
        borderRadius: 14,
        padding: isMobile ? "30px 16px" : "40px 24px",
        textAlign: "center",
        gap: 16,
        minHeight: isMobile ? 280 : 340,
      }}>
        <div style={{
          width: isMobile ? 56 : 68,
          height: isMobile ? 56 : 68,
          borderRadius: 18,
          background: accentColor + "18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isMobile ? 28 : 32,
        }}>
          📄
        </div>
        <div>
          <div style={{
            fontSize: isMobile ? 14 : 15,
            fontWeight: 700,
            color: "#1a1208",
            marginBottom: 6
          }}>
            Document Viewer
          </div>
          <div style={{
            fontSize: isMobile ? 12 : 13,
            color: "#94a3b8",
            lineHeight: 1.6,
            maxWidth: 240
          }}>
            Click any requirement or step on the left to view related downloadable documents and forms.
          </div>
        </div>
        <div style={{
          padding: isMobile ? "6px 12px" : "8px 16px",
          background: "white",
          border: `1.5px dashed ${accentColor}70`,
          borderRadius: 999,
          fontSize: isMobile ? 10 : 11,
          color: accentColor,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}>
          ← Select an item
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "white",
      borderRadius: 14,
      border: `1.5px solid ${accentColor}30`,
      overflow: "hidden",
      animation: "fadeSlideIn 0.22s ease",
    }}>
      {/* Header */}
      <div style={{
        padding: isMobile ? "12px 14px" : "14px 18px",
        background: accentColor + "10",
        borderBottom: `1px solid ${accentColor}20`,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div>
          <div style={{
            fontSize: 10,
            fontWeight: 700,
            color: accentColor,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 1
          }}>
            {docSet.notes ? "Requirements & Documents" : (docSet.where || docSet.applicableTo) ? "Clearance Details" : "Documents & Forms"}
          </div>
          <div style={{
            fontSize: isMobile ? 13.5 : 14.5,
            fontWeight: 700,
            color: "#1a1208",
            lineHeight: 1.3
          }}>
            {docSet.title}
          </div>
        </div>
      </div>

      {/* Notes / bullets — req_* items */}
      {docSet.notes && docSet.notes.length > 0 && (
        <div style={{
          padding: isMobile ? "10px 14px 4px" : "12px 18px 4px",
          borderBottom: `1px solid ${accentColor}14`,
        }}>
          <div style={{
            fontSize: isMobile ? 10 : 10.5,
            fontWeight: 700,
            color: accentColor,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 6,
          }}>
            Details
          </div>
          <ul style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: isMobile ? 12.5 : 13,
            color: "#4b5563",
            lineHeight: 1.65,
          }}>
            {docSet.notes.map((note, i) => (
              <li key={i} style={{ marginBottom: i < docSet.notes.length - 1 ? 4 : 8 }}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Where to get / applicable to — clearance entries */}
      {(docSet.where || docSet.applicableTo) && (
        <div style={{
          padding: isMobile ? "10px 14px 8px" : "12px 18px 8px",
          borderBottom: `1px solid ${accentColor}14`,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}>
          {docSet.where && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
              <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>📍</span>
              <div>
                <div style={{
                  fontSize: isMobile ? 9.5 : 10,
                  fontWeight: 700,
                  color: accentColor,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 1,
                }}>
                  Where to get
                </div>
                <div style={{ fontSize: isMobile ? 12.5 : 13, color: "#374151", fontWeight: 500 }}>
                  {docSet.where}
                </div>
              </div>
            </div>
          )}
          {docSet.applicableTo && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
              <span style={{ fontSize: 13, flexShrink: 0, marginTop: 1 }}>🏷️</span>
              <div>
                <div style={{
                  fontSize: isMobile ? 9.5 : 10,
                  fontWeight: 700,
                  color: "#f59e0b",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 1,
                }}>
                  Applicable to
                </div>
                <div style={{ fontSize: isMobile ? 12.5 : 13, color: "#374151", fontWeight: 500 }}>
                  {docSet.applicableTo}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* File list */}
      <div style={{ padding: isMobile ? "12px 14px" : "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {docSet.files.map((file, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 8 : 10,
            padding: isMobile ? "9px 12px" : "11px 14px",
            background: "#fafaf9",
            border: "1px solid #f0e8dc",
            borderRadius: 9,
            transition: "background 0.15s ease",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "#f5efe8"}
            onMouseLeave={e => e.currentTarget.style.background = "#fafaf9"}
          >
            <span style={{ fontSize: isMobile ? 16 : 18, flexShrink: 0 }}>📎</span>
            <span style={{
              fontSize: isMobile ? 12.5 : 13.5,
              color: "#374151",
              fontWeight: 500,
              flex: 1,
              lineHeight: 1.4
            }}>
              {file.name}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 6, flexShrink: 0 }}>
              <span style={{
                padding: isMobile ? "2px 6px" : "2px 8px",
                background: file.tagColor + "18",
                border: `1px solid ${file.tagColor}40`,
                borderRadius: 999,
                fontSize: isMobile ? 9.5 : 10.5,
                color: file.tagColor,
                fontWeight: 700,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}>
                {file.tag}
              </span>
              {file.href ? (
                <a
                  href={file.href}
                  download
                  style={{
                    padding: isMobile ? "4px 8px" : "5px 12px",
                    background: accentColor,
                    color: "white",
                    border: "none",
                    borderRadius: 7,
                    fontSize: isMobile ? 10.5 : 11.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "opacity 0.15s ease",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                >
                  ↓ {isMobile ? "DL" : "Download"}
                </a>
              ) : (
                <button
                  style={{
                    padding: isMobile ? "4px 8px" : "5px 12px",
                    background: "#e2e8f0",
                    color: "#94a3b8",
                    border: "none",
                    borderRadius: 7,
                    fontSize: isMobile ? 10.5 : 11.5,
                    fontWeight: 700,
                    cursor: "not-allowed",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                  disabled
                >
                  ↓ {isMobile ? "DL" : "Download"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{
        margin: isMobile ? "0 14px 12px" : "0 16px 14px",
        padding: isMobile ? "8px 12px" : "10px 14px",
        background: "#fffbeb",
        border: "1px solid #fde68a",
        borderRadius: 9,
        fontSize: isMobile ? 11 : 12,
        color: "#92400e",
        lineHeight: 1.6,
      }}>
        <strong>📌 Note:</strong> Downloads are for reference only. Submit original or certified true copies as required. Contact CMO–BPLO for the most current versions.
      </div>
    </div>
  );
}

// FIX #10: ViewerPlaceholder removed — nothing in the project imports it.
// If a consumer needs it in future, re-add with a documented import site.