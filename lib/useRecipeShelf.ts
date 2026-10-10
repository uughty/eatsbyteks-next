import { useState } from "react";
import type { Recipe } from '@/lib/recipes'
export function useRecipeShelf() {
  const [saved, setSaved] = useState<number[]>([]);
  const [selected, setSelected] = useState<Recipe | null>(null);
  const toggleSaved = (id: number) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return { saved, selected, setSelected, toggleSaved };
}
