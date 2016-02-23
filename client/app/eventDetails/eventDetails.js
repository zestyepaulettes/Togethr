angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', 'eventDetailsFactory','EventFactory', 'storeFactory', function($scope, eventDetailsFactory, EventFactory, storeFactory) {
  $scope.details = {};
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
	
})