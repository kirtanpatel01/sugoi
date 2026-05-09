import { CodeBox } from '@/components/code-box'
import { PropsTable } from '@/components/props-table'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Preview } from '@/components/preview'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { animatedNodes, combinedNodes, draggableNodes, nodes } from './data'
import {
  fixedPositionUsageCode,
  draggableUsageCode,
  animatedUsageCode,
  combinedUsageCode,
} from './code-examples'
import { heroImageCalloutsPropGroups } from './data'
import HeroImageCallouts from '@/registry/default/hero-image-callouts/hero-image-callouts'

async function page() {
  const heroImageCalloutsPath = path.join(process.cwd(), 'registry', 'default', 'hero-image-callouts', 'hero-image-callouts.tsx')
  const fixedPositionCode = await readFile(heroImageCalloutsPath, 'utf-8')

  return (
    <div className='p-4 space-y-6'>
      <header>
        <Breadcrumb className='bg-secondary/20 rounded-full w-fit border px-3 py-2'>
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

          <Preview code={fixedPositionCode} lang="tsx">
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
          </Preview>

          <div className='space-y-2'>
            <h2 className='text-sm font-medium'>Usage Example</h2>
            <CodeBox code={fixedPositionUsageCode} lang="tsx" />
          </div>
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

          <div className='rounded-lg border p-6 bg-background/50'>
            <div className='flex items-center justify-center min-h-100'>
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
            </div>
          </div>

          <CodeBox code={draggableUsageCode} lang="tsx" />
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

          <div className='rounded-lg border p-6 bg-background/50'>
            <div className='flex items-center justify-center min-h-100'>
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
            </div>
          </div>

          <CodeBox code={animatedUsageCode} lang="tsx" />
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

          <div className='rounded-lg border p-6 bg-background/50'>
            <div className='flex items-center justify-center min-h-100'>
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
            </div>
          </div>

          <CodeBox code={combinedUsageCode} lang="tsx" />
        </section>

        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Props Reference
            </h1>
            <p className='mt-2 text-sm text-muted-foreground'>
              A quick reference for the props you can pass to Hero Image Callouts.
            </p>
          </div>

          <PropsTable groups={heroImageCalloutsPropGroups} />
        </section>
      </main>
    </div>
  )
}

export default page