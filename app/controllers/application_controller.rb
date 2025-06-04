class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def current_user
    token = cookies.encrypted[:jwt]
    return unless token
    decoded = JsonWebToken.decode(token)
    @current_user ||= User.find_by(id: decoded[:user_id])
  rescue => e
    Rails.logger.warn("JWT decode failed: #{e.message}")
    nil
  end


  def authenticate_user!
    render json: { error: "認証が必要です" }, status: :unauthorized unless current_user
  end
end
