angular.module('Services', [])

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
});