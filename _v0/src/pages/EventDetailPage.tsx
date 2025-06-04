"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Header from "../components/header"
import POSScreen from "../components/pos-screen"
import ProductManagement from "../components/product-management"
import SalesLog from "../components/sales-log"
import EmptyPage from "../components/empty-page"
import Dashboard from "../components/dashboard"

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState("dashboard")

  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Navigation Tabs - directly under header */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-transparent border-none h-12">
              <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                ダッシュボード
              </TabsTrigger>
              <TabsTrigger value="pos" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                会計画面
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                商品管理
              </TabsTrigger>
              <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                在庫管理
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                販売ログ
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                メンバー管理
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <main className="container mx-auto px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="mt-0">
              {/* Back Button only for non-POS tabs */}
              <div className="mb-4">
                <Link to="/events">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    イベント一覧に戻る
                  </Button>
                </Link>
              </div>
              <Dashboard eventId={id!} />
            </TabsContent>

            <TabsContent value="pos" className="mt-0">
              <POSScreen eventId={id!} />
            </TabsContent>

            <TabsContent value="products" className="mt-0">
              <div className="mb-4">
                <Link to="/events">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    イベント一覧に戻る
                  </Button>
                </Link>
              </div>
              <ProductManagement eventId={id!} />
            </TabsContent>

            <TabsContent value="inventory" className="mt-0">
              <div className="mb-4">
                <Link to="/events">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    イベント一覧に戻る
                  </Button>
                </Link>
              </div>
              <EmptyPage title="在庫管理" description="在庫数の管理と調整機能を実装予定" />
            </TabsContent>

            <TabsContent value="sales" className="mt-0">
              <div className="mb-4">
                <Link to="/events">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    イベント一覧に戻る
                  </Button>
                </Link>
              </div>
              <SalesLog eventId={id!} />
            </TabsContent>

            <TabsContent value="members" className="mt-0">
              <div className="mb-4">
                <Link to="/events">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    イベント一覧に戻る
                  </Button>
                </Link>
              </div>
              <EmptyPage title="メンバー管理" description="イベントメンバーの権限管理機能を実装予定" />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
