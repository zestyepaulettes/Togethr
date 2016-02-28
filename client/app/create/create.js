angular.module('createEvent', [])

.controller('CreateController', ['$scope', 'CreateFactory', '$location', '$cookies', function($scope, CreateFactory, $location, $cookies) {
  
  $scope.event = {};
  $scope.hold = {};
  $scope.data = {};

//Update function is invoked in submit button in create.html
  $scope.update = function(event, hold) {
    $scope.data.userID = $cookies.get('userID');
    var guestArray = [];
    for (var i = 0; i < hold.guests.length; i++) {
      guestArray.push({
        name: hold.guests[i]
      })
    }
    var itemArray = [];
    console.log("ITEMS", hold);
    for (var j=0; j < hold.items.length; j++) {
      itemArray.push({
        name: hold.items[j]
      })
    }


    $scope.data.event = event;
    $scope.data.guests = guestArray;
    $scope.data.items = itemArray;

    // $scope.master = angular.copy(event);
    CreateFactory.addEvent($scope.data)
    .then(function () {
      $location.path('/events');
    })
  };
  // clears out the form
  $scope.reset = function() {
    $scope.event = {};
    $scope.hold = {};
    $scope.data = {};
  };

  $scope.reset();
}])
.factory('CreateFactory', function($http, $cookies) {
  //send a post request to server

  var addEvent = function(event) {
    console.log("EVENT", event);
    return $http({
      method: 'POST',
      url: '/api/events',
      data: event
    });
  }
  return{
    addEvent: addEvent
  };
})
