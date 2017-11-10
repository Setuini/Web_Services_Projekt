class ApiEventsController < ApplicationController
    def show
        render json: { 'test': 'test' } 
    end
end
