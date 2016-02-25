var router = require('express').Router();
// var usersController = require('');
var eventsController = require('../controllers/eventsController');
// var guestsController = require('../controllers/guestsController');
// var setsController = require('');
var itemsController = require('../controllers/itemsController');

// router.get('/users', usersController.getAll);
// router.post('/users', usersController.addOne);


router.get('/events/:userID', eventsController.events.get);

router.post('/events', eventsController.events.post);
router.get('/eventDetails/:eventID', eventsController.eventDetails.get);

// router.get('/guests', guestsController.get);
// router.post('/guests', guestsController.post);
// router.delete('/guests', guestsController.delete);

// router.get('/baskets', basketsController.get);
// router.post('/baskets', basketsController.post);
// router.delete('/baskets', basketsController.delete);

// router.get('/items', itemsController.get);
// router.post('/items', itemsController.post);
// router.delete('/items', itemsController.delete);

module.exports = router;