'use client'

import React from 'react'
import { Menu, Check, Copy } from 'lucide-react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
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

type WorkbenchProps = {
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
    <div className="h-160 bg-black">
      <ScrollArea className="h-full w-full">
        <div
          className="text-sm [&_pre]:min-w-fit [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:p-3 [&_code]:block [&_code_.code-line]:flex [&_code_.code-line]:min-h-6 [&_code_.code-line-number]:mr-4 [&_code_.code-line-number]:w-8 [&_code_.code-line-number]:shrink-0 [&_code_.code-line-number]:select-none [&_code_.code-line-number]:text-right [&_code_.code-line-number]:text-slate-500 [&_code_.code-line-content]:whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
        <ScrollBar orientation="horizontal" />
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

export function Workbench({ files, children }: WorkbenchProps) {
  const [selectedPath, setSelectedPath] = React.useState(files[0]?.path ?? '')
  const [copyState, setCopyState] = React.useState<'idle' | 'copied' | 'error'>('idle')
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

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
        <div className="flex items-center justify-center p-3 sm:p-6 bg-background/50 sm:min-h-165">
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code" className="border rounded-lg overflow-hidden">
          <div className="flex w-full">
            <motion.aside 
              initial={false}
              animate={{ 
                width: sidebarOpen ? 220 : 0,
                opacity: sidebarOpen ? 1 : 0
              }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={cn("border-r bg-muted/20 shrink-0 overflow-hidden", 
                sidebarOpen ? "p-3" : "p-0",
                "lg:w-[220px]! lg:opacity-100! lg:p-3 lg:block",
                sidebarOpen ? "block" : "hidden"
              )}
            >
              <div className="w-[220px]">
                {/* <p className="mb-2 text-xs font-medium text-muted-foreground">Files</p> */}
                <div className="space-y-3">
                  {groupedFiles.map((group) => (
                    <div key={group.title} className="space-y-1 flex flex-col">
                      <p className="px-1 text-xs tracking-wide text-muted-foreground/80">
                        {group.title}
                      </p>
                      {group.items.map((file) => (
                        <Button
                          key={file.path}
                          variant={selectedFile?.path === file.path ? "secondary" : "ghost"}
                          onClick={() => setSelectedPath(file.path)}
                          className="w-fit justify-start"
                        >
                          <span className="truncate">{getFileName(file.path)}</span>
                        </Button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>

            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center justify-between gap-2 border-b bg-background/70 px-3 py-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden"
                    title="Toggle sidebar"
                  >
                    <Menu size={16} />
                  </Button>
                  <span className="truncate">{getFileName(selectedFile?.path ?? '')}</span>
                </div>
                <span className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon-xs"
                    onClick={copySelectedFile}
                    title="Copy code"
                  >
                    {copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </span>
              </div>
              <CodePanel code={selectedFile?.code ?? ''} lang={selectedFile?.lang} />
            </div>
          </div>
      </TabsContent>
    </Tabs>
  )
}
