import { Memory } from '../../../types/memory'

export const getMemories = async (): Promise<Memory[]> => {
  const res = await fetch('/api/v1/memories', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('思い出の取得に失敗しました')
  }

  const data = await res.json()

  return data
}
