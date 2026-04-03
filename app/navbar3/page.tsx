'use client'

import { useRouter } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import {
  NAV_LINKS,
  OVERLAY_LINKS,
  PAVE_CONTENT_BASE_DELAY_MS,
  PAVE_CONTENT_STAGGER_LEAD_MS,
  PAVE_CONTENT_STAGGER_MS,
  PAVE_GUTTER_GAP,
  PAVE_GUTTER_X,
  PAVE_HEADER_H,
  PAVE_HEADER_LINK,
  PAVE_CENTER_LINE_CLOSE_MS,
  PAVE_CENTER_LINE_OPEN_DELAY_MS,
  PAVE_INNER_CLIP_CLOSE_MS,
  PAVE_INNER_CLIP_EASE,
  PAVE_INNER_CLIP_MS,
  PAVE_LABEL_SMALL,
  PAVE_CURTAIN_CLOSE_EASE,
  PAVE_CURTAIN_CLOSE_MS,
  PAVE_MENU_CLIP_CURTAIN_CLOSED,
  PAVE_MENU_NAV,
  PAVE_MENU_SEAM_OFFSET_X_PX,
  PAVE_MENU_SLIT_HALF_PX,
  PAVE_OVERLAY_COL_LEFT,
  PAVE_OVERLAY_COL_RIGHT,
  PAVE_OVERLAY_NAV_AFTER_CURTAIN_MS,
  PAVE_OVERLAY_NAV_LINK,
  PAVE_WIPE_PHASE1_EASE,
  PAVE_WIPE_PHASE1_MS,
  PAVE_WIPE_PHASE2_EASE,
  PAVE_WIPE_PHASE2_MS,
  SLIDE_EASE,
  SLIDE_MS,
  measureNavUnderline,
  type UnderlineLineState,
} from './pave-constants'
import {
  ExternalArrow,
  MenuToggle,
  PaveLineHover,
  PaveLogo,
  PaveLogoDark,
} from './pave-elements'

const BAR_INSET =
  'min-[1100px]:px-[max(20px,calc((100vw-1920px)/2+20px))]'

const MENU_CLIP_DOT = 'inset(48% 48% 48% 48%)'

type MenuOpeningStage = 'idle' | 'growV' | 'growH' | 'open'

function menuSlitClip(isDesktop: boolean) {
  if (!isDesktop) {
    return 'inset(calc(50% - 2px) 0 calc(50% - 2px) 0)'
  }
  const o = PAVE_MENU_SEAM_OFFSET_X_PX
  const w = PAVE_MENU_SLIT_HALF_PX
  return `inset(0 calc(50% + ${o - w}px) 0 calc(50% - ${o + w}px))`
}

function useMinWidth700() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 700px)').matches,
  )
  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 700px)')
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return isDesktop
}

/** After overlay links finish stagger-in, clear transition-delay so hover opacity (dim siblings) is instant. */
function overlayLinksEntranceSettleMs() {
  const last = OVERLAY_LINKS.length - 1
  return (
    PAVE_CONTENT_BASE_DELAY_MS +
    PAVE_CONTENT_STAGGER_LEAD_MS +
    last * PAVE_CONTENT_STAGGER_MS +
    600
  )
}

