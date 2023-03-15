//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys

//APIKey/initialize arrays
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
    var searchInput = document.getElementById('cityInput');
    var searchValue = searchInput.value;

    if (cityInput === "") {
        alert("Please Enter a valid city name")
        return;
    }
    
    searchHistory.push(searchValue)
    
    localStorage.setItem("searchHistory", JSON.stringify("searchValue")) ;

    callFetch(cityInput);

    //css display functions 
    displayCurrent()
    displayDays()

})

    





//call displayHistory on load 
window.onload = displayHistory();

function displayHistory (searchValue) {
    localStorage.getItem("searchHistory", JSON.stringify(searchValue))
    var historyContainer = document.querySelector('#searchHistory')
        if (searchHistory.length > 0) {
            searchHistory.forEach(searchValue => {
                var aButton = document.createElement('button');
                aButton.textContent = searchValue;
                historyContainer.appendChild(aButton)
            })
        }
    }
    

console.log('searchHistory:', searchHistory);


//passes city as argument function that hold both current and 5 day forecast fetches 
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
            //classes for css
            weatherInfoDiv.innerHTML = `<h2 class="weather-head">${data.name} ${fullDate}</h2><br> <p class="dat">Temperature: ${data.main.temp} °F</p><br> <p class="dat">Wind Speed: ${data.wind.speed} mph</p><br> <p class="dat">Humidity: ${data.main.humidity}% </p>`

            //Add city to search history when search button is clicked


        })

    

    var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`

    //fetches 5 day forecast`
    fetch(fiveDayForecast)
        .then(response => response.json())
        .then(data => {
            //pushes searched items to searchHistory var 
            searchHistory.push(data.city.name);
            console.log(searchHistory)
            displayHistory();
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
            var newDates = []
            for (var i = 1; i <= 5; i++) {
                var nextDate = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);

                var day = nextDate.getDate();
                var month = nextDate.getMonth() + 1;
                var year = nextDate.getFullYear();

                var dateString = `${month}/${day}/${year}`
                console.log(dateString)
                //pushes dateString to a var so I can pull each index for each forecast element
                newDates.push(dateString)
            }

            //concatenate values of each data variable
            var tempHumidWind1 = `${newDates[0]}<br>
            <br>Temp: ${temp[0]} °F<br>
            <br>Humidity: ${fiveDayHumidity[0]} %<br>
            <br>Wind-speed: ${fiveDayWind[0]} mph`
            var dayOneEl = document.createElement("p")
            dayOneEl.innerHTML = tempHumidWind1;
            dayOneDiv.appendChild(dayOneEl);

            var tempHumidWind2 = `${newDates[1]} <br>
            <br>Temp: ${temp[1]} °F<br>
            <br>Humidity: ${fiveDayHumidity[1]} %<br>
            <br>Wind-speed:  ${fiveDayWind[1]} mph`
            var dayTwoEl = document.createElement("p")
            dayTwoEl.innerHTML = tempHumidWind2;
            dayTwoDiv.appendChild(dayTwoEl);

            var tempHumidWind3 = `${newDates[2]} <br>
            <br>Temp: ${temp[2]} °F<br>
            <br>Humidity:${fiveDayHumidity[2]} %<br>
            <br>Wind-speed: ${fiveDayWind[2]} mph`
            var dayThreeEl = document.createElement("p")
            dayThreeEl.innerHTML = tempHumidWind3;
            dayThreeDiv.appendChild(dayThreeEl);

            var tempHumidWind4 = `${newDates[3]} <br>
            <br>Temp: ${temp[3]} °F<br>
            <br>Humidity: ${fiveDayHumidity[3]} %<br>
            <br>Wind-speed: ${fiveDayWind[3]} mph`
            var dayFourEl = document.createElement("p")
            dayFourEl.innerHTML = tempHumidWind4;
            dayFourDiv.appendChild(dayFourEl);

            var tempHumidWind5 = `${newDates[4]} <br>
            <br>Temp: ${temp[4]}  °F<br>
            <br>Humidity:${fiveDayHumidity[4]} %<br>
            <br>Wind-speed: ${fiveDayWind[4]} mph`
            var dayFiveEl = document.createElement("p")
            dayFiveEl.innerHTML = tempHumidWind5;
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



  


  