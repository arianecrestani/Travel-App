/* Global Variables */


  const searchButton = document.getElementById("clickSearch");
  const startDate = document.getElementById("inputStartDate");
  const endDate = document.getElementById("inputEndDate");
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
  return fetch("http://localhost:8000/weathercity", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())

};