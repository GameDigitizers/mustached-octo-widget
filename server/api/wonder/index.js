'use strict';

var express = require('express');
var controller = require('./wonder.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);

// Not needed since this data should be static

// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;