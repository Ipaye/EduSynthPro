const createURL = (path: string) => {
  return window.location.origin + path
}

export const parseAndUploadFile = async (file: FormData) => {
  const res = await fetch(
    new Request(createURL('/api/pdf-upload'), {
      method: 'POST',
      body: file
    })
  )

  if (res.ok) {
    const data = await res.json()
    console.log('Prediction:', data)
    return data
  }
}

export const uploadText = async (file: string) => {
  const res = await fetch(
    new Request(createURL('/api/text-upload'), {
      method: 'POST',
      body: file
    })
  )

  if (res.ok) {
    const data = await res.json()
    console.log('Prediction:', data)
    return data
  }
}

export const getPredicton = async (text: string) => {
  console.log(process.env.MODEL_API)

  const res = await fetch(
    new Request(`${process.env.MODEL_API}/summarize`, {
      method: 'POST',
      body: JSON.stringify({ text })
    })
  )

  console.log('res', res)

  if (res.ok) {
    const data = await res.json()
    console.log('Prediction:', data)
    return data
  }
}

export const callQuestionPromptAPI = async (content: string) => {
  const res = await fetch(
    new Request(createURL('/api/question-prompts'), {
      method: 'POST',
      body: JSON.stringify({ content })
    })
  )

  if (res.ok) {
    const data = await res.json()
    console.log('Prediction:', data)
    return data
  }
}
