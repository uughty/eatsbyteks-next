'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

/**
 * ADMIN-ONLY ACCESS
 * This page signs in with Supabase Auth, but the real protection is Row Level
 * Security in Supabase: only your admin email may insert, update or delete
 * recipes and images. See the SQL provided alongside this file.
 */
const BUCKET = 'recipe-images'
const MAX_FILE_MB = 5
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Baked food']

/** Turn hours and minutes into the label shown on the site, e.g. "1 hr 30 min". */
const buildTimeLabel = (hours: number, minutes: number) => {
  const parts: string[] = []
  if (hours > 0) parts.push(`${hours} hr`)
  if (minutes > 0) parts.push(`${minutes} min`)
  return parts.join(' ')
}

type RecipeIngredient = {
  name: string
  amount?: number | string
  unit?: string
}

type RecipeRow = {
  id: number
  slug: string
  title: string
  category: string
  time_label: string
  description: string
  image_url: string
  ingredients: RecipeIngredient[]
  steps: string[]
  published: boolean
  created_at: string
}

type Notice = { type: 'success' | 'error'; text: string } | null

const inputClass =
  'mt-1.5 w-full rounded-xl border border-[#123222]/20 bg-white px-4 py-3 text-base text-[#123222] placeholder:text-[#123222]/40 transition focus:border-[#2f6a45] focus:outline-none focus:ring-2 focus:ring-[#2f6a45]/25'

const labelClass = 'text-sm font-semibold text-[#123222]'

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Pull the storage object path out of a public URL, if it's ours. */
const storagePathFromUrl = (url: string) => {
  const marker = `/${BUCKET}/`
  const index = url.indexOf(marker)
  if (index === -1) return null
  return decodeURIComponent(url.slice(index + marker.length).split('?')[0])
}

