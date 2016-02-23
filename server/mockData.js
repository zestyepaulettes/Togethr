var USER = require('./models/models').User;
var EVENT = require('./models/models').Event;

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

USER.bulkCreate(users)
  .then(function() {
    EVENT.bulkCreate(events);
  });
