angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', '$log', '$filter','eventDetailsFactory','EventFactory', '$cookies', '$routeParams', function($scope, $log, $filter, eventDetailsFactory, EventFactory, $cookies, $routeParams) {

  //this controller controls the page where the eventDetails will be displayed	
  $scope.details = {};
  $scope.parsed; 
  //we fill in $scope.details with the event stored in 
  //the storeFactory factory and we then show it on the screen:
  var initializeDetails = function() {
    console.log($routeParams,'<-----')
    eventDetailsFactory.getEvents($routeParams.eventID)
      .then(function(details) {
      	
        //add a bringStuff category for each guest
        //which puts in an object what each person 
        //is assigned to bringing. 
        for (var i = 0; i < details.guests.length; i++){
          details.guests[i].bringStuff = {};
          details.guests[i].bringStuffString = "";
        }

        for (var i = 0; i < details.guests.length; i++){
          for (var j = 0; j < details.items.length; j++){
            if (details.guests[i].id === details.items[j].BasketId){
              details.guests[i].bringStuff[details.items[j].name] = details.items[j].name;
              details.guests[i].bringStuffString += details.items[j].name + "," + " ";
            }
          }
          //slice off the last comma of the string
          var len = details.guests[i].bringStuffString.length;
          details.guests[i].bringStuffString =details.guests[i].bringStuffString.slice(0, len-2);  
        }        
        $scope.details.data = details;
      })
      .catch(function(err) {
      	console.error("eventDetails", err)
      })
  	
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
  }
  return {
    getEvents: getEvents
  }
})