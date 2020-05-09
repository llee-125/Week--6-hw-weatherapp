// set up jQuery
$(document).ready(function () {
  var cityName = "San Ramon";
  console.log(cityName);

  $("#submit").on("click", function(e){
    e.preventDefault();
    var userInput = $("#cityName").val()
    console.log(userInput)

    var APIkey = "9f6f9f27da666f2498435db26b1c3410"

    $.ajax({
      type: "GET", 
      url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey,
      dataType: "json",
    }).then(function (response) {
      console.log(response);
      console.log(response.coord.lon);
      console.log(response.coord.lat);
  
      $("#someInfo").text(response.name)
  
  
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
  
    });
  
      $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey,
      }).then(function(response) {
        console.log(response);
      });



  })



});