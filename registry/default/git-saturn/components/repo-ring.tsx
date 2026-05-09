'use client'

import { Meteoroid } from '@/registry/default/git-saturn/components/git-meteoroid'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import type { GitSaturnRepo } from '@/registry/default/git-saturn/lib/git-saturn.types'

function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123
  return x - Math.floor(x)
}

function sizeFromCommits(commits: number, minCommits: number, maxCommits: number) {
  if (maxCommits <= minCommits) return 0.04
  const normalized = (commits - minCommits) / (maxCommits - minCommits)
  const curved = Math.pow(normalized, 0.72)
  return 0.02 + curved * 0.062
}

function getRepoPose(index: number, total: number, ringRadius: number, repoCommits: number) {
  const baseAngle = (index / Math.max(1, total)) * Math.PI * 2
  const radialOffset = (seeded(index * 1.71 + repoCommits * 0.19) - 0.5) * 0.06
  const verticalOffset = (seeded(index * 2.33 + repoCommits * 0.13) - 0.5) * 0.04

  return {
    baseAngle,
    radialOffset,
    verticalOffset,
    radius: ringRadius + radialOffset,
  }
}

function RingDust({ count, radius, spread }: { count: number; radius: number; spread: number }) {
  const pointsRef = React.useRef<THREE.Points>(null)
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2
      const localRadius = radius + (Math.random() - 0.5) * spread
      const x = Math.cos(angle) * localRadius
      const y = (Math.random() - 0.5) * 0.035
      const z = Math.sin(angle) * localRadius
      arr[i * 3] = x
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = z
    }
    return arr
  }, [count, radius, spread])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.008
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#cbd5e1"
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  )
}

function RepoRock({
  repo,
  index,
  total,
  ringRadius,
  minCommits,
  maxCommits,
  isFocused,
  focusLocked,
  onFocusRepo,
  onClearFocus,
}: {
  repo: GitSaturnRepo
  index: number
  total: number
  ringRadius: number
  minCommits: number
  maxCommits: number
  isFocused: boolean
  focusLocked: boolean
  onFocusRepo: (repo: GitSaturnRepo | null, locked?: boolean) => void
  onClearFocus: (repo: GitSaturnRepo) => void
}) {
  const meshRef = React.useRef<THREE.Mesh>(null)

  const cfg = React.useMemo(() => {
    const pose = getRepoPose(index, total, ringRadius, repo.commits)
    const spinX = 0.2 + seeded(index * 3.1) * 0.6
    const spinY = 0.25 + seeded(index * 4.3) * 0.7
    const jitterPhase = seeded(index * 5.7) * Math.PI * 2
    const jitterSpeed = 0.4 + seeded(index * 6.9) * 0.8
    return {
      ...pose,
      spinX,
      spinY,
      jitterPhase,
      jitterSpeed,
    }
  }, [index, repo.commits, ringRadius, total])

  const radius = React.useMemo(
    () => sizeFromCommits(repo.commits, minCommits, maxCommits),
    [repo.commits, minCommits, maxCommits]
  )

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const tinyJitter = Math.sin(t * cfg.jitterSpeed + cfg.jitterPhase) * 0.008

    const r = cfg.radius + tinyJitter
    const x = Math.cos(cfg.baseAngle) * r
    const y = cfg.verticalOffset + tinyJitter * 0.5
    const z = Math.sin(cfg.baseAngle) * r

    meshRef.current.position.set(x, y, z)
    meshRef.current.rotation.x += delta * cfg.spinX
    meshRef.current.rotation.y += delta * cfg.spinY

    const targetScale = isFocused ? 1.22 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12)
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(event) => {
        event.stopPropagation()
        onFocusRepo(repo, false)
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        if (!focusLocked) {
          onClearFocus(repo)
        }
      }}
      onClick={(event) => {
        event.stopPropagation()
        onFocusRepo(repo, true)
      }}
    >
      <Meteoroid radius={radius} seed={index * 13.31 + repo.commits * 0.17} />
    </mesh>
  )
}

