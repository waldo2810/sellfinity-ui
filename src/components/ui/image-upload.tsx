import { CldUploadWidget } from 'next-cloudinary'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import { Button } from './button'
import { useEffect, useState } from 'react'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value
}) => {
  const UPLOAD_PRESET = 'eowbpzrv'
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map(url => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="icon"
                aria-label="remove added image"
                title="remove added image"
              >
                <Trash />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset={UPLOAD_PRESET}>
        {({ open }) => {
          const onClick = () => {
            open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              aria-label="upload image"
              title="upload image"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Subir imagen
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
