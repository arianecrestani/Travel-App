//dependecias

var path = require("path");
const fetch = require("node-fetch");
const { request } = require("express");

const createExpressApp = () => {
  const dotenv = require("dotenv");
  dotenv.config();
  const express = require("express");
  const cors = require("cors");
  const app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(express.static("dist"));
  app.use(cors());

  console.log(__dirname);
  return app;
};

let responseData = {};

function setupEndPoint(app) {
  app.get("/", function (request, response) {
    response.sendFile("dist/index.html");
  });

  app.post("/weathercity", (request, response) => {
    responseData = {};
    responseData.city = request.body.destination;
    console.log(request.body); // wiil get destionation, inputStartDate and inputEndDate
    getGeonames(request.body.destination)
      .then(() => getCurrentWeather(responseData.latCity, responseData.lngCity))
      .then(() => getFutureWeather(responseData.city))
      .then(() => getImagePlace(responseData.city))
      .then(() => response.send(responseData)); //enviando a resposta para o cliente
  });
}

/* Function to GET Web Geoname API Data*/

const getGeonames = async (city) => {
  const baseUrl = "http://api.geonames.org/postalCodeSearchJSON?";
  const apiKey = `${process.env.geoname_Api}`;

  return await fetch(`${baseUrl}username=${apiKey}&placename=${city}`)
    .then((response) => response.json())
    .then((json) => createLatLngFromJson(json)); // continuacao de criando uma URL
};

// criar informacoes em json para o servidor
const createLatLngFromJson = (dataJson) => {
  console.log("createDataJsonGeonames");
  console.log(dataJson);
  if (dataJson.postalCodes === undefined) {
    return {};
  }
  responseData.latCity = dataJson.postalCodes[0].lat;
  responseData.lngCity = dataJson.postalCodes[0].lng;
};

//current weather Api

const getCurrentWeather = async (lat, lng) => {
  console.log(`lat: ${lat} lng: ${lng}`);
  const baseUrl = "http://api.weatherbit.io/v2.0/current?";
  const apiKey = `${process.env.weatherbit_Api}`;

  return await fetch(
    `${baseUrl}lat=${lat}&lon=${lng}&key=${apiKey}&include=minutely`
  )
    .then((response) => response.json())
    .then((json) => createWeatherDataFromJson(json));
};

const createWeatherDataFromJson = (dataJson) => {
  console.log("createWeatherDataFromJson");
  console.log(dataJson);

  responseData.currentTemp = dataJson.data[0].temp;
  responseData.min_temp = dataJson.data[0].min_temp;
  responseData.max_temp = dataJson.data[0].max_temp;
  responseData.weatherCurrentIcon = dataJson.data[0].weather.icon;
  responseData.weatherDescription = dataJson.data[0].weather.description;
};

const getFutureWeather = async (city) => {
  const baseUrl = "http://api.weatherbit.io/v2.0/forecast/daily?";
  const apiKey = `${process.env.weatherbit_Api}`;
  return await fetch(`${baseUrl}city=${city}&key=${apiKey}`)
    .then((response) => response.json())
    .then((json) => createFutureWeatherDataFromJson(json));
};

const createFutureWeatherDataFromJson = (dataJson) => {
  console.log("createFutureWeatherDataFromJson");
  console.log(dataJson);

  // percorrer o dataJson e criar uma list de temperaturas para os proximos dias.
  let futureTemp = [];
  //pegando elementos do json mais espefificado
  dataJson.data.forEach((element) => {
    // just geting needs value from Json
    const newElement = {
      date: element.valid_date,
      icon: element.weather.icon,
      tempMin: element.min_temp,
      tempMax: element.max_temp,
      description: element.weather.description,
    };
    futureTemp.push(newElement);
  });

  responseData.futureTemp = dataJson.data[0].valid_date;
  responseData.min_temp = dataJson.data[0].min_temp;
  responseData.max_temp = dataJson.data[0].max_temp;
  responseData.weatherFuturIcon = dataJson.data[0].weather.icon;
  responseData.weatherDescription = dataJson.data[0].weather.description;

  responseData.futureTemp = futureTemp;
};

const getImagePlace = async (city) => {
  const baseUrl = "https://pixabay.com/api/?";
  const apiKey = `${process.env.pixabay_Api}`;

  return await fetch(
    `${baseUrl}key=${apiKey}&q=${city}&category=places&orientation=horizontal&per_page=3`
  )
    .then((response) => response.json())
    .then((json) => createPixabayDataFromJson(json));
};
const createPixabayDataFromJson = (dataJson) => {
  console.log("createPixabayDataFromJson");
  console.log(dataJson);

  responseData.imagePlace = dataJson.hits[0].webformatURL;
};

function listening() {
  console.log(server);
}
const app = createExpressApp();
setupEndPoint(app);

const port = 8000;
const server = app.listen(port, listening);
