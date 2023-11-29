import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function cleanAndFormatLecture(text: string) {
  // Split the text into sections based on the '----------------' delimiter
  const sections = text.split(/-+Page \(\d+\) Break-+/)
  // Initialize cleanedText
  let cleanedText = ''
  // Process each section and format it
  sections.forEach((section, i) => {
    // Remove leading and trailing whitespaces
    section = section.trim()
    // Skip empty sections
    if (!section) {
      return
    }
    // Add section heading if not the first section
    if (i > 0) {
      cleanedText += `\n\n---------------- Page (${i}) Break ----------------\n\n`
    }
    // Add the cleaned section to the result
    cleanedText += section
  })

  const regex = /[^a-zA-Z0-9\s.,!?()-]|(http[s]?:\/\/[^\s]+)/g
  cleanedText = cleanedText.replace(regex, '')
  cleanedText = cleanedText.replace(/\n-+ Page \(\d+\) Break -+\n/g, ' ')
  cleanedText = cleanedText.replace(/\n+/g, ' ').replace(/\s+/g, ' ')

  return cleanedText
}
