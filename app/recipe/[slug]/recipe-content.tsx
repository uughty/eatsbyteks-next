'use client'


import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Heart,
  ListChecks,
  Minus,
  Plus,
  Printer,
  Share2,
  ShoppingBasket,
  Users,
} from 'lucide-react'
import { SiteLayout } from '@/components/SiteLayout'
import { recipeSlug, recipes } from '@/lib/recipes'
import type { Recipe } from '@/lib/recipes'
import { useRecipeShelf } from '@/lib/useRecipeShelf'




/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */



const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/></svg>\")"


const FOOTER_SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/eatsbyteks_/' },
  { label: 'TikTok', href: 'https://tr.ee/dVG7zg4CMu' },
  { label: 'YouTube', href: 'https://tr.ee/6U-ToT3P2Z' },
]


const FOOTER_EXPLORE = [
  { label: 'Home', href: '/' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Collections', href: '/collections' },
  { label: 'Our story', href: '/our-story' },
  { label: 'Shopping list', href: '/shopping-list' },
]


const FOOTER_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Baked Goods']


const PILLARS = [
  { label: 'Tested in a real kitchen' },
  { label: 'Everyday ingredients' },
  { label: 'Clear, step-by-step method' },
  { label: 'Made to share' },
]


function Leaf({ tone = 'a', className = '' }: { tone?: 'a' | 'b'; className?: string }) {
  const fill = tone === 'a' ? '#8fb88a' : '#6f8d54'
  return (
    <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
      <path d="M50 4 C92 40 96 100 50 136 C4 100 8 40 50 4 Z" fill={fill} />
      <path d="M50 14 L50 130" stroke="#1b2e13" strokeOpacity=".35" strokeWidth="3" fill="none" />
      <path
        d="M50 50 L28 38 M50 70 L24 58 M50 90 L28 80 M50 50 L72 38 M50 70 L76 58 M50 90 L72 80"
        stroke="#1b2e13"
        strokeOpacity=".25"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  )
}


function Lemon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true">
      <path
        d="M6 45 C6 45 20 40 30 24 C46 4 86 6 100 30 C104 36 108 42 114 45 C108 48 104 54 100 60 C86 84 46 86 30 66 C20 50 6 45 6 45 Z"
        fill="#f7d44a"
      />
      <path d="M30 30 C48 14 80 16 94 34" stroke="#fff" strokeOpacity=".45" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}


/* ---- Footer below is exactly as provided ---- */


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


/* ---------- helpers ---------- */


const minutesOf = (time: string) => {
  const h = /(\d+(?:\.\d+)?)\s*h/i.exec(time)
  const m = /(\d+)\s*m/i.exec(time)
  if (h || m) return (h ? parseFloat(h[1]) * 60 : 0) + (m ? parseInt(m[1], 10) : 0)
  return parseInt(time, 10) || 30
}


/* The Recipe type may name its method/servings fields differently: read them loosely */
const pickList = (r: Recipe, keys: string[]): string[] => {
  const bag = r as unknown as Record<string, unknown>
  for (const k of keys) {
    const v = bag[k]
    if (Array.isArray(v) && v.length) return v.map(String)
  }
  return []
}
const pickText = (r: Recipe, keys: string[]): string => {
  const bag = r as unknown as Record<string, unknown>
  for (const k of keys) {
    const v = bag[k]
    if ((typeof v === 'string' || typeof v === 'number') && v) return String(v)
  }
  return ''
}


const FRACTIONS: Record<string, number> = { '½': 0.5, '¼': 0.25, '¾': 0.75, '⅓': 1 / 3, '⅔': 2 / 3 }
const QTY = /^(\d+\s+\d\/\d|\d+\/\d|\d*\.?\d+|[½¼¾⅓⅔])/


