import { useEffect, useRef, useState } from "react"
import type { ChangeEvent } from "react"
import { Button } from "./button"
import { IconPhoto, IconX } from "@tabler/icons-react"

export type ImageSelectProps = {
  /** Called when an upload finishes and returns a public URL */
  onUpload?: (value:any) => void
  handleChange: (file:any) => void
  /** Existing image URL (from DB / form value) */
  value?: string | null
  disabled?: boolean
  accept?: string
  label?: string,
  image?:string|null
}

export const ImageSelect = ({
  onUpload,
  handleChange,
  value,
  disabled,
  accept = "image/*",
  label = "Select Picture",
  image=null
}:ImageSelectProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(image)


  // Sync preview if form already has an image URL (edit mode)
  useEffect(() => {
    if (value) {
      setPreview(value)
     
    }
  }, [value])

  const handleFileChange =  (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // 1️⃣ Create local preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    handleChange(file);
    // 2️⃣ Upload later (S3 / Firebase / etc.)
    if (!onUpload) return

  
      //
      //onUpload(reader.result as string)
      // result should be a public URL
      // ImageSelect does NOT store this
    
  }

  const handleRemove = () => {
    setPreview(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }
  

  return (
    <div>

      {preview ? (
        <div className="relative h-auto max-h-[35vh] min-h-[35vh] w-full overflow-hidden rounded-lg border">
          <img
            src={preview}
            alt="Selected"
            className="h-full w-full object-cover"
          />

          <Button
            type="button"
            onClick={handleRemove}
            className="absolute right-1 top-1 rounded  px-2 py-1 text-xs text-white"
          >
            <IconX />Change Picture
          </Button>

    
        </div>
      ) : (
        <Button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          //className="flex w-full items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground"
        >
         <IconPhoto /> {label}
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}