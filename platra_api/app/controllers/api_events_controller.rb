# relevant places types for entertainment
# spa, casino, amusement park, beauty salon, aquarium, art_gallery, bowling_alley, bar, book_store,
# cafe, church, hair_care, movie_theater, museum, night_club, park, shopping_mall, zoo

# relevant information per place
# location (lat, lng), name, rating, photos, opening_hours, phone_number, outdoors, place_id

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
    require 'thread'
    #skip_before_action :verify_authenticity_token
    before_action :set_cors

    def set_cors
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Request-Method'] = '*'
    end

    def set_places_api_key()

    end

    def initialize
        places_keys = [
            'AIzaSyAvIM-BatjjbH5i-ZfJaFA6OudweMTa7aI',
            'AIzaSyAA7oeWdNhvVCIIk7SQE3IWKON7z4tA5Rg',
            'AIzaSyA0009rGVaq3T3uQ3f17TfrJX_IrtTjtvQ',
            'AIzaSyDXKuWJmiXiD1yBY5qOsZDyg7Y3pVHtkC0',
            'AIzaSyDloBMbRkCkmil3r6eitffzB9do1UtMDt4',
            'AIzaSyByU6NYzZ25mFtejOUWc1SUeTx-eyr6HJM',
            'AIzaSyBfbjh992zNiaHpqvWCGJkx3ocgOcsvROU',
            'AIzaSyAkBjJvD-WB0wp3M3rCn7ylT2AETfPHAZg',
        ]

        # loop over Places API keys to try to prevent over quota error
        for i in 0..places_keys.length-1
            @places_api_key = places_keys[i]
            response = JSON.parse open("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=47.2667018,11.4008976&type=park&rankby=distance&key=#{@places_api_key}").read
            if response["status"] != "OVER_QUERY_LIMIT"
                logger.debug "API_KEY_NR: #{i}"
                break
            end
        end

        @weather_api_key = 'e4b258a5707a4e9689e7f994287949a1'

        @types = ["spa", "casino", "amusement_park", "beauty_salon", "aquarium", "art_gallery", "bowling_alley", "book_store", "museum", "park", "shopping_mall", "zoo"]
        @outdoor_types = ["park", "zoo"]
        @evening_types = ["night_club", "bar", "movie_theater"]

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
        lng = location['results'][0]['geometry']['location']['lng']
        return {"lat" => lat, "lng" => lng}
    end

    def get_poi(city, types, excludes = [], lat="", lng="")
        if !city.empty?
            location = get_location(city)
            lat = location["lat"]
            lng = location["lng"]
        end

        #response = JSON.parse open("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#{lat},#{lng}&type=park&rankby=distance&key=#{@places_api_key}").read

        poi_cache_list = PointOfInterest.select("params").where("location = ? and types != ?", city, "null")

        return @places.spots(lat, lng, :types => types, :excludes => excludes)
        #return JSON.parse poi_cache_list.to_json
    end

    def get_poi_details(place_id)
        return @places.spot(place_id)
    end

    def get_poi_photos(spot)
        photos = Array.new
        #length = spot.photos.length-1
        length = 0
        if length > 1 
            length = 1 
        end 

        # only get one photo for now
        for i in 0..length
            if spot.photos[i]
                photos[i] = spot.photos[i].fetch_url(800)
            end
        end

        return photos
    end

    def get_distance(origins, destinations)
        distance = JSON.parse open("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=#{origins}&destinations=#{destinations}&key=#{@places_api_key}").read
    end

    def get_activity_time(activity)
        case activity
        when 0 
            return [Time.parse("08:00"), Time.parse("10:00")]
        when 1 
            return [Time.parse("10:00"), Time.parse("12:00")]
        when 2 
            return [Time.parse("12:00"), Time.parse("14:00")]
        when 3 
            return [Time.parse("14:00"), Time.parse("18:00")]
        when 4 
            return [Time.parse("18:00"), Time.parse("20:00")]
        when 5 
            return [Time.parse("20:00"), Time.parse("24:00")]
        end
    end

    def create_poi_object(poi, activity_name)
        if poi == nil
            return nil
        end

        poi_details = get_poi_details(poi["place_id"])
        poi_object = Hash.new
        poi_object["place_id"] = poi["place_id"]
        poi_object["lat"] = poi["lat"]
        poi_object["lng"] = poi["lng"]
        poi_object["name"] = poi["name"]
        poi_object["rating"] = poi["rating"]
        poi_object["photos"] = get_poi_photos(poi_details)
        poi_object["opening_hours"] = poi_details["opening_hours"] 
        poi_object["phone_number"] = poi_details["international_phone_number"]
        poi_object["types"] = poi["types"]
        poi_object["outdoors"] = false 
        poi_object["time"] = get_activity_time(activity_name)

        return poi_object
    end

    def show
        logger.debug params

        from = Date.parse(params["startDate"])
        to = Date.parse(params["endDate"])
        duration = to - from

        location = params["location"]

        timetable = Hash.new
        duplicate_activities = []
        for i in 0..duration

            day = Hash.new
            exclude_activites = []
            activities = get_poi(location, [@types[rand(@types.length)], @types[rand(@types.length)], @types[rand(@types.length)]])
            evening_activities = get_poi(location, @evening_types)
            restaurants = get_poi(location, ["restaurant"])

            # multithread
            threads = []
            threads << Thread.new { 
                day[0] = create_poi_object(restaurants[0], 0)
            }

            threads << Thread.new { 
                day[1] = create_poi_object(activities[rand(activities.length)], 1) 
            }

            threads << Thread.new { 
                day[2] = create_poi_object(restaurants[1], 2)
            }

            threads << Thread.new { 
                day[3] = create_poi_object(activities[rand(activities.length)], 3) 
            }

            threads << Thread.new { 
                day[4] = create_poi_object(restaurants[2], "dinner", 4)
            }

            threads << Thread.new { 
                day[5] = create_poi_object(evening_activities[rand(evening_activities.length)], 5)
            }
            threads.each {|t| t.join}

            for item in day
                poi = item[1]
                if poi && !(PointOfInterest.exists?(place_id: poi["place_id"]))
                    poi_db = PointOfInterest.new(:location => location, :name => poi["name"], :longitude => poi["lng"], :latitude => poi["lat"], :place_id => poi["place_id"], :types => poi["types"], :params => poi.to_json);
                  poi_db.save
                end

                #logger.debug duplicate_activities.include?(item[1]["place_id"])
                #if !duplicate_activities.include?(item[1]["place_id"]) 
                    #duplicate_activities.push item[1]["place_id"]
                #else
                    #logger.debug "ACTIVITY ALREADY EXISTS"
                #end
            end

            timetable[(from + i).to_s] = day
        end

        render json: timetable 
    end
end
