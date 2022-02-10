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
router.get('/allProducts', productsController.allProducts)
//needs refining 
router.get('product/:id', productsController.singleProduct)
router.put('/product/:id', productsController.updateProduct)
router.post('/prodDelete/:id', productsController.deleteProduct)

module.exports = router