function CommitBurst({
  repo,
  index,
  total,
  ringRadius,
  spinSpeed,
  minCommits,
  maxCommits,
}: {
  repo: GitSaturnRepo
  index: number
  total: number
  ringRadius: number
  spinSpeed: number
  minCommits: number
  maxCommits: number
}) {
  const burstRef = React.useRef<THREE.Mesh>(null)
  const stateRef = React.useRef({
    delay: 0.5 + seeded(index * 4.4) * 1.8,
    life: 0,
    lifeMax: 0.45,
    active: false,
    velocity: new THREE.Vector3(),
  })

  const normalized = maxCommits > minCommits ? (repo.commits - minCommits) / (maxCommits - minCommits) : 0
  const burstStrength = Math.max(0, normalized - 0.35)
  const burstEnabled = burstStrength > 0

  const pose = React.useMemo(() => getRepoPose(index, total, ringRadius, repo.commits), [index, repo.commits, ringRadius, total])

  useFrame((_, delta) => {
    const mesh = burstRef.current
    if (!mesh || !burstEnabled) return

    const state = stateRef.current
    const t = performance.now() * 0.001
    const angle = pose.baseAngle + t * spinSpeed
    const frontArc = Math.max(0, Math.sin(angle))

    if (!state.active) {
      state.delay -= delta
      mesh.visible = false

      if (state.delay <= 0 && frontArc > 0.35) {
        state.active = true
        state.life = 0
        state.lifeMax = 0.22 + burstStrength * 0.36
        state.delay = 0.9 + (1 - burstStrength) * 1.8 + seeded(index * 8.1) * 0.8
        mesh.visible = true

        const tangentX = -Math.sin(angle)
        const tangentZ = Math.cos(angle)
        const baseRadius = pose.radius + 0.04
        mesh.position.set(
          Math.cos(angle) * baseRadius + tangentX * 0.045,
          pose.verticalOffset + Math.sin(t * 2.1 + index) * 0.01,
          Math.sin(angle) * baseRadius + tangentZ * 0.045
        )

        state.velocity.set(tangentX * (0.12 + burstStrength * 0.16), 0.01 + burstStrength * 0.015, tangentZ * (0.12 + burstStrength * 0.16))
      }

      return
    }

    state.life += delta
    if (state.life >= state.lifeMax) {
      state.active = false
      mesh.visible = false
      return
    }

    mesh.position.addScaledVector(state.velocity, delta)
    const progress = state.life / state.lifeMax
    const opacity = Math.max(0, (1 - progress) * burstStrength * 0.85)
    mesh.scale.setScalar(0.7 + progress * 1.5)
    ;(mesh.material as THREE.MeshBasicMaterial).opacity = opacity
  })

  if (!burstEnabled) return null

  return (
    <mesh ref={burstRef} visible={false}>
      <sphereGeometry args={[0.012 + burstStrength * 0.01, 8, 8]} />
      <meshBasicMaterial color="#f8fafc" transparent opacity={0} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}

export function RepoRing({
  repos,
  ringRadius,
  spinSpeed,
  focusedRepo,
  focusLocked,
  onFocusRepo,
  onClearFocus,
}: {
  repos: GitSaturnRepo[]
  ringRadius: number
  spinSpeed: number
  focusedRepo: GitSaturnRepo | null
  focusLocked: boolean
  onFocusRepo: (repo: GitSaturnRepo | null, locked?: boolean) => void
  onClearFocus: (repo: GitSaturnRepo) => void
}) {
  const minCommits = repos.reduce((min, repo) => Math.min(min, repo.commits), Number.POSITIVE_INFINITY)
  const maxCommits = repos.reduce((max, repo) => Math.max(max, repo.commits), 0)

  return (
    <group>
      <RingDust count={100} radius={ringRadius} spread={0.14} />
      {repos.map((repo, index) => (
        <RepoRock
          key={repo.name}
          repo={repo}
          index={index}
          total={repos.length}
          ringRadius={ringRadius}
          minCommits={minCommits}
          maxCommits={maxCommits}
          isFocused={focusedRepo?.name === repo.name}
          focusLocked={focusLocked}
          onFocusRepo={onFocusRepo}
          onClearFocus={onClearFocus}
        />
      ))}
      {repos.map((repo, index) => (
        <CommitBurst
          key={`${repo.name}-burst`}
          repo={repo}
          index={index}
          total={repos.length}
          ringRadius={ringRadius}
          spinSpeed={spinSpeed}
          minCommits={minCommits}
          maxCommits={maxCommits}
        />
      ))}
    </group>
  )
}
