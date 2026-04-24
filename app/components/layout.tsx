import ComponentSidebar from '@/components/component-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { SidebarInset } from '@/components/ui/sidebar'
import React from 'react'

function layout({ children }: {children: React.ReactNode }) {
  return (
    <SidebarProvider 
      className='min-h-[calc(100svh-4rem)]'
      style={{
        '--sidebar-width': '16rem',
      } as React.CSSProperties}
    >
      <ComponentSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export default layout