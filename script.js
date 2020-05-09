// set up jQuery
$(document).ready(function () {
  var textInput = "";

  $("#userSubmit").on("click", function(){

  })

  $.ajax({
    type: "GET", 
    url: "https://openweathermap.org/api/one-call&appid=9f6f9f27da666f2498435db26b1c3410",
    dataType: "json",
  }).then(function (response) {
    console.log(response);


  // add moment date to header
  var currentDate = moment().format('MMMM DD, YYYY');
  $("#currentDate").text(currentDate);

// adds moment time to header
  var currentTime = moment().format('h:mm a');
  $("#currentTime").text(currentTime);

// add textarea on html, line 24
// textarea should connect to OpenWeather API and search city via API

// render city name in "search for a city" 

// render city name, temperature, humidity, wind speed, UV index in "Special Treatment1"

// render 5-day forcast tiles in Special Treatment2"


});

});



