angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', '$log' ,'eventDetailsFactory','EventFactory', 'storeFactory', function($scope, $log, eventDetailsFactory, EventFactory, storeFactory) {
  //this controller controls the page where the eventDetails will be displayed	
  $scope.details = {};
  $scope.parsed; 
  //we fill in $scope.details with the event stored in 
  //the storeFactory factory and we then show it on the screen:
  var initializeDetails = function() {
    eventDetailsFactory.getEvents(storeFactory.eventId)
      .then(function(details) {
      	
        //add a bringStuff category for each guest
        //which puts in an object what each person 
        //is assigned to bringing. 
        for (var i = 0; i < details.guests.length; i++){
          details.guests[i].bringStuff = {};
        }

        for (var i = 0; i < details.guests.length; i++){
          for (var j = 0; j < details.items.length; j++){
            if (details.guests[i].id === details.items[j].BasketId){
              details.guests[i].bringStuff[details.items[j].name] = details.items[j].name;
            }
          }
        }        
        $scope.details.data = details;
      })
      .catch(function(err) {
      	console.error("eventDetails", err)
      })
  	
  }

  initializeDetails();

}])
.factory('eventDetailsFactory', function(storeFactory, $http) {
  var getEvents = function() {
    return $http({
      method: 'GET',
      url: '/api/eventDetails/' + storeFactory.eventID
    })
    .then(function(resp) {
      return resp.data;
    })
  }
  return {
    getEvents: getEvents
  }
})