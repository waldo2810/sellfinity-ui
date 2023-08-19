'use client'

import LargeHeading from '@/components/ui/LargeHeading'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { tools } from './constants'

export default function DashboardPage() {
  const router = useRouter()
  return (
    <div>
      <div className="mb-8 space-y-1">
        <LargeHeading size="sm">Explore the power of AI</LargeHeading>
        <p className="text-muted-foreground text-sm md:text-lg font-light text-center md:text-left">
          Chat with the smartest AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map(tool => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-6 h-6', tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  )
}
