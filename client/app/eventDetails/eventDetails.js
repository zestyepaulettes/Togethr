angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', 'eventDetailsFactory','EventFactory', 'storeFactory', function($scope, eventDetailsFactory, EventFactory, storeFactory) {
  //this controller controls the page where the eventDetails will be displayed	
  $scope.details = {};
  //we fill in $scope.details with the event stored in 
  //the storeFactory factory and we then show it on the screen:
  var initializeDetails = function() {
    eventDetailsFactory.getEvents(storeFactory.eventId)
      .then(function(details) {
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