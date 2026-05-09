import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HeroSectionNode, NodeAnimation, NodeAnimationDirection, NodeVelocity } from './hero-image-callouts.types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DIRECTION_VECTOR: Record<NodeAnimationDirection, NodeVelocity> = {
  'up-right': { x: 1, y: -1 },
  'up-left': { x: -1, y: -1 },
  'down-right': { x: 1, y: 1 },
  'down-left': { x: -1, y: 1 },
}

export function getAnimationConfig(node: HeroSectionNode): Required<NodeAnimation> | null {
  if (!node.animate && !node.isAnimated) {
    return null
  }

  return {
    speed: node.animate?.speed ?? 10,
    direction: node.animate?.direction ?? 'down-right',
    bounce: node.animate?.bounce ?? true,
  }
}