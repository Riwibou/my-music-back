const express = require('express');
const router = express.Router();
const { addMusic, updateMusic, deleteMusic, getMusic, getAllMusic } = require('../controllers/music.controller');

router.post('/', addMusic);
router.put('/:id', updateMusic);
router.delete('/:id', deleteMusic);
router.get('/:id', getMusic);
router.get('/', getAllMusic);

module.exports = router;
