var router = require('express').Router();
// var usersController = require('');
var eventsController = require('../controllers/eventsController');
// var guestsController = require('');
// var setsController = require('');
// var itemsController = require('');

// router.get('/users', usersController.getAll);
// router.post('/users', usersController.addOne);

router.get('/events/:userID', eventsController.events.get);
router.post('/events', eventsController.events.post);
router.get('/eventDetails', eventsController.eventDetails.get);

// router.get('/guests', guestsController.getAll);
// router.post('/guests', guestsController.addOne);

// router.get('/baskets', basketsController.getAll);
// router.post('/baskets', basketsController.addOne);

// router.get('/items', itemsController.getAll);
// router.post('/items', itemsController.addOne);

module.exports = router;