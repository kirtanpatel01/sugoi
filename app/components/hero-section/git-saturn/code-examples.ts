export const gitSaturnUsageCode = `import GitSaturn from '@/components/custom/git-saturn'

export default function Example() {
  return (
    <GitSaturn
      username="satvik.dev"
      width={720}
      height={420}
      interactive
      repos={[
        { name: 'design-system', commits: 312, stars: 940, lastActivity: '2 days ago' },
        { name: 'portfolio-site', commits: 198, stars: 620, lastActivity: '5 days ago' },
        { name: 'animation-kit', commits: 164, stars: 470, lastActivity: '1 week ago' },
        { name: 'ui-experiments', commits: 122 },
        { name: 'content-engine', commits: 86 },
        { name: 'shared-utils', commits: 64 },
      ]}
    />
  )
}`
