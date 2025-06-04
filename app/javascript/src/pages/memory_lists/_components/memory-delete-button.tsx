import React from 'react'
import { deleteMemory } from '../_hooks/deleteMemory'
import { useNavigate } from 'react-router-dom'

export default function MemoryDeleteButton({
  memoryId,
}: {
  memoryId: string | undefined
}) {
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (confirm('本当に削除しますか？')) {
      try {
        await deleteMemory(memoryId)
        navigate('/memories')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        } else {
          alert('削除に失敗しました')
        }
      }
    }
  }

  return (
    <button
      className="cursor-pointer rounded bg-red-600 px-5 py-2 text-white transition-colors duration-300 hover:bg-red-500"
      onClick={handleDelete}
    >
      削除
    </button>
  )
}
