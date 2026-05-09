'use client'

import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'
import { SaturnPlanet } from '@/registry/default/git-saturn/components/git-saturn-planet'
import { RepoRing } from '@/registry/default/git-saturn/components/repo-ring'
import { useThree } from '@react-three/fiber'
import { GitSaturnRepo } from '@/registry/default/git-saturn/lib/git-saturn.types'
import { StarField } from '@/registry/default/git-saturn/components/star-field'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function SaturnScene({
  repos,
  interactive,
  focusedRepo,
  focusLocked,
  onFocusRepo,
  onClearFocus,
  zoom = 1,
}: {
  repos: GitSaturnRepo[]
  interactive: boolean
  focusedRepo: GitSaturnRepo | null
  focusLocked: boolean
  onFocusRepo: (repo: GitSaturnRepo | null, locked?: boolean) => void
  onClearFocus: (repo: GitSaturnRepo) => void
  zoom?: number
}) {
  const systemRef = React.useRef<THREE.Group>(null)
  const controlsRef = React.useRef<any>(null)
  const { camera } = useThree()
  
  React.useEffect(() => {
    if (controlsRef.current) {
      const currentPos = camera.position.clone()
      const target = controlsRef.current.target.clone()
      const direction = currentPos.sub(target).normalize()
      const baseDistance = 6.35
      const targetDistance = baseDistance / zoom
      
      const newPos = target.add(direction.multiplyScalar(targetDistance))
      camera.position.copy(newPos)
      controlsRef.current.update()
    }
  }, [zoom, camera])

  const repoCount = repos.length
  const ringRadius = 1.95 + clamp(repoCount * 0.02, 0, 0.8)
  const spinSpeed = 0.08 + repoCount * 0.003
  const shouldPauseSpin = focusedRepo !== null && !focusLocked

  useFrame(({ clock }, delta) => {
    if (!systemRef.current) return

    const elapsed = clock.getElapsedTime()
    if (interactive && elapsed < 4) {
      const progress = elapsed / 4
      const eased = progress * progress * (3 - 2 * progress)
      const orbitAngle = 0.25 + eased * 1.5
      const orbitRadius = 7.7 - eased * 1.35
      const cameraHeight = 1.65 + Math.sin(eased * Math.PI) * 0.35

      camera.position.set(
        Math.cos(orbitAngle) * orbitRadius,
        cameraHeight,
        Math.sin(orbitAngle) * orbitRadius
      )
      camera.lookAt(0, 0.1, 0)
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0.1, 0)
        controlsRef.current.update()
        controlsRef.current.enabled = false
      }
    } else if (controlsRef.current) {
      controlsRef.current.target.set(0, 0.1, 0)
      controlsRef.current.enabled = interactive
      controlsRef.current.update()
    }

    if (!shouldPauseSpin) {
      systemRef.current.rotation.y += delta * spinSpeed
    }
  })

  return (
    <>
      <StarField />
      <ambientLight intensity={0.44} />
      <directionalLight position={[3, 2, 4]} intensity={1.15} />
      <pointLight position={[-3, -1.5, -2]} intensity={0.45} color="#93c5fd" />
      <pointLight position={[0, 3, 1]} intensity={0.18} color="#67e8f9" />

      <group ref={systemRef} rotation={[THREE.MathUtils.degToRad(-18), THREE.MathUtils.degToRad(24), 0]}>
        <SaturnPlanet radius={1.22} />
        <RepoRing
          repos={repos}
          ringRadius={ringRadius}
          spinSpeed={spinSpeed}
          focusedRepo={focusedRepo}
          focusLocked={focusLocked}
          onFocusRepo={onFocusRepo}
          onClearFocus={onClearFocus}
        />
      </group>

      {interactive ? (
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom
          enableDamping
          dampingFactor={0.08}
          minDistance={3.1}
          maxDistance={8.5}
        />
      ) : null}
    </>
  )
}
