var input = document.getElementById("city-input").value || "charlottesville"
var apiKey = "920b730f17ac801c61b9f3de6744ae6a";
var lat
var lon
var currentMoment = moment();

let historyButtons = document.querySelectorAll(".history-button")

function getWeather(input, cityButton) {
  if (!input) input="charlottesville"
  console.log(input)




var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=" + apiKey;

  fetch(currentUrl)
    .then(function (weather) {
      return weather.json();
    }).then(function (weather) {
      let currentIconUrl = "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"



      document.getElementById("cardHeader").innerHTML = input[0].toUpperCase() + input.substring(1)
      document.getElementById("current-day-header").innerHTML = currentMoment.format("YYYY-M-D");
      document.getElementById("current-temp").innerHTML = "Temperature: " + weather.main.temp + "&#176;F";
      document.getElementById("current-humidity").innerHTML = "Humidity: " + weather.main.humidity + "%";
      document.getElementById("current-wind").innerHTML = "Wind Speed: " + weather.wind.speed + "MPH";
      document.getElementById("current-icon").innerHTML = '<img src="' + currentIconUrl + '">'

      lat = weather.coord.lat;
      lon = weather.coord.lon;

      getUV(lat, lon)
      console.log("step 1")
    })
  }
      
function getUV(lat, lon) {
var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey
  
fetch(uvUrl)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    document.getElementById("current-uv").innerHTML = "UV Index: " + data.current.uvi;

    if (data.current.uvi <= 3) {
      document.getElementById("current-uv").classList.add("uvGreen");
    } else if (7 <= data.current.uvi >= 4) {
      document.getElementById("current-uv").classList.add("uvYellow");
    } else {
      document.getElementById("current-uv").classList.add("uvRed");
    }
  })

  getFiveDay()
  console.log("step 2")
}
   
function getFiveDay(input) {
  if (!input) input="charlottesville"
  // var input = document.getElementById("city-input").value
  var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&appid=" + apiKey;
  fetch(fiveDayUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // var input = document.getElementById("city-input").value;
        
        // let currentIconUrl = "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png"
  
        let dayTwoIcon = data.list[7].weather[0].icon
        let dayTwoIconUrl = "https://openweathermap.org/img/wn/" + dayTwoIcon + "@2x.png"
   
        document.getElementById("day-2-header").innerHTML = data.list[7].dt_txt.split(' ')[0];
        document.getElementById("day-2-Icon").innerHTML = '<img src="' + dayTwoIconUrl + '">';
        document.getElementById("day-2-Temp").innerHTML = "Temperature: " + data.list[7].main.temp + "&#176;F";
        document.getElementById("day-2-Humidity").innerHTML = "Humidity: " + data.list[7].main.humidity + "%";
  
        let dayThreeIcon = data.list[15].weather[0].icon
        let dayThreeIconUrl = "https://openweathermap.org/img/wn/" + dayThreeIcon + "@2x.png"
  
        document.getElementById("day-3-header").innerHTML = data.list[15].dt_txt.split(' ')[0];
        document.getElementById("day-3-Icon").innerHTML = '<img src="' + dayThreeIconUrl + '">';
        document.getElementById("day-3-Temp").innerHTML = "Temperature: " + data.list[15].main.temp + "&#176;F";
        document.getElementById("day-3-Humidity").innerHTML = "Humidity: " + data.list[15].main.humidity + "%";
  
        let dayFourIcon = data.list[23].weather[0].icon
        let dayFourIconUrl = "https://openweathermap.org/img/wn/" + dayFourIcon + "@2x.png"
  
        document.getElementById("day-4-header").innerHTML = data.list[23].dt_txt.split(' ')[0];
        document.getElementById("day-4-Icon").innerHTML = '<img src="' + dayFourIconUrl + '">';
        document.getElementById("day-4-Temp").innerHTML = "Temperature: " + data.list[23].main.temp + "&#176;F";
        document.getElementById("day-4-Humidity").innerHTML = "Humidity: " + data.list[23].main.humidity + "%";
  
        let dayFiveIcon = data.list[31].weather[0].icon
        let dayFiveIconUrl = "https://openweathermap.org/img/wn/" + dayFiveIcon + "@2x.png"
  
        document.getElementById("day-5-header").innerHTML = data.list[7].dt_txt.split(' ')[0];
        document.getElementById("day-5-Icon").innerHTML = '<img src="' + dayFiveIconUrl + '">';
        document.getElementById("day-5-Temp").innerHTML = "Temperature: " + data.list[31].main.temp + "&#176;F";
        document.getElementById("day-5-Humidity").innerHTML = "Humidity: " + data.list[31].main.humidity + "%";
      })
      console.log("step 3")
  }







document.getElementById("search").addEventListener("click", function (event) {
  var input = document.getElementById("city-input").value
  event.preventDefault();
  addHistory(retrieveHistory(), input)
  getWeather(input);
  displayHistory(retrieveHistory())
})



function addHistory(searchHistory, input) {
  var input = document.getElementById("city-input").value
  document.getElementById("search-list").innerHTML = "";
  searchHistory.push(input);
  localStorage.setItem("city", JSON.stringify(searchHistory))
}

function retrieveHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("city")) || []
  console.log(localStorage.getItem("city"))
  return searchHistory;
}

function displayHistory(searchHistory) {

  for (var i = 0; i < searchHistory.length; i++){
      var searchList = document.getElementById("search-list")
      var historyButton = document.createElement("BUTTON")

      searchList.appendChild(historyButton)
      historyButton.classList.add("btn")
      historyButton.classList.add("history-button")

      
      historyButton.textContent = searchHistory[i].charAt(0).toUpperCase() + searchHistory[i].slice(1);

      

      if(i === 4) {
          break;
      }
  }
}

document.getElementById("search-list").addEventListener("click", function(e) {
  if(e.target.classList.contains('history-button')) {
		let cityButton = e.target.textContent;
    document.getElementById("cardHeader").innerHTML = cityButton
        getWeather(cityButton);
	}
});

window.onload = displayHistory(retrieveHistory())

window.onload = function loadLastSearch() {
  if (localStorage.getItem('city') === null) {
    let input = 'New York'
    document.getElementById("card-header").innerHTML = input
    getWeather(input)
  } 
    getWeather(input)
  }
