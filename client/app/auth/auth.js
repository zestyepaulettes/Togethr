angular.module('auth', ['ngCookies'])

.controller('AuthController', function($scope, $window, $location, $cookies, AuthFactory) {
  $scope.user = {};
  var name = $cookies.get('displayName');
  if(name){
    $scope.name = 'Hi, ' + name.split(' ')[0];
  } else {
    $scope.name = 'Togethr';
  }
  $scope.logout = function() {
    $scope.name = 'Togethr';
    AuthFactory.signout();
  };
});

