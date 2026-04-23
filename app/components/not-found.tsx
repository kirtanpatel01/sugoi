import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ComponentsNotFound() {
  return (
    <div className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Component Not Found</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          This component page does not exist in the current library.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/components">Back to Components</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
