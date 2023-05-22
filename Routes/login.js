const express = require('express');
const router = express.Router();

//import ('../Controller/login.controller.js');
const login = require('../Controller/login.controller');
router.post('/login', login.login);

module.exports = router;