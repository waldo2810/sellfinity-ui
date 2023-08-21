'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'

interface BillboardClientProps {
  // data: BillboardColumn[]
  data: Object[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const t = useTranslations('BillboardsPage')
  const router = useRouter()
  return (
    <div>
      <div className="mb-8 space-y-4 md:flex items-center justify-between">
        <Heading
          title={t('title').concat(' (0)')}
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
      {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
      {/* <Heading title="API" description="API Calls for Billboards" /> */}
      {/* <Separator /> */}
      {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
    </div>
  )
}
