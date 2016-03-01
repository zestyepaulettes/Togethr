// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'createEvent', 'eventList', 'eventDetails', 'ngRoute', 'auth', 'dndLists'

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
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    // $httpProvider.interceptors.push('AttachTokens');
}])

.run(['$rootScope', '$location', 'AuthFactory', function($rootScope, $location, AuthFactory) {
  $rootScope.$on('$routeChangeStart', function(event, toState) {
    console.log(toState)
    if(toState.$$route && toState.$$route.originalPath === '/events' && !AuthFactory.isAuth()) {
      $location.path('/signin');
    }
    if(toState.$$route && toState.$$route.originalPath === '/' && !AuthFactory.isAuth()) {
      $location.path('/signin');
    }
    if(toState.$$route && toState.$$route.originalPath === '/signin') {
      $location.path('/signin');
    }
  });
}]);
angular.module('auth', ['ngCookies'])

.controller('AuthController', function($scope, $window, $location, $cookies, AuthFactory) {
  $scope.user = {};

  $scope.logout = function() {
    AuthFactory.signout();
  }
})

.factory('AuthFactory', function($http, $window, $location, $cookies) {


  var isAuth = function () {
    return !!$cookies.get('displayName');
  };

  var signout = function () {
    var cookies = $cookies.getAll();
    angular.forEach(cookies, function (v, k) {
        $cookies.remove(k);
    });

    $location.path('/signin');
  };




  return {
    isAuth: isAuth,
    signout: signout
  };
});
angular.module('createEvent', [])

.controller('CreateController', ['$scope', 'CreateFactory', '$location', '$cookies', function($scope, CreateFactory, $location, $cookies) {
  
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

  $scope.addItem = function() {
    $scope.items.push({});
  };

  $scope.removeItem = function(item) {
    $scope.items.splice(item, 1);
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
}])
.factory('CreateFactory', function($http, $cookies) {
  //send a post request to server

  var addEvent = function(event) {
    console.log("EVENT", event);
    return $http({
      method: 'POST',
      url: '/api/events',
      data: event
    });
  }
  return{
    addEvent: addEvent
  };
})

angular.module('eventDetails', ['eventList'])
.controller('eventDetailsController', ['$scope', '$http', 'requestFactory', '$cookies', '$routeParams', function($scope, $http, requestFactory, $cookies, $routeParams) {  
/** ADD ITEM AND ADD GUEST INPUT BOXES **/

  // Holds text input from add item and add guest input boxes
  $scope.itemName;
  $scope.guestName; 
  $scope.guestEmail; 

  // clear text in text field, takes a string as input
  $scope.resetField = function(field) {
    $scope[field] = "";
  };

  // sends a POST request to insert a new item 
  $scope.addItemFunc = function(itemName){
    var newItem = {
      EventId: $cookies.get('eventID'),
      name: itemName // this is coming from ng-model
    };
    return $http({
      method: 'POST',
      url: '/api/items',
      data: newItem
    }).then(function(){
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
    return $http({
      method: 'POST',
      url: '/api/guests',
      data: newGuest
    }).then(function(){
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
  var guests =  $scope.models.guests;

  var initializeDetails = function() {
    // Makes request to server for all event details
    requestFactory.getEvents($routeParams.eventID)
      .then(function(details) {
        
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
}])

.factory('requestFactory', function($http, $cookies) {
  var getEvents = function(eventID) {
    return $http({
      method: 'GET',
      url: '/api/eventDetails/' + eventID
    })
    .then(function(res) {
      return res.data;
    })
  };

  var sendEmails = function(eventID) {
    return $http({
      method: 'GET',
      url: '/api/email/' + eventID
    });
  };

  var updateItem = function(item, guestId) {
    return $http({
      method: 'PUT',
      url: '/api/items/' + item.id,
      data: {GuestId: guestId}
    })
    .then(function() {
      console.log("UPDATED DB");
    })
  };

  return {
    getEvents: getEvents,
    sendEmails: sendEmails,
    updateItem: updateItem
  }
})
angular.module('eventList', [])

.controller('EventsController', ['$scope', 'EventFactory', '$location','$cookies', function($scope, EventFactory, $location, $cookies) {

  //this is where we will store our data after our initializeEvents
  //api request, $scope.data: 
  $scope.data = { };
  //this requests the data and puts it into $scope.data
  var initializeEvents = function() {
  	EventFactory.getEvents()
  	  .then(function (events) {
  	  	$scope.data.events = events;
  	  })
  	  .catch(function(error) {
  	  	console.error("EventsController", error);
  	  })
  }

  //after all the data is displayed: when the user clicks on a specific
  //event this function is fired:
  $scope.getEvent = function( event ) {
    console.log("EVENT", event);
    // storeFactory.eventID = event.id;
    $cookies.put('eventID', event.id);
    $location.path('/eventdetails/' + event.id);
  }

  //when the page is requested by the user, the initialize
  //function automatically runs:
  //*@*@*@*WARNING NEED TO COMMENT THIS LINE AFTER DATABASE FUNCTIONS
  initializeEvents();

}])
.factory('EventFactory', function($http, $cookies) {
	var getEvents = function() {
    return $http({
			method: 'GET',
			url: '/api/events/' + $cookies.get('userID')
		})
		.then(function(resp) {
			return resp.data;
		})
	}
  return {
    getEvents: getEvents
  }
});