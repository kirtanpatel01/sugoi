import { Workbench } from '@/components/workbench'
import { CodeBox } from '@/components/code-box'
import { PropsTable } from '@/components/props-table'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { gitSaturnPropGroups } from './props-data'
import { gitSaturnUsageCode } from './code-examples'
import { IconInfoCircle } from '@tabler/icons-react'
import { getGitSaturnDataAction } from '@/registry/default/git-saturn/lib/git-saturn.actions'
import GitSaturn from '@/registry/default/git-saturn/components/git-saturn'

const gitSaturnDocsFiles = [
  { path: 'registry/default/git-saturn/components/git-saturn.tsx', lang: 'tsx', group: 'Component' },
  { path: 'registry/default/git-saturn/lib/git-saturn.types.ts', lang: 'ts', group: 'Data Layer' },
  { path: 'registry/default/git-saturn/components/saturn-scene.tsx', lang: 'tsx', group: 'Component' },
  { path: 'registry/default/git-saturn/components/repo-ring.tsx', lang: 'tsx', group: 'Component' },
  { path: 'registry/default/git-saturn/components/star-field.tsx', lang: 'tsx', group: 'Component' },
  { path: 'registry/default/git-saturn/components/git-saturn-planet.tsx', lang: 'tsx', group: 'Component' },
  { path: 'registry/default/git-saturn/components/git-meteoroid.tsx', lang: 'tsx', group: 'Component' },
  {
    path: 'registry/default/git-saturn/lib/git-saturn.utils.ts',
    lang: 'ts',
    runtime: 'server' as const,
    group: 'Data Layer',
  },
  {
    path: 'registry/default/git-saturn/lib/git-saturn.actions.ts',
    lang: 'ts',
    runtime: 'server' as const,
    group: 'Server Action',
  },
]

async function page() {
  const files = await Promise.all(
    gitSaturnDocsFiles.map(async (file) => {
      const absolutePath = path.join(process.cwd(), ...file.path.split('/'))
      const code = await readFile(absolutePath, 'utf-8')
      return {
        path: file.path,
        code,
        lang: file.lang,
        badge: file.runtime === 'server' ? 'Server' : undefined,
        group: file.group,
      }
    })
  )

  const saturnData = await getGitSaturnDataAction({
    includeCommitCounts: true,
  })

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
              <BreadcrumbPage>Git Saturn</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <main className='space-y-6'>
        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h1 className='text-2xl font-semibold tracking-tight'>Git Saturn</h1>
            <p className='mt-2 text-base '>
              A hero visual that turns GitHub repositories into a true 3D Saturn scene where each repo becomes an orbiting meteoroid.
            </p>
          </div>

          <Workbench files={files}>
            <GitSaturn
              username={saturnData.username}
              // width={720}
              // height={420}
              interactive
              repos={saturnData.repos}
              // showUsername={false}
              // showStats={false}
              // showRepoDetails={false}
              className='max-w-2xl w-full h-96'
            />
          </Workbench>

          <div className='space-y-2'>
            <h2 className='text-lg font-medium'>Usage Example</h2>
            <p className='flex gap-2 items-center bg-amber-50 text-amber-600 border border-amber-400 px-2 py-1 rounded-sm text-sm w-fit dark:bg-amber-950 dark:text-amber-500 dark:border-amber-900'>
              <IconInfoCircle size={16} />
              Import paths may vary depending on your project structure.
            </p>
            <p className='text-base '>
              Make sure to add your GitHub token to your environment (for example in a <code>.env</code> file): {" "}
              {/* <br /> */}
              <span className='font-mono bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-sm text-wrap'>GITHUB_TOKEN=your_personal_access_token</span>
            </p>
            <CodeBox code={gitSaturnUsageCode} lang='tsx' />
          </div>
        </section>

        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h2 className='text-2xl font-semibold tracking-tight'>Props Reference</h2>
            <p className='mt-2 text-base '>
              All props supported by GitSaturn for contribution-driven visuals.
            </p>
          </div>

          <PropsTable groups={gitSaturnPropGroups} />
        </section>
      </main>
    </div>
  )
}

export default page