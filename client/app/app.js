// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',

]).
config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: 'create/create.html',
    controller: 'create'
  });
  $routeProvider.when('/events', {
    templateUrl: 'events/events.html',
    controller: 'events'
  });
  $routeProvider.when('/eventdetails', {
    templateUrl: 'eventdetails/eventdetails.html',
    controller: 'eventdetails'
  });
  $routeProvider.when('/signin',{
    templateUrl: 'auth/signin.html',
    controller: 'auth.js'
  });
  $routeProvider.when('/signout',{
    templateUrl: 'auth/signout.html',
    //WARNING: THIS HAS THE SAME CONTROLLER AS Signin
    controller: 'auth.js'
  });  
  $routeProvider.otherwise({redirectTo: '/'});


  //THis was in Fred's code, but we don't have tokens. 
    // // We add our $httpInterceptor into the array
    // // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');


}]);