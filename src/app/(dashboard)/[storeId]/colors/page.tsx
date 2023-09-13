import appEndpoints from '@/app/api/app.endpoints'
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
  const URL = `${appEndpoints.colors}/?storeId=${params.storeId}`
  const colors: ColorColumn[] = await fetch(URL, { cache: 'no-store' })
    .then(res => res.json())
    .catch(error => console.log('ERROR FROM SERVER ->', error))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-5 pt-6">
        <ColorClient data={colors} />
      </div>
    </div>
  )
}
