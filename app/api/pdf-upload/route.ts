import { promises as fs } from 'fs' // To save the file temporarily
import { v4 as uuidv4 } from 'uuid' // To generate a unique filename
import PDFParser from 'pdf2json'
import { getPredicton } from '@/lib/api'
import { cleanAndFormatLecture } from '@/lib/utils'
import { getQuestions } from '@/lib/ai'

const parsePDF = (filePath: string) => {
  let parsedText = ''
  return new Promise((resolve, reject) => {
    const pdfParser = new (PDFParser as any)(null, 1)

    pdfParser.on('pdfParser_dataError', (errData: { parserError: any }) => {
      console.error(errData.parserError)
      reject(errData.parserError)
    })

    pdfParser.on('pdfParser_dataReady', () => {
      parsedText = pdfParser.getRawTextContent()
      resolve(parsedText)
    })

    pdfParser.loadPDF(filePath)
  })
}

export const POST = async (req: any, res: any) => {
  const formData = await req.body()
  console.log('formData', formData)
  const uploadedFiles = formData.getAll('pdf')
  let fileName = ''
  let parsedText = ''

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[0]

    // Check if uploadedFile is of type File
    if (uploadedFile instanceof File) {
      fileName = uuidv4()
      const tempFilePath = `/tmp/${fileName}.pdf`
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer())
      await fs.writeFile(tempFilePath, fileBuffer)

      try {
        parsedText = (await parsePDF(tempFilePath)) as string
        parsedText = cleanAndFormatLecture(parsedText)
        console.log(parsedText)

        const result = await getPredicton(parsedText)
        console.log('result>>>>', result)

        return res.json({ data: result, parsedQuestion: parsedText })
      } catch (error) {
        console.error('Error parsing PDF:', error)
        return res.json({ data: error })
      }
    }
  }
}
