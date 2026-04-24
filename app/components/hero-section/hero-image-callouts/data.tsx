import type { PropsTableGroup } from '@/components/common/props-table'
import { HeroSectionNode } from '@/components/custom/hero-image-callouts'
import { IconCircleCheckFilled, IconPlus } from '@tabler/icons-react'

export const nodes = [
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

export const draggableNodes = [
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

export const animatedNodes: HeroSectionNode[] = [
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

export const combinedNodes = [
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

export const heroImageCalloutsPropGroups: PropsTableGroup[] = [
  {
    title: 'HeroImageCallouts Props',
    rows: [
      {
        prop: 'image',
        type: `{
  src: string;
  alt: string;
  height?: number;
  width?: number;
  classNmame?: string;
}`,
        required: true,
        description: 'Defines the background image that the callouts are positioned on.',
      },
      {
        prop: 'nodes',
        type: 'HeroSectionNode[]',
        required: false,
        description: 'An array of callout nodes rendered on top of the image.',
      },
      {
        prop: 'className',
        type: 'string',
        required: false,
        description: 'Adds custom classes to the outer wrapper.',
      },
    ],
    children: [
      {
        title: 'image object props',
        rows: [
          {
            prop: 'src',
            type: 'string',
            required: true,
            description: 'The image URL or path used as the background image.',
          },
          {
            prop: 'alt',
            type: 'string',
            required: true,
            description: 'The alt text for the image.',
          },
          {
            prop: 'height',
            type: 'number',
            required: false,
            description: 'Optional image height in pixels.',
          },
          {
            prop: 'width',
            type: 'number',
            required: false,
            description: 'Optional image width in pixels.',
          },
          {
            prop: 'classNmame',
            type: 'string',
            required: false,
            description: 'Adds custom classes to the image element.',
          },
        ],
      },
      {
        title: 'nodes array item props (HeroSectionNode)',
        rows: [
          {
            prop: 'position',
            type: `{
  top: number;
  left: number;
}`,
            required: true,
            description: 'Sets the node position as percentage offsets from the image container.',
          },
          {
            prop: 'content',
            type: 'React.ReactNode',
            required: true,
            description: 'The UI rendered inside the callout node.',
          },
          {
            prop: 'isDraggable',
            type: 'boolean',
            required: false,
            description: 'Makes the node draggable when true.',
          },
          {
            prop: 'isAnimated',
            type: 'boolean',
            required: false,
            description: 'Enables the built-in movement animation when true.',
          },
          {
            prop: 'animate',
            type: `{
  speed?: number;
  direction?:
    | "up-right"
    | "up-left"
    | "down-right"
    | "down-left";
  bounce?: boolean;
}`,
            required: false,
            description: 'Configures the automatic animation behavior for the node.',
          },
        ],
        children: [
          {
            title: 'position object props',
            rows: [
              {
                prop: 'top',
                type: 'number',
                required: true,
                description: 'Vertical position of the node in percentage units.',
              },
              {
                prop: 'left',
                type: 'number',
                required: true,
                description: 'Horizontal position of the node in percentage units.',
              },
            ],
          },
          {
            title: 'animate object props',
            rows: [
              {
                prop: 'speed',
                type: 'number',
                required: false,
                description: 'Controls how fast the node moves when animated.',
              },
              {
                prop: 'direction',
                type: `"up-right"
  | "up-left"
  | "down-right"
  | "down-left"
`,
                required: false,
                description: 'Sets the diagonal direction for animated movement.',
              },
              {
                prop: 'bounce',
                type: 'boolean',
                required: false,
                description: 'Makes the node reverse direction when it reaches an edge.',
              },
            ],
          },
        ],
      },
    ],
  },
]