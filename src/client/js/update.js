import * as DateHelper from "./date";

function updateUI(weather) {
  console.log(weather);

  const imagePlace = document.getElementsByClassName("placeImage")[0];
  const weatherCurrentIcon = document.getElementById("weatherCurrentIcon");
  const currentTemp = document.getElementById("currentTemp");
  const min_temp = document.getElementById("min_temp");
  const max_temp = document.getElementById("max_temp");
  const date = document.getElementById("date");
  const weatherDescription = document.getElementById("weatherDescription");
  const inputDate = document.getElementById("inputDate");

  imagePlace.src = weather.imagePlace;
  weatherCurrentIcon.src = `https://www.weatherbit.io/static/img/icons/${weather.weatherCurrentIcon}.png`;
  currentTemp.innerHTML = `Today ${Math.ceil(weather.currentTemp)}°C`;
  min_temp.innerHTML = `Min ${Math.ceil(weather.min_temp)}°C`;
  max_temp.innerHTML = `Max ${Math.ceil(weather.max_temp)}°C`;
  const formattedDate = new Date(inputDate.value);
  weatherDescription.innerHTML = weather.weatherDescription;

  //created (how log is the day for the travel?)
  const todayDate = new Date();
  const days = DateHelper.calculateDaysBetweenDates(todayDate, formattedDate); // days
  date.innerHTML = `Your travel is in ${Math.ceil(days)} days`;

  if (days < 0) {
    date.innerHTML = `Your travel have already happend`;
  }

  showFutureTemperature(weather.futureTemp);

  destination.value = "";
}

const showFutureTemperature = (futureTemp) => {
  const container = document.getElementsByClassName("container")[0];
  container.innerHTML = "";

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

  const divSectionTemp = document.createElement("div");
  divSectionTemp.className = "divSectionTemp";
  section.appendChild(divSectionTemp);

  const minTemp = document.createElement("p");
  minTemp.id = "minTemp";
  minTemp.innerHTML = ` ${Math.ceil(dayTemp.tempMin)}°C`;
  divSectionTemp.appendChild(minTemp);

  const maxTemp = document.createElement("p");
  maxTemp.id = "maxTemp";
  maxTemp.innerHTML = `${Math.ceil(dayTemp.tempMax)}°C`;
  divSectionTemp.appendChild(maxTemp);

  const description = document.createElement("h4");
  description.id = "descriptionWeatherFuture";
  description.innerText = dayTemp.description;
  section.appendChild(description);

  const weatherDate = new Date(dayTemp.date); //call paramenter dayTemp.date e criate new date
  const weatherFormatedDate = DateHelper.formatDate(weatherDate);

  const date = document.createElement("p");
  date.id = "dateFuture";
  date.innerHTML = weatherFormatedDate; // call the string formatDate
  section.appendChild(date);

  const inputDate = document.getElementById("inputDate");
  const inputFormattedDate = DateHelper.formatDate(new Date(inputDate.value));

  // if date are into 16 days will be highlight of screem

  if (inputFormattedDate === weatherFormatedDate) {
    section.setAttribute("style", "border-color: #158f8b;");
  }

  return section;   // changed border into div section
};

function createDivSection() {
  const section = document.createElement("div");
  section.className = "divSection";
  return section;
}

export { updateUI };
