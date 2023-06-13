const express = require('express');
const router = express.Router();

const boards = require('../Controller/boards.controller');
router.post('/boards', boards.boards);
router.post('/workflows', boards.workflows);
router.post('/columns', boards.columns);
router.post('/lane', boards.lane);

module.exports = router;