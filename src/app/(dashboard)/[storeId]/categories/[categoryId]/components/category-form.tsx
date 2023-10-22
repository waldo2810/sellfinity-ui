'use client'

import { saveCategory } from '@/actions/categories/save-category'
import appEndpoints from '@/app/api/app.endpoints'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Category } from '@/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import z from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData: Category | null
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const title = initialData ? 'Editar' : 'Crear nueva'
  const description = initialData ? 'Editar existente' : 'Crear nueva'
  const toastMessage = initialData ? 'Editado con exito' : 'Creada con exito'
  const action = initialData ? 'Guardar cambios' : 'Crear'

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`${appEndpoints.categories}/${params.billboardId}`)
      router.refresh()
      router.push(`/categories`)
      toast.success('Billboard deleted.')
    } catch (error: any) {
      toast.error(
        'Make sure you removed all products using this category first.',
      )
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.put(
          `${appEndpoints.categories}/${params.categoryId}?storeId=${params.storeId}`,
          data,
        )
      } else {
        await saveCategory(params.storeId, data)
      }
      router.refresh()
      router.back()
      toast.success(toastMessage)
    } catch (error: any) {
      console.log('[CLIENT] error posting ---->', error)
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  })

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className='flex items-center justify-between gap-4'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant='destructive'
            size='sm'
            onClick={() => setIsOpen(true)}
            aria-label='Delete'
            title='Delete'
          >
            <Trash className='h-4 w-4' />
            Eliminar categoría
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='md:grid md:grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Articulos para el hogar'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            className='ml-auto'
            type='submit'
            size='smFlexMdFull'
            aria-label='action'
            title='action'
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
