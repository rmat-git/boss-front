import { useInView } from "../../hooks/useInView";
import { YOUTUBE_VIDEO_ID } from "../../data/constants";

export default function VideoSection() {
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