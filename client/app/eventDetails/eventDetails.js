angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', '$http', 'requestFactory', '$cookies', '$routeParams', function($scope, $http, requestFactory, $cookies, $routeParams) {
/** ADD ITEM AND ADD GUEST INPUT BOXES **/

  // Holds text input from add item and add guest input boxes
  $scope.total;
  $scope.guests;
  $scope.split;
  $scope.total;
  $scope.items= [];
  $scope.details;

  var fakeData = [{
    userId: '1',
    eventId: '45', //todo: to test, change it to whatever ur local id is currently
    text: 'omg 2 hours to do this'
  },{
    userId: '2',
    eventId: '45', //todo: to test, change it to whatever ur local id is currently
    text: 'hello world'
  },
  {
    userId: '3',
    eventId: '45', //todo: to test, change it to whatever ur local id is currently
    text: '1 hr and 58 minutes now'
    }
  ];

  $scope.sendMessage = function (message) { //sends message to database
    var messageToSend = $scope.message;
    var chatData = {
      userId: $cookies.get('userID'),
      eventId: $routeParams.eventID,
      text: messageToSend,
      date: Date()
    };
    return requestFactory.sendMessage(chatData);
  };
  //retrieves guests full info from db specific to event
  var getGuests = function() {
    return requestFactory.getGuestsByEvent($routeParams.eventID)
    .then(function(guests) {
      $scope.guests = guests.data;
      initializeDetails();
    });
  };
  getGuests();

  $scope.getItems = function () {
    return requestFactory.getItemsByEvent($routeParams.eventID);
  };
  $scope.getItems()
      .then(function(items) {
      $scope.items = items;
    });
  //makes venmo call to server
  $scope.venmo = function(guestData) {
    $scope.total = $scope.total;
    $scope.split = $scope.total/($scope.guests.length + 1);
    var data = {
      // phone: '14153167181',
      amount: -$scope.split,
      note: "please chip in for" + ""//enter event name when we get access
    };
    for(var i = 0; i < $scope.guests.length; i++) {
      data.email = $scope.guests[i].email;
    requestFactory.sendVenmo(data);
    }
  };

  // clear text in text field, takes a string as input
  $scope.resetField = function(field) {
    $scope[field] = '';
  };

  // sends a POST request to insert a new item
  $scope.addItemFunc = function(itemName){
    var newItem = {
      name: itemName, // this is coming from ng-model
      userId: null,
      EventId: $scope.details.id
    };
  requestFactory.addOneItem(newItem)
  .then(function(res) {
    $scope.getItems()
        .then(function(items) {
        $scope.items = items;
        $scope.resetField('newItem'); // reset text field
      });
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

  // For simplicity when refering to the ng-model guests
  var partyGuests =  $scope.models.guests;

  var initializeDetails = function() {
    // Makes request to server for all event details
    requestFactory.getEvents($routeParams.eventID)
      .then(function(details) {
        $scope.details = details;
          return $scope.getItems();
      })
      .then(function(items) {
        $scope.items = items;
        var temp = {};
        for(var i = 0 ; i < $scope.items.length; i++) {
          var GuestId = $scope.items[i].UserId;
          var item = $scope.items[i];
            if(temp[GuestId]) {
              temp[GuestId].push(item);
            } else {
              temp[GuestId] = [item];
            }
        }
        for(var j = 0 ; j < $scope.guests.length; j++) {
          var guestName = $scope.guests[j].displayName;
          var guestId = $scope.guests[j].id;
          partyGuests[guestName + ' ' + guestId] = temp[guestId] ? temp[guestId] : [];
        }
        mapIt();
      });
  };

  // Fires when an item is moved to a column
  $scope.reassignItem = function(item, guestInfo) {
    var UserId = $scope.getId(guestInfo);
    requestFactory.updateItem(item, UserId);
    // nessesary for drag-and-drop visualization
    // return false to reject visual update
    return item;
  };

  // parse guestInfo for guest name
  $scope.getId = function(guestInfo) {
    var name = guestInfo.match(/([^\s])+/g);
    return name[name.length-1];
  };
  // parse guestInfo for guest Id
  $scope.getName = function(guestInfo) {
     var name = guestInfo.match(/([^\s])+/g);
     name.splice(name.length-1,1);
    return name.join(' ').trim();
  };

  var mapIt = function() {
    var geocoder, map;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': $scope.details.location }, function(results, status) {
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
/** EMAIL **/
  // sends unique eventDetails url to all guests
  $scope.email = function() {
    var eventID = $cookies.get("eventID");
    requestFactory.sendEmails($routeParams.eventID);
  };

  socket.on('updateItems', function(msg){
    initializeDetails();
  });
}]);

