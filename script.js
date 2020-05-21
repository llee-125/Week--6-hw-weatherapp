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
      console.log(response);
      // console.log(response.coord.lon);
      // console.log(response.coord.lat);

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

      // for (var i = 0; i < response.list.length; i++) {
      //   var icon = response.list[i].weather[0].icon;
      //   console.log(icon);
      //   // "01d"
      //   var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      //   var iconImage = $("<img>");
      //   iconImage.attr("src", iconURL);
      //   $(".icon-holders").append(iconImage);
      // }
      // var icon2 =
      // var icon3 =
      // var icon4 =
      // var icon5 =

      var fiveDate1 = currentDate;
      var fiveDate2 = currentDate;
      var fiveDate3 = currentDate;
      var fiveDate4 = currentDate;
      var fiveDate5 = currentDate;

      var fiveTemp1 = response.list[1],
        main,
        temp;
      var fiveTemp2 = response.list[2],
        main,
        temp;
      var fiveTemp3 = response.list[3],
        main,
        temp;
      var fiveTemp4 = response.list[4],
        main,
        temp;
      var fiveTemp5 = response.list[5],
        main,
        temp;

      fiveTempHolder.text("Temp: " + fiveTemp1);
      fiveTempHolder.text("Temp: " + fiveTemp2);
      fiveTempHolder.text("Temp: " + fiveTemp3);
      fiveTempHolder.text("Temp: " + fiveTemp4);
      fiveTempHolder.text("Temp: " + fiveTemp5);

      var fiveHumid1 = response.list[1],
        main,
        humid;
      var fiveHumid2 = response.list[2],
        main,
        humid;
      var fiveHumid3 = response.list[3],
        main,
        humid;
      var fiveHumid4 = response.list[4],
        main,
        humid;
      var fiveHumid5 = response.list[5],
        main,
        humid;
    });

    renderCities(cities);
  });

  // add moment date to header
  var currentDate = moment().format("MMMM DD, YYYY");
  $(".currentDate").text(currentDate);

  // adds moment time to header
  var currentTime = moment().format("h:mm a");
  $(".currentTime").text(currentTime);

  // Immediately render cities list on page load/refresh
  renderCities(cities);
});
