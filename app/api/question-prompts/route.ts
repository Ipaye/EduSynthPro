import { NextResponse, NextRequest } from 'next/server'
import { log } from 'console'
import { getQuestions } from '@/lib/ai'

export const POST = async (req: NextRequest) => {
  const { content } = await req.json()

  try {
    const data = await getQuestions(content)
    return NextResponse.json({ data })
  } catch (error) {
    console.error('🔴 Error generating questions:', error)
    return NextResponse.json({ data: error })
  }
}
