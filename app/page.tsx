import Link from "next/link"
import { ArrowRight, Sparkles, WandSparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

const features = [
  {
    title: "Kanso Minimal",
    subtitle: "Simple surfaces, sharp hierarchy, no noise.",
  },
  {
    title: "Wabi-Sabi Tone",
    subtitle: "Subtle imperfection with warm, balanced contrast.",
  },
  {
    title: "Matsuri Motion",
    subtitle: "Intentional transitions that feel alive, not busy.",
  },
]

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-secondary/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <section className="mx-auto flex min-h-[calc(100svh-64px)] w-full max-w-6xl flex-col justify-center gap-12 px-6 py-14">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 text-xs tracking-[0.25em] uppercase">
            <Sparkles className="size-3.5" />
            Sugoi UI
          </p>

          <div className="space-y-3">
            <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Build interfaces with modern components and a
              <span className="block text-primary">Japanese design soul.</span>
            </h1>
            <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              A handcrafted UI library inspired by Tokyo night signs, calm Zen layouts, and clean developer ergonomics.
              Fast to integrate. Beautiful by default.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/components" className="group">
                Explore components
                <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Read design philosophy</Link>
            </Button>
          </div>

          <p className="font-mono text-xs text-muted-foreground">
            侘寂 (wabi-sabi) • 余白 (yohaku) • 祭り (matsuri)
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-1"
            >
              <h2 className="text-lg font-medium tracking-tight">{feature.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.subtitle}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-background/90 p-5">
          <div>
            <p className="text-sm text-muted-foreground">Ready to ship your first screen?</p>
            <p className="text-lg font-medium tracking-tight">Install components and start crafting.</p>
          </div>
          <Button asChild variant="secondary" size="lg">
            <Link href="/components" className="inline-flex items-center gap-2">
              <WandSparkles className="size-4" />
              Open component gallery
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
