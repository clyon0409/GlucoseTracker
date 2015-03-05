 /* this script contains the logic for all the controllers used by the partial views */   

    appModule.controller('dashboardController', function($scope, gmFactory){

      $scope.user;
      $scope.glucose_recs=[];
      $scope.new_activity={};
      $scope.new_glucose={};

      //console.log('got into dashboard controller');
      
      gmFactory.getUser(function(data){
        $scope.user = data;
      })

      gmFactory.loginUser(function(data){
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

//appModule.controller('dataController', function($scope, gmFactory, ngDialog){
appModule.controller('dataController', function($scope, gmFactory){

    $scope.user;
    $scope.glucose_recs=[];
    $scope.activity_recs=[];
    $scope.edit_activity={};
    $scope.edit_glucose={};
    $scope.gl_index;
    //$scope.edit_glucose={};

    gmFactory.getUser(function(data){
      $scope.user = data;
      console.log('data controller: got glucose data');
    })

    gmFactory.getGlucoseData(function(data){
      $scope.glucose_recs = data;
      console.log('data controller: got activity data');
    })

     gmFactory.getActivityData(function(data){
      $scope.activity_recs = data;
    })

     gmFactory.getEditGlucoseData(function(data){
        $scope.edit_glucose = data;
     })

     $scope.editGlucose = function(data){
        console.log('data controller: got into edit glucose');
        
        gmFactory.saveGlucoseEditData(data, function(f_data){
          $scope.edit_glucose = f_data;
          console.log('data controller: edit_glucose = ');
          console.log($scope.edit_glucose);
        });

        //ngDialog.open({template: 'partials/modals/edit_glucose.html'});
     }

     $scope.resetUpdateGlucose = function(){
        console.log('data controller: got reset click from edit glucose');
         gmFactory.getEditGlucoseData(function(data){
            console.log(data);
            $scope.edit_glucose = data;
            console.log($scope.edit_glucose);
          });
         console.log('data controller: returned from factory');

     }

     $scope.updateGlucose = function(rec){
        console.log('data controller: got into update glucose data');
        gmFactory.updateGlucose(rec);
        //ngDialog.close();
     }

})

 appModule.controller('trendsController', function($scope, gmFactory){

    $scope.user;
    $scope.glucose_recs=[];
    $scope.activity_recs=[];
    $scope.series_data=[];

    gmFactory.getUser(function(data){
      $scope.user = data;
      console.log('trends controller: got user data');
    })

    gmFactory.getGlucoseData(function(data){
      $scope.glucose_recs = data;
      console.log('trends controller: got glucose data');
      console.log($scope.glucose_recs[0].datetime);

      for (index in $scope.glucose_recs){
          $scope.series_data.push([$scope.glucose_recs[index].datetime,$scope.glucose_recs[index].level]);
      }

      $scope.chartSeries = [{"name":"all readings", 'data': $scope.series_data}];

      $scope.chartConfig = {
          options: {
            chart: {
              type: 'line'
            }
          },
          series:$scope.chartSeries,
          title:{
              text: 'Glucose Levels Over Specified Time'
          },

          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                month: '%m. %e',
                year: '%y',
                time: '%k:%M'
            }
          },

          loading: false
      }

    })
    
     gmFactory.getActivityData(function(data){
      $scope.activity_recs = data;
    })

     $scope.updateChart = function(){

        $scope.glucose_recs=[];
        $scope.series_data=[];

        gmFactory.getGlucoseForSpan($scope.span,function(data){
            $scope.glucose_recs = data;
            console.log('trends controller: got data for time span');
            console.log($scope.glucose_recs);
      

            for (index in $scope.glucose_recs){
                $scope.series_data.push([$scope.glucose_recs[index].datetime,$scope.glucose_recs[index].level]);
            }

            console.log('trends controller: reinit series data');
            console.log($scope.series_data);

            $scope.chartSeries = [{"name":"all readings", 'data': $scope.series_data}];

            $scope.chartConfig = {
                options: {
                  chart: {
                    type: 'line'
                  }
                },
                series:$scope.chartSeries,
                title:{
                    text: 'Glucose Levels Over Specified Time'
                },

                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                      month: '%m. %e',
                      year: '%y',
                      time: '%k:%M'
                  }
                },

                loading: false
            }
            })
       }
})