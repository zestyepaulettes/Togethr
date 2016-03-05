var router = require('express').Router();
var eventsController = require('../controllers/eventsController');
var guestsController = require('../controllers/guestsController');
var itemsController = require('../controllers/itemsController');
var nodemailerController = require('../controllers/nodemailerController');




router.get('/events/:userID', eventsController.events.get);
router.post('/events', eventsController.events.post);
router.get('/eventDetails/:eventID', eventsController.eventDetails.get);
router.post('/event/:eventID', eventsController.eventDetails.post);

router.get('/email/:eventID', nodemailerController.get);

router.get('/eventItemDetails/:eventId', itemsController.getItems); //tiff
router.get('/eventGuestDetails/:eventId', guestsController.getGuests); //tiff

router.get('/getFriends', guestsController.getFriends);

router.get('/guests', guestsController.get);
router.post('/guests', guestsController.post);
router.put('/guests', guestsController.put);
router.delete('/guests', guestsController.delete);

router.get('/items/:eventID', itemsController.get);
router.post('/items', itemsController.post);
router.post('/extraItem', itemsController.postOne);
router.put('/items/:itemID', itemsController.put);
router.delete('/items/:itemID', itemsController.delete);



module.exports = router;
