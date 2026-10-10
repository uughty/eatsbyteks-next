import { Suspense } from 'react'
import Link from 'next/link'
import RecipeContent from './recipe-content'

export default function RecipePage() {
  return (
    <Suspense
      fallback={
        <main className="bg-[#faf6e8]">
          <section className="mx-auto max-w-xl px-5 py-32 text-center">
            <h1 className="font-display text-5xl text-[#123222]">Loading recipe…</h1>
            <p className="mt-4 text-[#123222]/70">Please wait while we prepare this recipe.</p>
            <Link
              href="/recipes"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2f6a45] px-6 py-3 text-sm font-semibold text-white hover:bg-[#123222]"
            >
              All recipes
            </Link>
          </section>
        </main>
      }
    >
      <RecipeContent />
    </Suspense>
  )
}