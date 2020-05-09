// set up jQuery
$(document).ready(function () {
  var cityName = "San Ramon";
  console.log(cityName);

  $("#submit").on("click", function(){

  $(".cityName").html("<h1>" + response.name)

  })

  var APIkey = "9f6f9f27da666f2498435db26b1c3410"

  $.ajax({
    type: "GET", 
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey,
    dataType: "json",
  }).then(function (response) {
    console.log(response);
    console.log(response.coord.lon);
    console.log(response.coord.lat);

      $(".cityName").html("<h1>" + response.name)

    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIkey,
      dataType: "json",
    }).then(function(response){
      console.log(response);
      
    var uvi = response.current.uvi;
    })

  // add moment date to header
  var currentDate = moment().format('MMMM DD, YYYY');
  $(".currentDate").text(currentDate);

// adds moment time to header
  var currentTime = moment().format('h:mm a');
  $(".currentTime").text(currentTime);

// add textarea on html, line 24
// textarea should connect to OpenWeather API and search city via API

// render city name in "search for a city" 

// render city name, temperature, humidity, wind speed, UV index in "Special Treatment1"

// render 5-day forcast tiles in Special Treatment2"


  });

    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey,
    }).then(function(response) {
      console.log(response);
    });

});