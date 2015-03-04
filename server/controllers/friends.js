// this is our friends.js file located at /server/controllers/friends.js
// note the immediate function and the object that is returned

// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');

module.exports = (function() {
  return {
    show_customers: function(req, res) {
      Customer.find({}, function(err, results) {
		    if(err) {
		      console.log(err);
		    } else {
		    	console.log(results);
		      	res.json(results);
		    }
	  })
  	},

	add: function(req, res){
		var entry = new Friend({name: req.body.name, age: req.body.age});
		var result = entry.save(function(err){
			if(err){
				console.log('could not add friend to database');
			}else{
				console.log('successfully added a friend')
			}
		});
	},

	delete: function(req, res){
		Friend.remove({_id:req.params.id}, function(err, data)
		{
			if(err)
				console.log('could not remove ' + req.params.id);
			else
				console.log('successfully removed friend;')
		})

	}

  }  //end of wrapper to export all functions
})();