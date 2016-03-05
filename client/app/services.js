angular.module('Services', [])

.factory('EventFactory', function($http, $cookies) {

  var getEvents = function() {
    return $http({
      method: 'GET',
      url: '/api/events/' + $cookies.get('userID')
    })
    .then(function(resp) {
      return resp.data;
    });
  };
  return {
    getEvents: getEvents
  };
})

.factory('requestFactory', function($http, $cookies) {

  var sendVenmo = function(data) {
    return $http({
      method: 'POST',
      url:'/venmo',
      data: data
    })
    .then(function(resp) {
      console.log('response from venmo', resp);
      return resp;
    });
  };
  var getEvents = function(eventID) {
    return $http({
      method: 'GET',
      url: '/api/eventDetails/' + eventID
    })
    .then(function(res) {
      return res.data;
    });
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
      socket.emit('reassign', 'helloworld');
      console.log("UPDATED DB");
    });
  };

  var addItem = function (item) {
    return $http({
      method: 'POST',
      url: '/api/items',
      data: item
    }).then(function(res){
      socket.emit('reassign','thenewitem');
        console.log('inside addItem func ', res.data);
        return res.data;
    });
  };

  var addGuest = function(guest) {
    return $http({
      method: 'POST',
      url: '/api/guests',
      data: guest
    }).then(function(res){
        console.log('inside addGuest func in services ', res.data);
        return res.data;
    });
  };

  return {
    getEvents: getEvents,
    sendEmails: sendEmails,
    updateItem: updateItem,
    addItem: addItem,
    addGuest: addGuest,
    sendVenmo: sendVenmo
  };
})

.factory('CreateFactory', function($http, $cookies) {
  //send a post request to server
  var addEvent = function(event) {
    return $http({
      method: 'POST',
      url: '/api/events',
      data: event
    });
  }

  var addGuest = function(id) {
    return $http({
      method: 'POST',
      url: '/api/guests',
      data: id
    }).then(function(res) {
      return res.data;
    })
  }
  return{
    addEvent: addEvent,
    addGuest: addGuest
  };
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

