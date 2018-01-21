Rails.application.routes.draw do
    resources :users
    mount Knock::Engine => "/knock"

    post '/user_token' => 'user_token#create'
    get '/list_users' => 'users#index'
    post '/register_user' => 'users#register'
    get '/auth' => 'test#testAuth'
 
end
