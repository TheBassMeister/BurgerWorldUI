# BurgerWorldUI

Welcome to the UI Part of the Burgerworld Service. The goal is to run this app as a microservice in
the Burgerworld world. This is of course just a private test application and not a real production ready one

## Technologies used
* React.js for the frontend (Babel, ES6,...)
* React Bootstrap for some components
* React Router for rooting
* Spring Boot Rest just to have a tomcat server as an entry point

## Running the application
As easy as it gets.
1. First start the spring-boot:run maven goal which will use the maven frontend plugin 
to start webpack in watch mode. This way you can easily change the UI to your liking.
2. Start the BurgerWorldUIApplication like any other Spring Boot application

Step 1 is only needed if you want to change the UI and initially to pull the node dependencies.
Once the app is built (meaning the bundle.js was created) and you don't want to change anything 
you could just run Step 2.

## TODO
* Show Burgers in the UI
* Create the Create Burger Dialog
* Actually load the burgers from the backend and persist them there
* Deploy and run app as Docker service
* (Optional) Add shopping basket functionality
* (Optional) Add customer functionality