'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'
import ColorBall from '@/components/color-ball'

export type ColorColumn = {
  id: number
  name: string
  value: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  { accessorKey: 'name', header: 'Name' },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <ColorBall colorValue={row.original.value} showValue={true} />
    )
  },
  // { accessorKey: 'imageUrl', header: 'imageUrl' },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
