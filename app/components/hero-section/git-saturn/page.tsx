import GitSaturn from '@/components/custom/git-saturn'
import { ComponentDocsWorkbench } from '@/components/common/component-docs-workbench'
import { HighlightedCodeBox } from '@/components/common/highlighted-code-box'
import { PropsTable } from '@/components/common/props-table'
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
import { demoGitSaturnData, gitSaturnPropGroups } from './data'
import { gitSaturnUsageCode } from './code-examples'

async function page() {
  const sourceFiles = [
    'components/custom/git-saturn/index.tsx',
    'components/custom/git-saturn/types.ts',
    'components/custom/git-saturn/saturn-scene.tsx',
    'components/custom/git-saturn/repo-ring.tsx',
    'components/custom/git-saturn/star-field.tsx',
    'components/custom/git-saturn/git-saturn-planet.tsx',
    'components/custom/git-saturn/git-meteoroid.tsx',
  ]

  const files = await Promise.all(
    sourceFiles.map(async (filePath) => {
      const absolutePath = path.join(process.cwd(), ...filePath.split('/'))
      const code = await readFile(absolutePath, 'utf-8')
      return { path: filePath, code }
    })
  )

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
            <p className='mt-2 text-sm text-muted-foreground'>
                A hero visual that turns GitHub repositories into a true 3D Saturn scene where each repo becomes an orbiting meteoroid.
            </p>
          </div>

          <ComponentDocsWorkbench files={files}>
            <GitSaturn
              username={demoGitSaturnData.username}
                width={720}
                height={420}
              interactive
                repos={demoGitSaturnData.repos}
            />
          </ComponentDocsWorkbench>

          <div className='space-y-2'>
            <h2 className='text-sm font-medium'>Usage Example</h2>
            <HighlightedCodeBox code={gitSaturnUsageCode} lang='tsx' />
          </div>
        </section>

        <section className='space-y-4'>
          <div className='max-w-2xl'>
            <h2 className='text-2xl font-semibold tracking-tight'>Props Reference</h2>
            <p className='mt-2 text-sm text-muted-foreground'>
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