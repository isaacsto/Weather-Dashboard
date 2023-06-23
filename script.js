//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys

//APIKey/initialize arrays
var APIKey = "d1cb29ff12063ca4c92fd18316bf0c50";
var searchHistory = [];
var city = "";
/* var citySearch = ""; */

//get date
const currentDate = new Date();
const dateString = currentDate.toDateString();
console.log(dateString);




 //makes searchBtn clickable, puts value of user input into variable, alerts if invalid value is input 

document.getElementById("searchBtn").addEventListener("click", function (event) {
  searchingCity();
  clearHistory();
});

function searchingCity() {
  
    city = document.getElementById("cityInput").value; 
    var searchInput = document.getElementById('cityInput');
    var searchValue = searchInput.value;

    if (searchValue === "") {
        alert("Please Enter a valid city name")
        return;
    }

  city = searchValue;

    //push city value to cityInput el
   searchHistory.push(city);
   console.log(searchHistory)

    //save to localstorage 
    localStorage.setItem('city', JSON.stringify(searchHistory));

    /* displayHistory(); */
    getTodayWeather();
    getFiveDayForecast();
  
};

function clearHistory() {
  var forecastWrapper = document.getElementById("forecast-wrapper");
  forecastWrapper.innerHTML = "";

 
  localStorage.setItem('city', JSON.stringify(searchHistory));

 /*  displayHistory();  */
}

/* function displayHistory() {
  
  var histButton = document.getElementById('historyButtonCont');
  histButton.innerHTML = "";

  searchHistory = JSON.parse(localStorage.getItem('city')) || [];

  searchHistory.forEach(function (city) {
    var button = document.createElement("button");
    button.textContent = city;
    button.addEventListener("click", function () {
      searchingCity(city);
      clearHistory(); 
    });
    histButton.appendChild(button)
  })



}; */


function getTodayWeather(){
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&units=imperial&appid=" + APIKey;

    var todayBody = $('.todayBody').empty();
    var todayRow = $('.today-row');

    todayRow.hide();

    fetch(currentWeatherUrl)
    .then(function(response) {
   
      return response.json();
    })
    .then(function(data) {
      console.log(data)

      $('.todayCityName').text(data.name);
      $('.todayCard').text(currentDate);
      $('.icons').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

      
      var weatherContainer = $('<div>').addClass('weatherContainer');

      var pEl = $('<p>').addClass('weatherDetail').text(`Temperature: ${data.main.temp} °F`);
      weatherContainer.append(pEl);
      var pElTemp = $('<p>').addClass('weatherDetail').text(`Feels Like: ${data.main.feels_like} °F`);
      weatherContainer.append(pElTemp);
      var pElHumid = $('<p>').addClass('weatherDetail').text(`Humidity: ${data.main.humidity} %`);
      weatherContainer.append(pElHumid);
      var pElWind = $('<p>').addClass('weatherDetail').text(`Wind Speed: ${data.wind.speed} MPH`);
      weatherContainer.append(pElWind);

      todayBody.append(weatherContainer);

      todayRow.show();
    })
    .catch(function(error) {
      console.log(error);
    });


};


function getFiveDayForecast() {
  var fiveDayWeatherUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(city) + "&units=imperial&appid=" + APIKey;

  fetch(fiveDayWeatherUrl)
    .then(function(response) {
      return response.json();
    })
 .then(function(data) {
      displayFiveDayForecast(data);
    });  
}

function displayFiveDayForecast(data) {

  console.log(data);

var forecasts = data.list.slice(1, 6); 
  
  var forecastContainer = document.createElement("div");
  forecasts.forEach(function(forecast) {

    var date = new Date(forecast.dt_txt); 
    var temperature = forecast.main.temp;
    var feelsLike = forecast.main.feels_like;
    var humidity = forecast.main.humidity;
    var windSpeed = forecast.wind.speed;
    var icon = forecast.weather[0].icon

    var imgEl = document.createElement("img");
    imgEl.src = `https://openweathermap.org/img/wn/${icon}.png`;
    forecastContainer.appendChild(imgEl);

    var pElDate = document.createElement("p");
    pElDate.textContent = `Date: ${date.toLocaleDateString()}`; 
    forecastContainer.appendChild(pElDate);

    var pElTemp = document.createElement("p");
    pElTemp.textContent = `Temperature: ${temperature} °F`;
    forecastContainer.appendChild(pElTemp);

    var pElFeelsLike = document.createElement("p");
    pElFeelsLike.textContent = `Feels Like: ${feelsLike} °F`;
    forecastContainer.appendChild(pElFeelsLike);

    var pElHumid = document.createElement("p");
    pElHumid.textContent = `Humidity: ${humidity} %`;
    forecastContainer.appendChild(pElHumid);

    var pElWind = document.createElement("p");
    pElWind.textContent = `Wind Speed: ${windSpeed} MPH`;
    forecastContainer.appendChild(pElWind);

  });

 var forecastWrapper = document.getElementById("forecast-wrapper");
  forecastWrapper.append(forecastContainer);  
}





