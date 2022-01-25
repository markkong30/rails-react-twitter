Rails.application.routes.draw do
  root to: 'static_pages#index'

  namespace :api do
    # USERS
    post '/users'                  => 'users#create'

    # SESSIONS
    post '/sessions'               => 'sessions#create'
    get  '/authenticated'          => 'sessions#authenticated'
    delete '/sessions'             => 'sessions#destroy'

    # TWEETS
    post '/tweets'                 => 'tweets#create'
    get  '/tweets'                 => 'tweets#index'
    delete '/tweets/:id'           => 'tweets#destroy'
    get  '/users/:username/tweets' => 'tweets#index_by_user'
    get  '/tweets/search/:keyword' => 'tweets#search'
  end

  get '/' => 'static_pages#index'
  get 'tweets' => 'static_pages#index'
  get 'tweets/search=*uri' => 'static_pages#index'
  get 'tweets/*uri' => 'static_pages#index'
  # get '*path' => 'static_pages#index'
end
