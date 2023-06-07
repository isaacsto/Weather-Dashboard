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
document.getElementById("searchBtn").addEventListener("click", function () {
    event.preventDefault();

    var cityInput = document.getElementById("cityInput").value;
    /* var searchInput = document.getElementById('cityInput'); */
   /*  var searchValue = searchInput.value; */

    if (cityInput === "") {
        alert("Please Enter a valid city name")
        return;
    }

    //push city value to cityInput el
   searchHistory.push(cityInput);
   console.log(searchHistory)

    //save to localstorage 
    localStorage.setItem('city', JSON.stringify(searchHistory))
    displayHistory();
    getTodayWeath();
});

//create buttons based on search history via js 
var createHistoryEl = document.createElement("div");

function displayHistory() {
    event.preventDefault();

for (let i = 0; i < searchHistory.length; i++) {
    var rowElement = $('<row>');
    var buttonElement = $('<button').text('${searchHistory[i]}')

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
      $('.todayCityName').text(data.name);
      $('.todayCard').text(currentDate);
      $('.icons').attr('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
      var pEl = $('<p>').text(`Temperature: ${data.main.temp} °F`);
      todayCard.append(pEl);
      var pElTemp = $('<p>').text(`Feels Like: ${data.main.feels_like} °F`);
      todayCard.append(pElTemp);
      var pElHumid = $('<p>').text(`Humidity: ${data.main.humidity} %`);
      todayCard.append(pElHumid);
      var pElWind = $('<p>').text(`Wind Speed: ${data.wind.speed} MPH`);
      todayCard.append(pElWind);

      var cityLong = data.coord.lon;
      var cityLat = data.coord.lat;
    })
    .catch(function(error) {
      console.log(error);
    });

    getFiveDayForecast();

};


var putFiveDayForeCast = $('.fiveDayForeCast')   

var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`

function getFiveDayForecast () {
    fetch(fiveDayForecast)
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var fiveDayArray = data.list;
            var myWeather = [];
      
            fiveDayArray.forEach(function(value) {
              var testObj = {
                date: value.dt_txt.split(' ')[0],
                time: value.dt_txt.split(' ')[1],
                temp: value.main.temp,
                feels_like: value.main.feels_like,
                icon: value.weather[0].icon,
                humidity: value.main.humidity
              };
      
              if (value.dt_txt.split(' ')[1] === '12:00:00') {
                myWeather.push(testObj);
              }
            });
      
            var fiveForecastEl = $('.fiveForecast'); // Assuming you have an element with the class 'fiveForecast' to append the cards
      
            myWeather.forEach(function(weather) {
              var divElCard = $('<div>');
              divElCard.attr('class', 'card text-white bg-primary mb-3 cardOne');
              divElCard.attr('style', 'max-width: 200px;');
              fiveForecastEl.append(divElCard);
      
              var divElHeader = $('<div>');
              divElHeader.attr('class', 'card-header');
              var m = moment(weather.date).format('MM-DD-YYYY');
              divElHeader.text(m);
              divElCard.append(divElHeader);
      
              var divElBody = $('<div>');
              divElBody.attr('class', 'card-body');
              divElCard.append(divElBody);
      
              var divElIcon = $('<img>');
              divElIcon.attr('class', 'icons');
              divElIcon.attr('src', `https://openweathermap.org/img/wn/${weather.icon}@2x.png`);
              divElBody.append(divElIcon);
      
              var pElTemp = $('<p>').text(`Temperature: ${weather.temp} °F`);
              divElBody.append(pElTemp);
      
              var pElFeel = $('<p>').text(`Feels Like: ${weather.feels_like} °F`);
              divElBody.append(pElFeel);
      
              var pElHumid = $('<p>').text(`Humidity: ${weather.humidity} %`);
              divElBody.append(pElHumid);
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      };     

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

};

function onLoad() {

	var cityHist = JSON.parse(localStorage.getItem('city'));

	if (cityHist !== null) {
		searchHistory = cityHist
	}
	displayHistory();
	getTodayWeath();
};

onLoad();

