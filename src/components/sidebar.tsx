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
import StoreSwitcher from './store-switcher'
import { Store } from '@/interfaces'

export const Sidebar = () => {
  const params = useParams()
  const pathname = usePathname()
  const routes = [
    {
      label: 'Inicio',
      icon: LayoutDashboard,
      href: `/${params.storeId}`,
      color: 'text-sky-500'
    },
    {
      label: 'Ordenes',
      icon: Receipt,
      href: `/${params.storeId}/orders`,
      color: 'text-violet-500'
    },
    {
      label: 'Productos',
      icon: Box,
      color: 'text-pink-700',
      href: `/${params.storeId}/products`
    },
    {
      label: 'Categorias',
      icon: Tag,
      color: 'text-emerald-500',
      href: `/${params.storeId}/categories`
    },
    {
      label: 'Carteleras',
      icon: Megaphone,
      color: 'text-orange-700',
      href: `/${params.storeId}/billboards`
    },
    {
      label: 'Colores',
      icon: Palette,
      color: 'text-green-700',
      href: `/${params.storeId}/colors`
    },
    {
      label: 'Tallas',
      icon: Ruler,
      href: `/${params.storeId}/sizes`
    }
  ]
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-slate-50 border border-r-slate-200 dark:border-r-slate-800">
      <div className="px-3 py-2 flex-1">
        <Link
          href={`/${params.storeId}`}
          className="flex items-center pl-3 mb-14"
        >
          <div className="relative h-8 w-8 mr-4">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#EA208B] via-[#00AACF] to-[#FBB03B]">
            Sellfinity
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-slate-950 dark:hover:text-slate-50 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition',
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
