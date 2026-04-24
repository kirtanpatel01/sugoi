import { cn } from '@/lib/utils';
import React from 'react'

type HeroSectionNode = {
  position: { top: number; left: number };
  content: React.ReactNode;
};

function HeroSectionIMG({
  image: {
    src,
    alt,
    height,
    width,
    classNmame,
  },
  nodes = [],
  className,
}: {
  image: {
    src: string;
    alt: string;
    height?: number;
    width?: number;
    classNmame?: string;
  },
  nodes?: HeroSectionNode[];
  className?: string;
}) {

  const imageStyle: React.CSSProperties = {
    ...(height ? { height: `${height}px` } : {}),
    ...(width ? { width: `${width}px` } : {}),
  }

  return (
    <div className={cn("relative block w-fit max-w-full overflow-visible", className)}>
      <img 
        src={src} 
        alt={alt} 
        className={cn("block h-auto max-w-full", classNmame)}
        style={imageStyle}
      />

      {nodes.map((node) => (
        <div
          key={`${node.position.top}-${node.position.left}`}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ top: `${node.position.top}%`, left: `${node.position.left}%` }}
        >
          {node.content}
        </div>
      ))}
    </div>
  )
}

export default HeroSectionIMG