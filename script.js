const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener('click', () => {
  const APIKey = "bf86d347555cef2daa0d04804bbbc25a";
  const city = document.querySelector(".search-box input").value;

  if (city == "") return;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then((res) => res.json())
    .then((json) => {

      container.style.height = "555px";
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error.classList.remove("active");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-details .humidity span");
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "./img/weather/clear.png";
          break;
        case "Snow":
          image.src = "./img/weather/snow.png";
          break;
        case "Rain":
          image.src = "./img/weather/rain.png";
          break;
        case "Clouds":
          image.src = "./img/weather/cloud.png";
          break;
        case "Mist":
          image.src = "./img/weather/mist.png";
          break;
        case "Haze":
          image.src = "./img/weather/mist.png";
          break;

        default:
          image.src = "./img/weather/cloud.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    })
    .catch(err => {
      container.style.height = "400px";
      weatherBox.classList.remove("active");
      weatherDetails.classList.remove("active");
      error.classList.add("active");
      return;
    });
});
