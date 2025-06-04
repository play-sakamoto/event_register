class Api::V1::SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: user.id)
      cookies.encrypted[:jwt] = {
        value: token,
        httponly: true,
        secure: Rails.env.production?,
        same_site: :lax
      }
      render json: { message: "ログインしました" }, status: :ok
    else
      render json: { error: "無効な認証情報です" }, status: :unauthorized
    end
  end

  def destroy
    cookies.delete(:jwt)
    render json: { message: "ログアウトしました" }, status: :ok
  end

  def me
    if current_user
      render json: { user: current_user.as_json(only: [ :id, :name, :email ]) }, status: :ok
    else
      render json: { error: "認証が必要です" }, status: :unauthorized
    end
  end
end
