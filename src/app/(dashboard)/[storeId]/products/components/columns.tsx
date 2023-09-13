'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Image as Images } from '@/interfaces'
import Image from 'next/image'
import { CellAction } from './cell-action'
import { CheckIcon, X } from 'lucide-react'

export type ProductColumn = {
  images: Images[]
  product: {
    id: number
    name: string
    price: number
    isFeatured: boolean
    isArchived: boolean
    images: Images[]
  }
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'images.url',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={
          row.original.images.length !== 0
            ? row.original.images[0].url
            : '/product.png'
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
  {
    accessorKey: 'product.isFeatured',
    header: 'Featured',
    cell: ({ row }) => (row.original.product.isFeatured ? <CheckIcon /> : <X />)
  },
  {
    accessorKey: 'product.isArchived',
    header: 'Archived',
    cell: ({ row }) => (row.original.product.isArchived ? <CheckIcon /> : <X />)
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
