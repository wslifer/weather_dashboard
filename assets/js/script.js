var cityList = $("#cityList");
var cities = [];

// setting functions up

// AJAX Calls to API
var queryURL =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=" +
  apiKEY;
var apiKEY = "dd95bf9ea6613905902595b35a625a38";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  function currentWeather() {}
});
