'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { callQuestionPromptAPI } from '@/lib/api'

function SummarizedContent() {
  const router = useRouter()
  const [wordCount, setWordCount] = useState(0)

  const [copySuccess, setCopySuccess] = useState('')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary!)
      setCopySuccess('Copied to clipboard!')
    } catch (err) {
      setCopySuccess('Failed to copy text.')
    }
  }

  const pfdfContent = localStorage.getItem('pdf-content')
  const summary = localStorage.getItem('summary')
  if (summary === null) {
    router.replace('/summarize')
  }
  useEffect(() => {
    if (summary) {
      setWordCount(summary.split(/\s+/).filter(Boolean).length)
    }
  }, [summary])

  const generatePrompts = async () => {
    try {
      const data = await callQuestionPromptAPI(pfdfContent!)
      localStorage.setItem('question-prompts', JSON.stringify(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="rounded-lg relative">
        <textarea
          value={summary || ''}
          className="w-full h-[400px] p-2 mt-4 border read-only border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
        {/* <button
          onClick={copyToClipboard}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Copy to Clipboard
        </button>
        {copySuccess && <p className="mt-2 text-green-500">{copySuccess}</p>} */}

        <p className="mt-2">Word count: {wordCount}</p>
      </div>

      <Button
        className="mt-5 cursor-pointer"
        onClick={generatePrompts}
      >
        {' '}
        Generate Question prompts
      </Button>
    </div>
  )
}

export default SummarizedContent
