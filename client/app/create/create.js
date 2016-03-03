angular.module('createEvent', [])

.controller('CreateController', ['$scope', 'CreateFactory', 'requestFactory' ,'$location', '$cookies', function($scope, CreateFactory, requestFactory ,$location, $cookies) {
  
  // $scope.days = CreateFactory.getNextDaysNameAndInfo();
  $scope.event = {};
  $scope.hold = {};
  $scope.data = {};

  $scope.items = [{}];
  $scope.myFriends = [];


  $scope.init = function(){
    //create an empty event
    CreateFactory.addEvent({
      name: 'Event',
      description: 'Event description',
      location: 'Event location',
      total: 9999
    });
  }
  $scope.init();

  $scope.loadFriends = function() {
    FB.api('/me/friends', function(response) {
      $scope.$apply(function() {
        $scope.myFriends = response.data;
      });
    });
  };

  $scope.addGuest = function (guest) {
    CreateFactory.addGuest(guest);
    $scope.guests = CreateFactory.getGuests();
  };

  $scope.removeGuest = function(guest) {
    $scope.guests.splice(guest, 1);
  };

  $scope.addItem = function($event) {
    console.log($event);
    if($event && $event.which === 13){
      $scope.items.push({});
    }
  };

  $scope.removeItem = function(item) {
    $scope.items.splice(item, 1);
  };

  $scope.select = function($event, day){
    console.dir($event.target.innerHTML);
    console.log(day);
  };

  $scope.getCurrent = function(){
    console.log(CreateFactory.getCurrentEvent());
  };

//Update function is invoked in submit button in create.html
  $scope.update = function(event, hold) {
    $scope.data.userID = $cookies.get('userID');
    
    //TODO make api call to add guests to User_Event table
    console.log('CALLING ADDGUESTS');
    var currentEvent = CreateFactory.getCurrentEvent();
    requestFactory.addGuests(CreateFactory.getGuests(), currentEvent.id);

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
    $scope.guests = [{}];
    $scope.items = [{}];
    $scope.data = {};
  };

  $scope.reset();
}]);
// .factory('CreateFactory', function($http, $cookies) {
//   //send a post request to server
//   var getNextDaysArray = function(){
//     var today = Date.now();
//     var result = [];
//     result.push()
//     return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//   }

//   var getHours = function(){
//     return ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
//   }

//   var getNextDaysNameAndInfo = function(){
//     var days = getNextDaysArray();
//     var res = [];
//     for(var i=0;i<days.length; i++){
//       var day = {};
//       day.dayName = days[i];
//       day.hours = getHours();
//       res.push(day);
//     }
//     return res;
//   }

//   var addEvent = function(event) {
//     return $http({
//       method: 'POST',
//       url: '/api/events',
//       data: event
//     });
//   }
//   return{
//     addEvent: addEvent,
//     getNextDaysNameAndInfo: getNextDaysNameAndInfo
//   };
// });
