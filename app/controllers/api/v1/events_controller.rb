class Api::V1::EventsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event, only: [:show, :update, :destroy]

  # GET /api/v1/events
  def index
    @events = current_user.events
    render json: @events
  end

  # GET /api/v1/events/:id
  def show
    render json: @event
  end

  # POST /api/v1/events
  def create
    @event = current_user.events.build(event_params)

    if @event.save
      render json: @event, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/events/:id
  def update
    if @event.update(event_params)
      render json: @event
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/events/:id
  def destroy
    @event.destroy
    head :no_content
  end

  private

  def set_event
    @event = current_user.events.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Event not found" }, status: :not_found
  end

  def event_params
    params.require(:event).permit(:title, :description, :start_time, :end_time)
  end
end
