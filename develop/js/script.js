// declare useful variables for future use
const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const apiKey = 'fddf8f1a953a537d5becaaab06aa72a8';
const weatherCards = document.querySelector(".weather-cards");
const currentWeather= document.querySelector(".current-weather");

// gets information from array and inputs it into weather cards
const createWeatherCard= (weatherItem) => {
    return `<li class="card">
                <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                <img src="<img src="https://openweathermap.org/img/wn/10d@2x.png" alt="weather icon">
                <h4>Temperature: ${weatherItem.main.temp}&degF</h4>
                <h4>Wind: ${weatherItem.wind.speed}MPH</h4>
                <h4>Humidity: ${weatherItem.main.humidity}%</h4>
            </li>`;
}

const getWeatherDetails= (cityName, lat, lon) => {
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=`+lat+`&lon=`+lon+`&appid=`+apiKey;
    fetch(weatherApiUrl).then(res => res.json()).then(data => {
        console.log(data); //check to see if code is working in console
        //set the forecast to one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });
        //clears both inputs
        cityInput.value = "";
        weatherCards.innerHTML = "";

        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach(weatherItem => {
            // createWeatherCard(weatherItem);
            //used FreeCodeCamp webpage here as reference on how to use insertAdjacentHTML() correctly
            weatherCards.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem))
        });
    }).catch(() => {
        alert("error fetching the weather forecast");
    })
}

// function to get city coordinates
const getCityCoordinates = ()=> {
    //gets user input and removes whitespaces
    const cityName= cityInput.value.trim(); 
    if(!cityName) return; // returns if no input
    const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=`+ cityName +`&limit=1&appid=`+ apiKey;
    // get entered city coordinates from api response
    fetch(geocodingApiUrl).then(res => res.json()).then(data => {
        if(!data.length) return alert (`Error, could not fetch coordinates for` + cityName);
        const {name, lat, lon} = data [0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("error fetching the coordinates");
    });
}
searchButton.addEventListener("click", getCityCoordinates);