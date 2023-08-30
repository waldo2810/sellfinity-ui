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
import { useParams, usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import StoreSwitcher from './store-switcher'
import { Store } from '@/interfaces'

const routes = [
  {
    label: 'dashboard',
    icon: LayoutDashboard,
    href: '',
    color: 'text-sky-500'
  },
  {
    label: 'orders',
    icon: Receipt,
    href: 'orders',
    color: 'text-violet-500'
  },
  {
    label: 'products',
    icon: Box,
    color: 'text-pink-700',
    href: 'products'
  },
  {
    label: 'categories',
    icon: Tag,
    color: 'text-emerald-500',
    href: 'categories'
  },
  {
    label: 'billboards',
    icon: Megaphone,
    color: 'text-orange-700',
    href: 'billboards'
  },
  {
    label: 'colors',
    icon: Palette,
    color: 'text-green-700',
    href: 'colors'
  },
  {
    label: 'sizes',
    icon: Ruler,
    href: 'sizes'
  }
]

export const Sidebar = ({ stores }: { stores: Store[] }) => {
  const { storeId } = useParams()
  const pathname = usePathname()
  const t = useTranslations('Sidebar')

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50 border border-r-slate-200 dark:border-r-slate-800">
      <div className="px-3 py-2 flex-1">
        <Link
          href={`/${storeId}/dashboard`}
          className="flex items-center pl-3 mb-14"
        >
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className="text-2xl font-bold">Sellfinity</h1>
        </Link>
        <StoreSwitcher className="" items={stores} />
        <div className="space-y-1">
          {routes.map(route => (
            <Link
              key={route.href}
              href={`${storeId}/${route.href}`}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-950 dark:hover:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition',
                pathname === route.href
                  ? 'text-slate-950 dark:text-slate-50 bg-slate-200 dark:bg-slate-800'
                  : 'text-zinc-400'
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn('h-5 w-5 mr-3', route.color)} />
                {t(route.label)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
