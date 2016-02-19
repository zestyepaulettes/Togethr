var router = require('express').Router();
var eventsController = require('');
var guestsController = require('');
var setsController = require('');
var itemsController = require('');

router.get('/events', eventsController.getAll);
router.post('/events', eventsController.addOne);

router.get('/guests', guestsController.getAll);
router.post('/guests', guestsController.addOne);

router.get('/sets', setsController.getAll);
router.post('/sets', setsController.addOne);

router.get('/items', itemsController.getAll);
router.post('/items', itemsController.addOne);

router.get('/eventDetails', setsController.getEventDetails);

module.exports = router;
