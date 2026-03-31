// src/app/page.tsx
// All navbar content — brand, links, contact — is defined here and passed as props.

import Navbar2 from "../components/Navbar2";
import type { NavLink, ContactInfo } from "../components/Navbar2/types";

/* ─── 1. Navigation Links ─────────────────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  { label: "Home",           href: "/",               number: 1, kanjiNumber: "一" },
  { label: "About",          href: "/",          number: 2, kanjiNumber: "二" },
  { label: "Project",        href: "/",        number: 3, kanjiNumber: "三" },
  { label: "Service",        href: "/",        number: 4, kanjiNumber: "四" },
  { label: "Sustainability", href: "/",  number: 5, kanjiNumber: "五" },
  { label: "Journal",        href: "/",        number: 6, kanjiNumber: "六" },
  { label: "Contact",        href: "/",        number: 7, kanjiNumber: "七" },
];

/* ─── 2. Contact Information ──────────────────────────────────────────────── */
const CONTACT_INFO: ContactInfo = {
  email: "contact@saisei.jp",
  phone: "+81 3-1234-5678",
  officeLines: [
    "1-1-2 Oshiage, Sumida City,",
    "131-0045, Tokyo, Japan",
  ],
  officeHours: "Monday to Friday:\n9:00 AM – 6:00 PM",
  social: {
    instagram: "https://instagram.com/saisei",
    facebook:  "https://facebook.com/saisei",
    twitter:   "https://twitter.com/saisei",
  },
  legal: {
    privacyPolicy:  "/privacy-policy",
    termsOfService: "/terms-of-service",
  },
};

/* ─── 3. Page Component ───────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* Navbar — every piece of content comes from props defined above */}
      <Navbar2
        brandName="SAISEI"
        establishedYear="2022"
        logoKanji="木"
        links={NAV_LINKS}
        contact={CONTACT_INFO}
        disclaimer="DISCLAIMER"
        copyrightYear="2025"
      />

    
    </>
  );
}