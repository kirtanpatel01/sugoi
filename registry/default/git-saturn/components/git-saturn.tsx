'use client'

import { cn } from '@/lib/utils'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { GitSaturnProps, GitSaturnRepo } from '@/registry/default/git-saturn/lib/git-saturn.types'
import { SaturnScene } from '@/registry/default/git-saturn/components/saturn-scene'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { Plus, Minus, RotateCcw } from 'lucide-react'

export default function GitSaturn({
  repos,
  username = 'developer',
  width = 720,
  height = 420,
  interactive = true,
  className,
  showUsername = true,
  showStats = true,
  showRepoDetails = true,
  enableControls = true,
}: GitSaturnProps) {
  const [focusState, setFocusState] = React.useState<{ repo: GitSaturnRepo | null; locked: boolean }>({
    repo: null,
    locked: false,
  })
  const [zoom, setZoom] = React.useState(1)
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
    <div 
      className={cn('w-(--git-saturn-width) h-(--git-saturn-height)', className)}
      style={{ 
        '--git-saturn-width': `${width}px`, 
        '--git-saturn-height': `${height}px` 
      } as React.CSSProperties}
    >
      <div
        className="relative w-full h-full overflow-hidden rounded-2xl border bg-linear-to-b from-slate-950 to-slate-900"
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
            zoom={zoom}
          />
        </Canvas>

        {enableControls && (
          <ButtonGroup className="absolute bottom-4 right-4 z-10" orientation="vertical">
            <Button 
              variant="secondary" 
              size="icon-xs" 
              onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} 
              title="Zoom In"
            >
              <Plus />
            </Button>
            <Button 
              variant="secondary" 
              size="icon-xs" 
              onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.2))} 
              title="Zoom Out"
            >
              <Minus />
            </Button>
            <Button 
              variant="secondary" 
              size="icon-xs" 
              onClick={() => setZoom(1)} 
              title="Reset Zoom"
            >
              <RotateCcw />
            </Button>
          </ButtonGroup>
        )}

        {showUsername && (
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border bg-background/85 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
            {username}
          </div>
        )}

        {showStats && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border bg-background/85 px-3 py-1 text-xs font-medium shadow-sm backdrop-blur">
            {totalCommits.toLocaleString()} commits / {repoCount} repos
          </div>
        )}

        {showRepoDetails && focusedRepo ? (
          <div className="cursor-pointer absolute right-4 top-4 rounded-2xl border bg-background/90 px-3 py-2 text-left shadow-sm backdrop-blur">
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
