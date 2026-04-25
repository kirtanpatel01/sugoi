'use client'

import { useFrame } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'

type StarData = {
  position: [number, number, number]
  size: number
  twinkleSpeed: number
  twinklePhase: number
  baseOpacity: number
  spikeScale: number
}

function createStarData(count: number): StarData[] {
  return Array.from({ length: count }, () => {
    const radius = 8 + Math.random() * 20
    const theta = Math.acos(1 - 2 * Math.random())
    const phi = Math.random() * Math.PI * 2
    const x = radius * Math.sin(theta) * Math.cos(phi)
    const y = radius * Math.cos(theta)
    const z = radius * Math.sin(theta) * Math.sin(phi)
    const size = 0.004 + Math.random() * 0.02

    return {
      position: [x, y, z],
      size,
      twinkleSpeed: 0.6 + Math.random() * 2.4,
      twinklePhase: Math.random() * Math.PI * 2,
      baseOpacity: 0.26 + Math.random() * 0.62,
      spikeScale: 2 + Math.random() * 3.8,
    }
  })
}

function TwinklingStar({ data }: { data: StarData }) {
  const coreRef = React.useRef<THREE.Mesh>(null)
  const spikeARef = React.useRef<THREE.Mesh>(null)
  const spikeBRef = React.useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const pulse = (Math.sin(t * data.twinkleSpeed + data.twinklePhase) + 1) * 0.5
    const shimmer = 0.75 + pulse * 0.45
    const opacity = data.baseOpacity * (0.55 + pulse * 0.65)

    if (coreRef.current) {
      coreRef.current.scale.setScalar(shimmer)
      ;(coreRef.current.material as THREE.MeshBasicMaterial).opacity = opacity
    }

    if (spikeARef.current) {
      spikeARef.current.scale.set(1 + pulse * 0.8, data.spikeScale + pulse * 0.5, 1)
      ;(spikeARef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.65
    }

    if (spikeBRef.current) {
      spikeBRef.current.scale.set(1 + pulse * 0.8, data.spikeScale * 0.85 + pulse * 0.45, 1)
      ;(spikeBRef.current.material as THREE.MeshBasicMaterial).opacity = opacity * 0.55
    }
  })

  return (
    <group position={data.position}>
      <mesh ref={spikeARef}>
        <planeGeometry args={[data.size * 0.22, data.size * 2.8]} />
        <meshBasicMaterial color="#f8fafc" transparent opacity={0.25} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={spikeBRef} rotation={[0, 0, Math.PI / 2]}>
        <planeGeometry args={[data.size * 0.22, data.size * 2.3]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.2} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[data.size, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  )
}

function ShootingStars({ count = 4 }: { count?: number }) {
  const refs = React.useRef<(THREE.Mesh | null)[]>([])
  const states = React.useRef(
    Array.from({ length: count }, () => ({
      active: false,
      delay: 0.8 + Math.random() * 5,
      life: 0,
      lifeMax: 0,
      velocity: new THREE.Vector3(),
    }))
  )

  useFrame((_, delta) => {
    for (let i = 0; i < count; i += 1) {
      const mesh = refs.current[i]
      const state = states.current[i]
      if (!mesh) continue

      if (!state.active) {
        state.delay -= delta
        mesh.visible = false

        if (state.delay <= 0) {
          state.active = true
          state.life = 0
          state.lifeMax = 0.6 + Math.random() * 1.2
          state.delay = 2 + Math.random() * 7
          mesh.visible = true

          mesh.position.set((Math.random() - 0.5) * 28, 3 + Math.random() * 8, -6 - Math.random() * 16)

          state.velocity.set(-(3.5 + Math.random() * 3), -(0.6 + Math.random() * 1.8), -0.2 - Math.random() * 0.8)
        }

        continue
      }

      state.life += delta
      if (state.life >= state.lifeMax) {
        state.active = false
        mesh.visible = false
        continue
      }

      mesh.position.addScaledVector(state.velocity, delta)
      const progress = state.life / state.lifeMax
      const opacity = Math.max(0, 1 - progress)
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.75
      mesh.scale.set(1 + progress * 2.8, 1, 1)
    }
  })

  return (
    <group>
      {Array.from({ length: count }).map((_, index) => (
        <mesh
          key={index}
          ref={(element) => {
            refs.current[index] = element
          }}
          visible={false}
        >
          <planeGeometry args={[0.08, 0.012]} />
          <meshBasicMaterial color="#f8fafc" transparent opacity={0} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

export function StarField() {
  const stars = React.useMemo(() => createStarData(320), [])

  return (
    <group>
      {stars.map((star, index) => (
        <TwinklingStar key={index} data={star} />
      ))}
      <ShootingStars count={5} />
    </group>
  )
}
