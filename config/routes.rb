Rails.application.routes.draw do
  root "tops#index"
  get "*path", to: "tops#index", constraints: ->(request) { !request.path.start_with?("/api/") }
  namespace :api do
    namespace :v1 do
      resources :users, only: [ :create ]
      resource :sessions, only: [ :create, :destroy ]
      get "me", to: "sessions#me"
      resources :memories, only: [ :index, :create, :show, :update, :destroy ]
      resource :profile, only: [ :show ]
      resources :events, only: %i[ index show create update destroy ] do
        resources :items, only: %i[ index show create update destroy ]
        resources :sales, only: %i[ index show create update destroy ]
        resources :stocks, only: %i[ index show create update destroy ]
      end
    end
  end

  resources :events do
    resources :items
    resources :sales
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end
