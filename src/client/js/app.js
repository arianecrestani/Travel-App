/* Global Variables */

// pegando os elementos do html
const searchButton = document.getElementById("clickSearch");
const date = document.getElementById("inputDate");
const destination = document.getElementById("destination");

/* Function called by event */
const generateButtonClick = () => {
  postServerData().then((data) => console.log(data));
};

searchButton.addEventListener("click", generateButtonClick);

//1 pedido do site weathercity
const postServerData = async () => {
  const body = {
    destination: destination.value,
  };
  return await fetch("http://localhost:8000/weathercity", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
