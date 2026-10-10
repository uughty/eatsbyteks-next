'use client'

import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
  Drives every [data-g] element on the About page. Renders nothing.
  Needs: npm i gsap
  With prefers-reduced-motion, nothing runs and all content stays visible.
*/
export function AboutMotion() {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const q = <T extends HTMLElement = HTMLElement>(sel: string) => gsap.utils.toArray<T>(`[data-g="${sel}"]`)
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* page progress bar */
      gsap.to('[data-g="bar"]', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      })

      /* hero: one orchestrated entrance */
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('[data-g="crumb"]', { opacity: 0, y: -12, duration: 0.6 })
        .from('[data-g="photo"]', { clipPath: 'inset(100% 0% 0% 0% round 2.5rem)', duration: 1.3, ease: 'power4.inOut' }, 0.1)
        .from('[data-g="hero-img"]', { scale: 1.35, duration: 1.8 }, 0.1)
        .from('[data-g="hword"]', { yPercent: 115, duration: 1, stagger: 0.09 }, 0.55)
        .from('[data-g="hero-in"]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 }, 0.95)

      /* headings: words rise as they enter */
      q('split').forEach((h) =>
        gsap.from(h.querySelectorAll('[data-g="sword"]'), {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.06,
          ease: 'power4.out',
          scrollTrigger: { trigger: h, start: 'top 88%', once: true },
        }),
      )

      /* single blocks fade up; groups stagger */
      q('fade').forEach((el) =>
        gsap.from(el, {
          opacity: 0,
          y: 48,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }),
      )
      q('stagger').forEach((el) =>
        gsap.from(el.children, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
      )

      /* images move slower than the page inside their frame */
      q('par').forEach((el) =>
        gsap.fromTo(
          el,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        ),
      )

      /* botanicals drift at their own speed */
      q('drift').forEach((el) =>
        gsap.to(el, {
          y: parseFloat(el.dataset.drift ?? '120'),
          rotate: parseFloat(el.dataset.spin ?? '20'),
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1 },
        }),
      )

      /* timeline line draws as you scroll */
      q('line').forEach((el) =>
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: { trigger: el.parentElement, start: 'top 75%', end: 'bottom 55%', scrub: true },
          },
        ),
      )

      /* marquee speeds up while you scroll */
      const track = document.querySelector('[data-g="marquee"]')
      if (track) {
        const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: 38, repeat: -1 })
        ScrollTrigger.create({
          onUpdate: (self) => {
            tween.timeScale(1 + Math.min(5, Math.abs(self.getVelocity()) / 250))
            gsap.to(tween, { timeScale: 1, duration: 1, overwrite: true })
          },
        })
      }
    })

    /* desktop only: the day-at-the-table section pins and scrolls sideways */
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const pin = document.querySelector<HTMLElement>('[data-g="hpin"]')
      const rail = document.querySelector<HTMLElement>('[data-g="hrail"]')
      if (!pin || !rail) return
      const dist = () => Math.max(0, rail.scrollWidth - window.innerWidth)
      gsap.to(rail, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [])

  return null
}