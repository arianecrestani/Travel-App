//dependecias

var path = require('path')
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

let responseData = { };

function setupEndPoint(app) {
  app.get("/", function (request, response) {
    response.sendFile("dist/index.html");
  });

  app.post("/weathercity", (request, response) => {
    responseData.city = request.body.destination;
    console.log(request.body.destination)
    getGeonames(request.body.destination)
    .then(() => response.send(responseData)); //enviando a resposta para o cliente
  });
}

/* Function to GET Web Geoname API Data*/

const getGeonames = async (city) => {
  const baseUrl = "http://api.geonames.org/postalCodeSearchJSON?";
  const apiKey = `${process.env.geoname_Api}`;

  return await fetch(`${baseUrl}username=${apiKey}&placename=${city}`)
    .then((response) => response.json())
    .then((json) => createLatLngFromJson(json) ); // continuacao de criando uma URL
};

// criar informacoes em json para o servidor
const createLatLngFromJson = (data) => {
  console.log("createDataJsonGeonames")
  console.log(data)
  if (data.postalCodes === undefined) {
    return {}
  }
  responseData.lat = data.postalCodes[0].lat
  responseData.lng = data.postalCodes[0].lng
  // return {
  //   lat: data.postalCodes[0].lat,
  //   lng: data.postalCodes[0].lng,
  // };
};

//current weather Api

const getCurrentWeather = async () => {
  const baseUrl = "http://api.weatherbit.io/v2.0/current";
  const apiKey = `${process.env.weatherbit_Api}`;

  return await fetch(`${baseUrl}?lat&=${lat}&lon=${lng}&key=${apiKey}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });

  // continuacao de criando uma URL
};

const getFutureWeather = async () => {
  const baseUrl = "http://api.weatherbit.io/v2.0/forecast/daily";
  const apiKey = `${process.env.weatherbit_Api}`;
  return await fetch(`${baseUrl}?lat&=${lat}&lon=${lng}&key=${apiKey}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
};

const getImagePlace = async () => {
  const baseUrl = "https://pixabay.com/api/";
  const apiKey = `${process.env.pixabay_Api}`;

  return await fetch(
    //https://pixabay.com/api/?q=&category=places&orientation=horizontal
    `${baseUrl}?key=${apiKey}&q=${country},&category=places&orientation=horizontal`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });
};

function listening() {
  console.log(server);
}
const app = createExpressApp();
setupEndPoint(app);

const port = 8000;
const server = app.listen(port, listening);
