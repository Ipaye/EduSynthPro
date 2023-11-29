import SummarizedContent from '@/components/SummarizedContent'
import React from 'react'

function SummaryContent() {
  return (
    <div>
      <h3 className="text-3xl font-sans font-medium">Summary Content</h3>
      <p className="text-sm text-muted-foreground">Preview of the result gotten from trained model</p>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-4"
      ></div>
      <SummarizedContent />
    </div>
  )
}

export default SummaryContent
