"use client"

import React, { useState, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert"
import { ArrowLeft, CalendarDays, AlertCircle, Loader2 } from "lucide-react"
import { getEvent, updateEvent, EventCreationData } from "../../../services/events"
import { Event as EventType } from "../../../types/event" // Renamed to avoid conflict

// Helper to format date to YYYY-MM-DDTHH:MM required by datetime-local
const formatDateForInput = (date: string | Date | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  const pad = (num: number) => num.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function EditEventPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id!, 10);

  const [formData, setFormData] = useState<Partial<EventCreationData>>({
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);


  useEffect(() => {
    if (isNaN(eventId)) {
      setError("無効なイベントIDです。");
      setIsLoading(false);
      return;
    }

    const fetchEventDetails = async () => {
      setIsLoading(true);
      try {
        const eventDetails = await getEvent(eventId);
        setFormData({
          title: eventDetails.title,
          description: eventDetails.description || "",
          start_time: formatDateForInput(eventDetails.start_time),
          end_time: formatDateForInput(eventDetails.end_time),
        });
        setError(null);
      } catch (err: any) {
        console.error("Failed to fetch event details:", err);
        setError(err.message || "イベント詳細の読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    if (formData.start_time && formData.end_time && new Date(formData.end_time) <= new Date(formData.start_time)) {
      setSubmitError("終了日時は開始日時より後に設定してください。");
      setIsSubmitting(false);
      return;
    }

    try {
      // Ensure only changed fields are sent if your backend supports PATCH semantics appropriately
      // For now, sending all fields from the form.
      const updatedEvent = await updateEvent(eventId, formData as EventCreationData); // Type assertion might be needed if types mismatch
      console.log("Event updated:", updatedEvent);
      navigate(`/events/${updatedEvent.id}`);
    } catch (err: any) {
      console.error("Failed to update event:", err);
      setSubmitError(err.message || "イベントの更新に失敗しました。");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <p className="ml-4 text-lg text-gray-700">イベント情報を読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>読み込みエラー</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Link to="/events" className="mt-4 inline-block">
          <Button variant="outline">イベント一覧に戻る</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <Link to={`/events/${eventId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                イベント詳細に戻る
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">イベントを編集</h1>
            <p className="text-gray-600">イベントの情報を更新してください</p>
          </div>

          {submitError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>更新エラー</AlertTitle>
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarDays className="mr-2 h-5 w-5" />
                イベント情報編集
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
                      value={formData.start_time?.toString()}
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
                      value={formData.end_time?.toString()}
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
                  <Link to={`/events/${eventId}`} className="flex-1 order-2 sm:order-1">
                    <Button type="button" variant="outline" className="w-full">
                      キャンセル
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 order-1 sm:order-2"
                    disabled={isSubmitting || !formData.title || !formData.start_time || !formData.end_time}
                  >
                    {isSubmitting ? "更新中..." : "イベントを更新"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
