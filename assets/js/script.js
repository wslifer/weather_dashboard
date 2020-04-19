// setting functions up
var city = "";
var cities = "";
var citiesDiv = $("#searched_cities_container");

init();
listClick();
searchClick();

function init() {
  let saved_cities = JSON.parse(localStorage.getItem("cities"));

  if (saved_cities !== null) {
    cities = saved_cities;
  }

  renderButtons();
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function renderCities() {
  citiesDiv.innerHTML = "";
  if (cities == null) {
    return;
  }
  let unique_cities = [...new Set(cities)];
  for (let i = 0; i < unique_cities.length; i++) {
    let cityName = unique_cities[i];

    let buttonEl = document.createElement("button");
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
    APIcalls();
  });
}
function searchClicker() {
  $("#searchbtn").click(function (event) {
    event.preventDefault();
    city = $(this).prev().val().trim();

    cities.push(city);

    if (cities.length > 8) {
      cities.shift();
    }

    if (city == "") {
      return;
    }
    APIcalls();
    storeCities();
    renderButtons();
  });
}

// AJAX Calls to API (One Call)
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
