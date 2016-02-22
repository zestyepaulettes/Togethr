angular.module('eventList', [])
.controller('EventsController', ['$scope', 'EventFactory', '$location' function($scope, EventFactory, $location) {
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
  	$location.path('/eventDetails');
  }

  initializeEvents();

}])
.factory('EventFactory', function() {
	var getEvents = function() {
		return $http({
			method: 'GET',
			url: '/api/events'
		})
		.then(function(resp) {
			return resp.data;
		})
	}
})