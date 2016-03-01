angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', '$http', '$filter', '$log' ,'eventDetailsFactory','EventFactory', '$cookies', '$routeParams', function($scope, $http, $filter, $log, eventDetailsFactory, EventFactory, $cookies, $routeParams) {
  //this controller controls the page where the eventDetails will be displayed	
  $scope.models = {
    selected: null,
    guests: {}
  };
  var guests =  $scope.models.guests;
  //we fill in $scope.details with the event stored in 
  //the storeFactory factory and we then show it on the screen:
  var initializeDetails = function() {
    eventDetailsFactory.getEvents($routeParams.eventID)
      .then(function(details) {
      	
        var temp = {};

        for (var j = 0; j < details.items.length; j++) {
          var GuestId = details.items[j].GuestId;
          var item = details.items[j];
          if (temp[GuestId]) {
            temp[GuestId].push(item);
          } else {
            temp[GuestId] = [item];
          }
        }        

        //add a bringStuff category for each guest
        //which puts in an object what each person 
        //is assigned to bringing. 

        for (var i = 0; i < details.guests.length; i++){
          var guestName = details.guests[i].name;
          var guestId = details.guests[i].id;
          guests[guestName + ' ' + guestId] = temp[guestId] ? temp[guestId] : [];
        }

      //   for (var i = 0; i < details.guests.length; i++){
      //     for (var j = 0; j < details.items.length; j++){
      //       if (details.guests[i].id === details.items[j].BasketId){
      //         details.guests[i].bringStuff[details.items[j].name] = details.items[j].name;
      //         details.guests[i].bringStuffString += details.items[j].name + "," + " ";
      //       }
      //     }
      //     //slice off the last comma of the string
      //     var len = details.guests[i].bringStuffString.length;
      //     details.guests[i].bringStuffString =details.guests[i].bringStuffString.slice(0, len-2);  
      //   }        
      //   $scope.details.data = details;
      // })
      // .catch(function(err) {
      // 	console.error("eventDetails", err)
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

  initializeDetails();
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