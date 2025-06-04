export type Memory = {
  id: number
  title: string
  body: string
  public_flag: boolean
  created_at: string
  user_name: string
  image_urls?: string []
  user_id: number
}

export type MemoryFormData = {
  title: string
  body: string
  public_flag: boolean
  images?: File[] // ← 名前を複数形に変更
}
