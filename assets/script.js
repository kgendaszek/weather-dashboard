console.log("script.js is running")
var getWeatherBtn = document.getElementById("search-button");
var cityNameEl = document.querySelector("#city-search");
var citySearchEl = document.querySelector("#search-form");
var pastSearchButtonEl = document.querySelector("#past-search-buttons")
var displayAreasEl = document.getElementsByClassName("card")

function setToday() {
	var currentDay = moment().format("ddd, MMM, Do, YYYY")
	$("#today").text("Forecast for Today: " + currentDay);

};
setToday();
var getFutureWeather = function (cityName) {
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
						windEl.textContent = "Wind Speed: " + wind;
						card.appendChild(windEl);

						var conditionsEl = document.createElement("h4");
						conditionsEl.textContent = "Weather Conditions: " + conditions;
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
	var todayApi = "https://api.openweathermap.org/data/2.5/weather?q=" + nameCity + "&units=imperial&appid=c70684ab8e32b401ebbae77e992b5d9f";
	fetch(todayApi).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				// console.log(data);
				var todayName = data.name;
				console.log("City: "+ todayName)
				var todayTemp = data.main.temp;
				console.log("todaytemp" + todayTemp);
				var todayHumidity = data.main.humidity;
				console.log('todayHumidity' + todayHumidity);
				var todayConditions = data.weather[0].description;
				console.log(todayConditions)


				var todayForecastEl = document.querySelector('.today-forecast');
				var card = document.createElement("div");
				card.classList.add("card");
				todayForecastEl.appendChild(card);

				var todayEl = document.createElement("h2");
				todayEl.textContent = "Weather for: " + todayName;
				card.appendChild(todayEl);

				var tempEl = document.createElement("h4");
				tempEl.textContent = "Temp: " + todayTemp;
				card.appendChild(tempEl);

				var humidityEl = document.createElement("h4");
				humidityEl.textContent = "Humidity: " + todayHumidity;
				card.appendChild(humidityEl);

				var conditionsEl = document.createElement("h4");
				conditionsEl.textContent = "Weather Conditions: " + todayConditions;
				card.appendChild(conditionsEl);
			})
		}
	})
}
function init() {
	var savedCity = localStorage.getItem("savedcity");
	if (savedCity !== null) {
		city = savedCity;
		console.log(savedCity);
		pastSearch(savedCity);
	}
}

	var formSearch = function (event) {
		// console.log(formSearch);
		event.preventDefault();
		var city = cityNameEl.value.trim();
		if (city) {
			getFutureWeather(city);
			getTodayWeather(city);
			displayAreasEl.textContent= '';
			cityNameEl.value = '';
			localStorage.setItem("savedcity", city);
			console.log(localStorage);
		}
		pastSearch(city);
		console.log(city);
	}
	var pastSearch = function (pastSearch) {
		console.log('past Search: ', pastSearch);
		if (pastSearch != '') {
			var pastSearchEl = document.createElement('button');
			pastSearchEl.textContent = pastSearch;
			pastSearchEl.classList = 'border';
			pastSearchEl.setAttribute('data-city', pastSearch);
			pastSearchEl.addEventListener('click', searchAgain);

			pastSearchButtonEl.prepend(pastSearchEl);
			

		}
	};

	var searchAgain = function (event) {
		event.preventDefault();
		var targetCity = event.target.getAttribute('data-city');
		displayAreasEl.textContent= '';
		console.log(targetCity);
		getTodayWeather(targetCity);
		getFutureWeather(targetCity);
	}


	citySearchEl.addEventListener("submit", formSearch);
	init();