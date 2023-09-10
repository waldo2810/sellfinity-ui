'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type ColorColumn = {
  id: number
  name: string
  value: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'value', header: 'Value' },
  // { accessorKey: 'imageUrl', header: 'imageUrl' },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
