'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { CSSProperties, FormEvent } from 'react'
import { ArrowRight, Clock3, Heart, Mail, Star } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { SiteLayout } from '@/components/SiteLayout'
import { RecipeDialog } from '@/components/RecipeDialog'
import { recipeSlug, recipes } from '@/lib/recipes'
import type { Recipe } from '@/lib/recipes'
import { useRecipeShelf } from '@/lib/useRecipeShelf'

/* Card photo: a tall 3:4 rectangle that fills its frame, sharp corners.
   Every image on the homepage uses this one shape. */
const SQUARE_IMG = 'aspect-[3/4] w-full object-cover'

/* Card used for image lists (thin border, image inset, title underneath). */
const CARD =
  'block border border-[#1f4d3a]/10 bg-white p-3 transition-shadow hover:shadow-[0_16px_36px_-24px_rgba(31,77,58,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e6a4f]'

/* Only these recipes appear on the homepage. Change the slice to pick others. */
const homeRecipes: Recipe[] = recipes.slice(0, 4)
const pick = (i: number): Recipe => homeRecipes[i] ?? homeRecipes[0]

/* The three clickable dishes right before the footer.
   Change these recipe ids to feature other dishes. */
const TRENDING_IDS = [27, 24, 18]
const trending: Recipe[] = (() => {
  const chosen = TRENDING_IDS.map((id) => recipes.find((r: Recipe) => r.id === id)).filter(
    (r): r is Recipe => Boolean(r),
  )
  return chosen.length === 3 ? chosen : recipes.slice(4, 7)
})()

/* "Popular Recipes Of The Week" shows these three, right under the hero. */
const popular: Recipe[] = homeRecipes.slice(0, 3)

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

/* Sample community reviews: replace with real ones when you have them. */
const COMMUNITY = [
  {
    name: 'Anastasia',
    rating: 5,
    text: 'This recipe is so easy to make. I tried it two weeks before Christmas and it was so good that I served it for the whole family.',
  },
  {
    name: 'Hannah Lewis',
    rating: 4,
    text: 'Great and delicious. The steps were clear and it came out just like the photo. It is now our weekday favourite.',
  },
  {
    name: 'Daniel Otieno',
    rating: 5,
    text: 'I am not a confident cook, but this was simple from start to finish. Everyone asked for seconds.',
  },
]

const KITCHEN_TIPS = [
  {
    title: 'Read the recipe first',
    note: 'Check every step and ingredient before you start so nothing surprises you halfway.',
  },
  {
    title: 'Prep before you heat',
    note: 'Chop, measure and set everything out first. Cooking goes faster and calmer.',
  },
  {
    title: 'Taste as you go',
    note: 'Season in small steps and taste often. It is the easiest way to fix a dish.',
  },
]

const FAQS = [
  {
    q: 'Are all the recipes tested?',
    a: 'Yes. Every recipe is cooked in our own kitchen until it is simple, reliable and worth repeating.',
  },
  {
    q: 'How long do the recipes take?',
    a: 'Most take around 30 minutes. The time and ingredient count are shown on every recipe.',
  },
  {
    q: 'Can I save recipes for later?',
    a: 'Yes. Tap Save on any recipe and it stays on your shelf.',
  },
  {
    q: 'How do I find a recipe quickly?',
    a: 'Open the recipe index to search by name, filter by category or find a dish by the ingredients you already have.',
  },
]

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

/* Soft mint paper with gentle green washes (matches the hero green) */
const PAPER: CSSProperties = {
  backgroundColor: '#f3f8f4',
  backgroundImage: [
    'radial-gradient(60rem 40rem at 6% 0%, rgba(46,106,79,0.14), transparent 62%)',
    'radial-gradient(52rem 36rem at 100% 24%, rgba(22,160,93,0.10), transparent 62%)',
    'radial-gradient(48rem 32rem at 0% 100%, rgba(46,106,79,0.08), transparent 62%)',
    GRAIN,
  ].join(','),
}

