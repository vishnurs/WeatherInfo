angular.module 'weatherApp', []
.constant 'APIKEY', 'XXXXXXX'
.controller 'WeatherController', class WeatherController
    constructor: ($scope, WeatherService) ->
        vm = this
        angular.extend vm,
            myClass: 'hide'
            errHide: 'hide'
            tblHide: 'hide'
            getData: ->
                this.errHide = 'hide'
                if this.city
                    this.errHide = 'hide'
                    false
                WeatherService.getWeather(vm.city).then (result) ->
                    angular.extend 'vm', 
                        tblHide: ''
                        myClass: 'hide'
                        wdata: 
                            name: result.name
                            temp: (result.main.temp-273.15).toFixed(2) + ' C'
                            min_temp: (result.main.temp_min-273.15).toFixed(2) + ' C'
                            max_temp: (result.main.temp_max-273.15).toFixed(2) + ' C'
                            weather: result.weather[0].description
                            wind: result.wind.speed + ' mps'
                            humidity: result.main.humidity + ' %'
                            lat: result.coord.lat
                            lon: result.coord.lon

WeatherController.$inject = ['$scope', 'WeatherService'] 