# Contact List

This application retrieves the contacts by consuming an API and displaying them in a contact list segregated based upon the last name of the contacts.

## Features

This application uses react and developed using JSX and SCSS, it is focused on simplicity and provides a good base to build a complex contacts application.

It’s a scalable application that can consume one ore more api and can be easily integrated with other libraries, such as redux to help manage the state of the application.

Webpack to build the application and the build can be hosted on any server.
Currently the webpack build is hosted on firebase at url: 
https://contact-list-ce75d.firebaseapp.com

This application uses Jest to run unit test scripts.

Application is dockerized and can easily deployed into a container using a single command.


## Prerequisites

Node.js

The project require Node to setup and run the application.
Node is really easy to install & now include NPM.
Go on official Node.js website & download the installer. 
Also, be sure to have git available in your PATH, npm might need it.


## Installation

### Setting up:

Clone the repository using command:

$ git clone https://github.com/anishnalabanda/contact-list.git

$ cd contact-list


### Deployment:

contact-list is dockerized, if you have a docker available can simply deploy using single command:

  docker-compose up

The application will be up and running, and will be listening on port 5000.

  Example: http://localhost:5000/

### Alternatively you can also install and run the application using following commands:

Install node dependencies:

  npm install

To run in dev enviroment:

  npm run dev

To run in production environment:

  npm run build
  npm start

To open Contact List application:

  Open the published url in the browser,
  
  Example: http://localhost:3000/

# Live Version

You can find the live version of the project at,

  https://contact-list-ce75d.firebaseapp.com

