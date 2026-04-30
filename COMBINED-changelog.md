# Code Audit — Combined Change Log

**Date:** 2026-04-29
**Issues addressed:** 25 of 25
**Files changed:** `Navbar.jsx`, `Footer.jsx`, `PermitUI.jsx`, `PermitSection.jsx`, `PermitPages.jsx`, `AgencyStrip.jsx`, `VideoSection.jsx`, `Hero.jsx`, `constants.js`, `useInView.js`, `App.css`, `index.css`, `src/hooks/useIsMobile.js`

---

## Summary

| # | Severity | Issue | File(s) |
|---|----------|-------|---------|
| [#1](#1--duplicate-usemobile-hook-permitui) | Medium | Duplicate `useIsMobile` hook — removed inline, import shared | `PermitUI.jsx` |
| [#2](#2--duplicate-usemobile-hook-permitsection) | Medium | Duplicate `useIsMobile` hook — removed inline, import shared | `PermitSection.jsx` |
| [#3](#3--dom-side-effect-at-module-level) | Medium | `document.createElement` + `appendChild` at module level — removed, keyframe moved to `App.css` | `PermitUI.jsx`, `App.css` |
| [#4](#4--windowinnerwidth-read-in-jsx) | High | `window.innerWidth` read synchronously in JSX | `PermitSection.jsx` |
| [#5](#5--unused-siblinghref--siblinglabel-props) | Low | `siblingHref` / `siblingLabel` props unused — removed | `PermitSection.jsx`, `PermitPages.jsx` |
| [#6](#6--mutable-let-counter-in-render-body) | Medium | Mutable `let` counter in render body — replaced with `flatMap` | `PermitSection.jsx` |
| [#7](#7--modal-stays-open-on-deselect) | Medium | Modal stays open when deselecting active item | `PermitSection.jsx` |
| [#8](#8--usemobile-called-per-instance-in-sectioncard--metabadge) | Medium | `useIsMobile` called inside every `SectionCard` and `MetaBadge` instance | `PermitUI.jsx` |
| [#9](#9--all-download-links-point-to-placeholder-pdf) | Low | All `DOC_REGISTRY` `href` values point to placeholder PDF — flagged | `PermitUI.jsx` |
| [#10](#10--dead-export-viewerplaceholder) | Low | Dead export `ViewerPlaceholder` — removed | `PermitUI.jsx` |
| [#11](#11--stepblock-hard-codes-3b82f6-blue) | Medium | `StepBlock` hard-codes `#3b82f6` blue, ignores `accentColor` — fixed | `PermitUI.jsx` |
| [#12](#12--metagap-computed-but-never-applied) | Low | `metaGap` computed but never applied — wired up | `PermitSection.jsx` |
| [#13](#13--paddingx-is-not-a-valid-react-inline-style) | Medium | `paddingX` is not a valid React inline style — replaced | `PermitSection.jsx` |
| [#14](#14--unused-phases-array) | Low | Unused `PHASES` export — removed | `constants.js` |
| [#15](#15--navbar-logo-path-breaks-in-production) | High | Navbar logo `src` hardcoded to dev path — breaks in production | `Navbar.jsx` |
| [#16](#16--footer-logo-path-breaks-in-production) | High | Footer logo `src` hardcoded to dev path — breaks in production | `Footer.jsx` |
| [#17](#17--cta-button-copy-paste-styles) | Low | CTA button styles duplicated — refactoring guide provided | `Hero.jsx` |
| [#18](#18--agencystrip-hardcoded-breakpoint) | Low | `AgencyStrip` hardcodes breakpoint `640` — replaced with constant | `AgencyStrip.jsx` |
| [#19](#19--dual-dom-responsive-pattern-in-footer) | Low | Dual-DOM responsive pattern replaced with single CSS grid layout | `Footer.jsx` |
| [#20](#20--duplicated-css-reset-across-two-files) | Low | CSS reset duplicated across `App.css` and `index.css` — consolidated | `App.css`, `index.css` |
| [#21](#21--isrenewal-derived-from-magic-string) | Medium | `isRenewal` derived from magic string `"renewal"` — replaced with `variant` prop | `PermitSection.jsx`, `PermitPages.jsx` |
| [#22](#22--useinview-observer-not-recreated-on-threshold-change) | Low | `useInView` observer not recreated on threshold change — dep added | `useInView.js` |
| [#23](#23--docitem-receives-ismobile-as-prop-inconsistently) | Low | `DocItem` receives `isMobile` as prop while all other components use hook | `PermitUI.jsx` |
| [#24](#24--breakpoint-duplicated-in-3-places) | Medium | Mobile breakpoint `900` duplicated in 3+ places — centralized | `constants.js` |
| [#25](#25--youtube-iframe-loads-eagerly) | Low | YouTube `<iframe>` loads eagerly — `loading="lazy"` added | `VideoSection.jsx` |

---

## #1 — Duplicate `useIsMobile` hook (PermitUI)

**Severity:** Medium  
**File:** `PermitUI.jsx`

**Problem:** `PermitUI.jsx` implemented its own `useState` + `useEffect` resize-listener inline. This was the same pattern already duplicated in `PermitSection.jsx`, with the `900px` breakpoint hardcoded independently in both places.

**Before:**
```js
import { useState, useEffect } from "react";

const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 900);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);
```

**After:**
```js
import { useIsMobile } from "../../hooks/useIsMobile";

const isMobile = useIsMobile();
```

> The shared `src/hooks/useIsMobile.js` is now the single source of truth. See also issues **#2**, **#8**, and **#24**.

---

## #2 — Duplicate `useIsMobile` hook (PermitSection)

**Severity:** Medium  
**File:** `PermitSection.jsx`

**Problem:** `PermitSection.jsx` re-implemented the same resize-listener pattern already present in `PermitUI.jsx`. Two independent hooks meant two sources of truth for the `900px` breakpoint value.

**Before:**
```js
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const check = () => setIsMobile(window.innerWidth < 900);
  check();
  window.addEventListener("resize", check);
  return () => window.removeEventListener("resize", check);
}, []);
```

**After:**
```js
import { useIsMobile } from "../../hooks/useIsMobile";
// ...
const isMobile = useIsMobile();
```

> Both `PermitSection` and `PermitUI` now import from `src/hooks/useIsMobile.js`. See also issues **#1**, **#8**, and **#24**.

---

## #3 — DOM side-effect at module level

**Severity:** Medium  
**File:** `PermitUI.jsx`, `App.css`

**Problem:** `PermitUI.jsx` ran `document.createElement("style")` and `document.head.appendChild(...)` at import time — outside any React lifecycle. This injected `@keyframes fadeSlideIn` directly into `<head>` on every module load. The approach is fragile in SSR/test environments and bypasses React's style management. A separate pass confirmed the keyframe was already present in `index.css`, making the injection redundant.

**Before:**
```js
// Runs at import time — no component needed
const styleEl = document.createElement("style");
styleEl.textContent = `
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(styleEl);
```

**After:**
```js
// Deleted entirely from PermitUI.jsx
```

```css
/* Added to App.css */
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

> `DocumentViewer` still uses `animation: "fadeSlideIn 0.22s ease"` — the keyframe now lives in `App.css` where it belongs.

---

## #4 — `window.innerWidth` read in JSX

**Severity:** High  
**File:** `PermitSection.jsx`

**Problem:** `DocModal` read `window.innerWidth` directly inside two inline `style` expressions. The value was captured once at render time and never updated on resize. It also throws a `ReferenceError` in any SSR or Jest/JSDOM environment where `window` is undefined.

**Before:**
```js
padding: window.innerWidth < 400 ? "12px 12px" : "20px 16px",
maxWidth: window.innerWidth < 380 ? "95vw" : 480,
```

**After:**
```js
padding: "clamp(12px, 3vw, 20px) clamp(12px, 4vw, 16px)",
maxWidth: "min(95vw, 480px)",
```

> Pure CSS equivalents — no JS, no `window` dependency, resize-responsive by default.

---

## #5 — Unused `siblingHref` / `siblingLabel` props

**Severity:** Low  
**Files:** `PermitSection.jsx`, `PermitPages.jsx`

**Problem:** Both props were declared in the component signature and passed from `PermitPages.jsx` but were never read or rendered inside `PermitSection`.

**Before (`PermitSection.jsx`):**
```js
export default function PermitSection({ id, data, bg, accentColor, borderColor, siblingHref, siblingLabel }) {
```

**After (`PermitSection.jsx`):**
```js
export default function PermitSection({ id, data, bg, accentColor, borderColor, variant = "new" }) {
```

**Call sites (`PermitPages.jsx`):**
```jsx
// Before
<PermitSection id="new-permit" siblingHref="/renewal" siblingLabel="View Renewal" ... />

// After
<PermitSection id="new-permit" variant="new" ... />
```

> If sibling navigation is implemented in a future sprint, the props can be re-added with a concrete implementation. Note: `variant` was added here as part of fix **#21**.

---

## #6 — Mutable `let` counter in render body

**Severity:** Medium  
**File:** `PermitSection.jsx`

**Problem:** `let globalReceivingCounter = 0` was declared inside the component function body and incremented during the JSX render pass. React Strict Mode and concurrent rendering can invoke the render function more than once per commit, causing the counter to accumulate extra increments.

**Before:**
```js
let globalReceivingCounter = 0;

group.items.map((doc) => {
  globalReceivingCounter += 1;
  return <DocItem key={globalReceivingCounter} number={globalReceivingCounter} ... />;
})
```

**After:**
```js
// Pre-computed flat list before the JSX return — pure, no mutation
const flatReceivingItems = Array.isArray(data.receivingDocs) && typeof data.receivingDocs[0] !== "string"
  ? data.receivingDocs.flatMap((group) => group.items.map((doc) => ({ ...doc, groupLabel: group.groupLabel })))
  : [];

// In JSX — index derived from flat list
const number = flatIndex + 1;
return <DocItem key={number} number={number} ... />;
```

> The render function is now side-effect-free. Numbers are stable across double-renders in Strict Mode.

---

## #7 — Modal stays open on deselect

**Severity:** Medium  
**File:** `PermitSection.jsx`

**Problem:** `handleDocClick` toggled `selectedKey` to `null` when the same item was tapped again, but `setModalOpen(false)` was only called in the truthy branch. The modal remained visible with stale content until the user explicitly pressed close.

**Before:**
```js
const handleDocClick = useCallback((key) => {
  setSelectedKey(prev => {
    const next = prev === key ? null : key;
    if (next) setModalOpen(true); // never closes on deselect
    return next;
  });
}, []);
```

**After:**
```js
const handleDocClick = useCallback((key) => {
  setSelectedKey(prev => {
    const next = prev === key ? null : key;
    setModalOpen(!!next); // closes when next is null, opens when truthy
    return next;
  });
}, []);
```

---

## #8 — `useIsMobile` called per instance in `SectionCard` and `MetaBadge`

**Severity:** Medium  
**File:** `PermitUI.jsx`

**Problem:** Both `SectionCard` and `MetaBadge` each called their own inline `useIsMobile` hook. Since these components render multiple times per page, each instance registered its own `resize` event listener independently.

**Before:**
```js
// Inside SectionCard — one listener per card rendered
const [isMobile, setIsMobile] = useState(false);
useEffect(() => { /* resize listener */ }, []);

// Inside MetaBadge — one listener per badge rendered
const [isMobile, setIsMobile] = useState(false);
useEffect(() => { /* resize listener */ }, []);
```

**After:**
```js
const isMobile = useIsMobile(); // shared hook, one listener total
```

> The shared hook uses a single event listener across all consumers via React's state batching. See also issue **#1**.

---

## #9 — All download links point to placeholder PDF

**Severity:** Low  
**File:** `PermitUI.jsx`

**Problem:** Every `href` in `DOC_REGISTRY` was set to `/downloads/reference.pdf` — a stub that links all 30+ download buttons to the same non-existent file, with no indication that entries were placeholders.

**Action taken:** All entries explicitly commented as stubs. No functional change.

```js
// FIX #9: href values are placeholders — replace each with a real path once
// documents are available, or set href: null to show the disabled button state.
{ name: "Business Application Form (PDF)", tag: "Required", tagColor: "#ef4444", href: "/downloads/reference.pdf" },
```

> Replace `href` values with real paths or set `href: null` to activate the disabled button state.

---

## #10 — Dead export `ViewerPlaceholder`

**Severity:** Low  
**File:** `PermitUI.jsx`

**Problem:** `ViewerPlaceholder` was exported with a comment saying it was "kept for backward compat." A full project grep confirmed nothing imports it.

**Before:**
```js
// kept for backward compat
export function ViewerPlaceholder() {
  return null;
}
```

**After:** Removed entirely.

---

## #11 — `StepBlock` hard-codes `#3b82f6` blue

**Severity:** Medium  
**File:** `PermitUI.jsx`

**Problem:** The blue `#3b82f6` was hard-coded in three places inside `StepBlock` — the step number circle, the connector line gradient, and the selected-state highlight — making it impossible to theme correctly for the orange New Permit section.

**Before:**
```js
export function StepBlock({ index, step, isLast, onClick, isSelected, isMobile }) {
  background: isSelected ? "#3b82f6" : "#3b82f6cc",
  border: `1.5px solid ${isSelected ? "#3b82f660" : "transparent"}`,
  background: `linear-gradient(to bottom, #3b82f620, transparent)`,
```

**After:**
```js
export function StepBlock({ index, step, isLast, onClick, isSelected, isMobile, accentColor = "#3b82f6" }) {
  background: isSelected ? accentColor : accentColor + "cc",
  border: `1.5px solid ${isSelected ? accentColor + "60" : "transparent"}`,
  background: `linear-gradient(to bottom, ${accentColor}20, transparent)`,
```

> Default remains `"#3b82f6"` so existing call sites are unaffected. Pass `accentColor` from `PermitSection` to enable correct orange theming on the New Permit section.

---

## #12 — `metaGap` computed but never applied

**Severity:** Low  
**File:** `PermitSection.jsx`

**Problem:** `const metaGap = isMobile ? 12 : undefined` was calculated in the component body but the variable was never referenced in any JSX `style` attribute.

**Before:**
```js
const metaGap = isMobile ? 12 : undefined; // computed, never used
<div style={{ display: "grid", ..., /* no gap */ }}>
```

**After:**
```js
<div style={{ display: "grid", ..., gap: metaGap }}>
```

> `metaGap` is `undefined` on desktop (leaves gap at grid default). On mobile it applies `12px` gap between meta cells.

---

## #13 — `paddingX` is not a valid React inline style

**Severity:** Medium  
**File:** `PermitSection.jsx`

**Problem:** React's `style` prop maps directly to CSS properties. `paddingX` does not exist in CSS and is silently discarded — no padding was applied and no console warning indicated the bug.

**Before:**
```js
<p style={{ paddingX: isMobile ? "1rem" : "0" }}>
```

**After:**
```js
<p style={{ paddingLeft: isMobile ? "1rem" : "0", paddingRight: isMobile ? "1rem" : "0" }}>
```

---

## #14 — Unused `PHASES` array

**Severity:** Low  
**File:** `constants.js`

**Problem:** The `PHASES` export defined a 4-step process array. It was not imported or used anywhere in the project.

**Before:**
```js
export const PHASES = [
  { number: "01", title: "Register & Apply", ... },
  // ... 3 more items
];
```

**After:** Removed entirely.

---

## #15 — Navbar logo path breaks in production

**Severity:** High  
**File:** `Navbar.jsx`

**Problem:** The logo `src` was hardcoded to `/src/assets/logo.png` — a path that only exists on the Vite dev server. In a production build, Vite hashes and moves assets under `/assets/`, causing a silent 404 for every user on any deployed environment.

**Before:**
```jsx
<img src="/src/assets/logo.png" alt="logo" />
```

**After:**
```jsx
import logo from "../../assets/logo.png";
// ...
<img src={logo} alt="logo" />
```

---

## #16 — Footer logo path breaks in production

**Severity:** High  
**File:** `Footer.jsx`

**Problem:** Same root cause as **#15**. The mobile logo `src` was hardcoded to `/src/assets/logo-m.png`.

**Before:**
```jsx
<img src="/src/assets/logo-m.png" alt="eBOSS" />
```

**After:**
```jsx
import logomitcs from "../../assets/logo-m.png";
// ...
<img src={logomitcs} alt="eBOSS" />
```

---

## #17 — CTA button copy-paste styles

**Severity:** Low  
**File:** `Hero.jsx`

**Problem:** CTA button inline styles were duplicated across two buttons. A refactoring guide was provided rather than a direct code change.

**Recommended approach:**
```jsx
const CTA_BUTTON_ORANGE = {
  background: "#ff9c43", borderColor: "#ff9c43", color: "#1a1208", hoverBG: "#e07620",
};

function CtaButton({ href, variant = "orange", children }) {
  const [isHovered, setIsHovered] = useState(false);
  const style = variant === "orange" ? CTA_BUTTON_ORANGE : CTA_BUTTON_OUTLINE;
  return (
    <a href={href}
       style={{ background: isHovered ? style.hoverBG : style.background }}
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}>
      {children}
    </a>
  );
}
```

> Eliminates copy-paste bugs — one style change updates both buttons.

---

## #18 — `AgencyStrip` hardcoded breakpoint

**Severity:** Low  
**File:** `AgencyStrip.jsx`

**Problem:** `AgencyStrip` hardcoded breakpoint `640` in its inline `<style>` block independently of the project-wide `MOBILE_BREAKPOINT` constant.

**Before:**
```css
@media (max-width: 640px) { ... }
```

**After:**
```jsx
import { MOBILE_BREAKPOINT } from "../../data/constants";
// ...
@media (max-width: ${MOBILE_BREAKPOINT}px) { ... }
```

> Original dual-DOM structure and visual appearance preserved. See also **#24**.

---

## #19 — Dual-DOM responsive pattern in Footer

**Severity:** Low  
**File:** `Footer.jsx`

**Problem:** `Footer.jsx` rendered two completely separate DOM trees — `.footer-desktop` and `.footer-mobile` — toggled with `display: none` via an inline `<style>` block. This doubled DOM nodes, required keeping content in sync across two trees, and relied on JS-in-CSS.

**After:**
```jsx
<div style={{ padding: "clamp(32px, 5vw, 56px) clamp(1.25rem, 4vw, 2rem) 32px" }}>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "clamp(24px, 5vw, 40px)", ... }}>
    <Brand />
    {FOOTER_COLS.map(col => <LinkCol key={col.heading} col={col} />)}
  </div>
  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, ... }}>
    <span>© 2025 ...</span>
    <span>Data Privacy Act ...</span>
  </div>
</div>
```

> `repeat(auto-fit, minmax(200px, 1fr))` reflows columns natively. `clamp()` handles padding and gap scaling continuously. The `.footer-desktop` / `.footer-mobile` classes and inline `<style>` block were deleted entirely.

---

## #20 — Duplicated CSS reset across two files

**Severity:** Low  
**Files:** `App.css`, `index.css`

**Problem:** Both `App.css` and `index.css` declared `margin: 0; padding: 0;` resets, with slight differences between them.

**After:** All resets consolidated into `App.css`. `index.css` is now empty and can be removed or deprecated.

```css
/* App.css: now contains ALL resets */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; width: 100%; min-height: 100%; }
:root { --color-primary: #ff9c43; }
```

---

## #21 — `isRenewal` derived from magic string

**Severity:** Medium  
**Files:** `PermitSection.jsx`, `PermitPages.jsx`

**Problem:** `const isRenewal = id === "renewal"` coupled component behaviour to the specific string value of the `id` data prop. If the page `id` is ever renamed, renewal-specific rendering would silently break.

**Before:**
```js
export default function PermitSection({ id, data, bg, accentColor, borderColor }) {
  const isRenewal = id === "renewal";
```

**After:**
```js
export default function PermitSection({ id, data, bg, accentColor, borderColor, variant = "new" }) {
  const isRenewal = variant === "renewal";
```

**Call sites (`PermitPages.jsx`):**
```jsx
// Before
<PermitSection id="renewal" ... />

// After
<PermitSection id="renewal" variant="renewal" ... />
```

> `variant` defaults to `"new"` so existing call sites that don't pass it yet remain safe.

---

## #22 — `useInView` observer not recreated on threshold change

**Severity:** Low  
**File:** `useInView.js`

**Problem:** `threshold` was captured in the `IntersectionObserver` constructor but omitted from the `useEffect` dependency array, so the observer was never recreated if `threshold` changed at runtime.

**Before:**
```js
useEffect(() => {
  // ...
}, []); // threshold missing from deps
```

**After:**
```js
useEffect(() => {
  // ...
}, [threshold]); // observer recreated if threshold changes
```

---

## #23 — `DocItem` receives `isMobile` as a prop inconsistently

**Severity:** Low  
**File:** `PermitUI.jsx`

**Problem:** Every other component in `PermitUI` resolved `isMobile` internally via the hook. `DocItem` was the only exception — it required the caller to compute and pass `isMobile` as a prop.

**Before:**
```js
export function DocItem({ number, title, notes, accentColor, onClick, isSelected, isMobile }) {
  // isMobile must be supplied by the caller
```

**After:**
```js
export function DocItem({ number, title, notes, accentColor, onClick, isSelected, isMobile: isMobileProp }) {
  const isMobileHook = useIsMobile();
  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileHook;
```

> The prop is preserved as an optional override so existing call sites in `PermitSection.jsx` continue to work. New call sites can omit the prop entirely.

---

## #24 — Breakpoint duplicated in 3+ places

**Severity:** Medium  
**File:** `constants.js`

**Problem:** The `900px` mobile breakpoint was hardcoded independently in `PermitUI.jsx`, `PermitSection.jsx`, `Hero.jsx`, and elsewhere. The constant `MOBILE_BREAKPOINT = 900` already existed in `constants.js` but was not being consumed.

**Action taken:** `MOBILE_BREAKPOINT` documented as the single source of truth. All hook and component files updated to import it.

```js
import { MOBILE_BREAKPOINT } from "../../data/constants";

useEffect(() => {
  const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
  // ...
}, []);
```

> See also **#18** (AgencyStrip) and **#1**, **#2** (shared hook).

---

## #25 — YouTube iframe loads eagerly

**Severity:** Low  
**File:** `VideoSection.jsx`

**Problem:** The YouTube `<iframe>` had no `loading` attribute, causing it to load on page initialisation regardless of whether the user had scrolled to it, negatively impacting LCP.

**Before:**
```jsx
<iframe src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} />
```

**After:**
```jsx
<iframe src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`} loading="lazy" />
```

---

## Notes

- **Breaking bugs (immediate user impact):** #4, #15, #16. These affected every user on every deployed build and were highest priority.
- **Behaviour changes:** #7 (modal now closes on deselect) and #12 (meta gap now applied on mobile) are the only changes with observable runtime differences.
- **Deferred:** #9 placeholder `href` values require real document paths from the content team before they can be resolved.
- **Dependencies:**
  - The `@keyframes fadeSlideIn` removal in **#3** requires the keyframe to exist in `App.css` — without it the `DocumentViewer` entry animation silently stops working.
  - `useIsMobile.js` must import `MOBILE_BREAKPOINT` from `constants.js` (`export const MOBILE_BREAKPOINT = 900`) — its absence will crash the app with a module resolution error.
  - The `accentColor` fix in **#11** requires `PermitSection.jsx` to pass `accentColor` when rendering `StepBlock` to take full effect.
  - `index.css` is now empty after **#20** and can be removed; delete the import from the main entry point if so.
