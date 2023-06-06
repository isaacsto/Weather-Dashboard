//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys

//APIKey/initialize arrays
var APIKey = "e87ec7f203ff2e1f695f40b6fe50b1e1";
var searchHistory = [];
var city = "Miami"

//get date
const currentDate = new Date();
const dateString = currentDate.toDateString();
console.log(dateString);


//makes searchBtn clickable, puts value of user input into variable, alerts if invalid value is input 
document.querySelector("#searchBtn").addEventListener("click", function () {
    event.preventDefault();

    var cityInput = document.getElementById("#cityInput").value;
    /* var searchInput = document.getElementById('cityInput'); */
   /*  var searchValue = searchInput.value; */

    if (cityInput === "") {
        alert("Please Enter a valid city name")
        return;
    }

    //push city value to cityInput el
    cityInput.push(city);

    //save to localstorage 
    localStorage.setItem('city', JSON.stringify(searchHistory))
    displayHistory();
    getTodayWeath();
});

//create buttons based on search history via js 
var createHistoryEl = document.getElementById(cityHistory);
function displayHistory() {
    createHistoryEl.empty();

for (let i = 0; i < searchHistory.length; i++) {
    var rowElement = $('<row>');
    var buttonElement = $('<button').text('${searchHist[i]}')

    buttonElement.attr('type', 'button');
    buttonElement.addClass('btn btn-outline-secondary historyButton')
    rowElement.addClass('historyButtonRow');

    createHistoryEl.prepend(rowElement);
    rowElement.append(buttonElement);

} if (!city) {
    return;
}


};


//create today card 
var todayCard = $('.cardBody')


function getTodayWeath(){
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    $(todayCard).empty();

    fetch(currentWeatherUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      $('.cardTodayCityName').text(data.name);
      $('.todayCard').text(date);
      $('.icons').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      var pEl = $('<p>').text(`Temperature: ${data.main.temp} °F`);
      cardTodayBody.append(pEl);
      var pElTemp = $('<p>').text(`Feels Like: ${data.main.feels_like} °F`);
      cardTodayBody.append(pElTemp);
      var pElHumid = $('<p>').text(`Humidity: ${data.main.humidity} %`);
      cardTodayBody.append(pElHumid);
      var pElWind = $('<p>').text(`Wind Speed: ${data.wind.speed} MPH`);
      cardTodayBody.append(pElWind);

      var cityLong = data.coord.lon;
      var cityLat = data.coord.lat;
    })
    .catch(function(error) {
      console.log(error);
    });

}


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

           //cleardiv 
            dayOneDiv.innerHTML = ''; 
           
            dayTwoDiv.innerHTML = '';
        
            dayThreeDiv.innerHTML = '';
            
            dayFourDiv.innerHTML = '';
            
            dayFiveDiv.innerHTML = '';
            


            //concatenate values of each data variable
            
            for (i = 0; i < 5; i++) {
                var dayDiv = document.createElement("div");
                dayDiv.classList.add('col', 's12','m6', '12');
                
                var dayDate = newDates[i];
                var dayTemp = temp[i];
                var dayHumidity = fiveDayHumidity[i];
                var dayWind = fiveDayWind[i]

                //add content 
                dayDiv.innerHTML = `
                <p>${dayDate}</p>
                <p>Temp: ${dayTemp} °F</p>
                <p>Humidity: ${dayHumidity} %</p>
                <p>Wind-speed: ${dayWind} mph</p>`
                
            }

            //append new div element to corresponding day div 

            if (i === 0) {
                dayOneDiv.appendChild(dayDiv);
            } else if (i === 1) {
                dayTwoDiv.appendChild(dayDiv);
            } else if (i === 2) {
                dayThreeDiv.appendChild(dayDiv);
            } else if (i === 3) {
                dayFourDiv.appendChild(dayDiv);
            } else if (i === 4) {
                dayFiveDiv.appendChild(dayDiv)
            }
            
        


     /*        var tempHumidWind1 = `${newDates[0]}<br>
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
            dayFiveDiv.appendChild(dayFiveEl); */
        })
        .catch(error => {
            console.error("An error occured while fetching the data:", error);
        })

}

function createCard(data) {
    var card = document.createElement('div');
    card.classList.add('card')

    var cardBody = document.createElement('div')
    cardBody.classList.add('card-body');

    var city = document.createElement('h5');
    city.classList.add('card-title');
    city.textContent = data.name;

    var temp = document.createElement('p');
    temp.classList.add('card-text');
    temp.textContent = 'Temperature ' + data.main.temp + '°F';

    var humidity = document.createElement('p');
    humidity.classList.add('card-text');
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%'

    cardBody.appendChild(city);
    cardBody.appendChild(temp);
    cardBody.appendChild(humidity);

    card.appendChild(cardBody)

    var container = dcoument.querySelector('.card-container')
    container.appendChild(card);

}

//functions so css properties don't show up until the search button is pressed 
function displayDays() {
    var container = document.getElementById("card-container");
    container.classList.add("displayed")
}
function displayCurrent() {
    var currentContainer = document.getElementById("current-container");
    currentContainer.classList.add("displayed")
} 

   /*  var searchHistory = JSON.parse(localStorage.getItem("searchHistory"))  */
    
/*     if (!Array.isArray(searchHistory)) {
        searchHistory = []
    } */

   /*  searchHistory.push(searchValue),
    
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory)) ;

    callFetch(cityInput);

    //css display functions 
    displayCurrent()
    displayDays()

})

//call displayHistory on load 
window.onload = displayHistory()

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
    
 */

