var router = require('express').Router();
// var usersController = require('');
var eventsController = require('../controllers/eventsController');
// var guestsController = require('../controllers/guestsController');
// var setsController = require('');
var itemsController = require('../controllers/itemsController');
var nodemailerController = require('../controllers/nodemailerController'); 


// router.get('/users', usersController.getAll);
// router.post('/users', usersController.addOne);

router.get('/events/:userID', eventsController.events.get);
router.post('/events', eventsController.events.post);
router.get('/eventDetails/:eventID', eventsController.eventDetails.get);

router.get('/email/:eventID', nodemailerController.get);

// router.get('/guests', guestsController.get);
// router.post('/guests', guestsController.post);
// router.delete('/guests', guestsController.delete);
// router.put('/guests', guestsController.put);

router.get('/items/:eventID', itemsController.get);
router.post('/items', itemsController.post);
router.put('/items/:itemID', itemsController.put);
router.delete('/items/:itemID', itemsController.delete);

module.exports = router;

// router.get('/baskets', basketsController.get);
// router.put('/baskets/swap', basketsController.put);