console.log("script.js is running")

var getWeather = function (cityName) {
	var apiUrl ='https://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&units=imperial&appid=c70684ab8e32b401ebbae77e992b5d9f';
	
	fetch(apiUrl).then(function (response) {
		if (response.ok){
		response.json().then(function(data){
		var allDays = data.list;
		for (var i = 0; i< allDays.length; i++){
			var date = allDays[i].dt_txt;
			// console.log(allDays[i]);
			if (date.endsWith("12:00:00")){
				var temp = allDays[i].main.temp;
				var humidity = allDays[i].main.humidity;
				var wind = allDays[i].wind.speed;
				var conditions = allDays[i].weather[0].main;

				date= date.split(" ")[0];

				var forcastEl = document.querySelector('.forecast');
				var card = document.createElement("div");
				var dateEl =document.createElement("h3");
				card.classList.add("card");
				dateEl.textContent = date;
				card.appendChild(dateEl);
				forcastEl.appendChild(card);
				console.log("wind:" + wind)
				console.log("conditions:" + conditions)
				console.log("temp:" + temp)
				console.log("humidity:" + humidity)
				console.log("date:"date);
			}
		}

			// displayWeather(data.current[0])
		})
		}
		})}
getWeather("Atlanta");