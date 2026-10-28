import type { Recipe } from '@/lib/recipes'

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )

const stepsOf = (r: Recipe): string[] => {
  const bag = r as unknown as Record<string, unknown>
  for (const k of ['steps', 'method', 'instructions', 'directions']) {
    const v = bag[k]
    if (Array.isArray(v) && v.length) return v.map(String)
    if (typeof v === 'string' && v.trim())
      return v
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
  }
  return []
}

export function printRecipe(recipe: Recipe) {
  const steps = stepsOf(recipe)

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${esc(recipe.title)} | EatsByTeks</title>
<style>
  @page { margin: 18mm; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #123222; line-height: 1.5; }
  h1 { font-size: 28px; margin: 0 0 4px; }
  .meta { color: #2f6a45; font-size: 13px; margin-bottom: 18px; }
  h2 { font-size: 18px; margin: 22px 0 8px; border-bottom: 1px solid #cfe3c0; padding-bottom: 4px; }
  ul, ol { padding-left: 20px; margin: 0; }
  li { margin-bottom: 6px; font-size: 14px; }
  .foot { margin-top: 28px; font-size: 11px; color: #123222; opacity: .6; }
</style>
</head>
<body>
  <h1>${esc(recipe.title)}</h1>
  <div class="meta">${esc(String(recipe.category))} · ${esc(recipe.time)}</div>
  <h2>Ingredients</h2>
  <ul>${recipe.ingredients.map((i: string) => `<li>${esc(i)}</li>`).join('')}</ul>
  ${
    steps.length
      ? `<h2>Method</h2><ol>${steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>`
      : ''
  }
  <p class="foot">EatsByTeks · eatsbyteks.com</p>
</body>
</html>`

  const frame = document.createElement('iframe')
  frame.style.cssText =
    'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden'
  document.body.appendChild(frame)

  const win = frame.contentWindow
  const doc = win?.document
  if (!win || !doc) return

  doc.open()
  doc.write(html)
  doc.close()

  const cleanup = () => frame.remove()
  win.addEventListener('afterprint', cleanup)
  window.setTimeout(cleanup, 60000)

  window.setTimeout(() => {
    win.focus()
    win.print()
  }, 250)
}