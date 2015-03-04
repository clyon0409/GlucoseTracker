// This is the friend.js file located at /server/models/friend.js
// We want to create a file that has the schema for our friends and creates a model that we can then call upon in our controller
var mongoose = require('mongoose');

// create our friendSchema
var GlucoseLevelsSchema = new mongoose.Schema({
  user_id: String,
  datetime: {type : Date, required: true},
  meal_type: {type: String, required:true}, 
  level: {type: Number, required: true}
});
// use the schema to create the model
mongoose.model('GlucoseLevel', GlucoseLevelsSchema);
console.log('created Glucose Level model');
// notice that we aren't exporting anything -- this is because this file will be run when we require it using our config file and then since the model is defined we'll be able to access it from our controller
