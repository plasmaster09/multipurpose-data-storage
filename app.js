//set up the server
const express = require( "express" );
const app = express();
const port = 3000;
const logger = require("morgan");

app.use(logger("dev"));

// define middleware that serves static resources in the public directory
app.use(express.static(__dirname + '/public'));

// define a route for the default home page
app.get( "/", ( req, res ) => {
    res.sendFile( __dirname + "/views/index.html" );
} );

// define a route for the assignment list page
app.get( "/data", ( req, res ) => {
    res.sendFile( __dirname + "/views/data.html" );
} );

// define a route for the assignment list page
app.get( "/categories", ( req, res ) => {
    res.sendFile( __dirname + "/views/categories.html" );
} );

// define a route for the assignment detail page
app.get( "/data/detail", ( req, res ) => {
    res.sendFile( __dirname + "/views/detail.html" );
} );

// define a route for the assignment detail page
app.get( "/categories/editor", ( req, res ) => {
    res.sendFile( __dirname + "/views/editor.html" );
} );

// start the server
app.listen( port, () => {
    console.log(`App server listening on ${ port }. (Go to http://localhost:${ port })` );
} );