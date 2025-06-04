import { MemoryFormData } from '../../../types/memory'
import { getCSRFToken } from '../../../utils/csrf'

export const updateMemory = async (
  id: string | undefined,
  data: Partial<MemoryFormData>,
) => {
  const formData = new FormData()
  formData.append('memory[title]', data.title || '')
  formData.append('memory[body]', data.body || '')
  formData.append('memory[public_flag]', String(data.public_flag || false))
  const file = data.image
  if (file) {
    const renamedFile = new File([file], 'upload.png', { type: file.type })
    formData.append('memory[image]', renamedFile)
  }

  const res = await fetch(`/api/v1/memories/${id}`, {
    method: 'PUT',
    headers: {
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'include',
    body: formData,
  })

  const json = await res.json()

  if (!res.ok) {
    throw new Error(json?.error || '更新に失敗しました')
  }

  return json
}
