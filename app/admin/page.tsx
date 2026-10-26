'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

const BUCKET = 'recipe-images'
const MAX_FILE_MB = 5
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Baked food']

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
  video_url?: string | null
}

type Notice = { type: 'success' | 'error'; text: string } | null
type StatusFilter = 'all' | 'published' | 'draft'

const inputClass =
  'w-full rounded border border-[#bbb] bg-white px-2.5 py-2 text-sm text-[#333] placeholder:text-[#999] focus:border-[#2f6a45] focus:outline-none focus:ring-2 focus:ring-[#2f6a45]/20'

const primaryBtn =
  'rounded bg-[#2f6a45] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#123222] disabled:opacity-60'

const linkBtn =
  'rounded border border-[#2f6a45] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#2f6a45] transition hover:bg-[#eef6e8]'

const editBtn =
  'rounded border border-[#123222]/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#123222] transition hover:bg-[#eef6e8]'

const deleteBtn =
  'rounded bg-[#ba2121] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#a41515] disabled:opacity-60'

const th =
  'border-b border-[#ddd] bg-[#f6f6f6] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[#666]'

function Module({
  title,
  as: Tag = 'h2',
  children,
  className = '',
}: {
  title: string
  as?: 'h2' | 'h3'
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={`overflow-hidden rounded border border-[#d4e3cb] bg-white ${className}`}
    >
      <Tag className="bg-[#2f6a45] px-4 py-2 text-[13px] font-semibold uppercase tracking-wide text-white">
        {title}
      </Tag>
      {children}
    </section>
  )
}

