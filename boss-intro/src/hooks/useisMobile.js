import { useState, useEffect } from "react";
import { MOBILE_BREAKPOINT } from "../data/constants"; // FIX #24: single source of truth for breakpoint

/**
 * useIsMobile
 *
 * Returns true when the viewport width is below MOBILE_BREAKPOINT (900px).
 * Centralises the resize-listener logic that was previously duplicated in
 * PermitUI.jsx and PermitSection.jsx (audit issues #1, #2, #8, #24).
 *
 * Usage:
 *   const isMobile = useIsMobile();
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []); // MOBILE_BREAKPOINT is a module-level constant — no memoisation needed

  return isMobile;
}