import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Memory } from '../../types/memory'
import MemoryCard from './_components/memory-card'
import { getMemories } from './_hooks/getMemories'

const MemoryListPage = () => {
  const [memories, setMemories] = useState<Memory[]>([])

  const fetchMemories = async () => {
    const fetchedMemories = await getMemories()
    setMemories(fetchedMemories)
  }

  useEffect(() => {
    fetchMemories()
  }, [])

  return (
    <div className="mx-auto my-10 w-[90%] max-w-[1400px]">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">思い出一覧</h1>
      <div className="mb-6 text-right">
        <Link
          to="/memories/new"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-lg text-white transition-colors duration-300 hover:bg-blue-500"
        >
          新規作成
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>
    </div>
  )
}

export default MemoryListPage
