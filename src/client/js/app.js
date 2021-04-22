/* Global Variables */

const searchButton = document.getElementById("clickSearch");
const startDate = document.getElementById("inputDate");
const destination = document.getElementById("destination");

/* Function called by event */
const generateButtonClick = () => {
  postServerData()
    .then((json) => updateUI(json));
};

searchButton.addEventListener("click", generateButtonClick);

//1 pedido do site weathercity
const postServerData = async () => {
  const body = {
    destination: destination.value,
    startDate: startDate.value,
  };
  return fetch("http://localhost:8000/weathercity", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};

function updateUI(weather) {
  console.log(weather);

  const imagePlace = document.getElementsByClassName("placeImage")[0];
  const weatherCurrentIcon = document.getElementById("weatherCurrentIcon");
  const min_temp = document.getElementById("min_temp");
  const max_temp = document.getElementById("max_temp");
  const currentTemp = document.getElementById("currentTemp");
  const date = document.getElementById("date");
  const weatherDescription = document.getElementById("weatherDescription");
  // const city = document.getElementById("city");

  imagePlace.src = weather.imagePlace;
  weatherCurrentIcon.src = `https://www.weatherbit.io/static/img/icons/${weather.weatherCurrentIcon}.png`;
  min_temp.innerHTML = `Min ${weather.min_temp}°C`;
  max_temp.innerHTML = `Max ${weather.max_temp}°C`;
  currentTemp.innerHTML = `${weather.currentTemp}°C`;
  date.innerHTML = weather.newDate ? weather.newDate : "";
  weatherDescription.innerHTML = weather.weatherDescription;
  // city.innerHTML = weather.latCity ? weather.lngCity : "";

  destination.value = "";
  startDate.value = "";

  showFutureTemperature(weather.futureTemp);
}

const showFutureTemperature = (futureTemp) => {
  futureTemp.forEach((element) => {
    showTemperature(element);
  });
};

const showTemperature = (dayTemp) => {
  console.log(dayTemp);

  const container = document.getElementsByClassName("container")[0];

  //call of createWeatherView and adc parameter day temp
  container.appendChild(createWeatherView(dayTemp));
};

const createWeatherView = (dayTemp) => {
  const section = createDivSection();

  const imageWeather = document.createElement("img");
  imageWeather.id = "iconFuture";
  imageWeather.src = `https://www.weatherbit.io/static/img/icons/${dayTemp.icon}.png`;
  section.appendChild(imageWeather);

  const description = document.createElement("h3");
  description.id = "descriptionWeatherFuture";
  description.innerText = dayTemp.description;
  section.appendChild(description);

  const dt = new Date(dayTemp.date); //call paramenter dayTemp.date e criate new date
  const formatDate =
    dt.getDate() + "/" + (1 + dt.getMonth()) + "/" + dt.getFullYear();
  
  const date = document.createElement("p");
  date.id = "dateFuture";
  date.innerHTML = formatDate; // call the string formatDate
  section.appendChild(date);

  const minTemp = document.createElement("p");
  minTemp.id = "minTemp";
  minTemp.innerHTML = `min ${dayTemp.tempMin}`;
  section.appendChild(minTemp);

  const maxTemp = document.createElement("p");
  maxTemp.id = "maxTemp";
  maxTemp.innerHTML = `max ${dayTemp.tempMax}`;
  section.appendChild(maxTemp);

  return section;
};

function createDivSection() {
  const section = document.createElement("div");
  section.className = "divSection";
  return section;
}
