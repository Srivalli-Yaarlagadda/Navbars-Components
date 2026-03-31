// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { NavbarProps } from "./types";
// import Typography from "@/lib/typography";

// export default function Navbar2({
//   brandName,
//   establishedYear,
//   logoKanji,
//   links,
//   contact,
//   disclaimer,
//   copyrightYear,
// }: NavbarProps) {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => { setMounted(true); }, []);

//   useEffect(() => {
//     if (!mounted) return;
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen, mounted]);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');
//         *, *::before, *::after { box-sizing: border-box; }

//         /* ════════════════════════════════════════════
//            HEADER
//            [ SAISEI ] ────────── [ EST – 2022 ] [ ══ ]
//         ════════════════════════════════════════════ */
//         .n2-header {
//           position: fixed;
//           top: 0; left: 0; right: 0;
//           height: 56px;
//           z-index: 900;
//           background: #0e0b07;
//           border-bottom: 1px solid rgba(255,255,255,0.07);
//           display: flex;
//           align-items: center;
//           padding: 0 2rem;
//           transition: opacity 0.25s ease, visibility 0.25s ease;
//         }
//         /* fade out when panels are open */
//         .n2-header.menu-open {
//           opacity: 0;
//           visibility: hidden;
//           pointer-events: none;
//         }
//         .n2-brand { transition: opacity 0.2s; }
//         .n2-brand:hover { opacity: 0.6; }

//         /* ════════════════════════════════════════════
//            LEFT PANEL — equal nav rows
//         ════════════════════════════════════════════ */
//         .n2-left {
//           position: fixed;
//           top: 0; left: 0;
//           width: 50%; height: 100%;
//           background: #f0ebe0;
//           z-index: 1002;
//           display: flex;
//           flex-direction: column;
//           transform: translateX(-100%);
//           transition: transform 0.65s cubic-bezier(0.76,0,0.24,1);
//           overflow: hidden;
//         }
//         .n2-left.open { transform: translateX(0); }

//         .n2-row {
//           flex: 1 1 0;
//           min-height: 0;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           padding: 0 40px 0 56px;
//           text-decoration: none;
//           color: #1c1409;
//           border-bottom: 1px solid rgba(28,20,9,0.12);
//           transition: background 0.2s ease;
//           position: relative;
//           font-family: 'Cormorant Garamond', serif;
//         }
//         .n2-row:last-child { border-bottom: none; }
//         .n2-row:hover { background: rgba(28,20,9,0.04); }

//         .n2-num {
//           position: absolute;
//           top: 12px; left: 20px;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 11px;
//           color: #8a6e44;
//           letter-spacing: 0.04em;
//           line-height: 1;
//         }
//         .n2-label {
//           font-family: 'Cormorant Garamond', serif;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 0.04em;
//           line-height: 1;
//           color: #1c1409;
//           font-size: clamp(32px, 4.2vw, 58px);
//         }
//         .n2-badge {
//           width: 46px; height: 46px;
//           border-radius: 50%;
//           background: #b08d57;
//           display: flex;
//           align-items: center; justify-content: center;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 16px;
//           color: #f5f0e8;
//           flex-shrink: 0;
//         }

//         /* ════════════════════════════════════════════
//            RIGHT PANEL — logo top, contact bottom
//         ════════════════════════════════════════════ */
//         .n2-right {
//           position: fixed;
//           top: 0; right: 0;
//           width: 50%; height: 100%;
//           background: #1c1409;
//           z-index: 1002;
//           display: flex;
//           flex-direction: column;
//           color: #f5f0e8;
//           transform: translateX(100%);
//           transition: transform 0.65s cubic-bezier(0.76,0,0.24,1);
//           overflow: hidden;
//         }
//         .n2-right.open { transform: translateX(0); }

//         .n2-top-row {
//           padding: 24px 36px 0 36px;
//           display: flex;
//           justify-content: flex-end;
//           flex-shrink: 0;
//         }
//         .n2-close-btn {
//           border: 1px solid rgba(255,255,255,0.28);
//           border-radius: 999px;
//           background: transparent;
//           color: #f5f0e8;
//           cursor: pointer;
//           padding: 6px 20px;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 11px;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           transition: background 0.2s;
//         }
//         .n2-close-btn:hover { background: rgba(255,255,255,0.07); }

//         .n2-logo-area {
//           flex: 1 1 0;
//           min-height: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .n2-logo-circle {
//           width: clamp(140px, 18vw, 220px);
//           height: clamp(140px, 18vw, 220px);
//           border-radius: 50%;
//           border: 1.5px solid rgba(255,255,255,0.22);
//           display: flex;
//           align-items: center; justify-content: center;
//           font-family: 'Cormorant Garamond', serif;
//           font-size: clamp(4rem, 7.5vw, 7rem);
//           font-weight: 300;
//           color: #f5f0e8;
//         }

