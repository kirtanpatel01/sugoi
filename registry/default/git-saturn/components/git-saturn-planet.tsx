'use client'

import React from 'react'
import * as THREE from 'three'

function makeSaturnTextures() {
  const width = 1024
  const height = 512

  const colorCanvas = document.createElement('canvas')
  colorCanvas.width = width
  colorCanvas.height = height
  const colorCtx = colorCanvas.getContext('2d')

  const bumpCanvas = document.createElement('canvas')
  bumpCanvas.width = width
  bumpCanvas.height = height
  const bumpCtx = bumpCanvas.getContext('2d')

  if (!colorCtx || !bumpCtx) {
    return null
  }

  const colorGradient = colorCtx.createLinearGradient(0, 0, 0, height)
  colorGradient.addColorStop(0, '#d5cfb4')
  colorGradient.addColorStop(0.18, '#c9c29f')
  colorGradient.addColorStop(0.35, '#bcae85')
  colorGradient.addColorStop(0.52, '#d2c59f')
  colorGradient.addColorStop(0.68, '#b59f79')
  colorGradient.addColorStop(0.84, '#c8b690')
  colorGradient.addColorStop(1, '#a8926f')
  colorCtx.fillStyle = colorGradient
  colorCtx.fillRect(0, 0, width, height)

  bumpCtx.fillStyle = '#7f7f7f'
  bumpCtx.fillRect(0, 0, width, height)

  for (let i = 0; i < 120; i += 1) {
    const y = (i / 120) * height
    const stripeHeight = 2 + Math.random() * 8
    const alpha = 0.04 + Math.random() * 0.1
    const lightBand = Math.random() > 0.45

    colorCtx.fillStyle = lightBand
      ? `rgba(244, 228, 179, ${alpha})`
      : `rgba(162, 142, 108, ${alpha})`
    colorCtx.fillRect(0, y, width, stripeHeight)

    bumpCtx.fillStyle = lightBand
      ? `rgba(172, 172, 172, ${alpha})`
      : `rgba(118, 118, 118, ${alpha})`
    bumpCtx.fillRect(0, y, width, stripeHeight)
  }

  for (let i = 0; i < 18; i += 1) {
    const cx = Math.random() * width
    const cy = Math.random() * height
    const radius = 18 + Math.random() * 56

    colorCtx.fillStyle = `rgba(168, 146, 110, ${0.04 + Math.random() * 0.05})`
    colorCtx.beginPath()
    colorCtx.ellipse(cx, cy, radius, radius * 0.42, Math.random() * Math.PI, 0, Math.PI * 2)
    colorCtx.fill()

    bumpCtx.fillStyle = `rgba(122, 122, 122, ${0.05 + Math.random() * 0.06})`
    bumpCtx.beginPath()
    bumpCtx.ellipse(cx, cy, radius * 0.9, radius * 0.4, Math.random() * Math.PI, 0, Math.PI * 2)
    bumpCtx.fill()
  }

  const colorMap = new THREE.CanvasTexture(colorCanvas)
  colorMap.wrapS = THREE.RepeatWrapping
  colorMap.wrapT = THREE.ClampToEdgeWrapping
  colorMap.anisotropy = 8

  const bumpMap = new THREE.CanvasTexture(bumpCanvas)
  bumpMap.wrapS = THREE.RepeatWrapping
  bumpMap.wrapT = THREE.ClampToEdgeWrapping
  bumpMap.anisotropy = 8

  return { colorMap, bumpMap }
}

export function SaturnPlanet({ radius }: { radius: number }) {
  const textures = React.useMemo(() => makeSaturnTextures(), [])

  React.useEffect(() => {
    return () => {
      textures?.colorMap.dispose()
      textures?.bumpMap.dispose()
    }
  }, [textures])

  return (
    <mesh>
      <sphereGeometry args={[radius, 128, 128]} />
      <meshStandardMaterial
        map={textures?.colorMap}
        bumpMap={textures?.bumpMap}
        bumpScale={radius * 0.04}
        roughness={0.82}
        metalness={0.03}
      />
    </mesh>
  )
}
