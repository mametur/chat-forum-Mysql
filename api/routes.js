const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

// write your routes
router.post('/register', controllers.readAll);
// router.post('/users', controllers.signUp);
// router.post('/comments', controllers.leaveComments);

module.exports = router;