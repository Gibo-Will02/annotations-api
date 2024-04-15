# coding-textbook
A service for providing assigned readings to students.

## Developing the application locally
This project has been configured with a docker-compose development environment.  You must have docker and docker-compose installed, and if working in a Windows environment we highly recommend using Windows Subsystem for Linux with Docker Desktop and VS Code.

Currently, this repository is configured to run in a "development mode" where the code in each project is mounted as a volume in their respective Docker containers. More work must be done to update the `Dockerfile.dev` files to properly Dockerize this project for deployment.

First, you must install NodeJS version 16 on your system (recommend using [NVM](https://github.com/nvm-sh/nvm) to manage NodeJS versions). Then, clone the repository and run `npm install` from both the client and server directories:

You need to have two instances of a bash terminals.
For the first bash terminal
type:

```

$ cd server
$ npm install
$ npm start

for the second terminal type:

```

$ cd client
$ npm install
$ npm start

```

You should then be able to access the service at http://localhost:3000. 

Both the client and server do hot code reloading, so you the server and/or client reboot and redeploy as you save changes in the code.  The only exception is changes to the dependencies and package file, which require a rebuild using `npm install` and through docker-compose. The server side may take a bit to load up so if the client side loads faster and says the server is not working, give it a moment and refresh the page.

## Developing in codespaces
This process currently is effectively the same.

This project has been configured with a docker-compose development environment.  You must have docker and docker-compose installed, and if working in a Windows environment we highly recommend using Windows Subsystem for Linux with Docker Desktop and VS Code.

Currently, this repository is configured to run in a "development mode" where the code in each project is mounted as a volume in their respective Docker containers. More work must be done to update the `Dockerfile.dev` files to properly Dockerize this project for deployment.

First, you must install NodeJS version 16 on your system (recommend using [NVM](https://github.com/nvm-sh/nvm) to manage NodeJS versions). Then, clone the repository and run `npm install` from both the client and server directories:

You need to have two instances of a bash terminals.
For the first bash terminal
type:

```
$ cd server
$ npm install
$ npm start

for the second terminal type:

```

$ cd client
$ npm install
$ npm start

```

You should then be able to access the service at http://localhost:3000. 

At this point the project will be port forwarded and the port will be found under the ports tab in the terminal. This link can be given to any other device to connect to the application. This link will change for each codespace.

Both the client and server do hot code reloading, so you the server and/or client reboot and redeploy as you save changes in the code.  The only exception is changes to the dependencies and package file, which require a rebuild using `npm install` and through docker-compose. The server side may take a bit to load up so if the client side loads faster and says the server is not working, give it a moment and refresh the page.


