const express = require('express')
const router = express.Router()

// user controller
const userController = require('../controller/user.controller')

/* GET users listing. */
router.get('/', function (req, res) {
	res.send({
		message: 'Authentication Route',
	})
})

router.post('/signup', userController.register)
router.post('/login', userController.login)

module.exports = router
