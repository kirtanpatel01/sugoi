'use client'

import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { codeToHtml } from 'shiki'

const SHIKI_THEME = 'tokyo-night' as const

type WorkbenchFile = {
  path: string
  code: string
  lang?: string
}

type ComponentDocsWorkbenchProps = {
  files: WorkbenchFile[]
  children: React.ReactNode
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
          setHighlightedHtml(html)
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
          className="text-sm [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:p-4 [&_code]:block"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </ScrollArea>
    </div>
  )
}

export function ComponentDocsWorkbench({ files, children }: ComponentDocsWorkbenchProps) {
  const [selectedPath, setSelectedPath] = React.useState(files[0]?.path ?? '')

  const selectedFile = React.useMemo(
    () => files.find((file) => file.path === selectedPath) ?? files[0],
    [files, selectedPath]
  )

  const getFileName = (path: string) => path.split('/').pop() ?? path

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
            <div className="space-y-1">
              {files.map((file) => (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => setSelectedPath(file.path)}
                  className={
                    selectedFile?.path === file.path
                      ? 'w-full rounded-md border bg-background px-2 py-1 text-left text-xs'
                      : 'w-full rounded-md px-2 py-1 text-left text-xs hover:bg-background/60'
                  }
                >
                  {getFileName(file.path)}
                </button>
              ))}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="border-b bg-background/70 px-3 py-2 text-xs font-medium">{getFileName(selectedFile?.path ?? '')}</div>
            <CodePanel code={selectedFile?.code ?? ''} lang={selectedFile?.lang} />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
