"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { CalendarDays, Menu, Store, User } from "lucide-react"

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Eventレジ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/events" className="text-gray-600 hover:text-gray-900 transition-colors">
              イベント一覧
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ダッシュボード
                </Link>
                <Link to="/pos" className="text-gray-600 hover:text-gray-900 transition-colors">
                  会計画面
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    ユーザー名
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile">プロフィール</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/settings">設定</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>ログアウト</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    ログイン
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">新規登録</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Link to="/events" className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    イベント一覧
                  </Link>
                </DropdownMenuItem>
                {isLoggedIn && (
                  <>
                    <DropdownMenuItem>
                      <Link to="/dashboard">ダッシュボード</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/pos">会計画面</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile">プロフィール</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>ログアウト</DropdownMenuItem>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/login">ログイン</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/register">新規登録</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
