'use client'

import Link from 'next/link'
import { ArrowDownToLine, Printer } from 'lucide-react'
import { printRecipe } from '@/lib/printRecipe'
import { recipeSlug } from '@/lib/recipes'
import type { Recipe } from '@/lib/recipes'

const btn =
  'inline-flex items-center justify-center gap-2 rounded-md bg-[#123222] px-4 py-2.5 text-sm font-semibold text-[#f6f1c4] transition-colors hover:bg-[#2f6a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f6a45] focus-visible:ring-offset-2'

export function RecipeActions({
  recipe,
  className = '',
}: {
  recipe: Recipe
  className?: string
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link href={`/recipe/${recipeSlug(recipe)}#recipe`} className={btn}>
        <ArrowDownToLine size={16} aria-hidden="true" />
        Jump to Recipe
      </Link>

      <button type="button" onClick={() => printRecipe(recipe)} className={btn}>
        <Printer size={16} aria-hidden="true" />
        Print Recipe
      </button>
    </div>
  )
}