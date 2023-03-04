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
            //makes variables arrays so data can more easily be extracted for the display
            var temp = []
            var fiveDayHumidity = []
            var fiveDayWind = []
            console.log(data)
            // for loop iterates through data array so only 5 temperatures show up  
            for (i = 0; i < 5; i+8) {
                console.log(data.list[i].main.temp)
                temp.push(data.list[i].main.temp);
            }
            //for loop to iterate through data array and display humidity
            for (i = 0; i < 5; i++) {
                console.log(data.list[i].main.humidity)
                fiveDayHumidity.push(data.list[i].main.humidity);
            }
            //for loop to iterate through data array and displays wind speed
            for (i = 0; i < 5; i++) {
                console.log(data.list[i].wind.speed)
                fiveDayWind.push(data.list[i].wind.speed)
            }

            //concatenate values of each data variable
            var tempHumidWind1 = `${temp[0]} ${fiveDayHumidity[0]} ${fiveDayWind[0]}`
            var fiveDayDisplayEl = document.createElement("p")
            fiveDayDisplayEl.textContent = tempHumidWind1;
            fiveDayForecastDiv.appendChild(fiveDayDisplayEl);

            var tempHumidWind2 = `${temp[1]} ${fiveDayHumidity[1]} ${fiveDayWind[1]}`
            var fiveDayDisplayEl = document.createElement("p")
            fiveDayDisplayEl.textContent = tempHumidWind2;
            fiveDayForecastDiv.appendChild(fiveDayDisplayEl);

            var tempHumidWind3 = `${temp[2]} ${fiveDayHumidity[2]} ${fiveDayWind[2]}`
            var fiveDayDisplayEl = document.createElement("p")
            fiveDayDisplayEl.textContent = tempHumidWind3;
            fiveDayForecastDiv.appendChild(fiveDayDisplayEl);

            var tempHumidWind4 = `${temp[3]} ${fiveDayHumidity[3]} ${fiveDayWind[3]}`
            var fiveDayDisplayEl = document.createElement("p")
            fiveDayDisplayEl.textContent = tempHumidWind4;
            fiveDayForecastDiv.appendChild(fiveDayDisplayEl);

            var tempHumidWind5 = `${temp[4]} ${fiveDayHumidity[4]} ${fiveDayWind[4]}`
            var fiveDayDisplayEl = document.createElement("p")
            fiveDayDisplayEl.textContent = tempHumidWind5;
            fiveDayForecastDiv.appendChild(fiveDayDisplayEl);
        
          

        })
        .catch(error => {
            console.log(error);
        })
    

}

