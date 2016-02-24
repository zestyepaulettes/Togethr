var USER = require('./models/models').User;
var EVENT = require('./models/models').Event;
var ITEM = require('./models/models').Item; 

var users = [
  { facebookID: 1,
    displayName: 'Diamond',
    email: 'DW@DW.com' },

  { facebookID: 2,
    displayName: 'Alex',
    email: 'AS@AS.com' }
];

var events = [
  { UserId: 1,
    name: "Diamond's BDAY" },
  
  { UserId: 2,
    name: "Alex's BDAY" },

  { UserId: 2,
    name: "Alex's Graduation" }
];

var items = [{name: 'cake', EventId: 1},{name: 'milk', EventId: 2}];

USER.bulkCreate(users)
  .then(function() {
    EVENT.bulkCreate(events)
      .then(function(){
        ITEM.bulkCreate(items);
      });
  });

