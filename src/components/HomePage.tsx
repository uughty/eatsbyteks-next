'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { ArrowDown, ArrowRight, Clock3, Heart } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { SiteLayout } from '@/components/SiteLayout'
import { RecipeDialog } from '@/components/RecipeDialog'
import { recipeSlug, recipes } from '@/lib/recipes'
import type { Recipe } from '@/lib/recipes'
import { useRecipeShelf } from '@/lib/useRecipeShelf'
const chefImg = "/assets/hero-burger.jpg";

const HOME_IMAGES = {
  plate1: '/assets/steak-fries.jpeg',
  plate2: '/assets/fruit-salad.jpeg',
  plate3: '/assets/pesto-fusilli.jpeg',
  featured: '/assets/roasted-chicken.jpeg',
  closing: '/assets/sticky-toffee-pudding.jpeg',
}

/* Only these recipes appear on the homepage. Change the slice to pick others. */
const homeRecipes: Recipe[] = recipes.slice(0, 4)
const pick = (i: number): Recipe => homeRecipes[i] ?? homeRecipes[0]

function groupRecipes(list: readonly Recipe[]) {
  const byCategory = new Map<string, Recipe[]>()
  for (const r of list) {
    byCategory.set(r.category, [...(byCategory.get(r.category) ?? []), r])
  }
  return Array.from(byCategory, ([category, items]) => ({
    category,
    total: items.length,
    subcategories: [{ name: 'Recipes', items }],
  }))
}

const PILLARS = [
  {
    label: 'Honest ingredients',
    note: 'Seasonal, simple and sourced with care. Nothing you cannot pronounce.',
  },
  {
    label: 'Simple technique',
    note: 'Methods anyone can master, explained one clear step at a time.',
  },
  {
    label: 'Good taste',
    note: 'Everyday dinners through to something sweet to finish.',
  },
]

const CATEGORIES = Array.from(
  new Set(homeRecipes.map((r: Recipe) => String(r.category)))
) as string[]

/* ------------------------------------------------------------------ */
/* Backgrounds: paper grain, soft colour washes, blended section edges */
/* (all inline, no CSS file needed)                                    */
/* ------------------------------------------------------------------ */

const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/>" +
  "<feColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0.09 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(#n)'/></svg>"

/* Fine paper grain, tinted warm brown at very low opacity */
const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent(GRAIN_SVG)}")`

/* Warm cream paper with soft sage, saffron and tomato washes */
const PAPER: CSSProperties = {
  backgroundColor: '#faf6e8',
  backgroundImage: [
    'radial-gradient(60rem 40rem at 6% 0%, rgba(155,176,122,0.22), transparent 62%)',
    'radial-gradient(52rem 36rem at 100% 24%, rgba(247,179,43,0.14), transparent 62%)',
    'radial-gradient(48rem 32rem at 0% 100%, rgba(226,69,45,0.07), transparent 62%)',
    GRAIN,
  ].join(','),
}

/* The same paper leaning greener, for the long recipe list */
const PAPER_GREEN: CSSProperties = {
  backgroundColor: '#f6f4e2',
  backgroundImage: [
    'radial-gradient(64rem 38rem at 0% 6%, rgba(155,176,122,0.3), transparent 65%)',
    'radial-gradient(58rem 36rem at 100% 38%, rgba(155,176,122,0.22), transparent 65%)',
    'radial-gradient(50rem 32rem at 0% 72%, rgba(247,179,43,0.12), transparent 65%)',
    'radial-gradient(56rem 34rem at 100% 100%, rgba(155,176,122,0.26), transparent 65%)',
    GRAIN,
  ].join(','),
}

/* Fades in from paper, deepens to oat in the middle, fades back out:
   no hard edge above or below the quote band */
const BLEND_BAND: CSSProperties = {
  backgroundColor: '#f1ead0',
  backgroundImage: [
    'linear-gradient(180deg, #faf6e8 0%, #f1ead0 26%, #eadfb8 50%, #f1ead0 74%, #faf6e8 100%)',
    GRAIN,
  ].join(','),
  backgroundBlendMode: 'normal, multiply',
}

/* Spotlight and sprinkled specks behind the hero headline.
   Fades out at the bottom so it melts into the torn edge. */
