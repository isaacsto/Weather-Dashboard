//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
var APIKey = "e87ec7f203ff2e1f695f40b6fe50b1e1";
var searchHistory = [];
var city = []


// defines days divs globally for fetch to circumvent dev tools error that showed up
var dayOneDiv = document.querySelector("#day-one")
var dayTwoDiv = document.querySelector("#day-two")
var dayThreeDiv = document.querySelector("#day-three")
var dayFourDiv = document.querySelector("#day-four")
var dayFiveDiv = document.querySelector("#day-five")

//makes searchBtn clickable, puts value of user input into variable, alerts if invalid value is input 
document.querySelector("#searchBtn").addEventListener("click", function () {
    var cityInput = document.querySelector("#cityInput").value;
    if (cityInput === "") {
        alert("Please Enter a valid city name")
        return;
    }
callFetch(cityInput);

//css display functions 
displayCurrent()
displayDays()
    
})

function callFetch(city) {
   
    //gets date for display
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();
    var fullDate = month + '/' + day + '/' + year;

    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    // fetches queryUrl converts response to json then selects weatherInfo div 
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var weatherInfoDiv = document.querySelector("#weather-info");
            weatherInfoDiv.innerHTML = `${data.name} ${fullDate} <br> Temperature: ${data.main.temp}<br> Wind Speed: ${data.wind.speed}<br> Humidity: ${data.main.humidity}%`  

            //set weather data from API as div content
            //adds city to search history
            searchHistory.push(data.name);
            var searchHistoryDiv = document.querySelector("#searchHistory");
            //searchHistoryDiv.innerHTML =  

        })
        .catch(error => {
            console.log(error);
            alert("Unable to get weather data at this time")
        })

    var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`

    //fetches 5 day forecast`
    fetch(fiveDayForecast)
        .then(response => response.json())
        .then(data => {
            //makes variables arrays so data can more easily be extracted for the display
            var temp = []
            var fiveDayHumidity = []
            var fiveDayWind = []
            console.log(data)
            // for loop iterates through data array so only 5 temperatures show up  
            for (i = 0; i < 40; i += 8) {
                console.log(data.list[i].main.temp)
                temp.push(data.list[i].main.temp);
            }
            //for loop to iterate through data array and display humidity
            for (i = 0; i < 40; i += 8) {
                console.log(data.list[i].main.humidity)
                fiveDayHumidity.push(data.list[i].main.humidity);
            }
            //for loop to iterate through data array and displays wind speed
            for (i = 0; i < 40; i += 8) {
                console.log(data.list[i].wind.speed)
                fiveDayWind.push(data.list[i].wind.speed)
            }

            // get dates for fiveDayForecast
            var newDates = new Date();
            for (var i = 1; i <= 5; i++) {
            var nextDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);

            var day = nextDate.getDate();
            var month = nextDate.getMonth() + 1;
            var year = nextDate.getFullYear();

            var dateString = `${month}/${day}/${year}`
            console.log(dateString)
            }

            //concatenate values of each data variable
            var tempHumidWind1 = `${dateString} Temp:${temp[0]} Humidity:${fiveDayHumidity[0]} Wind-speed:${fiveDayWind[0]}`
            var dayOneEl = document.createElement("p")
            dayOneEl.textContent = tempHumidWind1;
            dayOneDiv.appendChild(dayOneEl);

            var tempHumidWind2= `${dateString}Temp:${temp[1]} Humidity:${fiveDayHumidity[1]} Wind-speed:${fiveDayWind[1]}`
            var dayTwoEl = document.createElement("p")
            dayTwoEl.textContent = tempHumidWind2;
            dayTwoDiv.appendChild(dayTwoEl);

            var tempHumidWind3 = `${dateString}Temp:${temp[2]} Humidity:${fiveDayHumidity[2]} Wind-speed:${fiveDayWind[2]}`
            var dayThreeEl = document.createElement("p")
            dayThreeEl.textContent = tempHumidWind3;
            dayThreeDiv.appendChild(dayThreeEl);

            var tempHumidWind4 = `${dateString}Temp:${temp[3]} Humidity:${fiveDayHumidity[3]} Wind-speed:${fiveDayWind[3]}`
            var dayFourEl = document.createElement("p")
            dayFourEl.textContent = tempHumidWind4;
            dayFourDiv.appendChild(dayFourEl);

            var tempHumidWind5 = `${dateString}Temp:${temp[4]} Humidity:${fiveDayHumidity[4]} Wind-speed:${fiveDayWind[4]}`
            var dayFiveEl = document.createElement("p")
            dayFiveEl.textContent = tempHumidWind5;
            dayFiveDiv.appendChild(dayFiveEl);
        })
       
        .catch(error => {
            console.error("An error occured while fetching the data:", error);
        })
    
    }

//functions so css properties don't show up until the search button is pressed 
    function displayDays() {
        var container = document.getElementById("day-container");
        container.classList.add("displayed")
    }
    function displayCurrent() {
        var currentContainer = document.getElementById("current-container");
        currentContainer.classList.add("displayed")
    }

