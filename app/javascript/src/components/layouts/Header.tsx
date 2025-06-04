import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/use-auth'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { CalendarDays, Menu, Store, User } from "lucide-react"





export default function Header() {
  const { isLogin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    // <header className="flex items-center justify-between bg-gray-300 p-4">
    //   <div className="text-2xl font-bold">
    //     <Link to="/" className="text-black no-underline">
    //       RUNTEQ memory
    //     </Link>
    //   </div>
    //   <nav>
    //     <ul className="m-0 flex list-none gap-4 p-0">
    //       {isLogin ? (
    //         <>
    //           <li>
    //             <Link
    //               to="/memories"
    //               className="text-base text-black no-underline hover:underline"
    //             >
    //               思い出一覧
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/profile"
    //               className="text-base text-black no-underline hover:underline"
    //             >
    //               自分の思い出
    //             </Link>
    //           </li>
    //           <li>
    //             <button
    //               onClick={handleLogout}
    //               className="text-base text-black no-underline hover:underline"
    //             >
    //               ログアウト
    //             </button>
    //           </li>
    //         </>
    //       ) : (
    //         <>
    //           <li>
    //             <Link
    //               to="/login"
    //               className="text-base text-black no-underline hover:underline"
    //             >
    //               ログイン
    //             </Link>
    //           </li>
    //           <li>
    //             <Link
    //               to="/signup"
    //               className="text-base text-black no-underline hover:underline"
    //             >
    //               新規登録
    //             </Link>
    //           </li>
    //         </>
    //       )}
    //     </ul>
    //   </nav>
    // </header>
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
            {/* {isLogin && (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                  ダッシュボード
                </Link>
                <Link to="/pos" className="text-gray-600 hover:text-gray-900 transition-colors">
                  会計画面
                </Link>
              </>
            )} */}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isLogin ? (
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
                  <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    ログイン
                  </Button>
                </Link>
                <Link to="/signup">
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
                {isLogin && (
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
                    <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
                  </>
                )}
                {!isLogin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/login">ログイン</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/signup">新規登録</Link>
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
