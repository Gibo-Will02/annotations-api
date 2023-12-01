const axios = require( "axios" )
const express = require( "express" )
const bodyParser = require( "body-parser" )
const uid = require( "uid-safe" )
const auth = require("./endpoints/auth")
const session = require('express-session')
const loginRequired = require('./middleware/login-required')

const app = new express()

app.use( bodyParser.json() )

app.set('trust proxy', 1)

app.use(session({
  secret: 'Annotation-Group-Project',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: false,
  },
}))

//app.use(express.static('../../client/build'))


const router = express.Router();

app.use('/api', router) //Put in routers folder in a file

router.use(auth)

router.get('/whoami',loginRequired,(req, res) => {
  console.log("Username: " + req.session.username)
  res.json({username: req.session.username});
})

const config = { //put into router file
  headers: {
    "X-Institution": process.env.INSTITUTION,
    "X-API-TOKEN": process.env.TOKEN
  }
}
app.get('/api/users', (req, res) => {
  axios.get("https://app.perusall.com/api/v1/users", config).then((response)=>res.json(response.data)).catch((err)=>console.error(err));
})


// If we are serving our app through a proxy server,
// the proxy server may be using HTTPS protocol while
// the express server is using HTTPS.  This will
// cause the OAuth signatures to not match.  Setting 
// a proxy trust setting on express will have it 
// reflect the protocol used by the proxy instead.
// var trustProxy = process.env.TRUST_PROXY;
// if(trustProxy) {
//   // The 'trust proxy' setting can either be a boolean
//   // (blanket trust any proxy) or a specific ip address
//   if(trustProxy === "true") app.set('trust proxy', true);
//   else app.set('trust proxy', trustProxy);
// }

// We use the bodyparser middleware to process incoming
// request bodies
app.use(bodyParser.urlencoded({extended: false}));

// For this app we have a single route that responds to
// LTI launch requests. 
//app.post('/api/lti', require('./middleware/verify-lti-launch'), require('./endpoints/lti-launch'));


app.post('/api/reading', async (req, res) => {
  const response = await axios.get(req.body.url);
  res.send(response.data.replace('</body>', '<script src="https://hypothes.is/embed.js" async></script></body>'))
})

//app.post('/', require('./middleware/verify-lti-launch'), require('./endpoints/lti-launch'));

module.exports = app;