const express = require('express')

const router = express.Router()

// products controller
const productsController = require('../controller/product.controller')

router.get('/', function (req, res) {
	res.send({
		message: 'Product page reached',
	})
})
router.post('/newProduct', productsController.newProduct)

module.exports = router
