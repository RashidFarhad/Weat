const apiKey = "d73c42480a79a4143f4d64528ce830d4"; 
const searchBtn = document.getElementById("search-btn");
const locationBtn = document.getElementById("location-btn");
const cityInput = document.getElementById("city-input");
const weatherDetails = document.getElementById("weather-details");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherByCity(city);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getWeatherByLocation(latitude, longitude);
      },
      error => {
        alert("Unable to retrieve your location");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function getWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

function fetchWeather(url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(err => {
      weatherDetails.innerHTML = `<p>${err.message}</p>`;
    });
}

function displayWeather(data) {
  const { name, main, weather, wind } = data;
  const html = `
    <div class="weather-card">
      <h2>${name}</h2>
      <p><strong>Temperature:</strong> ${main.temp}°C</p>
      <p><strong>Humidity:</strong> ${main.humidity}%</p>
      <p><strong>Weather:</strong> ${weather[0].main}</p>
      <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
    </div>
  `;
  weatherDetails.innerHTML = html;
}