//         .n2-contact-block {
//           flex-shrink: 0;
//           padding: 0 36px 28px 36px;
//         }
//         .n2-cg {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           column-gap: 28px;
//           row-gap: 22px;
//           margin-bottom: 22px;
//         }
//         .n2-ci-label {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 11px; font-weight: 700;
//           letter-spacing: 0.22em;
//           text-transform: uppercase;
//           color: #f5f0e8;
//           margin: 0 0 5px 0;
//           display: block;
//         }
//         .n2-ci-value {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 12px;
//           color: rgba(245,240,232,0.62);
//           line-height: 1.7;
//           display: block;
//           text-decoration: none;
//         }
//         a.n2-ci-value:hover { color: rgba(245,240,232,0.9); }

//         .n2-footer {
//           border-top: 1px solid rgba(255,255,255,0.1);
//           padding-top: 14px;
//           display: flex;
//           justify-content: space-between;
//         }
//         .n2-footer-txt {
//           font-family: 'Cormorant Garamond', serif;
//           font-size: 10px;
//           letter-spacing: 0.15em;
//           text-transform: uppercase;
//           color: rgba(245,240,232,0.35);
//         }

//         @keyframes n2Up {
//           from { opacity:0; transform:translateY(8px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .n2-right.open .n2-ci {
//           animation: n2Up 0.38s ease both;
//         }

//         /* ════════════════════════════════════════════
//            MOBILE < 768px
//         ════════════════════════════════════════════ */
//         @media (max-width: 767px) {
//           .n2-left {
//             width: 100%; height: 50%;
//             transform: translateY(-100%);
//           }
//           .n2-left.open { transform: translateY(0); }

//           .n2-right {
//             width: 100%; height: 50%;
//             top: auto; bottom: 0;
//             transform: translateY(100%);
//           }
//           .n2-right.open { transform: translateY(0); }

//           .n2-logo-area { display: none; }
//           .n2-row { padding: 0 16px 0 40px; }
//           .n2-num { left: 12px; top: 8px; font-size: 10px; }
//           .n2-label { font-size: clamp(18px, 5.5vw, 30px); }
//           .n2-badge { width: 34px; height: 34px; font-size: 12px; }
//           .n2-top-row { padding: 14px 18px 0; }
//           .n2-contact-block { padding: 0 18px 14px; }
//           .n2-cg { column-gap: 14px; row-gap: 12px; margin-bottom: 12px; }
//           .n2-ci-label { font-size: 9px; }
//           .n2-ci-value { font-size: 10px; }
//         }
//       `}</style>

//       {/* ─── Top Bar ────────────────────────────────────────────────
//            [ SAISEI ]  ──flex spacer──  [ EST – 2022 ]  [ ══ ]
//       ──────────────────────────────────────────────────────────── */}
//       <header className={`n2-header${menuOpen ? " menu-open" : ""}`}>

//         {/* Brand — far left */}
//         <Link href="/" className="n2-brand" style={{ textDecoration: "none", flexShrink: 0 }}>
//           <Typography variant="h3" style={{
//             color: "#f5f0e8", margin: 0,
//             fontFamily: "'Cormorant Garamond', serif",
//             letterSpacing: "0.22em", textTransform: "uppercase",
//           }}>
//             {brandName}
//           </Typography>
//         </Link>

//         {/* Spacer pushes EST + hamburger to right */}
//         <div style={{ flex: 1 }} />

//         {/* EST – YEAR */}
//         <Typography variant="body-lg" style={{
//           color: "#f5f0e8",
//           fontFamily: "'Cormorant Garamond', serif",
//           letterSpacing: "0.28em",
//           marginRight: "2.4rem",
//           flexShrink: 0,
//         }}>
//           EST – {establishedYear}
//         </Typography>

//         {/* Hamburger — always two static lines, never transforms to X */}
//         <button
//           aria-label="Open navigation menu"
//           onClick={() => setMenuOpen(true)}
//           style={{
//             background: "none", border: "none", cursor: "pointer",
//             display: "flex", flexDirection: "column",
//             alignItems: "center", justifyContent: "center",
//             gap: "6px", padding: "6px 0",
//             flexShrink: 0,
//           }}
//         >
//           <span style={{ display: "block", width: "26px", height: "1.5px", background: "#f5f0e8" }} />
//           <span style={{ display: "block", width: "26px", height: "1.5px", background: "#f5f0e8" }} />
//         </button>

//       </header>

