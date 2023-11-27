'use client'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { parseAndUploadFile } from '@/lib/api'

function PDFContent() {
  const [file, setFile] = React.useState(null)

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
      const res = await parseAndUploadFile(formData)
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
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
        className="mt-4"
        onClick={uploadFile}
      >
        Upload
      </Button>
    </>
  )
}

export default PDFContent
