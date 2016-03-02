angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', '$http', 'requestFactory', '$cookies', '$routeParams', function($scope, $http, requestFactory, $cookies, $routeParams) {  
/** ADD ITEM AND ADD GUEST INPUT BOXES **/

  // Holds text input from add item and add guest input boxes
  $scope.itemName;
  $scope.guestName; 
  $scope.guestEmail; 

  // clear text in text field, takes a string as input
  $scope.resetField = function(field) {
    $scope[field] = '';
  };

  // sends a POST request to insert a new item 
  $scope.addItemFunc = function(itemName){
    //console.log('inside addItemFunc!');
    var newItem = {
      EventId: $cookies.get('eventID'),
      name: itemName // this is coming from ng-model
    };
  requestFactory.addItem(newItem).then(function(res) {
    $scope.resetField('newItem'); // reset text field
  });

  };

  // sends a POST request to insert a new guest
  $scope.addGuestFunc = function(guestName, guestEmail){
    var newGuest = {
      EventId: $cookies.get('eventID'),
      name: guestName, //this is coming from ng-model
      email: guestEmail
    };
    requestFactory.addGuest(newGuest).then(function(res){
        $scope.resetField('guestName'); 
        $scope.resetField('guestEmail'); 
    });

  };

/** DRAG AND DROP TABLE **/

  // Holds guests and the items they are bringing (guests)
  // The selected property is specific to drag-and-drop (which item is selected)
  $scope.models = {
    selected: null,
    guests: {} // each guest will be a column in the table
  };

  // Holds event details
  $scope.details;

  // For simplicity when refering to the ng-model guests
  var guests =  $scope.models.guests;

  var initializeDetails = function() {
    // Makes request to server for all event details
    requestFactory.getEvents($routeParams.eventID)
      .then(function(details) {
        
        // Set event details to ng-model details
        $scope.details = details;

        // temporarily holds guestId: [items]
        var temp = {};

        // Populate temp
        for (var j = 0; j < details.items.length; j++) {
          var GuestId = details.items[j].GuestId;
          var item = details.items[j];
          if (temp[GuestId]) {
            temp[GuestId].push(item);
          } else {
            temp[GuestId] = [item];
          }
        }        

        // Populate the ng-model guests
        for (var i = 0; i < details.guests.length; i++){
          var guestName = details.guests[i].name;
          var guestId = details.guests[i].id;
          // Adds guestName and guestId to ng-model guests 
          // and assigns guests an items array or an empty array
          guests[guestName + ' ' + guestId] = temp[guestId] ? temp[guestId] : [];
        }
      })
  }

  // Fires when an item is moved to a column
  $scope.reassignItem = function(item, guestInfo) {
    var guestId = $scope.getId(guestInfo);
    requestFactory.updateItem(item, guestId);
    // nessesary for drag-and-drop visualization
    // return false to reject visual update
    return item; 
  }

  // parse guestInfo for guest name
  $scope.getId = function(guestInfo) {
    var name = guestInfo.match(/([^\s])+/g);
    return name[1];
  }

  // parse guestInfo for guest Id 
  $scope.getName = function(guestInfo) {
    var name = guestInfo.match(/([^\s])+/);
    return name[0];
  }

/** EMAIL **/
  // sends unique eventDetails url to all guests
  $scope.email = function() {
    var eventID = $cookies.get("eventID")
    requestFactory.sendEmails(eventID);
  }

/** INITIALIZE ON PAGE LOAD **/
  initializeDetails();
}]);

