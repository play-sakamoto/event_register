class Api::V1::EventsController < ApplicationController
  def index
    @events = Event.find(id: current_user)
    render json: @events
    end
  end
end
