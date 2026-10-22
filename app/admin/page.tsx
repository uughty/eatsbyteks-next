'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        setError(error.message)
      } else {
        setUser(data.user?.email ?? null)
      }

      setLoading(false)
    }

    checkUser()
  }, [])

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      return
    }

    setUser(data.user?.email ?? null)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setEmail('')
    setPassword('')
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eaf3df]">
        <p className="text-[#123222]">Checking login…</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eaf3df] px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-2xl font-bold text-[#123222]">
            Admin login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-[#123222]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="w-full rounded-lg border border-[#123222]/20 p-3 outline-none focus:border-[#2f6a45]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-[#123222]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-[#123222]/20 p-3 outline-none focus:border-[#2f6a45]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#2f6a45] p-3 font-semibold text-white transition-colors hover:bg-[#123222]"
            >
              Log in
            </button>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eaf3df] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-[#123222]">
          Admin dashboard
        </h1>

        <p className="mb-8 text-sm text-[#123222]/70">
          Logged in as <span className="font-semibold">{user}</span>
        </p>

        <Link
          href="/add-recipe"
          className="inline-block w-full rounded-full bg-[#2f6a45] p-3 font-semibold text-white transition-colors hover:bg-[#123222]"
        >
          Add a new recipe
        </Link>

        <button
          onClick={handleLogout}
          className="mt-4 w-full rounded-full border border-[#2f6a45] p-3 font-semibold text-[#2f6a45] transition-colors hover:bg-[#eaf3df]"
        >
          Log out
        </button>
      </div>
    </main>
  )
}