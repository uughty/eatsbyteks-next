'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Plus, Printer, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SiteLayout } from '@/components/SiteLayout'
import { useShoppingList } from '@/lib/useShoppingList'

export default function ShoppingPage() {
  const { items, toggle, remove, clearDone, clearAll, addCustom } = useShoppingList()
  const [extra, setExtra] = useState('')
  const groups = Array.from(new Set(items.map((i) => i.recipe)))
  const left = items.filter((i) => !i.done).length

  return (
    <SiteLayout>
      <main>
        <section className="bg-mintwash px-5 py-10 sm:py-14">
          <div className="mx-auto max-w-4xl">
            <p className="text-primary text-xs font-semibold uppercase tracking-widest">Plan your cook</p>
            <h1 className="font-display text-chocolate text-4xl sm:text-6xl mt-2">Shopping list</h1>
            <p className="text-muted-foreground mt-3">
              {items.length
                ? `${left} of ${items.length} items still to get.`
                : 'Add ingredients from any recipe page.'}
            </p>
          </div>
        </section>

        <section className="recipe-print mx-auto max-w-4xl px-5 py-10">
          <form
            className="no-print flex gap-2 mb-8"
            onSubmit={(e) => {
              e.preventDefault()
              if (extra.trim()) {
                addCustom(extra.trim())
                setExtra('')
              }
            }}
          >
            <input
              value={extra}
              onChange={(e) => setExtra(e.target.value)}
              placeholder="Add something else, e.g. olive oil"
              aria-label="Add item"
              className="flex-1 h-11 rounded-full border border-input bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button className="rounded-full h-11">
              <Plus /> Add
            </Button>
          </form>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="font-display text-3xl text-chocolate">Your basket is empty.</h2>
              <Button asChild className="mt-5 rounded-full">
                <Link href="/recipes">Find a recipe</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="no-print flex flex-wrap gap-2 mb-6">
                <Button variant="outline" className="rounded-full" onClick={() => window.print()}>
                  <Printer /> Print list
                </Button>
                <Button variant="outline" className="rounded-full" onClick={clearDone}>
                  Clear checked
                </Button>
                <Button variant="ghost" className="rounded-full" onClick={clearAll}>
                  Clear all
                </Button>
              </div>

              <div className="space-y-8">
                {groups.map((g) => (
                  <div key={g} data-reveal>
                    <h2 className="font-display text-2xl text-chocolate mb-3">{g}</h2>
                    <ul className="divide-y divide-border border-y border-border">
                      {items
                        .filter((i) => i.recipe === g)
                        .map((i) => (
                          <li key={i.id} className="flex items-center gap-3 py-3">
                            <button
                              type="button"
                              onClick={() => toggle(i.id)}
                              aria-pressed={i.done}
                              aria-label={`Mark ${i.name}`}
                              className={`grid size-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                                i.done
                                  ? 'bg-primary border-primary text-primary-foreground'
                                  : 'border-border'
                              }`}
                            >
                              {i.done && <Check size={14} />}
                            </button>
                            <span className={`flex-1 ${i.done ? 'line-through text-muted-foreground' : ''}`}>
                              {i.amount && <strong className="font-semibold mr-2">{i.amount}</strong>}
                              {i.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => remove(i.id)}
                              aria-label={`Remove ${i.name}`}
                              className="no-print text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 size={16} />
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </SiteLayout>
  )
}