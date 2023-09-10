'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type CategoryColumn = {
  id: number
  name: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  { accessorKey: 'name', header: 'Name' },
  // { accessorKey: 'imageUrl', header: 'imageUrl' },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
