Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :categories, param: :list_name_encoded  do
    resources :books, only: [:index, :create, :update, :destroy], param: :isbn
  end

  post 'categories', to: 'categories#create'
  get 'categories', to: 'categories#index'
end
