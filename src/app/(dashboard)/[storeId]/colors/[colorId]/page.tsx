import appEndpoints from '@/app/api/app.endpoints'
import { Color } from '@/interfaces'
import { Metadata } from 'next'
import { ColorForm } from './components/color-form'

type ColorPageProps = {
  params: {
    colorId: string
    storeId: number
  }
}

export const metadata: Metadata = {
  title: 'Agregar o editar colores',
  description: 'Administra una talla'
}

export default async function ColorPage({ params }: ColorPageProps) {
  const colorUrl = `${appEndpoints.colors}/${params.colorId}`

  const color: Color = await fetch(colorUrl, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log(error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8">
        <ColorForm initialData={color} />
      </div>
    </div>
  )
}
