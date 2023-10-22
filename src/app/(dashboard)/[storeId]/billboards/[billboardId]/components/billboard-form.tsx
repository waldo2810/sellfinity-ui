'use client'

import { saveBillboard } from '@/actions/billboards/save-billboard'
import appEndpoints from '@/app/api/app.endpoints'
import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Loader } from '@/components/ui/loader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Billboard, Category } from '@/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import z from 'zod'

const formSchema = z.object({
  label: z.string().min(1),
  categoryId: z.string().min(1),
  imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
  categories: Category[] | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
  categories
}) => {
  console.log(initialData)
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
      await axios.delete(`/api/billboards/${params.billboardId}`)
      router.refresh()
      router.push(`/billboards`)
      toast.success('Billboard deleted.')
    } catch (error: any) {
      toast.error(
        'Make sure you removed all categories using this billboard first.'
      )
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.put(
          `${appEndpoints.billboards}/${params.billboardId}?storeId=${params.storeId}`,
          data
        )
      } else {
        await saveBillboard(params.storeId,data)
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

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      categoryId: '',
      imageUrl: ''
    }
  })

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex items-center justify-between gap-4">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="sm"
            onClick={() => setIsOpen(true)}
            aria-label="Delete"
            title="Delete"
          >
            <Trash className="h-4 w-4" />
            Eliminar cartelera
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen de fondo</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={isLoading}
                    onChange={url => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Un gran aviso"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField //SELECT COMPONENT
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la categoria a la que pertenece" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map(category => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            className="ml-auto"
            type="submit"
            size="smFlexMdFull"
            aria-label="action"
            title="action"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
