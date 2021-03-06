const fetch = require("node-fetch");
let responseData = {};

/* Function to GET Web Geoname API Data*/

const getGeonames = async (city) => {
  const baseUrl = "http://api.geonames.org/postalCodeSearchJSON?";
  const apiKey = `${process.env.geoname_Api}`;

  return await fetch(`${baseUrl}username=${apiKey}&placename=${city}`)
    .then((response) => response.json())
    .then((json) => createLatLngFromJson(json));

    
};

// created info in json to server
const createLatLngFromJson = (dataJson) => {
  console.log("createDataJsonGeonames");
  console.log(dataJson);
 


  if (dataJson.postalCodes === undefined || dataJson.postalCodes.lenght === 0) {
    console.log("dd")
    return responseData;
  
  }
  responseData.latCity = dataJson.postalCodes[0].lat;
  responseData.lngCity = dataJson.postalCodes[0].lng;
  return responseData;
  
};

//current weather Api

const getCurrentWeather = async (lat, lng, city) => {
  const baseUrl = "http://api.weatherbit.io/v2.0/current?";
  const apiKey = `${process.env.weatherbit_Api}`;
  const url = `${baseUrl}lat=${lat}&lon=${lng}&key=${apiKey}&include=minutely&city=${city}`

  return await fetch(url)
    .then((response) => response.json())
    .then((json) => createWeatherDataFromJson(json));
};

const createWeatherDataFromJson = (dataJson) => {
  console.log("createWeatherDataFromJson");
  console.log(dataJson);
 
  responseData.currentTemp = dataJson.data[0].temp;
  responseData.min_temp = dataJson.data[0].min_temp;
  responseData.max_temp = dataJson.data[0].max_temp;
  responseData.weatherCurrentIcon = dataJson.data[0].weather.icon;
  responseData.weatherDescription = dataJson.data[0].weather.description;
};

/* Function to GET Web Geoname API Data*/

const getFutureWeather = async (city) => {
  const baseUrl = "http://api.weatherbit.io/v2.0/forecast/daily?";
  const apiKey = `${process.env.weatherbit_Api}`;
  return await fetch(`${baseUrl}city=${city}&key=${apiKey}`)
    .then((response) => response.json())
    .then((json) => createFutureWeatherDataFromJson(json));
};

const createFutureWeatherDataFromJson = (dataJson) => {
  console.log("createFutureWeatherDataFromJson");
  console.log(dataJson);

//going to dataJason and created a list of temperture for next days

  let futureTemp = [];
  //get elements from json
  dataJson.data.forEach((element) => {
    // just geting needs value from Json
    const newElement = {
      date: element.valid_date,
      icon: element.weather.icon,
      tempMin: element.min_temp,
      tempMax: element.max_temp,
      description: element.weather.description,
    };
    futureTemp.push(newElement);
  });

  responseData.futureTemp = dataJson.data[0].valid_date;
  responseData.min_temp = dataJson.data[0].min_temp;
  responseData.max_temp = dataJson.data[0].max_temp;
  responseData.weatherFuturIcon = dataJson.data[0].weather.icon;
  responseData.weatherDescription = dataJson.data[0].weather.description;

  responseData.futureTemp = futureTemp;
};

const getImagePlace = async (city) => {
  const baseUrl = "https://pixabay.com/api/?";
  const apiKey = `${process.env.pixabay_Api}`;

  return await fetch(
    `${baseUrl}key=${apiKey}&q=${city}&category=places&orientation=horizontal&per_page=3`
  )
    .then((response) => response.json())
    .then((json) => createPixabayDataFromJson(json));
};

const createPixabayDataFromJson = (dataJson) => {
  console.log("createPixabayDataFromJson");
  console.log(dataJson);

  responseData.imagePlace = dataJson.hits[0].webformatURL;
};

exports.getGeonames = getGeonames;
exports.getCurrentWeather = getCurrentWeather;
exports.getFutureWeather = getFutureWeather;
exports.getImagePlace = getImagePlace;
exports.responseData = responseData;
exports.createLatLngFromJson = createLatLngFromJson;