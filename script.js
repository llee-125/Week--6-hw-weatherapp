$(document).ready(function () {
  var cityHolder = $(".userInput");
  var tempHolder = $(".temp");
  var humidityHolder = $(".humidity");
  var windHolder = $(".wind");
  var uviHolider = $(".uvi");
  var fiveTempHolder1 = $(".fiveTempHolder1");
  var fiveTempHolder2 = $(".fiveTempHolder2");
  var fiveTempHolder3 = $(".fiveTempHolder3");
  var fiveTempHolder4 = $(".fiveTempHolder4");
  var fiveTempHolder5 = $(".fiveTempHolder5");
  var fiveHumidHolder1 = $(".fiveHumidHolder1");
  var fiveHumidHolder2 = $(".fiveHumidHolder2");
  var fiveHumidHolder3 = $(".fiveHumidHolder3");
  var fiveHumidHolder4 = $(".fiveHumidHolder4");
  var fiveHumidHolder5 = $(".fiveHumidHolder5");

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

      // var fiveDate1 = currentDate;
      // var fiveDate2 = currentDate;
      // var fiveDate3 = currentDate;
      // var fiveDate4 = currentDate;
      // var fiveDate5 = currentDate;

      var fiveTemp1 = response.list[1].main.temp;
      var fiveTemp2 = response.list[9].main.temp;
      var fiveTemp3 = response.list[17].main.temp;
      var fiveTemp4 = response.list[25].main.temp;
      var fiveTemp5 = response.list[33].main.temp;

      fiveTempHolder1.text("Temp: " + fiveTemp1);
      fiveTempHolder2.text("Temp: " + fiveTemp2);
      fiveTempHolder3.text("Temp: " + fiveTemp3);
      fiveTempHolder4.text("Temp: " + fiveTemp4);
      fiveTempHolder5.text("Temp: " + fiveTemp5);

      var fiveHumid1 = response.list[1].main.humidity;
      var fiveHumid2 = response.list[2].main.humidity;
      var fiveHumid3 = response.list[3].main.humidity;
      var fiveHumid4 = response.list[4].main.humidity;
      var fiveHumid5 = response.list[5].main.humidity;

      fiveHumidHolder1.text("Humid: " + fiveHumid1 + "%");
      fiveHumidHolder2.text("Humid: " + fiveHumid2 + "%");
      fiveHumidHolder3.text("Humid: " + fiveHumid3 + "%");
      fiveHumidHolder4.text("Humid: " + fiveHumid4 + "%");
      fiveHumidHolder5.text("Humid: " + fiveHumid5 + "%");
    });

    renderCities(cities);
  });

  // add moment date to header
  var currentDate = moment().format("MMMM DD, YYYY");
  $(".currentDate").text(currentDate);

  // adds moment time to header
  var currentTime = moment().format("h:mm a");
  $(".currentTime").text(currentTime);

  // var oneDayForward = new moment().add(1, "day");
  // document.write(oneDayForward.format("MMMM DD"));
  // $(".oneDayForward").text(oneDayForward);
  // console.log(oneDayForward);

  // Immediately render cities list on page load/refresh
  renderCities(cities);
});