/* The same paper leaning greener, for the long recipe list */
const PAPER_GREEN: CSSProperties = {
  backgroundColor: '#eaf3ed',
  backgroundImage: [
    'radial-gradient(64rem 38rem at 0% 6%, rgba(46,106,79,0.20), transparent 65%)',
    'radial-gradient(58rem 36rem at 100% 38%, rgba(22,160,93,0.14), transparent 65%)',
    'radial-gradient(50rem 32rem at 0% 72%, rgba(46,106,79,0.12), transparent 65%)',
    'radial-gradient(56rem 34rem at 100% 100%, rgba(46,106,79,0.18), transparent 65%)',
    GRAIN,
  ].join(','),
}

/* Fades in from paper, deepens in the middle, fades back out:
   no hard edge above or below the quote band */
const BLEND_BAND: CSSProperties = {
  backgroundColor: '#dcebe1',
  backgroundImage: [
    'linear-gradient(180deg, #f3f8f4 0%, #dcebe1 26%, #cfe3d6 50%, #dcebe1 74%, #f3f8f4 100%)',
    GRAIN,
  ].join(','),
  backgroundBlendMode: 'normal, multiply',
}

/* ------------------------------------------------------------------ */
/* Little inline illustrations (static)                                */
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

/* ------------------------------------------------------------------ */
/* One dish: square photo beside its text, no card                     */
/* ------------------------------------------------------------------ */

