class Api::V1::ProfilesController < ApplicationController
  before_action :authenticate_user!

  def show
    if current_user.present?
      render json: {
        id: current_user.id,
        name: current_user.name,
        memories: current_user.memories.map { |memory|
          {
            id: memory.id,
            title: memory.title,
            body: memory.body,
            public_flag: memory.public_flag,
            created_at: memory.created_at,
            user_name: memory.user.name,
            image_url: memory.image.url,
            user_id: memory.user.id
          }
        }
      }, status: :ok
    else
      render json: { error: "認証が必要です" }, status: :unauthorized
    end
  end
end
