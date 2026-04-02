import type { ReactNode } from 'react'
import './pave-theme.css'
import './pave-burger.css'

export default function Navbar3Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full font-pave-text text-black antialiased [color-scheme:light]">
      {children}
    </div>
  )
}