function DishRow({
  recipe,
  flip,
  accent,
  saved,
  onSave,
  onOpen,
}: {
  recipe: Recipe
  flip: boolean
  accent: number
  saved: boolean
  onSave: () => void
  onOpen: () => void
}) {
  return (
    <article>
      <div className="grid items-center gap-8 rounded-[2rem] bg-gradient-to-br from-[#e3f0e8] to-[#d3e6da] px-6 py-10 shadow-[0_-14px_32px_-20px_rgba(31,77,58,0.5)] sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-14 lg:py-14">
        <div className={`relative lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}>
          <Link
            href={`/recipe/${recipeSlug(recipe)}`}
            className={`${CARD} mx-auto w-full max-w-[24rem]`}
          >
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={600}
              height={600}
              className={SQUARE_IMG}
            />
          </Link>

          {/* A small leaf / lemon / tomato tucked into the corner */}
          <div
            className={`pointer-events-none absolute -top-4 z-10 w-12 lg:w-16 ${
              flip ? '-left-3' : '-right-3'
            }`}
          >
            {accent === 0 && <Leaf tone="a" className="h-auto w-full drop-shadow-md" />}
            {accent === 1 && <Lemon className="h-auto w-full drop-shadow-md" />}
            {accent === 2 && <Tomato className="h-auto w-full drop-shadow-md" />}
          </div>
        </div>

        <div className={`lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          <p className="inline-flex items-center gap-2 text-sm text-[#2e6a4f]">
            <Clock3 size={16} />
            {recipe.time}
            <span className="text-[#2e6a4f]/70">
              · {recipe.ingredients.length} ingredients
            </span>
          </p>
          <h5 className="mt-3 font-display text-3xl leading-tight text-[#1f4d3a] sm:text-4xl">
            {recipe.title}
          </h5>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-[#1f4d3a]/75">
            {recipe.description}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#2e6a4f] text-white hover:bg-[#245c43]"
            >
              <Link href={`/recipe/${recipeSlug(recipe)}`}>Full recipe</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#2e6a4f] bg-transparent text-[#1f4d3a] hover:bg-white/60"
              onClick={onOpen}
            >
              Quick view
            </Button>
            <button
              type="button"
              onClick={onSave}
              aria-pressed={saved}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#1f4d3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e6a4f]"
            >
              <Heart
                size={18}
                className={saved ? 'fill-rose text-rose' : 'text-[#2e6a4f]'}
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
/* Footer: page flows down into deep green through a wave              */
/* ------------------------------------------------------------------ */

/* Edit these to change the footer links. */
const FOOTER_EXPLORE = [
  { label: 'Home', href: '/' },
  { label: 'All recipes', href: '/recipes' },
  { label: 'Shopping list', href: '/shopping-list' },
]

const FOOTER_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert']

const CONTACT_EMAIL = 'Eatsbyteks@gmail.com'

/* NEWSLETTER: to collect real subscribers, create a free form endpoint (for
   example Formspree, Buttondown or Mailchimp) and put its URL in
   .env.local as NEXT_PUBLIC_NEWSLETTER_URL=https://...
   Without it, "Join now" opens an email to CONTACT_EMAIL instead. */
const NEWSLETTER_URL = process.env.NEXT_PUBLIC_NEWSLETTER_URL

/* Create these pages (or change the paths) for the legal links. */
const FOOTER_LEGAL = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

/* Replace each '#' with your real profile link. */
const FOOTER_SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/eatsbyteks_/' },
  { label: 'TikTok', href: 'https://tr.ee/dVG7zg4CMu' },
  { label: 'YouTube', href: 'https://tr.ee/6U-ToT3P2Z' },
]
function SiteFooter() {
  const year = 2026
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const subscribe = async (e: FormEvent) => {
    e.preventDefault()
    const address = email.trim()
    if (!address) return

    if (NEWSLETTER_URL) {
      setStatus('sending')
      try {
        const res = await fetch(NEWSLETTER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email: address }),
        })
        if (!res.ok) throw new Error('Request failed')
        setEmail('')
        setStatus('done')
      } catch {
        setStatus('error')
      }
      return
    }

    const subject = encodeURIComponent('Newsletter sign-up')
    const body = encodeURIComponent(`Please add ${address} to the EatsByTeks newsletter.`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setStatus('done')
  }

  return (
    <footer className="relative" style={{ backgroundColor: '#f3f8f4' }} aria-label="Site footer">
      {/* Wave: a lighter layer sits behind the dark one for depth */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative z-10 -mb-px block h-14 w-full sm:h-24"
        aria-hidden="true"
      >
        <path
          d="M0,52 C180,112 360,2 560,48 C760,94 920,12 1100,52 C1260,86 1360,36 1440,56 L1440,120 L0,120 Z"
          fill="#12894f"
          fillOpacity="0.55"
        />
        <path
          d="M0,78 C200,30 420,116 660,70 C900,24 1120,108 1440,62 L1440,120 L0,120 Z"
          fill="#1f4d3a"
        />
      </svg>

      <div className="relative overflow-hidden bg-gradient-to-b from-[#1f4d3a] via-[#245c43] to-[#1a4a35] text-[#eef7f1]">
        {/* grain over the green so it is not one flat tone */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: GRAIN, opacity: 0.55, mixBlendMode: 'soft-light' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 size-[28rem] rounded-full bg-[#12894f]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rounded-full bg-[#f7b32b]/10 blur-3xl"
        />

        {/* botanicals */}
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
              <p className="text-base text-[#eef7f1]/70">Hungry?</p>
              <h2 className="mt-2 font-display text-4xl leading-[1.05] text-[#e8f7ee] sm:text-5xl lg:text-6xl">
                Let's cook something good
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-full bg-[#e8f7ee] px-7 py-3 text-sm font-semibold text-[#1f4d3a] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8f7ee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f4d3a]"
              >
                Browse recipes
                <ArrowRight size={16} />
              </Link>
              <a
                href="#latest-heading"
                className="inline-flex items-center rounded-full border border-white/35 px-7 py-3 text-sm font-semibold text-[#eef7f1] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8f7ee]"
              >
                Latest recipes
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div
            className="my-12 grid gap-8 rounded-2xl bg-white/[0.07] p-6 ring-1 ring-white/15 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12"
            aria-labelledby="newsletter-heading"
          >
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#e8f7ee] text-[#1f4d3a]">
                <Mail size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 id="newsletter-heading" className="font-display text-2xl text-[#e8f7ee] sm:text-3xl">
                  Join the EatsByTeks newsletter
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#eef7f1]/75">
                  One easy recipe, a kitchen tip and the occasional new dish, straight to your inbox. No spam,
                  unsubscribe any time.
                </p>
              </div>
            </div>

            {status === 'done' ? (
              <p role="status" className="font-display text-lg text-[#e8f7ee]">
                {NEWSLETTER_URL
                  ? "You're in! Look out for the next recipe in your inbox."
                  : 'Almost there! Send the email that just opened to finish joining.'}
              </p>
            ) : (
              <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row" noValidate={false}>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder="Your email address"
                  className="w-full flex-1 rounded-full bg-white px-5 py-3 text-sm text-[#1f4d3a] placeholder:text-[#1f4d3a]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8f7ee]"
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full bg-[#16a05d] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12894f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8f7ee] disabled:opacity-60"
                >
                  {status === 'sending' ? 'Joining…' : 'Join now'}
                </button>
                {status === 'error' && (
                  <p role="alert" className="text-sm text-[#ffd9d2] sm:basis-full">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Columns */}
          <div className="grid gap-12 pb-14 pt-2 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-display text-3xl text-[#e8f7ee]">EatsByTeks</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#eef7f1]/75">
                Everyday dinners and something sweet to finish, cooked in a real
                kitchen and written down so you can cook them too.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {FOOTER_SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-white/25 px-4 py-1.5 text-sm text-[#eef7f1] transition-colors hover:border-[#e8f7ee] hover:text-[#e8f7ee]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-6 inline-flex items-center gap-2 text-sm text-[#e8f7ee] underline-offset-4 hover:text-white hover:underline"
              >
                <Mail size={18} aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>

            <nav aria-label="Explore" className="lg:col-span-2">
              <h3 className="font-display text-lg text-[#e8f7ee]">Explore</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {FOOTER_EXPLORE.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[#eef7f1]/80 underline-offset-4 transition-colors hover:text-[#e8f7ee] hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Categories" className="lg:col-span-2">
              <h3 className="font-display text-lg text-[#e8f7ee]">Categories</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {FOOTER_CATEGORIES.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/recipes?category=${encodeURIComponent(c)}`}
                      className="text-[#eef7f1]/80 underline-offset-4 transition-colors hover:text-[#e8f7ee] hover:underline"
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="lg:col-span-3">
              <h3 className="font-display text-lg text-[#e8f7ee]">How we cook</h3>
              <ul className="mt-4 space-y-3 text-sm text-[#eef7f1]/80">
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
          <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-sm text-[#eef7f1]/60 sm:flex-row">
            <p>© {year} EatsByTeks. All recipes tested in our own kitchen.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {FOOTER_LEGAL.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="underline-offset-4 transition-colors hover:text-[#e8f7ee] hover:underline"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="#hero-heading"
                className="underline-offset-4 transition-colors hover:text-[#e8f7ee] hover:underline"
              >
                Back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* Cookie consent: asked on every visit / page load                    */
/* ------------------------------------------------------------------ */

function CookieBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl bg-white p-5 shadow-[0_20px_50px_-15px_rgba(31,77,58,0.55)] ring-1 ring-[#2e6a4f]/15 sm:inset-x-6 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-[#1f4d3a]">
            Do you want to accept cookies?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#1f4d3a]/70">
            We use cookies to keep the site working, remember your saved
            recipes and understand how people use EatsByTeks. You can accept or
            decline non-essential cookies.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-md border-[#2e6a4f] bg-transparent text-[#1f4d3a] hover:bg-[#e3f0e8]"
            onClick={() => setVisible(false)}
          >
            Decline
          </Button>
          <Button
            type="button"
            className="rounded-md bg-[#16a05d] px-6 text-white hover:bg-[#12894f]"
            onClick={() => setVisible(false)}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function HomePage() {
  const { saved, selected, setSelected, toggleSaved } = useRecipeShelf()
  const [filter, setFilter] = useState<string>('All')

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

  let rowIndex = 0

  return (
    <SiteLayout>
      <main>
        {/* HERO: text only, one centred block on the original green */}
        <section
          className="relative isolate overflow-hidden bg-[#2e6a4f]"
          aria-labelledby="hero-heading"
        >
          {/* soft translucent panels, exactly as before */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 right-[8%] top-0 h-full w-[34%] bg-white/[0.045]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 bottom-0 left-[40%] h-[42%] w-[22%] bg-black/[0.06]"
          />

          <div className="relative mx-auto flex min-h-[88vh] max-w-4xl flex-col items-center justify-center px-5 pb-24 pt-28 text-center lg:pt-32">
            {/* small ornament */}
            <div aria-hidden="true" className="flex items-center gap-4">
              <span className="h-px w-14 bg-white/35" />
              <Leaf tone="a" className="h-9 w-auto" />
              <span className="h-px w-14 bg-white/35" />
            </div>

            <h1
              id="hero-heading"
              className="mt-8 font-display text-4xl leading-[1.15] text-white sm:text-6xl xl:text-7xl"
            >
              A little inspiration for your{' '}
              <span className="text-[#bfe9d0]">everyday table.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              From comforting family dinners to bold, flavour packed dishes and something sweet. Discover recipes
              that make cooking at home feel exciting, simple and full of flavour, one recipe at a time.
            </p>

            <div className="mt-10 flex justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-md bg-[#16a05d] px-8 text-white hover:bg-[#12894f]"
              >
                <Link href="/recipes">Explore Recipes</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* POPULAR RECIPES OF THE WEEK */}
        <section className="px-5 lg:px-8" style={PAPER} aria-labelledby="popular-heading">
          <div className="mx-auto max-w-7xl pb-16 pt-16 sm:pt-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2
                  id="popular-heading"
                  className="font-display text-3xl text-[#1f4d3a] sm:text-4xl"
                >
                  Popular Recipes Of The Week
                </h2>
                <p className="mt-2 text-sm text-[#1f4d3a]/65">
                  Our most popular recipes of this week
                </p>
              </div>
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-full bg-[#2e6a4f] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#245c43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e6a4f] focus-visible:ring-offset-2"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <ul className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {popular.map((recipe: Recipe) => (
                <li key={recipe.id}>
                  <Link href={`/recipe/${recipeSlug(recipe)}`} className={`group ${CARD}`}>
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={600}
                      height={600}
                      className={SQUARE_IMG}
                    />
                    <h3 className="px-2 pb-6 pt-5 text-center font-display text-lg text-[#1f4d3a] group-hover:underline group-focus-visible:underline">
                      {recipe.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* THREE PRINCIPLES */}
        <section className="bg-[#e3f0e8] px-5 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-display text-3xl text-[#1f4d3a] sm:text-4xl">
              Three things we never compromise on
            </h2>
            <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
              {PILLARS.map((p) => (
                <li key={p.label} className="text-center">
                  <h3 className="font-display text-xl text-[#1f4d3a]">
                    {p.label}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#1f4d3a]/70">
                    {p.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* QUOTE BAND */}
        <section className="px-5 py-16 text-center sm:py-20" style={BLEND_BAND}>
          <p className="mx-auto max-w-3xl font-display text-2xl leading-snug text-[#1f4d3a] sm:text-3xl">
            "Good food doesn't need to be complicated. It needs good
            ingredients, a little patience and someone to share it with."
          </p>
          <p className="mt-5 text-sm text-[#2e6a4f]">Chef Teks</p>
        </section>

        {/* FEATURED: one large rounded panel with a square photo */}
        <section
          className="relative overflow-x-clip"
          style={PAPER}
          aria-labelledby="featured-heading"
        >
          <div className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32 lg:px-8">
            <div className="pointer-events-none absolute -left-6 top-10 w-20 lg:left-2 lg:w-32">
              <Leaf tone="b" className="h-auto w-full opacity-80" />
            </div>
            <div className="pointer-events-none absolute -right-4 bottom-8 w-20 lg:right-2 lg:w-36">
              <Leaf tone="a" className="h-auto w-full opacity-80" />
            </div>

            <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-[#e3f0e8] to-[#cfe3d6] px-6 py-12 sm:px-12 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-20">
              <div className="lg:col-span-6">
                <p className="text-base text-[#2e6a4f]">
                  Featured · {featured.category}
                </p>
                <h2
                  id="featured-heading"
                  className="mt-3 font-display text-4xl leading-[1.02] text-[#1f4d3a] sm:text-5xl lg:text-6xl"
                >
                  {featured.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-[#1f4d3a]/75">
                  {featured.description}
                </p>
                <p className="mt-6 inline-flex items-center gap-2 text-sm text-[#2e6a4f]">
                  <Clock3 size={16} />
                  {featured.time}
                  <span className="text-[#2e6a4f]/70">
                    · {featured.ingredients.length} ingredients
                  </span>
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-[#2e6a4f] text-white hover:bg-[#245c43]"
                  >
                    <Link href={`/recipe/${recipeSlug(featured)}`}>
                      Full recipe
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-[#2e6a4f] bg-transparent text-[#1f4d3a] hover:bg-white/60"
                    onClick={() => setSelected(featured)}
                  >
                    Quick view
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6">
                <Link
                  href={`/recipe/${recipeSlug(featured)}`}
                  className={`${CARD} mx-auto w-full max-w-md lg:ml-auto lg:mr-0`}
                >
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    width={800}
                    height={800}
                    className={SQUARE_IMG}
                  />
                </Link>
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
                className="font-display text-4xl text-[#1f4d3a] sm:text-5xl lg:text-6xl"
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
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e6a4f] focus-visible:ring-offset-2 ${
                        active
                          ? 'border-[#2e6a4f] bg-[#2e6a4f] text-white'
                          : 'border-[#2e6a4f]/40 text-[#1f4d3a] hover:border-[#2e6a4f]'
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
                  {/* Category heading with a giant ghost word behind it */}
                  <div className="relative mb-16 py-12 text-center sm:py-16">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 flex select-none items-center justify-center whitespace-nowrap font-display text-[5.5rem] leading-none text-[#d3e6da] sm:text-[9rem] lg:text-[13rem]"
                    >
                      {group.category}
                    </div>
                    <div className="pointer-events-none absolute left-[4%] top-2 w-10 sm:w-14">
                      <Leaf tone="a" className="h-auto w-full" />
                    </div>
                    <div className="pointer-events-none absolute bottom-2 right-[4%] w-10 sm:w-14">
                      <Lemon className="h-auto w-full" />
                    </div>

                    <div className="relative">
                      <h3 className="font-display text-3xl text-[#1f4d3a] sm:text-4xl">
                        {group.category}
                      </h3>
                      <p className="mt-2 text-sm text-[#2e6a4f]">
                        {group.total} {group.total === 1 ? 'recipe' : 'recipes'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-24">
                    {group.subcategories.map((sub) => (
                      <div key={sub.name}>
                        <h4 className="mb-8 text-center font-display text-xl italic text-[#2e6a4f]">
                          {sub.name}
                        </h4>

                        <div className="space-y-12 pb-4">
                          {sub.items.map((recipe: Recipe) => {
                            const n = rowIndex++
                            return (
                              <DishRow
                                key={recipe.id}
                                recipe={recipe}
                                flip={n % 2 === 1}
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

        {/* CLOSING: panel with a square photo and leaves */}
        <section
          className="relative overflow-x-clip"
          style={PAPER}
          aria-labelledby="closing-heading"
        >
          <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-8 sm:pb-20 lg:px-8">
            <div className="pointer-events-none absolute -left-4 bottom-12 w-20 lg:left-0 lg:w-36">
              <Leaf tone="a" className="h-auto w-full opacity-80" />
            </div>
            <div className="pointer-events-none absolute -right-4 top-4 w-20 lg:right-0 lg:w-32">
              <Leaf tone="b" className="h-auto w-full opacity-80" />
            </div>

            <div className="grid items-center gap-10 rounded-[2rem] bg-gradient-to-br from-[#e3f0e8] to-[#cfe3d6] px-6 py-12 sm:px-12 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-16">
              <div className="lg:col-span-6">
                <h2
                  id="closing-heading"
                  className="font-display text-4xl leading-tight text-[#1f4d3a] sm:text-5xl"
                >
                  Every dish we've shared, in one place
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#1f4d3a]/75">
                  Search by name, filter by category or find a recipe by the
                  ingredients you already have.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 rounded-full bg-[#2e6a4f] text-white hover:bg-[#245c43]"
                >
                  <Link href="/recipes">
                    Browse the recipe index
                    <ArrowRight size={17} className="ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="lg:col-span-6">
                <div className="mx-auto w-full max-w-sm border border-[#1f4d3a]/10 bg-white p-3 lg:ml-auto lg:mr-0">
                  <Image
                    src={closing.image}
                    alt={closing.title}
                    width={700}
                    height={700}
                    loading="lazy"
                    className={SQUARE_IMG}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR COMMUNITY */}
        <section
          className="px-5 py-20 sm:py-24 lg:px-8"
          style={PAPER_GREEN}
          aria-labelledby="community-heading"
        >
          <div className="mx-auto max-w-7xl">
            <h2
              id="community-heading"
              className="font-display text-3xl text-[#1f4d3a] sm:text-4xl"
            >
              Our Community
            </h2>
            <p className="mt-2 text-sm text-[#1f4d3a]/65">
              What home cooks say about our recipes
            </p>

            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {COMMUNITY.map((c, i) => {
                const dish = pick(i + 1)
                return (
                  <li
                    key={c.name}
                    className="border border-[#1f4d3a]/10 bg-white p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-9 place-items-center rounded-full bg-[#16a05d] text-sm font-semibold text-white">
                        {c.name.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#1f4d3a]">
                          {c.name}
                        </p>
                        <p className="text-xs text-[#2e6a4f]">{dish.title}</p>
                      </div>
                    </div>
                    <div
                      className="mt-3 flex gap-0.5 text-[#f7b32b]"
                      aria-label={`${c.rating} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, n) => (
                        <Star
                          key={n}
                          size={14}
                          className={n < c.rating ? 'fill-current' : ''}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[#1f4d3a]/75">
                      {c.text}
                    </p>
                    <Image
                      src={dish.image}
                      alt={dish.title}
                      width={500}
                      height={300}
                      loading="lazy"
                      className="mt-4 aspect-[3/4] w-full object-cover"
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        {/* QUICK KITCHEN TIPS */}
        <section className="px-5 py-20 lg:px-8" style={PAPER} aria-labelledby="tips-heading">
          <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#2e6a4f] px-6 py-14 sm:px-12 lg:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -z-10 right-[8%] top-0 h-full w-[30%] bg-white/[0.045]"
            />
            <h2
              id="tips-heading"
              className="text-center font-display text-3xl text-white sm:text-4xl"
            >
              Quick kitchen tips
            </h2>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {KITCHEN_TIPS.map((t) => (
                <li key={t.title} className="text-center">
                  <Leaf tone="a" className="mx-auto h-8 w-auto" />
                  <h3 className="mt-4 font-display text-xl text-[#e8f7ee]">
                    {t.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/75">
                    {t.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 pb-20 lg:px-8" style={PAPER} aria-labelledby="faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="text-center font-display text-3xl text-[#1f4d3a] sm:text-4xl"
            >
              Questions, answered
            </h2>
            <div className="mt-10 divide-y divide-[#2e6a4f]/20 border-y border-[#2e6a4f]/20">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-[#1f4d3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e6a4f]">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="text-2xl leading-none text-[#2e6a4f] transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#1f4d3a]/75">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* THREE CLICKABLE IMAGES, then the footer */}
        <section style={PAPER} aria-labelledby="making-heading">
          <div className="mx-auto max-w-7xl px-5 pb-20 pt-4 sm:pb-28 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="making-heading"
                className="font-display text-3xl text-[#1f4d3a] sm:text-4xl"
              >
                What everyone's making
              </h2>
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-full bg-[#2e6a4f] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#245c43] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e6a4f] focus-visible:ring-offset-2"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <ul className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {trending.map((recipe: Recipe) => (
                <li key={recipe.id}>
                  <Link href={`/recipe/${recipeSlug(recipe)}`} className={`group ${CARD}`}>
                    <div className="relative">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={600}
                        height={600}
                        loading="lazy"
                        className={SQUARE_IMG}
                      />
                      <span className="absolute left-3 top-3 bg-white/90 px-3 py-1 text-xs font-semibold text-[#1f4d3a]">
                        {recipe.category}
                      </span>
                    </div>
                    <h3 className="px-2 pt-5 text-center font-display text-lg leading-tight text-[#1f4d3a] group-hover:underline group-focus-visible:underline">
                      {recipe.title}
                    </h3>
                    <p className="inline-flex w-full items-center justify-center gap-2 px-2 pb-6 pt-2 text-sm text-[#2e6a4f]">
                      <Clock3 size={14} />
                      {recipe.time}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <SiteFooter />
        </section>
      </main>

      <CookieBanner />

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