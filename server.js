// require express so that we can build an express app
var express = require('express');
// create the express application
var app = express();
// require path so that we can use path stuff like path.join
var path = require('path');
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));

// allows you to use post data in the form of req.body
var bodyParser = require('body-parser');
// set up bodyParser 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// This goes in our server.js file so that we actually use the mongoose config file!
require('./config/mongoose.js');

// this line requires and runs the code from our routes.js file and passes it app so that we can attach our routing rules to our express application!
require('./config/routes.js')(app);


app.listen(8000, function() {
  console.log('cool stuff on: 8000');
})