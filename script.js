$(document).ready(function () {
  var cityHolder = $(".userInput");
  var tempHolder = $(".temp");
  var humidityHolder = $(".humidity");
  var windHolder = $(".wind");
  var uviHolider = $(".uvi");

  // name variables pulling specific elements from html document
  var cityList = document.querySelector("#city-list");

  // Grab cities from local storage
  var cities = [];

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

      var wind = response.wind.speed;
      var temp = response.main.temp;
      var humid = response.main.humidity;

      cityHolder.text(userInput);
      tempHolder.text("Temperature:  " + temp);
      humidityHolder.text("Humidity:  " + humid + "%");
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
        APIkey +
        "&units=imperial",
    }).then(function (response) {
      console.log(response.list);

      $("#fiveDayForecast").empty();
      for (var i = 1; i < response.list.length; i = i + 8) {
        var forecastIcon = response.list[i].weather[0].icon;

        var iconURL =
          "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
        // Create holders for the info
        var forecastDiv = $("<div>"); //<div></div>
        var dateH6 = $("<h6>");
        var tempH6 = $("<h6>");
        var humidH6 = $("<h6>");
        var iconImg = $("<img>");

        // Set attributes for the holders
        forecastDiv.attr("class", "col-lg"); // <div class="col-lg"></div>
        dateH6.attr("class", "fiveDate" + i);
        iconImg.attr("src", iconURL);

        // Set the text for the holders with the response info
        var fiveTemp1 = response.list[i].main.temp;
        tempH6.text("Temp: " + fiveTemp1);
        var fiveHumid1 = response.list[i].main.humidity;
        humidH6.text("Humid: " + fiveHumid1 + "%");
        var fiveDate = response.list[i].dt_txt;
        var date = moment(fiveDate).format("MM/DD/YYYY");
        dateH6.text(date);

        // Append everything
        $("#fiveDayForecast").append(forecastDiv);
        forecastDiv.append(dateH6);
        forecastDiv.append(tempH6);
        forecastDiv.append(humidH6);
        forecastDiv.append(iconImg);
      }

      // i++ is a shortcut for i = i + 1
      // $(".className") is equivalent to document.getElementsByClassName("className") which is also equivalent to document.querySelector(".className")
    });
    // add moment date to header
    var currentDate = moment().format("MMMM DD, YYYY");
    $(".currentDate").text(currentDate);

    renderCities(cities);
  });

  // adds moment time to header
  var currentTime = moment().format("h:mm a");
  $(".currentTime").text(currentTime);

  // Immediately render cities list on page load/refresh
  renderCities(cities);
});