const toNumber = (s: string) => {
  const t = s.trim()
  if (FRACTIONS[t]) return FRACTIONS[t]
  const mixed = /^(\d+)\s+(\d)\/(\d)$/.exec(t)
  if (mixed) return +mixed[1] + +mixed[2] / +mixed[3]
  const frac = /^(\d)\/(\d)$/.exec(t)
  if (frac) return +frac[1] / +frac[2]
  return parseFloat(t)
}


const scaleLine = (line: string, factor: number) => {
  if (factor === 1) return line
  const m = QTY.exec(line)
  if (!m) return line
  const n = Math.round(toNumber(m[1]) * factor * 100) / 100
  return `${n}${line.slice(m[1].length)}`
}


/* "150 g fresh spinach" -> { qty: "150 g", name: "fresh spinach" } for the dotted leader */
const splitLine = (line: string) => {
  const m = /^((?:\d+\s+\d\/\d|\d+\/\d|\d*\.?\d+|[½¼¾⅓⅔])\s*(?:kg|g|ml|l|tsp|tbsp|cups?|oz|lb|pinch|cloves?)?)\s+(.+)$/i.exec(line)
  return m ? { qty: m[1].trim(), name: m[2] } : { qty: '', name: line }
}


/* ---------- page ---------- */


export default function RecipeContent() {
  const params = useParams<{ slug: string | string[] }>()
  const raw = Array.isArray(params.slug) ? params.slug[0] : params.slug


  /* Match on the decoded slug, the raw slug, or the id, and never redirect: a miss shows a message */
  const recipe = useMemo(() => {
    let slug = raw ?? ''
    try {
      slug = decodeURIComponent(slug)
    } catch {
      /* keep raw */
    }
    return (
      recipes.find((r: Recipe) => recipeSlug(r) === slug || recipeSlug(r) === raw) ??
      recipes.find((r: Recipe) => String(r.id) === slug)
    )
  }, [raw])


  if (!recipe) {
    return (
      <SiteLayout>
        <main className="bg-[#faf6e8]">
          <section className="mx-auto max-w-xl px-5 py-32 text-center">
            <h1 id="hero-heading" className="font-display text-5xl text-[#123222]">Recipe not found</h1>
            <p className="mt-4 text-[#123222]/70">That recipe may have moved. Browse the full list to find it.</p>
            <Link href="/recipes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2f6a45] px-6 py-3 text-sm font-semibold text-white hover:bg-[#123222]">
              <ArrowLeft size={16} /> All recipes
            </Link>
          </section>
          <SiteFooter />
        </main>
      </SiteLayout>
    )
  }


  return <RecipeView recipe={recipe} />
}


