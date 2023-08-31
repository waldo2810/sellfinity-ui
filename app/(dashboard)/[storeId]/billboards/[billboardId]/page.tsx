import axios from 'axios'
import { BillboardForm } from './components/billboard-form'
import { Billboard } from '@/interfaces'

type BillboardPageProps = {
  params: {
    billboardId: string
  }
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
  const { billboardId } = params
  // const billboard: Billboard = await (
  //   await axios.get(`/api/billboards/${billboardId}`)
  // ).data
  const billboard = {
    id: 1,
    label: 'BFFR',
    imageUrl:
      'https://cloudinary-res.cloudinary.com/image/upload/website/cloudinary_web_favicon.png',
    createdAt: '2023-12-12:13:00:00',
    updatedAt: ''
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8">
        <BillboardForm initialData={null} />
      </div>
    </div>
  )
}

export default BillboardPage
