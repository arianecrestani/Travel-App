//dependecias


const { request } = require("express");


const createExpressApp = () => {
    const dotenv = require('dotenv');
    const express = require('express')
    const cors = require("cors");
    const app = express()
  
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(express.static('dist'))
    app.use(cors());

    console.log(__dirname)
    return app;
}
const app = createExpressApp();
dotenv.config();

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
})

//criar rota

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