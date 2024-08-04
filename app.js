async function fetchData(api, param) {
  try {
    const response = await fetch(api);

    if (response.status === 400) {
      throw new Error("Country Not Found");
    }
    if (response.status == 404) {
      throw new Error("server not responund");
    }
    if (response.status === 403) {
      throw new Error("Server Forbidden / API expired");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}

async function start(search = "indonesia") {
  const apiURL = await fetchData(
    `https://api.weatherapi.com/v1/current.json?key=5209e4908b634703875140521243007&q=${search}&aqi=no`
  );
  // api
  const location = await apiURL.location;
  const current = await apiURL.current;

  // change backgorund :
  const weather_background = document.querySelector("#video-background source");
  const weather = current.condition.text;
  switch (weather) {
    case "Patchy light rain in area with thunder":
      weather_background.src = "assets/vid/thunder.mp4";
      break;
    case "Light rain shower":
      weather_background.src = "assets/vid/rain.mp4";
      break;
    case "Moderate or heavy rain shower":
      weather_background.src = "assets/vid/rain.mp4";
      break;
    case "Sunny":
      weather_background.src = "assets/vid/sunny.mp4";
      break;
    case "Snow":
      weather_background.src = "assets/vid/snow.mp4";
      break;
    case "Partly Cloudy":
      weather_background.src = "assets/vid/cluody.mp4";
      break;

    default:
      weather_background.src = "assets/vid/rain.mp4";

      break;
  }

  const background_video = document.getElementById("video-background");
  background_video.load();

  //   main information
  const country = document.querySelector(".country");
  const time = document.querySelector(".time");
  const temperature = document.querySelector(".temperature");
  const main_icon = document.querySelector(".main-icon img");
  country.textContent = location.country + " / " + location.name;
  time.textContent = location.localtime;
  temperature.textContent = current.temp_c + "°c";
  main_icon.src = current.condition.icon;

  //   additional information
  const condition_text = document.querySelector(".condition-text");
  const temperature_additional = document.querySelector(".temp .value span");
  const feels = document.querySelector(".feels .value span");
  const humidity = document.querySelector(".humidity .value span");
  const cloudy = document.querySelector(".cloudy .value span");
  const wind = document.querySelector(".wind .value span");
  condition_text.textContent = current.condition.text;
  temperature_additional.textContent = current.temp_c + "°c";
  feels.textContent = current.feelslike_c + "°c";
  humidity.textContent = current.humidity + "°%";
  cloudy.textContent = current.cloud + "%";
  wind.textContent = current.wind_kph + "km/h";
}

// search

const form_search = document.querySelector(".form");
const input_search = document.getElementById("search");

form_search.addEventListener("submit", (e) => {
  e.preventDefault();
  let search = input_search.value;
  start(search);
  input_search.value = "";
});

start();
