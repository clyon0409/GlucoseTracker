// This is our routes.js file located in /config/routes.js
  // This is where we will define all of our routing rules!

// First at the top of your routes.js file you'll have to require the controller
var transactions = require('./../server/controllers/transactions.js'); 

 // We will have to require this in the server.js file (and pass it app!)
module.exports = function(app) {

	app.get('/activity', function(req, res){
		console.log('routes: get activity data');
		transactions.show_activity(req, res);
	}),

	app.post('/user', function(req, res) {
		console.log('got into user route');
	  	transactions.get_user(req, res);
	}),

	app.post('/add_glucose', function(req, res){
		console.log('routes: got post to add glucose reading');
		console.log(req.body);
		transactions.add_glucose(req, res);
	}),

	app.post('/add_activity', function(req, res){
		console.log('routes: got post to add activity');
		console.log(req.body);
		transactions.add_activity(req, res);
	}),

	app.get('/glucose', function(req, res){
		console.log('routes: get glucose data');
		transactions.show_glucose(req, res);
	}),

	app.post('/customers/edit', function(req, res){
		console.log('routes: got get to edit customer');
		console.log(req.body);
		transactions.edit_customer(req, res);
	}),

	app.get('/orders', function(req, res) {
		console.log('got into orders route');
	  	transactions.show_orders(req, res);
	}),

	app.post('/orders/add', function(req, res){
		console.log('routes: got post to add order');
		console.log(req.body);
		transactions.add_order(req, res);
	})
}