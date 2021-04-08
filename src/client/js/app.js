/* Global Variables */

// pegando os elementos do html
const generate = document.getElementById("clickSearch");
const date = document.getElementById("inputDate");
const destinationCity = document.getElementById("destination");

// Create a new date instance dynamically with JS
let dt = new Date();
// creando nova data
let newDate = dt.getMonth() + 1 + "/" + dt.getDate() + "/" + dt.getFullYear();

/* Function called by event */
const generateButtonClick = () => {
  getGeonames(destinationCity.value)
    .then((wheatherData) => postData(createDataJson(wheatherData)))
    .then(() => getServerData())
    .then((serverData) => updateUI(serverData));
};

const createDataJson = (data) => {
  return {
    //criando as info (json) para o servidor
    icon: data.weather[0].icon,
    date: newDate,
    temperature: Math.floor(data.main.temp),
    status: data.weather[0].main,
    city: data.name,
    feelings: textArea.value,
  };
};

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", generateButtonClick);

/* Function to GET Web API Data*/

const getGeonames = async (destinationCity) => {
  const baseUrl = "api.geonames.org/postalCodeSearchJSON?placename=austria&username=ariane&postalcode_startsWith	=0";
  const apiKey = "geoname_Api"
 
  return await fetch(`${baseUrl}placename=${destinationCity},&username=${apiKey}&postalcode_startsWith	=0`)
    .then((response) => response.json())
    .catch((error) => console.log(error)); // continuacao de criando uma URL
};

// Async POST Function to POST data */
const postData = async (data) => {
  console.log(data);
  return await fetch("http://localhost:8000/add", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const getServerData = async () => {
  const url = "http://localhost:8000/get";
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  });

  try {
    const newData = await response.json(); //resposta do servidor
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

function updateUI(weather) {
  console.log(weather);

  const icon = document.getElementById("icon");
  const date = document.getElementById("date");
  const temp = document.getElementById("temp");
  const status = document.getElementById("status");
  const city = document.getElementById("location");
  const content = document.getElementById("content");

  icon.innerHTML = `<img src="svg/${weather.icon}.svg" alt="nothing yet" />`;
  date.innerHTML = weather.date ? weather.date : "";
  temp.innerHTML = `${weather.temperature}°C`;
  status.innerHTML = weather.status ? weather.status : "";
  city.innerHTML = weather.city ? weather.city : "";
  content.innerHTML = weather.feelings ? weather.feelings : "";

  textArea.value = "";
  zipcode.value = "";
}