function RecipeView({ recipe }: { recipe: Recipe }) {
  const { saved, toggleSaved } = useRecipeShelf()
  const isSaved = saved.includes(recipe.id)


  const baseServings = Number(pickText(recipe, ['servings', 'serves'])) || 4
  const [servings, setServings] = useState(baseServings)
  const [done, setDone] = useState<number[]>([])
  const [notice, setNotice] = useState('')


  const steps = pickList(recipe, ['steps', 'method', 'instructions', 'directions'])
  const tip = pickText(recipe, ['tip', 'tips', 'note'])
  const factor = servings / baseServings
  const baseMins = minutesOf(recipe.time)
  /* Time follows the servings: prep and heat-up stay put, the rest grows or shrinks with the batch */
  const mins = Math.max(1, Math.round(baseMins * (0.6 + 0.4 * (servings / baseServings))))
  const timeLabel = mins >= 60 ? `${Math.floor(mins / 60)} hr${mins % 60 ? ` ${mins % 60} min` : ''}` : `${mins} min`
  const ringMax = Math.max(90, mins)
  const ring = 2 * Math.PI * 42
  const ringFill = (ring * mins) / ringMax
  const progress = steps.length ? Math.round((done.length / steps.length) * 100) : 0


  const related = recipes
    .filter((r: Recipe) => r.id !== recipe.id && r.category === recipe.category)
    .concat(recipes.filter((r: Recipe) => r.id !== recipe.id && r.category !== recipe.category))
    .slice(0, 3)


  const flash = (text: string) => {
    setNotice(text)
    window.setTimeout(() => setNotice(''), 2200)
  }


  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: recipe.title, url })
      else {
        await navigator.clipboard.writeText(url)
        flash('Link copied')
      }
    } catch {
      /* share sheet dismissed */
    }
  }


  const toggleStep = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))


  const iconBtn =
    'inline-flex items-center gap-2 rounded-full border border-[#2f6a45]/40 bg-white/70 px-4 py-2 text-sm font-semibold text-[#123222] backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45]'


  return (
    <SiteLayout>
      <main
        className="relative overflow-hidden"
        style={{
          backgroundColor: '#faf6e8',
          backgroundImage:
            'radial-gradient(60rem 36rem at 90% -5%, #dcebc9 0%, transparent 60%), radial-gradient(44rem 30rem at -5% 35%, #e6efce 0%, transparent 62%), radial-gradient(50rem 30rem at 100% 75%, #f3efc3 0%, transparent 60%), linear-gradient(180deg, #eaf3df 0%, #f4f3dc 45%, #faf6e8 100%)',
        }}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: GRAIN, opacity: 0.12, mixBlendMode: 'multiply' }} />
        <Leaf tone="a" className="pointer-events-none absolute -left-10 top-72 hidden w-40 rotate-[24deg] opacity-30 lg:block" />
        <Leaf tone="b" className="pointer-events-none absolute -right-8 top-[46rem] hidden w-36 -rotate-[28deg] opacity-25 lg:block" />


        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8 lg:pt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
            <Link href="/recipes" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2f6a45] hover:underline">
              <ArrowLeft size={16} /> All recipes
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" onClick={() => toggleSaved(recipe.id)} aria-pressed={isSaved} className={iconBtn}>
                <Heart size={16} className={isSaved ? 'fill-[#c0392b] text-[#c0392b]' : 'text-[#2f6a45]'} />
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button type="button" onClick={share} className={iconBtn}>
                <Share2 size={16} className="text-[#2f6a45]" /> Share
              </button>
              <button type="button" onClick={() => window.print()} className={iconBtn}>
                <Printer size={16} className="text-[#2f6a45]" /> Print
              </button>
            </div>
          </div>


          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            {/* recipe card */}
            <article className="rounded-[2.5rem] bg-[#fbf9ef] p-7 shadow-[0_40px_80px_-40px_rgba(18,50,34,0.5)] ring-1 ring-[#d3e5c5] sm:p-10">
              <div className="flex items-center gap-4 text-sm text-[#123222]/60">
                <span>{recipe.category}</span>
                <span className="h-px flex-1 bg-[#123222]/20" />
                <Leaf tone="a" className="h-6 w-auto" />
              </div>


              <h1 id="hero-heading" className="mt-6 font-display text-5xl leading-[1.02] text-[#123222] sm:text-6xl">
                {recipe.title}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#123222]/75">{recipe.description}</p>


              <div className="mt-10 flex items-center justify-between gap-3 border-b border-[#123222]/15 pb-3">
                <h2 className="inline-flex items-center gap-2 font-display text-2xl text-[#123222]">
                  <ShoppingBasket size={20} className="text-[#2f6a45]" /> Ingredients
                </h2>
                <div className="inline-flex items-center gap-1 rounded-full bg-white p-1 ring-1 ring-[#cfe3c0]" role="group" aria-label="Servings">
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    disabled={servings <= 1}
                    aria-label="Fewer servings"
                    className="grid size-8 place-items-center rounded-full text-[#123222] hover:bg-[#eaf3df] disabled:opacity-35"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="min-w-[4.5rem] text-center text-sm font-semibold text-[#123222]" aria-live="polite">
                    {servings} {servings === 1 ? 'serving' : 'servings'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServings((s) => Math.min(24, s + 1))}
                    disabled={servings >= 24}
                    aria-label="More servings"
                    className="grid size-8 place-items-center rounded-full text-[#123222] hover:bg-[#eaf3df] disabled:opacity-35"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>


              <ul className="mt-5 space-y-3">
                {recipe.ingredients.map((line: string, i: number) => {
                  const { qty, name } = splitLine(scaleLine(line, factor))
                  return (
                    <li key={`${line}-${i}`} className="flex items-baseline gap-2 text-sm text-[#123222]">
                      <span className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-[#2f6a45]" />
                      <span>{name}</span>
                      {qty && (
                        <>
                          <span aria-hidden="true" className="min-w-4 flex-1 border-b border-dotted border-[#123222]/35" />
                          <span className="whitespace-nowrap font-semibold">{qty}</span>
                        </>
                      )}
                    </li>
                  )
                })}
              </ul>


              {steps.length > 0 && (
                <>
                  <div className="mt-12 flex items-center justify-between gap-3 border-b border-[#123222]/15 pb-3">
                    <h2 className="inline-flex items-center gap-2 font-display text-2xl text-[#123222]">
                      <ListChecks size={20} className="text-[#2f6a45]" /> Method
                    </h2>
                    {done.length > 0 && (
                      <button type="button" onClick={() => setDone([])} className="text-sm font-semibold text-[#2f6a45] underline-offset-4 hover:underline">
                        Reset steps
                      </button>
                    )}
                  </div>


                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#dcebc9]" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Cooking progress">
                    <div className="h-full rounded-full bg-[#2f6a45] transition-[width] duration-500" style={{ width: `${progress}%` }} />
                  </div>


                  <ol className="mt-6 space-y-5">
                    {steps.map((step, i) => {
                      const on = done.includes(i)
                      return (
                        <li key={i}>
                          <button
                            type="button"
                            onClick={() => toggleStep(i)}
                            aria-pressed={on}
                            className="flex w-full items-start gap-4 rounded-2xl p-2 text-left transition-colors hover:bg-[#eaf3df]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45]"
                          >
                            <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${on ? 'bg-[#2f6a45] text-white' : 'bg-[#123222] text-[#f6f1c4]'}`}>
                              {on ? <Check size={14} /> : i + 1}
                            </span>
                            <span className={`text-sm leading-relaxed text-[#123222] transition-opacity ${on ? 'line-through opacity-45' : ''}`}>{step}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                </>
              )}


              <div className="mt-10 flex items-center gap-5 rounded-full bg-white px-6 py-3 ring-1 ring-[#cfe3c0]">
                <Clock3 size={22} className="text-[#2f6a45]" />
                <span className="text-xs leading-tight text-[#123222]/70">Total<br />time</span>
                <span className="h-8 w-px bg-[#123222]/20" />
                <span className="font-display text-3xl text-[#123222]" aria-live="polite">{timeLabel}</span>
              </div>
            </article>


            {/* visual side */}
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="relative">
                <div className="rounded-[2.5rem] bg-[#f6f1c4] p-3 shadow-[0_50px_90px_-40px_rgba(18,50,34,0.7)]">
                  <img src={recipe.image} alt={recipe.title} className="aspect-[4/5] w-full rounded-[2rem] object-cover sm:aspect-square lg:aspect-[4/5]" />
                </div>
                {tip && (
                  <div className="absolute -bottom-6 right-4 max-w-[16rem] rounded-2xl bg-[#1b2e13] p-5 text-[#f4efd8] shadow-xl sm:right-8">
                    <p className="font-display text-lg text-[#fbf6c8]">Tip</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#f4efd8]/85">{tip}</p>
                  </div>
                )}
              </div>


              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="grid place-items-center rounded-[1.8rem] bg-white p-4 text-center ring-1 ring-[#d3e5c5]">
                  <svg viewBox="0 0 100 100" className="size-20" role="img" aria-label={`${timeLabel} for ${servings} servings`}>
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#dcebc9" strokeWidth="9" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#2f6a45" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${ringFill} ${ring}`} transform="rotate(-90 50 50)" />
                    <text x="50" y="57" textAnchor="middle" className="fill-[#123222] font-display" fontSize="24">{Math.round(mins)}</text>
                  </svg>
                  <p className="mt-1 text-xs font-semibold text-[#123222]/70">minutes</p>
                </div>


                <div className="rounded-[1.8rem] bg-white p-4 text-center ring-1 ring-[#d3e5c5]">
                  <div className="flex h-20 items-center justify-center gap-1" aria-hidden="true">
                    {Array.from({ length: Math.min(servings, 8) }).map((_, i) => (
                      <Users key={i} size={servings > 5 ? 14 : 20} className="text-[#2f6a45]" />
                    ))}
                  </div>
                  <p className="font-display text-2xl text-[#123222]">{servings}</p>
                  <p className="text-xs font-semibold text-[#123222]/70">{servings === 1 ? 'serving' : 'servings'}</p>
                </div>


                <div className="rounded-[1.8rem] bg-white p-4 text-center ring-1 ring-[#d3e5c5]">
                  <div className="flex h-20 flex-wrap content-center items-center justify-center gap-1" aria-hidden="true">
                    {recipe.ingredients.slice(0, 12).map((_: string, i: number) => (
                      <span key={i} className="size-2.5 rounded-full bg-[#8fb88a]" />
                    ))}
                  </div>
                  <p className="font-display text-2xl text-[#123222]">{recipe.ingredients.length}</p>
                  <p className="text-xs font-semibold text-[#123222]/70">ingredients</p>
                </div>


                {steps.length > 0 && (
                  <div className="rounded-[1.8rem] bg-white p-4 text-center ring-1 ring-[#d3e5c5]">
                    <div className="flex h-20 items-center justify-center gap-1" aria-hidden="true">
                      {steps.slice(0, 10).map((_, i) => (
                        <span key={i} className={`h-8 w-2 rounded-full ${i < done.length ? 'bg-[#2f6a45]' : 'bg-[#dcebc9]'}`} />
                      ))}
                    </div>
                    <p className="font-display text-2xl text-[#123222]">{done.length}/{steps.length}</p>
                    <p className="text-xs font-semibold text-[#123222]/70">steps done</p>
                  </div>
                )}
              </div>


              <div className="mt-6 flex flex-wrap gap-3 print:hidden">
                <Link href="/shopping-list" className="inline-flex items-center gap-2 rounded-full bg-[#2f6a45] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#123222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123222] focus-visible:ring-offset-2">
                  Open shopping list <ShoppingBasket size={16} />
                </Link>
              </div>
            </aside>
          </div>


          {related.length > 0 && (
            <section className="mt-24 print:hidden" aria-labelledby="latest-heading">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 id="latest-heading" className="scroll-mt-24 font-display text-3xl text-[#123222] sm:text-4xl">Cook something next</h2>
                <Link href="/recipes" className="inline-flex items-center gap-2 text-sm font-semibold text-[#2f6a45] hover:underline">
                  All recipes <ArrowRight size={15} />
                </Link>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r: Recipe) => (
                  <Link
                    key={r.id}
                    href={`/recipe/${recipeSlug(r)}`}
                    className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-[0_24px_50px_-32px_rgba(18,50,34,0.55)] ring-1 ring-[#d3e5c5]"
                  >
                    <div className="overflow-hidden rounded-[1.5rem]">
                      <img src={r.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="px-3 pb-3 pt-4">
                      <h3 className="font-display text-xl leading-tight text-[#123222]">{r.title}</h3>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#123222]/70">
                        <Clock3 size={14} className="text-[#2f6a45]" /> {r.time}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>


        <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
          {notice && <span className="rounded-full bg-[#123222] px-5 py-2.5 text-sm font-semibold text-[#f6f1c4] shadow-xl">{notice}</span>}
        </div>


        <SiteFooter />
      </main>
    </SiteLayout>
  )
}