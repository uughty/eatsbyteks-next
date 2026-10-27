import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { recipes } from '@/lib/recipes'

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET() {
  const supabaseAdmin = getSupabaseAdmin()

  const results: {
    title: string
    ok: boolean
    error: string | null
  }[] = []

  for (const recipe of recipes) {
    const ingredients = recipe.ingredients.map((name) => ({
      name,
    }))

    const steps = recipe.method
      .split('.')
      .map((step) => step.trim())
      .filter(Boolean)

    const { error } = await supabaseAdmin.from('recipes').insert({
      slug: createSlug(recipe.title),
      title: recipe.title,
      category:
        recipe.category === 'Dessert'
          ? 'Desserts'
          : recipe.category,
      time_label: recipe.time,
      description: recipe.description,
      image_url: recipe.image,
      ingredients,
      steps,
      is_kenyan: false,
      published: true,
    })

    results.push({
      title: recipe.title,
      ok: !error,
      error: error?.message ?? null,
    })
  }

  return NextResponse.json({
    imported: results.filter((result) => result.ok).length,
    failed: results.filter((result) => result.ok === false).length,
    results,
  })
}