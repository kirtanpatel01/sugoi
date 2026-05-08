import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Page() {
  const sections = [
    {
      title: 'Hero Section',
      description: 'Collection of hero-related components and examples.',
      href: '/components/hero-section',
      items: [
        { title: 'Hero Image Callouts', href: '/components/hero-section/hero-image-callouts' },
        { title: 'Git Saturn', href: '/components/hero-section/git-saturn' },
      ],
    },
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Components</h1>
      <p className="mt-2 text-sm text-muted-foreground">Explore component sections.</p>

      <div className="mt-6 space-y-4">
        {sections.map((section) => (
          <Card key={section.title} className="max-w-sm">
            <CardHeader className="flex items-start justify-between">
              <div>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription className="max-w-96">{section.description}</CardDescription>
              </div>
              <div className="text-sm">
                <Link href={section.href} className="text-primary underline">Open</Link>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="text-sm">
              <ul className="space-y-1 list-disc list-inside text-primary">
                {section.items.map((it) => (
                  <li key={it.title}>
                    <Link href={it.href} className="text-foreground hover:text-primary hover:underline underline-offset-2 decoration-primary">{it.title}</Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}