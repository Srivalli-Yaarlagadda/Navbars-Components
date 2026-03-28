"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Typography from "@/lib/typography";
import { Navbar1Props } from "./types";
import { cn } from "@/lib/utils";

// ─── Timing ────────────────────────────────────────────────────────────────
const WIDTH_DURATION_MS        = 580;
const HEIGHT_DELAY_MS          = 160;
const HEIGHT_DURATION_MS       = 800;
const CONTENT_DELAY_MS         = HEIGHT_DELAY_MS + 300;

const CLOSE_HEIGHT_DURATION_MS = 540;
const CLOSE_WIDTH_DELAY_MS     = CLOSE_HEIGHT_DURATION_MS - 140;
const CLOSE_DONE_DELAY_MS      = CLOSE_HEIGHT_DURATION_MS + WIDTH_DURATION_MS - 80;

// ─── Easings ───────────────────────────────────────────────────────────────
const SPRING            = "cubic-bezier(0.22, 1, 0.36, 1)";
const HEIGHT_EASE_OPEN  = "cubic-bezier(0.12, 1, 0.28, 1)";
const HEIGHT_EASE_CLOSE = "cubic-bezier(0.55, 0, 1, 0.45)";
const SNAP              = "cubic-bezier(0.4, 0, 0.2, 1)";

