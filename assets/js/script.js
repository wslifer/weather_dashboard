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
  var citiesHistory = [];
  for (var i = 0; i < citiesHistory.length; i++) {
    var cityName = citiesHistory[i];

    var buttonEl = $("<button>").text(cityName).addClass("listbtn");

    citiesDiv.appendChild(buttonEl);
    listClick();
  }
}
function listClick() {
  $(".listbtn").click(function (event) {
    event.preventDefault();
    city = $(this).text().trim();
    APIcalls();
  });
}
function searchClick() {
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
    renderCities();
  });
}

// AJAX Calls to API (One Call)

function APIcalls() {
  url = "https://api.openweathermap.org/data/2.5/forecast?q=";
  currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
  APIkey = "&appid=5ec4631ebf34de13f710029416628dff";
  queryurl = url + city + APIkey;
  current_weather_url = currenturl + city + APIkey;

  $("#name_of_city").text("Today's Weather in " + city);
  $.ajax({
    url: queryurl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var day_number = 0;

    for (var i = 0; i < response.list.length; i++) {
      if (response.list[i].dt_txt.split(" ")[1] == "15:00:00") {
        var day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
        var month = response.list[i].dt_txt.split("-")[1];
        var year = response.list[i].dt_txt.split("-")[0];
        $("#" + day_number + "date").text(month + "/" + day + "/" + year);
        var temp = Math.round(
          ((response.list[i].main.temp - 273.15) * 9) / 5 + 32
        );
        $("#" + day_number + "five_day_temp").text(
          "Temp: " + temp + String.fromCharCode(176) + "F"
        );
        $("#" + day_number + "five_day_humidity").text(
          "Humidity: " + response.list[i].main.humidity
        );
        $("#" + day_number + "five_day_icon").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            response.list[i].weather[0].icon +
            ".png"
        );
        console.log(response.list[i].dt_txt.split("-"));
        console.log(day_number);
        console.log(response.list[i].main.temp);
        day_number++;
      }
    }
  });

  //function to display data in main div
  $.ajax({
    url: current_weather_url,
    method: "GET",
  }).then(function (current_data) {
    console.log(current_data);
    var temp = Math.round(((current_data.main.temp - 273.15) * 9) / 5 + 32);
    console.log("The temperature in " + city + " is: " + temp);
    $("#today_temp").text(
      "Temperature: " + temp + String.fromCharCode(176) + "F"
    );
    $("#today_humidity").text("Humidity: " + current_data.main.humidity);
    $("#today_wind_speed").text("Wind Speed: " + current_data.wind.speed);
    $("#today_icon_div").attr({
      src:
        "https://openweathermap.org/img/w/" +
        current_data.weather[0].icon +
        ".png",
      height: "100px",
      width: "100px",
    });
  });
}
