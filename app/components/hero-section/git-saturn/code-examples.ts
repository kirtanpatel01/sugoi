export const gitSaturnUsageCode = `import GitSaturn from '@/components/custom/git-saturn'
import { getGitSaturnDataAction } from '@/app/components/hero-section/git-saturn/actions'

export default async function Example() {
  const saturnData = await getGitSaturnDataAction({
    includeCommitCounts: true,
  })

  return (
    <GitSaturn
      username={saturnData.username}
      width={720}
      height={420}
      interactive
      repos={saturnData.repos}
      showUsername={true}
      showStats={true}
      showRepoDetails={true}
    />
  )
}`
