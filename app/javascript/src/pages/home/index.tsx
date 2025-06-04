// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../../hooks/use-auth'

// export default function HomePage() {
//   const { isLogin } = useAuth()
//   return (
//     <div className="mx-auto max-w-[800px] p-8 text-center font-sans">
//       <h1 className="mb-6 text-4xl text-gray-800">RUNTEQ memory</h1>
//       <p className="mb-8 text-lg text-gray-600">思い出管理アプリです。</p>
//       {isLogin ? (
//         <Link
//           to="/memories"
//           className="inline-block rounded bg-blue-600 px-6 py-3 text-base text-white transition-colors duration-300 hover:bg-blue-800"
//         >
//           思い出一覧へ
//         </Link>
//       ) : (
//         <Link
//           to="/signup"
//           className="inline-block rounded bg-blue-600 px-6 py-3 text-base text-white transition-colors duration-300 hover:bg-blue-800"
//         >
//           新規登録
//         </Link>
//       )}
//     </div>
//   )
// }

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { CalendarDays, Plus, Store } from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../../components/layouts/Header"
import { useAuth } from '../../hooks/use-auth'


export default function EventHomePage() {
  const { isLogin } = useAuth()
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Eventレジ</h1>
            <p className="text-xl text-gray-600 mb-8">
              年に数日だけの屋台・露天でも
              <br />
              スマホ1台ですぐに使えるレジサービス
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events">
                <Button size="lg" className="w-full sm:w-auto">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  イベント一覧を見る
                </Button>
              </Link>
              <Link to="/events/new">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Plus className="mr-2 h-5 w-5" />
                  新しいイベントを作成
                </Button>
              </Link>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Store className="mr-2 h-5 w-5 text-blue-600" />
                  簡単会計
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  商品を選択するだけで合計金額を自動計算。手書きメモや暗算のミスを防げます。
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5 text-green-600" />
                  販売ログ保存
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  すべての販売記録を自動保存。イベント終了後の集計作業が大幅に短縮されます。
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="mr-2 h-5 w-5 text-purple-600" />
                  日報自動生成
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  ワンクリックで売上レポートをPDF・CSV形式でエクスポート。翌年の計画にも活用できます。
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">今すぐ始める</CardTitle>
              <CardDescription className="text-blue-700">3ステップで簡単セットアップ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">イベントを作成</h4>
                    <p className="text-blue-700 text-sm">イベント名と開催日を入力</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">商品を登録</h4>
                    <p className="text-blue-700 text-sm">販売する商品の名前と価格を設定</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">販売開始</h4>
                    <p className="text-blue-700 text-sm">会計画面で商品を選択して販売</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/events">
                  <Button className="w-full">イベント一覧へ進む</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
