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
    header: 'Imagen',
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
  { id: 'productName', accessorKey: 'product.name', header: 'Nombre' },
  {
    accessorKey: 'product.price',
    header: 'Precio',
    cell: ({ row }) => <span>$ {row.original.product.price}</span>
  },
  {
    accessorKey: 'colors.value',
    header: 'Colores',
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
    header: 'Destacado',
    cell: ({ row }) =>
      row.original.product.isFeatured ? (
        <CheckIcon className="text-secondary-foreground/50" />
      ) : (
        <X className="text-secondary-foreground/50" />
      )
  },
  {
    accessorKey: 'product.isArchived',
    header: 'Archivado',
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
