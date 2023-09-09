'use client'

import { ColumnDef } from '@tanstack/react-table'

import { CellAction } from './cell-action'

export type BillboardColumn = {
  label: string
  category: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  { accessorKey: 'label', header: 'Label' },
  { accessorKey: 'category.name', header: 'Category' },
  // { accessorKey: 'imageUrl', header: 'imageUrl' },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
