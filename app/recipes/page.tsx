'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import type { CSSProperties, FormEvent, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock3,
  Heart,
  Search,
  ShoppingBasket,
  Users,
} from 'lucide-react'
import { SiteLayout } from '@/components/SiteLayout'
import { RecipeDialog } from '@/components/RecipeDialog'
import {
  categories,
  categoryTiles,
  popularIngredients,
  recipeSlug,
} from '@/lib/recipes'

import type { Recipe } from '@/lib/recipes'
import { supabase } from '@/lib/supabase'
import { useRecipeShelf } from '@/lib/useRecipeShelf'



type DbRecipe = {
  id: number
  slug: string
  title: string
  category: Recipe['category']
  time_label: string
  description: string
  image_url: string
  ingredients: { name: string; amount?: number | string; unit?: string }[]
  steps: string[]
  is_kenyan: boolean
  published: boolean
}

const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#2f6a45] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#123222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123222] focus-visible:ring-offset-2'

const lightBtn =
  'inline-flex items-center justify-center gap-2 rounded-full bg-[#f6f1c4] px-6 py-3 text-sm font-semibold text-[#123222] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white'

const card =
  'border border-[#123222]/10 bg-white p-3 pb-5 shadow-[0_20px_40px_-30px_rgba(18,50,34,0.4)]'

const meta =
  'mt-2 flex items-center justify-center gap-3 text-xs text-[#123222]/60'

const tag =
  'rounded-full bg-[#eaf3df] px-2.5 py-0.5 font-semibold text-[#2f6a45]'

const TILE_SPANS = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-3',
  'md:col-span-3',
]

const minutes = (time: string) =>
  /hr/.test(time) ? 999 : parseInt(time, 10) || 999

function mapSupabaseRecipe(row: DbRecipe): Recipe {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    time: row.time_label,
    description: row.description,
    image: row.image_url,
    ingredients: (row.ingredients ?? []).map((ingredient) => {
      const amount = ingredient.amount ? ` — ${ingredient.amount}` : ''
      const unit = ingredient.unit ? ` ${ingredient.unit}` : ''
      return `${ingredient.name}${amount}${unit}`
    }),
    method: (row.steps ?? []).join('\n'),
  }
}
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true)
          io.disconnect()
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    io.observe(el)

    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`eat-reveal ${on ? 'is-in' : ''} ${className}`}
    >
      {children}
    </div>
  )
}

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/></svg>\")"

const FOOTER_SOCIALS = [
  { label: 'Instagram', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'Pinterest', href: '#' },
]

const FOOTER_EXPLORE = [
  { label: 'Home', href: '/' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Collections', href: '/collections' },
  { label: 'Our story', href: '/our-story' },
  { label: 'Shopping list', href: '/shopping-list' },
]

const FOOTER_CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Baked Goods',
]

const PILLARS = [
  { label: 'Tested in a real kitchen' },
  { label: 'Everyday ingredients' },
  { label: 'Clear, step-by-step method' },
  { label: 'Made to share' },
]

