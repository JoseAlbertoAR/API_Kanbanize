const express = require('express');
const router = express.Router();

const workspaces = require('../Controller/workspaces.controller');
router.post('/workspaces', workspaces.workspaces);

module.exports = router;