const express = require('express');
const router = express.Router();
const cards = require('../Controller/cards.controller');

router.post('/cards', cards.cards);
router.post('/users', cards.users);
router.post('/cards/create', cards.cardsCreate);
router.patch('/cards/move', cards.cardsMove);
router.post('/cards/comments', cards.cardsComments);
router.post('/cards/comments/create', cards.cardsCommentsCreate);

module.exports = router;

