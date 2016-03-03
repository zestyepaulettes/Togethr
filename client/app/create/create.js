angular.module('createEvent', [])

.controller('CreateController', ['$scope', 'CreateFactory', 'requestFactory' ,'$location', '$cookies', function($scope, CreateFactory, requestFactory ,$location, $cookies) {

  // $scope.days = CreateFactory.getNextDaysNameAndInfo();
  $scope.event = {};
  $scope.hold = {};
  $scope.data = {};

  $scope.items = [];
  $scope.myFriends = [];
  $scope.total= 0;

  $scope.loadFriends = function() {
    FB.api('/me/friends', function(response) {
      $scope.$apply(function() {
        //GET images
        var facebookIDs = [];
        console.log(response);
        for(var i=0;i<response.data.length;i++){
          facebookIDs.push(response.data[i].id);
        }
        requestFactory.getFriends(facebookIDs)
        .then(function(response){
          console.log(response);
          $scope.myFriends = response.data;
        }).catch(function(error){
          console.error(error);
        });
      });
    });
  };

  $scope.init = function(){
    //create an empty event
    CreateFactory.addEvent({
      name: 'Event',
      description: 'Event description',
      location: 'Event location',
      total: 9999
    });
<<<<<<< HEAD
=======

    //renders map
    var geocoder, map;
      geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          'address':'Los Angeles, CA'
         }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var myOptions = {
                zoom: 12,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
            map = new google.maps.Map(document.getElementById("map"), myOptions);
            var infowindow = new google.maps.InfoWindow();
            }
          });
  };
  $scope.init();
  $scope.$watch('event.location', function() {
     $scope.mapIt();
  });
  $scope.mapIt = function() {
    var geocoder, map;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': $scope.event.location }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var myOptions = {
          zoom: 12,
          center: results[0].geometry.location,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          animation: google.maps.Animation.DROP
        });
      }
    });
  };
>>>>>>> implement google maps for event location

    //renders map
    var geocoder, map;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address':'Los Angeles, CA'}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var myOptions = {
          zoom: 12,
          center: results[0].geometry.location,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        var infowindow = new google.maps.InfoWindow();
      }
    });
  };
  $scope.init();
  //this watches for anything typed to location to map it live
  $scope.$watch('event.location', function() {
     $scope.mapIt();
  });
  //watches the event name being typed to load fb friends
  $scope.$watch('event.name', function() {
    $scope.loadFriends();
  });
  $scope.mapIt = function() {
    var geocoder, map;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': $scope.event.location }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var myOptions = {
          zoom: 12,
          center: results[0].geometry.location,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), myOptions);
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          animation: google.maps.Animation.DROP
        });
      }
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
    if($event.which === 13) {
      // $scope.items.push($scope.item);
      CreateFactory.addItem($scope.item);
      $scope.items = CreateFactory.getItems();
      $scope.item = '';
    }
  };

  $scope.removeItem = function(item) {
    for(var i = 0; i < $scope.items.length; i++) {
      if($scope.items[i] === item) {
        $scope.items.splice(i, 1);
      }
    }
  };

  $scope.select = function($event, day){
    console.dir($event.target.innerHTML);
  };

  $scope.getCurrent = function(){
    console.log(CreateFactory.getCurrentEvent());
  };

//Update function is invoked in submit button in create.html
  $scope.update = function(event, hold) {
    $scope.data.userID = $cookies.get('userID');

    //TODO make api call to add guests to User_Event table
    var currentEvent = CreateFactory.getCurrentEvent();
    requestFactory.addGuests(CreateFactory.getGuests(), currentEvent.id);
    requestFactory.addItem(CreateFactory.getItems(), currentEvent.id, $scope.data.userID);

    var eventData = {
      name: $scope.event.name,
      description: $scope.event.description,
      date: Date.now(),
      location: $scope.event.location,
      hostId: $scope.data.userID,
      total: $scope.total
    };
    console.log(currentEvent.id);
    requestFactory.updateEvent(eventData, currentEvent.id).then(function() {
      $location.path('/eventDetails/' + currentEvent.id);
    });
  };
  // clears out the form
  $scope.reset = function() {
    $scope.event = {};
    $scope.hold = {};
    $scope.guests = [{}];
    $scope.items = [];
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