function FormRow({
  label,
  htmlFor,
  help,
  children,
}: {
  label: string
  htmlFor?: string
  help?: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-1.5 border-b border-[#eee] px-4 py-3 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-4">
      <label htmlFor={htmlFor} className="pt-2 text-sm font-bold text-[#333]">
        {label}
      </label>
      <div className="min-w-0">
        {children}
        {help && <p className="mt-1.5 text-xs text-[#666]">{help}</p>}
      </div>
    </div>
  )
}

const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  const [session, setSession] = useState<Session | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signingIn, setSigningIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [editingRecipe, setEditingRecipe] = useState<RecipeRow | null>(null)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [category, setCategory] = useState('Dinner')
  const [timeHours, setTimeHours] = useState('0')
  const [timeMinutes, setTimeMinutes] = useState('30')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
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
      setNotice({
        type: 'error',
        text: `Could not load recipes: ${error.message}`,
      })
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

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, next) => {
        setSession(next)
      },
    )

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setNotice({
        type: 'error',
        text: 'Sign in failed. Check your email and password.',
      })
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

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const filterCategories = useMemo(
    () =>
      Array.from(
        new Set([...CATEGORIES, ...recipes.map((recipe) => recipe.category)]),
      ),
    [recipes],
  )

  const filteredRecipes = useMemo(() => {
    const q = query.trim().toLowerCase()

    return recipes.filter((recipe) => {
      if (statusFilter === 'published' && !recipe.published) return false
      if (statusFilter === 'draft' && recipe.published) return false
      if (categoryFilter !== 'all' && recipe.category !== categoryFilter)
        return false
      if (!q) return true

      return (
        recipe.title.toLowerCase().includes(q) ||
        recipe.category.toLowerCase().includes(q) ||
        recipe.slug.toLowerCase().includes(q)
      )
    })
  }, [recipes, query, statusFilter, categoryFilter])

  const publishedCount = recipes.filter((recipe) => recipe.published).length
  const draftCount = recipes.length - publishedCount
  const hasFilters =
    query.trim() !== '' ||
    statusFilter !== 'all' ||
    categoryFilter !== 'all'

  const clearFilters = () => {
    setQuery('')
    setStatusFilter('all')
    setCategoryFilter('all')
  }

  const chooseFile = (file: File | undefined | null) => {
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setNotice({
        type: 'error',
        text: 'That file type is not supported. Use JPG, PNG, WebP or AVIF.',
      })
      return
    }

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setNotice({
        type: 'error',
        text: `That image is larger than ${MAX_FILE_MB} MB.`,
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
    const extension =
      file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const path = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${extension}`

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, {
        cacheControl: '31536000',
        contentType: file.type,
        upsert: false,
      })

    if (error) throw new Error(error.message)

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    return data.publicUrl
  }

  const resetForm = () => {
    setEditingRecipe(null)
    setTitle('')
    setSlug('')
    setCategory('Dinner')
    setTimeHours('0')
    setTimeMinutes('30')
    setDescription('')
    setVideoUrl('')
    setIngredients('')
    setSteps('')
    setPublished(true)
    clearFile()
  }

  const startEditing = (recipe: RecipeRow) => {
    setEditingRecipe(recipe)
    setNotice(null)

    setTitle(recipe.title)
    setSlug(recipe.slug)
    setCategory(recipe.category)

    const hours = /(\d+)\s*hr/i.exec(recipe.time_label || '')
    const minutes = /(\d+)\s*min/i.exec(recipe.time_label || '')

    setTimeHours(hours ? hours[1] : '0')
    setTimeMinutes(minutes ? minutes[1] : '0')

    setDescription(recipe.description || '')
    setVideoUrl(recipe.video_url || '')

    setIngredients(
      (recipe.ingredients || [])
        .map((ingredient) =>
          [ingredient.amount, ingredient.unit, ingredient.name]
            .filter(Boolean)
            .join(' '),
        )
        .join('\n'),
    )

    setSteps((recipe.steps || []).join('\n'))
    setPublished(recipe.published)
    clearFile()

    document
      .getElementById('add-recipe')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSaveRecipe = async (event: React.FormEvent) => {
    event.preventDefault()
    setSaving(true)
    setNotice(null)

    try {
      const finalSlug = createSlug(slug || title)

      if (!title.trim() || !finalSlug) {
        throw new Error('Add a recipe title before saving.')
      }

      const hoursValue = Math.max(
        0,
        Math.floor(Number(timeHours) || 0),
      )
      const minutesValue = Math.max(
        0,
        Math.floor(Number(timeMinutes) || 0),
      )
      const finalTimeLabel = buildTimeLabel(hoursValue, minutesValue)

      if (!finalTimeLabel) {
        throw new Error('Set a cooking time of at least 1 minute.')
      }

      let uploadedUrl = editingRecipe?.image_url || ''
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

      const recipeData = {
        title: title.trim(),
        slug: finalSlug,
        category,
        time_label: finalTimeLabel,
        description,
        image_url: uploadedUrl,
        ingredients: ingredientList,
        steps: stepList,
        published,
        video_url: videoUrl.trim() || null,
      }

      if (editingRecipe) {
        const { error } = await supabase
          .from('recipes')
          .update(recipeData)
          .eq('id', editingRecipe.id)

        if (error) {
          throw new Error(`Could not update recipe: ${error.message}`)
        }

        setNotice({ type: 'success', text: 'Recipe updated.' })
      } else {
        const { error } = await supabase
          .from('recipes')
          .insert(recipeData)

        if (error) {
          if (uploadedPath) {
            await supabase.storage.from(BUCKET).remove([uploadedPath])
          }

          throw new Error(`Could not save recipe: ${error.message}`)
        }

        setNotice({ type: 'success', text: 'Recipe saved.' })
      }

      resetForm()
      await loadRecipes()
      router.refresh()
    } catch (error) {
      console.error(error)

      setNotice({
        type: 'error',
        text:
          error instanceof Error
            ? error.message
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

    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', recipe.id)

    if (error) {
      setNotice({
        type: 'error',
        text: `Could not delete recipe: ${error.message}`,
      })
    } else {
      const path = storagePathFromUrl(recipe.image_url || '')

      if (path) {
        await supabase.storage.from(BUCKET).remove([path])
      }

      setNotice({ type: 'success', text: 'Recipe deleted.' })
      await loadRecipes()
      router.refresh()
    }

    setDeletingId(null)
  }

  const StatusBadge = ({ isPublished }: { isPublished: boolean }) =>
    isPublished ? (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2f6a45]">
        <span aria-hidden className="text-base leading-none">✔</span>
        Published
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ba2121]">
        <span aria-hidden className="text-base leading-none">✖</span>
        Draft
      </span>
    )

  const Thumb = ({ recipe }: { recipe: RecipeRow }) =>
    recipe.image_url ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={recipe.image_url}
        alt=""
        className="h-11 w-11 shrink-0 rounded object-cover ring-1 ring-[#ddd]"
      />
    ) : (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#eef6e8] text-[10px] font-semibold text-[#2f6a45] ring-1 ring-[#d4e3cb]">
        None
      </div>
    )

  const RowActions = ({ recipe }: { recipe: RecipeRow }) => (
    <div className="flex gap-2">
      <Link href={`/recipe/${recipe.slug}`} className={linkBtn}>
        View
      </Link>

      <button
        type="button"
        onClick={() => startEditing(recipe)}
        className={editBtn}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => handleDelete(recipe)}
        disabled={deletingId === recipe.id}
        className={deleteBtn}
      >
        {deletingId === recipe.id ? 'Deleting…' : 'Delete'}
      </button>
    </div>
  )

  const noticeBar = notice && (
    <div
      role={notice.type === 'error' ? 'alert' : 'status'}
      className={`mb-5 flex items-start justify-between gap-4 border-l-4 px-4 py-3 text-sm font-semibold ${
        notice.type === 'success'
          ? 'border-[#2f6a45] bg-[#e1f3d8] text-[#1f4d31]'
          : 'border-[#ba2121] bg-[#ffefef] text-[#ba2121]'
      }`}
    >
      <span>{notice.text}</span>
      <button
        type="button"
        onClick={() => setNotice(null)}
        className="shrink-0 text-lg leading-none opacity-60 hover:opacity-100"
      >
        ×
      </button>
    </div>
  )

  const filterItem = (active: boolean) =>
    `block w-full px-4 py-1.5 text-left text-sm transition-colors ${
      active
        ? 'border-l-4 border-[#2f6a45] bg-[#eef6e8] pl-3 font-semibold text-[#2f6a45]'
        : 'text-[#2f6a45]/80 hover:bg-[#f5f9f1] hover:text-[#2f6a45]'
    }`

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-[#123222] px-5 py-3 text-[#f6f1c4]">
          <p className="text-xl font-light">EatsByTeks administration</p>
        </header>
        <p className="px-4 py-24 text-center text-[#666]">
          Checking your session…
        </p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#f8f8f8]">
        <header className="bg-[#123222] px-5 py-3 text-[#f6f1c4]">
          <p className="text-xl font-light">EatsByTeks administration</p>
        </header>

        <main className="mx-auto mt-12 w-full max-w-sm px-4 pb-16">
          {noticeBar}

          <div className="overflow-hidden rounded border border-[#ccc] bg-white">
            <h1 className="bg-[#2f6a45] px-4 py-2 text-[13px] font-semibold uppercase tracking-wide text-white">
              Admin sign in
            </h1>

            <form onSubmit={handleSignIn} className="grid gap-4 p-5">
              <div>
                <label htmlFor="login-email" className="text-sm font-bold text-[#333]">
                  Email:
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className={`mt-1.5 ${inputClass}`}
                />
              </div>

              <div>
                <label htmlFor="login-password" className="text-sm font-bold text-[#333]">
                  Password:
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className={`${inputClass} pr-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded px-2.5 py-1 text-xs font-semibold text-[#2f6a45]"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={signingIn}
                className={`${primaryBtn} w-full`}
              >
                {signingIn ? 'Signing in…' : 'Log in'}
              </button>
            </form>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-[#333]">
      <header className="bg-[#123222] text-[#f6f1c4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-xl font-light">EatsByTeks administration</p>

          <p className="text-[11px] uppercase tracking-wide text-[#f6f1c4]/80">
            Welcome,{' '}
            <strong className="font-bold text-[#f6f1c4]">
              {session.user.email}
            </strong>
            .{' '}
            <Link href="/" className="font-semibold text-white hover:underline">
              View site
            </Link>
            {' / '}
            <button
              type="button"
              onClick={handleSignOut}
              className="font-semibold uppercase tracking-wide text-white hover:underline"
            >
              Log out
            </button>
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-6 sm:px-8 sm:py-8">
        {noticeBar}

        <h1 className="mb-6 text-2xl font-light text-[#3a5444]">
          Recipe administration
        </h1>

        <div className="mb-3 flex justify-end">
          <a
            href="#add-recipe"
            className="rounded-full bg-[#2f6a45] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Add recipe +
          </a>
        </div>

        <div className="gap-6 lg:flex lg:items-start">
          <Module title="Select recipe to change" className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 border-b border-[#ddd] bg-[#f8f8f8] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title, category or slug"
                className={`${inputClass} sm:max-w-sm`}
              />

              {hasFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold uppercase tracking-wide text-[#2f6a45] hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {loading ? (
              <p className="px-4 py-6 text-sm text-[#666]">Loading recipes…</p>
            ) : filteredRecipes.length === 0 ? (
              <p className="px-4 py-6 text-sm text-[#666]">
                No recipes match your search or filters.
              </p>
            ) : (
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className={th}>Recipe</th>
                      <th className={th}>Category</th>
                      <th className={th}>Time</th>
                      <th className={th}>Slug</th>
                      <th className={th}>Status</th>
                      <th className={`${th} text-right`}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRecipes.map((recipe) => (
                      <tr
                        key={recipe.id}
                        className="border-b border-[#eee] even:bg-[#f9fbf7] hover:bg-[#eef6e8]"
                      >
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-3">
                            <Thumb recipe={recipe} />
                            <span className="font-semibold text-[#2f6a45]">
                              {recipe.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-[#555]">
                          {recipe.category}
                        </td>
                        <td className="px-3 py-2.5 text-[#555]">
                          {recipe.time_label || '—'}
                        </td>
                        <td className="px-3 py-2.5 text-[#777]">
                          {recipe.slug}
                        </td>
                        <td className="px-3 py-2.5">
                          <StatusBadge isPublished={recipe.published} />
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex justify-end">
                            <RowActions recipe={recipe} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Module>

          <aside className="mt-6 w-full space-y-6 lg:mt-0 lg:w-64 lg:shrink-0">
            <Module title="Filter">
              <div className="py-3">
                <h3 className="px-4 pb-1.5 text-sm text-[#666]">By status</h3>
                <ul>
                  {(
                    [
                      ['all', 'All'],
                      ['published', 'Published'],
                      ['draft', 'Draft'],
                    ] as [StatusFilter, string][]
                  ).map(([value, label]) => (
                    <li key={value}>
                      <button
                        type="button"
                        onClick={() => setStatusFilter(value)}
                        className={filterItem(statusFilter === value)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Module>

            <Module title="Summary">
              <dl className="text-sm">
                <div className="flex items-center justify-between border-b border-[#eee] px-4 py-2.5">
                  <dt className="text-[#666]">Total recipes</dt>
                  <dd className="font-bold text-[#123222]">{recipes.length}</dd>
                </div>
                <div className="flex items-center justify-between border-b border-[#eee] px-4 py-2.5">
                  <dt className="text-[#666]">Published</dt>
                  <dd className="font-bold text-[#2f6a45]">{publishedCount}</dd>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5">
                  <dt className="text-[#666]">Drafts</dt>
                  <dd className="font-bold text-[#ba2121]">{draftCount}</dd>
                </div>
              </dl>
            </Module>
          </aside>
        </div>

        <div id="add-recipe" className="mt-12 scroll-mt-6">
          <h2 className="mb-6 text-2xl font-light text-[#3a5444]">
            {editingRecipe
              ? `Edit recipe: ${editingRecipe.title}`
              : 'Add recipe'}
          </h2>

          <form onSubmit={handleSaveRecipe} className="space-y-6">
            <Module title="Basics" as="h3">
              <FormRow label="Title:" htmlFor="f-title">
                <input
                  id="f-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  className={`${inputClass} max-w-xl`}
                />
              </FormRow>

              <FormRow
                label="URL slug:"
                htmlFor="f-slug"
                help="Created from the title if left empty."
              >
                <input
                  id="f-slug"
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className={`${inputClass} max-w-xl`}
                />
              </FormRow>

              <FormRow label="Category:" htmlFor="f-category">
                <select
                  id="f-category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className={`${inputClass} max-w-xs`}
                >
                  {CATEGORIES.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormRow>

              <FormRow label="Cooking time:" htmlFor="f-hours">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#555]">
                  <input
                    id="f-hours"
                    type="number"
                    min={0}
                    value={timeHours}
                    onChange={(event) => setTimeHours(event.target.value)}
                    className={`${inputClass} w-20`}
                  />
                  <span>hours</span>
                  <input
                    type="number"
                    min={0}
                    value={timeMinutes}
                    onChange={(event) => setTimeMinutes(event.target.value)}
                    className={`${inputClass} ml-2 w-20`}
                  />
                  <span>minutes</span>
                </div>
              </FormRow>

              <FormRow label="Description:" htmlFor="f-description">
                <textarea
                  id="f-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={3}
                  className={`${inputClass} max-w-3xl`}
                />
              </FormRow>

              <FormRow
                label="Video URL:"
                htmlFor="f-video"
                help="Optional. Add a YouTube, TikTok or other video link."
              >
                <input
                  id="f-video"
                  value={videoUrl}
                  onChange={(event) => setVideoUrl(event.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className={`${inputClass} max-w-3xl`}
                />
              </FormRow>
            </Module>

            <Module title="Photo" as="h3">
              <FormRow
                label="Recipe photo:"
                htmlFor="recipe-image"
                help={`JPG, PNG, WebP or AVIF, up to ${MAX_FILE_MB} MB.`}
              >
                <input
                  ref={fileInputRef}
                  id="recipe-image"
                  type="file"
                  accept={ACCEPTED_TYPES.join(',')}
                  onChange={(event) =>
                    chooseFile(event.target.files?.[0])
                  }
                  className="sr-only"
                />

                {previewUrl ? (
                  <div className="flex max-w-xl flex-col gap-4 rounded border border-[#ddd] p-3 sm:flex-row sm:items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewUrl}
                      alt="Selected recipe photo"
                      className="aspect-[4/3] w-full rounded object-cover sm:h-28 sm:w-40"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={linkBtn}
                      >
                        Replace
                      </button>
                      <button
                        type="button"
                        onClick={clearFile}
                        className={deleteBtn}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label
                    htmlFor="recipe-image"
                    className="flex max-w-xl cursor-pointer flex-col items-center justify-center gap-1 rounded border-2 border-dashed px-4 py-8 text-center"
                  >
                    <span className="text-sm font-semibold text-[#2f6a45]">
                      Choose a photo
                    </span>
                    <span className="text-xs text-[#666]">
                      Tap to browse, or drag an image here
                    </span>
                  </label>
                )}
              </FormRow>
            </Module>

            <Module title="Method" as="h3">
              <FormRow label="Ingredients:" htmlFor="f-ingredients">
                <textarea
                  id="f-ingredients"
                  value={ingredients}
                  onChange={(event) => setIngredients(event.target.value)}
                  rows={8}
                  className={`${inputClass} max-w-3xl`}
                />
              </FormRow>

              <FormRow label="Steps:" htmlFor="f-steps">
                <textarea
                  id="f-steps"
                  value={steps}
                  onChange={(event) => setSteps(event.target.value)}
                  rows={8}
                  className={`${inputClass} max-w-3xl`}
                />
              </FormRow>
            </Module>

            <div className="flex flex-col gap-4 rounded border border-[#ddd] bg-[#f8f8f8] p-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(event) =>
                    setPublished(event.target.checked)
                  }
                  className="h-4 w-4 accent-[#2f6a45]"
                />
                <span className="text-sm font-bold text-[#333]">
                  Publish immediately
                </span>
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                {editingRecipe && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded border border-[#123222]/30 px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#123222] hover:bg-[#eef6e8]"
                  >
                    Cancel edit
                  </button>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className={`${primaryBtn} w-full sm:w-auto`}
                >
                  {saving
                    ? 'Saving…'
                    : editingRecipe
                      ? 'Update recipe'
                      : 'Save recipe'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}