class Api::V1::MemoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    memories = Memory.public_memories.includes(:user, :memory_images)
    render json: memories.map { |memory|
      {
        id: memory.id,
        title: memory.title,
        body: memory.body,
        created_at: memory.created_at,
        user_name: memory.user.name,
        image_url: memory.memory_images.first&.image&.url # 最初の画像をサムネイルに
      }
    }, status: :ok
  end

  def show
    memory = Memory.find(params[:id])
    if !memory.public_flag && memory.user.id != current_user.id
      render json: { error: "この思い出を閲覧する権限がありません" }, status: :forbidden
      return
    end

    render json: {
      id: memory.id,
      title: memory.title,
      body: memory.body,
      public_flag: memory.public_flag,
      created_at: memory.created_at,
      user_name: memory.user.name,
      user_id: memory.user.id,
      image_urls: memory.memory_images.map { |img| img.image.url } # 配列で渡す
    }, status: :ok
  end


  def create
    memory = current_user.memories.new(memory_params)
    if memory.save
      render json: { message: "思い出が作成されました" }, status: :ok
    else
      render json: { error: memory.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    memory = current_user.memories.find_by(id: params[:id])
    if memory.nil? || memory.user_id != current_user.id
      render json: { error: "この思い出を更新する権限がありません" }, status: :forbidden
      return
    end

    if memory.update(memory_params)
      render json: { message: "思い出が更新されました" }, status: :ok
    else
      render json: { error: memory.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    memory = current_user.memories.find_by(id: params[:id])

    if memory.nil?
      render json: { error: "思い出が見つかりませんでした" }, status: :not_found
      return
    end

    if memory.destroy
      render json: { message: "思い出が削除されました" }, status: :ok
    else
      render json: { error: "思い出の削除に失敗しました" }, status: :unprocessable_entity
    end
  end

  private

  def memory_params
    params.require(:memory).permit(
      :title, :body, :public_flag,
      memory_images_attributes: [:id, :image, :_destroy]
    )
  end

end
