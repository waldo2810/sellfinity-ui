import { getSize } from '@/actions/sizes/get-size'
import { Size } from '@/interfaces'
import { Metadata } from 'next'
import { SizeForm } from './components/size-form'

type SizePageProps = {
  params: {
    sizeId: string
    storeId: number
  }
}

export const metadata: Metadata = {
  title: 'Agregar o editar tallas',
  description: 'Administra una talla'
}

export default async function SizePage({ params }: SizePageProps) {
  const size: Size = await getSize(params.sizeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8">
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}
