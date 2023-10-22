import { getColors } from '@/actions/colors/get-colors'
import { Metadata } from 'next'
import { ColorClient } from './components/client'
import { ColorColumn } from './components/columns'

export const metadata: Metadata = {
  title: 'Colores',
  description: 'Administra diversas Colores para tus productos'
}

export default async function ColorsPage({
  params
}: {
  params: { storeId: number }
}) {
  const colors: ColorColumn[] = await getColors(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <ColorClient data={colors} />
      </div>
    </div>
  )
}
