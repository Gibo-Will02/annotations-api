const { Express, Request, Response } = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { version } = require('../../package.json');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Perusall API Documentation',
          version: '1.0.0',
          description: 'API documentation for the Perusall API',
        },
      },
    apis: ["./src/routers/api.js"],
  };

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, num) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get("/doc.json", (Request, Response) => {
        Request.setHeader("Content-Type", "application/json");
        Response.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;