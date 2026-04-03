import type { ReactNode } from 'react'
import './pave-theme.css'
import './pave-burger.css'

export default function Navbar3Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        'h-dvh max-h-dvh overflow-x-hidden overflow-y-auto pave-scrollbar-none',
        'font-pave-text text-black antialiased [color-scheme:light]',
      ].join(' ')}
    >
      {children}
    </div>
  )
}
