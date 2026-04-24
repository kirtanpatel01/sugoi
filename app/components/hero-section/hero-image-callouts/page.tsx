import HeroImageCallouts from '@/components/custom/hero-image-callouts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { animatedNodes, combinedNodes, draggableNodes, nodes } from './data'

function page() {
  return (
    <div className='p-4 space-y-6'>
      <header>
        <Breadcrumb className='bg-secondary/20 rounded-full w-fit border p-2'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components/hero-section">Hero Section</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Hero Image Callouts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className="space-y-6">
        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Hero Image Callouts - Fixed Position Variant
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              A structured hero layout where each callout is intentionally anchored to a predefined coordinate. This variant is ideal for curated marketing visuals, feature storytelling, and repeatable design demos.
            </p>
          </div>

          <HeroImageCallouts
            image={{
              src: "https://i.pinimg.com/1200x/c8/16/1b/c8161b685b3848fe8804be950ddbd02b.jpg",
              alt: "Hero Image",
              width: 400,
              classNmame: "rounded-2xl"
            }}
            nodes={nodes}
            className="mx-auto"
          />
        </section>

        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Hero Image Callouts - Draggable Variant
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              In this variant the nodes can be dragged and dropped wherever you want. Pass <code>isDraggable</code> as true for any node you want to move.
            </p>
          </div>

          <HeroImageCallouts
            image={{
              src: "https://i.pinimg.com/1200x/c8/16/1b/c8161b685b3848fe8804be950ddbd02b.jpg",
              alt: "Hero Image",
              width: 400,
              classNmame: "rounded-2xl"
            }}
            nodes={draggableNodes}
            className="mx-auto"
          />
        </section>

        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Hero Image Callouts - Animated Variant
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              In this variant, nodes marked with <code>isAnimated</code> move in a continuous diagonal loop and bounce back whenever they reach an image edge.
            </p>
          </div>

          <HeroImageCallouts
            image={{
              src: "https://i.pinimg.com/1200x/c8/16/1b/c8161b685b3848fe8804be950ddbd02b.jpg",
              alt: "Hero Image",
              width: 400,
              classNmame: "rounded-2xl"
            }}
            nodes={animatedNodes}
            className="mx-auto"
          />
        </section>

        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Hero Image Callouts - Combined Variant
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              This variant combines all behaviors in one scene: fixed markers for stable information, draggable cards for interactive placement, and animated nodes for continuous motion.
            </p>
          </div>

          <HeroImageCallouts
            image={{
              src: "https://i.pinimg.com/1200x/c8/16/1b/c8161b685b3848fe8804be950ddbd02b.jpg",
              alt: "Hero Image",
              width: 400,
              classNmame: "rounded-2xl"
            }}
            nodes={combinedNodes}
            className="mx-auto"
          />
        </section>
      </main>
    </div>
  )
}

export default page