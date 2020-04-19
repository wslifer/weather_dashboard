var cityList = $("#cityList");
var cities = [];

var queryURL =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={apiKEY}";
var apiKEY = "dd95bf9ea6613905902595b35a625a38";

// setting functions up
reset();
function renderCities() {
  if (cities.length > 5) {
    cities.shift();
  }

  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var li = $("<li>");
    var button = $("<button>");

    button.text(city);
    button.attr("data-index", i);
    button.attr("style", "width: 100%");
    button.addClass("btn shadow-box btn-info hist-button");
    li.append(button);
    $("#cityList").prepend(li);
    $("#cityList").prepend("<br>");
  }
}
function reset() {
  $("#cityList").empty();
  var storedCities = JSON.parse(localStorage.getItem("cities"));
  if (storedCities !== null) {
    cities = storedCities;
  }
  renderCities();
}
$(".search-button").click(function (event) {
  event.preventDefault();
  $("#currentForecast").empty();
  $("#fiveDayForecast").empty();
  var searchHistory = $("#userSearch").val().trim();
  if (searchHistory === "") {
    return;
  }
});
cities.push(searchHistory);
localStorage.setItem("cities", JSON.stringify(cities));
