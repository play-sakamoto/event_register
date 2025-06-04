"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Progress } from "./ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { CalendarDays, TrendingUp, ShoppingCart, Package, Clock, Star, AlertTriangle } from "lucide-react"

// Mock data
const eventInfo = {
  name: "夏祭り2024",
  date: "2024-08-15",
  status: "active",
  startTime: "10:00",
  endTime: "20:00",
  location: "中央公園",
}

const salesSummary = {
  totalSales: 125000,
  totalTransactions: 89,
  averageTransaction: 1404,
  totalItems: 234,
  todayTarget: 150000,
}

const topProducts = [
  { name: "たこ焼き", sales: 35000, quantity: 70, percentage: 28 },
  { name: "焼きそば", sales: 24000, quantity: 40, percentage: 19 },
  { name: "ビール", sales: 20000, quantity: 50, percentage: 16 },
  { name: "かき氷", sales: 15000, quantity: 50, percentage: 12 },
  { name: "フランクフルト", sales: 12250, quantity: 35, percentage: 10 },
]

const hourlyData = [
  { hour: "10:00", sales: 5000, transactions: 8 },
  { hour: "11:00", sales: 8500, transactions: 12 },
  { hour: "12:00", sales: 15000, transactions: 18 },
  { hour: "13:00", sales: 18000, transactions: 15 },
  { hour: "14:00", sales: 12000, transactions: 10 },
  { hour: "15:00", sales: 16000, transactions: 14 },
  { hour: "16:00", sales: 22000, transactions: 16 },
  { hour: "17:00", sales: 28500, transactions: 20 },
]

const stockAlerts = [
  { name: "かき氷", current: 5, target: 50, status: "low" },
  { name: "ビール", current: 12, target: 50, status: "medium" },
  { name: "綿あめ", current: 2, target: 30, status: "critical" },
]

export default function Dashboard({ eventId }: { eventId: string }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount)
  }

  const formatTime = (timeString: string) => {
    return timeString
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">開催中</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">予定</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">終了</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getStockStatus = (status: string) => {
    switch (status) {
      case "critical":
        return <Badge variant="destructive">緊急</Badge>
      case "low":
        return <Badge className="bg-yellow-100 text-yellow-800">少</Badge>
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">中</Badge>
      default:
        return <Badge variant="secondary">正常</Badge>
    }
  }

  const targetProgress = (salesSummary.totalSales / salesSummary.todayTarget) * 100

  return (
    <div className="space-y-6">
      {/* Event Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            イベント情報
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">イベント名</p>
              <p className="font-medium">{eventInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">開催日</p>
              <p className="font-medium">
                {new Date(eventInfo.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">時間</p>
              <p className="font-medium">
                {eventInfo.startTime} - {eventInfo.endTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">ステータス</p>
              <div className="mt-1">{getStatusBadge(eventInfo.status)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Summary */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              総売上
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(salesSummary.totalSales)}</div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>目標達成率</span>
                <span>{targetProgress.toFixed(1)}%</span>
              </div>
              <Progress value={targetProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <ShoppingCart className="mr-2 h-4 w-4" />
              取引回数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesSummary.totalTransactions}回</div>
            <p className="text-xs text-gray-600 mt-1">平均 {formatCurrency(salesSummary.averageTransaction)}/回</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Package className="mr-2 h-4 w-4" />
              販売個数
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesSummary.totalItems}個</div>
            <p className="text-xs text-gray-600 mt-1">
              平均 {(salesSummary.totalItems / salesSummary.totalTransactions).toFixed(1)}個/回
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              営業時間
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8時間</div>
            <p className="text-xs text-gray-600 mt-1">時間売上 {formatCurrency(salesSummary.totalSales / 8)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              人気商品ランキング
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{product.name}</span>
                      <span className="text-sm font-bold text-blue-600">{formatCurrency(product.sales)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                      <span>{product.quantity}個販売</span>
                      <span>{product.percentage}%</span>
                    </div>
                    <Progress value={product.percentage} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hourly Sales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              時間帯別売上
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>時間</TableHead>
                  <TableHead className="text-right">売上</TableHead>
                  <TableHead className="text-right">取引数</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hourlyData.map((data) => (
                  <TableRow key={data.hour}>
                    <TableCell className="font-medium">{data.hour}</TableCell>
                    <TableCell className="text-right">{formatCurrency(data.sales)}</TableCell>
                    <TableCell className="text-right">{data.transactions}回</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Stock Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-600" />
            在庫アラート
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {stockAlerts.map((item) => (
              <div key={item.name} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.name}</span>
                  {getStockStatus(item.status)}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  残り: {item.current}個 / {item.target}個
                </div>
                <Progress value={(item.current / item.target) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
