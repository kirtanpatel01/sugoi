'use client'

import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { codeToHtml } from 'shiki'
import { cn } from '@/lib/utils'

const SHIKI_THEME = 'tokyo-night' as const

type WorkbenchFile = {
  path: string
  code: string
  lang?: string
  badge?: string
  group?: string
}

type ComponentDocsWorkbenchProps = {
  files: WorkbenchFile[]
  children: React.ReactNode
}

function withLineNumbers(highlightedHtml: string) {
  const match = highlightedHtml.match(/(<pre[\s\S]*?><code>)([\s\S]*?)(<\/code><\/pre>)/)

  if (!match) {
    return highlightedHtml
  }

  const [, preOpen, codeHtml, preClose] = match
  const numberedCode = codeHtml
    .split('\n')
    .map((line, index) => {
      const lineContent = line.length > 0 ? line : '&nbsp;'
      return `<span class="code-line"><span class="code-line-number">${index + 1}</span><span class="code-line-content">${lineContent}</span></span>`
    })
    .join('')

  return `${preOpen}${numberedCode}${preClose}`
}

function CodePanel({ code, lang }: { code: string; lang?: string }) {
  const [highlightedHtml, setHighlightedHtml] = React.useState('')

  React.useEffect(() => {
    let isMounted = true

    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: lang || 'typescript',
          theme: SHIKI_THEME,
        })

        if (isMounted) {
          setHighlightedHtml(withLineNumbers(html))
        }
      } catch {
        if (isMounted) {
          setHighlightedHtml('')
        }
      }
    }

    highlightCode()

    return () => {
      isMounted = false
    }
  }, [code, lang])

  return (
    <div className="h-160 bg-black overflow-hidden">
      <ScrollArea style={{ height: '100%' }}>
        <div
          className="text-sm overflow-x-auto [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:p-3 [&_code]:block [&_code_.code-line]:flex [&_code_.code-line]:min-h-6 [&_code_.code-line-number]:mr-4 [&_code_.code-line-number]:w-8 [&_code_.code-line-number]:shrink-0 [&_code_.code-line-number]:select-none [&_code_.code-line-number]:text-right [&_code_.code-line-number]:text-slate-500 [&_code_.code-line-content]:min-w-0 [&_code_.code-line-content]:flex-1"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </ScrollArea>
    </div>
  )
}

function groupFiles(files: WorkbenchFile[]) {
  const grouped = new Map<string, WorkbenchFile[]>()
  for (const file of files) {
    const key = file.group || 'Files'
    const current = grouped.get(key)
    if (current) {
      current.push(file)
    } else {
      grouped.set(key, [file])
    }
  }
  return Array.from(grouped.entries()).map(([title, items]) => ({ title, items }))
}

export function ComponentDocsWorkbench({ files, children }: ComponentDocsWorkbenchProps) {
  const [selectedPath, setSelectedPath] = React.useState(files[0]?.path ?? '')
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'error'>('idle')

  const selectedFile = React.useMemo(
    () => files.find((file) => file.path === selectedPath) ?? files[0],
    [files, selectedPath]
  )
  const groupedFiles = React.useMemo(() => groupFiles(files), [files])

  const getFileName = (path: string) => path.split('/').pop() ?? path

  async function copySelectedFile() {
    if (!selectedFile?.code) return

    try {
      await navigator.clipboard.writeText(selectedFile.code)
      setCopyState('copied')
      window.setTimeout(() => setCopyState('idle'), 1500)
    } catch {
      setCopyState('error')
      window.setTimeout(() => setCopyState('idle'), 2000)
    }
  }

  return (
    <Tabs defaultValue="preview" className="space-y-3">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="border rounded-lg overflow-hidden">
        <div className="flex items-center justify-center p-6 bg-background/50 min-h-165">
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code" className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[220px_1fr]">
          <aside className="border-r bg-muted/20 p-3">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Files</p>
            <div className="space-y-3">
              {groupedFiles.map((group) => (
                <div key={group.title} className="space-y-1">
                  <p className="px-1 text-xs font-semibold tracking-wide text-muted-foreground/80">
                    {group.title}
                  </p>
                  {group.items.map((file) => (
                    <button
                      key={file.path}
                      type="button"
                      onClick={() => setSelectedPath(file.path)}
                      className={cn("border border-transparent cursor-pointer",
                        selectedFile?.path === file.path
                          ? 'w-full rounded-md border-border bg-secondary px-2 py-1 text-left'
                          : 'w-full rounded-md px-2 py-1 text-left hover:bg-secondary/80'
                      )}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate">{getFileName(file.path)}</span>
                        {file.badge ? (
                          <span className="rounded border px-1 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {file.badge}
                          </span>
                        ) : null}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex items-center justify-between gap-2 border-b bg-background/70 px-3 py-2 text-xs font-medium">
              <span className="truncate">{getFileName(selectedFile?.path ?? '')}</span>
              <span className="flex items-center gap-2">
                {selectedFile?.badge ? (
                  <span className="rounded border px-1 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {selectedFile.badge}
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={copySelectedFile}
                  className="rounded border px-2 py-1 text-[10px] font-medium hover:bg-muted"
                >
                  {copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy'}
                </button>
              </span>
            </div>
            <CodePanel code={selectedFile?.code ?? ''} lang={selectedFile?.lang} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
