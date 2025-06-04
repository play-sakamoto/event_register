import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignUpForm from './signup-form'
import { useAuth } from '../../../hooks/use-auth'

export default function SignUpContainer() {
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(formData)
      navigate('/events')
    } catch (err) {
      console.error('Request failed', err)
      setError(err.message)
    }
  }

  return (
    <div className="mx-auto my-16 max-w-[720px]">
      <h1 className="text-3xl font-bold">新規登録</h1>
      <SignUpForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        error={error}
      />
      <div className="mt-4">
        <Link
          to="/"
          className="inline-block rounded-md bg-gray-600 px-5 py-3 text-white transition-colors duration-300 hover:bg-gray-500"
        >
          前の画面に戻る
        </Link>
      </div>
    </div>
  )
}
