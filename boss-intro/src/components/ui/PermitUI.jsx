import { useState, useEffect } from "react";

// ─── Shared keyframes (injected once at module level) ─────────────────────────

const GLOBAL_STYLES = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("permit-ui-styles")) {
  const style = document.createElement("style");
  style.id = "permit-ui-styles";
  style.textContent = GLOBAL_STYLES;
  document.head.appendChild(style);
}

// ─── Shared hook ──────────────────────────────────────────────────────────────

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ─── SectionCard ──────────────────────────────────────────────────────────────

export function SectionCard({ title, accent, children }) {
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

export function DocItem({ number, title, notes, accentColor = "#ff9c43", onClick, isSelected, isMobile }) {
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

// ─── MetaBadge ────────────────────────────────────────────────────────────────

export function MetaBadge({ label, value, color }) {
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

export function StepBlock({ index, step, isLast, onClick, isSelected, isMobile }) {
  return (
    <div
      style={{
        position: "relative",
        cursor: onClick ? "pointer" : "default",
        borderRadius: 12,
        border: `1.5px solid ${isSelected ? "#3b82f660" : "transparent"}`,
        background: isSelected ? "#f0f7ff" : "transparent",
        padding: isSelected ? (isMobile ? "8px 8px 8px 3px" : "10px 10px 10px 4px") : "0",
        transition: "all 0.2s ease",
        boxShadow: isSelected ? "0 0 0 3px #3b82f615" : "none",
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
          background: "linear-gradient(to bottom, #3b82f620, transparent)",
          borderRadius: 1,
        }} />
      )}
      <div style={{ display: "flex", gap: isMobile ? 10 : 12 }}>
        {/* Step number circle */}
        <div style={{
          width: 28, 
          height: 28, 
          borderRadius: "50%",
          background: isSelected ? "#2563eb" : "#3b82f6",
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
            background: "#f0f7ff",
            borderRadius: 9,
            border: "1px solid #bfdbfe",
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
                color: "#1d4ed8", 
                textTransform: "uppercase", 
                letterSpacing: "0.08em", 
              }}>
                Client
              </div>
              {onClick && (
                <span style={{
                  fontSize: isMobile ? 10 : 11,
                  fontWeight: 600,
                  color: "#3b82f6",
                  background: "#dbeafe",
                  border: "1px solid #bfdbfe",
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
              color: "#1e3a8a", 
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
    title: "Application Form",
    icon: "📋",
    files: [
      { name: "Business Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
      { name: "Instructions for Filling Out the Form", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_1: {
    title: "Business Registration Certificate",
    icon: "🏢",
    files: [
      { name: "DTI Registration Guide", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
      { name: "SEC Registration Checklist", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "CDA Registration Info", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },
  req_2: {
    title: "Proof of Business Location",
    icon: "📍",
    files: [
      { name: "Notarized Lease Contract Template", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Affidavit of Non-rental (Sole Prop)", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
      { name: "Secretary's Certificate Template (Corp)", tag: "Template", tagColor: "#8b5cf6", href: "/downloads/reference.pdf" },
    ],
  },
  req_3: {
    title: "Franchise / Tradename Documents",
    icon: "™️",
    files: [
      { name: "Franchise Agreement Sample", tag: "Sample", tagColor: "#f59e0b", href: "/downloads/reference.pdf" },
      { name: "IPO Registration Info", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
    ],
  },
  req_4: {
    title: "Required Clearances",
    icon: "✅",
    files: [
      { name: "Barangay Clearance Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "Zoning Clearance Requirements", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "City Health / Sanitary Permit Info", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
      { name: "ENRO Clearance Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
      { name: "OBO Clearance Guide", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_5: {
    title: "Special Clearances",
    icon: "📂",
    files: [
      { name: "Special Clearance Requirements List", tag: "Checklist", tagColor: "#10b981", href: "/downloads/reference.pdf" },
      { name: "RONO Application Guide (EGAMES/Cockfighting)", tag: "Guide", tagColor: "#3b82f6", href: "/downloads/reference.pdf" },
    ],
  },
  req_6: {
    title: "Owner's Valid ID",
    icon: "🪪",
    files: [
      { name: "Accepted Valid IDs List", tag: "Info", tagColor: "#64748b", href: "/downloads/reference.pdf" },
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
            Documents & Forms
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

// ─── ViewerPlaceholder (kept for backward compat) ────────────────────────────

export function ViewerPlaceholder({ label, accentColor = "#ff9c43" }) {
  return <DocumentViewer selectedKey={null} label={label} accentColor={accentColor} />;
}