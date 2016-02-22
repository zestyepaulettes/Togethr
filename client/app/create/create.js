angular.module('createEvent', [])

.controller('CreateController', ['$scope', 'CreateFactory', '$location', function($scope, CreateFactory, $location) {
  $scope.master = {};
  $scope.event = {
    date: new Date(2016, 02, 24)
  };

//Update function is invoked in submit button in create.html
  $scope.update = function(event) {
    $scope.master = angular.copy(event);
    CreateFactory.addEvent($scope.master)
    // .then(function () {
    //   $location.path('/events');
    // })
  };
  // clears out the form
  $scope.reset = function() {
    $scope.event = angular.copy($scope.master);
  };

  $scope.reset();
}])
.factory('CreateFactory', function($http) {
  //send a post request to server

  var addEvent = function(event) {
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
