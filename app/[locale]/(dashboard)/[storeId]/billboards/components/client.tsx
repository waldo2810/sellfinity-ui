'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import { columns, BillboardColumn } from './columns'
import { ApiList } from '@/components/ui/api-list'

interface BillboardClientProps {
  data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const t = useTranslations('BillboardsPage')
  const router = useRouter()
  return (
    <>
      <div className="mb-8 space-y-4 md:flex items-center justify-between">
        <Heading
          title={t('title').concat(` (${data.length})`)}
          description={t('description')}
        />
        <Button
          size="smFlexMdFull"
          onClick={() => router.push('/billboards/new')}
          aria-label="Add billboard"
          title="Add billboard"
        >
          <Plus />
          {t('addBtn')}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title="API" description={t('api.description')} />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  )
}
