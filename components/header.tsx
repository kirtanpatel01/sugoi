'use client'

import Link from 'next/link'
import { ThemeToggleButton } from './theme-toggle'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

function Header() {
  const links = [
    { name: 'Home', href: '/' },
    { name: "Components", href: '/components' },
  ]
  const pathname = usePathname() ?? "/"
  const activeRoute = pathname.split("/")[1] ?? ""
  const activePath = activeRoute ? `/${activeRoute}` : "/"

  return (
    <header className='sticky top-0 z-50 flex h-16 w-full items-center justify-between px-4 backdrop-blur-xl border-b bg-background/70'>
      <div className='flex items-center gap-8'>
        <Link href={"/"}>
          <h2 className='text-2xl font-bold font-serif text-primary'>Sugoi</h2>
        </Link>
        <nav>
          <ul className='flex gap-6'>
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href} 
                  className={cn(
                    'font-medium px-2 py-1 hover:text-primary transition-colors duration-200 rounded-md', 
                    activePath === link.href && 'text-primary bg-secondary/30'
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <ThemeToggleButton />
    </header>
  )
}

export default Header