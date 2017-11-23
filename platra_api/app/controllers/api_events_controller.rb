class ApiEventsController < ApplicationController
    require 'open-uri'
    skip_before_action :verify_authenticity_token
    before_action :set_cors

    def set_cors
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Request-Method'] = '*'
    end

    def show
        logger.debug params 
        #api_key = 'AIzaSyDEiC_i0rhwIaKQDM2X2Pm3OJW3A30-SVY'
        api_key = 'AIzaSyAdcW1tyOj-ZYZTkfjtFRrvPnuTE-oR7os'
        #location = JSON.parse open("https://maps.googleapis.com/maps/api/place/textsearch/json?query=Innsbruck&key=#{api_key}").read
        #lat = location['results'][0]['geometry']['location']['lat']
        #long = location['results'][0]['geometry']['location']['lng']
       
        #events = JSON.parse open("https://maps.googleapis.com/maps/api/place/textsearch/json?location=#{lat},#{long}&type=restaurant&key=#{api_key}").read

        events = JSON.parse('{ "results": [ { "test1": "asdf" }, { "test2": "asdf" }] }')
        render json: events['results']
    end
end
