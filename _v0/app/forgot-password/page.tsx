"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Store, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app, this would send reset email
    console.log("Password reset request for:", email)

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link href="/" className="flex items-center justify-center space-x-2">
              <Store className="h-10 w-10 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Eventレジ</span>
            </Link>
          </div>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>メールを送信しました</CardTitle>
              <CardDescription>パスワードリセットの手順をメールでお送りしました</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>{email}</strong> にパスワードリセット用のリンクを送信しました。
                  メールをご確認いただき、リンクをクリックしてパスワードを再設定してください。
                </AlertDescription>
              </Alert>

              <div className="text-sm text-gray-600 space-y-2">
                <p>• メールが届かない場合は、迷惑メールフォルダもご確認ください</p>
                <p>• リンクの有効期限は24時間です</p>
                <p>• メールが届かない場合は、再度お試しください</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                  variant="outline"
                  className="w-full"
                >
                  別のメールアドレスで再送信
                </Button>
                <Link href="/login" className="block">
                  <Button variant="ghost" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    ログイン画面に戻る
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <Store className="h-10 w-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Eventレジ</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">パスワードを忘れた方</h2>
          <p className="mt-2 text-sm text-gray-600">
            登録されたメールアドレスにパスワードリセット用のリンクをお送りします
          </p>
        </div>

        {/* Reset Form */}
        <Card>
          <CardHeader>
            <CardTitle>パスワードリセット</CardTitle>
            <CardDescription>メールアドレスを入力してください</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "送信中..." : "リセットメールを送信"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                <ArrowLeft className="mr-1 h-4 w-4 inline" />
                ログイン画面に戻る
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
