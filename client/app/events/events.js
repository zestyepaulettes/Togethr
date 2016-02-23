angular.module('eventList', [])
.controller('EventsController', ['$scope', 'EventFactory', '$location','storeFactory', function($scope, EventFactory, $location, storeFactory) {
  //this is where we will store our data after our initializeEvents
  //api request, $scope.data: 
  $scope.data = {
    events: [{ID:1, name: "first Event", date: "02-22-2016", location: "SF"},
             {ID:2, name: "second Event", date: "02-10-2016", location: "downtown"},
             {ID:3, name: "third Event", date: "12-12-2016", location: "west portal"},
             {ID:4, name: "forth Event", date: "22-12-2016", location: "sunset"}
    ]
  };
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
    storeFactory.eventId = event;
    $location.path('/eventdetails');
  }

  //when the page is requested by the user, the initialize
  //function automatically runs:
  //*@*@*@*WARNING NEED TO COMMENT THIS LINE AFTER DATABASE FUNCTIONS
  //initializeEvents();

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