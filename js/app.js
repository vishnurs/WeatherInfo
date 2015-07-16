/**
@author Vishnu <http://vishnurs.com>
Weather API Support -  http://www.OpenWeatherMap.org
*/

angular.module('weatherApp', []).
constant('APIKEY', 'XXXXXXX').
controller('WeatherController', ['$scope', 'WeatherService', 'TypeAheadService', function($scope, WeatherService, TypeAheadService) {
    var vm = this;
    vm.myClass = vm.errHide = vm.tblHide = "hide";
    vm.getData = function() {
        vm.errHide = "hide";
        if(!vm.city) {
            vm.errHide = '';
            return false;
        }
        vm.myClass = '';

        vm.wdata = {};

        WeatherService.getWeather(vm.city).then(function(result){
            vm.tblHide = '';
            vm.myClass = 'hide';
            vm.wdata.name = result.name;
            vm.wdata.temp = (result.main.temp-273.15).toFixed(2)+' C';
            vm.wdata.min_temp = (result.main.temp_min-273.15).toFixed(2)+' C';
            vm.wdata.max_temp = (result.main.temp_max-273.15).toFixed(2)+' C';
            vm.wdata.weather = result.weather[0].description;
            vm.wdata.wind = result.wind.speed+' mps';
            vm.wdata.humidity = result.main.humidity+' %';
            vm.wdata.lat = result.coord.lat;
            vm.wdata.lon = result.coord.lon;

            console.log(result)
        });

    };
    vm.getLikeData = function() {

        if(vm.city !== undefined && vm.city.length > 3) {
            console.log(vm.city);
            TypeAheadService.getWeatherTypeAhead(vm.city).then(function(result) {
                console.log(result)
            })
        }

    }

}]).
factory('Weather', ['$http','APIKEY', function($http, APIKEY) {
    var API_URL = 'http://api.openweathermap.org/data/2.5/weather?APPID='+APIKEY;
    var get = function(city) {
        API_URL = API_URL+'&q='+city;

        return $http.get(API_URL).then(function(response) {
            return response.data
        })
    }
    return { get: get };
}])
    .service('WeatherService', ['$http', function($http, APIKEY)  {
        var API_URL = 'http://api.openweathermap.org/data/2.5/weather?APPID='+APIKEY;
        this.getWeather = function(city) {
            API_URL = API_URL+'&q='+city;
            return $http.get(API_URL).then(function(response) {
                return response.data;
            })
        }
    }])
    .service('TypeAheadService', ['$http', 'APIKEY', function($http, APIKEY) {
        var API_URL;
        this.getWeatherTypeAhead = function(city) {
            API_URL = '';
            API_URL = 'http://api.openweathermap.org/data/2.5/weather?APPID='+APIKEY+'&type=like';
            API_URL = API_URL+'&q='+city;
            console.log(API_URL)
            return $http.get(API_URL).then(function(response) {
                return response.data;
            })
        }
    }])
    .directive('ngvtyping', function() {
    return {
        restrict: 'A',
        template: '',
        link: function($scope, element, attrs) {

        }

    }
})
