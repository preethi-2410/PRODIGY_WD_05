const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "53cc9f71652104acbba6ffb9472cdbbc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === '404') {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    const weatherCondition = weather_data.weather[0].main.toLowerCase();
let imageUrl;

switch (weatherCondition) {
    case 'clouds':
        imageUrl = "https://www.weatherbit.io/static/img/icons/c01d.png";
        break;
    case 'clear':
        imageUrl = "https://www.weatherbit.io/static/img/icons/s01d.png";
        break;
    case 'rain':
        imageUrl = "https://www.weatherbit.io/static/img/icons/r01d.png";
        break;
    case 'mist':
        imageUrl = "https://www.weatherbit.io/static/img/icons/f01d.png";
        break;
    case 'snow':
        imageUrl = "https://www.weatherbit.io/static/img/icons/s01d.png";
        break;
    case 'thunderstorm':
        imageUrl = "https://www.weatherbit.io/static/img/icons/t01d.png";
        break;
    case 'broken clouds':
        imageUrl = "https://www.weatherbit.io/static/img/icons/c02d.png";
        break;
    case 'overcast clouds':
        imageUrl = "https://www.weatherbit.io/static/img/icons/c03d.png";
        break;
    default:
        imageUrl = "https://cdn.pixabay.com/photo/2018/07/15/07/44/cloud-3536406_960_720.png"; // Default cloud image
            break;
}

weather_img.src = imageUrl;

    console.log("Weather Image Source:", weather_img.src);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});

inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});
