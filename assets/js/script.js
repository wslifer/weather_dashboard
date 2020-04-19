// setting functions up
var city = "";
var cities = [];
var citiesDiv = $("#searched_cities_container");

init();
listClick();
searchClick();

function init() {
  let saved_cities = JSON.parse(localStorage.getItem("cities"));

  if (saved_cities !== null) {
    cities = saved_cities;
  }

  renderCities();
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCities() {
  citiesDiv.innerHTML = "";
  if (cities == null) {
    return;
  }
  var unique_cities = [...new Set(cities)];
  for (var i = 0; i < unique_cities.length; i++) {
    var cityName = unique_cities[i];

    var buttonEl = document.createElement("button");
    buttonEl.textContent = cityName;
    buttonEl.setAttribute("class", "listbtn");

    citiesDiv.appendChild(buttonEl);
    listClicker();
  }
}
function listClick() {
  $(".listbtn").click(function (event) {
    event.preventDefault();
    city = $(this).text().trim();
  });
}
function searchClick() {
  $("#searchbtn").click(function (event) {
    event.preventDefault();
    city = $(this).prev().val().trim();

    /* cities.push(city); */

    if (cities.length > 8) {
      cities.shift();
    }

    if (city == "") {
      return;
    }

    storeCities();
    renderCities();
  });
}

// AJAX Calls to API (One Call)

var queryURL =
  "http://api.openweathermap.org/data/2.5/onecall/lat={lat}&lon={lon}&dt=1586468027&appid=5ec4631ebf34de13f710029416628dff";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
});
