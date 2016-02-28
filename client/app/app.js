// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'createEvent', 'eventList', 'eventDetails', 'ngRoute', 'auth'

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
  $routeProvider.when('/eventdetails/:eventID', {
    templateUrl: 'app/eventdetails/eventdetails.html',
    controller: 'eventDetailsController'
  })
  $routeProvider.when('/signin',{
    templateUrl: 'app/auth/signin.html',
    controller: 'AuthController'
  });
  $routeProvider.otherwise({redirectTo: '/'});


  //THis was in Fred's code, but we don't have tokens. 
    // // We add our $httpInterceptor into the array
    // // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
}])

.run(['$rootScope', '$location', 'AuthFactory', function($rootScope, $location, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, toState) {
    if(!toState.$$route) {
      $location.path('/')
    }
    if(toState.$$route && toState.$$route.originalPath === '/signin') {
      $location.path('/signin');
    } else if (!AuthFactory.isAuth()) {
      event.preventDefault();
      $location.path('/signin');
    }
  });
}]);