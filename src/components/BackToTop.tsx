import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const on = () => setShow(window.scrollY > 600); on(); window.addEventListener("scroll", on, { passive: true }); return () => window.removeEventListener("scroll", on); }, []);
  return <Button type="button" size="icon" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`no-print back-to-top fixed bottom-6 right-6 z-40 size-12 rounded-full shadow-lg transition-all duration-300 hover:-translate-y-1 ${show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"}`}><ArrowUp size={20} /></Button>;
}
