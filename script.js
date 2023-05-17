const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const time_date = document.getElementById('time-date');

const location_not_found = document.querySelector('.location-not-found');

const weather_body = document.querySelector('.weather-body');

const abstract_api_key = 'ef9682491d4c4d279002b377b310b462';

async function checkWeather(city) {
  const open_weather_api_key = "8e3c1394d9516f548452af34295b72a7";
  const open_weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${open_weather_api_key}`;    
  const weather_data = await fetch(open_weather_url).then(response => response.json());

  if (weather_data.cod === `404`) {
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

  // Get timezone information using Abstract API
  const abstract_url = `https://timezone.abstractapi.com/v1/current_time/?api_key=${abstract_api_key}&location=${weather_data.coord.lat},${weather_data.coord.lon}`;
  const timezone_data = await fetch(abstract_url).then(response => response.json());
  const local_time = new Date(timezone_data.datetime).toLocaleString();

  // Update HTML to display timezone information
  time_date.innerHTML = local_time;

  switch(weather_data.weather[0].main){
    case 'Clouds':
      weather_img.src = "/assets/cloud.png";
      break;
    case 'Clear':
      weather_img.src = "/assets/clear.png";
      break;
    case 'Rain':
      weather_img.src = "/assets/rain.png";
      break;
    case 'Mist':
      weather_img.src = "/assets/mist.png";
      break;
    case 'Snow':
      weather_img.src = "/assets/snow.png";
      break;
  }

  console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
  checkWeather(inputBox.value);
});
