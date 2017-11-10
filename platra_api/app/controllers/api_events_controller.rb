class ApiEventsController < ApplicationController
require 'open-uri'
    def show
        api_key = 'AIzaSyDEiC_i0rhwIaKQDM2X2Pm3OJW3A30-SVY'
        location = JSON.parse open("https://maps.googleapis.com/maps/api/place/textsearch/json?query=Innsbruck&key=#{api_key}").read
        lat = location['results'][0]['geometry']['location']['lat']
        long = location['results'][0]['geometry']['location']['lng']
       
        events = JSON.parse open("https://maps.googleapis.com/maps/api/place/textsearch/json?location=#{lat},#{long}&type=restaurant&key=#{api_key}").read

        render json: events['results']
    end
end
