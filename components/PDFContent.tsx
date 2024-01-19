'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { parseAndUploadFile } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

function PDFContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = React.useState(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileChange = (e: any) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }

  const uploadFile = async () => {
    const formData = new FormData()
    try {
      if (file !== null) {
        formData.append('pdf', file)
      }
      if (!file) {
        toast({
          description: 'Please select and upload a pdf file',
          variant: 'destructive'
        })
        return
      }
      setIsLoading(true)
      const res = await parseAndUploadFile(formData)
      setIsLoading(false)

      localStorage.setItem('summary', res.data.summary)
      localStorage.setItem('pdf-content', res.parsedQuestion)

      router.push('/summary-content')
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-10 rounded-lg relative">
      {isLoading && (
        <div className="absolute m-0 p- top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
          <p className="text-white text-2xl">summarizing docunment...</p>
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">PDF summary</h2>
        <p className="text-sm text-muted-foreground">Please select and upload a pdf slide. (maximum of 20 pages)</p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-4"
      ></div>

      {/* PDF Input */}
      <div className="space-y-4">
        <Label
          htmlFor="pdf"
          className="text-sm font-medium"
        >
          File to Upload
        </Label>
        <Input
          id="pdf"
          name="pdf"
          onChange={handleFileChange}
          type="file"
          accept="application/pdf"
          className="w-full"
        />
      </div>
      <Button
        className="mt-4 cursor-pointer"
        onClick={uploadFile}
      >
        Upload
      </Button>
    </div>
  )
}

export default PDFContent
