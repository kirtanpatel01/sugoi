'use client'

import React from 'react'
import * as THREE from 'three'

function seeded(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function buildMeteoroidGeometry(radius: number, seed: number) {
  const geometry = new THREE.IcosahedronGeometry(radius, 5)
  const position = geometry.attributes.position
  const vertex = new THREE.Vector3()

  const craterCenters = Array.from({ length: 7 }, (_, index) => {
    const s = seed + index * 17.13
    const theta = seeded(s) * Math.PI * 2
    const phi = Math.acos(2 * seeded(s + 5.21) - 1)

    return {
      center: new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      ),
      size: 0.28 + seeded(s + 9.07) * 0.2,
      depth: 0.06 + seeded(s + 11.9) * 0.08,
    }
  })

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i)
    const normal = vertex.clone().normalize()

    const noise = (
      Math.sin((normal.x + seed * 0.37) * 8.1) +
      Math.sin((normal.y - seed * 0.21) * 9.4) +
      Math.sin((normal.z + seed * 0.11) * 7.7)
    ) / 3

    let displacement = 1 + noise * 0.2

    for (const crater of craterCenters) {
      const distance = normal.distanceTo(crater.center)
      if (distance < crater.size) {
        const influence = 1 - distance / crater.size
        displacement -= influence * crater.depth
      }
    }

    vertex.copy(normal.multiplyScalar(radius * displacement))
    position.setXYZ(i, vertex.x, vertex.y, vertex.z)
  }

  geometry.computeVertexNormals()
  return geometry
}

export function Meteoroid({
  radius,
  seed,
}: {
  radius: number
  seed: number
}) {
  const geometry = React.useMemo(() => buildMeteoroidGeometry(radius, seed), [radius, seed])

  React.useEffect(() => {
    return () => {
      geometry.dispose()
    }
  }, [geometry])

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color="#9ca3af"
        roughness={0.92}
        metalness={0.04}
      />
    </mesh>
  )
}
