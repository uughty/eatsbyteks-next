'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollMotion() {
  const pathname = usePathname()

  useEffect(() => {
    const elements =
      document.querySelectorAll<HTMLElement>('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -35px 0px',
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    const update = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight

      document.documentElement.style.setProperty(
        '--scroll-progress',
        `${available > 0 ? (window.scrollY / available) * 100 : 0}%`
      )
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return null
}