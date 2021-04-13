


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
    method: "POST",
    credentials: "same-origin",
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