const HERO_GLOW: CSSProperties = {
  backgroundImage: [
    'radial-gradient(40rem 28rem at 50% 42%, rgba(255,255,255,0.85), transparent 70%)',
    'radial-gradient(34rem 26rem at 0% 12%, rgba(155,176,122,0.38), transparent 65%)',
    'radial-gradient(30rem 24rem at 100% 8%, rgba(247,179,43,0.24), transparent 65%)',
    'radial-gradient(28rem 22rem at 92% 96%, rgba(226,69,45,0.14), transparent 65%)',
    'radial-gradient(circle, rgba(176,138,90,0.4) 1.4px, transparent 1.9px)',
    'radial-gradient(circle, rgba(111,141,84,0.32) 1.2px, transparent 1.7px)',
  ].join(','),
  backgroundSize: 'auto, auto, auto, auto, 97px 89px, 137px 121px',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0, 13px 31px, 71px 5px',
  WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent)',
  maskImage: 'linear-gradient(to bottom, #000 72%, transparent)',
}

/* ------------------------------------------------------------------ */
/* Little inline illustrations that float around the hero              */
/* ------------------------------------------------------------------ */

type ArtProps = { className?: string; style?: CSSProperties }

function Leaf({
  className,
  style,
  tone = 'a',
}: ArtProps & { tone?: 'a' | 'b' }) {
  const fill = tone === 'a' ? '#6b9a3f' : '#4f7d2e'
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <path d="M50 4C88 30 98 84 50 136C2 84 12 30 50 4Z" fill={fill} />
      <path
        d="M50 4C88 30 98 84 50 136"
        fill="#a6cc74"
        fillOpacity="0.3"
      />
      <path
        d="M50 14V132"
        stroke="#2f5a1c"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      <path
        d="M50 44L30 32M50 62L26 48M50 82L28 68M50 44L70 32M50 62L74 48M50 82L72 68"
        stroke="#2f5a1c"
        strokeOpacity="0.3"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Lemon({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="48" fill="#f7b32b" />
      <circle cx="50" cy="50" r="42" fill="#fff3c4" />
      {Array.from({ length: 8 }).map((_, i) => (
        <path
          key={i}
          d="M50 50L50 12A38 38 0 0 1 76.87 23.13Z"
          transform={`rotate(${i * 45} 50 50)`}
          fill="#fbd24e"
          stroke="#fff3c4"
          strokeWidth="2"
        />
      ))}
    </svg>
  )
}

function Tomato({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="50" cy="56" r="38" fill="#e2452d" />
      <ellipse
        cx="37"
        cy="42"
        rx="11"
        ry="6"
        fill="#fff"
        fillOpacity="0.35"
        transform="rotate(-30 37 42)"
      />
      <path
        d="M50 20l-13 9 11-2-4 11 9-8 9 8-4-11 11 2z"
        fill="#4f7d2e"
      />
    </svg>
  )
}

function Sprig({ className, style }: ArtProps) {
  return (
    <svg
      viewBox="0 0 60 140"
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <path d="M30 138V8" stroke="#7b8f6a" strokeWidth="3" strokeLinecap="round" />
      {Array.from({ length: 10 }).map((_, i) => {
        const y = 22 + i * 11.5
        return (
          <path
            key={i}
            d={`M30 ${y}L10 ${y - 10}M30 ${y}L50 ${y - 10}`}
            stroke="#7b8f6a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )
      })}
    </svg>
  )
}

/* Ragged, hand-torn top edge for the cream band under the hero */
const TORN_PATH = (() => {
  const pts: string[] = []
  for (let x = 0; x <= 1440; x += 10) {
    const y =
      62 +
      16 * Math.sin(x * 0.045) +
      12 * Math.sin(x * 0.17 + 1) +
      7 * Math.sin(x * 0.61 + 2)
    pts.push(`${x},${y.toFixed(1)}`)
  }
  return `M0,120 L${pts.join(' L')} L1440,120 Z`
})()

const TORN_CRUMBS = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 131 + 40) % 1440,
  y: 14 + ((i * 53) % 60),
  r: 1 + (i % 3),
}))

type Floater = {
  kind: 'leaf' | 'lemon' | 'tomato' | 'sprig'
  /** position + size classes */
  cls: string
  /** vertical drift (px per px of distance from screen centre); negative lags behind the scroll */
  speed: number
  /** sideways drift; positive slides left while scrolling down, negative slides right */
  x: number
  rot: number
  spin: number
  tone?: 'a' | 'b'
}

