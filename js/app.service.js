var WeatherService;

angular.module('weatherApp').service('WeatherService', WeatherService = (function() {
  function WeatherService($http, APIKEY) {
    var API_URL;
    API_URL = 'http://api.openweathermap.org/data/2.5/weather?APPID=' + APIKEY;
    this.getWeather = function(city) {
      API_URL = API_URL + '&q=' + city;
      return $http.get(API_URL).then(function(response) {
        return response.data;
      });
    };
  }

  return WeatherService;

})());

WeatherService.$inject = ['$http', 'APIKEY'];