function Leaf({
  tone = 'a',
  className = '',
}: {
  tone?: 'a' | 'b'
  className?: string
}) {
  const fill = tone === 'a' ? '#8fb88a' : '#6f8d54'

  return (
    <svg viewBox="0 0 100 140" className={className} aria-hidden="true">
      <path
        d="M50 4 C92 40 96 100 50 136 C4 100 8 40 50 4 Z"
        fill={fill}
      />
      <path
        d="M50 14 L50 130"
        stroke="#1b2e13"
        strokeOpacity=".35"
        strokeWidth="3"
        fill="none"
      />
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
      <path
        d="M30 30 C48 14 80 16 94 34"
        stroke="#fff"
        strokeOpacity=".45"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

const drift = (
  speed: number,
  rotate: number,
  spin: number,
): CSSProperties => ({
  transform: `translate3d(0, calc((var(--p) - 1) * ${speed}px), 0) rotate(calc(${rotate}deg + var(--p) * ${spin}deg))`,
})

function RecipesFooter() {
  const year = 2026

  return (
    <footer
      className="relative"
      style={{ backgroundColor: '#eaf3df' }}
      aria-label="Site footer"
    >
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
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: GRAIN,
            opacity: 0.55,
            mixBlendMode: 'soft-light',
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 size-[28rem] rounded-full bg-[#6f8d54]/25 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-[#f7b32b]/10 blur-3xl"
        />

        <div
          className="eat-parallax pointer-events-none absolute -right-6 top-6 w-24 opacity-90 will-change-transform lg:right-10 lg:w-40"
          style={drift(220, -30, 40)}
        >
          <Leaf tone="a" className="h-auto w-full drop-shadow-lg" />
        </div>

        <div
          className="eat-parallax pointer-events-none absolute left-[6%] top-[38%] hidden w-14 will-change-transform lg:block"
          style={drift(-160, 14, -60)}
        >
          <Lemon className="h-auto w-full drop-shadow-lg" />
        </div>

        <div
          className="eat-parallax pointer-events-none absolute bottom-24 right-[30%] hidden w-16 opacity-70 will-change-transform lg:block"
          style={drift(140, 52, 30)}
        >
          <Leaf tone="b" className="h-auto w-full" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-6 sm:pt-10 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-12 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="text-base text-[#f4efd8]/70">Hungry?</p>

              <h2 className="mt-2 font-display text-4xl leading-[1.05] text-[#fbf6c8] sm:text-5xl lg:text-6xl">
                Let&apos;s cook something good
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
                href="#browse"
                className="inline-flex items-center rounded-full border border-white/35 px-7 py-3 text-sm font-semibold text-[#f4efd8] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fbf6c8]"
              >
                Latest recipes
              </a>
            </div>
          </div>

          <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-display text-3xl text-[#fbf6c8]">
                EatsByTeks
              </p>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#f4efd8]/75">
                Everyday dinners and something sweet to finish, cooked in a real
                kitchen and written down so you can cook them too.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {FOOTER_SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      className="inline-flex rounded-full border border-white/25 px-4 py-1.5 text-sm text-[#f4efd8] transition-colors hover:border-[#fbf6c8] hover:text-[#fbf6c8]"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <nav aria-label="Explore" className="lg:col-span-2">
              <h3 className="font-display text-lg text-[#fbf6c8]">Explore</h3>

              <ul className="mt-4 space-y-3 text-sm">
                {FOOTER_EXPLORE.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[#f4efd8]/80 underline-offset-4 transition-colors hover:text-[#fbf6c8] hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Categories" className="lg:col-span-2">
              <h3 className="font-display text-lg text-[#fbf6c8]">
                Categories
              </h3>

              <ul className="mt-4 space-y-3 text-sm">
                {FOOTER_CATEGORIES.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/recipes?category=${encodeURIComponent(category)}`}
                      className="text-[#f4efd8]/80 underline-offset-4 transition-colors hover:text-[#fbf6c8] hover:underline"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h3 className="font-display text-lg text-[#fbf6c8]">
                How we cook
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-[#f4efd8]/80">
                {PILLARS.map((pillar) => (
                  <li
                    key={pillar.label}
                    className="flex items-center gap-3"
                  >
                    <Leaf tone="a" className="h-5 w-auto shrink-0" />
                    {pillar.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-[#f4efd8]/60 sm:flex-row">
            <p>
              © {year} EatsByTeks. All recipes tested in our own kitchen.
            </p>

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

function RecipesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mainRef = useRef<HTMLElement>(null)

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [query, setQuery] = useState('')
  const [onlySaved, setOnlySaved] = useState(false)
  const { saved, selected, setSelected, toggleSaved } = useRecipeShelf()

  useEffect(() => {
    let active = true

    async function loadRecipes() {
      try {
        const { data, error: supabaseError } = await supabase
          .from('recipes')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (!active) return

        if (supabaseError) {
          setError(supabaseError.message)
          setLoading(false)
          return
        }

        setRecipes((data as DbRecipe[]).map(mapSupabaseRecipe))
        setLoading(false)
      } catch (loadError) {
        if (!active) return

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unexpected error loading recipes.',
        )
        setLoading(false)
      }
    }

    loadRecipes()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const el = mainRef.current
    if (!el) return

    let frame = 0

    const update = () => {
      frame = 0

      const y = window.scrollY
      const max =
        document.documentElement.scrollHeight - window.innerHeight

      el.style.setProperty('--sy', String(Math.round(y)))
      el.style.setProperty(
        '--p',
        String(max > 0 ? Math.min(1, y / max) : 0),
      )
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)

      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const rawCategory = searchParams.get('category')
  const category =
    rawCategory && categories.includes(rawCategory)
      ? rawCategory
      : 'All recipes'

  const inCategory = category !== 'All recipes'

  const goToCategory = (value: string) => {
    router.push(
      value === 'All recipes'
        ? '/recipes'
        : `/recipes?category=${encodeURIComponent(value)}`,
    )
  }

  const terms = query
    .toLowerCase()
    .split(',')
    .map((term) => term.trim())
    .filter(Boolean)

  const toggleTerm = (ingredient: string) => {
    const key = ingredient.toLowerCase()

    setQuery(
      (
        terms.includes(key)
          ? terms.filter((term) => term !== key)
          : [...terms, key]
      ).join(', '),
    )
  }

  const showCategories =
    !inCategory && !onlySaved && terms.length === 0

  const results = recipes.filter(
    (recipe: Recipe) =>
      (!inCategory || recipe.category === category) &&
      (!onlySaved || saved.includes(recipe.id)) &&
      terms.every((term) =>
        `${recipe.title} ${recipe.description} ${recipe.ingredients.join(' ')}`
          .toLowerCase()
          .includes(term),
      ),
  )

  const countFor = (value: string) =>
    recipes.filter((recipe: Recipe) => recipe.category === value).length

  const activeTile = categoryTiles.find(
    (tile) => tile.category === category,
  )

  const featured: Recipe | undefined =
    recipes.find((recipe: Recipe) => recipe.id === 18) ?? recipes[0]

  const heroPool: Recipe[] = inCategory
    ? recipes.filter((recipe: Recipe) => recipe.category === category)
    : []

  const heroA: Recipe | undefined = heroPool[0] ?? featured
  const heroB: Recipe | undefined =
    heroPool[1] ??
    recipes.find((recipe: Recipe) => recipe.id === 27) ??
    recipes[1] ??
    recipes[0]

  const quick = recipes
    .filter((recipe: Recipe) => minutes(recipe.time) <= 30)
    .slice(0, 10)

  const jumpToBrowse = (event: FormEvent) => {
    event.preventDefault()
    document
      .getElementById('browse')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const rootVars = {
    '--sy': 0,
    '--p': 0,
  } as CSSProperties

  return (
    <SiteLayout>
      <style>{`
        @keyframes eat-rise {
          from {
            opacity: 0;
            transform: translateY(28px) scale(.97);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }

        .eat-rise {
          animation: eat-rise .9s cubic-bezier(.2,.7,.2,1) both;
        }

        .eat-rise-2 {
          animation-delay: .12s;
        }

        .eat-rise-3 {
          animation-delay: .24s;
        }

        .eat-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1);
        }

        .eat-reveal.is-in {
          opacity: 1;
          transform: none;
        }

        .eat-hide-scroll {
          scrollbar-width: none;
        }

        .eat-hide-scroll::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .eat-rise {
            animation: none;
          }

          .eat-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .eat-parallax {
            transform: none !important;
          }
        }
      `}</style>

      <main ref={mainRef} style={rootVars} className="bg-[#eaf3df]">
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#8fb88a]"
          style={{ transform: 'scaleX(var(--p))' }}
        />

        {error && (
          <section className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
              <p className="font-semibold">Could not load recipes</p>
              <p className="mt-1 text-sm">{error}</p>
            </div>
          </section>
        )}

        {loading && (
          <section className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
            <div className="rounded-2xl bg-white p-5 text-[#123222]">
              Loading recipes…
            </div>
          </section>
        )}

        <section
          className="relative overflow-hidden bg-[#123222] text-[#f6f1c4]"
          aria-labelledby="hero-heading"
        >
          <div
            aria-hidden="true"
            className="eat-parallax pointer-events-none absolute -inset-x-10 -top-10 bottom-0 bg-[radial-gradient(circle_at_85%_15%,#2f6a45_0%,transparent_50%),radial-gradient(circle_at_5%_90%,#1d4a31_0%,transparent_45%)]"
            style={{
              transform:
                'translate3d(0, calc(var(--sy) * 0.15px), 0)',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(rgba(246,241,196,0.14) 1.2px, transparent 1.6px)',
              backgroundSize: '22px 22px',
              WebkitMaskImage:
                'radial-gradient(ellipse at 72% 40%, #000 0%, transparent 62%)',
              maskImage:
                'radial-gradient(ellipse at 72% 40%, #000 0%, transparent 62%)',
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[4%] top-[42%] hidden size-[30rem] -translate-y-1/2 rounded-full bg-[#2f6a45]/40 blur-3xl lg:block"
          />

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-24">
            <div
              className="eat-parallax"
              style={{
                transform:
                  'translate3d(0, calc(var(--sy) * 0.12px), 0)',
                opacity: 'max(0.2, calc(1 - var(--sy) / 650))',
              }}
            >
              {inCategory && (
                <Link
                  href="/recipes"
                  className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#bfe0b4] hover:underline"
                >
                  <ArrowLeft size={16} /> All categories
                </Link>
              )}

              <p className="eat-rise inline-flex items-center gap-3 text-sm font-semibold text-[#bfe0b4]">
                <Leaf tone="a" className="h-6 w-auto" />
                {inCategory
                  ? activeTile?.sub ?? 'EatsByTeks recipes'
                  : 'EatsByTeks recipe index'}
              </p>

              <h1
                id="hero-heading"
                className="eat-rise eat-rise-2 mt-5 font-display text-5xl leading-[1.04] text-[#fbf8dc] sm:text-6xl xl:text-7xl"
              >
                {inCategory ? (
                  category
                ) : (
                  <>
                    Cook something
                    <span className="block italic text-[#bfe0b4]">
                      worth sharing
                    </span>
                  </>
                )}
              </h1>

              <p className="eat-rise eat-rise-3 mt-6 max-w-md text-base leading-relaxed text-[#d4e8cc] sm:text-lg">
                {inCategory
                  ? 'Pick a meal to see its full recipe, ingredients and method.'
                  : 'Search by dish or by what is in your kitchen, then cook it step by step.'}
              </p>

              <form
                onSubmit={jumpToBrowse}
                className="eat-rise eat-rise-3 mt-9 flex max-w-xl items-center rounded-full bg-white p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)] ring-4 ring-white/10 transition-shadow focus-within:ring-[#8fb88a]/50"
              >
                <label className="relative flex flex-1 items-center">
                  <Search className="pointer-events-none absolute left-4 size-4 text-[#2f6a45]" />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    type="search"
                    placeholder="Try garlic, basil or chicken"
                    aria-label="Search recipes or ingredients"
                    className="h-12 w-full rounded-full bg-transparent pr-3 text-sm text-[#123222] outline-none placeholder:text-[#123222]/45"
                    style={{ paddingLeft: '2.75rem' }}
                  />
                </label>

                <button type="submit" className={`${primaryBtn} h-12 px-6`}>
                  Find recipes
                </button>
              </form>

              <div className="eat-rise eat-rise-3 mt-5 flex max-w-xl flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-[#bfe0b4]">
                  Popular:
                </span>

                {popularIngredients
                  .slice(0, 6)
                  .map((ingredient: string) => {
                    const on = terms.includes(ingredient.toLowerCase())

                    return (
                      <button
                        key={ingredient}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleTerm(ingredient)}
                        className={`rounded-full border px-3.5 py-1 text-xs font-semibold transition-colors ${
                          on
                            ? 'border-[#f6f1c4] bg-[#f6f1c4] text-[#123222]'
                            : 'border-white/25 text-[#d4e8cc] hover:border-[#f6f1c4] hover:text-[#f6f1c4]'
                        }`}
                      >
                        {ingredient}
                      </button>
                    )
                  })}
              </div>

              <p className="mt-3 text-xs text-[#bfe0b4]/80">
                Separate ingredients with commas to narrow the list.
              </p>

              <div className="eat-rise eat-rise-3 mt-8 flex max-w-xl flex-wrap items-center gap-2 border-t border-white/15 pt-6">
                <span className="mr-1 text-xs font-medium text-[#bfe0b4]">
                  Jump to:
                </span>

                {categories.slice(1).map((value: string) => {
                  const on = value === category

                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={on}
                      onClick={() => {
                        setOnlySaved(false)
                        goToCategory(value)
                      }}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                        on
                          ? 'bg-[#f6f1c4] text-[#123222]'
                          : 'bg-white/10 text-[#f6f1c4] hover:bg-white/20'
                      }`}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="relative mx-auto aspect-[1/1.1] w-full max-w-md lg:ml-auto lg:mr-0">
              {heroA && (
                <Link
                  href={`/recipe/${recipeSlug(heroA)}`}
                  className="eat-rise absolute right-0 top-0 block w-[62%] border border-[#123222]/10 bg-white p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroA.image}
                    alt={heroA.title}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </Link>
              )}

              {heroB && (
                <Link
                  href={`/recipe/${recipeSlug(heroB)}`}
                  className="eat-rise eat-rise-2 absolute bottom-0 left-0 z-10 block w-[50%] border border-[#123222]/10 bg-white p-2 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.7)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroB.image}
                    alt={heroB.title}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </Link>
              )}

              {heroA && (
                <div className="eat-rise eat-rise-3 absolute right-[2%] top-[62%] z-20 max-w-[12.5rem] rounded-xl bg-white px-4 py-3 text-[#123222] shadow-xl">
                  <p className="text-xs font-semibold leading-snug">
                    {heroA.title}
                  </p>

                  <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-[#123222]/60">
                    <Clock3 size={13} className="text-[#2f6a45]" />
                    {heroA.time}
                  </p>
                </div>
              )}

              <Leaf
                tone="a"
                className="pointer-events-none absolute -left-6 top-2 hidden w-16 rotate-[24deg] opacity-40 sm:block"
              />

              <Leaf
                tone="b"
                className="pointer-events-none absolute -right-4 bottom-4 hidden w-14 -rotate-[28deg] opacity-40 sm:block"
              />
            </div>
          </div>
        </section>

        <section
          id="browse"
          className="relative mx-auto -mt-2 max-w-7xl scroll-mt-24 px-5 lg:px-8"
        >
          <div className="rounded-[2rem] bg-white p-5 shadow-[0_30px_60px_-35px_rgba(18,50,34,0.45)] ring-1 ring-[#cfe3c0] sm:p-6">
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Categories"
            >
              {categories.map((value: string) => {
                const on = value === category && !onlySaved

                return (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setOnlySaved(false)
                      goToCategory(value)
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      on
                        ? 'bg-[#2f6a45] text-white'
                        : 'bg-[#eaf3df] text-[#123222] hover:bg-[#d7e9c8]'
                    }`}
                  >
                    {value}
                  </button>
                )
              })}

              <button
                type="button"
                onClick={() => setOnlySaved(!onlySaved)}
                aria-pressed={onlySaved}
                className={`ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  onlySaved
                    ? 'border-[#123222] bg-[#123222] text-[#f6f1c4]'
                    : 'border-[#2f6a45] text-[#123222] hover:bg-[#eaf3df]'
                }`}
              >
                <Bookmark size={15} /> Saved ({saved.length})
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#e1eed5] pt-4">
              <span className="mr-1 text-sm font-medium text-[#123222]/60">
                In your kitchen:
              </span>

              {popularIngredients.map((ingredient: string) => {
                const on = terms.includes(ingredient.toLowerCase())

                return (
                  <button
                    key={ingredient}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleTerm(ingredient)}
                    className={`rounded-full border px-3.5 py-1 text-xs font-semibold transition-colors ${
                      on
                        ? 'border-[#2f6a45] bg-[#2f6a45] text-white'
                        : 'border-[#bcd7aa] text-[#123222] hover:border-[#2f6a45]'
                    }`}
                  >
                    {ingredient}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-12 sm:pt-16 lg:px-8">
          {showCategories ? (
            <>
              <Reveal>
                <h2 className="font-display text-3xl text-[#123222] sm:text-4xl">
                  What are you cooking?
                </h2>

                <p className="mt-2 max-w-md text-sm text-[#123222]/70">
                  Choose a category to see its meals.
                </p>
              </Reveal>

              <div className="mt-8 grid auto-rows-[22rem] gap-5 md:grid-cols-6 md:auto-rows-[19rem]">
                {categoryTiles.map((tile, index) => {
                  const count = countFor(tile.category)

                  return (
                    <Reveal
                      key={tile.category}
                      delay={(index % 3) * 90}
                      className={
                        TILE_SPANS[index] ?? 'md:col-span-3'
                      }
                    >
                      <button
                        type="button"
                        onClick={() => goToCategory(tile.category)}
                        className={`group relative flex size-full flex-col text-left transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2f6a45]/50 ${card}`}
                      >
                        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#d7e9c8]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={tile.image}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />

                          <span className="absolute bottom-3 right-3 grid size-10 place-items-center rounded-full bg-[#f6f1c4] text-[#123222] transition-transform group-hover:translate-x-1">
                            <ArrowRight size={18} />
                          </span>
                        </div>

                        <div className="pt-4 text-center">
                          <h3 className="font-display text-xl text-[#123222] sm:text-2xl">
                            {tile.label}
                          </h3>

                          <p className="mt-1 text-xs text-[#123222]/60">
                            {tile.sub} · {count}{' '}
                            {count === 1 ? 'recipe' : 'recipes'}
                          </p>
                        </div>
                      </button>
                    </Reveal>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="font-display text-3xl text-[#123222] sm:text-4xl">
                  {onlySaved
                    ? 'Your saved recipes'
                    : inCategory
                      ? category
                      : 'Search results'}
                </h2>

                <p className="text-sm text-[#123222]/70">
                  {results.length}{' '}
                  {results.length === 1 ? 'recipe' : 'recipes'}
                </p>
              </div>

              {results.length ? (
                <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {results.map((recipe: Recipe, index: number) => {
                    const isSaved = saved.includes(recipe.id)

                    return (
                      <Reveal
                        key={recipe.id}
                        delay={(index % 3) * 90}
                        className="h-full"
                      >
                        <article
                          className={`group flex h-full flex-col transition-shadow hover:shadow-[0_30px_60px_-28px_rgba(18,50,34,0.65)] ${card}`}
                        >
                          <div className="relative aspect-[4/5] overflow-hidden bg-[#d7e9c8]">
                            <Link
                              href={`/recipe/${recipeSlug(recipe)}`}
                              tabIndex={-1}
                              aria-hidden="true"
                              className="block size-full"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                loading="lazy"
                                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            </Link>

                            <span className="absolute bottom-3 left-3 rounded-full bg-[#f6f1c4] px-3 py-1 text-xs font-semibold text-[#123222]">
                              {recipe.category}
                            </span>

                            <button
                              type="button"
                              onClick={() => toggleSaved(recipe.id)}
                              aria-pressed={isSaved}
                              aria-label={
                                isSaved
                                  ? `Remove ${recipe.title} from saved`
                                  : `Save ${recipe.title}`
                              }
                              className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 shadow-md backdrop-blur transition-transform hover:scale-110"
                            >
                              <Heart
                                size={18}
                                className={
                                  isSaved
                                    ? 'fill-[#c0392b] text-[#c0392b]'
                                    : 'text-[#2f6a45]'
                                }
                              />
                            </button>
                          </div>

                          <div className="flex flex-1 flex-col px-2 pt-4">
                            <h3 className="text-center font-display text-2xl leading-tight text-[#123222]">
                              {recipe.title}
                            </h3>

                            <p className="mt-2 line-clamp-2 text-center text-sm leading-relaxed text-[#123222]/70">
                              {recipe.description}
                            </p>

                            <p className={meta}>
                              <span className="inline-flex items-center gap-1.5">
                                <Clock3
                                  size={13}
                                  className="text-[#2f6a45]"
                                />
                                {recipe.time}
                              </span>

                              <span>
                                {recipe.ingredients.length} ingredients
                              </span>
                            </p>

                            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                              <Link
                                href={`/recipe/${recipeSlug(recipe)}`}
                                className={primaryBtn}
                              >
                                View recipe <ArrowRight size={15} />
                              </Link>

                              <button
                                type="button"
                                onClick={() => setSelected(recipe)}
                                className="text-sm font-semibold text-[#2f6a45] underline-offset-4 hover:underline"
                              >
                                Quick view
                              </button>
                            </div>
                          </div>
                        </article>
                      </Reveal>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-10 rounded-[2rem] bg-white px-6 py-16 text-center ring-1 ring-[#d3e5c5]">
                  <h3 className="font-display text-3xl text-[#123222]">
                    No recipes match yet.
                  </h3>

                  <p className="mx-auto mt-3 max-w-sm text-sm text-[#123222]/70">
                    Remove an ingredient, clear the search or switch off the
                    saved filter.
                  </p>

                  <button
                    type="button"
                    className={`${primaryBtn} mt-6`}
                    onClick={() => {
                      setQuery('')
                      setOnlySaved(false)
                      goToCategory('All recipes')
                    }}
                  >
                    Back to categories
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {showCategories && featured && (
          <>
            <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
              <Reveal>
                <div className="grid overflow-hidden rounded-[2.5rem] bg-[#123222] text-[#f6f1c4] lg:grid-cols-2">
                  <div className="relative min-h-[18rem] overflow-hidden lg:min-h-[28rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.image}
                      alt={featured.title}
                      loading="lazy"
                      className="eat-parallax absolute inset-0 size-full scale-125 object-cover"
                      style={{
                        transform:
                          'translate3d(0, calc(var(--sy) * -0.04px + 40px), 0) scale(1.15)',
                      }}
                    />
                  </div>

                  <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
                    <p className="text-sm font-medium text-[#bfe0b4]">
                      Cook this week
                    </p>

                    <h2 className="font-display text-4xl leading-tight text-[#fbf8dc] sm:text-5xl">
                      {featured.title}
                    </h2>

                    <p className="max-w-md text-base leading-relaxed text-[#d4e8cc]">
                      {featured.description}
                    </p>

                    <p className="inline-flex items-center gap-2 text-sm text-[#bfe0b4]">
                      <Clock3 size={16} /> {featured.time} ·{' '}
                      {featured.ingredients.length} ingredients
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/recipe/${recipeSlug(featured)}`}
                        className={lightBtn}
                      >
                        View recipe <ArrowRight size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setSelected(featured)}
                        className="rounded-full px-4 py-3 text-sm font-semibold text-[#f6f1c4] underline-offset-4 hover:underline"
                      >
                        Quick view
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

            {quick.length > 0 && (
              <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
                <Reveal>
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h2 className="font-display text-3xl text-[#123222] sm:text-4xl">
                        Ready in 30 minutes or less
                      </h2>

                      <p className="mt-2 text-sm text-[#123222]/70">
                        Swipe or scroll sideways for quick weeknight meals.
                      </p>
                    </div>
                  </div>
                </Reveal>

                <div className="eat-hide-scroll -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:-mx-8 lg:px-8">
                  {quick.map((recipe: Recipe) => (
                    <Link
                      key={recipe.id}
                      href={`/recipe/${recipeSlug(recipe)}`}
                      className={`group w-64 shrink-0 snap-start sm:w-72 ${card}`}
                    >
                      <div className="aspect-[4/5] overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      <h3 className="mt-4 text-center font-display text-xl leading-snug text-[#123222]">
                        {recipe.title}
                      </h3>

                      <p className={meta}>
                        <span className={tag}>{recipe.category}</span>

                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 size={13} className="text-[#2f6a45]" />
                          {recipe.time}
                        </span>
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <RecipesFooter />
      </main>

      <RecipeDialog
        recipe={selected}
        saved={selected ? saved.includes(selected.id) : false}
        onSave={() => {
          if (selected) toggleSaved(selected.id)
        }}
        onClose={() => setSelected(null)}
      />
    </SiteLayout>
  )
}

export default function RecipesPage() {
  return (
    <Suspense fallback={null}>
      <RecipesContent />
    </Suspense>
  )
}