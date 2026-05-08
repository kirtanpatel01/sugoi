import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="relative h-[calc(100vh-4rem)] flex items-center justify-center">
      {/* Fixed background gradient orbs and grid */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="fixed -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="fixed -bottom-40 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div
          className="fixed inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto px-6 py-20 text-center space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 text-sm">
          <Sparkles className="size-4" />
          <span>Sugoi UI Components</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold">
            Build beautiful
            <span className="text-primary"> Interfaces</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            A handcrafted component library.
          </p>
        </div>
      </div>
    </main>
  )
}
