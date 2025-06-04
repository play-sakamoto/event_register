import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MemoryFormData } from '../../../types/memory'
import { updateMemory } from '../_hooks/updateMemory'
import { getShowMemory } from '../_hooks/getShowMemory'
import { fetchCurrentUser } from '../../../services/auth'
import MemoryForm from '../_components/memory-form'
import Spinner from '../../../components/ui/spinner'

const MemoryEditPage = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState<Partial<MemoryFormData>>({})
  const [fetchError, setFetchError] = useState<string | undefined>(undefined)
  const [formError, setFormError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const fetchMemory = async () => {
    if (!id) return
    try {
      const memory = await getShowMemory(id)
      setFormData({
        title: memory.title,
        body: memory.body,
        public_flag: memory.public_flag,
        image_url: memory.image_url,
      })

      const currentUser = await fetchCurrentUser()
      const isOwner = currentUser?.id === memory.user_id

      if (!isOwner) {
        navigate('/memories')
        return
      }
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error.message)
      } else {
        setFetchError('不明なエラーが発生しました')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMemory()
  }, [id])

  if (loading) {
    return <Spinner />
  }

  if (fetchError) {
    return (
      <div className="mt-20 text-center text-red-500">
        データの取得に失敗しました：{fetchError}
      </div>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files
  if (files && files.length > 0) {
    setFormData({
      ...formData,
      images: Array.from(files), // ← 複数ファイルを配列で保持
    })
  }
}


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!id) return
    e.preventDefault()
    setFormError(undefined)
    try {
      await updateMemory(id, formData)
      navigate(`/memories/${id}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFormError(error.message)
      } else {
        setFormError('不明なエラーが発生しました')
      }
    }
  }

  return (
    <div className="mx-auto my-16 max-w-[720px]">
      <h1 className="text-3xl font-bold">思い出編集</h1>
      <MemoryForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onFileChange={handleFileChange}
        error={formError}
        id={id}
      />
      <div className="mt-4">
        <Link
          to={`/memories/${id}`}
          className="inline-block rounded-md bg-gray-600 px-5 py-3 text-white transition-colors duration-300 hover:bg-gray-500"
        >
          前の画面に戻る
        </Link>
      </div>
    </div>
  )
}

export default MemoryEditPage
