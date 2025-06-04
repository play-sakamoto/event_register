import React from 'react'
import { Link } from 'react-router-dom'
import { Memory } from '../../../types/memory'
import { formatJapaneseDate } from '../../../utils/dateFormatter'

type Props = {
  memory: Memory
}

export default function MemoryCard({ memory }: Props) {
  return (
    <div className="max-w-sm overflow-hidden rounded shadow-md">
      <Link
        to={`/memories/${memory.id}`}
        className="mb-2 block text-xl font-bold transition-opacity hover:opacity-80"
      >
        <div className="relative aspect-video max-h-[200px] w-full">
          <img
            className="h-full w-full object-cover"
            src={memory.image_url || '/assets/default.png'}
            alt="memory image"
          />
          {memory.public_flag === false && (
            <div className="absolute top-2 left-2 rounded bg-gray-800 px-2 py-1 text-xs text-white shadow">
              非公開
            </div>
          )}
        </div>
        <div className="px-6 py-4">
          <div>{memory.title}</div>
          <p className="line-clamp-2 text-base text-gray-700">{memory.body}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="mr-2 mb-2 inline-block text-sm font-semibold text-gray-400">
            {formatJapaneseDate(memory.created_at)}
          </span>
          <span className="mr-2 mb-2 inline-block text-sm font-semibold text-gray-400">
            {memory.user_name}
          </span>
        </div>
      </Link>
    </div>
  )
}
