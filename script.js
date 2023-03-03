//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
var APIKey = "e87ec7f203ff2e1f695f40b6fe50b1e1";
var searchHistory = [];
var city = [];

//makes searchBtn clickable, puts value of user input into variable, alerts if invalid value is input 
document.querySelector("#searchBtn").addEventListener("click", function () {
    var cityInput = document.querySelector("#cityInput").value;
    if (cityInput === "") {
        alert("Please Enter a valid city name")
        return;
    }
callFetch(cityInput);
    
})

function callFetch(city) {
   
    //gets date for display
    var currentDate = new Date();
    var month = currentDate.getMonth();
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var fullDate = month + '/' + day + '/' + year;

    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    // fetches queryUrl converts response to json then selects weatherInfo div 
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var weatherInfoDiv = document.querySelector("#weatherInfo");
            weatherInfoDiv.innerHTML = `${data.name} ${fullDate} <br> Temperature: ${data.main.temp}<br> Wind Speed: ${data.wind.speed}<br> Humidity: ${data.main.humidity}%`  

            //set weather data from API as div content
            //adds city to search history
            searchHistory.push(data.name);
            var searchHistoryDiv = document.querySelector("#searchHistory");
            // searchHistoryDiv.innerHTML =  

        })
        .catch(error => {
            console.log(error);
            alert("Unable to get weather data at this time")
        })

    var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}` 
    //fetches 5 day forecast
    fetch(fiveDayForecast)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var fiveDayForecastDiv = document.querySelector("#fiveDayForecastDive");
            for (i = 0; i < data.list.length; i+8) {
            fiveDayForecastDiv.innerHTML = `${fullDate} <br> ${data.list.main.temp}`
            }
        })
        .catch(error => {
            console.error(error);
        })
    

}

