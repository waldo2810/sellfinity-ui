'use client'

import { AlertModal } from '@/components/modals/alert-modal'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Billboard } from '@/interfaces'
import { Separator } from '@/components/ui/separator'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { ImageUpload } from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  const params = useParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const t = useTranslations('BillboardForm')
  const title = initialData ? t('Edit.title') : t('Create.title')
  const description = initialData
    ? t('Edit.description')
    : t('Create.description')
  const toastMessage = initialData ? t('Edit.toast') : t('Create.toast')
  const action = initialData ? t('Edit.action') : t('Create.action')

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
  //TODO API ROUTES & SEO AND ACCESIBILITY
  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setIsLoading(true)
      if (initialData) {
        await axios.put(`/api/billboards/${params.billboardId}`, data)
      } else {
        await axios.post(`/api/billboards`, data)
      }
      router.refresh()
      router.push(`/billboards`)
      toast.success(toastMessage)
    } catch (error: any) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
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
            Delete
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
                <FormLabel>{t('Label.backgroundImage')}</FormLabel>
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
                  <FormLabel>{t('Label.label')}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={t('Placeholder.label')}
                      {...field}
                    />
                  </FormControl>
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
