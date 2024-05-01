require('dotenv').config();
const app = require("./src/app")
const swaggerDocs = require("./src/swagger/swagger")

module.exports = app

//Establish the server application to listen on port 3050
app.listen( 3050, () => console.log("Listening on port 3050"))

swaggerDocs(app, 3050);