'use client'

import { Copy, Check } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { codeToHtml } from 'shiki'

const SHIKI_THEME = 'tokyo-night' as const

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  lang?: string
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

export function ComponentPreview({ children, code, lang = 'tsx' }: ComponentPreviewProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="border rounded-lg p-6 bg-background/50">
        <div className="flex items-center justify-center min-h-100">
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code" className="border rounded-lg overflow-hidden">
        <div className="relative">
          <button
            onClick={handleCopy}
            className={cn(
              "absolute top-4 right-4 p-2 rounded-md transition-colors z-10",
              copied
                ? "bg-green-500/20 text-green-600"
                : "bg-muted hover:bg-muted/80 text-muted-foreground"
            )}
            title={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>

          <CodeBlock code={code} language={lang} />
        </div>
      </TabsContent>
    </Tabs>
  )
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [highlightedHtml, setHighlightedHtml] = useState('')

  useEffect(() => {
    let isMounted = true

    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
          lang: language || 'tsx',
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
  }, [code, language])

  if (highlightedHtml) {
    return (
      <div className="h-[660px] bg-black">
        <ScrollArea style={{ height: '100%' }}>
          <div
            className="overflow-x-auto [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:p-2 [&_code]:block [&_code_.code-line]:flex [&_code_.code-line]:min-h-6 [&_code_.code-line-number]:mr-4 [&_code_.code-line-number]:w-8 [&_code_.code-line-number]:shrink-0 [&_code_.code-line-number]:select-none [&_code_.code-line-number]:text-right [&_code_.code-line-number]:text-slate-500 [&_code_.code-line-content]:min-w-0 [&_code_.code-line-content]:flex-1"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-slate-950 text-slate-50">
      <ScrollArea style={{ height: '100%' }}>
        <pre className="p-6 text-sm leading-relaxed">
          <code className="font-mono">
            {code.split('\n').map((line, index) => (
              <span key={index} className="flex min-h-6">
                <span className="mr-4 w-10 shrink-0 select-none text-right text-slate-500">{index + 1}</span>
                <span className="min-w-0 flex-1 whitespace-pre-wrap wrap-break-word">{line || ' '}</span>
              </span>
            ))}
          </code>
        </pre>
      </ScrollArea>
    </div>
  )
}
