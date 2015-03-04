
    //this script holds the logic for routing and the factory.

    /* This application contains one Factory called gmFactory which holds all the data and communicates with the server.  The index page does not contain anything of significance except all the includes for external dependancies and the includes for all static javascripts */

    /* This application has partial views for each route.  The partial views each have their own controller.  Controller logic is contained in controllers.js */

    //  inject the ngRoute dependency in the module.
    //var appModule = angular.module('myApp', ['ngRoute', 'highcharts-ng']);
    var appModule = angular.module('myApp', ['ngRoute']);
    
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
        // this local data holds all the glucose readings from the database
        // on start up, the app will ask for the last 30 days by default
        // if the user sets up custom trends, the array will expand to hold all
        // data for all requested data

        var glucose_recs = [];

        // this local data holds all the activity readings for the last 30 days,
        // by default, but will expand to hold all data requested to populate the
        // custom trends page

        var activity_recs = [];

        // this local data holds the user information.
        // for now, it will be populated via a prompt on start-up
        // to-do: populate with info from the database

        var user = {};

        var factory = {};

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

        factory.addCustomer = function (data, callback){
          $http.post('/customers/add', data).success(function(output){
              console.log('factory: successfully added a customer');
              customers.push(output[0]);
              //console.log(customers);
              callback(customers);
            });
        }

        factory.editCustomer = function(customer, callback){
          var new_name = prompt("Please enter the new name");
          var data = ({id: customer._id, name: new_name});
          $http.post('/customers/edit', data).success(function(output) {
              console.log('successfully updated customer name');
              console.log(output);
              console.log(customers.indexOf(customer));
              customers[customers.indexOf(customer)].name = new_name;
              callback(customers);
          })
        }

        factory.removeCustomer = function (customer, callback){
          $http.get('/customers/'+customer._id).success(function(output) {
              console.log(customer);
              customers.splice(customers.indexOf(customer),1);
              console.log(customers);
              callback(customers);
          })
        }

      factory.getOrders = function (callback){
             $http.get('/orders').success(function(output) {
              orders = output;
              callback(orders);
          }) 
      }

      factory.placeOrder = function(order, callback){
            $http.post('/orders/add', order).success(function(output){
              console.log('factory: successfully added an order');
              console.log(output);
              if (output.status == 'error'){
                console.log(output.errors);
                alert('order could not be placed due to missing fields');
                callback(orders);
              }else{
                orders.push(output);
                callback(orders);
              }
            })
      }
      // most important step: return the object so it can be used by the rest of our angular code
       return factory
    });

    