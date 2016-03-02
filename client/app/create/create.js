angular.module('createEvent', [])

.controller('CreateController', ['$scope', 'CreateFactory', '$location', '$cookies', function($scope, CreateFactory, $location, $cookies) {
  

  // $scope.days = CreateFactory.getNextDaysNameAndInfo();
  $scope.event = {};
  $scope.hold = {};
  $scope.data = {};

  $scope.guests = [{}];
  $scope.items = [{}];

  $scope.addGuest = function() {
    $scope.guests.push({});
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


//Update function is invoked in submit button in create.html
  $scope.update = function(event, hold) {
    $scope.data.userID = $cookies.get('userID');
    var guestArray = [];
    for (var i = 0; i < $scope.guests.length; i++) {
      if($scope.guests[i].name && $scope.guests[i].email) {
        guestArray.push($scope.guests[i]);
      }
    }
    var itemArray = [];
    // console.log("ITEMS", hold);
    for (var j=0; j < $scope.items.length; j++) {
      if($scope.items[j] && $scope.items[j].name) {
        itemArray.push($scope.items[j]);
      }
    }

    $scope.data.event = event;
    $scope.data.guests = guestArray;
    $scope.data.items = itemArray;

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
