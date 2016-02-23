angular.module('eventList', [])
.controller('EventsController', ['$scope', 'EventFactory', '$location','storeFactory', function($scope, EventFactory, $location, storeFactory) {
  $scope.data = {};
  var initializeEvents = function() {
  	EventFactory.getEvents()
  	  .then(function (events) {
  	  	$scope.data.events = events;
  	  })
  	  .catch(function(error) {
  	  	console.error("EventsController", error);
  	  })
  }

  $scope.getEvent = function( event ) {
    storeFactory.event = event;
    $location.path('/eventDetails');
  }

  initializeEvents();

}])
.factory('EventFactory', function($http) {
	var getEvents = function(event) {
		event = event || '';
    return $http({
			method: 'GET',
			url: '/api/events/' + event
		})
		.then(function(resp) {
			return resp.data;
		})
	}
  return {
    getEvents: getEvents
  }
})
.factory('storeFactory', function() {
  var eventId = '';
  return {
    eventId: eventId
  }
})