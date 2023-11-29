import { OpenAI } from 'langchain/llms/openai'
import z from 'zod'
import { StructuredOutputParser } from 'langchain/output_parsers'

import { PromptTemplate } from 'langchain/prompts'
/** @type {*} */
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    questions: z
      .array(
        z
          .object({
            question: z.string().describe('the question that was generated from the content passed in'),
            answer: z
              .array(z.string().describe('a list of 4 possible answers to the question generated.'))
              .describe(
                'an array contain 4 potential answers to the question that was generated from the content passed in.'
              ),
            correctAnswer: z
              .string()
              .describe('the correct answer to the question generated from the content passed in.')
          })
          .describe('an list containing 10 questions from the content passed and a nested array of the answers')
      )
      .describe('a list of 10 questions generated from the content passed in'),
    otherQuestions: z.array(z.string()).describe('a list of 10 other questions from the content passed in')
  })
)

const createPrompt = async (content: any) => {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Generete both multiple choice questions and open ended questions from this extracted text. for the multiple choice, Generete 10 different questions. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions }
  })

  const input = await prompt.format({ entry: content })

  return input
}

export const getQuestions = async (content: string) => {
  const input = await createPrompt(content)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const result = await model.call(input)

  try {
    return parser.parse(result)
  } catch (error) {
    console.log('🔴 - ', error)
  }
}
