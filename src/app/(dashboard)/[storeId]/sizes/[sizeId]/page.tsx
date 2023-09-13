import appEndpoints from '@/app/api/app.endpoints'
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
  const sizeUrl = `${appEndpoints.sizes}/${params.sizeId}`

  const size: Size = await fetch(sizeUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8">
        <SizeForm initialData={size} />
      </div>
    </div>
  )
}
