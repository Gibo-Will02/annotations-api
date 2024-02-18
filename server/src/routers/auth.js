const axios = require('axios')
const express = require( "express" )

var dotenv = require('dotenv')
var dotenvExpand = require('dotenv-expand')
var myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const router = express.Router()
var serviceHost = encodeURIComponent(process.env.DOMAIN_NAME); //.env variable
console.log("Inside of auth.js")
var casHost = 'https://testcas.cs.ksu.edu/'; //.env variable

//The /login route that will reroute to outside cashost for login
router.get('/login', (req, res) => {
  console.log("Inside /login") //Don't need logs
  res.redirect(`${casHost}login?service=${serviceHost}api%2Fticket`)
});

//The /logout route which will log the user out of the CAS server, and kill the session
router.get('/logout', (req,res) => {
  // Destroy the session with this app
  req.session.destroy();
  // Also redirect to CAS server logout to end its session
  res.redirect(`${casHost}logout`);
})

/**
 * The /ticket route
 * Catches the response from the CAS server, validates that that a username that was entered exists, (will check against the whitelist)
 * Then redirects users to the application showing they have logged in
 */
router.get('/ticket', async (req,res) => {
  console.log("Inside /ticket") //Don't need logs
  // get the ticket from the querystring
  const ticket = req.query.ticket;
  // We need to verify this ticket with the CAS server,
  // by making a request against its serviceValidate url
  var url = `${casHost}serviceValidate?ticket=${ticket}&service=${serviceHost}api/ticket`;
  // We'll use the fetch api to talk to the CAS server.  This can throw errors, so
  // we'll wrap it in a try-catch
  try {
    // We'll make an asynchronous request, so we await the response
    const response = await axios.get(url);
    // Then look for a username in the response using a regular expression
    // The response should be the XML specified by the standard.  We could
    // parse it as XML, but we only care about one element (`<cas:user>`),
    // so a regular expression has less overhead.
    var match = /<cas:user>\s*(\S+)\s*<\/cas:user>/.exec(response.data);
    // If it was found, we know the ticket was validated and we can log the user in
    // Otherwise, respond with an unauthorized response
    if(match) {
      // The username should be the first capture group, so store it in our session
      req.session.username = match[1];
      req.session.save()
      console.log("Successfully logged in: " +  req.session.username) //Don't need logs
      res.redirect('/')
      // Then redirect them to the landing page 
    } else {
      res.status(403).send('Authorization failed');
    }
  } catch (err) {
    // If we caught an error, log it to the console
    console.error(err);
    // and send a 500 status code 
    res.status(500).send('Sorry. Something went wrong.')
  }
})


module.exports = router;