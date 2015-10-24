angular.module 'weatherApp'

.service 'WeatherService', class WeatherService
        constructor: ($http, APIKEY) ->
            API_URL = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + APIKEY;
            @getWeather = (city) ->
                API_URL = API_URL + '&q=' + city;
                $http.get(API_URL).then (response) ->
                    response.data;
        
WeatherService.$inject = ['$http', 'APIKEY']