export default function AdminPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [recipes, setRecipes] = useState<RecipeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [notice, setNotice] = useState<Notice>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [query, setQuery] = useState('')

  const [session, setSession] = useState<Session | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Dinner')
  const [timeHours, setTimeHours] = useState('0')
  const [timeMinutes, setTimeMinutes] = useState('30')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [steps, setSteps] = useState('')
  const [published, setPublished] = useState(true)
  const [saving, setSaving] = useState(false)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const loadRecipes = useCallback(async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setNotice({ type: 'error', text: `Could not load recipes: ${error.message}` })
    } else {
      setRecipes((data ?? []) as RecipeRow[])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setAuthChecked(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) loadRecipes()
    else setRecipes([])
  }, [session, loadRecipes])

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault()
    setSigningIn(true)
    setNotice(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setNotice({ type: 'error', text: 'Sign in failed. Check your email and password.' })
    } else {
      setPassword('')
      setShowPassword(false)
    }

    setSigningIn(false)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setNotice(null)
  }

  // Free the temporary preview URL when it changes or the page unmounts.
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recipes
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.slug.toLowerCase().includes(q),
    )
  }, [recipes, query])

  const publishedCount = recipes.filter((r) => r.published).length

  const chooseFile = (file: File | undefined | null) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setNotice({
        type: 'error',
        text: 'That file type is not supported. Use a JPG, PNG, WebP or AVIF image.',
      })
      return
    }

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setNotice({
        type: 'error',
        text: `That image is larger than ${MAX_FILE_MB} MB. Choose a smaller one.`,
      })
      return
    }

    setNotice(null)
    setImageFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const clearFile = () => {
    setImageFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const uploadImage = async (file: File): Promise<string> => {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`

    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    })

    if (error) throw new Error(error.message)

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  const handleAddRecipe = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setNotice(null)

    try {
      const finalSlug = createSlug(slug || title)

      if (!title.trim() || !finalSlug) {
        throw new Error('Add a recipe title before saving.')
      }

      const hoursValue = Math.max(0, Math.floor(Number(timeHours) || 0))
      const minutesValue = Math.max(0, Math.floor(Number(timeMinutes) || 0))
      const finalTimeLabel = buildTimeLabel(hoursValue, minutesValue)

      if (!finalTimeLabel) {
        throw new Error('Set a cooking time of at least 1 minute.')
      }

      let uploadedUrl = ''
      let uploadedPath: string | null = null

      if (imageFile) {
        uploadedUrl = await uploadImage(imageFile)
        uploadedPath = storagePathFromUrl(uploadedUrl)
      }

      const ingredientList = ingredients
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => ({ name: line }))

      const stepList = steps
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

      const { error } = await supabase.from('recipes').insert({
        title: title.trim(),
        slug: finalSlug,
        category,
        time_label: finalTimeLabel,
        description,
        image_url: uploadedUrl,
        ingredients: ingredientList,
        steps: stepList,
        published,
      })

      if (error) {
        // Don't leave an orphaned image in storage if the recipe didn't save.
        if (uploadedPath) {
          await supabase.storage.from(BUCKET).remove([uploadedPath])
        }

        throw new Error(`Could not save recipe: ${error.message}`)
      }

      setNotice({ type: 'success', text: 'Recipe saved.' })

      setTitle('')
      setSlug('')
      setCategory('Dinner')
      setTimeHours('0')
      setTimeMinutes('30')
      setDescription('')
      setIngredients('')
      setSteps('')
      setPublished(true)
      clearFile()

      await loadRecipes()
      router.refresh()
    } catch (err) {
      console.error(err)

      setNotice({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Something went wrong while saving the recipe.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (recipe: RecipeRow) => {
    const confirmed = window.confirm(
      `Delete “${recipe.title}”? This cannot be undone.`,
    )

    if (!confirmed) return

    setDeletingId(recipe.id)
    setNotice(null)

    const { error } = await supabase.from('recipes').delete().eq('id', recipe.id)

    if (error) {
      setNotice({ type: 'error', text: `Could not delete recipe: ${error.message}` })
    } else {
      // Also remove the uploaded image so storage doesn't fill with unused files.
      const path = storagePathFromUrl(recipe.image_url || '')
      if (path) await supabase.storage.from(BUCKET).remove([path])

      setNotice({ type: 'success', text: 'Recipe deleted.' })
      await loadRecipes()
      router.refresh()
    }

    setDeletingId(null)
  }

  const StatusBadge = ({ isPublished }: { isPublished: boolean }) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isPublished ? 'bg-[#eaf3df] text-[#2f6a45]' : 'bg-[#f4e7e7] text-[#a33]'
      }`}
    >
      <span
        aria-hidden
        className={`h-1.5 w-1.5 rounded-full ${
          isPublished ? 'bg-[#2f6a45]' : 'bg-[#a33]'
        }`}
      />
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )

  const Thumb = ({ recipe }: { recipe: RecipeRow }) =>
    recipe.image_url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={recipe.image_url}
        alt=""
        className="h-14 w-14 shrink-0 rounded-xl object-cover"
      />
    ) : (
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#eaf3df] text-xs font-semibold text-[#2f6a45]"
      >
        No photo
      </div>
    )

  const RowActions = ({ recipe }: { recipe: RecipeRow }) => (
    <div className="flex gap-2">
      <Link
        href={`/recipe/${recipe.slug}`}
        className="rounded-full border border-[#2f6a45]/40 px-4 py-2 text-xs font-semibold text-[#2f6a45] transition hover:bg-[#eaf3df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6a45]"
      >
        View
      </Link>
      <button
        type="button"
        onClick={() => handleDelete(recipe)}
        disabled={deletingId === recipe.id}
        className="rounded-full bg-[#c0392b] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#96281b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c0392b] disabled:opacity-60"
      >
        {deletingId === recipe.id ? 'Deleting…' : 'Delete'}
      </button>
    </div>
  )

  if (!authChecked) {
    return (
      <main className="mx-auto max-w-md px-4 py-24 text-center text-[#123222]/70">
        Checking your session…
      </main>
    )
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-md px-4 py-16 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-[#123222]">
          Admin sign in
        </h1>
        <p className="mt-2 text-[#123222]/70">
          This area is for site admins only.
        </p>

        {notice && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-[#c0392b]/30 bg-[#f9e9e6] p-4 text-sm font-semibold text-[#96281b]"
          >
            {notice.text}
          </div>
        )}

        <form
          onSubmit={handleSignIn}
          className="mt-6 grid gap-4 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-[#123222]/10 sm:p-6"
        >
          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Password</span>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                required
                className={`${inputClass.replace('mt-1.5', '')} pr-20`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-xs font-semibold text-[#2f6a45] transition hover:bg-[#eaf3df] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6a45]"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          <button
            type="submit"
            disabled={signingIn}
            className="w-full rounded-full bg-[#2f6a45] px-8 py-3.5 font-semibold text-white transition hover:bg-[#123222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6a45] disabled:opacity-60"
          >
            {signingIn ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#123222] sm:text-4xl">
            Recipe admin
          </h1>
          <p className="mt-2 max-w-xl text-[#123222]/70">
            Add recipes with a photo, check what’s live, and remove anything you
            no longer want on the site.
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-3 rounded-full border border-[#123222]/25 px-4 py-2 text-xs font-semibold text-[#123222] transition hover:bg-[#eaf3df]"
          >
            Sign out
          </button>
        </div>

        <dl className="flex gap-3">
          <div className="min-w-[96px] flex-1 rounded-2xl bg-[#123222] px-5 py-3 text-white sm:flex-none">
            <dt className="text-xs text-white/70">Total</dt>
            <dd className="text-2xl font-bold">{recipes.length}</dd>
          </div>
          <div className="min-w-[96px] flex-1 rounded-2xl bg-[#eaf3df] px-5 py-3 text-[#123222] sm:flex-none">
            <dt className="text-xs text-[#123222]/70">Published</dt>
            <dd className="text-2xl font-bold">{publishedCount}</dd>
          </div>
        </dl>
      </header>

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className={`mt-6 flex items-start justify-between gap-4 rounded-xl border p-4 text-sm font-semibold ${
            notice.type === 'success'
              ? 'border-[#2f6a45]/30 bg-[#eaf3df] text-[#1f4d31]'
              : 'border-[#c0392b]/30 bg-[#f9e9e6] text-[#96281b]'
          }`}
        >
          <span>{notice.text}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
            className="shrink-0 text-lg leading-none opacity-60 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      {/* ───────── All recipes ───────── */}
      <section className="mt-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#123222]/10 sm:mt-10 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-[#123222] sm:text-2xl">
            All recipes
          </h2>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, category or slug"
            aria-label="Search recipes"
            className="w-full rounded-full border border-[#123222]/20 px-5 py-2.5 text-sm text-[#123222] placeholder:text-[#123222]/40 focus:border-[#2f6a45] focus:outline-none focus:ring-2 focus:ring-[#2f6a45]/25 sm:max-w-xs"
          />
        </div>

        {loading ? (
          <p className="mt-6 text-[#123222]/70">Loading recipes…</p>
        ) : recipes.length === 0 ? (
          <p className="mt-6 text-[#123222]/70">
            No recipes yet. Use the form below to add your first one.
          </p>
        ) : filteredRecipes.length === 0 ? (
          <p className="mt-6 text-[#123222]/70">
            No recipes match “{query}”. Try a different word.
          </p>
        ) : (
          <>
            {/* Mobile: stacked cards */}
            <ul className="mt-5 grid gap-3 md:hidden">
              {filteredRecipes.map((recipe) => (
                <li
                  key={recipe.id}
                  className="rounded-2xl border border-[#123222]/10 p-4"
                >
                  <div className="flex items-start gap-3">
                    <Thumb recipe={recipe} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#123222]">
                        {recipe.title}
                      </p>
                      <p className="mt-0.5 text-sm text-[#123222]/70">
                        {recipe.category}
                        {recipe.time_label ? ` • ${recipe.time_label}` : ''}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#123222]/50">
                        /{recipe.slug}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <StatusBadge isPublished={recipe.published} />
                    <RowActions recipe={recipe} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Tablet and up: table */}
            <div className="mt-5 hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#123222]/15 text-[#123222]/70">
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      Recipe
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      Category
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      Slug
                    </th>
                    <th scope="col" className="py-3 pr-4 font-semibold">
                      Status
                    </th>
                    <th scope="col" className="py-3 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRecipes.map((recipe) => (
                    <tr
                      key={recipe.id}
                      className="border-b border-[#123222]/10 last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-3">
                          <Thumb recipe={recipe} />
                          <span className="font-semibold text-[#123222]">
                            {recipe.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-[#123222]/70">
                        {recipe.category}
                      </td>
                      <td className="py-3 pr-4 text-[#123222]/70">
                        {recipe.slug}
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge isPublished={recipe.published} />
                      </td>
                      <td className="py-3">
                        <div className="flex justify-end">
                          <RowActions recipe={recipe} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      {/* ───────── Add new recipe ───────── */}
      <section className="mt-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#123222]/10 sm:mt-10 sm:p-6">
        <h2 className="text-xl font-bold text-[#123222] sm:text-2xl">
          Add new recipe
        </h2>

        <form onSubmit={handleAddRecipe} className="mt-6 grid gap-8">
          {/* Basics */}
          <fieldset className="grid gap-4">
            <legend className="mb-1 text-base font-bold text-[#123222]">
              Basics
            </legend>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className={labelClass}>Title</span>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>URL slug (optional)</span>
                <input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  placeholder="Created from the title"
                  className={inputClass}
                />
              </label>

              <label className="block">
                <span className={labelClass}>Category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className={inputClass}
                >
                  {CATEGORIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className={labelClass}>Hours</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={48}
                    value={timeHours}
                    onChange={(event) => setTimeHours(event.target.value)}
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className={labelClass}>Minutes</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={59}
                    value={timeMinutes}
                    onChange={(event) => setTimeMinutes(event.target.value)}
                    className={inputClass}
                  />
                </label>
              </div>
            </div>

            <label className="block">
              <span className={labelClass}>Description</span>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                className={inputClass}
              />
            </label>
          </fieldset>

          {/* Photo */}
          <fieldset>
            <legend className="mb-3 text-base font-bold text-[#123222]">
              Photo
            </legend>

            <input
              ref={fileInputRef}
              id="recipe-image"
              type="file"
              accept={ACCEPTED_TYPES.join(',')}
              onChange={(event) => chooseFile(event.target.files?.[0])}
              className="sr-only"
            />

            {previewUrl ? (
              <div className="flex flex-col gap-4 rounded-2xl border border-[#123222]/15 p-3 sm:flex-row sm:items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Selected recipe photo preview"
                  className="aspect-[4/3] w-full rounded-xl object-cover sm:h-32 sm:w-44"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#123222]">
                    {imageFile?.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#123222]/60">
                    {imageFile ? (imageFile.size / 1024 / 1024).toFixed(2) : 0} MB •
                    uploads when you save
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-full border border-[#2f6a45]/40 px-4 py-2 text-xs font-semibold text-[#2f6a45] hover:bg-[#eaf3df]"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="rounded-full border border-[#c0392b]/40 px-4 py-2 text-xs font-semibold text-[#c0392b] hover:bg-[#f9e9e6]"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label
                htmlFor="recipe-image"
                onDragOver={(event) => {
                  event.preventDefault()
                  setDragging(true)
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(event) => {
                  event.preventDefault()
                  setDragging(false)
                  chooseFile(event.dataTransfer.files?.[0])
                }}
                className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed px-4 py-10 text-center transition focus-within:ring-2 focus-within:ring-[#2f6a45]/40 ${
                  dragging
                    ? 'border-[#2f6a45] bg-[#eaf3df]'
                    : 'border-[#123222]/25 hover:border-[#2f6a45] hover:bg-[#f6faf1]'
                }`}
              >
                <span className="text-base font-semibold text-[#123222]">
                  Choose a photo
                </span>
                <span className="text-sm text-[#123222]/60">
                  Tap to browse, or drag an image here
                </span>
                <span className="mt-1 text-xs text-[#123222]/50">
                  JPG, PNG, WebP or AVIF, up to {MAX_FILE_MB} MB
                </span>
              </label>
            )}
          </fieldset>

          {/* Method */}
          <fieldset className="grid gap-4 lg:grid-cols-2">
            <legend className="mb-1 text-base font-bold text-[#123222] lg:col-span-2">
              Method
            </legend>

            <label className="block">
              <span className={labelClass}>Ingredients (one per line)</span>
              <textarea
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
                rows={8}
                placeholder={'250 g flour\n2 eggs\n1 cup milk'}
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Steps (one per line)</span>
              <textarea
                value={steps}
                onChange={(event) => setSteps(event.target.value)}
                rows={8}
                placeholder={'Mix the dry ingredients.\nAdd the wet ingredients.'}
                className={inputClass}
              />
            </label>
          </fieldset>

          {/* Publish + save */}
          <div className="flex flex-col gap-4 border-t border-[#123222]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={published}
                onChange={(event) => setPublished(event.target.checked)}
                className="h-5 w-5 accent-[#2f6a45]"
              />
              <span className={labelClass}>Publish immediately</span>
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-full bg-[#2f6a45] px-8 py-3.5 font-semibold text-white transition hover:bg-[#123222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f6a45] disabled:opacity-60 sm:w-auto"
            >
              {saving
                ? imageFile
                  ? 'Uploading and saving…'
                  : 'Saving…'
                : 'Save recipe'}
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}