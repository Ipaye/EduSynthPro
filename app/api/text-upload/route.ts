import { NextResponse, NextRequest } from 'next/server'
import { getPredicton } from '@/lib/api'

export const POST = async (req: NextRequest) => {
  const textContent = await req.text()

  try {
    const result = await getPredicton(textContent)
    console.log('result>>>>', result)

    return NextResponse.json({ data: result, parsedQuestion: textContent })
  } catch (error) {
    console.error('Error parsing Text:', error)
    return NextResponse.json({ data: error })
  }
}
