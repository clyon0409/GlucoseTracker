
    //this script holds the logic for routing and the factory.

    /* This application contains one Factory called gmFactory which holds all the data and communicates with the server.  The index page does not contain anything of significance except all the includes for external dependancies and the includes for all static javascripts */

    /* This application has partial views for each route.  The partial views each have their own controller.  Controller logic is contained in controllers.js */

    //  inject the ngRoute dependency in the module.
    //var appModule = angular.module('myApp', ['ngRoute', 'highcharts-ng']);
    var appModule = angular.module('myApp', ['ngRoute', 'ngDialog', 'highcharts-ng']);
    
    //  use the config method to set up routing:
    appModule.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: 'partials/dashboard.html'
        })
        .when('/data',{
            templateUrl: 'partials/data_summary.html'
        })
        .when('/trends',{
            templateUrl: 'partials/trend_charts.html'
        })
        .otherwise({
          redirectTo: '/'
        });
    });

    // add a factory to the module
    appModule.factory('gmFactory', function ($http){

        var factory = {};
        // this local data holds all the glucose readings from the database
        // on start up, the app will ask for the last 30 days by default

        var glucose_recs = [];

        // this local data holds all the glucose readings from the database
        // for a user specified time span.  It will be initialized to the same
        // time span as dashboard data,but can be changed on the trends page

        var glucose_trends = glucose_recs;

        // this local data holds all the activity readings for the last 30 days,
        // by default, but will expand to hold all data requested to populate the
        // custom trends page

        var activity_recs = [];

        // this local data holds the user information.
        // for now, it will be populated via a prompt on start-up
        // to-do: populate with info from the database

        // the variables below are used to pass data between the data controller and the 
        // controller for the modal dialogs

        var edit_glucose = {};
        var edit_activity = {};
        var user = {};



        console.log('got into factory');

        factory.addActivity = function(data){
          console.log('factory: got into add factory');
          console.log(data);

          entry = ({user_id:user._id, datetime: data.date, activity: data.activity, duration: Math.floor(data.duration), intensity: data.intensity});

          $http.post('/add_activity', entry).success(function(output){
              if(output.error == 'could not add activity'){
                alert('could not add activity data');
              }else{
                console.log('factory: successfully added activity');
                //console.log(output);
                activity_recs.push(output);
              }
            });
        }

        factory.addGlucose = function(data, callback){
          console.log('factory: got into add glucose');
          console.log(data);
          var entry = ({user_id:user._id, datetime: data.datetime, meal_type: data.meal_type, level: data.level});
          $http.post('/add_glucose', entry).success(function(output){
              if(output.error == 'could not add glucose record'){
                alert('could not add glucose data');
              }else{
                console.log('factory: successfully added glucose');
                //console.log(output);
                glucose_recs.push(output);
                callback(glucose_recs);
              }
            });
        }

        factory.getUser = function (callback){
          callback(user);
        }

        factory.loginUser = function (callback){
          var user_email = prompt('Please enter your e-mail address', 'cecilia_lyon@sbcglobal.net');
          data = ({email: user_email});
           $http.post('/user', data).success(function(output){
              if(output.error == 'could not find user'){
                alert('user not in database');
              }else{
                console.log('factory: successfully found user');
                //console.log(output);
                user = output[0];
                callback(user);
              }
            });
        }

        factory.getGlucoseData = function(callback){
          //console.log('factory: time to read data from the database');
          $http.get('/glucose').success(function(output) {
              console.log('successfully got glucose data')
              console.log(output);
              glucose_recs = output;
              callback(glucose_recs);
          })
        }

        factory.getGlucoseForSpan = function(span, callback){
              $http.post('/get_trend_data', span).success(function(output){
                if(output.error == 'factory: could get glucose data for specified time span'){
                  alert('could not find glucose data');
                }else{
                  console.log('factory: got glucose data for time span');
                  //console.log(output);
                  glucose_trends = output;
                  callback(glucose_trends);
                }
              });
        }

        factory.getEditGlucoseData = function(callback){
              console.log('factory: edit_glucose = ');
              console.log(edit_glucose);
              callback(edit_glucose);
        }
        


        factory.getActivityData = function(callback){
          //console.log('factory: time to read data from the database');
          $http.get('/activity').success(function(output) {
              console.log('successfully got activity data')
              console.log(output);
              activity_recs = output;
              callback(activity_recs);
          })
        }


        factory.getQuantities = function (callback){
              callback(quantity);
        }

        factory.saveGlucoseEditData = function (data, callback){
            console.log('factory: got into save edit glucose data');
            edit_glucose = data;
            callback(edit_glucose);
        }

        factory.updateGlucose = function(rec){
            console.log('factoryL got into updateGlucose, data to update: ')
            console.log(rec);
        }
        

        factory.removeCustomer = function (customer, callback){
          $http.get('/customers/'+customer._id).success(function(output) {
              console.log(customer);
              customers.splice(customers.indexOf(customer),1);
              console.log(customers);
              callback(customers);
          })
        }

      // most important step: return the object so it can be used by the rest of our angular code
       return factory
    });

    