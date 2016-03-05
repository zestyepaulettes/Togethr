var router = require('express').Router();
// var usersController = require('');
var eventsController = require('../controllers/eventsController');
var guestsController = require('../controllers/guestsController');
// var basketsController = require('../controllers/basketsController');
var itemsController = require('../controllers/itemsController');
var nodemailerController = require('../controllers/nodemailerController');



// router.get('/auth/facebook', usersController.getAll);
// router.get('/auth/facebook/callback', usersController.addOne);

router.get('/events/:userID', eventsController.events.get);
router.post('/events', eventsController.events.post);
router.get('/eventDetails/:eventID', eventsController.eventDetails.get);
router.post('/event/:eventID', eventsController.eventDetails.post);

router.get('/email/:eventID', nodemailerController.get);

router.get('/eventItemDetails/:eventId', itemsController.getItems); //tiff
router.get('/eventGuestDetails/:eventId', guestsController.getGuests); //tiff
router.get('/guests', guestsController.get);
router.post('/guests', guestsController.post);
router.put('/guests', guestsController.put);
router.delete('/guests', guestsController.delete);

router.get('/items/:eventID', itemsController.get);
router.post('/items', itemsController.post);
router.put('/items', itemsController.put);
router.delete('/items/:itemID', itemsController.delete);

// router.get('/baskets', basketsController.get);
// router.put('/baskets/swap', basketsController.put);



module.exports = router;
