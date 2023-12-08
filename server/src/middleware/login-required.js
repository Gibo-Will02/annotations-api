/**
 * The login-required middleware that is injected in the /whoami call when a user wants to login to the app
 * @param {*} req - The request object which will contain username if user has logged im
 * @param {*} res  - The response object
 * @param {*} next - The next middleware object (will tell execution to continue upon completion)
 */
const loginRequired = (req, res, next) => {
    // A logged-in user should have a username set in the session
    console.log("Printing req.session.username: " + req.session.username) //window.location can be moved here
    if(req.session && req.session.username) next();
    // If not, redirect them to the login page
    else {
        // console.log("Inside of login-required redirect")
        // res.redirect('/api/login');
        res.status(403).send("You are not authorized to view this page.");
    }
  }
  
  module.exports = loginRequired;