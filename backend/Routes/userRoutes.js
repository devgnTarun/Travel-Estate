const express = require('express');
const { registerUser, verifyToken, loginUser, loadUser } = require('../controllers/userController');
const router = express.Router()
const isAuthenticated = require('../middlewares/isAuthenticated');
const guideAuth = require('../middlewares/guideAuthenticated');

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/loadUser').get(  loadUser)
router.route('/users/:id/verify/:token').get(verifyToken)



module.exports = router;