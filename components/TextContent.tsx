'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'

function TextContent() {
  const [text, setText] = useState('')
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (e: any) => {
    const newText = e.target.value
    setText(newText)
    setWordCount(newText.split(/\s+/).filter(Boolean).length)
  }
  return (
    <div>
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

      <Button className="mt-4">Upload</Button>
    </div>
  )
}

export default TextContent
