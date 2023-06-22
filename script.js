//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys

//APIKey/initialize arrays
var APIKey = "e87ec7f203ff2e1f695f40b6fe50b1e1";
var searchHistory = [];
var city = "";

//get date
const currentDate = new Date();
const dateString = currentDate.toDateString();
console.log(dateString);


//makes searchBtn clickable, puts value of user input into variable, alerts if invalid value is input 
document.getElementById("searchBtn").addEventListener("click", function (event) {
    event.preventDefault();

    city = document.getElementById("cityInput").value;
    var searchInput = document.getElementById('cityInput');
    var searchValue = searchInput.value;

    if (cityInput === "") {
        alert("Please Enter a valid city name")
        return;
    }

    //push city value to cityInput el
   searchHistory.push(city);
   console.log(searchHistory)

    //save to localstorage 
    localStorage.setItem('city', JSON.stringify(searchHistory));

    displayHistory();
    getTodayWeath();
});



function displayHistory() {
  
  var histButton = document.getElementById('historyButton');
  histButton.innerHTML = city;
  
}

var histButton = document.getElementById('historyButton');
histButton.addEventListener('click', displayHistory);

//create today card 



function getTodayWeath(){
    var currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(city) + "&units=imperial&appid=" + APIKey;

    $('.todayBody').empty();

    fetch(currentWeatherUrl)
    .then(function(response) {
   
      return response.json();
    })
    .then(function(data) {
      console.log(data)

      $('.todayCityName').text(data.name);
      $('.todayCard').text(currentDate);
      $('.icons').attr('src', `https://openweathermap.org/im››g/wn/${data.weather[0].icon}@2x.png`);

      
      var pEl = $('<p>').text(`Temperature: ${data.main.temp} °F`);
      todayBody.append(pEl);
      var pElTemp = $('<p>').text(`Feels Like: ${data.main.feels_like} °F`);
      todayBody.append(pElTemp);
      var pElHumid = $('<p>').text(`Humidity: ${data.main.humidity} %`);
      todayBody.append(pElHumid);
      var pElWind = $('<p>').text(`Wind Speed: ${data.wind.speed} MPH`);
      todayBody.append(pElWind);

      var cityLong = data.coord.lon;
      var cityLat = data.coord.lat;
    })
    .catch(function(error) {
      console.log(error);
    });


};




/* function onLoad() {

	var cityHist = JSON.parse(localStorage.getItem('city'));

	if (cityHist !== null) {
		searchHistory = cityHist
	}
	displayHistory();
	getTodayWeath();
};

onLoad();
 */
