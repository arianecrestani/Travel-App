### Travel-app


 ## Introduction 
I created this graph so that you, reader, can understand the step by step of the line of reasoning elaborated for this project which also consists of using the server and 3 Apis for this project.

![flwochart](./src/client/styles/grafico.jpg)

 ## Development procedure
 
The project is based on Express to provide a server where data is stored and retrievable by the app. To accomplish this, GET and POST server routes were provided for communication purposes with the app. The server retrieves and processes data from three different APIs: GeoNames, Weatherbit.io and Pixabay. The retrieved information is served via specific routes. The app retrieves the information and updates the user interface with the received data from the Express server. Error handling is provided to give meaningful feedback in case something goes wrong. Furthermore webpack is used to generate different bundles for production and development.
