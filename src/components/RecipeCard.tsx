'use client'

import { ArrowRight, Clock3, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { recipeSlug, type Recipe } from "@/lib/recipes";

export function RecipeCard({
  recipe,
  saved,
  onSave,
}: {
  recipe: Recipe;
  saved: boolean;
  onSave: () => void;
  onOpen?: () => void;
}) {
  const href = `/recipe/${recipeSlug(recipe)}`;

  return (
    <article data-reveal className="group min-w-0">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link href={href} aria-label={`View ${recipe.title}`} className="block h-full">
          <img
            src={recipe.image}
            loading="lazy"
            width={1024}
            height={1280}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 rounded-full"
          aria-label={saved ? `Remove ${recipe.title} from saved` : `Save ${recipe.title}`}
          onClick={onSave}
        >
          <Heart className={saved ? "fill-rose text-rose" : ""} />
        </Button>
      </div>

      <div className="pt-5">
        <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground mb-3 font-semibold uppercase">
          <span className="text-primary">{recipe.category}</span>
          <span className="flex items-center gap-1">
            <Clock3 size={13} />
            {recipe.time}
          </span>
        </div>

        <h3 className="font-display font-bold text-[24px] leading-[1.2] text-chocolate">
          <Link href={href} className="hover:text-rose transition-colors">
            {recipe.title}
          </Link>
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mt-3">
          {recipe.description}
        </p>

        <Link
          href={href}
          className="inline-flex items-center mt-4 text-sm font-bold text-primary gap-2 hover:text-rose transition-colors"
        >
          View recipe <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}