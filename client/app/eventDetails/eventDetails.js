angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', '$http', '$filter', '$log' ,'eventDetailsFactory','EventFactory', '$cookies', '$routeParams', function($scope, $http, $filter, $log, eventDetailsFactory, EventFactory, $cookies, $routeParams) {	
  $scope.newItem;
  $scope.newGuest; 
  $scope.newEmail; 
  $scope.models = {
    selected: null,
    guests: {}
  };
  var guests =  $scope.models.guests;

  var initializeDetails = function() {
    eventDetailsFactory.getEvents($routeParams.eventID)
      .then(function(details) {
      	
        var temp = {};

        // Assign items to 
        for (var j = 0; j < details.items.length; j++) {
          var GuestId = details.items[j].GuestId;
          var item = details.items[j];
          if (temp[GuestId]) {
            temp[GuestId].push(item);
          } else {
            temp[GuestId] = [item];
          }
        }        

        for (var i = 0; i < details.guests.length; i++){
          var guestName = details.guests[i].name;
          var guestId = details.guests[i].id;
          guests[guestName + ' ' + guestId] = temp[guestId] ? temp[guestId] : [];
        }
      })
  }

  $scope.reassignItem = function(item, guestInfo) {
    var guestId = $scope.getId(guestInfo);

    $http({
      method: 'PUT',
      url: '/api/items/' + item.id,
      data: {GuestId: guestId}
    })
    .then(function() {
      console.log("UPDATED DB");
    })
    return item;
  }

  $scope.getId = function(guestInfo) {
    var name = guestInfo.match(/([^\s])+/g);
    return name[1];
  }

  $scope.getName = function(guestInfo) {
    var name = guestInfo.match(/([^\s])+/);
    return name[0];
  }

  $scope.email = function() {
    var eventID = $cookies.get("eventID")
    return $http({
      method: 'GET',
      url: '/api/email/' + eventID
    });
  }

  //resets the forms:  
  $scope.resetGuest = function() {
    $scope.newGuest = "";
    $scope.newEmail = "";
  };

  $scope.resetItem = function() {
    $scope.newItem = "";
  };

  //this function is for the addd Item form 
  $scope.addItemFunc = function(newItem){
    //console.log("newItem", newItem);
    var toPost = {
      EventId: $cookies.get('eventID'),
      name: newItem //this is coming from ng-model
    };
    return $http({
      method: 'POST',
      url: '/api/items',
      data: toPost
    }).then(function(){
        $scope.resetItem();
    });

  };

  //this function is for the add Guest form 
  $scope.addGuestFunc = function(newGuest, newEmail){
    console.log("newGuest", newGuest);
    var toPost = {
      EventId: $cookies.get('eventID'),
      name: newGuest, //this is coming from ng-model
      email: newEmail
    };
    return $http({
      method: 'POST',
      url: '/api/guests',
      data: toPost
    }).then(function(){

        $scope.resetGuest(); 
    });

  };
  initializeDetails();
  setInterval(initializeDetails, 5000)
}])
.factory('eventDetailsFactory', function($http, $cookies) {
  var getEvents = function(eventID) {
    return $http({
      method: 'GET',
      url: '/api/eventDetails/' + eventID
    })
    .then(function(resp) {
      return resp.data;
    })
  };

  return {
    getEvents: getEvents,
  }
})