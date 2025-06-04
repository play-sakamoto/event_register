import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../_hooks/getProfile'
import { Profile } from '../../../types/profile'
import MemoryCard from '../../memory_lists/_components/memory-card'
import Spinner from '../../../components/ui/spinner'

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    try {
      const fetchedProfile = await getProfile()
      setProfile(fetchedProfile)
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('不明なエラーが発生しました')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (!profile) {
    return (
      <div className="mx-auto my-16 max-w-[720px] text-center">
        <p className="text-lg">ページが見つかりませんでした。</p>
        <Link
          to="/memories"
          className="mx-auto mt-4 block w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          思い出一覧に戻る
        </Link>
      </div>
    )
  }

  if (error) {
    return <div className="pt-9 text-center text-red-500">{error}</div>
  }
  return (
    <div className="mx-auto my-10 w-[90%] max-w-[1400px]">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        {profile.name}さんの思い出一覧
      </h1>
      <div className="mb-6 text-right">
        <Link
          to="/memories/new"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-lg text-white transition-colors duration-300 hover:bg-blue-500"
        >
          新規作成
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {profile.memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>
    </div>
  )
}

export default ProfilePage
