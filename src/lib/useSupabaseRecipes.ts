'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Recipe } from '@/lib/recipes'

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
function mapRecipe(row: DbRecipe): Recipe {
  return {
    ...row,
    image: row.image_url,
    time: row.time_label,
    method: row.steps.join('\n'),
    ingredients: row.ingredients.map(
      (item) =>
        `${item.name}${item.amount ? ` — ${item.amount}` : ''}${
          item.unit ? ` ${item.unit}` : ''
        }`,
    ),
  }
}

export function useSupabaseRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function load() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (!active) return

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      setRecipes((data as DbRecipe[]).map(mapRecipe))
      setLoading(false)
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return { recipes, loading, error }
}