//       {/* ─── Backdrop ───────────────────────────────────────────── */}
//       <div onClick={() => setMenuOpen(false)} style={{
//         position: "fixed", inset: 0, zIndex: 1001,
//         background: "rgba(0,0,0,0.35)",
//         opacity: menuOpen ? 1 : 0,
//         pointerEvents: menuOpen ? "all" : "none",
//         transition: "opacity 0.4s ease",
//       }} />

//       {/* ─── LEFT / TOP: Nav links ──────────────────────────────── */}
//       <nav className={`n2-left${menuOpen ? " open" : ""}`}>
//         {links.map((link) => (
//           <Link
//             key={link.href}
//             href={link.href}
//             onClick={() => setMenuOpen(false)}
//             className="n2-row"
//           >
//             <Typography variant="overline" className="n2-num"
//               style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//               ({link.number})
//             </Typography>

//             <span className="n2-label">{link.label}</span>

//             <span className="n2-badge">
//               <Typography variant="body-lg" style={{
//                 fontFamily: "'Cormorant Garamond', serif",
//                 color: "#f5f0e8", lineHeight: 1,
//               }}>
//                 {link.kanjiNumber}
//               </Typography>
//             </span>
//           </Link>
//         ))}
//       </nav>

//       {/* ─── RIGHT / BOTTOM: Contact + logo ────────────────────── */}
//       <div className={`n2-right${menuOpen ? " open" : ""}`}>

//         <div className="n2-top-row">
//           <button className="n2-close-btn" onClick={() => setMenuOpen(false)}>
//             <Typography variant="overline"
//               style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f5f0e8" }}>
//               Close
//             </Typography>
//           </button>
//         </div>

//         <div className="n2-logo-area">
//           <div className="n2-logo-circle">{logoKanji}</div>
//         </div>

//         <div className="n2-contact-block">
//           <div className="n2-cg">

//             <div className="n2-ci" style={{ animationDelay: "0.08s" }}>
//               <Typography variant="overline" className="n2-ci-label"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>Email</Typography>
//               <Typography variant="body-sm" className="n2-ci-value"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//                 {contact.email}
//               </Typography>
//             </div>

//             <div className="n2-ci" style={{ animationDelay: "0.13s" }}>
//               <Typography variant="overline" className="n2-ci-label"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>Office</Typography>
//               {contact.officeLines.map((l, i) => (
//                 <Typography key={i} variant="body-sm" className="n2-ci-value"
//                   style={{ fontFamily: "'Cormorant Garamond', serif" }}>{l}</Typography>
//               ))}
//             </div>

//             <div className="n2-ci" style={{ animationDelay: "0.18s" }}>
//               <Typography variant="overline" className="n2-ci-label"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>Phone</Typography>
//               <Typography variant="body-sm" className="n2-ci-value"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>
//                 {contact.phone}
//               </Typography>
//             </div>

//             <div className="n2-ci" style={{ animationDelay: "0.23s" }}>
//               <span className="n2-ci-label" style={{ opacity: 0, userSelect: "none" }}>_</span>
//               {contact.officeHours.split("\n").map((l, i) => (
//                 <Typography key={i} variant="body-sm" className="n2-ci-value"
//                   style={{ fontFamily: "'Cormorant Garamond', serif" }}>{l}</Typography>
//               ))}
//             </div>

//             <div className="n2-ci" style={{ animationDelay: "0.28s" }}>
//               <Typography variant="overline" className="n2-ci-label"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>Social</Typography>
//               {([
//                 ["Instagram",  contact.social.instagram],
//                 ["Facebook",   contact.social.facebook],
//                 ["Twitter (X)",contact.social.twitter],
//               ] as [string,string][]).map(([label, href]) => (
//                 <Link key={label} href={href} className="n2-ci-value">
//                   <Typography variant="body-sm"
//                     style={{ fontFamily: "'Cormorant Garamond', serif", color: "inherit" }}>
//                     {label}
//                   </Typography>
//                 </Link>
//               ))}
//             </div>

//             <div className="n2-ci" style={{ animationDelay: "0.33s" }}>
//               <Typography variant="overline" className="n2-ci-label"
//                 style={{ fontFamily: "'Cormorant Garamond', serif" }}>Legal</Typography>
//               {([
//                 ["Privacy Policy",   contact.legal.privacyPolicy],
//                 ["Terms of Service", contact.legal.termsOfService],
//               ] as [string,string][]).map(([label, href]) => (
//                 <Link key={label} href={href} className="n2-ci-value">
//                   <Typography variant="body-sm"
//                     style={{ fontFamily: "'Cormorant Garamond', serif", color: "inherit" }}>
//                     {label}
//                   </Typography>
//                 </Link>
//               ))}
//             </div>

