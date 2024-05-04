/*
* this sets up the proxy for the middleware located in server
* No longer really needed as it functionality has been changed and no longer needed
*
*/
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Creating a middleware on the client side to establish a proxy for any calls that have '/api/
 * @param {*} app - The application that the middleware to be applied to
 */
module.exports = function(app) {
    console.log("Inside of React proxy middleware") //Don't need logs
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://localhost:3050",
      changeOrigin: true,
      autoRewrite: true,
    })
  );
};