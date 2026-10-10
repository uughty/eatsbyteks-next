import { useEffect, useState } from "react";

export type ShoppingItem = { id: string; name: string; amount: string; recipe: string; done: boolean };
const KEY = "eatsbyteks-shopping-list";
const EVENT = "shopping-list-change";
const read = (): ShoppingItem[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  useEffect(() => { const sync = () => setItems(read()); sync(); window.addEventListener(EVENT, sync); window.addEventListener("storage", sync); return () => { window.removeEventListener(EVENT, sync); window.removeEventListener("storage", sync); }; }, []);
  const write = (next: ShoppingItem[]) => { localStorage.setItem(KEY, JSON.stringify(next)); window.dispatchEvent(new Event(EVENT)); };
  return {
    items,
    addMany: (recipe: string, list: { name: string; amount: string }[]) => { const cur = read().filter((i) => i.recipe !== recipe); write([...cur, ...list.map((l) => ({ id: `${recipe}-${l.name}`, name: l.name, amount: l.amount, recipe, done: false }))]); },
    addCustom: (name: string) => write([...read(), { id: `custom-${Date.now()}`, name, amount: "", recipe: "My extras", done: false }]),
    toggle: (id: string) => write(read().map((i) => (i.id === id ? { ...i, done: !i.done } : i))),
    remove: (id: string) => write(read().filter((i) => i.id !== id)),
    clearDone: () => write(read().filter((i) => !i.done)),
    clearAll: () => write([]),
  };
}
