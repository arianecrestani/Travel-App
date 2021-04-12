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

const app = createExpressApp();

function setupEndPoint(app) {
  const responseDate = {
    place: "h",
  };

  app.get("/", function (request, response) {
    response.sendFile("dist/index.html");
  });

  app.get("/weathercity", (request, response) => {
    response.send(responseDate);
    console.log("get resquest to homepage");
  });
}

/* Function to GET Web Geoname API Data*/

const getGeonames = async (destination) => {
  const baseUrl = "api.geonames.org/postalCodeSearchJSON?";
  const apiKey = "geoname_Api";

  return await fetch(`${baseUrl}placename=${destination},&username=${apiKey}`)
    .then((response) => response.json())
    .then(data); // continuacao de criando uma URL
};

const createDataJson = (data) => {
  return {
    //criando as info (json) para o servidor
    // lat = data.geonames[0].lat,
    // lng = data.geonames[0].lng,
  };
};

//current weather Api

const getCurrentWeather = async () => {
  const baseUrl =
    "api.geonames.org/postalCodeSearchJSON?placename=austria&username=ariane&postalcode_startsWith	=0";
  const apiKey = "geoname_Api";

  return await fetch(
    `${baseUrl}placename=${destination},&username=${apiKey}`
  ).then((response) => response.json());
  // continuacao de criando uma URL
};

const getCurrentWeather = async () => {
  const baseUrl = "https://pixabay.com/api/";
  const apiKey = "pixabay_Api";

  return await fetch(
    `${baseUrl}placename=${destination},&username=${apiKey}&postalcode_startsWith	=0`
  )
    .then((response) => response.json())
    .catch((error) => console.log(error)); // continuacao de criando uma URL
};

function listening() {
  console.log(server);
}

setupEndPoint(app);

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
