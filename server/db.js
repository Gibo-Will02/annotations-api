var Knex = require('knex')
const knexfile = require("./knexfile.js")

var db = Knex(knexfile.development)

module.exports = db