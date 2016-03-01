angular.module('Services', [])

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
})

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

  var addItem = function (item) {
    return $http({
      method: 'POST',
      url: '/api/items',
      data: item
    }).then(function(res){
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
    addGuest: addGuest
  }
})

