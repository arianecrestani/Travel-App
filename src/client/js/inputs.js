
import { updateUI } from "./update";
import { postServerData } from "./app";
/* Global Variables */

const searchButton = document.getElementById("clickSearch");
const startDate = document.getElementById("inputDate");
const destination = document.getElementById("destination");

/* Function called by event */
const generateButtonClick = () => {
  postServerData().then((json) => updateUI(json));
};

searchButton.addEventListener("click", generateButtonClick);


export { generateButtonClick, startDate,  destination }