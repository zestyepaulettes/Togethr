// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'createEvent', 'eventList', 'eventDetails', 'ngRoute'

])
.config(['$routeProvider', '$httpProvider',function($routeProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: '/app/create/create.html',
    controller: 'CreateController'
  });
  $routeProvider.when('/events', {
    templateUrl: 'app/events/events.html',
    controller: 'EventsController'
  });
  $routeProvider.when('/eventdetails', {
    templateUrl: 'app/eventdetails/eventdetails.html',
    controller: 'eventDetailsController'
  });
  $routeProvider.when('/signin',{
    templateUrl: 'app/auth/signin.html',
    controller: 'auth.js'
  });
  $routeProvider.when('/signout',{
    templateUrl: 'app/auth/signout.html',
    //WARNING: THIS HAS THE SAME CONTROLLER AS Signin
    controller: 'auth.js'
  });  
  $routeProvider.otherwise({redirectTo: '/'});


  //THis was in Fred's code, but we don't have tokens. 
    // // We add our $httpInterceptor into the array
    // // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');


}]);