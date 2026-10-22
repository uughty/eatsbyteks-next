'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Desserts',
  'Baked Goods',
]

export default function AddRecipePage() {
  const router = useRouter()

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Dinner')
  const [timeLabel, setTimeLabel] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [isKenyan, setIsKenyan] = useState(false)
  const [published, setPublished] = useState(true)
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    async function checkUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        setMessage(error.message)
      } else {
        setLoggedIn(Boolean(data.user))
      }

      setCheckingAuth(false)
    }

    checkUser()
  }, [])

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError) {
        throw new Error(`Authentication error: ${userError.message}`)
      }

      if (!userData.user) {
        throw new Error('Please log in first.')
      }

      console.log('Logged-in email:', userData.user.email)

      let imageUrl = ''

      if (image) {
        const extension = image.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${extension}`

        const { error: uploadError } = await supabase.storage
          .from('recipe-images')
          .upload(fileName, image, {
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`)
        }

        const { data } = supabase.storage
          .from('recipe-images')
          .getPublicUrl(fileName)

        imageUrl = data.publicUrl
      }

      const ingredientList = ingredients
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => ({ name: item }))

      const stepList = steps
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean)

      const { error: insertError } = await supabase
        .from('recipes')
        .insert({
          slug: slug || createSlug(title),
          title,
          category,
          time_label: timeLabel,
          description,
          image_url: imageUrl,
          ingredients: ingredientList,
          steps: stepList,
          is_kenyan: isKenyan,
          published,
        })

      if (insertError) {
        throw new Error(`Recipe save failed: ${insertError.message}`)
      }

      router.push('/recipes')
      router.refresh()
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Could not save recipe.',
      )
    } finally {
      setSaving(false)
    }
  }

  if (checkingAuth) {
    return (
      <main className="p-10">
        <p>Checking login…</p>
      </main>
    )
  }

  if (!loggedIn) {
    return (
      <main className="p-10">
        <p>
          Please log in at{' '}
          <a href="/admin" className="underline">
            /admin
          </a>
          .
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Add a new recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Recipe title"
          required
          className="w-full rounded border p-3"
        />

        <input
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="URL slug (optional)"
          className="w-full rounded border p-3"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded border p-3"
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          value={timeLabel}
          onChange={(event) => setTimeLabel(event.target.value)}
          placeholder="Cooking time, e.g. 45 mins"
          required
          className="w-full rounded border p-3"
        />

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Short description"
          required
          className="w-full rounded border p-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files?.[0] ?? null)}
          className="w-full rounded border p-3"
        />

        <textarea
          value={ingredients}
          onChange={(event) => setIngredients(event.target.value)}
          placeholder={'Add one ingredient per line:\nFlour\nSugar\nEggs'}
          required
          className="h-40 w-full rounded border p-3"
        />

        <textarea
          value={steps}
          onChange={(event) => setSteps(event.target.value)}
          placeholder={
            'Add one step per line:\nMix the ingredients.\nBake until golden.'
          }
          required
          className="h-40 w-full rounded border p-3"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isKenyan}
            onChange={(event) => setIsKenyan(event.target.checked)}
          />
          This is a Kenyan recipe
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
          />
          Publish immediately
        </label>

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded bg-green-700 p-3 font-semibold text-white disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save recipe'}
        </button>

        <button
  type="button"
  onClick={async () => {
    const { data, error } = await supabase.rpc('debug_auth')
    console.log('Auth debug:', data, error)
    setMessage(JSON.stringify(data, null, 2))
  }}
  className="w-full rounded border p-3"
>
  Debug my Supabase session
</button>

        {message && (
          <p className="rounded bg-red-50 p-3 text-sm text-red-700">
            {message}
          </p>
        )}
      </form>
    </main>
  )
}