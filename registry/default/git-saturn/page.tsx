import React from 'react'
import GitSaturn from '@/registry/default/git-saturn/components/git-saturn'
import { getGitSaturnDataAction } from '@/registry/default/git-saturn/lib/git-saturn.actions'

async function page() {
  const saturnData = await getGitSaturnDataAction({
    includeCommitCounts: true,
  });

  return (
    <div>
      <GitSaturn
        username={saturnData.username}
        width={720}
        height={420}
        interactive
        repos={saturnData.repos}
      />
    </div>
  )
}

export default page