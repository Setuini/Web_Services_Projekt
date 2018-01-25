Rails.application.routes.draw do
    resources :users
    mount Knock::Engine => "/knock"

    post '/user_token' => 'user_token#create'
    get '/list_users' => 'users#index'
    post '/register_user' => 'users#register'
    get '/auth' => 'test#testAuth'
<<<<<<< HEAD
    get '/index_timetable' => 'time_table#indexTimeTables'
    get '/api/places' => 'api_events#show'
=======

    post '/api/places' => 'api_events#show'
>>>>>>> 4479a9bba4a72bd11e82bbd56addd77c0de35ba0
 
end
