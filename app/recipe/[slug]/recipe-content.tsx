'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  Heart,
  ListChecks,
  Mail,
  Minus,
  Plus,
  Printer,
  Share2,
 
  Users,
} from 'lucide-react'
import { SiteLayout } from '@/components/SiteLayout'
import { recipeSlug, recipes } from '@/lib/recipes'
import type { Recipe } from '@/lib/recipes'
import { useRecipeShelf } from '@/lib/useRecipeShelf'
import { supabase } from '@/lib/supabase'

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
  { label: 'All recipes', href: '/recipes' },
]

const FOOTER_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

const PILLARS = [
  { label: 'Honest ingredients' },
  { label: 'Simple technique' },
  { label: 'Good taste' },
]

const CONTACT_EMAIL = 'Eatsbyteks@gmail.com'

const SUBSTACK_URL = 'https://substack.com/@eatsbyteks'

const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '/EatsByTeks-Privacy-Policy.pdf' },
  { label: 'Terms of Service', href: '/EatsByTeks-Terms-of-Service.pdf' },
]

function SiteFooter() {
  const year = 2026
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState<'idle' | 'done'>('idle')

  const subscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !agreed) return
    window.open(SUBSTACK_URL, '_blank', 'noopener,noreferrer')
    setEmail('')
    setAgreed(false)
    setStatus('done')
  }

  return (
    <footer className="relative" style={{ backgroundColor: '#faf6e8' }} aria-label="Site footer">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative z-10 -mb-px block h-14 w-full sm:h-24"
        aria-hidden="true"
      >
        <path
          d="M0,52 C180,112 360,2 560,48 C760,94 920,12 1100,52 C1260,86 1440,56 L1440,120 L0,120 Z"
          fill="#6f8d54"
          fillOpacity="0.55"
        />
        <path
          d="M0,78 C200,30 420,116 660,70 C900,24 1120,108 1440,62 L1440,120 L0,120 Z"
          fill="#2f4a24"
        />
      </svg>

      <div className="relative overflow-hidden bg-gradient-to-b from-[#2f4a24] via-[#294020] to-[#1b2e13] text-[#f4efd8]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: GRAIN, opacity: 0.55, mixBlendMode: 'soft-light' }}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-6 sm:pt-10 lg:px-8">
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
                className="inline-flex items-center gap-2 rounded-full bg-[#fbf6c8] px-7 py-3 text-sm font-semibold text-[#2f4a24] transition-colors hover:bg-white"
              >
                Browse recipes
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="my-12 grid gap-8 rounded-2xl bg-white/[0.07] p-6 ring-1 ring-white/15 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#fbf6c8] text-[#2f4a24]">
                <Mail size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-2xl text-[#fbf6c8] sm:text-3xl">
                  Join the EatsByTeks newsletter
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f4efd8]/75">
                  One easy recipe, a kitchen tip and the occasional new dish, straight to your inbox.
                </p>
              </div>
            </div>

            {status === 'done' ? (
              <p role="status" className="font-display text-lg text-[#fbf6c8]">
                Almost there! Finish subscribing on Substack in the tab that just opened.
              </p>
            ) : (
              <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full flex-1 rounded-full bg-white px-5 py-3 text-sm text-[#2f4a24]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#4f7d2e] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#44691f]"
                >
                  Join now
                </button>
              </form>
            )}
          </div>

          <div className="grid gap-12 pb-14 pt-2 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-display text-3xl text-[#fbf6c8]">EatsByTeks</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f4efd8]/75">
                Everyday dinners and something sweet to finish, cooked in a real kitchen.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-[#f4efd8]/60 sm:flex-row">
            <p>© {year} EatsByTeks. All recipes tested in our own kitchen.</p>
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

const FRACTIONS: Record<string, number> = {
  '½': 0.5,
  '¼': 0.25,
  '¾': 0.75,
  '⅓': 1 / 3,
  '⅔': 2 / 3,
}

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

const splitLine = (line: string) => {
  const m =
    /^((?:\d+\s+\d\/\d|\d+\/\d|\d*\.?\d+|[½¼¾⅓⅔])\s*(?:kg|g|ml|l|tsp|tbsp|cups?|oz|lb|pinch|cloves?)?)\s+(.+)$/i.exec(
      line,
    )

  return m
    ? { qty: m[1].trim(), name: m[2] }
    : { qty: '', name: line }
}

/* ---------- page ---------- */

export default function RecipeContent() {
  const params = useParams<{ slug: string | string[] }>()
  const raw = Array.isArray(params.slug) ? params.slug[0] : params.slug

  const [supabaseRecipe, setSupabaseRecipe] = useState<Recipe | null>(null)
  const [loadingSupabase, setLoadingSupabase] = useState(false)

  const hardcodedRecipe = useMemo(() => {
    let slug = raw ?? ''

    try {
      slug = decodeURIComponent(slug)
    } catch {
      /* keep raw */
    }

    return (
      recipes.find(
        (r: Recipe) =>
          recipeSlug(r) === slug || recipeSlug(r) === raw,
      ) ?? recipes.find((r: Recipe) => String(r.id) === slug)
    )
  }, [raw])

  useEffect(() => {
    if (hardcodedRecipe || !raw) {
      setSupabaseRecipe(null)
      return
    }

    let active = true
    setLoadingSupabase(true)

    const loadSupabaseRecipe = async () => {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('slug', raw)
        .eq('published', true)
        .maybeSingle()

      if (!active) return

      if (error || !data) {
        setSupabaseRecipe(null)
      } else {
        const normalized: Recipe = {
          ...data,
          image: data.image_url,
          ingredients: (data.ingredients ?? []).map(
            (
              ingredient:
                | string
                | {
                    name: string
                    amount?: number | string
                    unit?: string
                  },
            ) => {
              if (typeof ingredient === 'string') {
                return ingredient
              }

              return [
                ingredient.amount,
                ingredient.unit,
                ingredient.name,
              ]
                .filter(Boolean)
                .join(' ')
            },
          ),
          steps: data.steps ?? [],
        }

        setSupabaseRecipe(normalized)
      }

      setLoadingSupabase(false)
    }

    loadSupabaseRecipe()

    return () => {
      active = false
    }
  }, [raw, hardcodedRecipe])

  const recipe = hardcodedRecipe ?? supabaseRecipe

  if (!recipe && loadingSupabase) {
    return (
      <SiteLayout>
        <main className="bg-[#faf6e8]">
          <section className="mx-auto max-w-xl px-5 py-32 text-center">
            <h1 className="font-display text-4xl text-[#123222]">
              Loading recipe…
            </h1>
          </section>
          <SiteFooter />
        </main>
      </SiteLayout>
    )
  }

  if (!recipe) {
    return (
      <SiteLayout>
        <main className="bg-[#faf6e8]">
          <section className="mx-auto max-w-xl px-5 py-32 text-center">
            <h1 id="hero-heading" className="font-display text-5xl text-[#123222]">
              Recipe not found
            </h1>
            <p className="mt-4 text-[#123222]/70">
              That recipe may have moved. Browse the full list to find it.
            </p>
            <Link
              href="/recipes"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2f6a45] px-6 py-3 text-sm font-semibold text-white hover:bg-[#123222]"
            >
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

  const steps = pickList(recipe, [
    'steps',
    'method',
    'instructions',
    'directions',
  ])

  const tip = pickText(recipe, ['tip', 'tips', 'note'])
  const factor = servings / baseServings
  const baseMins = minutesOf(recipe.time)
  const mins = Math.max(
    1,
    Math.round(baseMins * (0.6 + 0.4 * (servings / baseServings))),
  )
  const timeLabel =
    mins >= 60
      ? `${Math.floor(mins / 60)} hr${mins % 60 ? ` ${mins % 60} min` : ''}`
      : `${mins} min`

  const ringMax = Math.max(90, mins)
  const ring = 2 * Math.PI * 42
  const ringFill = (ring * mins) / ringMax
  const progress = steps.length
    ? Math.round((done.length / steps.length) * 100)
    : 0

  const related = recipes
    .filter(
      (r: Recipe) => r.id !== recipe.id && r.category === recipe.category,
    )
    .concat(
      recipes.filter(
        (r: Recipe) => r.id !== recipe.id && r.category !== recipe.category,
      ),
    )
    .slice(0, 3)

  const flash = (text: string) => {
    setNotice(text)
    window.setTimeout(() => setNotice(''), 2200)
  }

  const share = async () => {
    const url = window.location.href

    try {
      if (navigator.share) {
        await navigator.share({ title: recipe.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        flash('Link copied')
      }
    } catch {
      /* share dismissed */
    }
  }

  const toggleStep = (i: number) =>
    setDone((d) =>
      d.includes(i) ? d.filter((x) => x !== i) : [...d, i],
    )

  const iconBtn =
    'inline-flex items-center gap-2 rounded-full border border-[#2f6a45]/40 bg-white/70 px-4 py-2 text-sm font-semibold text-[#123222] backdrop-blur transition-colors hover:bg-white'

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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: GRAIN,
            opacity: 0.12,
            mixBlendMode: 'multiply',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8 lg:pt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2f6a45] hover:underline"
            >
              <ArrowLeft size={16} /> All recipes
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSaved(recipe.id)}
                className={iconBtn}
              >
                <Heart
                  size={16}
                  className={
                    isSaved
                      ? 'fill-[#c0392b] text-[#c0392b]'
                      : 'text-[#2f6a45]'
                  }
                />
                {isSaved ? 'Saved' : 'Save'}
              </button>

              <button type="button" onClick={share} className={iconBtn}>
                <Share2 size={16} className="text-[#2f6a45]" /> Share
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className={iconBtn}
              >
                <Printer size={16} className="text-[#2f6a45]" /> Print
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <article className="rounded-[2.5rem] bg-[#fbf9ef] p-7 shadow-[0_40px_80px_-40px_rgba(18,50,34,0.5)] ring-1 ring-[#d3e5c5] sm:p-10">
              <div className="flex items-center gap-4 text-sm text-[#123222]/60">
                <span>{recipe.category}</span>
                <span className="h-px flex-1 bg-[#123222]/20" />
              </div>

              <h1
                id="hero-heading"
                className="mt-6 font-display text-5xl leading-[1.02] text-[#123222] sm:text-6xl"
              >
                {recipe.title}
              </h1>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#123222]/75">
                {recipe.description}
              </p>

              <div className="mt-10 flex items-center justify-between gap-3 border-b border-[#123222]/15 pb-3">
                

                <div className="inline-flex items-center gap-1 rounded-full bg-white p-1 ring-1 ring-[#cfe3c0]">
                  <button
                    type="button"
                    onClick={() =>
                      setServings((s) => Math.max(1, s - 1))
                    }
                    disabled={servings <= 1}
                    className="grid size-8 place-items-center rounded-full text-[#123222] hover:bg-[#eaf3df] disabled:opacity-35"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="min-w-[4.5rem] text-center text-sm font-semibold text-[#123222]">
                    {servings} {servings === 1 ? 'serving' : 'servings'}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setServings((s) => Math.min(24, s + 1))
                    }
                    disabled={servings >= 24}
                    className="grid size-8 place-items-center rounded-full text-[#123222] hover:bg-[#eaf3df] disabled:opacity-35"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {recipe.ingredients.map((line: string, i: number) => {
                  const { qty, name } = splitLine(
                    scaleLine(line, factor),
                  )

                  return (
                    <li
                      key={`${line}-${i}`}
                      className="flex items-baseline gap-2 text-sm text-[#123222]"
                    >
                      <span className="size-1.5 shrink-0 -translate-y-0.5 rounded-full bg-[#2f6a45]" />
                      <span>{name}</span>

                      {qty && (
                        <>
                          <span
                            aria-hidden="true"
                            className="min-w-4 flex-1 border-b border-dotted border-[#123222]/35"
                          />
                          <span className="whitespace-nowrap font-semibold">
                            {qty}
                          </span>
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
                      <ListChecks size={20} className="text-[#2f6a45]" />
                      Method
                    </h2>

                    {done.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setDone([])}
                        className="text-sm font-semibold text-[#2f6a45] hover:underline"
                      >
                        Reset steps
                      </button>
                    )}
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#dcebc9]">
                    <div
                      className="h-full rounded-full bg-[#2f6a45] transition-[width] duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <ol className="mt-6 space-y-5">
                    {steps.map((step, i) => {
                      const on = done.includes(i)

                      return (
                        <li key={i}>
                          <button
                            type="button"
                            onClick={() => toggleStep(i)}
                            className="flex w-full items-start gap-4 rounded-2xl p-2 text-left transition-colors hover:bg-[#eaf3df]/70"
                          >
                            <span
                              className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                                on
                                  ? 'bg-[#2f6a45] text-white'
                                  : 'bg-[#123222] text-[#f6f1c4]'
                              }`}
                            >
                              {on ? <Check size={14} /> : i + 1}
                            </span>

                            <span
                              className={`text-sm leading-relaxed text-[#123222] ${
                                on ? 'line-through opacity-45' : ''
                              }`}
                            >
                              {step}
                            </span>
                          </button>
                        </li>
                      )
                    })}
                  </ol>
                </>
              )}

              <div className="mt-10 flex items-center gap-5 rounded-full bg-white px-6 py-3 ring-1 ring-[#cfe3c0]">
                <Clock3 size={22} className="text-[#2f6a45]" />
                <span className="text-xs leading-tight text-[#123222]/70">
                  Total
                  <br />
                  time
                </span>
                <span className="h-8 w-px bg-[#123222]/20" />
                <span className="font-display text-3xl text-[#123222]">
                  {timeLabel}
                </span>
              </div>
            </article>

            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="relative">
                <div className="rounded-[2.5rem] bg-[#f6f1c4] p-3 shadow-[0_50px_90px_-40px_rgba(18,50,34,0.7)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="aspect-[4/5] w-full rounded-[2rem] object-cover"
                  />
                </div>

                {tip && (
                  <div className="absolute -bottom-6 right-4 max-w-[16rem] rounded-2xl bg-[#1b2e13] p-5 text-[#f4efd8] shadow-xl">
                    <p className="font-display text-lg text-[#fbf6c8]">Tip</p>
                    <p className="mt-1 text-sm leading-relaxed text-[#f4efd8]/85">
                      {tip}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-12 grid grid-cols-2 gap-4">
                <div className="rounded-[1.8rem] bg-white p-4 text-center ring-1 ring-[#d3e5c5]">
                  <p className="font-display text-2xl text-[#123222]">
                    {servings}
                  </p>
                  <p className="text-xs font-semibold text-[#123222]/70">
                    {servings === 1 ? 'serving' : 'servings'}
                  </p>
                </div>

                <div className="rounded-[1.8rem] bg-white p-4 text-center ring-1 ring-[#d3e5c5]">
                  <p className="font-display text-2xl text-[#123222]">
                    {recipe.ingredients.length}
                  </p>
                  <p className="text-xs font-semibold text-[#123222]/70">
                    ingredients
                  </p>
                </div>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <section className="mt-24 print:hidden">
              <h2 className="font-display text-3xl text-[#123222] sm:text-4xl">
                Cook something next
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r: Recipe) => (
                  <Link
                    key={r.id}
                    href={`/recipe/${recipeSlug(r)}`}
                    className="group overflow-hidden rounded-[2rem] bg-white p-3 ring-1 ring-[#d3e5c5]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />

                    <div className="px-3 pb-3 pt-4">
                      <h3 className="font-display text-xl text-[#123222]">
                        {r.title}
                      </h3>
                      <p className="mt-2 inline-flex items-center gap-2 text-sm text-[#123222]/70">
                        <Clock3 size={14} className="text-[#2f6a45]" />
                        {r.time}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
          {notice && (
            <span className="rounded-full bg-[#123222] px-5 py-2.5 text-sm font-semibold text-[#f6f1c4] shadow-xl">
              {notice}
            </span>
          )}
        </div>

        <SiteFooter />
      </main>
    </SiteLayout>
  )
}