export default function Navbar3Page() {
  const router = useRouter()
  const overlayNavAfterCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuOpenRef = useRef(false)
  const overlayVisibleRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayAnimIn, setOverlayAnimIn] = useState(false)
  const [openingStage, setOpeningStage] = useState<MenuOpeningStage>('idle')
  const [overlayContentIdle, setOverlayContentIdle] = useState(false)
  const isDesktop = useMinWidth700()
  const overlayRef = useRef<HTMLDivElement>(null)

  menuOpenRef.current = menuOpen
  overlayVisibleRef.current = overlayVisible

  const menuContentVisible = useMemo(
    () =>
      menuOpen &&
      overlayAnimIn &&
      (isDesktop ? openingStage === 'growH' || openingStage === 'open' : openingStage !== 'idle'),
    [menuOpen, overlayAnimIn, isDesktop, openingStage],
  )

  const primaryNavRef = useRef<HTMLUListElement>(null)
  const [primaryLine, setPrimaryLine] = useState<UnderlineLineState>({
    left: 0,
    width: 0,
    anchorLeft: 0,
  })
  const ctaNavRef = useRef<HTMLDivElement>(null)
  const [ctaLine, setCtaLine] = useState<UnderlineLineState>({ left: 0, width: 0, anchorLeft: 0 })

  const onPrimaryEnter = useCallback((anchor: HTMLElement) => {
    const c = primaryNavRef.current
    if (!c) return
    const m = measureNavUnderline(c, anchor)
    setPrimaryLine((prev) => {
      if (prev.width === 0) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPrimaryLine({ left: m.left, width: m.width, anchorLeft: m.anchorLeft })
          })
        })
        return { left: m.right, width: 0, anchorLeft: m.anchorLeft }
      }
      return { left: m.left, width: m.width, anchorLeft: m.anchorLeft }
    })
  }, [])

  const onPrimaryLeave = useCallback(() => {
    setPrimaryLine((s) => {
      if (s.width <= 0) return s
      return { left: s.anchorLeft, width: 0, anchorLeft: s.anchorLeft }
    })
  }, [])

  const onCtaEnter = useCallback((anchor: HTMLElement) => {
    const c = ctaNavRef.current
    if (!c) return
    const m = measureNavUnderline(c, anchor)
    setCtaLine((prev) => {
      if (prev.width === 0) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCtaLine({ left: m.left, width: m.width, anchorLeft: m.anchorLeft })
          })
        })
        return { left: m.right, width: 0, anchorLeft: m.anchorLeft }
      }
      return { left: m.left, width: m.width, anchorLeft: m.anchorLeft }
    })
  }, [])

  const onCtaLeave = useCallback(() => {
    setCtaLine((s) => {
      if (s.width <= 0) return s
      return { left: s.anchorLeft, width: 0, anchorLeft: s.anchorLeft }
    })
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  /** Close full-screen menu, run clip-path close animation, then navigate (overlay links only). */
  const handleOverlayNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!menuOpen) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
      e.preventDefault()
      const href = e.currentTarget.getAttribute('href') || '/'
      if (overlayNavAfterCloseRef.current) clearTimeout(overlayNavAfterCloseRef.current)
      setMenuOpen(false)
      overlayNavAfterCloseRef.current = setTimeout(() => {
        overlayNavAfterCloseRef.current = null
        router.push(href)
      }, PAVE_OVERLAY_NAV_AFTER_CURTAIN_MS)
    },
    [menuOpen, router],
  )

  useEffect(
    () => () => {
      if (overlayNavAfterCloseRef.current) clearTimeout(overlayNavAfterCloseRef.current)
    },
    [],
  )

  /* Open: two rAFs commit dot; third starts vertical slit (outer two-phase wipe). */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!menuOpen) return
    setOverlayVisible(true)
    setOpeningStage('idle')
    let cancelled = false
    let raf2 = 0
    let raf3 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (cancelled) return
        setOverlayAnimIn(true)
        raf3 = requestAnimationFrame(() => {
          if (!cancelled) setOpeningStage('growV')
        })
      })
    })
    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      cancelAnimationFrame(raf3)
    }
  }, [menuOpen])
  /* eslint-enable react-hooks/set-state-in-effect */

  /* If clip-path transitionend never fires, still tear down overlay */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (menuOpen || !overlayVisible) return
    const ms = PAVE_CURTAIN_CLOSE_MS + 400
    const t = window.setTimeout(() => {
      setOpeningStage('idle')
      setOverlayAnimIn(false)
      setOverlayVisible(false)
    }, ms)
    return () => clearTimeout(t)
  }, [menuOpen, overlayVisible])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!overlayVisible) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [overlayVisible])

  /* Reset idle when menu closes; arm fast hover transitions after stagger-in completes. */
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!menuContentVisible) {
      setOverlayContentIdle(false)
      return
    }
    const ms = overlayLinksEntranceSettleMs()
    const t = window.setTimeout(() => setOverlayContentIdle(true), ms)
    return () => clearTimeout(t)
  }, [menuContentVisible])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeMenu])

  const onOverlayClipTransitionEnd = useCallback((e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'clip-path') return
    if (e.target !== overlayRef.current) return
    const mOpen = menuOpenRef.current
    const ov = overlayVisibleRef.current

    if (
      !mOpen &&
      ov &&
      e.elapsedTime >= (PAVE_CURTAIN_CLOSE_MS / 1000) * 0.85
    ) {
      setOpeningStage('idle')
      setOverlayAnimIn(false)
      setOverlayVisible(false)
      return
    }
    if (mOpen) {
      setOpeningStage((s) => {
        if (s === 'growV') return 'growH'
        if (s === 'growH') return 'open'
        return s
      })
    }
  }, [])

  const slitClip = menuSlitClip(isDesktop)
  const fullClip = 'inset(0 0 0 0)'

  /** Menu closed but overlay still mounted = curtain close (L/R insets → center) */
  const curtainClosing = !menuOpen && overlayVisible

  let menuClipPath: string
  let menuClipTransition: string
  if (curtainClosing) {
    menuClipPath = PAVE_MENU_CLIP_CURTAIN_CLOSED
    menuClipTransition = `clip-path ${PAVE_CURTAIN_CLOSE_MS}ms ${PAVE_CURTAIN_CLOSE_EASE}, opacity 0s`
  } else if (menuOpen && !overlayAnimIn) {
    menuClipPath = MENU_CLIP_DOT
    menuClipTransition = 'clip-path 0s linear 0s, opacity 0s'
  } else if (menuOpen) {
    switch (openingStage) {
      case 'idle':
        menuClipPath = MENU_CLIP_DOT
        menuClipTransition = 'clip-path 0s linear 0s, opacity 0s'
        break
      case 'growV':
        menuClipPath = slitClip
        menuClipTransition = `clip-path ${PAVE_WIPE_PHASE1_MS}ms ${PAVE_WIPE_PHASE1_EASE}, opacity 0s`
        break
      case 'growH':
        menuClipPath = fullClip
        menuClipTransition = `clip-path ${PAVE_WIPE_PHASE2_MS}ms ${PAVE_WIPE_PHASE2_EASE}, opacity 0s`
        break
      case 'open':
        menuClipPath = fullClip
        menuClipTransition = 'clip-path 0s linear 0s, opacity 0s'
        break
    }
  } else {
    menuClipPath = PAVE_MENU_CLIP_CURTAIN_CLOSED
    menuClipTransition = 'clip-path 0s linear 0s, opacity 0s'
  }

  const overlayFullOpen = menuOpen && openingStage === 'open'
  const centerLineRevealing = menuOpen && openingStage === 'growH'
  const centerLineVisible = menuOpen && (openingStage === 'growH' || openingStage === 'open')

  return (
    <>
      <nav
        className={cn(
          'fixed inset-x-0 top-0 bg-transparent antialiased',
          menuOpen ? 'z-[220]' : 'z-[100]',
        )}
        aria-label="Main"
      >
        <div
          className={cn(
            'relative mx-auto flex w-full max-w-[1920px] items-center',
            PAVE_GUTTER_X,
            BAR_INSET,
            menuOpen
              ? 'min-h-0 justify-end py-3 min-[1000px]:py-3.5'
              : cn(PAVE_HEADER_H, 'justify-between'),
          )}
        >
          {!menuOpen && (
            <div className={cn('flex min-w-0 items-center min-[1100px]:gap-[5.5rem]', PAVE_GUTTER_GAP)}>
              <div className="shrink-0">
                <PaveLogo />
              </div>
              <ul
                ref={primaryNavRef}
                className={cn(
                  'relative m-0 hidden min-w-0 list-none items-center pb-1 lg:flex',
                  PAVE_GUTTER_GAP,
                )}
                onMouseLeave={onPrimaryLeave}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 z-0 h-0.5 bg-white"
                  style={{
                    left: primaryLine.left,
                    width: primaryLine.width,
                    transition: `left ${SLIDE_MS}ms ${SLIDE_EASE}, width ${SLIDE_MS}ms ${SLIDE_EASE}`,
                  }}
                />
                {NAV_LINKS.map((label) => (
                  <li key={label} className="relative z-10 shrink-0">
                    <a
                      href="/"
                      onMouseEnter={(e) => onPrimaryEnter(e.currentTarget)}
                      className={cn(
                        PAVE_HEADER_LINK,
                        'inline-block whitespace-nowrap text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/50',
                      )}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div
            ref={ctaNavRef}
            className={cn(
              'relative flex shrink-0 items-center gap-5 xl:gap-6',
              menuOpen ? 'pb-0' : 'pb-1',
            )}
            onMouseLeave={menuOpen ? undefined : onCtaLeave}
          >
            {!menuOpen && (
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 z-0 hidden h-0.5 bg-white lg:block"
                style={{
                  left: ctaLine.left,
                  width: ctaLine.width,
                  transition: `left ${SLIDE_MS}ms ${SLIDE_EASE}, width ${SLIDE_MS}ms ${SLIDE_EASE}`,
                }}
              />
            )}
            <MenuToggle
              open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              variant="light"
            />
            {!menuOpen && (
              <>
                <a
                  href="/"
                  onMouseEnter={(e) => onCtaEnter(e.currentTarget)}
                  className={cn(
                    PAVE_HEADER_LINK,
                    'group relative z-10 hidden items-center gap-1.5 whitespace-nowrap text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/50 lg:inline-flex',
                  )}
                >
                  Book a Demo
                  <ExternalArrow className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="/"
                  onMouseEnter={(e) => onCtaEnter(e.currentTarget)}
                  className={cn(
                    PAVE_HEADER_LINK,
                    'relative z-10 hidden whitespace-nowrap text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/50 lg:inline',
                  )}
                >
                  Let&apos;s talk
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {overlayVisible && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          aria-hidden={!menuOpen}
          onTransitionEnd={onOverlayClipTransitionEnd}
          className={cn(
            'fixed inset-0 z-[200] overflow-x-hidden overflow-y-auto bg-pave-menu-screen pave-scrollbar-none',
            overlayVisible && 'will-change-[clip-path]',
            menuOpen && overlayFullOpen ? 'pointer-events-auto' : 'pointer-events-none',
            'opacity-100',
          )}
          style={{
            clipPath: menuClipPath,
            transition: menuClipTransition,
          }}
        >
          <div className="relative min-h-dvh overflow-hidden">
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-y-0 z-[5] hidden min-[700px]:block min-[700px]:w-px min-[700px]:bg-black min-[700px]:left-[calc(50%-10px)]',
                menuOpen && overlayAnimIn && 'min-[700px]:will-change-[clip-path]',
                centerLineVisible
                  ? 'min-[700px]:[clip-path:inset(0_0_0_0)]'
                  : 'min-[700px]:[clip-path:inset(50%_0_50%_0)]',
              )}
              style={{
                transition: menuOpen
                  ? centerLineRevealing
                    ? `clip-path ${PAVE_INNER_CLIP_MS}ms ${PAVE_INNER_CLIP_EASE} 0ms`
                    : 'clip-path 0s linear 0ms'
                  : `clip-path ${PAVE_INNER_CLIP_CLOSE_MS}ms ${PAVE_INNER_CLIP_EASE} 0ms`,
              }}
            />

            <div className="relative z-[1] grid min-h-dvh grid-cols-1 min-[700px]:grid-cols-2 min-[700px]:pb-10">
              <div
                className={cn(
                  'flex min-h-0 flex-col pb-8 max-[699px]:pt-[calc(74px+1.75rem)] max-[699px]:pb-10 min-[700px]:min-h-dvh min-[700px]:pt-[clamp(1.25rem,2.5vw,2.5rem)] min-[700px]:pb-0',
                  PAVE_OVERLAY_COL_LEFT,
                )}
              >
                <div className="hidden min-h-16 shrink-0 items-start min-[700px]:flex min-[700px]:justify-start">
                  <PaveLogoDark onClick={handleOverlayNavClick} />
                </div>

                <nav
                  className={cn(
                    'flex flex-col gap-[0.42em] max-[699px]:flex-none max-[699px]:justify-start max-[699px]:pt-2 max-[699px]:pb-8 min-[700px]:min-h-0 min-[700px]:flex-1 min-[700px]:justify-end min-[700px]:pb-[clamp(2.5rem,8vh,5.5rem)] min-[700px]:pt-6',
                    '[&:has(a:hover)_a:not(:hover)]:opacity-35 [&:focus-within_a:not(:focus-visible)]:opacity-35',
                  )}
                  aria-label="Menu"
                >
                  {OVERLAY_LINKS.map((item, i) => (
                    <a
                      key={item.label}
                      href="/"
                      onClick={handleOverlayNavClick}
                      className={cn(
                        PAVE_OVERLAY_NAV_LINK,
                        'group relative inline-flex w-max max-w-full items-center gap-2 text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',
                        menuContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                      )}
                      style={{
                        transition: overlayContentIdle
                          ? 'transform 420ms cubic-bezier(0.16,1,0.3,1), opacity 90ms ease-out'
                          : menuContentVisible
                            ? 'transform 560ms cubic-bezier(0.16,1,0.3,1), opacity 520ms cubic-bezier(0.16,1,0.3,1)'
                            : 'transform 400ms cubic-bezier(0.16,1,0.3,1), opacity 400ms cubic-bezier(0.16,1,0.3,1)',
                        transitionDelay:
                          menuContentVisible && !overlayContentIdle
                            ? `${PAVE_CONTENT_BASE_DELAY_MS + PAVE_CONTENT_STAGGER_LEAD_MS + i * PAVE_CONTENT_STAGGER_MS}ms, ${PAVE_CONTENT_BASE_DELAY_MS + PAVE_CONTENT_STAGGER_LEAD_MS + i * PAVE_CONTENT_STAGGER_MS}ms`
                            : !menuContentVisible
                              ? `${(OVERLAY_LINKS.length - 1 - i) * 40}ms, ${(OVERLAY_LINKS.length - 1 - i) * 40}ms`
                              : '0ms, 0ms',
                      }}
                    >
                      {item.label}
                      {item.external && (
                        <ExternalArrow className="mt-1 size-[0.45em] min-h-4 min-w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      )}
                      <PaveLineHover />
                    </a>
                  ))}
                </nav>
              </div>

              <div
                className={cn(
                  'flex min-h-0 flex-col border-t border-black max-[699px]:min-h-0 max-[699px]:flex-1 max-[699px]:border-black max-[699px]:pt-15 max-[699px]:pb-[clamp(2rem,6vw,3.5rem)] min-[700px]:min-h-dvh min-[700px]:border-t-0 min-[700px]:pb-0 min-[700px]:pt-[clamp(1.25rem,2.5vw,2.5rem)]',
                  PAVE_OVERLAY_COL_RIGHT,
                )}
              >
                <p
                  className={cn(
                    PAVE_LABEL_SMALL,
                    'max-w-[20rem] pb-6 text-black min-[700px]:hidden',
                    menuContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                  )}
                  style={{
                    transition: overlayContentIdle
                      ? 'opacity 90ms ease-out, transform 350ms cubic-bezier(0.22,1,0.36,1)'
                      : 'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
                    transitionDelay:
                      menuContentVisible && !overlayContentIdle
                        ? `${PAVE_CONTENT_BASE_DELAY_MS + 30}ms`
                        : !menuContentVisible
                          ? '120ms'
                          : '0ms',
                  }}
                >
                  Automotive Intelligence™
                </p>

                <div
                  className={cn(
                    'hidden min-h-16 shrink-0 items-start justify-start min-[700px]:flex',
                    menuContentVisible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
                  )}
                  style={{
                    transition: overlayContentIdle
                      ? 'opacity 90ms ease-out, transform 350ms cubic-bezier(0.22,1,0.36,1)'
                      : 'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
                    transitionDelay:
                      menuContentVisible && !overlayContentIdle
                        ? `${PAVE_CONTENT_BASE_DELAY_MS + 40}ms`
                        : !menuContentVisible
                          ? '200ms'
                          : '0ms',
                  }}
                >
                  <p className={cn(PAVE_LABEL_SMALL, 'max-w-[20rem] pt-1 text-black')}>
                    Automotive Intelligence™
                  </p>
                </div>

                <div className="flex min-h-0 flex-1 flex-col justify-center py-8 min-[700px]:py-8">
                  <p
                    className={cn(
                      PAVE_MENU_NAV,
                      'max-w-[16ch] text-black min-[1000px]:max-w-[15ch]',
                      menuContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
                    )}
                    style={{
                      transition: overlayContentIdle
                        ? 'opacity 90ms ease-out, transform 400ms cubic-bezier(0.22,1,0.36,1)'
                        : 'opacity 520ms cubic-bezier(0.22,1,0.36,1), transform 520ms cubic-bezier(0.22,1,0.36,1)',
                      transitionDelay:
                        menuContentVisible && !overlayContentIdle
                          ? `${PAVE_CONTENT_BASE_DELAY_MS + 100}ms`
                          : !menuContentVisible
                            ? '120ms'
                            : '0ms',
                    }}
                  >
                    Talk with an <br />
                    expert at PAVE®
                  </p>
                </div>

                <div
                  className={cn(
                    'mt-auto flex shrink-0 flex-row flex-wrap items-end justify-between gap-x-8 gap-y-6 pt-20 min-[700px]:pt-0',
                    menuContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                  )}
                  style={{
                    transition: overlayContentIdle
                      ? 'opacity 90ms ease-out, transform 320ms ease-out'
                      : 'opacity 420ms ease-out, transform 420ms ease-out',
                    transitionDelay:
                      menuContentVisible && !overlayContentIdle
                        ? `${PAVE_CONTENT_BASE_DELAY_MS + 160}ms`
                        : !menuContentVisible
                          ? '60ms'
                          : '0ms',
                  }}
                >
                  <a
                    href="/"
                    onClick={handleOverlayNavClick}
                    className={cn(
                      PAVE_MENU_NAV,
                      'group relative inline-flex w-max max-w-full items-center gap-2 text-black transition-opacity duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black',
                    )}
                  >
                    Book a Demo
                    <ExternalArrow className="size-[0.45em] min-h-[1.15rem] min-w-[1.15rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <PaveLineHover />
                  </a>
                  <p className={cn(PAVE_LABEL_SMALL, 'text-right text-black')}>©2026 PAVE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        <section className="relative min-h-[140vh] overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-neutral-950" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(31,102,241,0.35),transparent)] opacity-40" />
          <div className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-[4.5rem] text-center">
            <p className="mb-4 text-sm font-medium tracking-[0.25em] text-white/50 uppercase">
              Bar: space-between — (logo + links) | (menu + CTAs)
            </p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">PAVE®</h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Replica navbar — glass bar, two-line menu control, full-screen blue overlay with split layout
              and staggered link animation.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
