// "use client"
// import React from "react"
// import { useState } from "react"
// import { Button } from "../../../components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
// import { Badge } from "../../../components/ui/badge"
// import { Separator } from "../../../components/ui/separator"
// import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/toggle-group"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
// import { Minus, Plus, ShoppingCart, Grid3X3, LayoutGrid, ChevronDown } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"

// // Mock products data
// const mockProducts = [
//   { id: 1, name: "たこ焼き", price: 500, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
//   { id: 2, name: "焼きそば", price: 600, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
//   { id: 3, name: "かき氷", price: 300, image: "/placeholder.svg?height=60&width=100", category: "飲み物" },
//   { id: 4, name: "ビール", price: 400, image: "/placeholder.svg?height=60&width=100", category: "飲み物" },
//   { id: 5, name: "フランクフルト", price: 350, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
//   { id: 6, name: "ジュース", price: 200, image: "/placeholder.svg?height=60&width=100", category: "飲み物" },
//   { id: 7, name: "お好み焼き", price: 550, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
//   { id: 8, name: "綿あめ", price: 250, image: "/placeholder.svg?height=60&width=100", category: "その他" },
// ]

// interface CartItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
// }

// export default function POSScreen({ eventId }: { eventId: string }) {
//   const [cart, setCart] = useState<CartItem[]>([])
//   const [viewMode, setViewMode] = useState<"horizontal" | "compact">("horizontal")
//   const [activeTab, setActiveTab] = useState("通常会計")
//   const [discountRate, setDiscountRate] = useState(10) // 割引率（%）

//   const addToCart = (product: (typeof mockProducts)[0]) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id)
//       if (existingItem) {
//         return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }]
//       }
//     })
//   }

//   const removeFromCart = (productId: number) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === productId)
//       if (existingItem && existingItem.quantity > 1) {
//         return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
//       } else {
//         return prevCart.filter((item) => item.id !== productId)
//       }
//     })
//   }

//   const getItemQuantity = (productId: number) => {
//     const item = cart.find((item) => item.id === productId)
//     return item ? item.quantity : 0
//   }

//   // 会計計算
//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

//   // 割引計算
//   const discountAmount = activeTab === "割引会計" ? Math.floor(subtotal * (discountRate / 100)) : 0
//   const discountedSubtotal = subtotal - discountAmount

//   // 税計算（割引後の金額に対して）
//   const tax = Math.floor(discountedSubtotal * 0.1)
//   const total = discountedSubtotal + tax

//   const handleCheckout = () => {
//     if (cart.length === 0) return

