import { getCSRFToken } from '../../../utils/csrf'

export const deleteMemory = async (id: string | undefined) => {
  const res = await fetch(`/api/v1/memories/${id}`, {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'include',
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.error || '削除に失敗しました')
  }
  return json
}
