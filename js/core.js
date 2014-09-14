/**
@author Vishnu <http://vishnurs.com>
Weather API Support -  http://www.OpenWeatherMap.org
*/



var APPID = 'fbb35ad5307e2ce97c0d2763399b83a3'; 

var button = document.getElementById("submitCity");
var cname = document.getElementById("cname");
var temp = document.getElementById("temp");
var mintemp = document.getElementById("mintemp");
var maxtemp = document.getElementById("maxtemp");
var clouds = document.getElementById("clouds");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var lat = document.getElementById("lat");
var lon = document.getElementById("lon");
var errorDiv = document.getElementById("errorDiv");
var table = document.getElementById("wtable");
var load = document.getElementById("load");

var weatherApp = {
	GetWeather : function(city) {
		load.classList.remove('hide');
		var xmlhttp = new XMLHttpRequest({ mozSystem: true });
		xmlhttp.open('GET',  'test.webapp', true);
		xmlhttp.open('GET',  'http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+APPID, true);
		xmlhttp.send()
		console.log('http://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID='+APPID)
		
		xmlhttp.onreadystatechange = function() {
			
			if(xmlhttp.readyState == 4) {
				load.classList.add('hide');
				response = JSON.parse(xmlhttp.responseText);
				
				if(response.message && response.cod == 404){
					errorDiv.classList.remove('hide');
					table.classList.add('hide')
					errorDiv.innerHTML = 'No such city';
				}
				else {
					table.classList.remove('hide');
					errorDiv.classList.add('hide')
					cname.innerHTML = response.name;
					temp.innerHTML = Math.round(response.main.temp-273.15)+'C';
					mintemp.innerHTML = Math.round(response.main.temp_min-273.15)+'C';
					maxtemp.innerHTML = Math.round(response.main.temp_max-273.15)+'C';
					clouds.innerHTML = response.weather[0].description
					wind.innerHTML = response.wind.speed+'mps';
					humidity.innerHTML = response.main.humidity+'%';
					lat.innerHTML = response.coord.lat;
					lon.innerHTML = response.coord.lon;
				}	
			}
		}
	} 
};

button.addEventListener('click', function(){
	var city = document.getElementById("city").value;
    weatherApp.GetWeather(city);
});
