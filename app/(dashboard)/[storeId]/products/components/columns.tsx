'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Image as Images } from '@/interfaces'
import Image from 'next/image'
import { CellAction } from './cell-action'

export type ProductColumn = {
  id: number
  name: string
  price: number
  isFeatured: boolean
  isArchived: boolean
  images: Images[]
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'images.url',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={
          row.original.images[0] !== undefined
            ? row.original.images[0].url
            : 'https://i.pinimg.com/originals/a3/6b/42/a36b422bb2bebcbd77bba846b83ddf5d.png'
        }
        width="80"
        height="80"
        alt="Player"
        className="rounded-lg"
      />
    )
  },
  { accessorKey: 'product.name', header: 'Name' },
  { accessorKey: 'product.price', header: 'Price' },
  { accessorKey: 'product.isFeatured', header: 'Featured' },
  { accessorKey: 'product.isArchived', header: 'Archived' },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
