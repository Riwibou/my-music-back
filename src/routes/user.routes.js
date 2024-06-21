const express = require('express');
const router = express.Router();
const { addUser, updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/user.controller');

router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);

module.exports = router;
