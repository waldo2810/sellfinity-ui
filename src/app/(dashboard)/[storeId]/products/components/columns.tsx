'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Color, Image as Images, Size } from '@/interfaces'
import Image from 'next/image'
import { CellAction } from './cell-action'
import { CheckIcon, X } from 'lucide-react'

export type ProductColumn = {
  images: Images[]
  colors: Color[]
  sizes: Size[]
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
  { id: 'productName', accessorKey: 'product.name', header: 'Name' },
  { accessorKey: 'product.price', header: 'Price' },
  {
    accessorKey: 'colors.value',
    header: 'Colors',
    cell: ({ row }) => (
      <div className="grid grid-cols-3">
        {row.original.colors.map(color => (
          <div
            key={color.id}
            className="h-6 w-6 rounded-full border"
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
    )
  },
  {
    accessorKey: 'product.isFeatured',
    header: 'Featured',
    cell: ({ row }) =>
      row.original.product.isFeatured ? (
        <CheckIcon className="text-secondary-foreground/50" />
      ) : (
        <X className="text-secondary-foreground/50" />
      )
  },
  {
    accessorKey: 'product.isArchived',
    header: 'Archived',
    cell: ({ row }) =>
      row.original.product.isArchived ? (
        <CheckIcon className="text-secondary-foreground/50" />
      ) : (
        <X className="text-secondary-foreground/50" />
      )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
