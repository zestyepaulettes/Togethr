angular.module('auth', ['ngCookies'])

.controller('AuthController', function($scope, $window, $location, $cookies, AuthFactory) {
  $scope.user = {};
  $scope.name = $cookies.get('displayName').split(' ')[0];

  $scope.logout = function() {
    AuthFactory.signout();
  };
});