//     console.log("Processing sale:", { cart, subtotal, discountAmount, discountedSubtotal, tax, total })
//     setCart([])
//     alert("会計が完了しました！")
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("ja-JP", {
//       style: "currency",
//       currency: "JPY",
//     }).format(amount)
//   }

//   // 割引率のオプション（10~100、10刻み）
//   const discountOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)

//   return (
//     <div className="grid lg:grid-cols-3 gap-6">
//       {/* Products Grid */}
//       <div className="lg:col-span-2">
//         <Card>
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <CardTitle>商品一覧</CardTitle>
//               <ToggleGroup
//                 type="single"
//                 value={viewMode}
//                 onValueChange={(value) => value && setViewMode(value as "horizontal" | "compact")}
//               >
//                 <ToggleGroupItem value="horizontal" aria-label="横長表示">
//                   <LayoutGrid className="h-4 w-4" />
//                 </ToggleGroupItem>
//                 <ToggleGroupItem value="compact" aria-label="コンパクト表示">
//                   <Grid3X3 className="h-4 w-4" />
//                 </ToggleGroupItem>
//               </ToggleGroup>
//             </div>
//           </CardHeader>
//           <CardContent className="p-2">
//             {viewMode === "horizontal" ? (
//               // Horizontal layout with images
//               <div className="space-y-2">
//                 {mockProducts.map((product) => {
//                   const quantity = getItemQuantity(product.id)
//                   return (
//                     <Card key={product.id} className="border border-gray-200">
//                       <CardContent className="p-2">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-20 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
//                             <img
//                               src={product.image || "/placeholder.svg"}
//                               alt={product.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <h3 className="font-medium text-sm">{product.name}</h3>
//                             <p className="text-lg font-bold text-blue-600">{formatCurrency(product.price)}</p>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             {quantity === 0 ? (
//                               <Button
//                                 onClick={() => addToCart(product)}
//                                 size="sm"
//                                 className="bg-blue-400 hover:bg-blue-600"
//                               >
//                                 <Plus className="h-4 w-4 mr-1" />
//                                 追加
//                               </Button>
//                             ) : (
//                               <>
//                                 <Button
//                                   onClick={() => removeFromCart(product.id)}
//                                   size="sm"
//                                   className="bg-red-500 hover:bg-red-600 text-white"
//                                 >
//                                   <Minus className="h-4 w-4" />
//                                 </Button>
//                                   <Badge
//                                     variant="secondary"
//                                     className="flex items-center justify-center px-3 py-1 min-w-[2rem] text-center text-xs font-semibold"
//                                   >
//                                     {quantity}
//                                   </Badge>
//                                 <Button
//                                   onClick={() => addToCart(product)}
//                                   size="sm"
//                                   className="bg-green-500 hover:bg-green-600 text-white"
//                                 >
//                                   <Plus className="h-4 w-4" />
//                                 </Button>
//                               </>
//                             )}
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   )
//                 })}
//               </div>
//             ) : (
//               // Compact 6-column layout without images
//               <div className="grid grid-cols-6 gap-2">
//                 {mockProducts.map((product) => {
//                   const quantity = getItemQuantity(product.id)
//                   return (
//                     <Card key={product.id} className="border border-gray-200">
//                       <CardContent className="p-2 text-center">
//                         <h3 className="font-medium text-xs mb-1 truncate" title={product.name}>
//                           {product.name}
//                         </h3>
//                         <p className="text-xs font-bold text-blue-600 mb-2">{formatCurrency(product.price)}</p>

//                         {quantity === 0 ? (
//                           <Button
//                             onClick={() => addToCart(product)}
//                             size="sm"
//                             className="w-full bg-blue-400 hover:bg-blue-600 text-xs h-7"
//                           >
//                             追加
//                           </Button>
//                         ) : (
//                           <div className="space-y-1">
//                             <div className="flex space-x-1">
//                               <Button
//                                 onClick={() => removeFromCart(product.id)}
//                                 size="sm"
//                                 className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs h-6 p-0"
//                               >
//                                 <Minus className="h-3 w-3" />
//                               </Button>
//                               <Button
//                                 onClick={() => addToCart(product)}
//                                 size="sm"
//                                 className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs h-6 p-0"
//                               >
//                                 <Plus className="h-3 w-3" />
//                               </Button>
//                             </div>
//                             <Badge variant="secondary" className="w-full py-0.5 text-xs text-center">
//                               {quantity}個
//                             </Badge>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   )
//                 })}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Cart Summary */}
//       <div className="lg:col-span-1">
//         <Card className="sticky top-32">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               <ShoppingCart className="mr-2 h-5 w-5" />
//               会計
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
//               <div className="container mx-auto px-2">
//                 <Tabs value={activeTab} onValueChange={setActiveTab}>
//                   <TabsList className="grid w-full grid-cols-2 lg:grid-cols-2 bg-transparent border-none h-12">
//                     <TabsTrigger
//                       value="通常会計"
//                       className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
//                     >
//                       通常会計
//                     </TabsTrigger>
//                     <TabsTrigger value="割引会計" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
//                       割引会計
//                     </TabsTrigger>
//                   </TabsList>
//                 </Tabs>
//               </div>
//             </div>

//             {/* 割引率選択ドロップダウン */}
//             {activeTab === "割引会計" && (
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">割引率</label>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline" className="w-full justify-between">
//                       {discountRate}% OFF
//                       <ChevronDown className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent className="w-full">
//                     {discountOptions.map((rate) => (
//                       <DropdownMenuItem
//                         key={rate}
//                         onClick={() => setDiscountRate(rate)}
//                         className={discountRate === rate ? "bg-blue-50" : ""}
//                       >
//                         {rate}% OFF
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             )}

//             <Separator />
//             {cart.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">商品を選択してください</p>
//             ) : (
//                 <>
//                 <div className="space-y-3">
//                   {cart.map((item) => (
//                     <div key={item.id} className="flex justify-between items-center">
//                       <div className="flex-1">
//                         <p className="font-medium text-sm">{item.name}</p>
//                         <p className="text-xs text-gray-500">
//                           {formatCurrency(item.price)} × {item.quantity}
//                         </p>
//                       </div>
//                       <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
//                     </div>
//                   ))}
//                 </div>

//                 <Separator />

//                 <div className="space-y-2">
//                   <div className="flex justify-between">
//                     <span>小計</span>
//                     <span>{formatCurrency(subtotal)}</span>
//                   </div>
                  
