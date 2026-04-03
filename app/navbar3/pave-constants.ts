/** PAVE .c-navigation-line — indicator motion */
export const SLIDE_MS = 600
export const SLIDE_EASE = 'cubic-bezier(0.34, 0.16, 0, 1)'

/** main.css --buttonLineWidth: hamburger bars align with .c-button.-line cap */
export const PAVE_MENU_ICON_BAR_WIDTH = 'w-12'
/** PAVE .c-burger_line:nth-of-type(2){ margin-top: 4px } */
export const PAVE_MENU_ICON_GAP_CLASS = 'gap-1'
/** Full class strings so Tailwind can scan them */
export const PAVE_MENU_ICON_DURATION_CLASS = 'duration-[520ms]'
export const PAVE_MENU_ICON_EASE_CLASS = 'ease-[cubic-bezier(0.4,0,0.2,1)]'
/** 2px bars + 4px gap → 3px half-offset for 45° X */
export const PAVE_MENU_ICON_TO_X_TOP = 'translate-y-[3px] rotate-45'
export const PAVE_MENU_ICON_TO_X_BOT = '-translate-y-[3px] -rotate-45'

/**
 * Outer menu: phase 1 = center → full-height slit, phase 2 = slit → full width.
 * Seam line uses PAVE_INNER_* (classic vertical clip on the 1px bar), not the phase timings.
 */
export const PAVE_WIPE_PHASE1_MS = 520
export const PAVE_WIPE_PHASE1_EASE = 'cubic-bezier(0.36, 0.05, 0, 1)'
export const PAVE_WIPE_PHASE2_MS = 600
export const PAVE_WIPE_PHASE2_EASE = 'cubic-bezier(0.82, 0, 0, 1)'
export const PAVE_OUTER_CLIP_CLOSE_MS = PAVE_WIPE_PHASE2_MS
export const PAVE_OUTER_CLIP_CLOSE_EASE = PAVE_WIPE_PHASE2_EASE

/** Snap close (menu not fully open): outer wipe + opacity buffer before unmount */
export const PAVE_OVERLAY_UNMOUNT_MS = PAVE_WIPE_PHASE1_MS + PAVE_WIPE_PHASE2_MS + 220

/** Two-phase reverse = phase2 (full→slit) + phase1 (slit→dot) — mirror of opening */
export const PAVE_OVERLAY_REVERSE_CLOSE_MS = PAVE_WIPE_PHASE2_MS + PAVE_WIPE_PHASE1_MS
/** Client nav after overlay link click: wait for full reverse wipe */
export const PAVE_OVERLAY_NAV_AFTER_REVERSE_MS = PAVE_OVERLAY_REVERSE_CLOSE_MS + 200

/** Seam line clip timing (matches old inner wipe). */
export const PAVE_INNER_CLIP_MS = 820
export const PAVE_INNER_CLIP_DELAY_MS = 0
export const PAVE_INNER_CLIP_EASE = 'cubic-bezier(0.36, 0.05, 0, 1)'
export const PAVE_INNER_CLIP_CLOSE_MS = 400

export const PAVE_CENTER_LINE_OPEN_DELAY_MS = Math.round(PAVE_INNER_CLIP_MS * 0.35)

/** Desktop mask slit aligned with column seam at calc(50% - 10px). */
export const PAVE_MENU_SEAM_OFFSET_X_PX = 10
export const PAVE_MENU_SLIT_HALF_PX = 2
export const PAVE_CENTER_LINE_CLOSE_MS = 280
/** Staggered content follows clip */
export const PAVE_CONTENT_BASE_DELAY_MS = 320
export const PAVE_CONTENT_STAGGER_LEAD_MS = 48
export const PAVE_CONTENT_STAGGER_MS = 44

/** --font-size-title-menu: 2.875rem; breakpoints 699 / 999 / 1000 */
export const PAVE_MENU_NAV =
  'font-pave-menu font-normal leading-[1.2] tracking-[-0.075em] max-[699px]:text-[calc(0.55*2.875rem)] min-[700px]:max-[999px]:text-[calc(0.75*2.875rem)] min-[1000px]:text-[2.875rem]'

export const PAVE_OVERLAY_NAV_LINK =
  'font-pave-menu font-normal leading-[1.18] tracking-[-0.075em] max-[699px]:text-[calc(0.6*2.875rem)] min-[700px]:max-[999px]:text-[calc(0.82*2.875rem)] min-[1000px]:text-[2.875rem]'

export const PAVE_LABEL_SMALL =
  'text-[0.875rem] font-normal leading-[1.2] tracking-[-0.04em]'

export const PAVE_HEADER_LINK =
  'text-[1.125rem] font-normal leading-[1.5] tracking-[-0.04em]'

export const UNDERLINE_WIDTH_RATIO = 0.48
export const UNDERLINE_MIN_PX = 22

export type UnderlineLineState = { left: number; width: number; anchorLeft: number }

export function measureNavUnderline(container: HTMLElement, anchor: HTMLElement) {
  const cr = container.getBoundingClientRect()
  const ar = anchor.getBoundingClientRect()
  const anchorLeft = ar.left - cr.left + container.scrollLeft
  const right = anchorLeft + ar.width
  const lineWidth = Math.max(UNDERLINE_MIN_PX, ar.width * UNDERLINE_WIDTH_RATIO)
  const left = right - lineWidth
  return { left, width: lineWidth, right, anchorLeft }
}

/** Layout: 15px mobile, 20px from 700px */
export const PAVE_GUTTER_X = 'px-[15px] min-[700px]:px-5'
export const PAVE_GUTTER_GAP = 'gap-[15px] min-[700px]:gap-10'
export const PAVE_OVERLAY_COL_LEFT = 'px-[15px] min-[700px]:pl-5 min-[700px]:pr-2.5'
export const PAVE_OVERLAY_COL_RIGHT = 'px-[15px] min-[700px]:pl-2.5 min-[700px]:pr-5'
/** 74px ≤999px, 64px ≥1000px */
export const PAVE_HEADER_H = 'h-[74px] min-[1000px]:h-16'

export const NAV_LINKS = ['Technology', 'Solutions', 'Newsroom', 'Company'] as const

export const OVERLAY_LINKS = [
  { label: 'Technology', external: false },
  { label: 'Solutions', external: false },
  { label: 'Company', external: false },
  { label: 'Newsroom', external: false },
  { label: 'Try PAVE®', external: true },
  { label: 'FAQ', external: false },
  { label: 'Login', external: true },
  { label: 'API Documentation', external: true },
] as const
