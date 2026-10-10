import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/SiteLayout";
import { RecipeCard } from "@/components/RecipeCard";
import { RecipeDialog } from "@/components/RecipeDialog";
import { recipes, recipeSlug } from "@/lib/recipes";
import { useRecipeShelf } from "@/lib/useRecipeShelf";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "From the Kitchen | EatsByTeks" },
    { name: "description", content: "The latest recipes from EatsByTeks kitchen, from everyday dinners to something sweet." },
    { property: "og:title", content: "From the Kitchen | EatsByTeks" },
    { property: "og:description", content: "Read the latest recipes from EatsByTeks kitchen." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: HomePage,
});

function HomePage() {
  const { saved, selected, setSelected, toggleSaved } = useRecipeShelf();
  const [featured, ...latest] = recipes;
  return <SiteLayout><main>
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-16 text-center" data-reveal>
      <h1 className="font-display font-extrabold text-chocolate text-5xl sm:text-7xl lg:text-8xl">EatsByTeks<span className="text-rose">.</span></h1>
      <div className="flex items-center justify-center gap-4 mt-5"><span className="w-10 sm:w-16 h-px bg-border" /><p className="text-[11px] sm:text-xs font-bold uppercase text-primary">The recipe journal</p><span className="w-10 sm:w-16 h-px bg-border" /></div>
    </section>
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-14 sm:pb-20" aria-label="Featured recipe">
      <div className="grid lg:grid-cols-12 gap-7 lg:gap-12 items-center" data-reveal>
        <Link to="/recipe/$slug" params={{ slug: recipeSlug(featured) }} className="lg:col-span-7 block overflow-hidden bg-muted aspect-[16/10] group" aria-label={`View ${featured.title}`}><img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></Link>
        <div className="lg:col-span-5 lg:pl-4"><p className="text-sm font-bold text-rose uppercase">On the table / {featured.category} · {featured.time}</p><h2 className="font-display font-bold text-chocolate text-3xl sm:text-5xl leading-[1.1] mt-4">{featured.title}</h2><p className="text-muted-foreground leading-relaxed mt-5 max-w-md">{featured.description}</p><Button asChild variant="link" className="mt-5 px-0 font-bold"><Link to="/recipe/$slug" params={{ slug: recipeSlug(featured) }}>View recipe <ArrowRight size={17} /></Link></Button></div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-20 sm:pb-28" aria-labelledby="latest-heading">
      <div className="flex items-end justify-between gap-4 mb-8 sm:mb-10 pb-5 border-b border-border" data-reveal>
        <div><p className="text-xs font-bold uppercase text-rose mb-2">Fresh from the kitchen</p><h2 id="latest-heading" className="font-display font-bold text-chocolate text-3xl sm:text-4xl">Latest recipes</h2></div>
        <Link to="/recipes" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-rose shrink-0 transition-colors">All recipes <ArrowRight size={17} /></Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12 sm:gap-y-16">{latest.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} saved={saved.includes(recipe.id)} onSave={() => toggleSaved(recipe.id)} onOpen={() => setSelected(recipe)} />)}</div>
    </section>
  </main><RecipeDialog recipe={selected} saved={selected ? saved.includes(selected.id) : false} onSave={() => { if (selected) toggleSaved(selected.id); }} onClose={() => setSelected(null)} /></SiteLayout>;
}
