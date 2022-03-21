const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

router.post('/new', user_controller.create_user_post);
router.post('/login', user_controller.login_user_post);

module.exports = router;