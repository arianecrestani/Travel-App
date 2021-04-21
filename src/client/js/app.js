/* Global Variables */


const searchButton = document.getElementById("clickSearch");
const startDate = document.getElementById("inputStartDate");
const endDate = document.getElementById("inputEndDate");
const destination = document.getElementById("destination");

// Create a new date instance dynamically with JS
let dt = new Date();
// creando nova data
let newDate = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();

/* Function called by event */
const generateButtonClick = () => {
  postServerData()
    // .then((data) => console.log(data))
    .then((json) => updateUI(json));
};

searchButton.addEventListener("click", generateButtonClick);

//1 pedido do site weathercity
const postServerData = async () => {
  const body = {
    destination: destination.value,
    startDate: startDate.value,
    endDate: endDate.value,
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

  const weatherCurrentIcon = document.getElementById("weatherCurrentIcon");
  const min_temp = document.getElementById("min_temp");
  const max_temp = document.getElementById("max_temp");
  const currentTemp = document.getElementById("currentTemp");
  const date = document.getElementById("date");
  const weatherDescription = document.getElementById("weatherDescription");
  const city = document.getElementById("city");
  const imagePlace = document.getElementById("imagePlace");

  weatherCurrentIcon.src = `https://www.weatherbit.io/static/img/icons/${weather.weatherCurrentIcon}.png`;
  min_temp.innerHTML = `${weather.min_temp}°C`;
  max_temp.innerHTML = `${weather.max_temp}°C`;
  currentTemp.innerHTML = `${weather.currentTemp}°C`;
  date.innerHTML = weather.newDate ? weather.newDate : "";
  weatherDescription.innerHTML = weather.weatherDescription;
  city.innerHTML = weather.latCity ? weather.lngCity : "";
  imagePlace.innerHTML = `${weather.imagePlace}`;

  destination.value = "";
  startDate.value = "";
  endDate.value = "";

  showFutureTemprature(weather.futureTemp);
}

const showFutureTemprature = (futureTemp) => {
  futureTemp.forEach((element) => {
    showTemperature(element);
  });
};

const showTemperature = (dayTemp) => {
  console.log(dayTemp);

  const container = document.getElementsByClassName("container")[0];
  container.appendChild(createWeatherView());


  // get the div by id
  // add element to grid
};

const createWeatherView = (dayTemp) => {

  const section = createDivSection();


  // const futureWeatherSection = document.createElement("div");
  // futureWeatherSection.className = "divSectionTemperature";
  // futureWeatherSection.id = "WeatherSectionFuture";
  // futureWeatherSection.appendChild(container);
  // create the icon
  // create the description
  // create the weather
  // create the max
  // create the min
  // return view
  return section;
};

function createDivSection() {
  const section = document.createElement("div");
  section.className = "divSection";
  return section;
}
