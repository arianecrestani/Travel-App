//dependecias

const service = require("./service.js"); 

var path = require("path");
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
  app.get("/", function (request, response) {
    response.sendFile("dist/index.html");
  });

  app.post("/weathercity", (request, response) => {
    service.responseData.city = request.body.destination;
    console.log(request.body); // wiil get destionation, inputDate
    service.getGeonames(request.body.destination)
      .then(() => service.getCurrentWeather(service.responseData.latCity, service.responseData.lngCity))
      .then(() => service.getFutureWeather(service.responseData.city))
      .then(() => service.getImagePlace(service.responseData.city))
      .then(() => response.send(service.responseData)); //send a response to client 
  });
}


function listening() {
  console.log(server);
}

const app = createExpressApp();
setupEndPoint(app);

const port = 8000;
const server = app.listen(port, listening);
