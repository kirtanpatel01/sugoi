'use client'

import { IconChevronDown } from '@tabler/icons-react'
import { usePathname } from 'next/navigation';
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuAction,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from './ui/sidebar'
import Link from 'next/link'
import { cn } from '@/lib/utils';

function ComponentSidebar() {
  const links = [
    {
      name: "Hero Section",
      href: "/components/hero-section",
      children: [
        {
          name: "Hero Image Callouts",
          href: "/components/hero-section/hero-image-callouts"
        },
        {
          name: "Hero with Background",
          href: "/components/hero-section/hero-with-background"
        },
      ],
    },
  ]
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({
    "/components/hero-section": true,
  });
  const pathname = usePathname();

  const toggleItem = (href: string) => {
    setOpenItems((prev) => ({ ...prev, [href]: !prev[href] }));
  };

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
              {links.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton isActive={pathname === item.href || pathname.startsWith(`${item.href}/`)} className="cursor-pointer" asChild>
                    <Link href={item.href}>
                      {item.name}
                    </Link>
                  </SidebarMenuButton>

                  {item.children?.length ? (
                    <>
                      <SidebarMenuAction
                        type="button"
                        onClick={() => toggleItem(item.href)}
                        showOnHover
                        aria-label={`Toggle ${item.name}`}
                      >
                        <IconChevronDown className={cn("transition-transform", openItems[item.href] ? "rotate-180" : "rotate-0")} />
                      </SidebarMenuAction>

                      {openItems[item.href] ? (
                        <SidebarMenuSub className='mt-1'>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.name}>
                              <SidebarMenuSubButton asChild isActive={pathname === child.href}>
                                <Link href={child.href}>
                                  {child.name}
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      ) : null}
                    </>
                  ) : null}
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