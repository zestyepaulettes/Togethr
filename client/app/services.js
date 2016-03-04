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
  var getGuestsByEvent = function(eventId) {
    return $http({
      method:'GET',
      url:'/api/eventGuestDetails/' + eventId,
    })
    .then(function(resp) {
      return resp;
    });
  };
  var getItemsByEvent = function (eventId) {
    return $http({
      method:'GET',
      url:'/api/eventItemDetails/' + eventId,
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var getFriends = function(facebookIDs){
    console.log(facebookIDs);
    return $http({
      method:'GET',
      url:'/api/getFriends',
      params: {
        facebookIDs: facebookIDs
      }
    });
  };

  var getItemsByEvent = function (eventId) {
    return $http({
      method:'GET',
      url:'/api/eventItemDetails/' + eventId,
    })
    .then(function(resp) {
      return resp.data;
    });
  };

  var sendVenmo = function(data) {
    return $http({
      method: 'POST',
      url:'/venmo',
      data: data
    })
    .then(function(resp) {
      return resp;
    });
  };
  var getEvents = function(eventID) {
    return $http({
      method: 'GET',
      url: '/api/eventDetails/' + eventID
    })
    .then(function(res) {
      //console.log(res);
      return res.data;
    });
  };

  var sendEmails = function(eventID) {
    return $http({
      method: 'GET',
      url: '/api/email/' + eventID
    })
    .then(function(resp) {
      return resp;
    });
  };

  var updateEvent = function(eventData, eventID){
    console.log('UPDATING EVENT WITH: ');
    console.log(eventData);
    return $http({
      method: 'POST',
      url: '/api/event/' + eventID,
      data: eventData
    });
  };

  var updateItem = function(item, guestId) {
    return $http({
      method: 'PUT',
      url: '/api/items/' + item.id,
      data: {UserId: guestId}
    })
    .then(function() {
      socket.emit('reassign', 'helloworld');
    });
  };

  var addOneItem = function (item) {
    item.UserId = $cookies.get('userID');
    return $http({
      method: 'POST',
      url: '/api/extraItem',
      data: {item}
    }).then(function(res) {
      socket.emit('reassign', 'helloworld');
      console.log("response from server for adding items from eventdetails ", res.data);
      return res.data;
    }).catch(function (err) {
      console.error(err);
    });
  };
  var addItem = function (items, eventID, userID) {
    return $http({
      method: 'POST',
      url: '/api/items',
      data: {
        items: items,
        eventID: eventID,
        userID: userID
      }
    }).then(function(res){
      socket.emit('reassign','thenewitem');
        return res.data;
    }).catch(function (err) {
      console.eroor(err);
    });
  };

  var addGuests = function(guests, eventID){
    //these three lines add host to guests list
    guests.push({
      id: $cookies.get('facebookID'),
      name: $cookies.get('displayName')
    });
    return $http({
      method: 'POST',
      url: '/api/guests',
      data: {
        guests: guests,
        eventId: eventID
      }
    }).then(function(res){
      console.log('GOT RESPONSE');
      console.log(res.data);
    }).catch(function(err){
      console.error(err);
    });
  };

  return {
    getEvents: getEvents,
    getFriends: getFriends,
    sendEmails: sendEmails,
    updateEvent: updateEvent,
    updateItem: updateItem,
    addItem: addItem,
    addGuests: addGuests,
    sendVenmo: sendVenmo,
    getGuestsByEvent: getGuestsByEvent,
    addOneItem: addOneItem,
    getItemsByEvent: getItemsByEvent
  };
})

.factory('CreateFactory', function($http, $cookies) {
  //send a post request to server
  var currentEvent;
  var guests = [];
  var items = [];
  var addEvent = function(event) {
    $http({
      method: 'POST',
      url: '/api/events',
      data: event
    }).then(function(response){
      currentEvent = response.data;
      console.log(currentEvent);
    }).catch(function(error){
      console.error(error);
    });
  };

  var updateEvent = function(data){
    return $http({
      method: 'UPDATE',
      url: '/api/event',
      data: data
    });
  };

  var getCurrentEvent = function(){
    return currentEvent;
  };

  var addGuest = function(guest){
    var alreadyGuest = false;
    for(var i=0;i<guests.length;i++) {
      guests[i].id === guest.id? alreadyGuest = true: alreadyGuest = false;         
    }
    if(!alreadyGuest) {
      guests.push(guest);
    }
  };

  var getGuests = function(){
    return guests;
  };

  var addItem = function (item) {
    items.push(item);
  };
  var getItems = function () {
    return items;
  };

  return{
    addEvent: addEvent,
    addGuest: addGuest,
    getGuests: getGuests,
    getCurrentEvent: getCurrentEvent,
    addItem: addItem,
    getItems: getItems
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

