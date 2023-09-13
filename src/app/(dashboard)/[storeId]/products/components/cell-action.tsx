'use client'

import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import appEndpoints from '@/app/api/app.endpoints'
import { ApiError } from 'next/dist/server/api-utils'
import { ProductColumn } from './columns'

interface CellActionProps {
  data: ProductColumn
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onConfirm = async () => {
    const URL = `${appEndpoints.products}/${data.product.id}?storeId=${params.storeId}`
    try {
      setLoading(true)
      const res = await fetch(URL, { method: 'DELETE' })
      if (!res.ok) {
        throw new ApiError(res.status, 'Error')
      }
      toast.success('Se ha eliminado el registro')
      router.refresh()
    } catch (error: unknown) {
      if (error instanceof ApiError && error.statusCode === 409) {
        toast.error(
          'Asegurate de que el producto no esté siendo usada por productos.'
        )
        return
      }
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  const onCopy = (id: number) => {
    navigator.clipboard.writeText(id.toString())
    toast.success('Se ha copiado al portapapeles')
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.product.id)}
            className="cursor-pointer"
          >
            <Copy className="mr-2 h-4 w-4" /> Copiar ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/products/${data.product.id}`)
            }
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" /> Actualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Trash className="mr-2 h-4 w-4" /> Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
