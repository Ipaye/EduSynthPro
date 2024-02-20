'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { callQuestionPromptAPI } from '@/lib/api'
import Questions from './Questions'

function SummarizedContent() {
  const router = useRouter()
  const [wordCount, setWordCount] = useState(0)
  const [pdfCount, setPdfCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState(false)

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
    if (pfdfContent) {
      setPdfCount(pfdfContent.split(/\s+/).filter(Boolean).length)
    }
  }, [summary, pfdfContent])

  const generatePrompts = async () => {
    try {
      setLoading(true)
      localStorage.removeItem('question-prompts')

      const { data } = await callQuestionPromptAPI(pfdfContent!)
      localStorage.setItem('question-prompts', JSON.stringify(data))
      setLoading(false)
      setQuestions(true)
    } catch (error) {
      setQuestions(false)
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap justify-between">
        <div className="rounded-lg relative w-full md:w-[45%]">
          <h4 className="text-lg font-sans">Original Text</h4>
          <textarea
            value={pfdfContent || ''}
            className="w-full h-[400px] p-2 mt-4 border read-only border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />

          <p className="mt-2">Word count: {pdfCount}</p>
        </div>
        <div className="rounded-lg relative w-full md:w-[45%]">
          <h4 className="text-lg font-sans">Summarized Text</h4>
          <textarea
            value={summary || ''}
            className="w-full h-[400px] p-2 mt-4 border read-only border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
          <p className="mt-2">Word count: {wordCount}</p>
        </div>
      </div>

      <Button
        disabled={loading ? true : false}
        className="mt-5 cursor-pointer"
        onClick={generatePrompts}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {loading ? '...Generating Question' : 'Generate Question prompts'}
      </Button>

      {questions && (
        <>
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border h-[1px] w-full my-4"
          ></div>
          <Questions />
        </>
      )}
    </div>
  )
}

export default SummarizedContent
