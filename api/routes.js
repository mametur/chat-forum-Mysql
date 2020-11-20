const controllers = require('./controllers.js');
const express = require('express');

const router = express.Router();

// write your routes
router.post('/register', controllers.signUp);
router.post('/signIn', controllers.signIn);

module.exports = router;