const FLOATERS: Floater[] = [
  { kind: 'leaf', cls: '-left-6 top-[6%] w-24 lg:left-[1%] lg:w-44', speed: 0.3, x: 0.18, rot: -24, spin: 0.03, tone: 'a' },
  { kind: 'leaf', cls: 'left-[8%] top-[34%] w-14 lg:left-[16%] lg:top-[40%] lg:w-24', speed: -0.22, x: 0.12, rot: 38, spin: -0.035, tone: 'b' },
  { kind: 'sprig', cls: 'left-[22%] top-[7%] hidden w-8 lg:block lg:w-14', speed: 0.45, x: 0.1, rot: 38, spin: 0.03 },
  { kind: 'tomato', cls: 'left-[7%] top-[14%] hidden w-8 lg:block lg:left-[13%] lg:w-12', speed: 0.55, x: 0.14, rot: 0, spin: 0.05 },
  { kind: 'lemon', cls: 'left-[18%] bottom-[10%] w-16 lg:left-[23%] lg:bottom-[14%] lg:w-28', speed: -0.3, x: 0.2, rot: 12, spin: 0.08 },
  { kind: 'tomato', cls: '-left-2 bottom-[8%] w-12 lg:left-[2%] lg:bottom-[10%] lg:w-16', speed: 0.4, x: 0.15, rot: 0, spin: 0.05 },
  { kind: 'leaf', cls: 'left-[44%] bottom-[7%] w-10 lg:left-[41%] lg:w-16', speed: 0.5, x: -0.1, rot: 64, spin: 0.05, tone: 'a' },
  { kind: 'leaf', cls: 'left-[58%] bottom-[10%] w-12 lg:left-[55%] lg:w-20', speed: -0.25, x: -0.14, rot: -42, spin: -0.04, tone: 'b' },
  { kind: 'lemon', cls: 'right-[22%] top-[9%] w-12 lg:right-[27%] lg:w-20', speed: 0.55, x: -0.2, rot: -8, spin: 0.09 },
  { kind: 'leaf', cls: '-right-4 top-[16%] w-24 lg:right-[2%] lg:top-[12%] lg:w-48', speed: 0.28, x: -0.18, rot: 28, spin: -0.03, tone: 'a' },
  { kind: 'sprig', cls: 'right-[24%] top-[52%] hidden w-8 lg:block lg:w-14', speed: -0.3, x: -0.12, rot: -30, spin: 0.03 },
  { kind: 'leaf', cls: 'right-[8%] bottom-[16%] w-20 lg:right-[10%] lg:bottom-[10%] lg:w-40', speed: 0.4, x: -0.2, rot: -70, spin: 0.03, tone: 'b' },
  { kind: 'tomato', cls: 'right-[6%] top-[58%] hidden w-8 lg:block lg:w-12', speed: -0.4, x: -0.16, rot: 0, spin: 0.05 },
]

/* ------------------------------------------------------------------ */
/* One dish: big round plate beside its text, no card                  */
/* ------------------------------------------------------------------ */

