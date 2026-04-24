export const fixedPositionUsageCode = `import HeroImageCallouts from '@/components/custom/hero-image-callouts'
import { IconCircleCheckFilled, IconPlus } from '@tabler/icons-react'

export default function Example() {
  const nodes = [
    {
      position: { top: 20, left: 100 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500" />
          <span>Team Learning Programs</span>
        </div>
      ),
    },
    {
      position: { top: 30, left: 100 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500 " />
          <span>1:1 Mentor Sessions</span>
        </div>
      )
    },
    {
      position: { top: 50, left: -2 },
      content: (
        <div className="max-w-24 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-4xl">35+</h1>
          <span className="text-xs">Supported Regions</span>
        </div>
      )
    },
    {
      position: { top: 85, left: 105 },
      content: (
        <div className="max-w-36 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl flex-wrap">
          <h1 className="font-medium text-4xl">2,400+</h1>
          <span className="text-xs">Guided Learning Modules</span>
        </div>
      )
    },
    {
      position: { top: 70, left: 0 },
      content: (
        <div className="bg-background rounded-3xl p-3 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-xl">Build Your Focus</h1>
          <div className="text-xs flex gap-2">
            {["Communication", "Leadership", "Strategy"].map((skill) => (
              <div key={skill} className="flex items-center gap-1 rounded-full border border-blue-500 dark:border-blue-500/30 bg-blue-500/10 p-1.5">
                <IconPlus className="text-blue-500" size={16} />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
  ]

  return (
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
  )
}`

export const draggableUsageCode = `import HeroImageCallouts from '@/components/custom/hero-image-callouts'
import { IconCircleCheckFilled, IconPlus } from '@tabler/icons-react'

export default function Example() {
  const nodes = [
    {
      position: { top: 20, left: 100 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500" />
          <span>Team Learning Programs</span>
        </div>
      ),
      isDraggable: true
    },
    {
      position: { top: 30, left: 100 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500 " />
          <span>1:1 Mentor Sessions</span>
        </div>
      ),
      isDraggable: true
    },
    {
      position: { top: 50, left: -2 },
      content: (
        <div className="max-w-24 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-4xl">35+</h1>
          <span className="text-xs">Supported Regions</span>
        </div>
      ),
      isDraggable: false
    },
    {
      position: { top: 85, left: 105 },
      content: (
        <div className="max-w-36 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl flex-wrap">
          <h1 className="font-medium text-4xl">2,400+</h1>
          <span className="text-xs">Guided Learning Modules</span>
        </div>
      ),
      isDraggable: true
    },
    {
      position: { top: 70, left: 0 },
      content: (
        <div className="bg-background rounded-3xl p-3 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-xl">Build Your Focus</h1>
          <div className="text-xs flex gap-2">
            {["Communication", "Leadership", "Strategy"].map((skill) => (
              <div key={skill} className="flex items-center gap-1 rounded-full border border-blue-500 dark:border-blue-500/30 bg-blue-500/10 p-1.5">
                <IconPlus className="text-blue-500" size={16} />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      isDraggable: false
    },
  ]

  return (
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
  )
}`

export const animatedUsageCode = `import HeroImageCallouts from '@/components/custom/hero-image-callouts'
import { IconCircleCheckFilled, IconPlus } from '@tabler/icons-react'

export default function Example() {
  const nodes = [
    {
      position: { top: 18, left: 18 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500" />
          <span>Live Collaboration</span>
        </div>
      ),
      isAnimated: true,
    },
    {
      position: { top: 36, left: 58 },
      content: (
        <div className="max-w-24 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-4xl">98%</h1>
          <span className="text-xs">Completion Rate</span>
        </div>
      ),
      isAnimated: true,
      animate: {
        speed: 50,
        direction: "down-left",
        bounce: true
      }
    },
    {
      position: { top: 68, left: 28 },
      content: (
        <div className="bg-background rounded-3xl p-3 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-xl">Momentum</h1>
          <div className="text-xs flex gap-2">
            {['Planning', 'Execution', 'Review'].map((phase) => (
              <div key={phase} className="flex items-center gap-1 rounded-full border border-blue-500 dark:border-blue-500/30 bg-blue-500/10 p-1.5">
                <IconPlus className="text-blue-500" size={16} />
                <span>{phase}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      isAnimated: true,
    },
  ]

  return (
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
  )
}`

export const combinedUsageCode = `import HeroImageCallouts from '@/components/custom/hero-image-callouts'
import { IconCircleCheckFilled, IconPlus } from '@tabler/icons-react'

export default function Example() {
  const nodes = [
    {
      position: { top: 20, left: 100 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500" />
          <span>Fixed Service Tag</span>
        </div>
      ),
    },
    {
      position: { top: 30, left: 90 },
      content: (
        <div className="whitespace-nowrap text-sm bg-background rounded-full p-2 flex gap-2 items-center shadow-md">
          <IconCircleCheckFilled className="fill-blue-500 " />
          <span>Drag Me</span>
        </div>
      ),
      isDraggable: true,
    },
    {
      position: { top: 52, left: 20 },
      content: (
        <div className="max-w-24 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-4xl">42+</h1>
          <span className="text-xs">Active Regions</span>
        </div>
      ),
      isAnimated: true,
    },
    {
      position: { top: 74, left: 76 },
      content: (
        <div className="max-w-36 bg-blue-500 text-white rounded-3xl p-4 flex flex-col gap-1 items-start shadow-xl flex-wrap">
          <h1 className="font-medium text-4xl">3,100+</h1>
          <span className="text-xs">Interactive Lessons</span>
        </div>
      ),
      isDraggable: true,
      isAnimated: true,
    },
    {
      position: { top: 68, left: 4 },
      content: (
        <div className="bg-background rounded-3xl p-3 flex flex-col gap-1 items-start shadow-xl">
          <h1 className="font-medium text-xl">Skill Focus</h1>
          <div className="text-xs flex gap-2">
            {['Speaking', 'Fluency', 'Confidence'].map((skill) => (
              <div key={skill} className="flex items-center gap-1 rounded-full border border-blue-500 dark:border-blue-500/30 bg-blue-500/10 p-1.5">
                <IconPlus className="text-blue-500" size={16} />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  return (
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
  )
}`
