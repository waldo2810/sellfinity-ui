'use client'

import appEndpoints from '@/app/api/app.endpoints'
import ColorBall from '@/components/color-ball'
import { AlertModal } from '@/components/modals/alert-modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Heading } from '@/components/ui/heading'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Category, Color, ProductData, Size } from '@/interfaces'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Command as CommandPrimitive } from 'cmdk'
import { Trash, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array().optional(),
  price: z.coerce.number().min(1),
  categoryIds: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  }),
  colorIds: z.array(z.string()).optional(),
  sizeIds: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
})
type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: ProductData | null
  categories: Category[]
  colors: Color[]
  sizes: Size[]
}

export const ProductForm: FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors
}) => {
  console.log(initialData)

  const defaultValues = initialData
    ? {
        ...initialData.product,
        categoryIds: initialData.categories,
        colorIds: initialData.colors,
        sizeIds: initialData.sizes,
        images: initialData.images,
        price: parseFloat(String(initialData?.product.price))
      }
    : {
        name: '',
        images: [],
        price: 0,
        categoryIds: [],
        colorIds: [],
        sizeIds: [],
        isFeatured: false,
        isArchived: false
      }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    // @ts-ignore
    defaultValues
  })

  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [openCommand, setOpenCommand] = useState<boolean>(false)
  const [openSizesCommand, setOpenSizesCommand] = useState<boolean>(false)
  const [openColorsCommand, setOpenColorsCommand] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialData ? defaultValues.categoryIds : []
  )
  // const [selectedCategories, setSelectedCategories] = useState<any[]>([])
  // const [selectedSizes, setSelectedSizes] = useState<Size[]>([])
  const [selectedSizes, setSelectedSizes] = useState<Size[]>(
    initialData ? defaultValues.sizeIds : []
  )
  const [selectedColors, setSelectedColors] = useState<Color[]>(
    initialData ? defaultValues.colorIds : []
  )
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const title = initialData ? 'Editar producto' : 'Crear producto'
  const description = initialData
    ? 'Edita un producto de tu tienda'
    : 'Add a new producto'
  const toastMessage = initialData
    ? 'Producto actualizado.'
    : 'Producto creado.'
  const action = initialData ? 'Guardar cambios' : 'Crear'

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.put(
          `${appEndpoints.products}/${params.productId}?storeId=${params.storeId}`,
          data
        )
      } else {
        await axios.post(
          `${appEndpoints.products}?storeId=${params.storeId}`,
          data
        )
      }
      router.refresh()
      router.push(`/${params.storeId}/products`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(
        `${appEndpoints.products}/${params.productId}?storeId=${params.storeId}`
      )
      router.refresh()
      router.push(`/${params.storeId}/products`) //TODO VERIFY
      toast.success('Producto eliminado.')
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }
  const handleUnselectCategory = useCallback((item: Category) => {
    setSelectedCategories(prev => prev.filter(s => s.id !== item.id))
  }, [])
  const handleUnselectSize = useCallback((item: Size) => {
    setSelectedSizes(prev => prev.filter(s => s.id !== item.id))
  }, [])
  const handleUnselectColor = useCallback((item: Color) => {
    setSelectedColors(prev => prev.filter(s => s.id !== item.id))
  }, [])
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            setSelectedCategories(prev => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    []
  )

  const selectableCategories = categories.filter(
    (category: Category) => !selectedCategories.includes(category)
  )
  const selectableSizes = sizes.filter(
    (size: Size) => !selectedSizes.includes(size)
  )
  const selectableColors = colors.filter(
    (color: Color) => !selectedColors.includes(color)
  )

  useEffect(() => {
    const categoryIds = selectedCategories.map(cat => cat.id.toString())
    const sizeIds = selectedSizes.map(size => size.id.toString())
    const colorIds = selectedColors.map(color => color.id.toString())

    form.setValue('categoryIds', categoryIds)
    form.setValue('sizeIds', sizeIds)
    form.setValue('colorIds', colorIds)
  }, [form, selectedCategories, selectedColors, selectedSizes])

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagenes</FormLabel>
                <FormControl>
                  <ImageUpload
                    // @ts-ignore
                    value={field.value.map(image => image.url)}
                    disabled={loading}
                    // @ts-ignore
                    onChange={url => field.onChange([...field.value, { url }])}
                    onRemove={url =>
                      field.onChange([
                        // @ts-ignore
                        ...field.value.filter(current => current.url !== url)
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Blusa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorías</FormLabel>
                  <Command
                    onKeyDown={handleKeyDown}
                    className="overflow-visible bg-transparent"
                  >
                    <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <div className="flex gap-1 flex-wrap">
                        {selectedCategories.map(category => {
                          return (
                            <Badge key={category.id} variant="secondary">
                              {category.name}
                              <button
                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    handleUnselectCategory(category)
                                  }
                                }}
                                onMouseDown={e => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                                onClick={() => handleUnselectCategory(category)}
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </Badge>
                          )
                        })}
                        {/* Avoid having the "Search" Icon */}
                        <CommandPrimitive.Input
                          ref={inputRef}
                          value={inputValue}
                          onValueChange={setInputValue}
                          onBlur={() => setOpenCommand(false)}
                          onFocus={() => setOpenCommand(true)}
                          placeholder="Escribe una categoría..."
                          className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2">
                      {openCommand && selectableCategories.length > 0 ? (
                        <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            {selectableCategories.map(category => {
                              return (
                                <CommandItem
                                  key={category.id}
                                  onMouseDown={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                  }}
                                  onSelect={value => {
                                    setInputValue('')
                                    setSelectedCategories(prev => [
                                      ...prev,
                                      category
                                    ])
                                  }}
                                  className={'cursor-pointer'}
                                >
                                  {category.name}
                                </CommandItem>
                              )
                            })}
                          </CommandGroup>
                        </div>
                      ) : null}
                    </div>
                  </Command>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tallas</FormLabel>
                  <Command
                    onKeyDown={handleKeyDown}
                    className="overflow-visible bg-transparent"
                  >
                    <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <div className="flex gap-1 flex-wrap">
                        {selectedSizes.map(size => {
                          return (
                            <Badge key={size.id} variant="secondary">
                              {size.value}
                              <button
                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    handleUnselectSize(size)
                                  }
                                }}
                                onMouseDown={e => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                                onClick={() => handleUnselectSize(size)}
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </Badge>
                          )
                        })}
                        {/* Avoid having the "Search" Icon */}
                        <CommandPrimitive.Input
                          ref={inputRef}
                          value={inputValue}
                          onValueChange={setInputValue}
                          onBlur={() => setOpenSizesCommand(false)}
                          onFocus={() => setOpenSizesCommand(true)}
                          placeholder="Escribe una talla..."
                          className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2">
                      {openSizesCommand && selectableSizes.length > 0 ? (
                        <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            {selectableSizes.map(size => {
                              return (
                                <CommandItem
                                  key={size.id}
                                  onMouseDown={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                  }}
                                  onSelect={value => {
                                    setInputValue('')
                                    setSelectedSizes(prev => [...prev, size])
                                  }}
                                  className={'cursor-pointer'}
                                >
                                  {size.name} ({size.value})
                                </CommandItem>
                              )
                            })}
                          </CommandGroup>
                        </div>
                      ) : null}
                    </div>
                  </Command>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colores</FormLabel>
                  <Command
                    onKeyDown={handleKeyDown}
                    className="overflow-visible bg-transparent"
                  >
                    <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <div className="flex gap-1 flex-wrap">
                        {selectedColors.map(color => {
                          return (
                            <Badge key={color.id} variant="secondary">
                              <ColorBall
                                colorValue={color.value}
                                showValue={true}
                              />
                              <button
                                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={e => {
                                  if (e.key === 'Enter') {
                                    handleUnselectColor(color)
                                  }
                                }}
                                onMouseDown={e => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                                onClick={() => handleUnselectColor(color)}
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </Badge>
                          )
                        })}
                        {/* Avoid having the "Search" Icon */}
                        <CommandPrimitive.Input
                          ref={inputRef}
                          value={inputValue}
                          onValueChange={setInputValue}
                          onBlur={() => setOpenColorsCommand(false)}
                          onFocus={() => setOpenColorsCommand(true)}
                          placeholder="Escribe un color..."
                          className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2">
                      {openColorsCommand && selectableColors.length > 0 ? (
                        <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                          <CommandGroup className="h-full overflow-auto">
                            {selectableColors.map(color => {
                              return (
                                <CommandItem
                                  key={color.id}
                                  onMouseDown={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                  }}
                                  onSelect={value => {
                                    setInputValue('')
                                    setSelectedColors(prev => [...prev, color])
                                  }}
                                  className={'cursor-pointer'}
                                >
                                  <ColorBall
                                    colorValue={color.value}
                                    showValue={true}
                                  />
                                </CommandItem>
                              )
                            })}
                          </CommandGroup>
                        </div>
                      ) : null}
                    </div>
                  </Command>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Destacado</FormLabel>
                    <FormDescription>
                      Este producto aparecerá en la página principal
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archivado</FormLabel>
                    <FormDescription>
                      Este producto no aparecerá a los clientes.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
