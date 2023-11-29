import React, { use, useState, useEffect } from 'react'

type Questions = {
  question: string
  answer: string[]
  correctAnswer: string
}
type OtherQuestion = string[]

function Questions() {
  const [questions, setQuestions] = useState<Questions[]>([])
  const [otherQuestions, setOtherQuestions] = useState<OtherQuestion[]>([])

  useEffect(() => {
    const prompt = localStorage.getItem('question-prompts')
    const data = JSON.parse(prompt!)

    const { questions, otherQuestions } = data

    if (data) {
      setQuestions(questions)
      setOtherQuestions(otherQuestions)
    }
  }, [])

  return (
    <div className="bg-gray-700 bg-opacity-10 backdrop-blur-md rounded-md p-10">
      <h3 className="text-3xl font-sans font-medium">Question </h3>
      <p className="text-sm text-muted-foreground">Here are some questions that you might want to focus on</p>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-4"
      ></div>

      {questions.map((question, index) => (
        <div
          key={index}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col space-y-2 mb-6">
            <p className="text-lg font-semibold">
              {index + 1}. {question.question}
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              {question.answer.map((answer, index) => (
                <p key={index}>
                  {index + 1}. {answer} {answer == question.correctAnswer && <span className="text-muted">✅</span>}
                </p>
              ))}
            </p>
          </div>
        </div>
      ))}

      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-4 mt-8 mb-8"
      ></div>

      <h3 className="text-3xl font-sans font-medium">Other Questions </h3>
      <p className="text-sm text-muted-foreground mb-8">
        Some other questions you might like to checkout are listed below{' '}
      </p>

      {otherQuestions.map((question, index) => (
        <div
          key={index}
          className="flex flex-col space-y-4"
        >
          <div className="flex flex-col space-y-2 mb-6">
            <p className="text-md font-semibold">
              {index + 1}. {question}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Questions
