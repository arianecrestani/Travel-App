// import just updateUi 
import { destination, startDate} from "./inputs"

//order site weathercity
const postServerData = async () => {
  const body = {
    destination: destination.value,
    startDate: startDate.value,
  };
  return fetch("http://localhost:8000/weathercity", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => response.json());
};
export { postServerData }