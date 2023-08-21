'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  Box,
  LayoutDashboard,
  Megaphone,
  Palette,
  Receipt,
  Ruler,
  Tag
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500'
  },
  {
    label: 'Orders',
    icon: Receipt,
    href: '/orders',
    color: 'text-violet-500'
  },
  {
    label: 'Products',
    icon: Box,
    color: 'text-pink-700',
    href: '/products'
  },
  {
    label: 'Categories',
    icon: Tag,
    color: 'text-emerald-500',
    href: '/categories'
  },
  {
    label: 'Billboards',
    icon: Megaphone,
    color: 'text-orange-700',
    href: '/billboards'
  },
  {
    label: 'Colors',
    icon: Palette,
    color: 'text-green-700',
    href: '/colors'
  },
  {
    label: 'Sizes',
    icon: Ruler,
    href: '/sizes'
  }
]

export const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50 border border-r-slate-200 dark:border-r-slate-800">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className="text-2xl font-bold">Sellfinity</h1>
        </Link>
        <div className="space-y-1">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-950 dark:hover:text-slate-50 hover:bg-slate-200 rounded-lg transition',
                pathname === route.href
                  ? 'text-slate-950 dark:text-slate-50 bg-slate-200 dark:bg-slate-800'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
