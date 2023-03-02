//coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
var APIKey = "e87ec7f203ff2e1f695f40b6fe50b1e1";
var searchHistory = [];
var city = [];

//makes searchBtn clickable, puts value of user input into variable, alerts if invalid value is input 
document.querySelector("#searchBtn").addEventListener("click", function () {
    var cityInput = document.querySelector("#cityInput").value.toUpperCase;
    if (cityIbput === "") {
        alert("Please Enter a valid city name")
        return;
    }

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
})

// fetches queryUrl converts response to json then selects weatherInfo div 
fetch(queryURL)
    .then(response => response.json())
    .then(data => {
        var weatherInfoDiv = document.querySelector("#weatherInfo");
        weatherInfoDiv.innerHTML = 
        
    //set weather data from API as div content
    //adds city to search history
        searchHistory.push(data.name);
        var searchHistoryDiv = document.querySelector("#searchHistory");
        searchHistoryDiv.innerHTML =  
      
})

.catch(error => {
    console.log(error);
    alert("Unable to get weather data at this time")
})


//function getApi() {
 //   var requestUrl = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
//}

/* API calls 
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key} */