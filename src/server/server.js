const { request } = require("express");

function createExpressApp() {
  // Express to run server and routes
  const express = require("express");
  // Start up an instance of app
  const app = express();
  /* Dependencies */
  const bodyParser = require("body-parser");
  /* Middleware*/

  //Here we are configuring express to use body-parser as middle-ware.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // Cors for cross origin allowance
  const cors = require("cors");
  app.use(cors());
  // Initialize the main project folder
  app.use(express.static("website"));

  return app;
}

//entrada e saida do servidor (routes)
function setupEndPoint(app) {
  let projectData = {};
  // Respond with JS object when a GET request is made to the homepage
  app.get("/get", (request, response) => {
    response.send(projectData);
    console.log("get resquest to homepage");
  });

  app.post("/add", (request, response) => {
    projectData = request.body; //pegou as info do app
    response.send({ message: "Post received" });
    console.log(projectData);
  });
}

function listening() {
  console.log(server);
}

const app = createExpressApp();
setupEndPoint(app);

const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
