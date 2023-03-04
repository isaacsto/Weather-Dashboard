//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
var APIKey = "e87ec7f203ff2e1f695f40b6fe50b1e1";
var searchHistory = [];
var city = []


// defines fiveDayForecastDiv globally for fetch to circumvent dev tools error that showed up
var fiveDayForecastDiv = document.querySelector("#fiveDayForecast");
console.log(fiveDayForecastDiv);


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
            // for loop iterates through data array so only 5 temperatures show up  
            for (i = 0; i < 5; i++) {
                console.log(data.list[i].main.temp)
                var temp = data.list[i].main.temp;
                var tempEl = document.createElement("p");
                tempEl.textContent = temp;
                fiveDayForecastDiv.appendChild(tempEl); 
                console.log(fiveDayForecastDiv)
            }
            //for loop to iterate through data array and display humidity
            for (i = 0; i < 5; i++) {
                console.log(data.list[i].main.humidity)
                var fiveDayHumidity = data.list[i].main.humidity;
                var fiveDayHumidityEl = document.createElement("p");
                fiveDayHumidityEl.textContent = fiveDayHumidity;
                fiveDayForecastDiv.appendChild(fiveDayHumidityEl); 
                console.log(fiveDayForecastDiv)
            
            }
            for (i = 0; i < 5; i++) {
                console.log(data.list[i].wind.speed)
                var fiveDayWind = data.list[i].wind.speed;
                var fiveDayWindEl = document.createElement("p");
                fiveDayWindEl.textContent = fiveDayWind;
                fiveDayForecastDiv.appendChild(fiveDayWindEl); 
                console.log(fiveDayForecastDiv)
            
            }
        })
        .catch(error => {
            console.log(error);
        })
    

}

