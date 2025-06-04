"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./button"
import { Label } from "./label"
import { Input } from "./input"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./dialog"
import { Edit, Plus, Trash2, Upload } from "lucide-react"

// Mock products data
const initialProducts = [
  { id: 1, name: "たこ焼き", price: 500, image: "/placeholder.svg?height=50&width=50", category: "食べ物" },
  { id: 2, name: "焼きそば", price: 600, image: "/placeholder.svg?height=50&width=50", category: "食べ物" },
  { id: 3, name: "かき氷", price: 300, image: "/placeholder.svg?height=50&width=50", category: "飲み物" },
  { id: 4, name: "ビール", price: 400, image: "/placeholder.svg?height=50&width=50", category: "飲み物" },
]

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export default function ProductManagement({ eventId }: { eventId: string }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingProduct) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === editingProduct.id
            ? { ...product, name: formData.name, price: Number.parseInt(formData.price), image: formData.image }
            : product,
        ),
      )
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now(),
        name: formData.name,
        price: Number.parseInt(formData.price),
        image: formData.image || "/placeholder.svg?height=50&width=50",
        category: "その他",
      }
      setProducts([...products, newProduct])
    }

    // Reset form and close dialog
    setFormData({ name: "", price: "", image: "" })
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (productId: number) => {
    if (confirm("この商品を削除しますか？")) {
      setProducts(products.filter((product) => product.id !== productId))
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">商品管理</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingProduct(null)
                setFormData({ name: "", price: "", image: "" })
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              商品登録
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "商品編集" : "新規商品登録"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">商品名 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例: たこ焼き"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">価格 *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="例: 500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">画像URL（任意）</Label>
                <div className="flex space-x-2">
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="画像URLを入力"
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  キャンセル
                </Button>
                <Button type="submit" className="flex-1">
                  {editingProduct ? "更新" : "登録"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>商品一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">登録された商品がありません</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                最初の商品を登録
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>画像</TableHead>
                  <TableHead>商品名</TableHead>
                  <TableHead>価格</TableHead>
                  <TableHead>カテゴリ</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
