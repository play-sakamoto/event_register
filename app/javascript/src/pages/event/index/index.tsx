"use client"

import React, { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
// import { Badge } from "../../../components/ui/badge" // Badge not used in the current version after removing status
import { CalendarDays, MoreVertical, Plus, Store, Trash2, Edit, Eye, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { getEvents, deleteEvent } from "../../../services/events"
import { Event } from "../../../types/event"


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const data = await getEvents()
        setEvents(data)
        setError(null)
      } catch (err) {
        setError("イベントの読み込みに失敗しました。")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleDeleteEvent = async (eventId: number) => {
    if (confirm("このイベントを削除しますか？")) {
      try {
        await deleteEvent(eventId)
        setEvents(events.filter((event) => event.id !== eventId))
      } catch (err) {
        setError("イベントの削除に失敗しました。")
        console.error(err)
        // Optionally, show a toast notification for the error
      }
    }
  }

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number | undefined) => {
    if (typeof amount !== 'number') {
      return 'N/A'; // Or some other placeholder for undefined sales
    }
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-gray-700">イベントを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">エラー</h2>
        <p className="text-red-500">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          再読み込み
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">イベント一覧</h1>
              <p className="text-gray-600">開催予定・開催中・過去のイベントを管理できます</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/events/new">
                <Button size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  新しいイベントを作成
                </Button>
              </Link>
            </div>
          </div>

          {/* Events Grid */}
          {events.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Store className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">イベントがありません</h3>
                <p className="text-gray-600 mb-6">最初のイベントを作成して始めましょう</p>
                <Link to="/events/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    イベントを作成
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{event.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {formatDate(event.start_time)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/events/${event.id}`} className="flex items-center w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              詳細を見る
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/events/${event.id}/edit`} className="flex items-center w-full">
                              <Edit className="h-4 w-4 mr-2" />
                              編集
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            削除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">登録商品数</span>
                        {/* Assuming itemCount is optional and might not be present */}
                        <span className="font-medium">{event.itemCount !== undefined ? `${event.itemCount}個` : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">売上合計</span>
                        <span className="font-medium">{formatCurrency(event.totalSales)}</span>
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex space-x-2">
                           {/* Link to View Details page */}
                          <Link to={`/events/${event.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              詳細
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
