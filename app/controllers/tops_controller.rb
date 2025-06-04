class TopsController < ApplicationController
  def index
    if request.format.json?
      render json: { message: "Hi there! Our API is ready for you." }, status: :ok
    else
      render :index
    end
  end
end
