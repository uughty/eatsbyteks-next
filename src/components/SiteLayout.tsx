'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight, ArrowRight, ShoppingBasket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollMotion } from '@/components/ScrollMotion'
import { BackToTop } from '@/components/BackToTop'
import { useShoppingList } from '@/lib/useShoppingList'

const links = [
  { to: '/', label: 'Home' },
  { to: '/recipes', label: 'Recipes' },
  
  { to: '/about', label: 'About' },
  { to: '/kenyan-food', label: 'Kenyan Dishes' },
]

/* A recipe page counts as part of "Recipes" for the active underline */
const isActive = (pathname: string, to: string) =>
  pathname === to ||
  (to === '/recipes' && pathname.startsWith('/recipe/')) ||
  (to !== '/' && pathname.startsWith(`${to}/`))

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { items } = useShoppingList()
  const remaining = items.filter((i) => !i.done).length

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  /* Close the mobile menu on navigation or Escape */
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const basket = (
    <Link
      href="/shopping-list"
      onClick={() => setOpen(false)}
      aria-label={`Shopping list, ${remaining} items`}
      className="relative grid size-10 place-items-center rounded-full border border-[#123222]/30 text-[#123222] transition-colors hover:bg-[#123222] hover:text-[#f6f1c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45]"
    >
      <ShoppingBasket size={18} />
      {remaining > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#123222] px-1 text-[10px] font-bold text-[#f6f1c4]">
          {remaining}
        </span>
      )}
    </Link>
  )

  const mobileLinks = [...links, { to: '/shopping-list', label: 'Shopping list' }]

  return (
    <>
      <ScrollMotion />
      <div className="scroll-progress" aria-hidden="true" />

      <header
        className={`site-header sticky top-0 z-40 border-b bg-[#cfe3c0]/90 backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? 'is-scrolled border-[#123222]/20 shadow-[0_12px_30px_-22px_rgba(18,50,34,0.7)]'
            : 'border-[#123222]/10'
        }`}
      >
        <div
          className={`mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center gap-5 px-5 transition-all duration-300 md:grid-cols-[1fr_auto_1fr] lg:px-8 ${
            scrolled ? 'h-[60px]' : 'h-[76px]'
          }`}
        >
          {/* logo */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex w-fit items-center gap-2 whitespace-nowrap font-display text-[24px] font-extrabold text-[#123222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45] sm:text-[28px]"
          >
            <svg aria-hidden="true" viewBox="0 0 100 140" className="h-6 w-auto -rotate-12">
              <path d="M50 4 C92 40 96 100 50 136 C4 100 8 40 50 4 Z" fill="#2f6a45" />
              <path d="M50 18 L50 128" stroke="#cfe3c0" strokeOpacity=".7" strokeWidth="6" fill="none" />
            </svg>
            <span>
              eatsbyteks<span className="text-[#2f6a45]">.</span>
            </span>
          </Link>

          {/* centred links, underline grows on hover */}
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {links.map((link) => {
              const active = isActive(pathname, link.to)
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45] ${
                    active ? 'text-[#123222]' : 'text-[#123222]/70 hover:text-[#123222]'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-[#2f6a45] transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* actions */}
          <div className="hidden items-center justify-end gap-3 md:flex">
            {basket}
            <Button
              asChild
              size="sm"
              className="h-10 rounded-full bg-[#123222] px-5 font-semibold text-[#f6f1c4] hover:bg-[#2f6a45]"
            >
              <Link href="/recipes">
                Find a recipe <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-end gap-2 md:hidden">
            {basket}
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(!open)}
              className="grid size-10 place-items-center rounded-full text-[#123222] transition-colors hover:bg-[#123222]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45]"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* mobile panel */}
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className={`absolute inset-x-0 top-full border-b border-[#123222]/15 bg-[#cfe3c0] px-5 pb-6 pt-2 shadow-[0_30px_40px_-30px_rgba(18,50,34,0.6)] transition-all duration-300 md:hidden ${
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
        >
          <ul>
            {mobileLinks.map((link) => {
              const active = isActive(pathname, link.to)
              return (
                <li key={link.to} className="border-b border-[#123222]/15 last:border-0">
                  <Link
                    href={link.to}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between py-4 font-display text-2xl ${
                      active ? 'text-[#2f6a45]' : 'text-[#123222]'
                    }`}
                  >
                    {link.label}
                    <ArrowRight size={20} className={active ? 'text-[#2f6a45]' : 'text-[#123222]/40'} />
                  </Link>
                </li>
              )
            })}
          </ul>
          <Button asChild className="mt-4 h-12 w-full rounded-full bg-[#123222] font-semibold text-[#f6f1c4] hover:bg-[#2f6a45]">
            <Link href="/recipes" onClick={() => setOpen(false)}>
              Find a recipe <ArrowUpRight />
            </Link>
          </Button>
        </nav>
      </header>

      {children}
      <BackToTop />
    </>
  )
}