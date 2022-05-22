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
1. Get the Burgerworld application (from my Repo), deploy it to Docker and run it. Check localhost:8080/burgers if backend is up. There should be three burgers visible.
2. Start the spring-boot:run maven goal which will use the maven frontend plugin 
to start webpack in watch mode. This way you can easily change the UI to your liking.
3. Start the BurgerWorldUIApplication like any other Spring Boot application

Step 2 is only needed if you want to change the UI and initially to pull the node dependencies.
Once the app is built (meaning the bundle.js was created) and you don't want to change anything 
you could just run Step 3.

## TODO
* Deploy and run app as Docker service
* (Optional) Add shopping basket functionality
* (Optional) Add customer functionality

###Known Bugs (might fix later)
* The Burger cards are running out of space if burgers have a lot ingredients
* Creating many custom burgers might make the page really wide instead of wrapping the burger columns
