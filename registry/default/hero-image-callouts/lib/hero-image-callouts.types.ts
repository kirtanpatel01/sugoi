export type NodeAnimationDirection = 'up-right' | 'up-left' | 'down-right' | 'down-left'

export type NodeAnimation = {
  speed?: number
  direction?: NodeAnimationDirection
  bounce?: boolean
}

export type HeroSectionNode = {
  position: { top: number; left: number }
  content: React.ReactNode
  isDraggable?: boolean
  isAnimated?: boolean
  animate?: NodeAnimation
}

export type HeroImageCalloutsProps = {
  image: {
    src: string
    alt: string
    height?: number
    width?: number
    classNmame?: string
  }
  nodes?: HeroSectionNode[]
  className?: string
}

export type NodePosition = HeroSectionNode['position']

export type NodeVelocity = {
  x: number
  y: number
}

export type DragState = {
  index: number
  pointerId: number
  startX: number
  startY: number
  startPosition: NodePosition
}