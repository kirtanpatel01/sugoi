'use client'

import { cn } from '@/lib/utils'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { SaturnScene } from './saturn-scene'
import type { GitSaturnProps, GitSaturnRepo } from './types'

export type { GitSaturnRepo, GitSaturnProps } from './types'

export default function GitSaturn({
  repos,
  username = 'developer',
  width = 720,
  height = 420,
  interactive = true,
  className,
}: GitSaturnProps) {
  const [focusState, setFocusState] = React.useState<{ repo: GitSaturnRepo | null; locked: boolean }>({
    repo: null,
    locked: false,
  })
  const repoCount = repos.length
  const totalCommits = repos.reduce((sum, repo) => sum + repo.commits, 0)

  const focusedRepo = focusState.repo

  function formatStars(repo: GitSaturnRepo) {
    return repo.stars ?? Math.max(18, Math.round(repo.commits * 1.35 + (repo.name.length % 9) * 11))
  }

  function formatLastActivity(repo: GitSaturnRepo) {
    if (repo.lastActivity) return repo.lastActivity

    const recency = Math.max(1, Math.round(180 / Math.max(18, repo.commits / 2)))
    return `${recency} days ago`
  }

  return (
    <div className={cn('w-fit', className)}>
      <div
        className="relative overflow-hidden rounded-2xl border bg-linear-to-b from-slate-950 to-slate-900"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 48 }}
          onPointerMissed={() => setFocusState({ repo: null, locked: false })}
        >
          <SaturnScene
            repos={repos}
            interactive={interactive}
            focusedRepo={focusedRepo}
            focusLocked={focusState.locked}
            onFocusRepo={(repo, locked = false) => setFocusState({ repo, locked })}
            onClearFocus={(repo) => {
              if (!focusState.locked && focusState.repo?.name === repo.name) {
                setFocusState({ repo: null, locked: false })
              }
            }}
          />
        </Canvas>

        <div className="pointer-events-none absolute left-4 top-4 rounded-full border bg-background/85 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
          {username} · {repoCount} repos
        </div>

        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border bg-background/85 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
          {totalCommits.toLocaleString()} commits across {repoCount} repositories
        </div>

        {focusedRepo ? (
          <div className="pointer-events-none absolute right-4 top-4 rounded-2xl border bg-background/90 px-3 py-2 text-left shadow-sm backdrop-blur">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {focusState.locked ? 'Pinned repo' : 'Focused repo'}
            </div>
            <div className="mt-1 text-sm font-medium">{focusedRepo.name}</div>
            <div className="text-xs text-muted-foreground">{focusedRepo.commits.toLocaleString()} commits</div>
            <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
              <div>{formatStars(focusedRepo).toLocaleString()} stars</div>
              <div>Last activity {formatLastActivity(focusedRepo)}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
