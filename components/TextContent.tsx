'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { uploadText } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

function TextContent() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  const handleTextChange = (e: any) => {
    const newText = e.target.value
    setText(newText)
    setWordCount(newText.split(/\s+/).filter(Boolean).length)
  }

  const uploadFile = async () => {
    try {
      if (!text) {
        toast({
          description: 'Please fill out the text field',
          variant: 'destructive'
        })
        return
      }
      setIsLoading(true)

      const res = await uploadText(text)
      setIsLoading(false)

      localStorage.setItem('summary', res.data.summary)
      localStorage.setItem('pdf-content', text)

      router.push('/summary-content')
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="p-10 rounded-lg relative">
      {isLoading && (
        <div className="absolute m-0 p-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 rounded-lg">
          <p className="text-white text-2xl">summarizing docunment...</p>
        </div>
      )}

      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Text Content</h2>
        <p className="text-sm text-muted-foreground">
          Enter in or paste your text here. file limit should not be exceeded
        </p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-4"
      ></div>

      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-full h-32 p-2 mt-4 border border-gray-300 rounded-md outline-none resize-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
      />
      <p className="mt-2">Word count: {wordCount}</p>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-4"
      ></div>

      <Button
        onClick={uploadFile}
        className="mt-4"
      >
        Upload
      </Button>
    </div>
  )
}

export default TextContent
