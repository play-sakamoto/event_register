import { Profile } from '../../../types/profile'

export const getProfile = async (): Promise<Profile> => {
  const res = await fetch('/api/v1/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('profileの取得に失敗しました')
  }

  const data = await res.json()

  return data
}
