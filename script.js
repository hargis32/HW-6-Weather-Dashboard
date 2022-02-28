const APIkey = "ebcf5abc32da5ce2874d3f6d78690cb8";
const citySearchEl = document.getElementById('city-search');
const cityNameEl = document.getElementById('city-name');
const searchHistory = document.querySelector('#search-history');
const todayForecast = document.getElementById('forecast-today');
const todayForecastCont = document.getElementById('forecast-today-container');
const fiveDayForecast = document.getElementById('forecast-five-day');
const fiveDayForecastCont = document.getElementById('forecast-five-day-container');
const previousCities = [];

function handleSearchFormSubmit(event) {
    event.preventDefault();
    // pulls city name from input field
    let city = cityNameEl.value;

    if (city) {
        // saves searched city to local storage
        localStorage.setItem("searchHistory", JSON.stringify(previousCities));
        // pushes searched city to array of previously searched cities
        previousCities.push(city);
        // calls funcion to fetch for today's weather
        weatherToday(city);
        // calls function to fetch for 5 day forecast
        weatherFiveDay(city);
        // calls function to display weather data fetched from API
        displayWeatherToday(city);
        // calls function to display 5 day forecast
        displayWeatherFiveDay(city);

    } else {
        alert("Must enter a valid city name");
    }

};

function weatherToday(city) {
    let queryURL = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;

    fetch(queryURL)
    .then(function(response){
        response.json().then(function(data){
            displayWeatherToday(data);
        });
    });
};

function displayWeatherToday(data) {
    // creates img, sets source as api call icon, appends to forecast container
    let weatherImg = document.createElement("img");
    weatherImg.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    todayForecastCont.appendChild(weatherImg);
    // pulls temp from api response, creates a span and appends it to forecast container
    let tempToday = document.createElement("span");
    tempToday.textContent = "Temp:" + data.main.temp;
    todayForecastCont.appendChild(tempToday);

    let humidityToday = document.createElement("span");
    humidityToday.textContent = "Humidity:" + data.main.humidity;
    todayForecastCont.appendChild(humidityToday);

    let windToday = document.createElement("span");
    windToday.textContent = "Wind Speed:" + data.wind.speed;
    todayForecastCont.appendChild(windToday);


};



citySearchEl.addEventListener("submit", handleSearchFormSubmit);