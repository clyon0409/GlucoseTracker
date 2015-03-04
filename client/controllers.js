 /* this script contains the logic for all the controllers used by the partial views */   

    appModule.controller('dashboardController', function($scope, gmFactory){

      $scope.user;
      $scope.glucose_recs=[];
      $scope.new_activity={};
      $scope.new_glucose={};

      console.log('got into dashboard controller');
      
      gmFactory.getUser(function(data){
        $scope.user = data;
      })

      gmFactory.getGlucoseData(function(data){
        console.log('dashboard controller: get the glucose data');
        $scope.glucose_recs = data;
      })

      $scope.addActivity = function(){
        gmFactory.addActivity($scope.new_activity);
      }

      $scope.addGlucose = function (){
          $scope.new_glucose.datetime = new Date($scope.new_glucose.date.getFullYear(), $scope.new_glucose.date.getMonth(), $scope.new_glucose.date.getDate(), $scope.new_glucose.time.getHours(), $scope.new_glucose.time.getMinutes(),  $scope.new_glucose.time.getSeconds());
        
          gmFactory.addGlucose($scope.new_glucose, function(data){
            $scope.glucose_recs = data;
          });
      }

      $scope.resetActivity = function(){
          $scope.new_activity={};
      }

      $scope.resetGlucose = function(){
            //this method resets all data in glucose entry form
            $scope.new_glucose={};
      }

      $scope.removeCustomer = function(customer){
            companyFactory.removeCustomer(customer, function(data){
            $scope.customers =  data;
          })
      }
    })
