import { MemoryFormData } from '../../../types/memory'
import { getCSRFToken } from '../../../utils/csrf'

// export const createMemory = async (data: Partial<MemoryFormData>) => {
//   const formData = new FormData()
//   formData.append('memory[title]', data.title || '')
//   formData.append('memory[body]', data.body || '')
//   formData.append('memory[public_flag]', String(data.public_flag || false))
//   const file = data.image
//   if (file) {
//     const renamedFile = new File([file], 'upload.png', { type: file.type })
//     formData.append('memory[image]', renamedFile)
//   }

//   const res = await fetch('/api/v1/memories', {
//     method: 'POST',
//     headers: {
//       'X-CSRF-Token': getCSRFToken(),
//     },
//     credentials: 'include',
//     body: formData,
//   })

//   const json = await res.json()

//   if (!res.ok) {
//     throw new Error(json?.error || '作成に失敗しました')
//   }

//   return json
// }
export const createMemory = async (data: Partial<MemoryFormData>) => {
  const formData = new FormData()
  formData.append('memory[title]', data.title || '')
  formData.append('memory[body]', data.body || '')
  formData.append('memory[public_flag]', String(data.public_flag || false))

  const files = data.images || []
  files.forEach((file, index) => {
    const renamedFile = new File([file], `upload_${index}.png`, { type: file.type })
    formData.append(`memory[memory_images_attributes][${index}][image]`, renamedFile)
  })

  const res = await fetch('/api/v1/memories', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'include',
    body: formData,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json?.error || '作成に失敗しました')
  }

  return json
}