//                   {/* 割引表示 */}
//                   {activeTab === "割引会計" && discountAmount > 0 && (
//                     <div className="flex justify-between text-sm text-red-600">
//                       <span>割引 ({discountRate}% OFF)</span>
//                       <span>-{formatCurrency(discountAmount)}</span>
//                     </div>
//                   )}
                  
//                   {/* 割引後小計表示 */}
//                   {activeTab === "割引会計" && (
//                     <div className="flex justify-between">
//                       <span>割引後小計</span>
//                       <span>{formatCurrency(discountedSubtotal)}</span>
//                     </div>
//                   )}
                  
//                   <div className="flex justify-between text-sm text-gray-600">
//                     <span>消費税 (10%)</span>
//                     <span>{formatCurrency(tax)}</span>
//                   </div>
//                   <Separator />
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>合計</span>
//                     <span className="text-blue-600">{formatCurrency(total)}</span>
//                   </div>
//                 </div>

//                 <Button onClick={handleCheckout} className="bg-black text-white w-full" size="lg">
//                   会計登録
//                 </Button>
//               </>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
"use client"
import React from "react"
import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Separator } from "../../../components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "../../../components/ui/toggle-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Minus, Plus, ShoppingCart, Grid3X3, LayoutGrid, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu"

// Mock products data
const mockProducts = [
  { id: 1, name: "たこ焼き", price: 500, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
  { id: 2, name: "焼きそば", price: 600, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
  { id: 3, name: "かき氷", price: 300, image: "/placeholder.svg?height=60&width=100", category: "飲み物" },
  { id: 4, name: "ビール", price: 400, image: "/placeholder.svg?height=60&width=100", category: "飲み物" },
  { id: 5, name: "フランクフルト", price: 350, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
  { id: 6, name: "ジュース", price: 200, image: "/placeholder.svg?height=60&width=100", category: "飲み物" },
  { id: 7, name: "お好み焼き", price: 550, image: "/placeholder.svg?height=60&width=100", category: "食べ物" },
  { id: 8, name: "綿あめ", price: 250, image: "/placeholder.svg?height=60&width=100", category: "その他" },
  { id: 9, name: "綿あめ", price: 250, image: "/placeholder.svg?height=60&width=100", category: "その他" },
  { id: 10, name: "綿あめ", price: 250, image: "/placeholder.svg?height=60&width=100", category: "その他" },
  { id: 11, name: "綿あめ", price: 250, image: "/placeholder.svg?height=60&width=100", category: "その他" },
  { id: 12, name: "綿あめ", price: 250, image: "/placeholder.svg?height=60&width=100", category: "その他" },
  { id: 13, name: "綿あめ", price: 250, image: "/placeholder.svg?height=60&width=100", category: "その他" },
  { id: 14, name: "綿あめ", price: 251, image: "/placeholder.svg?height=60&width=100", category: "その他" },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function POSScreen({ eventId }: { eventId: string }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [viewMode, setViewMode] = useState<"horizontal" | "compact">("horizontal")
  const [activeTab, setActiveTab] = useState("通常会計")
  const [taxTab, setTaxTab] = useState("税込") // 消費税設定のタブ
  const [discountRate, setDiscountRate] = useState(10) // 割引率（%）

  const addToCart = (product: (typeof mockProducts)[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== productId)
      }
    })
  }

  const getItemQuantity = (productId: number) => {
    const item = cart.find((item) => item.id === productId)
    return item ? item.quantity : 0
  }

  // 会計計算
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  // 割引計算
  const discountAmount = activeTab === "割引会計" ? Math.floor(subtotal * (discountRate / 100)) : 0
  const discountedSubtotal = subtotal - discountAmount
  
  // 税計算（消費税設定タブに応じて）
  let tax = 0
  let total = discountedSubtotal
  
  if (taxTab === "8%") {
    tax = Math.floor(discountedSubtotal * 0.08)
    total = discountedSubtotal + tax
  } else if (taxTab === "10%") {
    tax = Math.floor(discountedSubtotal * 0.1)
    total = discountedSubtotal + tax
  } else {
    // 税込の場合は税額を表示しない
    tax = 0
    total = discountedSubtotal
  }

  const handleCheckout = () => {
    if (cart.length === 0) return

    console.log("Processing sale:", { cart, subtotal, discountAmount, discountedSubtotal, tax, total, taxMode: taxTab })
    setCart([])
    alert("会計が完了しました！")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(amount)
  }

  // 割引率のオプション（10~100、10刻み）
  const discountOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10)

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Products Grid */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>商品一覧</CardTitle>
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && setViewMode(value as "horizontal" | "compact")}
              >
                <ToggleGroupItem value="horizontal" aria-label="横長表示">
                  <LayoutGrid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="compact" aria-label="コンパクト表示">
                  <Grid3X3 className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            {viewMode === "horizontal" ? (
              // Horizontal layout with images
              <div className="space-y-2">
                {mockProducts.map((product) => {
                  const quantity = getItemQuantity(product.id)
                  return (
                    <Card key={product.id} className="border border-gray-200">
                      <CardContent className="p-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-20 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{product.name}</h3>
                            <p className="text-lg font-bold text-blue-600">{formatCurrency(product.price)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {quantity === 0 ? (
                              <Button
                                onClick={() => addToCart(product)}
                                size="sm"
                                className="bg-blue-400 hover:bg-blue-600"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                追加
                              </Button>
                            ) : (
                              <>
                                <Button
                                  onClick={() => removeFromCart(product.id)}
                                  size="sm"
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                  <Badge
                                    variant="secondary"
                                    className="flex items-center justify-center px-3 py-1 min-w-[2rem] text-center text-xs font-semibold"
                                  >
                                    {quantity}
                                  </Badge>
                                <Button
                                  onClick={() => addToCart(product)}
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            ) : (
              // Compact 6-column layout without images
              <div className="grid grid-cols-6 gap-2">
                {mockProducts.map((product) => {
                  const quantity = getItemQuantity(product.id)
                  return (
                    <Card key={product.id} className="border border-gray-200">
                      <CardContent className="p-2 text-center">
                        <h3 className="font-medium text-xs mb-1 truncate" title={product.name}>
                          {product.name}
                        </h3>
                        <p className="text-xs font-bold text-blue-600 mb-2">{formatCurrency(product.price)}</p>

                        {quantity === 0 ? (
                          <Button
                            onClick={() => addToCart(product)}
                            size="sm"
                            className="w-full bg-blue-400 hover:bg-blue-600 text-xs h-7"
                          >
                            追加
                          </Button>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex space-x-1">
                              <Button
                                onClick={() => removeFromCart(product.id)}
                                size="sm"
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs h-6 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <Button
                                onClick={() => addToCart(product)}
                                size="sm"
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs h-6 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <Badge variant="secondary" className="w-full py-0.5 text-xs text-center">
                              {quantity}個
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Cart Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-32">
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              会計
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
              <div className="container mx-auto px-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 lg:grid-cols-2 bg-transparent border-none h-12">
                    <TabsTrigger
                      value="通常会計"
                      className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                    >
                      通常会計
                    </TabsTrigger>
                    <TabsTrigger value="割引会計" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                      割引会計
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* 消費税設定タブ */}
            <div className="bg-white border-b border-gray-200">
              <div className="container mx-auto px-2">
                <Tabs value={taxTab} onValueChange={setTaxTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-transparent border-none h-12">
                    <TabsTrigger
                      value="税込"
                      className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs"
                    >
                      税込
                    </TabsTrigger>
                    <TabsTrigger 
                      value="8%" 
                      className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs"
                    >
                      8%
                    </TabsTrigger>
                    <TabsTrigger 
                      value="10%" 
                      className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700 text-xs"
                    >
                      10%
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            {/* 割引率選択ドロップダウン */}
            {activeTab === "割引会計" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">割引率</label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      {discountRate}% OFF
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    {discountOptions.map((rate) => (
                      <DropdownMenuItem
                        key={rate}
                        onClick={() => setDiscountRate(rate)}
                        className={discountRate === rate ? "bg-blue-50" : ""}
                      >
                        {rate}% OFF
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            <Separator />
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">商品を選択してください</p>
            ) : (
                <>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>小計</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  
                  {/* 割引表示 */}
                  {activeTab === "割引会計" && discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-red-600">
                      <span>割引 ({discountRate}% OFF)</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}
                  
                  {/* 割引後小計表示 */}
                  {activeTab === "割引会計" && (
                    <div className="flex justify-between">
                      <span>割引後小計</span>
                      <span>{formatCurrency(discountedSubtotal)}</span>
                    </div>
                  )}
                  
                  {/* 消費税表示（税込以外の場合のみ） */}
                  {taxTab !== "税込" && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>消費税 ({taxTab})</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                  )}
                  
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>合計</span>
                    <span className="text-blue-600">{formatCurrency(total)}</span>
                  </div>
                  
                  {/* 税込表示の注記 */}
                  {taxTab === "税込" && (
                    <p className="text-xs text-gray-500 text-center">※税込価格での表示</p>
                  )}
                </div>

                <Button onClick={handleCheckout} className="bg-black text-white w-full" size="lg">
                  会計登録
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}