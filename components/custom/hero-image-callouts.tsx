'use client'

import { cn } from '@/lib/utils';
import { motion, useAnimationFrame } from 'motion/react';
import React from 'react'

type NodeAnimationDirection = 'up-right' | 'up-left' | 'down-right' | 'down-left';

type NodeAnimation = {
  speed?: number;
  direction?: NodeAnimationDirection;
  bounce?: boolean;
};

export type HeroSectionNode = {
  position: { top: number; left: number };
  content: React.ReactNode;
  isDraggable?: boolean
  isAnimated?: boolean
  animate?: NodeAnimation;
};

type HeroImageCalloutsProps = {
  image: {
    src: string;
    alt: string;
    height?: number;
    width?: number;
    classNmame?: string;
  };
  nodes?: HeroSectionNode[];
  className?: string;
};

type NodePosition = HeroSectionNode['position'];

type NodeVelocity = {
  x: number;
  y: number;
};

type DragState = {
  index: number;
  pointerId: number;
  startX: number;
  startY: number;
  startPosition: NodePosition;
};

const DIRECTION_VECTOR: Record<NodeAnimationDirection, NodeVelocity> = {
  'up-right': { x: 1, y: -1 },
  'up-left': { x: -1, y: -1 },
  'down-right': { x: 1, y: 1 },
  'down-left': { x: -1, y: 1 },
};

function getAnimationConfig(node: HeroSectionNode): Required<NodeAnimation> | null {
  if (!node.animate && !node.isAnimated) {
    return null;
  }

  return {
    speed: node.animate?.speed ?? 10,
    direction: node.animate?.direction ?? 'down-right',
    bounce: node.animate?.bounce ?? true,
  };
}

export default function HeroImageCallouts({
  image: {
    src,
    alt,
    height,
    width,
    classNmame,
  },
  nodes = [],
  className,
}: HeroImageCalloutsProps) {
  const [positions, setPositions] = React.useState<NodePosition[]>(() => nodes.map((node) => node.position))
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const nodeRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const dragStateRef = React.useRef<DragState | null>(null)
  const velocitiesRef = React.useRef<NodeVelocity[]>([])
  const hasAnimatedNodes = React.useMemo(() => nodes.some((node) => getAnimationConfig(node)), [nodes])

  React.useEffect(() => {
    setPositions(nodes.map((node) => node.position))
    velocitiesRef.current = nodes.map((node, index) => {
      const animation = getAnimationConfig(node)

      if (!animation) {
        return velocitiesRef.current[index] ?? { x: 0, y: 0 }
      }

      const existingVelocity = velocitiesRef.current[index]
      if (existingVelocity && (existingVelocity.x !== 0 || existingVelocity.y !== 0)) {
        return existingVelocity
      }

      return DIRECTION_VECTOR[animation.direction]
    })
  }, [nodes])

  const imageStyle: React.CSSProperties = {
    ...(height ? { height: `${height}px` } : {}),
    ...(width ? { width: `${width}px` } : {}),
  }

  const updatePositionFromPointer = React.useCallback((event: PointerEvent) => {
    const dragState = dragStateRef.current
    const container = containerRef.current

    if (!dragState || !container) {
      return
    }

    const rect = container.getBoundingClientRect()
    const deltaX = event.clientX - dragState.startX
    const deltaY = event.clientY - dragState.startY

    const nextLeft = dragState.startPosition.left + (deltaX / rect.width) * 100
    const nextTop = dragState.startPosition.top + (deltaY / rect.height) * 100

    setPositions((currentPositions) =>
      currentPositions.map((position, index) =>
        index === dragState.index
          ? { top: nextTop, left: nextLeft }
          : position
      )
    )
  }, [])

  React.useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (dragStateRef.current?.pointerId !== event.pointerId) {
        return
      }

      updatePositionFromPointer(event)
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (dragStateRef.current?.pointerId !== event.pointerId) {
        return
      }

      dragStateRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [updatePositionFromPointer])

  useAnimationFrame((_, delta) => {
    if (!hasAnimatedNodes) {
      return
    }

    const container = containerRef.current
    if (!container) {
      return
    }

    const containerRect = container.getBoundingClientRect()

    setPositions((currentPositions) => {
      let didUpdate = false

      const nextPositions = currentPositions.map((position, index) => {
        const node = nodes[index]
        const activeDrag = dragStateRef.current
        const animation = node ? getAnimationConfig(node) : null

        if (!animation || activeDrag?.index === index) {
          return position
        }

        const nodeElement = nodeRefs.current[index]
        if (!nodeElement) {
          return position
        }

        const nodeRect = nodeElement.getBoundingClientRect()
        const nodeWidthPercent = (nodeRect.width / containerRect.width) * 100
        const nodeHeightPercent = (nodeRect.height / containerRect.height) * 100
        const velocity = velocitiesRef.current[index] ?? { x: 1, y: 1 }
        const travel = (delta / 1000) * Math.max(animation.speed, 0)

        let nextLeft = position.left + velocity.x * travel
        let nextTop = position.top + velocity.y * travel

        const minLeft = nodeWidthPercent / 2
        const maxLeft = 100 - nodeWidthPercent / 2
        const minTop = nodeHeightPercent / 2
        const maxTop = 100 - nodeHeightPercent / 2

        let nextVelocityX = velocity.x
        let nextVelocityY = velocity.y

        if (nextLeft < minLeft) {
          nextLeft = minLeft
          nextVelocityX = animation.bounce ? Math.abs(nextVelocityX) : 0
        } else if (nextLeft > maxLeft) {
          nextLeft = maxLeft
          nextVelocityX = animation.bounce ? -Math.abs(nextVelocityX) : 0
        }

        if (nextTop < minTop) {
          nextTop = minTop
          nextVelocityY = animation.bounce ? Math.abs(nextVelocityY) : 0
        } else if (nextTop > maxTop) {
          nextTop = maxTop
          nextVelocityY = animation.bounce ? -Math.abs(nextVelocityY) : 0
        }

        velocitiesRef.current[index] = {
          x: nextVelocityX,
          y: nextVelocityY,
        }

        if (nextLeft !== position.left || nextTop !== position.top) {
          didUpdate = true
        }

        return {
          left: nextLeft,
          top: nextTop,
        }
      })

      return didUpdate ? nextPositions : currentPositions
    })
  })

  return (
    <div ref={containerRef} className={cn("relative block w-fit max-w-full overflow-visible", className)}>
      <img 
        src={src} 
        alt={alt} 
        className={cn("block h-auto max-w-full", classNmame)}
        style={imageStyle}
      />

      {nodes.map((node, index) => (
        <motion.div
          key={`${node.position.top}-${node.position.left}`}
          className={cn(
            "absolute -translate-x-1/2 -translate-y-1/2 z-10",
            node.isDraggable && "cursor-grab active:cursor-grabbing touch-none"
          )}
          style={{ top: `${positions[index]?.top ?? node.position.top}%`, left: `${positions[index]?.left ?? node.position.left}%` }}
          transition={{ type: 'tween', ease: 'linear', duration: getAnimationConfig(node) ? 0 : 0.12 }}
          ref={(element) => {
            nodeRefs.current[index] = element
          }}
          onPointerDown={
            node.isDraggable
              ? (event) => {
                  event.currentTarget.setPointerCapture(event.pointerId)
                  dragStateRef.current = {
                    index,
                    pointerId: event.pointerId,
                    startX: event.clientX,
                    startY: event.clientY,
                    startPosition: positions[index] ?? node.position,
                  }
                }
              : undefined
          }
        >
          {node.content}
        </motion.div>
      ))}
    </div>
  )
}
