var router = require('express').Router();
// var usersController = require('');
var eventsController = require('../controllers/eventsController');
var guestsController = require('../controllers/guestsController');
// var setsController = require('');
var itemsController = require('../controllers/itemsController');

console.log("********* is items controller linking?", itemsController); 

// router.get('/users', usersController.getAll);
// router.post('/users', usersController.addOne);


router.get('/events/:userID', eventsController.events.get);

router.post('/events', eventsController.events.post);
router.get('/eventDetails', eventsController.eventDetails.get);

router.get('/guests', guestsController.getAll);
router.post('/guests', guestsController.addOne);

// router.get('/baskets', basketsController.getAll);
// router.post('/baskets', basketsController.addOne);


console.log("****ITEMS CONTROLLER", itemsController.getAll);
router.get('/items', itemsController.getAll);
 
router.post('/items', itemsController.addOne);
router.post('items/all', itemsController.addAll); 

module.exports = router;