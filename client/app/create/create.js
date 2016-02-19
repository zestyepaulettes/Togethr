angular.module('createEvent', [])
.controller('CreateController', ['$scope', 'Create', function($scope, Create) {
  $scope.master = {};
  $scope.event = {
    date: new Data(2016, 02, 24)
  };

  $scope.update = function(event) {
    $scope.master = angular.copy(event);
    Create.addEvent($scope.master)
    .then(function () {
      $location.path('/events');
    })
  };

  $scope.reset = function() {
    $scope.event = angular.copy($scope.master);
  };

  $scope.reset();
}])
.factory('Create', function() {
  
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
