'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import { CellAction } from './cell-action'

export type BillboardColumn = {
  id: number
  label: string
  category: string
  imageUrl: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={
          row.original.imageUrl !== ''
            ? row.original.imageUrl
            : 'https://i.pinimg.com/originals/a3/6b/42/a36b422bb2bebcbd77bba846b83ddf5d.png'
        }
        width="80"
        height="80"
        alt="Player"
        className="rounded-lg"
      />
    )
  },
  { accessorKey: 'label', header: 'Label' },
  { accessorKey: 'category.name', header: 'Category' },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