//           </div>

//           <div className="n2-footer">
//             <span className="n2-footer-txt">® {disclaimer ?? "Disclaimer"}</span>
//             <span className="n2-footer-txt">
//               ©{copyrightYear ?? new Date().getFullYear()} – {brandName}
//             </span>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavbarProps } from "./types";
import Typography from "@/lib/typography";

/** Matches reference: warm beige panel, deep brown panel, tan accents */
const N2 = {
  leftBg: "#ede9de",
  rightBg: "#1a150e",
  textOnLight: "#1f1812",
  textOnDark: "#ebe6d8",
  textMutedOnDark: "rgba(235, 230, 216, 0.82)",
  accent: "#b0956b",
  rowBorder: "rgba(31, 24, 18, 0.12)",
  headerBg: "#1a150e",
  footerRule: "rgba(176, 149, 107, 0.45)",
  /** Small disclaimer / copyright — light beige on dark */
  footerFine: "rgba(237, 233, 222, 0.52)",
} as const;

const FONT = { fontFamily: "'Cormorant Garamond', serif" } as const;
const FONT_SANS = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const;

/** Matches panel `transition-transform duration-[650ms]` */
const MENU_CLOSE_NAV_DELAY_MS = 650;

export default function Navbar2({
  brandName,
  establishedYear,
  logoKanji,
  links,
  contact,
  disclaimer,
  copyrightYear,
}: NavbarProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted,  setMounted]  = useState(false);
  const navAfterCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, mounted]);

  useEffect(
    () => () => {
      if (navAfterCloseTimer.current) clearTimeout(navAfterCloseTimer.current);
    },
    [],
  );

  const handleNavLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      if (navAfterCloseTimer.current) clearTimeout(navAfterCloseTimer.current);
      setMenuOpen(false);
      navAfterCloseTimer.current = setTimeout(() => {
        navAfterCloseTimer.current = null;
        router.push(href);
      }, MENU_CLOSE_NAV_DELAY_MS);
    },
    [router],
  );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ═══ HEADER ═══ */}
      <header
        className={[
          "fixed top-0 left-0 right-0 h-14 z-[900]",
          "flex items-center px-4 sm:px-6 md:px-8",
          "border-b border-white/[0.07]",
          "transition-[opacity,visibility] duration-[250ms] ease-in-out",
          menuOpen ? "opacity-0 invisible pointer-events-none" : "opacity-100 visible",
        ].join(" ")}
        style={{ background: N2.headerBg }}
      >
        <Link
          href="/"
          className="shrink-0 no-underline transition-opacity duration-200 hover:opacity-60"
        >
          <Typography
            variant="h3"
            style={{ ...FONT, color: N2.textOnDark, margin: 0, letterSpacing: "0.22em", textTransform: "uppercase" }}
          >
            {brandName}
          </Typography>
        </Link>

        <div className="flex-1" />

        <Typography
          variant="body-lg"
          style={{
            ...FONT,
            color: N2.textOnDark,
            letterSpacing: "0.28em",
            fontWeight: 500,
            fontSize: "clamp(12px, 1.8vw, 15px)",
            textTransform: "uppercase",
            lineHeight: 1,
            marginRight: "2.4rem",
            flexShrink: 0,
          }}
        >
          EST – {establishedYear}
        </Typography>

        <button
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(true)}
          className={[
            "group flex flex-col items-center justify-center gap-[6px] p-[6px] shrink-0",
            "bg-transparent border-0 cursor-pointer overflow-visible",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ebe6d8]/50",
          ].join(" ")}
        >
          <span aria-hidden className="relative block h-[1.5px] w-[26px] overflow-hidden">
            <span
              className={[
                "absolute left-0 top-0 block h-full w-[26px] rounded-full bg-[#ebe6d8]",
                "translate-x-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.45,0,0.2,1)]",
                "group-hover:translate-x-full",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-0 block h-full w-[26px] rounded-full bg-[#ebe6d8]",
                "-translate-x-full transition-transform duration-[380ms] ease-[cubic-bezier(0.45,0,0.2,1)]",
                "group-hover:translate-x-0",
              ].join(" ")}
            />
          </span>
          <span aria-hidden className="relative block h-[1.5px] w-[26px] overflow-hidden">
            <span
              className={[
                "absolute left-0 top-0 block h-full w-[26px] rounded-full bg-[#ebe6d8]",
                "translate-x-0 transition-transform duration-[380ms] ease-[cubic-bezier(0.45,0,0.2,1)]",
                "delay-0 group-hover:translate-x-full group-hover:delay-[70ms]",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-0 block h-full w-[26px] rounded-full bg-[#ebe6d8]",
                "-translate-x-full transition-transform duration-[380ms] ease-[cubic-bezier(0.45,0,0.2,1)]",
                "delay-0 group-hover:translate-x-0 group-hover:delay-[70ms]",
              ].join(" ")}
            />
          </span>
        </button>
      </header>

      {/* ═══ BACKDROP ═══ */}
      <div
        onClick={() => setMenuOpen(false)}
        className={[
          "fixed inset-0 z-[1001] bg-black/35",
          "transition-opacity duration-[400ms] ease-in-out",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ═══ LEFT PANEL ═══ */}
      <nav
        className={[
          "fixed top-0 left-0 z-[1002]",
          "w-1/2 h-full min-h-0",
          "md:h-[100dvh] md:max-h-[100dvh]",
          "max-md:w-full max-md:h-[50svh] max-md:max-h-[50svh]",
          "flex flex-col overflow-hidden",
          "transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]",
          menuOpen
            ? "translate-x-0 translate-y-0"
            : "-translate-x-full translate-y-0",
        ].join(" ")}
        style={{ background: N2.leftBg }}
      >
        {links.map((link, i) => (
          <Link
            key={`${i}-${link.href}`}
            href={link.href}
            onClick={(e) => handleNavLinkClick(e, link.href)}
            className={[
              "flex-1 min-h-0",
              "flex items-center justify-between",
              "px-10 pl-14",
              "max-md:px-3 max-md:pl-8 max-md:pr-2 max-md:py-0",
              "no-underline",
              "border-b last:border-b-0",
              "relative overflow-hidden isolate",
              "group",
              "last:pb-0",
            ].join(" ")}
            style={{ ...FONT, color: N2.textOnLight, borderColor: N2.rowBorder }}
          >
            <span
              aria-hidden
              className={[
                "absolute inset-0 -z-10",
                "bg-[rgba(31,24,18,0.06)]",
                "[clip-path:inset(100%_0_0_0)]",
                "group-hover:[clip-path:inset(0%_0_0_0)]",
                "transition-[clip-path] duration-[420ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]",
              ].join(" ")}
            />

            <Typography
              variant="overline"
              className={[
                "absolute top-3 left-5 z-10 max-md:left-2 max-md:top-1.5",
                "!text-[clamp(10px,1.8vw,11px)] max-md:!text-[clamp(7px,1.4vh,10px)]",
                "transition-[opacity,transform] duration-[380ms] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{
                ...FONT,
                color: N2.textOnLight,
                letterSpacing: "0.04em",
                lineHeight: 1,
                transitionDelay: `${0.38 + i * 0.055}s`,
              }}
            >
              ({link.number})
            </Typography>

            <Typography
              variant="caption"
              className={[
                "relative z-10 !mb-0",
                "!font-bold !uppercase !tracking-[0.04em] !leading-none",
                "max-md:!text-[clamp(11px,min(4.5vh,20px),20px)]",
                "!text-[clamp(22px,4.5vw,56px)]",
                "transition-[opacity,transform] duration-[420ms] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              ].join(" ")}
              style={{
                ...FONT,
                color: N2.textOnLight,
                transitionDelay: `${0.35 + i * 0.055}s`,
              }}
            >
              {link.label}
            </Typography>

            <span
              className={[
                "relative z-10 shrink-0",
                "w-[46px] h-[46px] max-md:w-[30px] max-md:h-[30px]",
                "rounded-full",
                "flex items-center justify-center",
                "transition-[opacity,transform] duration-[380ms] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              ].join(" ")}
              style={{ transitionDelay: `${0.38 + i * 0.055}s`, background: N2.accent }}
            >
              <Typography
                variant="body-lg"
                className="!text-[clamp(14px,2.5vw,16px)] max-md:!text-[clamp(9px,1.8vh,12px)] !leading-none"
                style={{
                  ...FONT,
                  color: N2.leftBg,
                }}
              >
                {link.kanjiNumber}
              </Typography>
            </span>
          </Link>
        ))}
      </nav>

      {/* ═══ RIGHT PANEL ═══ */}
      <div
        className={[
          "fixed top-0 right-0 z-[1002]",
          "w-1/2 h-full min-h-0",
          "md:h-[100dvh] md:max-h-[100dvh]",
          "max-md:w-full max-md:h-[50svh] max-md:max-h-[50svh] max-md:top-auto max-md:bottom-0",
          "flex flex-col overflow-hidden max-md:min-h-0",
          "transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]",
          menuOpen
            ? "translate-x-0 translate-y-0"
            : "translate-x-full translate-y-0",
        ].join(" ")}
        style={{ background: N2.rightBg, color: N2.textOnDark }}
      >

        {/* CLOSE */}
        <div className="absolute top-4 right-4 z-10 max-md:top-3 max-md:right-3 md:top-6 md:right-9">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className={[
              "rounded-full cursor-pointer",
              "px-5 py-2 max-md:px-4 max-md:py-1.5",
              "uppercase tracking-[0.2em] text-[clamp(9px,2vw,11px)]",
              "border border-[rgba(237,233,222,0.35)] bg-[#b0956b] text-[#ede9de]",
              "transition-[background-color,border-color,opacity,transform,color] duration-300 ease-out",
              "hover:bg-transparent hover:border-[rgba(237,233,222,0.55)]",
              menuOpen
                ? "opacity-100 translate-y-0 duration-[350ms] delay-[450ms]"
                : "opacity-0 translate-y-2.5 duration-[350ms]",
            ].join(" ")}
            style={{
              ...FONT,
            }}
          >
            <Typography variant="overline" style={{ ...FONT, color: N2.leftBg, fontSize: "inherit" }}>
              Close
            </Typography>
          </button>
        </div>

        {/* Upper block: mobile kanji + (md) logo + contacts = 6/7 viewport height to match left nav row grid */}
        <div
          className={[
            "flex flex-col flex-1 min-h-0 w-full",
            "max-md:flex-1",
            "md:flex-none md:h-[calc(6*100dvh/7)] md:min-h-0",
          ].join(" ")}
        >
          {/* Mobile — compact kanji */}
          <div className="flex md:hidden shrink-0 pt-11 pb-0 justify-center items-center min-h-0">
            <div
              className={[
                "rounded-full border flex items-center justify-center",
                "transition-[opacity,transform] ease-in-out",
                menuOpen
                  ? "opacity-100 translate-y-0 duration-[500ms] delay-[300ms]"
                  : "opacity-0 translate-y-4 duration-[500ms]",
              ].join(" ")}
              style={{
                width: "clamp(36px, 9vh, 52px)",
                height: "clamp(36px, 9vh, 52px)",
                borderColor: "rgba(235, 230, 216, 0.28)",
              }}
            >
              <Typography
                variant="display-2xl"
                className="!mb-0 !font-light !leading-none !text-[clamp(1.15rem,5vh,1.75rem)]"
                style={{
                  ...FONT,
                  color: N2.textOnDark,
                }}
              >
                {logoKanji}
              </Typography>
            </div>
          </div>

          {/* Desktop — logo (42% of upper 6/7) */}
          <div className="hidden md:flex md:flex-[0_0_42%] md:min-h-0 items-center justify-center">
            <div
              className={[
                "rounded-full border flex items-center justify-center",
                "transition-[opacity,transform] ease-in-out",
                menuOpen
                  ? "opacity-100 md:translate-y-3 translate-y-0 duration-[500ms] delay-[350ms]"
                  : "opacity-0 translate-y-6 duration-[500ms]",
              ].join(" ")}
              style={{
                width: "clamp(188px, 21vw, 288px)",
                height: "clamp(188px, 21vw, 288px)",
                borderColor: "rgba(235, 230, 216, 0.28)",
              }}
            >
              <Typography
                variant="display-2xl"
                className="!mb-0 !font-light !leading-none"
                style={{
                  ...FONT,
                  color: N2.textOnDark,
                  fontSize: "clamp(4.1rem, 8.5vw, 7.75rem)",
                }}
              >
                {logoKanji}
              </Typography>
            </div>
          </div>

          {/* Contacts */}
          <div
            className={[
              "flex-1 min-h-0",
              "relative flex flex-col justify-start max-md:justify-center",
              "md:overflow-y-auto md:overscroll-contain md:touch-pan-y",
              "max-md:overflow-hidden",
              "max-md:items-center max-md:px-4 max-md:pt-0 max-md:pb-2",
              "md:pt-14 md:pb-2",
              "pr-6 pl-5 sm:pr-8 sm:pl-8 md:pr-11 md:pl-[22%] lg:pl-[25%]",
            ].join(" ")}
          >
            <div className="grid w-full max-w-full auto-rows-min grid-cols-2 max-md:max-w-[min(92vw,360px)] max-md:mx-auto max-md:translate-x-[clamp(0.5rem,4vw,1.75rem)] max-md:grid-cols-2 content-start max-md:gap-x-3 max-md:gap-y-[clamp(0.75rem,2.2vh,1.125rem)] max-md:overflow-hidden max-md:[&_.block]:break-words gap-x-6 gap-y-[clamp(0.875rem,2.2vh,1.25rem)] sm:gap-x-8 md:gap-x-10 md:gap-y-[clamp(1.25rem,2.75vh,2.25rem)] md:max-w-none md:translate-x-0">

            {/* Email */}
            <div
              className={[
                "transition-[opacity,transform] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0 duration-[400ms] delay-[400ms]"
                         : "opacity-0 translate-y-4 duration-[400ms]",
              ].join(" ")}
            >
              <Typography
                variant="caption"
                className="block mb-0 !uppercase !tracking-[0.16em] !font-semibold !text-[clamp(11px,1.5vw,14px)] max-md:!text-[clamp(7px,1.5vh,10px)] !leading-tight"
                style={{ ...FONT_SANS, color: "#d9cfba" }}
              >
                Email
              </Typography>
              <Typography
                variant="body-xl"
                className="block !m-0 !font-normal uppercase tracking-[0.06em] !text-[clamp(11px,0.95vw,14px)] max-md:!text-[clamp(7px,1.25vh,9.5px)] !leading-[1.25] max-md:!leading-[1.15]"
                style={{ ...FONT, color: N2.textMutedOnDark }}
              >
                {contact.email}
              </Typography>
            </div>

            {/* Office */}
            <div
              className={[
                "transition-[opacity,transform] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0 duration-[400ms] delay-[440ms]"
                         : "opacity-0 translate-y-4 duration-[400ms]",
              ].join(" ")}
            >
              <Typography
                variant="caption"
                className="block mb-0 !uppercase !tracking-[0.16em] !font-semibold !text-[clamp(11px,1.5vw,14px)] max-md:!text-[clamp(7px,1.5vh,10px)] !leading-tight"
                style={{ ...FONT_SANS, color: "#d9cfba" }}
              >
                Office
              </Typography>
              {contact.officeLines.map((l, idx) => (
                <Typography
                  key={idx}
                  variant="body-xl"
                  className="block !my-0 !font-normal uppercase tracking-[0.06em] !text-[clamp(11px,0.95vw,14px)] max-md:!text-[clamp(7px,1.25vh,9.5px)] !leading-[1.25] max-md:!leading-[1.15]"
                  style={{ ...FONT, color: N2.textMutedOnDark }}
                >
                  {l}
                </Typography>
              ))}
            </div>

            {/* Phone */}
            <div
              className={[
                "transition-[opacity,transform] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0 duration-[400ms] delay-[480ms]"
                         : "opacity-0 translate-y-4 duration-[400ms]",
              ].join(" ")}
            >
              <Typography
                variant="caption"
                className="block mb-0 !uppercase !tracking-[0.16em] !font-semibold !text-[clamp(11px,1.5vw,14px)] max-md:!text-[clamp(7px,1.5vh,10px)] !leading-tight"
                style={{ ...FONT_SANS, color: "#d9cfba" }}
              >
                Phone
              </Typography>
              <Typography
                variant="body-xl"
                className="block !m-0 !font-normal uppercase tracking-[0.06em] !text-[clamp(11px,0.95vw,14px)] max-md:!text-[clamp(7px,1.25vh,9.5px)] !leading-[1.25] max-md:!leading-[1.15]"
                style={{ ...FONT, color: N2.textMutedOnDark }}
              >
                {contact.phone}
              </Typography>
            </div>

            {/* Office Hours */}
            <div
              className={[
                "transition-[opacity,transform] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0 duration-[400ms] delay-[520ms]"
                         : "opacity-0 translate-y-4 duration-[400ms]",
              ].join(" ")}
            >
              <Typography
                variant="caption"
                className="block mb-0 opacity-0 select-none pointer-events-none !m-0 !p-0 !leading-none max-md:mb-0"
                style={FONT_SANS}
                aria-hidden
              >
                _
              </Typography>
              {contact.officeHours.split("\n").map((l, idx) => (
                <Typography
                  key={idx}
                  variant="body-xl"
                  className="block !my-0 !font-normal uppercase tracking-[0.06em] !text-[clamp(11px,0.95vw,14px)] max-md:!text-[clamp(7px,1.25vh,9.5px)] !leading-[1.25] max-md:!leading-[1.15]"
                  style={{ ...FONT, color: N2.textMutedOnDark }}
                >
                  {l}
                </Typography>
              ))}
            </div>

            {/* Social */}
            <div
              className={[
                "transition-[opacity,transform] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0 duration-[400ms] delay-[560ms]"
                         : "opacity-0 translate-y-4 duration-[400ms]",
              ].join(" ")}
            >
              <Typography
                variant="caption"
                className="block mb-0 !uppercase !tracking-[0.16em] !font-semibold !text-[clamp(11px,1.5vw,14px)] max-md:!text-[clamp(7px,1.5vh,10px)] !leading-tight"
                style={{ ...FONT_SANS, color: "#d9cfba" }}
              >
                Social
              </Typography>
              {([ ["Instagram", contact.social.instagram],
                  ["Facebook",  contact.social.facebook],
                  ["Twitter (X)", contact.social.twitter],
                ] as [string, string][]).map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="group block leading-none no-underline transition-colors"
                >
                  <Typography
                    variant="caption"
                    className="block !font-normal uppercase tracking-[0.06em] !text-[clamp(11px,0.95vw,14px)] max-md:!text-[clamp(7px,1.25vh,9.5px)] !leading-[1.15] max-md:!leading-[1.05] !mb-0 transition-colors group-hover:!text-[#ebe6d8]"
                    style={{ ...FONT, color: N2.textMutedOnDark }}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div
              className={[
                "transition-[opacity,transform] ease-in-out",
                menuOpen ? "opacity-100 translate-y-0 duration-[400ms] delay-[600ms]"
                         : "opacity-0 translate-y-4 duration-[400ms]",
              ].join(" ")}
            >
              <Typography
                variant="caption"
                className="block mb-0 !uppercase !tracking-[0.16em] !font-semibold !text-[clamp(11px,1.5vw,14px)] max-md:!text-[clamp(7px,1.5vh,10px)] !leading-tight"
                style={{ ...FONT_SANS, color: "#d9cfba" }}
              >
                Legal
              </Typography>
              {([ ["Privacy Policy",   contact.legal.privacyPolicy],
                  ["Terms of Service", contact.legal.termsOfService],
                ] as [string, string][]).map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="group block leading-none no-underline transition-colors"
                >
                  <Typography
                    variant="caption"
                    className="block !font-normal uppercase tracking-[0.06em] !text-[clamp(11px,0.95vw,14px)] max-md:!text-[clamp(7px,1.25vh,9.5px)] !leading-[1.15] max-md:!leading-[1.05] !mb-0 transition-colors group-hover:!text-[#ebe6d8]"
                    style={{ ...FONT, color: N2.textMutedOnDark }}
                  >
                    {label}
                  </Typography>
                </Link>
              ))}
            </div>

            </div>
          </div>
        </div>

        {/* FOOTER — md: exactly 1/7 viewport; top edge aligns with nav row grid (see full-bleed rule) */}
        <div
          className={[
            "border-t shrink-0 w-full",
            "max-md:relative",
            "md:border-t-0",
            "md:h-[calc(100dvh/7)] md:min-h-0 md:flex md:flex-wrap md:items-center md:content-center",
            "py-3 max-md:py-1.5 max-md:pb-[max(6px,env(safe-area-inset-bottom))] md:py-2 md:px-11",
            "flex flex-wrap items-center justify-between gap-x-2 gap-y-1 max-md:gap-x-2",
            "px-5 sm:px-8 max-md:px-3",
            "transition-[opacity,transform] ease-in-out",
            menuOpen
              ? "opacity-100 translate-y-0 duration-[380ms] delay-[550ms]"
              : "opacity-0 translate-y-2.5 duration-[380ms]",
          ].join(" ")}
          style={{ borderTopColor: N2.footerRule }}
        >
          <Typography
            variant="caption"
            className="!mb-0 uppercase !tracking-[0.14em] !font-normal !leading-snug !text-[clamp(9px,0.85vw,11px)] max-md:!text-[clamp(6px,1.15vh,9px)]"
            style={{ ...FONT, color: N2.footerFine }}
          >
            ® {disclaimer ?? "Disclaimer"}
          </Typography>
          <Typography
            variant="caption"
            className="!mb-0 text-right shrink-0 uppercase !tracking-[0.14em] !font-normal !leading-snug !text-[clamp(9px,0.85vw,11px)] max-md:!text-[clamp(6px,1.15vh,9px)]"
            style={{ ...FONT, color: N2.footerFine }}
          >
            ©{copyrightYear ?? new Date().getFullYear()} – {brandName}
          </Typography>
        </div>

      </div>

      {/* Full-width hairline at 6/7 viewport — lines up with divider above CONTACT on the left (md+, menu open) */}
      <div
        aria-hidden
        className={[
          "pointer-events-none fixed left-0 right-0 z-[1003] hidden md:block h-px",
          "transition-opacity duration-300 ease-out",
          menuOpen ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          top: "calc(6 * 100dvh / 7)",
          background:
            "linear-gradient(90deg, rgba(31,24,18,0.16) 0%, rgba(31,24,18,0.16) 50%, rgba(237,233,222,0.22) 50%, rgba(237,233,222,0.22) 100%)",
        }}
      />
    </>
  );
}