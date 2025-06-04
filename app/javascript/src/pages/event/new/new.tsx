"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert" // Added Alert
import { ArrowLeft, CalendarDays, AlertCircle } from "lucide-react"
// import Header from "../../../components/header" // Header not used in this file
import { createEvent, EventCreationData } from "../../../services/events" // Updated import
import { Event } from "../../../types/event" // Added import

// Helper to format date to YYYY-MM-DDTHH:MM required by datetime-local
const formatDateForInput = (date: Date): string => {
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};


export default function NewEventPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<EventCreationData>({
    title: "",
    description: "",
    start_time: formatDateForInput(new Date()), // Default to now
    end_time: formatDateForInput(new Date(Date.now() + 60 * 60 * 1000)), // Default to 1 hour from now
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Basic validation
    if (new Date(formData.end_time) <= new Date(formData.start_time)) {
      setError("終了日時は開始日時より後に設定してください。")
      setIsSubmitting(false)
      return
    }

    try {
      const createdEvent = await createEvent(formData)
      console.log("Event created:", createdEvent)
      // Navigate to the detail page of the newly created event
      navigate(`/events/${createdEvent.id}`)
    } catch (err: any) {
      console.error("Failed to create event:", err)
      setError(err.message || "イベントの作成に失敗しました。")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/events">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                イベント一覧に戻る
              </Button>
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">新しいイベントを作成</h1>
            <p className="text-gray-600">イベントの基本情報を入力してください</p>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>エラー</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                イベント情報
              </CardTitle>
              <CardDescription>イベント名、開始日時、終了日時は必須項目です</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">イベント名 *</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="例: 夏祭り2024"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start_time">開始日時 *</Label>
                    <Input
                      id="start_time"
                      name="start_time"
                      type="datetime-local"
                      value={formData.start_time.toString()}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end_time">終了日時 *</Label>
                    <Input
                      id="end_time"
                      name="end_time"
                      type="datetime-local"
                      value={formData.end_time.toString()}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">説明（任意）</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="イベントの詳細や注意事項があれば入力してください"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6">
                  <Link to="/events" className="flex-1 order-2 sm:order-1">
                    <Button type="button" variant="outline" className="w-full">
                      キャンセル
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 order-1 sm:order-2"
                    disabled={isSubmitting || !formData.title || !formData.start_time || !formData.end_time}
                  >
                    {isSubmitting ? "作成中..." : "イベントを作成"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Next Steps (Kept as is) */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">次のステップ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-blue-800">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <strong>商品を登録</strong> - 販売する商品の名前と価格を設定
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <strong>在庫を設定</strong> - 必要に応じて在庫数を管理
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <strong>販売開始</strong> - 会計画面で商品を選択して販売
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
