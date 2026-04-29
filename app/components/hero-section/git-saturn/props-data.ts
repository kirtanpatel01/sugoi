import type { PropsTableGroup } from '@/components/common/props-table'

export const gitSaturnPropGroups: PropsTableGroup[] = [
  {
    title: 'GitSaturn props',
    rows: [
      {
        prop: 'repos',
        type: `Array<{
  name: string;
  commits: number;
  stars?: number;
  lastActivity?: string;
}>`,
        required: true,
        description: 'List of repositories. Each repo becomes one orbiting meteoroid and its commits control the meteoroid size.',
      },
      {
        prop: 'username',
        type: 'string',
        required: false,
        description: 'Name shown in the badge under the planet.',
      },
      {
        prop: 'width',
        type: 'number',
        required: false,
        description: 'Sets the width of the rendered Saturn scene.',
      },
      {
        prop: 'height',
        type: 'number',
        required: false,
        description: 'Sets the height of the rendered Saturn scene.',
      },
      {
        prop: 'interactive',
        type: 'boolean',
        required: false,
        description: 'Enables orbit controls so the planet can be rotated and zoomed.',
      },
      {
        prop: 'className',
        type: 'string',
        required: false,
        description: 'Custom classes for the outer wrapper.',
      },
    ],
    children: [
      {
        title: 'repo item props',
        rows: [
          {
            prop: 'name',
            type: 'string',
            required: true,
            description: 'Repository name used as the stable key for each meteoroid.',
          },
          {
            prop: 'commits',
            type: 'number',
            required: true,
            description: 'Commit count for that repository. More commits create a larger meteoroid.',
          },
          {
            prop: 'stars',
            type: 'number',
            required: false,
            description: 'Optional star count shown in the focus card. If omitted, a readable fallback is derived.',
          },
          {
            prop: 'lastActivity',
            type: 'string',
            required: false,
            description: 'Optional last activity label shown in the focus card. If omitted, a relative fallback is derived.',
          },
        ],
      },
    ],
  },
]
