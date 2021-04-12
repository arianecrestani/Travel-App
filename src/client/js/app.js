/* Global Variables */

// pegando os elementos do html
const searchButton = document.getElementById("clickSearch");
const date = document.getElementById("inputDate");
const destination = document.getElementById("destination");

/* Function called by event */
const generateButtonClick = () => {
  // getGeonames(destination.value)
  //   .then((wheatherData) => postData(createDataJson(wheatherData)))
  //   .then(() => getServerData())
  //   .then((projectData) => response.send(projectDa));
  console.log("text");
  
  getServerData().then((data) => console.log(data));
};

searchButton.addEventListener("click", generateButtonClick);

//1 pedido do site weathercity
const getServerData = async () => {
  const url = "http://localhost:8000/weathercity";
  const response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("text");
  try {
    const newData = await response.json(); //resposta do servidor
    console.log(newData);
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
