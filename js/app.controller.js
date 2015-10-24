var WeatherController;

angular.module('weatherApp', []).constant('APIKEY', 'XXXXXXX').controller('WeatherController', WeatherController = (function() {
  function WeatherController($scope, WeatherService) {
    var vm;
    vm = this;
    angular.extend(vm, {
      myClass: 'hide',
      errHide: 'hide',
      tblHide: 'hide',
      getData: function() {
        this.errHide = 'hide';
        if (this.city) {
          this.errHide = 'hide';
          false;
        }
        return WeatherService.getWeather(vm.city).then(function(result) {
          return angular.extend('vm', {
            tblHide: '',
            myClass: 'hide',
            wdata: {
              name: result.name,
              temp: (result.main.temp - 273.15).toFixed(2) + ' C',
              min_temp: (result.main.temp_min - 273.15).toFixed(2) + ' C',
              max_temp: (result.main.temp_max - 273.15).toFixed(2) + ' C',
              weather: result.weather[0].description,
              wind: result.wind.speed + ' mps',
              humidity: result.main.humidity + ' %',
              lat: result.coord.lat,
              lon: result.coord.lon
            }
          });
        });
      }
    });
  }

  return WeatherController;

})());

WeatherController.$inject = ['$scope', 'WeatherService'];
