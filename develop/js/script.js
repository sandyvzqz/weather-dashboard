// declare useful variables for future use
const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const apiKey = 'fddf8f1a953a537d5becaaab06aa72a8'

const getWeatherDetails= (cityName, lat, lon) => {
    const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=`+lat+`&lon=`+lon+`&appid=`+apiKey;
    fetch(weatherApiUrl).then(res => res.json()).then(data => {
        console.log(data); //check to see if code is working
        //set the forecast to one forecast per day
        const uniqueForecastDays = [];
        const fiveDaysForecast = data.list.filter(forecast => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            if(uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        });
        console.log(fiveDaysForecast);
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