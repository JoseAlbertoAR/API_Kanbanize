const express = require('express');
const router = express.Router();

import ('../Controller/login.controller.js');
router.post('/login', login.login);
