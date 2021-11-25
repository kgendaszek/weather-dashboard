console.log("script.js is running")
var getWeatherBtn = document.getElementById("search-button");
var cityNameEl = document.querySelector("#city-search");
var citySearchEl = document.querySelector("#search-form");
function setToday() {
    var currentDay = moment().format("ddd, MMM, Do, YYYY")
    $("#today").text("Forecast for Today: " + currentDay);
    
};
setToday();
var getFutureWeather = function (cityName) {
	console.log(cityName);
	var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=c70684ab8e32b401ebbae77e992b5d9f';
	fetch(apiUrl).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				var allDays = data.list;
				for (var i = 0; i < allDays.length; i++) {
					var date = allDays[i].dt_txt;
					// console.log(allDays[i]);
					if (date.endsWith("12:00:00")) {
						var temp = allDays[i].main.temp;
						var humidity = allDays[i].main.humidity;
						var wind = allDays[i].wind.speed;
						var conditions = allDays[i].weather[0].main;

						date = date.split(" ")[0];

						var forecastEl = document.querySelector('.forecast');
						var card = document.createElement("div");
						card.classList.add("card");
						forecastEl.appendChild(card);

						var dateEl = document.createElement("h3");
						dateEl.textContent = date;
						card.appendChild(dateEl);

						var tempEl = document.createElement("h4");
						tempEl.textContent = "Temp: " + temp;
						card.appendChild(tempEl);

						var humidityEl = document.createElement("h4");
						humidityEl.textContent = "Humidity: " + humidity;
						card.appendChild(humidityEl);

						var windEl = document.createElement('h4');
						windEl.textContent = "WindSpeed: " + wind;
						card.appendChild(windEl);

						var conditionsEl = document.createElement("h4");
						conditionsEl.textContent = "WeatherConditions: " + conditions;
						card.appendChild(conditionsEl);

						console.log("wind:" + wind)
						console.log("conditions:" + conditions)
						console.log("temp:" + temp)
						console.log("humidity:" + humidity)
						console.log("date:" + date);

					}
				}
			})
		}
	})
};
var getTodayWeather = function (nameCity) {
	console.log(nameCity)
	var todayApi = "https://api.openweathermap.org/data/2.5/weather?q="+ nameCity +"&units=imperial&appid=c70684ab8e32b401ebbae77e992b5d9f";
	fetch (todayApi).then(function(response){
		if (response.ok) {
			response.json().then(function(data){
				var todayTemp = data.main.temp; 
				console.log("todaytemp"+ todayTemp);
				var todayHumidity = data.main.humidity;
				console.log('todayHumidity' + todayHumidity);
				var todayConditions= data.weather[0].description; 
				console.log(todayConditions)
				var todayIcon = data.weather[0].icon;
				console.log(todayIcon);

				var todayForecastEl = document.querySelector('.today-forecast');
						var card = document.createElement("div");
						card.classList.add("card");
						todayForecastEl.appendChild(card);

						var tempEl = document.createElement("h4");
						tempEl.textContent = "Temp: " + todayTemp;
						card.appendChild(tempEl);

						var humidityEl = document.createElement("h4");
						humidityEl.textContent = "Humidity: " + todayHumidity;
						card.appendChild(humidityEl);

						var conditionsEl = document.createElement("h4");
						conditionsEl.textContent = "WeatherConditions: " + todayConditions;
						card.appendChild(conditionsEl);
			})
		}
	})
}

var formSearch = function (event) {
	console.log('formSearch');
	event.preventDefault();
	var city = cityNameEl.value.trim();
	if (city) {
		getFutureWeather(city);
		getTodayWeather(city);
		cityNameEl.value = '';
	}

	console.log(city);
};

citySearchEl.addEventListener("submit", formSearch);

// getFutureWeather("Philadelphia");