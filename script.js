// set up jQuery
$(document).ready(function () {
  // var cityName = "San Ramon";
  // console.log(cityName);
  var cityHolder = $(".userInput");
  var tempHolder = $(".temp");
  var humidityHolder = $(".humidity");
  var windHolder = $(".wind");
  var uviHolider = $(".uvi");

  // name variables pulling specific elements from html document

  var cityList = document.querySelector("#city-list");

  // Grab cities from local storage
  var cities = [];

  var listEl = document.createElement("li");
  listEl.setAttribute("class", "banana");

  // Clear cityName element and update cityCountSpan
  function renderCities(citiesArray) {
    cityList.innerHTML = "";

    // Render a new li for each city
    for (var i = 0; i < citiesArray.length; i++) {
      var city = cities[i];

      var li = document.createElement("li");
      li.textContent = city;
      li.setAttribute("data-index", i);
      cityList.appendChild(li);
    }

    // Set citiesArray into localStorage
  }

  $("#submit").on("click", function (e) {
    e.preventDefault();
    var userInput = $("#cityName").val();
    // console.log(userInput);
    cities.push(userInput);

    var APIkey = "9f6f9f27da666f2498435db26b1c3410";

    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        userInput +
        "&appid=" +
        APIkey +
        "&units=imperial",
      dataType: "json",
    }).then(function (response) {
      // console.log(response);
      // console.log(response.coord.lon);
      // console.log(response.coord.lat);

      $("#cityInfo").html(response.cityName);
      var wind = response.wind.speed;
      var temp = response.main.temp;
      var humid = response.main.humidity;

      cityHolder.text(userInput);
      tempHolder.text("Temperature:  " + temp + "%");
      humidityHolder.text("Humidity:  " + humid);
      windHolder.text("Wind Speed:  " + wind);

      $.ajax({
        type: "GET",
        url:
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          response.coord.lat +
          "&lon=" +
          response.coord.lon +
          "&appid=" +
          APIkey,
        dataType: "json",
      }).then(function (response) {
        console.log(response);

        var uvi = response.current.uvi;

        uviHolider.text("UVI:  " + uvi);
      });
    });

    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        userInput +
        "&appid=" +
        APIkey,
    }).then(function (response) {
      console.log(response);
    });

    renderCities(cities);
  });

  // function savedCities(){
  //   var
  // }

  // add moment date to header
  var currentDate = moment().format("MMMM DD, YYYY");
  $(".currentDate").text(currentDate);

  // adds moment time to header
  var currentTime = moment().format("h:mm a");
  $(".currentTime").text(currentTime);

  // Immediately render cities list on page load/refresh
  renderCities(cities);
});
