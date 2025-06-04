import React, { useEffect, useState } from 'react'
declare global {
  interface Window {
    Swiper: any;
  }
}

// Extend the Window interface to include Swiper

import { Link, useParams } from 'react-router-dom'
import { getShowMemory } from '../_hooks/getShowMemory'
import { Memory } from '../../../types/memory'
import { useAuth } from '../../../hooks/use-auth'
import MemoryDeleteButton from '../_components/memory-delete-button'
import Spinner from '../../../components/ui/spinner'
import { formatJapaneseDate } from '../../../utils/dateFormatter'

const MemoryShowPage = () => {
  const { id } = useParams<{ id: string }>()
  const [memory, setMemory] = useState<Memory | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  const fetchMemory = async () => {
    if (!id) return
    try {
      const memory = await getShowMemory(id)
      setMemory(memory)
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
    if (window.Swiper) {
      new window.Swiper('.swiper-container', {
        loop: true,
        speed: 1500, // 少しゆっくり(デフォルトは300)
        autoplay: { // 自動再生
          delay: 1500, // 1.5秒後に次のスライド
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    }
    }, [memory?.image_urls])
  useEffect(() => {
    fetchMemory()
  }, [id])

  if (loading) {
    return <Spinner />
  }

  if (!memory) {
    return (
      <div className="mx-auto my-16 max-w-[720px] text-center">
        <p className="text-lg">思い出が見つかりませんでした。</p>
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

  const isOwner = currentUser?.id === memory.user_id
  return (
    <div className="mx-auto my-16 max-w-[720px]">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{memory.title}</h1>
        <Link
          to="/memories"
          className="inline-block rounded-md bg-gray-600 px-5 py-3 text-white transition-colors duration-300 hover:bg-gray-500"
        >
          一覧に戻る
        </Link>
      </div>
      <div className="my-8 w-full rounded-lg bg-white px-6 py-8 shadow-md">
        {memory.public_flag == false && (
          <p className="mb-4 w-fit rounded bg-gray-200 px-2 py-1 text-sm text-gray-700">
            非公開
          </p>
        )}
        <div>
          {memory.image_urls && memory.image_urls.length > 1 ? (
            // 複数画像なら Swiper
            <div className="swiper-container mb-4 rounded-lg overflow-hidden">
              <div className="swiper-wrapper">
                {memory.image_urls.map((url, idx) => (
                  <div className="swiper-slide" key={idx}>
                    <img
                      src={url}
                      alt={`memory-image-${idx}`}
                      className="w-full h-auto object-cover"
                    />
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                  </div>
                ))}
              </div>
              <div className="swiper-pagination"></div>
              {/* ページネーション / ナビボタン */}
            </div>
          ) : (
            // 画像が0枚または1枚なら通常表示
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={
                  memory.image_urls && memory.image_urls.length === 1
                    ? memory.image_urls[0]
                    : '/assets/default.png'
                }
                alt={memory.title}
                className="w-full h-auto object-cover"
              />
            </div>
          )}


        <div>
          <p>作成者 : {memory.user_name}</p>
          <p>作成日 : {formatJapaneseDate(memory.created_at)}</p>
        </div>
        <div>
          <p className="mt-4 text-base text-gray-700">{memory.body}</p>
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        {isOwner && (
          <div className="flex w-full items-center justify-between">
            <Link
              to={`/memories/${memory.id}/edit`}
              className="block rounded bg-blue-600 px-5 py-2 text-white transition-colors duration-300 hover:bg-blue-500"
            >
              編集する
            </Link>
            <MemoryDeleteButton memoryId={id} />
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default MemoryShowPage
