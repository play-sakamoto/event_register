"use client"

import React, { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Badge } from "../../../components/ui/badge"
import { CalendarDays, MoreVertical, Plus, Store, Trash2, Edit, Eye } from "lucide-react"
import { Link } from "react-router-dom"


// Mock data - in real app this would come from API
const mockEvents = [
  {
    id: 1,
    name: "夏祭り2024",
    date: "2024-08-15",
    itemCount: 12,
    totalSales: 45000,
  },
  {
    id: 2,
    name: "学園祭フードコート",
    date: "2024-11-03",
    itemCount: 8,
    totalSales: 0,
  },
  {
    id: 3,
    name: "地域フリーマーケット",
    date: "2024-07-20",
    itemCount: 15,
    totalSales: 32000,
  },
  {
    id: 4,
    name: "秋の収穫祭",
    date: "2024-10-15",
    itemCount: 6,
    totalSales: 0,
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents)

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("このイベントを削除しますか？")) {
      setEvents(events.filter((event) => event.id !== eventId))
    }
  }

  // const getStatusBadge = (status: string) => {
  //   switch (status) {
  //     case "active":
  //       return <Badge className="bg-green-100 text-green-800">開催中</Badge>
  //     case "upcoming":
  //       return <Badge className="bg-blue-100 text-blue-800">予定</Badge>
  //     case "completed":
  //       return <Badge className="bg-gray-100 text-gray-800">終了</Badge>
  //     default:
  //       return <Badge variant="secondary">{status}</Badge>
  //   }
  // }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount)
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
                        <CardTitle className="text-lg mb-1">{event.name}</CardTitle>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {formatDate(event.date)}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link to={`/events/${event.id}`} className="flex items-center">
                              <Eye className="h-4 w-4 mr-2" />
                              詳細を見る
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link to={`/events/${event.id}/edit`} className="flex items-center">
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
                        <span className="font-medium">{event.itemCount}個</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">売上合計</span>
                        <span className="font-medium">{formatCurrency(event.totalSales)}</span>
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex space-x-2">
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
