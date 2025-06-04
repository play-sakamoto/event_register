"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Badge } from "../../../components/ui/badge"
import { Button } from "../../../components/ui/button"
import { Download, Eye } from "lucide-react"
import { useState } from "react"

// Mock sales data
const mockSales = [
  {
    id: 1,
    soldAt: "2024-08-15T10:30:00",
    total: 1100,
    items: [
      { name: "たこ焼き", quantity: 2, unitPrice: 500 },
      { name: "かき氷", quantity: 1, unitPrice: 300 },
    ],
  },
  {
    id: 2,
    soldAt: "2024-08-15T11:15:00",
    total: 1000,
    items: [
      { name: "焼きそば", quantity: 1, unitPrice: 600 },
      { name: "ビール", quantity: 1, unitPrice: 400 },
    ],
  },
  {
    id: 3,
    soldAt: "2024-08-15T12:00:00",
    total: 1550,
    items: [
      { name: "たこ焼き", quantity: 1, unitPrice: 500 },
      { name: "焼きそば", quantity: 1, unitPrice: 600 },
      { name: "ビール", quantity: 1, unitPrice: 400 },
      { name: "かき氷", quantity: 1, unitPrice: 300 },
    ],
  },
  {
    id: 4,
    soldAt: "2024-08-15T13:30:00",
    total: 800,
    items: [
      { name: "たこ焼き", quantity: 1, unitPrice: 500 },
      { name: "かき氷", quantity: 1, unitPrice: 300 },
    ],
  },
]

export default function SalesLog({ eventId }: { eventId: string }) {
  const [expandedSale, setExpandedSale] = useState<number | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("ja-JP", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const totalSales = mockSales.reduce((sum, sale) => sum + sale.total, 0)
  const totalTransactions = mockSales.length

  const toggleExpanded = (saleId: number) => {
    setExpandedSale(expandedSale === saleId ? null : saleId)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">総売上</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalSales)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">取引回数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}回</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">平均単価</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalTransactions > 0 ? totalSales / totalTransactions : 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Log */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>販売ログ</CardTitle>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              CSVエクスポート
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {mockSales.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">販売記録がありません</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockSales.map((sale) => (
                <Card key={sale.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">#{sale.id}</Badge>
                          <span className="text-sm text-gray-600">{formatDateTime(sale.soldAt)}</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600 mt-1">{formatCurrency(sale.total)}</div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => toggleExpanded(sale.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        {expandedSale === sale.id ? "閉じる" : "詳細"}
                      </Button>
                    </div>

                    {expandedSale === sale.id && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-3">購入商品</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>商品名</TableHead>
                              <TableHead className="text-center">数量</TableHead>
                              <TableHead className="text-right">単価</TableHead>
                              <TableHead className="text-right">小計</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {sale.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-center">{item.quantity}</TableCell>
                                <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                                <TableCell className="text-right">
                                  {formatCurrency(item.unitPrice * item.quantity)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
