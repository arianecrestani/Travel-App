//order site weathercity
const postServerData = async (destination, startDate) => {
  const body = {
    destination: destination,
    startDate: startDate,
  };
  return fetch("http://localhost:8000/weathercity", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
export { postServerData };
