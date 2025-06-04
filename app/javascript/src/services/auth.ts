const getCSRFToken = () =>
  document.querySelector("meta[name='csrf-token']")?.getAttribute('content') ||
  ''

export const signup = async (data: {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}) => {
  const res = await fetch('/api/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'include',
    body: JSON.stringify({
      user: {
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      },
    }),
  })

  const json = await res.json()
  if (!res.ok) {
    throw new Error(json?.error || '新規登録に失敗しました')
  }

  return json
}

export const login = async (data: { email: string; password: string }) => {
  const res = await fetch('/api/v1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json?.error || 'ログイン失敗')

  return json
}

export const logout = async () => {
  await fetch('/api/v1/sessions', {
    method: 'DELETE',
    headers: {
      'X-CSRF-Token': getCSRFToken(),
    },
    credentials: 'include',
  })
}

export const fetchCurrentUser = async () => {
  const res = await fetch(`/api/v1/me`, {
    headers: {
      Accept: 'application/json',
    },
    credentials: 'include',
  })

  if (!res.ok) {
    return null
  }

  const data = await res.json()
  return data.user || null
}
