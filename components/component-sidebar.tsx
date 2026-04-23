'use client'

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from './ui/sidebar'
import Link from 'next/link'

function ComponentSidebar() {
  const link = [
    { name: "Hero Section", href: "/components/hero-section" },
  ]
  const pathname = usePathname();
  return (
    <Sidebar
      style={{
        top: '4rem',
        bottom: 'auto',
        height: 'calc(100svh - 4rem)',
      }}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Components</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {link.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton isActive={pathname === item.href} className="cursor-pointer">
                    <Link href={item.href} passHref>
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default ComponentSidebar