import React from 'react'
import { User } from '../../../types/user'

type SignUpFormProps = {
  formData: User
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  error?: string
}

export default function SignUpForm({
  formData,
  onChange,
  onSubmit,
  error,
}: SignUpFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="my-8 w-full rounded-lg bg-white px-6 py-8 shadow-md"
    >
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block font-semibold text-gray-700"
        >
          名前
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="名前"
          value={formData.name}
          onChange={onChange}
          required
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block font-semibold text-gray-700"
        >
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={formData.email}
          onChange={onChange}
          required
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-2 block font-semibold text-gray-700"
        >
          パスワード
        </label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="パスワード"
          value={formData.password}
          onChange={onChange}
          required
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {error && formData.password.length < 6 && (
          <p className="mt-1 text-sm text-red-500">
            ※6文字以上で入力してください
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="passwordConfirmation"
          className="mb-2 block font-semibold text-gray-700"
        >
          パスワード（確認）
        </label>
        <input
          id="passwordConfirmation"
          type="password"
          name="passwordConfirmation"
          placeholder="パスワード（確認）"
          value={formData.passwordConfirmation}
          onChange={onChange}
          required
          className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 py-3 text-white transition duration-200 hover:bg-blue-700"
      >
        登録
      </button>
    </form>
  )
}
