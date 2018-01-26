Rails.application.routes.draw do
    resources :users
    mount Knock::Engine => "/knock"

    get '/auth' => 'test#testAuth'

    post '/api/v1/login' => 'user_token#create'
    post '/api/v1/register' => 'users#register'
    get '/api/v1/users' => 'users#index'

    post '/api/v1/places' => 'api_events#show'
    post '/api/v1/places/save' => 'time_table#saveTimeTable'
    get '/api/v1/places' => 'time_table#indexTimeTables'
    get '/api/v1/places/:id' => 'time_table#indexTimeTables'
    post '/api/v1/deletePage' => 'time_table#deleteTimeTable'

end
