require('dotenv').config();
const app = require("./src/app")

/*
const db = require("./db")
db.migrate.currentVersion()
    .then(function(version) {
        console.log("Database Migration Version: " + version)
        if(version == 'none') {
            console.log("Database Empty - Migrating and Seeding")
            db.migrate.latest()
            .then(function() {
                return db.seed.run();
            })
            .then(function() {
                console.log("Complete!");
            })
        } else {
            console.log("Database Exists - Migrating")
            db.migrate.latest()
            .then(function() {
                console.log("Complete!");
            })
        }
    })
*/
module.exports = app

//Establish the server application to listen on port 3050
app.listen( 3050, () => console.log("Listening on port 3050"))