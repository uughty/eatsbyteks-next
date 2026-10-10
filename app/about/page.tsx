import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, ArrowUpRight, Cake, ChefHat, ChevronRight, Coffee, Heart, Plus, Salad, Soup, Users, Utensils } from 'lucide-react'
import { SiteLayout } from '@/components/SiteLayout'
import { AboutMotion } from '@/components/AboutMotion'

export const metadata: Metadata = {
  title: 'Our Story | EatsByTeks',
  description:
    'Meet Chef Olive Tekeiwa and the kitchen behind EatsByTeks: simple, generous cooking and the joy of eating together.',
  openGraph: {
    title: 'Our Story | EatsByTeks',
    description: 'Simple, generous cooking and the joy of eating together.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

/* Images live in public/assets, so they are plain paths (no imports).
   Swap CHEF_PHOTO for a portrait of Olive, e.g. '/assets/chef-olive.jpg'. */
const CHEF_PHOTO = '/assets/chef.jpeg'
const PLATE = '/assets/recipe-cake.jpg'
const BOWL = '/assets/recipe-bowl.jpg'

/*
  Palette
  forest #123222 · moss #2f6a45 · sage #8fb88a · mint #eaf3df · butter #f6f1c4 · cream #faf6e8
*/

const MENU = [
  { label: 'Breakfast', icon: Coffee },
  { label: 'Lunch', icon: Soup },
  { label: 'Dinner', icon: Utensils },
  { label: 'Dessert', icon: Cake },
  { label: 'Salad', icon: Salad },
]

const WAYS = [
  { icon: ChefHat, title: 'Tested in a real kitchen', text: 'Every recipe is cooked at home before it is written down.' },
  { icon: Utensils, title: 'Everyday ingredients', text: 'Things you can find at the shop down the road.' },
  { icon: Heart, title: 'Clear, step-by-step method', text: 'Short steps in the order you actually cook them.' },
  { icon: Users, title: 'Made to share', text: 'Dishes sized and seasoned for the whole table.' },
]

const SOCIALS = ['Instagram', 'TikTok', 'YouTube', 'Pinterest']

const iconWrap = 'grid size-12 shrink-0 place-items-center rounded-full border border-[#123222]/30 text-[#123222]'
const rule = (
  <span aria-hidden="true" className="mt-3 flex items-center gap-2">
    <span className="h-px w-14 bg-[#8fb88a]" />
    <span className="size-1.5 rotate-45 bg-[#2f6a45]" />
    <span className="h-px w-14 bg-[#8fb88a]" />
  </span>
)

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
  { label: 'Shopping list', href: '/shopping-list' },
]

const FOOTER_CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Salad']

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

const DAY = [
  { when: 'Morning', label: 'Breakfast', icon: Coffee, text: 'Easy starts for slow mornings and rushed ones, made with what is already in the kitchen.' },
  { when: 'Midday', label: 'Lunch', icon: Soup, text: 'Bright bowls and warm soups that keep you going without a lot of washing up.' },
  { when: 'Evening', label: 'Dinner', icon: Utensils, text: 'The dishes you make again and again, written down so they turn out the same every time.' },
  { when: 'Sweet finish', label: 'Dessert', icon: Cake, text: 'Cakes and bakes for celebrations, and for no reason at all.' },
]

const NOTES = [
  { q: 'How are the recipes tested?', a: 'Every recipe is cooked in a real kitchen before it is written down, then checked again for timings and quantities.' },
  { q: 'Can I cook for more or fewer people?', a: 'Yes. Open any recipe and change the servings: the quantities and the cooking time update for you.' },
  { q: 'What if I only have a few ingredients?', a: 'Use the “In your kitchen” ingredient chips on the recipes page. Pick what you have and the list narrows to meals you can make.' },
  { q: 'How do I plan a week of meals?', a: 'Save the recipes you love, then add their ingredients to your shopping list and take it to the store.' },
]

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

export default function AboutPage() {
  return (
    <SiteLayout>
      <AboutMotion />
      <main
        className="relative overflow-hidden"
        style={{ backgroundColor: '#cfe3c0' }}
      >
        <div data-g="bar" aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-[#8fb88a]" style={{ transform: 'scaleX(0)' }} />

        {/* botanicals that drift with the page */}
        <div data-g="drift" data-drift="900" data-spin="40" aria-hidden="true" className="pointer-events-none absolute -left-8 top-[34rem] hidden w-32 opacity-30 lg:block">
          <Leaf tone="a" className="h-auto w-full" />
        </div>
        <div data-g="drift" data-drift="-500" data-spin="-30" aria-hidden="true" className="pointer-events-none absolute -right-6 top-[110rem] hidden w-28 opacity-25 lg:block">
          <Leaf tone="b" className="h-auto w-full" />
        </div>

        {/* HERO */}
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
          <nav data-g="crumb" aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#123222]/65">
            <Link href="/" className="hover:text-[#2f6a45] hover:underline">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/our-story" className="hover:text-[#2f6a45] hover:underline">Our story</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span className="font-semibold text-[#123222]">Chef Olive Tekeiwa</span>
          </nav>

          <section className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div data-g="photo" className="overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(18,50,34,0.55)]">
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem]">
                <img data-g="hero-img" src={CHEF_PHOTO} alt="Chef Olive Tekeiwa" className="size-full object-cover" />
              </div>
            </div>

            <div>
              <p data-g="hero-in" className="font-display text-xl italic text-[#2f6a45]">Chef and founder</p>
              <h1 id="hero-heading" className="mt-2 font-display text-5xl leading-[1.02] text-[#123222] sm:text-6xl xl:text-7xl">
                <Words text="Chef Olive Tekeiwa" kind="hword" />
              </h1>
              <div data-g="hero-in">{rule}</div>
              <p data-g="hero-in" className="mt-6 max-w-md text-base leading-relaxed text-[#123222]/75">
                Olive cooks the way she wants you to cook: simply, generously and with people around the table.
                EatsByTeks is where those meals are written down.
              </p>

              <ul data-g="hero-in" className="mt-8 space-y-5">
                <li className="flex items-center gap-4">
                  <span className={iconWrap}><Utensils size={20} /></span>
                  <div>
                    <p className="font-semibold text-[#123222]">Speciality</p>
                    <p className="text-sm text-[#123222]/70">Everyday dinners and something sweet to finish</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <span className={iconWrap}><ChefHat size={20} /></span>
                  <div>
                    <p className="font-semibold text-[#123222]">Kitchen</p>
                    <p className="text-sm text-[#123222]/70">Every recipe tested at home before it is shared</p>
                  </div>
                </li>
              </ul>

              <ul data-g="hero-in" className="mt-8 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <li key={s}>
                    <a href="#" className="inline-flex rounded-full border border-[#2f6a45]/40 px-4 py-1.5 text-sm font-semibold text-[#123222] transition-colors hover:bg-[#2f6a45] hover:text-white">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-7xl px-5 pt-24 lg:px-8">
          {/* WHY WE GATHER */}
          <section className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
            <div data-g="fade" className="aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(18,50,34,0.6)]">
              <img data-g="par" src={PLATE} alt="Strawberry cake ready to share" className="h-[118%] w-full object-cover" />
            </div>
            <div>
              <p data-g="fade" className="font-display text-xl italic text-[#2f6a45]">Why we gather</p>
              <h2 data-g="split" className="mt-3 font-display text-4xl leading-tight text-[#123222] sm:text-5xl">
                <Words text="The best memories begin around a table." />
              </h2>
              <p data-g="fade" className="mt-6 leading-relaxed text-[#123222]/75">
                EatsByTeks is a place for delicious everyday cooking: the dinners you make again and again, the cake
                you bring to a celebration, and all the little meals in between.
              </p>
              <p data-g="fade" className="mt-4 leading-relaxed text-[#123222]/75">
                Good food doesn’t need to be complicated. It just needs to be shared.
              </p>
              <Link
                data-g="fade"
                href="/recipes"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2f6a45] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#123222] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123222] focus-visible:ring-offset-2"
              >
                Browse recipes <ArrowUpRight size={16} />
              </Link>
            </div>
          </section>

          {/* ABOUT + MENU */}
          <section data-g="fade" className="mt-24 grid gap-10 border-t border-[#123222]/20 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-3xl text-[#123222]">About Chef Olive</h2>
              {rule}
              <p className="mt-6 text-sm leading-relaxed text-[#123222]/75">
                Olive’s kitchen is built on one idea: a recipe is only good if someone else can cook it and get the
                same result. So every dish is made, tasted and adjusted before it ever reaches the page.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#123222]/75">
                You’ll find breakfasts, lunches, dinners, desserts and salads here, all written in plain steps with
                ingredients you can find close to home.
              </p>
            </div>

            <ul data-g="stagger" className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              {MENU.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <Link
                    href={`/recipes?category=${encodeURIComponent(label)}`}
                    className="group flex h-full flex-col items-center gap-3 rounded-[1.6rem] rounded-[1.6rem] border border-[#123222]/20 p-5 text-center transition-colors hover:bg-[#123222]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45]"
                  >
                    <span className={`${iconWrap} transition-colors group-hover:bg-[#2f6a45] group-hover:text-[#f6f1c4]`}>
                      <Icon size={22} />
                    </span>
                    <span className="font-display text-lg text-[#123222]">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* A DAY AT THE TABLE: pins and scrolls sideways on desktop, stacks on mobile */}
        <section data-g="hpin" className="relative mt-24 overflow-hidden border-y border-[#123222]/20 text-[#123222] lg:flex lg:h-screen lg:items-center">
          <div data-g="hrail" className="flex flex-col gap-6 px-5 py-16 lg:w-max lg:flex-row lg:items-stretch lg:gap-8 lg:px-[8vw] lg:py-0">
            <div className="flex shrink-0 flex-col justify-center lg:w-[28vw]">
              <p className="font-display text-xl italic text-[#2f6a45]">From first light to the last slice</p>
              <h2 data-g="split" className="mt-3 font-display text-4xl leading-tight text-[#123222] sm:text-5xl">
                <Words text="A day at the table" />
              </h2>
              <p className="mt-5 max-w-sm text-[#123222]/75">
                Four moments, four ways to eat well. Keep scrolling to walk through the day.
              </p>
            </div>

            {DAY.map(({ when, label, icon: Icon, text }) => (
              <Link
                key={label}
                href={`/recipes?category=${encodeURIComponent(label)}`}
                className="group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[2.2rem] border border-[#123222]/25 p-6 transition-colors hover:bg-[#123222]/5 lg:h-[46vh] lg:min-h-[22rem] lg:w-[22vw] lg:min-w-[19rem] lg:p-7"
              >
                <Leaf tone="a" className="absolute -right-6 -top-6 w-32 rotate-[25deg] opacity-20 transition-transform duration-700 group-hover:rotate-[40deg]" />
                <span className="relative grid size-12 place-items-center rounded-full bg-[#123222] text-[#f6f1c4]">
                  <Icon size={22} />
                </span>
                <div className="relative mt-10">
                  <p className="font-display text-lg italic text-[#2f6a45]">{when}</p>
                  <p className="mt-1 font-display text-4xl text-[#123222] lg:text-5xl">{label}</p>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#123222]/75">{text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#123222]">
                    See {label.toLowerCase()} recipes <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-24 lg:px-8">
          {/* PHILOSOPHY */}
          <section className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <h2 data-g="fade" className="font-display text-3xl text-[#123222]">Chef’s philosophy</h2>
              <div data-g="fade">{rule}</div>
              <p data-g="fade" aria-hidden="true" className="mt-6 font-display text-6xl leading-none text-[#2f6a45]">“</p>
              <blockquote data-g="split" className="-mt-3 font-display text-2xl italic leading-snug text-[#123222] sm:text-3xl">
                <Words text="Good food doesn’t need to be complicated. It just needs to be shared." />
              </blockquote>
              <p data-g="fade" className="mt-5 text-sm font-semibold text-[#2f6a45]">Chef Olive Tekeiwa</p>
            </div>

            <div data-g="fade" className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem]">
              <img data-g="par" src={PLATE} alt="" loading="lazy" className="h-[118%] w-full object-cover" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#123222]/85 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-[#f6f1c4]">
                <p className="font-display text-3xl italic text-[#fbf8dc]">Olive T.</p>
                <p className="text-sm text-[#e4f0d9]">Chef and founder, EatsByTeks</p>
              </div>
            </div>
          </section>

          {/* HOW WE COOK */}
          <section data-g="fade" className="mt-24 border-t border-[#123222]/20 pt-14">
            <h2 className="font-display text-3xl text-[#123222]">How we cook</h2>
            {rule}
            <div className="relative mt-10">
              <span aria-hidden="true" data-g="line" className="absolute left-0 right-0 top-[6.6rem] hidden h-px bg-[#2f6a45]/50 lg:block" />
              <ol data-g="stagger" className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                {WAYS.map(({ icon: Icon, title, text }) => (
                  <li key={title}>
                    <span className={iconWrap}><Icon size={20} /></span>
                    <p className="mt-4 font-display text-xl text-[#123222]">{title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#123222]/70">{text}</p>
                    <span aria-hidden="true" className="mt-5 block size-2.5 rounded-full bg-[#2f6a45] ring-4 ring-[#cfe3c0]" />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* EVERY DAY IS WORTH MAKING */}
          <section className="mt-24 grid items-center gap-10 border-t border-[#123222]/20 pt-14 md:grid-cols-2 md:gap-16">
            <div>
              <p data-g="fade" className="font-display text-xl italic text-[#2f6a45]">Every day is worth making</p>
              <h2 data-g="split" className="mt-3 font-display text-4xl leading-tight text-[#123222] sm:text-5xl">
                <Words text="Something good is cooking." />
              </h2>
              <p data-g="fade" className="mt-6 leading-relaxed text-[#123222]/75">
                Explore recipes made for real life, from bright bowls to slow Sunday comforts.
              </p>
            </div>
            <div data-g="fade" className="aspect-[5/4] overflow-hidden rounded-[2rem]">
              <img data-g="par" src={BOWL} alt="Colorful chicken bowl" loading="lazy" className="h-[118%] w-full object-cover" />
            </div>
          </section>

          {/* KITCHEN NOTES */}
          <section className="mt-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <h2 data-g="split" className="font-display text-3xl text-[#123222] sm:text-4xl">
                <Words text="Kitchen notes" />
              </h2>
              <div data-g="fade">{rule}</div>
              <p data-g="fade" className="mt-6 max-w-sm text-sm leading-relaxed text-[#123222]/75">
                Quick answers about how EatsByTeks works, from the person who cooks the food.
              </p>
            </div>
            <div data-g="stagger" className="border-t border-[#123222]/25">
              {NOTES.map(({ q, a }) => (
                <details key={q} className="group border-b border-[#123222]/25 py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-[#123222] [&::-webkit-details-marker]:hidden">
                    {q}
                    <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#123222]/30 text-[#123222] transition-transform group-open:rotate-45">
                      <Plus size={16} />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#123222]/75">{a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section data-g="fade" className="mt-24 flex flex-col items-start justify-between gap-6 border-t border-[#123222]/20 pt-14 text-[#123222] sm:flex-row sm:items-center">
            <div className="flex items-center gap-5">
              <span className="hidden size-16 shrink-0 place-items-center rounded-full border border-[#123222]/40 text-[#123222] sm:grid">
                <ChefHat size={28} />
              </span>
              <div>
                <h2 className="font-display text-2xl text-[#123222] sm:text-3xl">Cook with Chef Olive</h2>
                <p className="mt-1 max-w-md text-sm text-[#123222]/75">Pick a recipe, scale the servings and cook it step by step.</p>
              </div>
            </div>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 rounded-full bg-[#123222] px-7 py-3 text-sm font-semibold text-[#f6f1c4] transition-colors hover:bg-[#2f6a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123222] focus-visible:ring-offset-2"
            >
              Browse recipes <ArrowRight size={16} />
            </Link>
          </section>
        </div>

        <SiteFooter />
      </main>
    </SiteLayout>
  )
}