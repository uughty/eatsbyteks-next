import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import { SiteLayout } from '@/components/SiteLayout'
import { categoryTiles } from '@/lib/recipes'

export const metadata: Metadata = {
  title: 'Collections | EatsByTeks',
  description:
    'Explore dinner, dessert and feel-good food collections from EatsByTeks.',
  openGraph: {
    title: 'Collections | EatsByTeks',
    description:
      'Explore dinner, dessert and feel-good food collections from EatsByTeks.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function CollectionsPage() {
  return (
    <SiteLayout>
      <main>
        <section className="border-b border-border py-10 sm:py-16 px-5">
          <div className="max-w-7xl mx-auto">
            <p className="text-rose uppercase text-xs font-bold">The recipe shelves</p>
            <h1 className="font-display font-extrabold text-chocolate text-4xl sm:text-6xl mt-2">
              Collections
            </h1>
            <p className="mt-3 text-muted-foreground">Find a dish for the moment you’re in.</p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14 sm:py-20 grid md:grid-cols-3 gap-10">
          {categoryTiles.map((tile) => (
            <Link
              key={tile.label}
              href={`/recipes?category=${encodeURIComponent(tile.category)}`}
              data-reveal
              className="group block min-w-0"
            >
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={tile.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-xs font-bold uppercase text-rose mt-5">{tile.sub}</p>
              <h2 className="font-display font-bold text-chocolate text-2xl sm:text-3xl mt-2">
                {tile.label}
              </h2>
              <span className="inline-flex items-center gap-2 mt-3 text-sm font-bold text-primary">
                Explore recipes <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </section>
      </main>
    </SiteLayout>
  )
}