var input = document.getElementById("city-input").value;
var apiKey = "920b730f17ac801c61b9f3de6744ae6a";

window.onload = function loadLastSearch() {
  if (localStorage.getItem('searchItems') === null) {
    let input = 'New York'
    document.getElementById("card-header").innerHTML = input
    getFiveDay(input)
  } else {
    let input = localStorage.getItem('lastSearch')
    getFiveDay(input)
  }
}

window.onload = function displayHistory() {
  var saved = JSON.parse(localStorage.getItem('searchItems'));
  var searchList = document.getElementById('search-list');
  // var firstSearch = false;

  // console.log(saved)
  // searchList.innerHTML = "";
  // if (!saved) {
  //   return
  // };
  // if (!firstSearch) {
  //   firstSearch = true
  //   getFiveDay(saved[saved.length - 1])
  // }
  for (var i = 0; i < saved.length; i++) {
    var input = saved[i]
    // var stringedCity = '"' + city + '"'
    var li = "<button class='btn btn-light history-button' type='submit'>" + input + "</button>"
    searchList.innerHTML = searchList.innerHTML + li
    document.getElementById("cardHeader").innerHTML = input
  }
    if (saved === null) {
      let input = 'Charlottesville'
      getFiveDay(input)
  } 
  else {
      let input = localStorage.getItem(saved[i])
      getFiveDay(input)
      }

}

document.getElementById("search").addEventListener("click", function () {
  event.preventDefault();
  getFiveDay(input);
  getCoords(input);
  getUV(lat, lon);
  addHistory();
})

document.querySelector("#search-list").addEventListener('click', function(e) {
	if(e.target.classList.contains('history-button')) {
		let cityButton = e.target.textContent;
        getFiveDay(cityButton);
        getCoords(cityButton)
	}
});


function getFiveDay(input) {

  let fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&units=imperial&appid=" + apiKey

  fetch(fiveDayUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var input = document.getElementById("city-input").value;
      let currentIcon = data.list[0].weather[0].icon
      let currentIconUrl = "https://openweathermap.org/img/wn/" + currentIcon + "@2x.png"

      document.getElementById("cardHeader").innerHTML = input.charAt(0).toUpperCase() + input.slice(1)
      document.getElementById("current-day-header").innerHTML = data.list[0].dt_txt.split(' ')[0];
      document.getElementById("current-temp").innerHTML = "Temperature: " + data.list[0].main.temp + "&#176;F";
      document.getElementById("current-humidity").innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
      document.getElementById("current-wind").innerHTML = "Wind Speed: " + data.list[0].wind.speed + "MPH";
      document.getElementById("current-icon").innerHTML = '<img src="' + currentIconUrl + '">';

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

      document.getElementById("day-5-header").innerHTML = data.list[31].dt_txt.split(' ')[0];
      document.getElementById("day-5-Icon").innerHTML = '<img src="' + dayFiveIconUrl + '">';
      document.getElementById("day-5-Temp").innerHTML = "Temperature: " + data.list[31].main.temp + "&#176;F";
      document.getElementById("day-5-Humidity").innerHTML = "Humidity: " + data.list[31].main.humidity + "%";
    })


  console.log("step 1 done")
}

function getCoords() {
  var input = document.getElementById('city-input').value;
  var coordUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + input + "&appid=" + apiKey;

  fetch(coordUrl)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      console.log(data.coord.lat)
      console.log(data.coord.lon)
      getUV(lat, lon)
    })
  console.log("step 2 done")
}

function getUV(lat, lon) {
  var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey

  fetch(oneCallUrl)
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
  console.log("step 3 done")
  addHistory();
}


















// var firstSearch = false;
// var li
// var addToSearchHistory = document.getElementById('add-to-search-history');
// var searchItem = document.getElementById('city-input').value;
// var searchList = document.getElementById('search-list');

function addHistory() {
  var searchItem = document.getElementById('city-input').value;
  var searchList = document.getElementById('search-list');
  console.log(searchItem)
  // Ignore it if the search item is empty
  //if (searchItem.value.length < 1) return;
  // Add item to search list
  searchList.innerHTML = '<li>' + searchItem + '</li>';
  console.log(searchList)
  var saved = JSON.parse(localStorage.getItem('searchItems'));
  if (!saved) {
    saved = []
  };

  if (saved.length === 5) {
    saved.shift()
  }
  saved.push(searchItem)
  // Clear input
  searchItem = '';

  // Save the list to localStorage
  localStorage.setItem('searchItems', JSON.stringify(saved));
  console.log("step 4 done")
  displayHistory()
};


// function displayHistory() {
//   var saved = JSON.parse(localStorage.getItem('searchItems'));
//   var searchList = document.getElementById('search-list');
//   var firstSearch = false;

//   console.log(saved)
//   searchList.innerHTML = "";
//   if (!saved) {
//     return
//   };
//   if (!firstSearch) {
//     firstSearch = true
//     getFiveDay(saved[saved.length - 1])
//   }
//   for (var i = 0; i < saved.length; i++) {
//     var city = saved[i];
//     var li = "<button class='btn btn-light history-button' type='submit'>" + city + "</button>"
//     searchList.innerHTML = searchList.innerHTML + li
//   }
// }

// displayHistory()











