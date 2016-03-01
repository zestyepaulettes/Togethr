angular.module('auth', ['ngCookies'])

.controller('AuthController', function($scope, $window, $location, $cookies, AuthFactory) {
  $scope.user = {};

  $scope.logout = function() {
    AuthFactory.signout();
  }
});

