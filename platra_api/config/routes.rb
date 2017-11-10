Rails.application.routes.draw do
    scope '/api' do
        scope '/v1' do
            scope '/events' do
                get '/' => 'api_events#show'
                post '/' => 'api_events#show'
                #scope '/:name' do
                #get '/' => 'api_projects#show'
                #put '/' => 'api_projects#update'
                #end
            end
        end
    end 
end
