import "./App.css";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import AgencyStrip from "./components/layout/AgencyStrip";
import VideoSection from "./components/layout/VideoSection";
import Footer from "./components/layout/Footer";
import { HowItWorks, RenewalSection } from "./pages/public/PermitPages";

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