// ─── NavLink: underline expands from center, collapses to center ───────────
function NavLink({
  href,
  label,
  tag,
  onNavigate,
}: {
  href: string;
  label: string;
  tag?: string;
  onNavigate: (href: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative block py-6 cursor-pointer"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
    >
      <span className="relative inline-block">
        <Typography
          variant="h2"
          className="relative z-10 inline-block text-white normal-case leading-tight"
        >
          {label}
          {tag ? (
            <Typography
              variant="caption"
              className="ml-2 inline rounded bg-purple-500 px-2 py-1 text-white normal-case"
            >
              {tag}
            </Typography>
          ) : null}
        </Typography>

        {/* Underline: expands from center out on enter, collapses to center on exit */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 left-0 h-[2px] w-full overflow-hidden"
        >
          {/* left half */}
          <span
            className="absolute top-0 right-1/2 h-full"
            style={{
              background: "rgba(255,255,255,0.85)",
              width: "50%",
              transformOrigin: "right center",
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transition: hovered
                ? "transform 380ms cubic-bezier(0.22,1,0.36,1)"
                : "transform 280ms cubic-bezier(0.55,0,1,0.45)",
            }}
          />
          {/* right half */}
          <span
            className="absolute top-0 left-1/2 h-full"
            style={{
              background: "rgba(255,255,255,0.85)",
              width: "50%",
              transformOrigin: "left center",
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transition: hovered
                ? "transform 380ms cubic-bezier(0.22,1,0.36,1)"
                : "transform 280ms cubic-bezier(0.55,0,1,0.45)",
            }}
          />
        </span>
      </span>
    </a>
  );
}

// ─── FeaturedCard ─────────────────────────────────────────────────────────
function FeaturedCard({ featured }: { featured: Navbar1Props["featured"] }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMove}
      className="relative flex flex-col items-center justify-start rounded-2xl"
      style={{
        background: "#2a2522",
        border: `1px solid ${hovered ? "rgba(163,230,53,0.30)" : "rgba(255,255,255,0.04)"}`,
        boxShadow: hovered
          ? "0 0 28px 4px rgba(163,230,53,0.10), 0 0 72px 18px rgba(163,230,53,0.05)"
          : "none",
        transition: "border-color 400ms ease, box-shadow 400ms ease",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: `radial-gradient(260px circle at ${pos.x}% ${pos.y}%, rgba(163,230,53,0.11) 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 320ms ease",
        }}
      />

      {featured.badge && (
        <div className="relative z-10 flex justify-center px-6 pt-6">
          <Typography
            variant="caption"
            className="rounded bg-purple-500 px-2 py-1 text-white normal-case"
          >
            {featured.badge}
          </Typography>
        </div>
      )}

      <div className="relative z-10 px-6 pt-3 text-center">
        <Typography variant="h1" className="text-white normal-case leading-tight">
          {featured.title}
        </Typography>
      </div>

      <div className="relative z-10 w-full px-4 mt-4">
        <div className="relative w-full overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
          <Image
            src="/livingroom.avif"
            alt={featured.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </div>

      <div className="relative z-10 flex justify-center px-6 pb-6 pt-4">
        <div className="arc-wrap">
          <button
            className="relative flex items-center justify-center overflow-hidden rounded bg-white px-5 py-2"
            style={{ perspective: "500px", transition: "background 240ms ease" }}
            type="button"
          >
            <Typography
              variant="body-xl"
              className="arc-out text-black normal-case"
              style={{
                display: "block",
                transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
              }}
            >
              {featured.buttonText}
            </Typography>
            <Typography
              aria-hidden
              variant="body-xl"
              className="arc-in text-black normal-case"
              style={{
                display: "block",
                position: "absolute",
                transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                transform: "translateX(-120%) rotateY(-45deg)",
                opacity: 0,
              }}
            >
              {featured.buttonText}
            </Typography>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Navbar ────────────────────────────────────────────────────────────
export default function Navbar1({
  logoText,
  leftSections,
  rightSections,
  socials,
  featured,
  auth,
  menu,
}: Navbar1Props) {
  const router = useRouter();

  const [open,           setOpen]           = useState(false);
  const [widthExpanded,  setWidthExpanded]  = useState(false);
  const [heightExpanded, setHeightExpanded] = useState(false);
  const [showContent,    setShowContent]    = useState(false);
  const [isClosing,      setIsClosing]      = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  const handleOpen = () => {
    clearTimers();
    setIsClosing(false);
    setOpen(true);
    setShowContent(false);
    setHeightExpanded(false);
    setWidthExpanded(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setWidthExpanded(true)));
    const t1 = setTimeout(() => setHeightExpanded(true), HEIGHT_DELAY_MS);
    const t2 = setTimeout(() => setShowContent(true),    CONTENT_DELAY_MS);
    timersRef.current.push(t1, t2);
  };

  const handleClose = useCallback(() => {
    clearTimers();
    setIsClosing(true);
    setShowContent(false);
    setHeightExpanded(false);
    const t1 = setTimeout(() => setWidthExpanded(false), CLOSE_WIDTH_DELAY_MS);
    const t2 = setTimeout(() => { setOpen(false); setIsClosing(false); }, CLOSE_DONE_DELAY_MS);
    timersRef.current.push(t1, t2);
  }, []);

  // ─── Called by NavLink on click: animate close, then push route ──────────
  const handleNavigate = useCallback(
    (href: string) => {
      if (!open) {
        router.push(href);
        return;
      }

      clearTimers();
      setIsClosing(true);
      setShowContent(false);
      setHeightExpanded(false);

      const t1 = setTimeout(() => setWidthExpanded(false), CLOSE_WIDTH_DELAY_MS);
      const t2 = setTimeout(() => {
        setOpen(false);
        setIsClosing(false);
        router.push(href);
      }, CLOSE_DONE_DELAY_MS);

      timersRef.current.push(t1, t2);
    },
    [open, router]
  );

  const heightDuration = isClosing ? CLOSE_HEIGHT_DURATION_MS : HEIGHT_DURATION_MS;
  const heightEasing   = isClosing ? HEIGHT_EASE_CLOSE : HEIGHT_EASE_OPEN;
  const heightDelay    = isClosing ? "0ms" : `${HEIGHT_DELAY_MS}ms`;

  return (
    <div className="mt-6 w-full px-4">
      {/* ── Shell ── */}
      <div
        style={{
          transition: `max-width ${WIDTH_DURATION_MS}ms ${isClosing ? SNAP : SPRING}`,
          willChange: "max-width",
        }}
        className={cn(
          "mx-auto rounded-xl border border-white/10 bg-[#1c1816] text-white overflow-hidden",
          widthExpanded ? "max-w-full" : "max-w-3xl"
        )}
      >
        {/* ── Topbar ── */}
        <div className="flex items-center justify-between px-6 py-4">

          {/* Hamburger + label */}
          <button
            onClick={open ? handleClose : handleOpen}
            className="flex items-center gap-3"
            type="button"
          >
            <div className="relative flex h-4 w-5 flex-col justify-center gap-[5px]">
              <span
                style={{ transition: "transform 340ms cubic-bezier(0.22,1,0.36,1)" }}
                className={cn(
                  "block h-[2px] w-5 origin-center bg-white",
                  open ? "translate-y-[3.5px] rotate-45" : ""
                )}
              />
              <span
                style={{ transition: "transform 340ms cubic-bezier(0.22,1,0.36,1)" }}
                className={cn(
                  "block h-[2px] w-5 origin-center bg-white",
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                )}
              />
            </div>
            <Typography variant="body-lg" className="text-white normal-case">
              {open ? menu.closeLabel : menu.openLabel}
            </Typography>
          </button>

          {/* Logo */}
          <Typography
            variant="display-xl"
            className="text-white font-extrabold tracking-tight normal-case"
          >
            {logoText}
          </Typography>

          {/* Auth buttons */}
          <div className="flex gap-3">

            {/* Login — hidden below 768px */}
            <div className="arc-wrap hidden md:block">
              <Link
                href={auth.login.href}
                className="relative flex items-center justify-center overflow-hidden rounded-full bg-gray-700 px-4 py-2"
                style={{ perspective: "500px" }}
              >
                <Typography
                  variant="body-lg"
                  className="arc-out text-white normal-case"
                  style={{
                    display: "block",
                    transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                  }}
                >
                  {auth.login.label}
                </Typography>
                <Typography
                  aria-hidden
                  variant="body-lg"
                  className="arc-in text-white normal-case"
                  style={{
                    display: "block",
                    position: "absolute",
                    transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                    transform: "translateX(-120%) rotateY(-45deg)",
                    opacity: 0,
                  }}
                >
                  {auth.login.label}
                </Typography>
              </Link>
            </div>

            {/* Join */}
            <div className="arc-wrap">
              <Link
                href={auth.join.href}
                className="relative flex items-center justify-center overflow-hidden rounded-md bg-lime-400 px-4 py-2"
                style={{ perspective: "500px" }}
              >
                <Typography
                  variant="body-lg"
                  className="arc-out text-black normal-case"
                  style={{
                    display: "block",
                    transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                  }}
                >
                  {auth.join.label}
                </Typography>
                <Typography
                  aria-hidden
                  variant="body-lg"
                  className="arc-in text-black normal-case"
                  style={{
                    display: "block",
                    position: "absolute",
                    transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                    transform: "translateX(-120%) rotateY(-45deg)",
                    opacity: 0,
                  }}
                >
                  {auth.join.label}
                </Typography>
              </Link>
            </div>

          </div>
        </div>

        {/* ── Drawer ── */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: heightExpanded ? "1fr" : "0fr",
            transition: `grid-template-rows ${heightDuration}ms ${heightEasing} ${heightDelay}`,
            willChange: "grid-template-rows",
          }}
        >
          <div style={{ minHeight: 0, overflow: "hidden" }}>
            <div
              style={{
                transition: "opacity 300ms ease, transform 360ms cubic-bezier(0.22,1,0.36,1)",
              }}
              className={cn(
                "grid h-full gap-8 px-6 pb-6",
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                showContent
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-3 opacity-0"
              )}
            >
              {/* ── Left card ── */}
              <div className="rounded-2xl bg-[#2a2522] p-6">
                {leftSections.map((section) => (
                  <div key={section.title} className="mb-6 last:mb-0">
                    <Typography variant="caption" className="mb-3 block text-gray-400 normal-case">
                      {section.title}
                    </Typography>
                    {section.items.map((item) => (
                      <NavLink
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        label={item.label}
                        tag={item.tag}
                        onNavigate={handleNavigate}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* ── Middle column ── */}
              <div className="flex h-full flex-col">
                {rightSections.map((section) => (
                  <div key={section.title} className="mb-6 last:mb-0">
                    <Typography variant="caption" className="mb-3 block text-gray-400 normal-case">
                      {section.title}
                    </Typography>
                    {section.items.map((item) => (
                      <NavLink
                        key={`${item.label}-${item.href}`}
                        href={item.href}
                        label={item.label}
                        onNavigate={handleNavigate}
                      />
                    ))}
                  </div>
                ))}

                {/* Socials — hidden below 768px */}
                <div className="mt-auto hidden md:flex gap-4 pt-4">
                  {socials.map((s) => (
                    <Link
                      key={`${s.label}-${s.href}`}
                      href={s.href}
                      aria-label={s.label}
                      className="group relative"
                    >
                      <span className="sr-only">
                        <Typography variant="overline" className="normal-case">
                          {s.label}
                        </Typography>
                      </span>
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 group-hover:border-white/20 group-hover:bg-white/10">
                        <img
                          src={s.iconSrc}
                          alt=""
                          aria-hidden="true"
                          className="h-5 w-5"
                        />
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Auth buttons — below 768px only, full-width stacked */}
                <div className="mt-6 flex flex-col gap-3 md:hidden">

                  {/* Login */}
                  <div className="arc-wrap">
                    <Link
                      href={auth.login.href}
                      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gray-700 px-4 py-3"
                      style={{ perspective: "500px" }}
                    >
                      <Typography
                        variant="body-lg"
                        className="arc-out text-white normal-case"
                        style={{
                          display: "block",
                          transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                        }}
                      >
                        {auth.login.label}
                      </Typography>
                      <Typography
                        aria-hidden
                        variant="body-lg"
                        className="arc-in text-white normal-case"
                        style={{
                          display: "block",
                          position: "absolute",
                          transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                          transform: "translateX(-120%) rotateY(-45deg)",
                          opacity: 0,
                        }}
                      >
                        {auth.login.label}
                      </Typography>
                    </Link>
                  </div>

                  {/* Join */}
                  <div className="arc-wrap">
                    <Link
                      href={auth.join.href}
                      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-lime-400 px-4 py-3"
                      style={{ perspective: "500px" }}
                    >
                      <Typography
                        variant="body-lg"
                        className="arc-out text-black normal-case"
                        style={{
                          display: "block",
                          transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                        }}
                      >
                        {auth.join.label}
                      </Typography>
                      <Typography
                        aria-hidden
                        variant="body-lg"
                        className="arc-in text-black normal-case"
                        style={{
                          display: "block",
                          position: "absolute",
                          transition: "transform 460ms cubic-bezier(0.22,1,0.36,1), opacity 340ms ease",
                          transform: "translateX(-120%) rotateY(-45deg)",
                          opacity: 0,
                        }}
                      >
                        {auth.join.label}
                      </Typography>
                    </Link>
                  </div>

                </div>
              </div>

              {/* ── Featured card — hidden below 1024px ── */}
              <div className="hidden lg:block">
                <FeaturedCard featured={featured} />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Arc-roll CSS ── */}
      <style>{`
        .arc-wrap:hover .arc-out {
          transform: translateX(120%) rotateY(45deg) !important;
          opacity: 0 !important;
        }
        .arc-wrap:hover .arc-in {
          transform: translateX(0%) rotateY(0deg) !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}