const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/api/v1/user/:userid', userController.getUserData);

module.exports = router;
