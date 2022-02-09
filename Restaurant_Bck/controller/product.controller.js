const createError = require('http-errors')

// model
const product = require('../model/produces.model')

// helper methods
const { productSchema } = require('../helpers/schema_validation.helper')

exports.newProduct = async (Request, Response, Next) => {
	try {
		const productInfo = await productSchema.validateAsync(Request.body)
		const doesExits = await product.findOne({ title: productInfo.title })

		if (doesExits) {
			throw createError.Conflict(`${productInfo.title} is available`)
		} else {
			const newProduct = new product(productInfo)
			const savedProd = await newProduct.save()
		}
	} catch (error) {
		if (error.isJoi === true) {
			error.status = createError.BadRequest
			Next(error)
		}
	}
}
