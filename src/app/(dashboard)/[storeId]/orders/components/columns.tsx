'use client'

import { OrderItem } from '@/interfaces'
import { formatter } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { CheckIcon, X } from 'lucide-react'

export type OrderColumn = {
  id: number
  storeId: number
  isPaid: boolean
  phone: string
  address: string
  createdAt: string
  updatedAt: string
  orderItems: OrderItem[]
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Productos',
    cell: ({ row }) => (
      <span>
        {row.original.orderItems.map((orderItem, index) => {
          const separator =
            index < row.original.orderItems.length - 1 ? ', ' : ''
          return orderItem.product.name + separator
        })}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Telefono',
  },
  {
    accessorKey: 'address',
    header: 'Dirección',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Precio total',
    cell: ({ row }) => (
      <span>
        {formatter.format(
          row.original.orderItems.reduce((orderSum, item) => {
            return orderSum + item.product.price
          }, 0),
        )}
      </span>
    ),
  },
  {
    accessorKey: 'isPaid',
    header: 'Pagado',
    cell: ({ row }) =>
      row.original.isPaid ? (
        <CheckIcon className='text-green-500' />
      ) : (
        <X className='text-red-600' />
      ),
  },
]
