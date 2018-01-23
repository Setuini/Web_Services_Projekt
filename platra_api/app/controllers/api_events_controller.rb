# relevant places types for entertainment
# spa, casino, amusement park, beauty salon, aquarium, art_gallery, bowling_alley, bar, book_store,
# cafe, church, hair_care, movie_theater, museum, night_club, park, shopping_mall, zoo

# relevant information per place
# location (lat, long), name, rating, photos, opening_hours, phone_number, outdoors, place_id

# time-based context
# breakfast 8:00 - 10:00
# morning activity 10:00 - 12:00
# lunch 12:00 - 14:00
# afternoon activity 14:00 - 18:00
# dinner 18:00 - 20:00
# evening activity 20:00 - 24:00

# location-based context
# places api rankby=distance 

# weather-based context
# compare weather forecast and historical weather data  


class ApiEventsController < ApplicationController
    require 'open-uri'
    #skip_before_action :verify_authenticity_token
    before_action :set_cors

    def set_cors
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Request-Method'] = '*'
    end

    def initialize
        #@places_api_key = 'AIzaSyDEiC_i0rhwIaKQDM2X2Pm3OJW3A30-SVY'
        #@places_api_key = 'AIzaSyAdcW1tyOj-ZYZTkfjtFRrvPnuTE-oR7os'
        @places_api_key = 'AIzaSyAA7oeWdNhvVCIIk7SQE3IWKON7z4tA5Rg'
        @weather_api_key = 'e4b258a5707a4e9689e7f994287949a1'

        @places = GooglePlaces::Client.new(@places_api_key)
    end

    # Weatherbit Weather Forecast (16 day forecast)
    def get_weather_forecast(city, date)
        today = Date.today
        if (date - today).to_i < 16
            return JSON.parse open("https://api.weatherbit.io/v2.0/forecast/daily?city=#{city}&key=#{@weather_api_key}").read
        else
            return false
        end
    end

    def get_location(city)
        location = JSON.parse open("https://maps.googleapis.com/maps/api/geocode/json?address=#{city}&key=#{@places_api_key}").read
        lat = location['results'][0]['geometry']['location']['lat']
        long = location['results'][0]['geometry']['location']['lng']
        return {"lat" => lat, "long" => long}
    end

    def get_poi(city, lat="", long="")
        if !city.empty?
            location = get_location(city)
            lat = location["lat"]
            long = location["long"]
        end

        #response = JSON.parse open("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{long}&type=park&rankby=distance&key=#{@places_api_key}").read

        return @places.spots(lat, long, :types => ['park', 'museum'])
    end

    def get_poi_details(place_id)
        response = JSON.parse open("https://maps.googleapis.com/maps/api/place/details/json?placeid=#{place_id}&key=#{@places_api_key}").read 
        return response 
    end

    def show
        logger.debug params
    
        from = Date.new(2018, 1, 23)
        to = Date.new(2018, 1, 28)
        duration = to - from

        timetable = Hash.new
        for i in 0..duration
            day = Hash.new
            #poi 
            day["breakfast"] = ""
            day["morning_activity"] = ""
            day["lunch"] = ""
            day["afternoon_activity"] = ""
            day["dinner"] = ""
            day["evening_activity"] = ""
            timetable[(from + i).to_s] = day
        end


        events = get_poi("", 47.2718972802915, 11.4073689302915)
        #forecast = weather("Innsbruck", Date.new(2018, 2, 7))
        render json: events 
        #render json: timetable
    end
end
