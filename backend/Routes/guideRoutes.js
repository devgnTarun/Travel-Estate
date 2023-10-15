const express = require('express')
const { registerGuide, verifyToken, loginGuide, getAllGuides } = require('../controllers/guideController')
const router = express.Router()

router.route('/registerGuide').post(registerGuide)
router.route('/loginGuide').post(loginGuide)
router.route('/guide/:id/verify/:token').get(verifyToken)
router.route('/allGuides').get(getAllGuides)


module.exports = router;