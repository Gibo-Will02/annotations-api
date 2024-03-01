require('dotenv').config();
const app = require("./src/app")

module.exports = app

//Establish the server application to listen on port 3050
app.listen( 3050, () => console.log("Listening on port 3050"))