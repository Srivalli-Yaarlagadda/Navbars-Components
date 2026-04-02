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
 * Full-screen menu clip — tuned for smooth nested wipe (reference-like, softer than linear snap).
 */
export const PAVE_OUTER_CLIP_MS = 880
export const PAVE_OUTER_CLIP_DELAY_MS = 260
export const PAVE_OUTER_CLIP_EASE = 'cubic-bezier(0.76, 0, 0.24, 1)'
export const PAVE_INNER_CLIP_MS = 640
/** Inner wipe starts shortly after outer (only while opening); closing uses 0 delay in page. */
export const PAVE_INNER_CLIP_DELAY_MS = PAVE_OUTER_CLIP_DELAY_MS + 72
export const PAVE_INNER_CLIP_EASE = 'cubic-bezier(0.33, 1, 0.32, 1)'
/** Staggered content follows clip; slightly early reads more “locked in” with the wipe */
export const PAVE_CONTENT_BASE_DELAY_MS = 320
export const PAVE_CONTENT_STAGGER_LEAD_MS = 48
export const PAVE_CONTENT_STAGGER_MS = 44

export const PAVE_CENTER_LINE_OPEN_DELAY_MS = PAVE_OUTER_CLIP_DELAY_MS
export const PAVE_CENTER_LINE_OPEN_MS = PAVE_OUTER_CLIP_MS
export const PAVE_CENTER_LINE_OPEN_EASE = PAVE_OUTER_CLIP_EASE
export const PAVE_CENTER_LINE_CLOSE_MS = 360

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

/** Layout: 15px mobile, 20px from 700px; desktop seam uses half-gutter on inner edge */
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
