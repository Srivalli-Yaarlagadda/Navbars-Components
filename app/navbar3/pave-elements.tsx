import type { MouseEventHandler } from 'react'
import { cn } from '@/lib/utils'
import {
  PAVE_MENU_ICON_BAR_WIDTH,
  PAVE_MENU_ICON_DURATION_CLASS,
  PAVE_MENU_ICON_EASE_CLASS,
  PAVE_MENU_ICON_GAP_CLASS,
  PAVE_MENU_ICON_TO_X_BOT,
  PAVE_MENU_ICON_TO_X_TOP,
} from './pave-constants'

export function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H3.5M9.5 2.5V8.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function PaveLogo({ className }: { className?: string }) {
  return (
    <a
      href="/"
      className={cn(
        'group inline-flex items-baseline gap-0 text-[1.3125rem] font-bold uppercase tracking-[0.16em] leading-none text-white transition-opacity hover:opacity-80',
        className,
      )}
    >
      <span className="text-3xl">PA</span>
      <span className="inline-flex flex-col items-center">
        <span className="text-3xl">V</span>
        <span className="mt-[5px] h-px w-[1.125rem] bg-white" aria-hidden />
      </span>
      <span className="text-3xl">E</span>
    </a>
  )
}

export function PaveLogoDark({
  className,
  onClick,
}: {
  className?: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <a
      href="/"
      onClick={onClick}
      className={cn(
        'group inline-flex items-baseline gap-0 text-[1.3125rem] font-bold uppercase tracking-[0.16em] leading-none text-black transition-opacity hover:opacity-70',
        className,
      )}
    >
      <span>PA</span>
      <span className="inline-flex flex-col items-center">
        <span>V</span>
        <span className="mt-[5px] h-px w-[1.125rem] bg-black" aria-hidden />
      </span>
      <span>E</span>
    </a>
  )
}

/**
 * Closed: same hover wipe as pave.ai `.c-burger` (pave-burger.css).
 * Open: 2-line X morph (48×2px bars, 4px gap).
 */
export function MenuToggle({
  open,
  onClick,
  variant,
}: {
  open: boolean
  onClick: () => void
  variant: 'light' | 'dark'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className={cn(
        'relative flex h-11 w-12 shrink-0 touch-manipulation items-center justify-center rounded-sm transition-[opacity,transform] duration-200 ease-out active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-offset-2',
        variant === 'light'
          ? '!text-white focus-visible:outline-white/60'
          : '!text-black focus-visible:outline-black/50',
        !open && 'pave-burger flex-col justify-center hover:opacity-100',
        open && 'hover:opacity-80',
      )}
    >
      <span className="sr-only">Menu</span>
      {!open ? (
        <>
          <span className="pave-burger_line" aria-hidden />
          <span className="pave-burger_line" aria-hidden />
        </>
      ) : (
        <span
          className={cn(
            'flex flex-col justify-center will-change-transform',
            PAVE_MENU_ICON_BAR_WIDTH,
            PAVE_MENU_ICON_GAP_CLASS,
          )}
        >
          <span
            className={cn(
              'block h-0.5 max-w-none origin-center transition-transform',
              PAVE_MENU_ICON_DURATION_CLASS,
              PAVE_MENU_ICON_EASE_CLASS,
              PAVE_MENU_ICON_BAR_WIDTH,
              'bg-current',
              PAVE_MENU_ICON_TO_X_TOP,
            )}
          />
          <span
            className={cn(
              'block h-0.5 max-w-none origin-center transition-transform',
              PAVE_MENU_ICON_DURATION_CLASS,
              PAVE_MENU_ICON_EASE_CLASS,
              PAVE_MENU_ICON_BAR_WIDTH,
              'bg-current',
              PAVE_MENU_ICON_TO_X_BOT,
            )}
          />
        </span>
      )}
    </button>
  )
}

/** PAVE .c-button.-line: bar slides to text end; scaleX reveals */
export function PaveLineHover() {
  const lineEase = 'ease-[cubic-bezier(0.34,0.16,0,1)]'
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute -bottom-[0.2em] left-0 block h-[clamp(2px,0.1em,4px)] w-full overflow-visible transition-transform duration-[600ms]',
        lineEase,
        'group-hover:translate-x-[calc(100%-1.875rem-0.5em)] group-focus-visible:translate-x-[calc(100%-1.875rem-0.5em)]',
      )}
    >
      <span
        className={cn(
          'absolute left-0 top-0 block h-full w-[1.875rem] origin-left scale-x-0 bg-black transition-transform duration-[600ms]',
          lineEase,
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
        )}
      />
    </span>
  )
}

export function CloseX({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close menu"
      className={cn(
        'flex h-12 w-12 items-center justify-center text-black transition-opacity hover:opacity-60',
        className,
      )}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M6 6L22 22M22 6L6 22" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      </svg>
    </button>
  )
}
