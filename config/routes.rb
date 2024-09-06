Rails.application.routes.draw do
  namespace :admin do
    resource :session, only: [:new, :create, :destroy]
    resources :posts
    resources :tags
    resource :dashboard
  end

  resources :posts, only: [:index, :show]
  get 'contacts/create'
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    resources :contacts, only: :create
  end

  resources :contacts, only: :create

  get "/about", to: "pages#about", as: :about
  get "/admin", to: "admin/dashboard#show", as: :admin

  root "pages#index"
end
