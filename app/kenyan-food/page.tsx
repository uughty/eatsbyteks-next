import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ChevronRight, Clock3 } from 'lucide-react'
import { SiteLayout } from '@/components/SiteLayout'
import { AboutMotion } from '@/components/AboutMotion'
import { recipeSlug, recipes } from '@/lib/recipes'
import type { Recipe } from '@/lib/recipes'

export const metadata: Metadata = {
  title: 'Kenyan Recipes | EatsByTeks',
  description: 'Home-style Kenyan dishes from the EatsByTeks kitchen, written step by step.',
  openGraph: {
    title: 'Kenyan Recipes | EatsByTeks',
    description: 'Home-style Kenyan dishes from the EatsByTeks kitchen.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

/* The Kenyan dishes, by recipe id in lib/recipes, in the order they appear:
   27 Kenyan pilau · 31 Ugali with goat fry · 28 Githeri with avocado and feta
   34 Coconut fish curry · 41 Mandazi · 32 Kenyan kaimati
   49 Kenyan chapati · 50 Cardamom-coconut mahamri · 51 Coconut beans · 52 Goat biryani
   Add a new Kenyan recipe? Put its id in this list. */
const KENYAN_IDS = [27, 31, 28, 34, 41, 32, 49, 50, 51, 52]

const STAPLES = [
  { name: 'Ugali', text: 'Firm maize-meal staple, eaten with stews and greens.' },
  { name: 'Sukuma wiki', text: 'Collard greens braised with onion and tomato.' },
  { name: 'Chapati', text: 'Soft, layered flatbread, rolled and pan-fried.' },
  { name: 'Nyama choma', text: 'Meat grilled over coals and served with kachumbari.' },
  { name: 'Pilau', text: 'Fragrant spiced rice cooked in a rich broth.' },
  { name: 'Mandazi', text: 'Lightly sweet fried dough, good with tea.' },
]

const EQUIPMENT = [
  {
    name: 'Heavy-bottomed sufuria',
    text: 'Holds steady heat for stews, pilau and githeri, so nothing catches at the bottom.',
  },
  {
    name: 'Wooden mwiko',
    text: 'Sturdy enough to stir ugali until it pulls cleanly away from the pot.',
  },
  {
    name: 'Flat chapati pan',
    text: 'A wide, flat pan for cooking chapati and mandazi until golden on both sides.',
  },
]

/*
  Palette
  forest #123222 · moss #2f6a45 · sage #8fb88a · mint #cfe3c0 · butter #f6f1c4
*/

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */


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
 
]

const FOOTER_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Baked Goods']

const PILLARS = [
  { label: 'Tested in a real kitchen' },
  { label: 'Everyday ingredients' },
  { label: 'Clear, step-by-step method' },
  { label: 'Made to share' },
]

/* Still used by the page body (not the footer). */
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

/* ---- Footer below is exactly as provided, minus the leaves and lemon ---- */

function SiteFooter() {
  const year = 2026

  return (
    <footer className="relative" style={{ backgroundColor: '#cfe3c0' }} aria-label="Site footer">
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
                  <li key={p.label}>{p.label}</li>
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

const Words = ({ text, kind = 'sword' }: { text: string; kind?: 'sword' | 'hword' }) => (
  <>
    {text.split(' ').map((w, i) => (
      <span key={i} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
        <span data-g={kind} className="inline-block">
          {w}
          {'\u00A0'}
        </span>
      </span>
    ))}
  </>
)

const panel = 'bg-[#dcebc9] ring-1 ring-[#b9d6a6]'
const darkBtn =
  'inline-flex items-center gap-2 rounded-full bg-[#123222] px-7 py-3 text-sm font-semibold text-[#f6f1c4] transition-colors hover:bg-[#2f6a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123222] focus-visible:ring-offset-2'
const ghostBtn =
  'inline-flex items-center gap-2 rounded-full border border-[#123222]/50 px-7 py-3 text-sm font-semibold text-[#123222] transition-colors hover:bg-[#123222]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123222]'

/* White bordered card with an inset photo and a caption underneath */
const card = 'border border-[#123222]/10 bg-white p-3 pb-5 shadow-[0_20px_40px_-30px_rgba(18,50,34,0.4)]'
const caption = 'mt-4 text-center text-[15px] text-[#123222]'
const meta = 'mt-2 flex items-center justify-center gap-3 text-xs text-[#123222]/60'
const tag = 'rounded-full bg-[#eaf3df] px-2.5 py-0.5 font-semibold text-[#2f6a45]'

export default function KenyanPage() {
  const list = KENYAN_IDS.map((id) => recipes.find((r) => r.id === id)).filter((r): r is Recipe => Boolean(r))
  const [hero, second, third] = list
  const featured = second ?? hero

  return (
    <SiteLayout>
      <AboutMotion />
      <main className="relative overflow-hidden" style={{ backgroundColor: '#cfe3c0' }}>

        {/* botanicals */}
        <div data-g="drift" data-drift="700" data-spin="40" aria-hidden="true" className="pointer-events-none absolute -left-6 top-[44rem] hidden w-28 opacity-35 lg:block">
          <Leaf tone="a" className="h-auto w-full" />
        </div>
        <div data-g="drift" data-drift="-400" data-spin="-30" aria-hidden="true" className="pointer-events-none absolute -right-6 top-[90rem] hidden w-24 opacity-30 lg:block">
          <Leaf tone="b" className="h-auto w-full" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-8 lg:px-8">
          <nav data-g="crumb" aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#123222]/70">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-[#123222]">Kenyan</span>
          </nav>

          {/* HERO PANEL */}
          <section className={`relative mt-6 overflow-hidden rounded-[2.5rem] ${panel}`}>
            <div className="grid items-center gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[1fr_1fr] lg:py-16">
              <div>
                <p data-g="hero-in" className="font-display text-xl italic text-[#2f6a45]">A taste of Kenya</p>
                <h1 id="hero-heading" className="mt-3 font-display text-5xl leading-[1.02] text-[#123222] sm:text-6xl xl:text-7xl">
                  <Words text="Kenyan kitchen" kind="hword" />
                </h1>
                <p data-g="hero-in" className="mt-6 max-w-md text-base leading-relaxed text-[#123222]/75">
                  Pilau, githeri, chapati, goat biryani, mahamri and more: home-style Kenyan dishes, cooked in a real
                  kitchen and written down step by step.
                </p>
                <div data-g="hero-in" className="mt-8 flex flex-wrap gap-3">
                  <a href="#dishes" className={darkBtn}>See the dishes <ArrowRight size={16} /></a>
                  <Link href="/recipes" className={ghostBtn}>All recipes</Link>
                </div>
                <dl data-g="hero-in" className="mt-10 text-[#123222]">
                  <dt className="text-xs text-[#123222]/60">Kenyan recipes</dt>
                  <dd className="font-display text-3xl">{list.length}</dd>
                </dl>
              </div>

              {hero && (
                <Link href={`/recipe/${recipeSlug(hero)}`} data-g="photo" className={`group mx-auto block w-full max-w-md ${card}`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img data-g="hero-img" src={hero.image} alt={hero.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className={caption}>{hero.title}</p>
                  <p className={meta}>
                    <span className={tag}>{hero.category}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={13} className="text-[#2f6a45]" /> {hero.time}</span>
                  </p>
                </Link>
              )}
            </div>
          </section>

          {/* FEATURED SPLIT */}
          {featured && (
            <section className="mt-20">
              <h2 data-g="split" className="text-center font-display text-4xl text-[#123222] sm:text-5xl">
                <Words text="Cook this first" />
              </h2>
              <div data-g="fade" className={`mt-10 grid items-center gap-8 overflow-hidden rounded-[2.5rem] p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] ${panel}`}>
                <div className={`mx-auto w-full max-w-sm ${card}`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={featured.image} alt={featured.title} loading="lazy" className="size-full object-cover" />
                  </div>
                  <p className={caption}>{featured.title}</p>
                </div>
                <div>
                  <span className="inline-flex rounded-full bg-[#123222] px-3 py-1 text-xs font-semibold text-[#f6f1c4]">{featured.category}</span>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-[#123222] sm:text-4xl">{featured.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#123222]/75">{featured.description}</p>
                  <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#123222]">
                    <Clock3 size={16} className="text-[#2f6a45]" /> {featured.time} · {featured.ingredients.length} ingredients
                  </p>
                  <div className="mt-6">
                    <Link href={`/recipe/${recipeSlug(featured)}`} className={darkBtn}>View recipe <ArrowRight size={16} /></Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ALL DISHES */}
          <section id="dishes" className="mt-24 scroll-mt-24">
            <div className="flex items-center justify-between gap-4">
              <h2 id="latest-heading" data-g="split" className="font-display text-4xl text-[#123222] sm:text-5xl">
                <Words text="Every Kenyan dish" />
              </h2>
              <Link
                href="/recipes"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#2f6a45] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#123222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123222] focus-visible:ring-offset-2"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div data-g="stagger" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((r) => (
                <Link
                  key={r.id}
                  href={`/recipe/${recipeSlug(r)}`}
                  className={`group block transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45] ${card}`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={r.image} alt={r.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 text-center font-display text-xl leading-snug text-[#123222]">{r.title}</h3>
                  <p className={meta}>
                    <span className={tag}>{r.category}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock3 size={13} className="text-[#2f6a45]" /> {r.time}</span>
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* STAPLES */}
          <section className="mt-24 border-t border-[#123222]/25 pt-14">
            <h2 data-g="split" className="font-display text-3xl text-[#123222] sm:text-4xl">
              <Words text="On a Kenyan table" />
            </h2>
            <ul data-g="stagger" className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {STAPLES.map((s) => (
                <li key={s.name} className="border-b border-[#123222]/20 pb-5">
                  <p className="font-display text-2xl text-[#123222]">{s.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#123222]/75">{s.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* KITCHEN EQUIPMENT */}
          <section
            data-g="fade"
            aria-labelledby="equipment-heading"
            className="mt-24 overflow-hidden rounded-[2.5rem] bg-[#2f6a45] px-6 py-12 text-white sm:px-12"
          >
            <h2
              id="equipment-heading"
              data-g="split"
              className="text-center font-display text-3xl sm:text-4xl"
            >
              <Words text="My kitchen equipments" />
            </h2>

            <ul data-g="stagger" className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {EQUIPMENT.map((item) => (
                <li key={item.name} className="flex flex-col items-center text-center">
                  <Leaf tone="a" className="h-9 w-auto" />
                  <p className="mt-4 font-display text-lg">{item.name}</p>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/75">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* CLOSING BANNER */}
          <section data-g="fade" className={`relative mt-24 overflow-hidden rounded-[2.5rem] ${panel}`}>
            <Leaf tone="a" className="pointer-events-none absolute -left-4 bottom-0 w-24 rotate-[-20deg] opacity-40" />
            <Leaf tone="b" className="pointer-events-none absolute -right-4 top-4 w-24 rotate-[25deg] opacity-40" />
            <div className="relative grid items-center gap-8 px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 className="font-display text-3xl leading-tight text-[#123222] sm:text-5xl">Cook Kenyan this weekend</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[#123222]/75">
                  Pick a dish, set your servings and cook it step by step. Add the ingredients to your shopping list and
                  take it to the market.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  
                  <Link href="/recipes" className={ghostBtn}>Browse recipes</Link>
                </div>
              </div>
              {third && (
                <div className={`mx-auto w-full max-w-xs ${card}`}>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={third.image} alt={third.title} loading="lazy" className="size-full object-cover" />
                  </div>
                  <p className={caption}>{third.title}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <SiteFooter />
      </main>
    </SiteLayout>
  )
}