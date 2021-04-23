/* Global Variables */

const searchButton = document.getElementById("clickSearch");
const startDate = document.getElementById("inputDate");
const destination = document.getElementById("destination");

/* Function called by event */
const generateButtonClick = () => {
  postServerData().then((json) => updateUI(json));
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
  const currentTemp = document.getElementById("currentTemp");
  const min_temp = document.getElementById("min_temp");
  const max_temp = document.getElementById("max_temp");
  const date = document.getElementById("date");
  const weatherDescription = document.getElementById("weatherDescription");
  const inputDate = document.getElementById("inputDate");

  imagePlace.src = weather.imagePlace;
  weatherCurrentIcon.src = `https://www.weatherbit.io/static/img/icons/${weather.weatherCurrentIcon}.png`;
  currentTemp.innerHTML = `${Math.ceil(weather.currentTemp)}°C`;
  min_temp.innerHTML = `Min ${Math.ceil(weather.min_temp)}°C`;
  max_temp.innerHTML = `Max ${Math.ceil(weather.max_temp)}°C`;
  const formattedDate = new Date(inputDate.value);
  weatherDescription.innerHTML = weather.weatherDescription;

  //create (how log is the day for the travel?)
  const todayDate = new Date();
  const days = calculateDaysBetweenDates(todayDate, formattedDate); // days
  date.innerHTML = `your travel is in ${Math.ceil(days)} days`;

  showFutureTemperature(weather.futureTemp);

  destination.value = "";
  startDate.value = "";
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
  const weatherFormatedDate = formatDate(weatherDate);

  const date = document.createElement("p");
  date.id = "dateFuture";
  date.innerHTML = weatherFormatedDate; // call the string formatDate
  section.appendChild(date);

  const inputDate = document.getElementById("inputDate");
  const inputFormattedDate = formatDate(new Date(inputDate.value));

  // quando eu coloco a data se a data estiver dentro dos proximos 16 dias
  // ira mudar a cor do border de uma das divs

  if (inputFormattedDate === weatherFormatedDate) {
    section.setAttribute("style", "border-color: #158f8b;");
  }

  return section;
};

function createDivSection() {
  const section = document.createElement("div");
  section.className = "divSection";
  return section;
}

const formatDate = (date) => {
  return (
    date.getDate() + "/" + (1 + date.getMonth()) + "/" + date.getFullYear()
  );
};

const calculateDaysBetweenDates = (date1, date2) => {
  // To calculate the time difference of two dates
  const differenceInTime = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays;
};
