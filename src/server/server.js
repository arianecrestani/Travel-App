//dependecias

const fetch = require('node-fetch');  
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

function setupEndPoint(app) {
  const responseDate = {
    place: "h",
  };

  app.get("/", function (request, response) {
    response.sendFile("dist/index.html");
  });

  app.get("/weathercity", (request, response) => {
    response.send("responseDate");
    console.log("get resquest to homepage");
  });
}

/* Function to GET Web Geoname API Data*/

const getGeonames = async () => {
  const baseUrl = "api.geonames.org/postalCodeSearchJSON?";
  const apiKey = "geoname_Api";

  return await fetch(`${baseUrl}placename=${city},&username=${apiKey}`)
    .then((response) => response.json())
    .then(data); // continuacao de criando uma URL
};

//criar informacoes em json para o servidor
// const createDataJsonGeonames = (data) => {
//   return {
  
//     // lat = data.geonames[0].lat,
//     // lng = data.geonames[0].lng,
//   };
// };

//current weather Api

const getCurrentWeather = async () => {
  const baseUrl ="http://api.weatherbit.io/v2.0/current";
  const apiKey = "weatherbit_Api";

  return await fetch(
    `${baseUrl}?lat&=${lat}&lon=${lng}&key=${apiKey}`
  ).then((response) => response.json());
  // continuacao de criando uma URL
};
// const createDataJsonCurrentWeather = (data) => {
//   return {
  
//     // lat = data.[0].lat,
//     // lng = data.geonames[0].lng,
//   };
// };



const getFutureWeather = async () => {
  const baseUrl ="http://api.weatherbit.io/v2.0/forecast/daily";
  const apiKey = "weatherbit_Api";

  return await fetch(
    `${baseUrl}?lat&=${lat}&lon=${lng}&key=${apiKey}`
  ).then((response) => response.json());
  // continuacao de criando uma URL
};


const getImagePlace = async () => {
  const baseUrl = "https://pixabay.com/api/";
  const apiKey = "pixabay_Api";

  return await fetch(
    //https://pixabay.com/api/?q=&category=places&orientation=horizontal
    `${baseUrl}?key=${apiKey}&q=${country},&category=places&orientation=horizontal`
  )
    .then((response) => response.json())
    .catch((error) => console.log(error)); // continuacao de criando uma URL
};

function listening() {
  console.log(server);
 
}
const app = createExpressApp();
setupEndPoint(app);

const port = 8000;
const server = app.listen(port, listening);

