import { useState, useCallback, useEffect, useRef } from "react";
import { useInView } from "../../hooks/useInView";
import { SectionCard, SubHeading, DocItem, StepBlock, DocumentViewer } from "../ui/PermitUI";

// ─── Mobile Document Viewer Modal ─────────────────────────────────────────────

function DocModal({ selectedKey, label, accentColor, onClose }) {
  const overlayRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Trigger enter animation after first paint
  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on backdrop click
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // MOBILE FIX: Responsive padding
        padding: window.innerWidth < 400 ? "12px 12px" : "20px 16px",
        background: mounted ? "rgba(15, 10, 5, 0.55)" : "rgba(15, 10, 5, 0)",
        backdropFilter: mounted ? "blur(6px)" : "blur(0px)",
        WebkitBackdropFilter: mounted ? "blur(6px)" : "blur(0px)",
        transition: "background 0.25s ease, backdrop-filter 0.25s ease",
      }}
    >
      <div
        style={{
          width: "100%",
          // MOBILE FIX: Responsive max-width — 95vw on tiny phones, 480px on larger mobile
          maxWidth: window.innerWidth < 380 ? "95vw" : 480,
          maxHeight: "85vh",
          overflowY: "auto",
          borderRadius: 20,
          background: "white",
          boxShadow: "0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.08)",
          border: `1.5px solid ${accentColor}30`,
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scale(1) translateY(0)" : "scale(0.94) translateY(16px)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        {/* Sticky modal header */}
        <div style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 18px",
          background: "white",
          borderBottom: `1px solid ${accentColor}18`,
          borderRadius: "20px 20px 0 0",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 3, height: 16, borderRadius: 2, background: accentColor }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1a1208" }}>Documents & Forms</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close document viewer"
            style={{
              width: 32, height: 32,
              borderRadius: "50%",
              border: "1.5px solid #e5e0d8",
              background: "#fafaf9",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 15, color: "#64748b",
              cursor: "pointer",
              transition: "all 0.15s ease",
              flexShrink: 0,
              lineHeight: 1,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#f0e8dc"; e.currentTarget.style.color = "#1a1208"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#fafaf9"; e.currentTarget.style.color = "#64748b"; }}
          >
            ✕
          </button>
        </div>

        {/* DocumentViewer body */}
        <div style={{ padding: "16px" }}>
          <DocumentViewer
            selectedKey={selectedKey}
            label={label}
            accentColor={accentColor}
          />
        </div>
      </div>
    </div>
  );
}

// ─── PermitSection ─────────────────────────────────────────────────────────────

export default function PermitSection({ id, data, bg, accentColor, borderColor }) {
  const [ref, visible] = useInView(0.06);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const isRenewal = id === "renewal";
  const reqPrefix = isRenewal ? "renewal_req" : "req";
  const stepPrefix = isRenewal ? "renewal_step" : "new_step";

  // Reactively track viewport width
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleDocClick = useCallback((key) => {
    setSelectedKey(prev => {
      const next = prev === key ? null : key;
      if (next) setModalOpen(true); // always open modal on mobile when selecting
      return next;
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    // Keep selectedKey intact so desktop stays highlighted if user resizes
  }, []);

  let globalReceivingCounter = 0;

  // MOBILE FIX: Responsive padding — 1rem on mobile, 2rem on desktop
  const sectionPadding = isMobile ? "1.5rem 1rem" : "100px 2rem";
  
  // MOBILE FIX: Responsive header margins
  const headerMarginBottom = isMobile ? 28 : 44;
  
  // MOBILE FIX: Responsive meta grid gap
  const metaGap = isMobile ? 12 : undefined;

  return (
    <section id={id} style={{ padding: sectionPadding, background: bg, scrollMarginTop: 120 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Header */}
        <div ref={ref} style={{
          textAlign: "center", 
          marginBottom: headerMarginBottom,
          opacity: visible ? 1 : 0, 
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.55s ease",
        }}>
          <div style={{ 
            fontSize: isMobile ? 11 : 13, 
            fontWeight: 700, 
            color: accentColor, 
            letterSpacing: "0.12em", 
            textTransform: "uppercase", 
            marginBottom: 10 
          }}>
            Requirements & Procedure
          </div>
          <h2 style={{ 
            fontSize: isMobile ? "clamp(1.5rem, 5vw, 2.8rem)" : "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 800, 
            color: "#1a1208", 
            letterSpacing: "-0.5px", 
            marginBottom: 14 
          }}>
            {data.label}
          </h2>
          <p style={{ 
            fontSize: isMobile ? 14 : 16, 
            color: "#64748b", 
            maxWidth: 580, 
            margin: "0 auto", 
            lineHeight: 1.7,
            paddingX: isMobile ? "1rem" : "0"
          }}>
            Complete checklist of requirements and step-by-step procedure flow as prescribed by the City Mayor's Office — Permits and Licensing Division.
          </p>
        </div>

        {/* Meta Info Bar */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile 
            ? "repeat(2, 1fr)" 
            : "repeat(auto-fit, minmax(140px, 1fr))",
          marginBottom: 36,
          borderRadius: 14,
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
          gap: metaGap,
        }}>
          {[
            { label: "Classification", value: data.classification },
            { label: "Transaction Type", value: data.transaction },
            { label: "Who May Avail", value: data.whoMayAvail },
            { label: "Total Processing Time", value: data.totalTime },
          ].map((item) => (
            <div key={item.label} style={{
              padding: isMobile ? "10px 12px" : "12px 14px",
              background: "white",
              boxShadow: `inset -1px -1px 0 ${borderColor}`,
              fontSize: isMobile ? 12 : 14,
            }}>
              <div style={{ fontWeight: 700, color: accentColor, fontSize: isMobile ? 10 : 11, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                {item.label}
              </div>
              {/* MOBILE STRETCH FIX: Added overflowWrap */}
              <div style={{ fontWeight: 600, color: "#1a1208", lineHeight: 1.3, overflowWrap: "anywhere" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile hint pill — surfaces the tap-to-view affordance */}
        {isMobile && (
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
            padding: "8px 16px",
            background: accentColor + "12",
            border: `1px dashed ${accentColor}50`,
            borderRadius: 999,
            fontSize: 12, fontWeight: 600, color: accentColor,
            width: "fit-content", margin: "0 auto 20px",
          }}>
            <span style={{ fontSize: 14 }}>📄</span>
            Tap any item to view related documents
          </div>
        )}

        {/* Grid — single column on mobile, two columns on desktop */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: isMobile ? 18 : 28,
          alignItems: "start",
        }}>

          {/* Left: Requirements + Procedure */}
          {/* MOBILE STRETCH FIX: Added minWidth: 0 to the flex column wrapper */}
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 16 : 22, minWidth: 0 }}>

            <SectionCard title="Checklist of Requirements" accent={accentColor}>
              <SubHeading label="For Encoding" accentColor={accentColor} />
              {data.encodingDocs.map((doc, i) => {
                const key = `${reqPrefix}_${i}`;
                return (
                  <DocItem
                    key={key}
                    number={i + 1}
                    title={doc.title}
                    notes={doc.notes}
                    accentColor={accentColor}
                    onClick={() => handleDocClick(key)}
                    isSelected={selectedKey === key}
                    isMobile={isMobile}
                  />
                );
              })}

              <div style={{
                marginTop: 14, 
                padding: isMobile ? "11px 13px" : "13px 15px",
                background: "#fffbeb", 
                border: "1px solid #fde68a",
                borderRadius: 10, 
                fontSize: isMobile ? 13 : 14, 
                color: "#78350f", 
                lineHeight: 1.65,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>📝 If transacting on behalf of the Owner:</div>
                <div style={{ marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>To Process only: </span>
                  {Array.isArray(data.proxyNote.toProcess)
                    ? data.proxyNote.toProcess.join(" · ")
                    : data.proxyNote.toProcess}
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>To Sign: </span>
                  {Array.isArray(data.proxyNote.toSign)
                    ? data.proxyNote.toSign.join(" · ")
                    : data.proxyNote.toSign}
                </div>
              </div>

              <SubHeading label="Upon Receiving / Submission" top={18} accentColor={accentColor} />

              {typeof data.receivingDocs[0] === "string"
                ? data.receivingDocs.map((doc, i) => (
                    <DocItem 
                      key={i} 
                      number={i + 1} 
                      title={doc} 
                      notes={null} 
                      accentColor={accentColor} 
                      isMobile={isMobile}
                    />
                  ))
                : data.receivingDocs.map((group, gi) => (
                    <div key={gi}>
                      {group.groupLabel && (
                        <div style={{
                          margin: gi === 0 ? "0 0 8px 0" : "16px 0 8px 0",
                          padding: "6px 12px",
                          background: accentColor + "12",
                          border: `1px solid ${accentColor}30`,
                          borderRadius: 8, 
                          fontSize: isMobile ? 10.5 : 11.5, 
                          fontWeight: 700,
                          color: accentColor, 
                          letterSpacing: "0.07em", 
                          textTransform: "uppercase",
                        }}>
                          📂 {group.groupLabel}
                        </div>
                      )}
                      {group.items.map((doc) => {
                        globalReceivingCounter += 1;
                        return (
                          <DocItem
                            key={globalReceivingCounter}
                            number={globalReceivingCounter}
                            title={doc.title}
                            notes={doc.notes}
                            accentColor={accentColor}
                            isMobile={isMobile}
                          />
                        );
                      })}
                    </div>
                  ))
              }

              <div style={{
                marginTop: 14, 
                padding: isMobile ? "11px 13px" : "13px 15px",
                background: "#eff6ff", 
                border: "1px solid #bfdbfe",
                borderRadius: 10, 
                fontSize: isMobile ? 13 : 14, 
                color: "#1e3a8a", 
                lineHeight: 1.65,
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>📥 Upon Submission:</div>
                <div style={{ marginBottom: 5 }}>
                  <span style={{ fontWeight: 600 }}>Present originals </span>
                  together with <span style={{ fontWeight: 600 }}>one (1) photocopy each</span> of all encoded requirements at the receiving window.
                </div>
                <div>
                  <span style={{ fontWeight: 600 }}>Receiving officer</span> will verify completeness before issuing your <span style={{ fontWeight: 600 }}>Official Receipt</span> and Order of Payment.
                </div>
              </div>

              <div style={{
                marginTop: 12, 
                padding: isMobile ? "10px 12px" : "11px 14px",
                background: "#f0fdf4", 
                border: "1px solid #86efac",
                borderRadius: 10, 
                fontSize: isMobile ? 13 : 14, 
                color: "#14532d", 
                lineHeight: 1.6,
              }}>
                <span style={{ fontWeight: 700 }}>📍 Where to Secure: </span>{data.whereToSecure}
              </div>
            </SectionCard>

            <SectionCard title="Procedure Flow" accent="#3b82f6">
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 14 : 18 }}>
                {data.steps.map((step, i) => {
                  const key = `${stepPrefix}_${i}`;
                  return (
                    <StepBlock
                      key={key}
                      index={i}
                      step={step}
                      isLast={i === data.steps.length - 1}
                      onClick={() => handleDocClick(key)}
                      isSelected={selectedKey === key}
                      isMobile={isMobile}
                    />
                  );
                })}
              </div>
              <div style={{
                marginTop: 22, 
                padding: isMobile ? "12px 14px" : "14px 18px",
                background: "#fff8f0", 
                border: "1px solid #ffd9a8",
                borderRadius: 10, 
                display: "flex", 
                alignItems: "center", 
                gap: isMobile ? 10 : 12,
              }}>
                <span style={{ fontSize: isMobile ? 18 : 22 }}>⏱</span>
                <div>
                  <div style={{ 
                    fontSize: isMobile ? 11 : 12, 
                    fontWeight: 700, 
                    color: "#e07620", 
                    textTransform: "uppercase", 
                    letterSpacing: "0.08em", 
                    marginBottom: 2 
                  }}>
                    Total Processing Time
                  </div>
                  <div style={{ 
                    fontSize: isMobile ? 15 : 17, 
                    fontWeight: 800, 
                    color: "#1a1208" 
                  }}>
                    {data.totalTime}
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right: sticky Document Viewer — desktop only, replaced by modal on mobile */}
          {!isMobile && (
            <div style={{ position: "sticky", top: 140 }}>
              <SectionCard title="Documents & Forms" accent={accentColor}>
                <DocumentViewer
                  selectedKey={selectedKey}
                  label={`${data.label} documents`}
                  accentColor={accentColor}
                />
              </SectionCard>
            </div>
          )}
        </div>

        {/* RA 11032 Note */}
        <div style={{
          marginTop: 32, 
          padding: isMobile ? "14px 16px" : "16px 24px",
          background: "#fff8f0", 
          border: "1px solid #ffd9a8",
          borderRadius: 12, 
          fontSize: isMobile ? 13 : 15, 
          color: "#9a3412",
          textAlign: "center", 
          lineHeight: 1.7,
        }}>
          <strong>⚖️ RA 11032 (Ease of Doing Business Act):</strong> Simple transactions must be processed within{" "}
          <strong>3 working days</strong>; complex ones within <strong>7 working days</strong>. EBIS 4.0 tracks each department's clearance status in real time.
        </div>
      </div>

      {/* Mobile modal — floats above everything, outside the grid */}
      {isMobile && modalOpen && selectedKey && (
        <DocModal
          selectedKey={selectedKey}
          label={`${data.label} documents`}
          accentColor={accentColor}
          onClose={closeModal}
        />
      )}
    </section>
  );
}