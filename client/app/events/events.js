angular.module('eventList', [])
.controller('EventsController', ['$scope', 'EventFactory', '$location','storeFactory','$cookies', function($scope, EventFactory, $location, storeFactory, $cookies) {
  //this is where we will store our data after our initializeEvents
  //api request, $scope.data: 
  $scope.data = { };
  //this requests the data and puts it into $scope.data
  var initializeEvents = function() {
  	EventFactory.getEvents()
  	  .then(function (events) {
  	  	$scope.data.events = events;
  	  })
  	  .catch(function(error) {
  	  	console.error("EventsController", error);
  	  })
  }

  //after all the data is displayed: when the user clicks on a specific
  //event this function is fired:
  $scope.getEvent = function( event ) {
    console.log("EVENT", event);
    storeFactory.eventID = event.id;
    $location.path('/eventdetails');
  }

  //when the page is requested by the user, the initialize
  //function automatically runs:
  //*@*@*@*WARNING NEED TO COMMENT THIS LINE AFTER DATABASE FUNCTIONS
  initializeEvents();

}])
.factory('EventFactory', function($http, $cookies) {
	var getEvents = function() {
    return $http({
			method: 'GET',
			url: '/api/events/' + $cookies.get('userID')
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
  var eventID = '';
  return {
    eventId: eventID
  }
})