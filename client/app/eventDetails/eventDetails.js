angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', 'eventDetailsFactory','EventFactory', 'storeFactory', function($scope, eventDetailsFactory, EventFactory, storeFactory) {
  //this controller controls the page where the eventDetails will be displayed	
  $scope.details = storeFactory.eventId;

  //we fill in $scope.details with the event stored in 
  //the storeFactory factory and we then show it on the screen:
  var initializeDetails = function() {
    EventFactory.getEvents(storeFactory.eventId)
      .then(function(details) {
      	$scope.details = details;
      })
      .catch(function(err) {
      	console.error("eventDetails", err)
      })
  	
  }

}])
.factory('eventDetailsFactory', function() {
  return {

  };
})