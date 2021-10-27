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
  

  
  document.querySelector("#search-list").addEventListener('click', function(e) {
      if(e.target.classList.contains('history-button')) {
          let cityButton = e.target.textContent;
          getFiveDay(cityButton);
          getCoords(cityButton)
          getUV(lat, lon);
      }
  });
  
  

  

  
        // Get the img object using its Id
        button = document.querySelector("#search-list");
        button.addEventListener('click', function enlargeButton(){
          // Set image size to 1.5 times original
          button.style.transform = "scale(1.5)";
          // Animation effect 
          button.style.transition = "transform 0.25s ease";
        })
        // Function to reset image size
  
        
  
        // // Function to reset image size
        // function resetImg() {
        //   // Set image size to original
        //   img.style.transform = "scale(1)";
        //   img.style.transition = "transform 0.25s ease";
        // }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
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
    // searchList.innerHTML = '<li>' + searchItem + '</li>';
    console.log(searchList)
    var saved = JSON.parse(localStorage.getItem('searchItems'));
    if (!saved) {
      saved = Charlottesville
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