// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned

// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Activity = mongoose.model('ActivityTracker');
var GlucoseLevel = mongoose.model('GlucoseLevel');


module.exports = (function() {
  return {
  	add_activity: function(req, res){
  		console.log('controller: add activity');
  		console.log(req.body);
  		var entry = new Activity(req.body);
		var retVal = entry.save(function(err, result){
			if(err){
				console.log('could not add activity');
				console.log(err);
			}else{
				console.log('successfully added activity');
				console.log(result);
				res.json(result);
			}
		});
  	},

  	add_glucose: function(req, res){
  		console.log('controller: add glucose reading');
  		console.log(req.body);
  		var entry = new GlucoseLevel(req.body);
		var retVal = entry.save(function(err, result){
			if(err){
				console.log('could not add glucose reading to database');
				console.log(err);
			}else{
				console.log('successfully added glucose reading');
				console.log(result);
				res.json(result);
			}
		});
  	},

  	get_user: function(req,res){
  		User.find({email: req.body.email}, function(err, result){
  			if(err){
  				console.log('could not find user');
  				console.log(err);
  				res.json({error: 'could not find user'});
  			}else{
  				console.log('found user');
  				console.log(result);
  				res.json(result);
  			}
  		});
  	},

	show_activity: function(req, res) {
      Activity.find({}, function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		    	//console.log(results);
		      	res.json(results);
		    }
	  })
  	},

    show_glucose: function(req, res) {
      GlucoseLevel.find({}).sort({datetime: 'asc'}).exec(function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		    	//console.log(results);
		      	res.json(results);
		    }
	  });
  	},

  	show_glucose_for_timepan: function(req, res) {
      GlucoseLevel.find({'datetime': {'$gte':req.body.start, '$lt':req.body.end}}).sort({datetime: 'asc'}).exec(function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		    	console.log(results);
		      	res.json(results);
		    }
	  });
  	},

	add_customer: function(req, res){
		var entry = new Customer({name: req.body.name});
		var retVal = entry.save(function(err, result){
			if(err){
				console.log('could not add customer to database');
				console.log(result);
			}else{
				console.log('successfully customer a friend');
				consolelog(result);
				Customer.find({name: req.body.name}, function(err, results) {
				    if(err) {
				      console.log(err);
				    } else {
				    	console.log(results);
				      	res.json(results);
				    }
				});
			}
		});
	},

	edit_customer: function(req, res){
		console.log('got into edit customer');
		console.log(req.body);
		Customer.update({_id:req.body.id}, {name:req.body.name}, function(err, data)
		{
			if(err)
				console.log('could not edit ' + req.params.id);
			else{
				console.log('successfully updated friend;');
				res.json({success: 'true'});
			}
		})

	},

	delete_customer: function(req, res){
		Customer.remove({_id:req.params.id}, function(err, data)
		{
			if(err)
				console.log('could not remove ' + req.params.id);
			else{
				console.log('successfully removed friend;');
				res.json({success: 'true'});
			}
		})

	},

	show_orders: function(req, res) {
      Order.find({}, function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		    	//console.log(results);
		      	res.json(results);
		    }
	  })
  	},

  	add_order: function(req, res){
  		var date = new Date();
  		console.log(date.toISOString());
		var entry = new Order({customer: req.body.customer, product: req.body.product, quantity: req.body.quantity});
		var resVar = entry.save(function(err, result){
			if(err){
				console.log('could not add order to database');
				console.log(err.errors);
				data = ({status: 'error', errors: err.errors})
				res.json(data);
			}else{
				console.log('successfully added an order');
				console.log(result);
				res.json(result);
			}
		});
	},


  }  //end of wrapper to export all functions
})();