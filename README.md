# Cross-stitch App Examples
Three examples of a cross-stitch app, in varying complexity

Cross-stitch terminology note: You create cross-stitch in a "[hoop](https://www.pinterest.com/search/pins/?q=cross-stitch%20hoop)," so each drawing is called a "hoop" in the app.

## cross-stitch-one-hoop
- Cross-stitch app that saves to one global hoop / drawing.
- To run:
  - In your terminal, run `$ mongod`. Keep that process running and don't close the terminal.
  - Create a second terminal window. In this terminal window, navigate to the `cross-stitch-one-hoop/` directory
  - Run `$ npm install`
  - Run `$ npm start`
  - View the running app at http://localhost:3000

## cross-stitch-one-user
- Cross-stitch app that allows you to create multiple hoops / drawings, without login or authentication
- Individual cross stitch hoops are found via `id/<hoop id>`
- Implementation note: This solution uses Handlebars templates but it doesn't really need to (the templates have no placeholders)
- To run:
  - In your terminal, run `$ mongod`. Keep that process running and don't close the terminal.
  - Create a second terminal window. In this terminal window, navigate to the `cross-stitch-one-hoop/` directory
  - Run `$ npm install`
  - Run `$ npm start`
  - View the running app at http://localhost:3000
 
 ## cross-stitch-user-login
- Cross-stitch app that allows you to create multiple hoops / drawings, saved with your Google account
- Individual cross stitch hoops are found via `id/<hoop id>`, but only if authenticated
- **NOTE:** You should create your own Google Client ID, following [these instructions](https://developers.google.com/identity/sign-in/web/devconsole-project). There is one saved in the repository, but that key will get deleted by the end of the quarter.
  - Modify the `CLIENT_ID` variable in `/google-auth.js`
  - Modify the `CLIENT_ID` variable in `/public/js/login-utils.js`
- To run:
  - In your terminal, run `$ mongod`. Keep that process running and don't close the terminal.
  - Create a second terminal window. In this terminal window, navigate to the `cross-stitch-one-hoop/` directory
  - Run `$ npm install`
  - Run `$ npm start`
  - View the running app at http://localhost:3000
 