function DishRow({
  recipe,
  flip,
  stackIndex,
  accent,
  saved,
  onSave,
  onOpen,
}: {
  recipe: Recipe
  flip: boolean
  stackIndex: number
  accent: number
  saved: boolean
  onSave: () => void
  onOpen: () => void
}) {
  return (
    /* On large screens each panel sticks near the top and the next one
       slides up over it, leaving a thin edge of the previous panel showing. */
    <article
      className="lg:sticky"
      style={{ top: `${96 + stackIndex * 18}px`, zIndex: stackIndex + 1 }}
    >
      <div className="grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-[#eaf2dd] to-[#dde9cb] px-6 py-10 shadow-[0_-14px_32px_-20px_rgba(47,74,36,0.5)] sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-14 lg:py-14">
        <div className={`relative lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <div
            data-speed={flip ? -0.16 : 0.16}
            data-x={flip ? 0.12 : -0.12}
            data-rot={flip ? 5 : -5}
            data-spin={flip ? -0.014 : 0.014}
            className={`mx-auto w-full max-w-[20rem] will-change-transform sm:max-w-[24rem] lg:max-w-[28rem] ${
              flip ? 'lg:-mr-24 lg:ml-auto' : 'lg:-ml-24'
            }`}
          >
            <div className="rounded-full bg-white p-3 shadow-[0_30px_60px_-20px_rgba(47,74,36,0.45)]">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={400}
                height={400}
                className="aspect-square w-full rounded-full object-cover"
              />
            </div>
          </div>

          {/* A small leaf / lemon / tomato that moves faster than the plate, for depth */}
          <div
            data-speed={0.45}
            data-x={flip ? -0.18 : 0.18}
            data-rot={accent * 25}
            data-spin={0.05}
            className={`pointer-events-none absolute top-0 z-10 w-12 will-change-transform lg:w-16 ${
              flip ? 'left-0' : 'right-0'
            }`}
          >
            {accent === 0 && <Leaf tone="a" className="h-auto w-full drop-shadow-md" />}
            {accent === 1 && <Lemon className="h-auto w-full drop-shadow-md" />}
            {accent === 2 && <Tomato className="h-auto w-full drop-shadow-md" />}
          </div>
        </div>

        <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          <p className="inline-flex items-center gap-2 text-sm text-[#4f6f35]">
            <Clock3 size={16} />
            {recipe.time}
            <span className="text-[#4f6f35]/70">
              · {recipe.ingredients.length} ingredients
            </span>
          </p>
          <h5 className="mt-3 font-display text-3xl leading-tight text-[#2f4a24] sm:text-4xl">
            {recipe.title}
          </h5>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#2f4a24]/75">
            {recipe.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#4f6f35] text-white hover:bg-[#3f5a2a]"
            >
              <Link href={`/recipe/${recipeSlug(recipe)}`}>Full recipe</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#4f6f35] bg-transparent text-[#2f4a24] hover:bg-white/60"
              onClick={onOpen}
            >
              Quick view
            </Button>
            <button
              type="button"
              onClick={onSave}
              aria-pressed={saved}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#2f4a24] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f6f35]"
            >
              <Heart
                size={18}
                className={saved ? 'fill-rose text-rose' : 'text-[#4f6f35]'}
              />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/* Footer: cream page flows down into deep green through a wave        */
/* ------------------------------------------------------------------ */

/* Edit these to change the footer links. */
const FOOTER_EXPLORE = [
  { label: 'Home', href: '/' },
  { label: 'All recipes', href: '/recipes' },
  { label: 'Shopping list', href: '/shopping-list' },
]

const FOOTER_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

/* Replace each '#' with your real profile link. */
const FOOTER_SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'TikTok', href: '#' },
]
function SiteFooter() {
  const year = 2026

  return (
    <footer className="relative" style={{ backgroundColor: '#faf6e8' }} aria-label="Site footer">
      {/* Wave: a lighter layer sits behind the dark one for depth */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative z-10 -mb-px block h-14 w-full sm:h-24"
        aria-hidden="true"
      >
        <path
          d="M0,52 C180,112 360,2 560,48 C760,94 920,12 1100,52 C1260,86 1360,36 1440,56 L1440,120 L0,120 Z"
          fill="#6f8d54"
          fillOpacity="0.55"
        />
        <path
          d="M0,78 C200,30 420,116 660,70 C900,24 1120,108 1440,62 L1440,120 L0,120 Z"
          fill="#2f4a24"
        />
      </svg>

      <div className="relative overflow-hidden bg-gradient-to-b from-[#2f4a24] via-[#294020] to-[#1b2e13] text-[#f4efd8]">
        {/* grain over the green so it is not one flat tone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: GRAIN, opacity: 0.55, mixBlendMode: 'soft-light' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 size-[28rem] rounded-full bg-[#6f8d54]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-[#f7b32b]/10 blur-3xl"
        />

        {/* botanicals that drift as the page scrolls */}
        <div
          data-speed="0.25"
          data-x="-0.12"
          data-rot="-30"
          data-spin="0.03"
          className="pointer-events-none absolute -right-6 top-6 w-24 opacity-90 will-change-transform lg:right-10 lg:w-40"
        >
          <Leaf tone="a" className="h-auto w-full drop-shadow-lg" />
        </div>
        <div
          data-speed="-0.2"
          data-x="0.12"
          data-rot="14"
          data-spin="0.06"
          className="pointer-events-none absolute left-[6%] top-[38%] hidden w-14 will-change-transform lg:block"
        >
          <Lemon className="h-auto w-full drop-shadow-lg" />
        </div>
        <div
          data-speed="0.18"
          data-x="0.1"
          data-rot="52"
          data-spin="-0.03"
          className="pointer-events-none absolute bottom-24 right-[30%] hidden w-16 opacity-70 will-change-transform lg:block"
        >
          <Leaf tone="b" className="h-auto w-full" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-6 sm:pt-10 lg:px-8">
          {/* Call to action */}
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-base text-[#f4efd8]/70">Hungry?</p>
              <h2 className="mt-2 font-display text-4xl leading-[1.05] text-[#fbf6c8] sm:text-5xl lg:text-6xl">
                Let's cook something good
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-full bg-[#fbf6c8] px-7 py-3 text-sm font-semibold text-[#2f4a24] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbf6c8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2f4a24]"
              >
                Browse recipes
                <ArrowRight size={16} />
              </Link>
              <a
                href="#latest-heading"
                className="inline-flex items-center rounded-full border border-white/35 px-7 py-3 text-sm font-semibold text-[#f4efd8] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbf6c8]"
              >
                Latest recipes
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-display text-3xl text-[#fbf6c8]">EatsByTeks</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f4efd8]/75">
                Everyday dinners and something sweet to finish, cooked in a real
                kitchen and written down so you can cook them too.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {FOOTER_SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      className="inline-flex rounded-full border border-white/25 px-4 py-1.5 text-sm text-[#f4efd8] transition-colors hover:border-[#fbf6c8] hover:text-[#fbf6c8]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Explore" className="lg:col-span-2">
              <h3 className="font-display text-lg text-[#fbf6c8]">Explore</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {FOOTER_EXPLORE.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[#f4efd8]/80 underline-offset-4 transition-colors hover:text-[#fbf6c8] hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Categories" className="lg:col-span-2">
              <h3 className="font-display text-lg text-[#fbf6c8]">Categories</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {FOOTER_CATEGORIES.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/recipes?category=${encodeURIComponent(c)}`}
                      className="text-[#f4efd8]/80 underline-offset-4 transition-colors hover:text-[#fbf6c8] hover:underline"
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h3 className="font-display text-lg text-[#fbf6c8]">How we cook</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#f4efd8]/80">
                {PILLARS.map((p) => (
                  <li key={p.label} className="flex items-center gap-3">
                    <Leaf tone="a" className="h-5 w-auto shrink-0" />
                    {p.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-[#f4efd8]/60 sm:flex-row">
            <p>© {year} EatsByTeks. All recipes tested in our own kitchen.</p>
            <a
              href="#hero-heading"
              className="underline-offset-4 transition-colors hover:text-[#fbf6c8] hover:underline"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function HomePage() {
  const { saved, selected, setSelected, toggleSaved } = useRecipeShelf()
  const [filter, setFilter] = useState<string>('All')
  const rootRef = useRef<HTMLElement | null>(null)

  const featured = pick(0)
  const closing = pick(2)
  const visible =
    filter === 'All'
      ? homeRecipes
      : homeRecipes.filter((r: Recipe) => r.category === filter)
  const grouped: {
    category: string
    total: number
    subcategories: { name: string; items: Recipe[] }[]
  }[] = groupRecipes(visible)

  /* Scroll-linked motion: every [data-speed] element drifts vertically
     (and slowly turns) relative to its container's distance from the
     middle of the screen. Re-runs when the filter changes so newly
     rendered dishes are picked up. */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      root.querySelectorAll<HTMLElement>('[data-speed],[data-x]').forEach((el) => {
        el.style.transform = `rotate(${Number(el.dataset['rot'] ?? 0)}deg)`
      })
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      root.querySelectorAll<HTMLElement>('[data-speed],[data-x]').forEach((el) => {
        const host = el.parentElement
        if (!host) return
        const r = host.getBoundingClientRect()
        if (r.bottom < -500 || r.top > vh + 500) return
        const delta = r.top + r.height / 2 - vh / 2
        const speed = Number(el.dataset['speed'] ?? 0)
        const spin = Number(el.dataset['spin'] ?? 0)
        const rot = Number(el.dataset['rot'] ?? 0)
        const x = Math.max(-300, Math.min(300, delta * Number(el.dataset['x'] ?? 0)))
        const y = Math.max(-420, Math.min(420, delta * speed))
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(
          rot +
          delta * spin
        ).toFixed(2)}deg)`
      })
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true, capture: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll, { capture: true })
      window.removeEventListener('resize', onScroll)
    }
  }, [filter])

  let rowIndex = 0

  return (
    <SiteLayout>
      <main ref={rootRef}>
        {/* HERO: centred headline, food scattered around it */}
        <section
          className="relative isolate overflow-hidden"
          style={PAPER}
          aria-labelledby="hero-heading"
        >
          {/* spotlight + sprinkled specks, fading into the torn edge */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={HERO_GLOW}
          />

          <div className="relative flex min-h-[94vh] items-center justify-center px-5 pb-28 pt-32">
            {/* Dishes (hidden on small screens so the headline stays readable) */}
            <div
              data-speed="0.24"
              data-x="0.28"
              data-rot="-6"
              data-spin="0.02"
              className="pointer-events-none absolute -left-28 top-[22%] z-10 hidden w-72 will-change-transform md:block lg:-left-24 lg:w-[26rem]"
            >
              <div className="rounded-full bg-[#b9814a] p-3 shadow-2xl">
                <Image
                  src={pick(1).image}
                  alt=""
                  width={280}
                  height={280}
                  className="aspect-square w-full rounded-full object-cover"
                  fetchPriority="high"
                />
              </div>
            </div>

            <div
              data-speed="-0.22"
              data-x="-0.24"
              data-rot="4"
              data-spin="-0.016"
              className="pointer-events-none absolute -right-14 top-[10%] z-10 hidden w-48 will-change-transform md:block lg:-right-12 lg:w-64"
            >
              <div className="rounded-full bg-white p-2 shadow-2xl">
                <Image
                  src={pick(2).image}
                  alt=""
                  width={220}
                  height={220}
                  className="aspect-square w-full rounded-full object-cover"
                />
              </div>
            </div>

            <div
              data-speed="0.34"
              data-x="-0.3"
              data-rot="-3"
              data-spin="0.018"
              className="pointer-events-none absolute -right-10 top-[44%] z-10 hidden w-56 will-change-transform md:block lg:-right-8 lg:w-72"
            >
              <div className="rounded-full bg-white p-2 shadow-2xl">
                <Image
                  src={pick(3).image}
                  alt=""
                  width={260}
                  height={260}
                  className="aspect-square w-full rounded-full object-cover"
                />
              </div>
            </div>

            {/* Herbs, lemons, tomatoes */}
            {FLOATERS.map((f, i) => (
              <div
                key={i}
                data-speed={f.speed}
                data-rot={f.rot}
                data-spin={f.spin}
                className={`pointer-events-none absolute z-10 will-change-transform ${f.cls}`}
              >
                {f.kind === 'leaf' && (
                  <Leaf tone={f.tone ?? 'a'} className="h-auto w-full drop-shadow-md" />
                )}
                {f.kind === 'lemon' && (
                  <Lemon className="h-auto w-full drop-shadow-md" />
                )}
                {f.kind === 'tomato' && (
                  <Tomato className="h-auto w-full drop-shadow-md" />
                )}
                {f.kind === 'sprig' && <Sprig className="h-auto w-full" />}
              </div>
            ))}

            <div
              data-speed="-0.2"
              className="relative z-20 mx-auto max-w-2xl text-center will-change-transform"
            >
              <p className="text-base text-[#2f4a24]/70">
                From the kitchen at EatsByTeks
              </p>
              <h1
                id="hero-heading"
                className="mt-4 font-display text-5xl leading-[0.98] text-[#2f4a24] sm:text-7xl xl:text-8xl"
              >
                A world of flavour
              </h1>
              <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-[#2f4a24]/70 sm:text-lg">
                Everyday dinners and something sweet to finish. Honest
                ingredients, simple technique and good taste, shared one recipe
                at a time.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#7f9d62] px-8 text-white hover:bg-[#6f8d54]"
                >
                  <a href="#latest-heading">
                    Latest recipes
                    <ArrowDown size={16} className="ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-[#7f9d62] bg-transparent text-[#2f4a24] hover:bg-white/60"
                >
                  <Link href="/recipes">Recipe index</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Torn edge + the three principles on cream */}
          <div className="relative">
            <svg
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              className="block h-14 w-full sm:h-24"
              aria-hidden="true"
            >
              <path d={TORN_PATH} fill="#f1ead0" />
              {TORN_CRUMBS.map((c, i) => (
                <circle
                  key={i}
                  cx={c.x}
                  cy={c.y}
                  r={c.r}
                  fill="#b08a5a"
                  fillOpacity="0.55"
                />
              ))}
            </svg>

            <div className="bg-[#f1ead0] px-5 pb-20 pt-2 sm:pb-28">
              <div className="mx-auto max-w-6xl">
                <h2 className="text-center font-display text-3xl text-[#2f4a24] sm:text-4xl">
                  Three things we never compromise on
                </h2>
                <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
                  {PILLARS.map((p) => (
                    <li key={p.label} className="text-center">
                      <h3 className="font-display text-xl text-[#2f4a24]">
                        {p.label}
                      </h3>
                      <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#2f4a24]/70">
                        {p.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CHEF */}
        <section style={PAPER} aria-labelledby="chef-heading">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <div
                data-speed="0.1"
                data-rot="-3"
                className="mx-auto w-full max-w-sm will-change-transform"
              >
                <div className="rounded-full bg-white p-3 shadow-[0_30px_60px_-20px_rgba(47,74,36,0.45)]">
                  <Image
                    src={chefImg}
                    alt="Chef at EatsByTeks"
                    width={400}
                    height={400}
                    className="aspect-square w-full rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-base text-[#4f6f35]">Meet the chef</p>
              <h2
                id="chef-heading"
                className="mt-3 font-display text-4xl leading-tight text-[#2f4a24] sm:text-5xl"
              >
                Cooking that feels like home
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#2f4a24]/75">
                Hi, I'm Teks. I cook the food I grew up eating and the dishes I
                fell in love with along the way, from a quick weeknight pasta
                to a slow Sunday pilau. Every recipe here is tested in my own
                kitchen until it is simple, reliable and worth repeating.
              </p>
              <ul className="mt-8 grid grid-cols-3 gap-6 text-center sm:max-w-md">
                <li>
                  <p className="font-display text-3xl text-[#2f4a24]">40+</p>
                  <p className="mt-1 text-sm text-[#4f6f35]">Recipes</p>
                </li>
                <li>
                  <p className="font-display text-3xl text-[#2f4a24]">30 min</p>
                  <p className="mt-1 text-sm text-[#4f6f35]">Average cook</p>
                </li>
                <li>
                  <p className="font-display text-3xl text-[#2f4a24]">100%</p>
                  <p className="mt-1 text-sm text-[#4f6f35]">Tested</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* QUOTE BAND */}
        <section className="px-5 py-16 text-center sm:py-20" style={BLEND_BAND}>
          <p className="mx-auto max-w-3xl font-display text-2xl leading-snug text-[#2f4a24] sm:text-3xl">
            "Good food doesn't need to be complicated. It needs good
            ingredients, a little patience and someone to share it with."
          </p>
          <p className="mt-5 text-sm text-[#4f6f35]">Chef Teks</p>
        </section>

        {/* FEATURED: one large rounded panel, plate breaking out of it */}
        <section
          className="relative overflow-x-clip"
          style={PAPER}
          aria-labelledby="featured-heading"
        >
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
            <div
              data-speed="0.16"
              data-rot="20"
              data-spin="0.01"
              className="pointer-events-none absolute -left-6 top-10 w-20 will-change-transform lg:left-2 lg:w-32"
            >
              <Leaf tone="b" className="h-auto w-full opacity-80" />
            </div>
            <div
              data-speed="-0.12"
              data-rot="-30"
              data-spin="-0.01"
              className="pointer-events-none absolute -right-4 bottom-8 w-20 will-change-transform lg:right-2 lg:w-36"
            >
              <Leaf tone="a" className="h-auto w-full opacity-80" />
            </div>

            <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-[#eaf2dd] to-[#d9e7c5] px-6 py-12 sm:px-12 lg:grid-cols-12 lg:gap-8 lg:py-20 lg:pl-16">
              <div className="lg:col-span-6">
                <p className="text-base text-[#4f6f35]">
                  Featured · {featured.category}
                </p>
                <h2
                  id="featured-heading"
                  className="mt-3 font-display text-4xl leading-[1.02] text-[#2f4a24] sm:text-5xl lg:text-6xl"
                >
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#2f4a24]/75">
                  {featured.description}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-[#4f6f35]">
                  <Clock3 size={16} />
                  {featured.time}
                  <span className="text-[#4f6f35]/70">
                    · {featured.ingredients.length} ingredients
                  </span>
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#4f6f35] text-white hover:bg-[#3f5a2a]"
                  >
                    <Link href={`/recipe/${recipeSlug(featured)}`}>
                      Full recipe
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-[#4f6f35] bg-transparent text-[#2f4a24] hover:bg-white/60"
                    onClick={() => setSelected(featured)}
                  >
                    Quick view
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div
                  data-speed="-0.18"
                  data-x="0.1"
                  data-rot="3"
                  data-spin="0.012"
                  className="mx-auto w-full max-w-md will-change-transform lg:-mr-24 lg:ml-auto lg:max-w-[34rem]"
                >
                  <div className="rounded-full bg-white p-4 shadow-[0_40px_80px_-24px_rgba(47,74,36,0.5)]">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      width={400}
                      height={400}
                      className="aspect-square w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LATEST: category → subcategory → dishes, as alternating panels */}
        <section
          className="scroll-mt-20 overflow-x-clip"
          style={PAPER_GREEN}
          aria-labelledby="latest-heading"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 sm:py-24 lg:px-8">
            <div className="mb-16 text-center">
              <h2
                id="latest-heading"
                className="font-display text-4xl text-[#2f4a24] sm:text-5xl lg:text-6xl"
              >
                Latest recipes
              </h2>

              <div
                className="mt-8 flex flex-wrap justify-center gap-2"
                role="group"
                aria-label="Filter recipes by category"
              >
                {['All', ...CATEGORIES].map((c) => {
                  const active = c === filter
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFilter(c)}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f6f35] focus-visible:ring-offset-2 ${
                        active
                          ? 'border-[#4f6f35] bg-[#4f6f35] text-white'
                          : 'border-[#4f6f35]/40 text-[#2f4a24] hover:border-[#4f6f35]'
                      }`}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>

            <div key={filter} className="space-y-32">
              {grouped.map((group) => (
                <div key={group.category}>
                  {/* Category heading with a giant ghost word that slides sideways as you scroll */}
                  <div className="relative mb-16 py-12 text-center sm:py-16">
                    <div
                      data-x="0.3"
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-display text-[5.5rem] leading-none text-[#e1ebd2] will-change-transform sm:text-[9rem] lg:text-[13rem]"
                    >
                      {group.category}
                    </div>
                    <div
                      data-speed="0.4"
                      data-x="0.2"
                      data-rot="-20"
                      data-spin="0.03"
                      className="pointer-events-none absolute left-[4%] top-2 w-10 will-change-transform sm:w-14"
                    >
                      <Leaf tone="a" className="h-auto w-full" />
                    </div>
                    <div
                      data-speed="-0.35"
                      data-x="-0.2"
                      data-rot="30"
                      data-spin="-0.04"
                      className="pointer-events-none absolute bottom-2 right-[4%] w-10 will-change-transform sm:w-14"
                    >
                      <Lemon className="h-auto w-full" />
                    </div>

                    <div className="relative">
                      <h3 className="font-display text-3xl text-[#2f4a24] sm:text-4xl">
                        {group.category}
                      </h3>
                      <p className="mt-2 text-sm text-[#4f6f35]">
                        {group.total} {group.total === 1 ? 'recipe' : 'recipes'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-24">
                    {group.subcategories.map((sub) => (
                      <div key={sub.name}>
                        <h4 className="mb-8 text-center font-display text-xl italic text-[#4f6f35]">
                          {sub.name}
                        </h4>

                        {/* Panels stack on top of each other as you scroll (large screens) */}
                        <div className="space-y-12 pb-4 lg:space-y-[28vh]">
                          {sub.items.map((recipe: Recipe, stackIndex: number) => {
                            const n = rowIndex++
                            return (
                              <DishRow
                                key={recipe.id}
                                recipe={recipe}
                                flip={n % 2 === 1}
                                stackIndex={stackIndex}
                                accent={n % 3}
                                saved={saved.includes(recipe.id)}
                                onSave={() => toggleSaved(recipe.id)}
                                onOpen={() => setSelected(recipe)}
                              />
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING: panel with a bowl and leaves, then the footer */}
        <section
          className="relative overflow-x-clip"
          style={PAPER}
          aria-labelledby="closing-heading"
        >
          <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-8 sm:pb-32 lg:px-8">
            <div
              data-speed="0.14"
              data-rot="-20"
              data-spin="0.01"
              className="pointer-events-none absolute -left-4 bottom-12 w-20 will-change-transform lg:left-0 lg:w-36"
            >
              <Leaf tone="a" className="h-auto w-full opacity-80" />
            </div>
            <div
              data-speed="-0.14"
              data-rot="30"
              data-spin="-0.01"
              className="pointer-events-none absolute -right-4 top-4 w-20 will-change-transform lg:right-0 lg:w-32"
            >
              <Leaf tone="b" className="h-auto w-full opacity-80" />
            </div>

            <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-[#eaf2dd] to-[#d9e7c5] px-6 py-12 sm:px-12 lg:grid-cols-12 lg:gap-8 lg:py-16 lg:pl-16">
              <div className="lg:col-span-6">
                <h2
                  id="closing-heading"
                  className="font-display text-4xl leading-tight text-[#2f4a24] sm:text-5xl"
                >
                  Every dish we've shared, in one place
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#2f4a24]/75">
                  Search by name, filter by category or find a recipe by the
                  ingredients you already have.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 rounded-full bg-[#4f6f35] text-white hover:bg-[#3f5a2a]"
                >
                  <Link href="/recipes">
                    Browse the recipe index
                    <ArrowRight size={17} className="ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="lg:col-span-6">
                <div
                  data-speed="-0.18"
                  data-x="0.1"
                  data-rot="-4"
                  data-spin="0.012"
                  className="mx-auto w-full max-w-sm will-change-transform lg:-mr-20 lg:ml-auto lg:max-w-[30rem]"
                >
                  <div className="rounded-full bg-white p-4 shadow-[0_40px_80px_-24px_rgba(47,74,36,0.5)]">
                    <Image
                      src={closing.image}
                      alt={closing.title}
                      width={360}
                      height={360}
                      loading="lazy"
                      className="aspect-square w-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SiteFooter />
        </section>
      </main>

      <RecipeDialog
        recipe={selected}
        saved={selected ? saved.includes(selected.id) : false}
        onSave={() => {
          if (selected) {
            toggleSaved(selected.id)
          }
        }}
        onClose={() => setSelected(null)}
      />
    </SiteLayout>
  )
}