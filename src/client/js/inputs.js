import { updateUI, showError } from "./update";
import { postServerData } from "./app";

const searchButton = document.getElementById("clickSearch");

/* Function called by event */
const generateButtonClick = () => {
  const startDate = document.getElementById("inputDate");
  const destination = document.getElementById("destination");

  // verify if the destination, inputDate are not undefined
  if (destination.value !== "" && startDate.value !== "") {
    postServerData(destination.value, startDate.value).then((json) => {
      if (json.error) {
        showError();
      } else {
        updateUI(json);
      }
    });
  }
};

searchButton.addEventListener("click", generateButtonClick);

export { generateButtonClick };
