const createError = require('http-errors')

// model
const product = require('../model/produces.model')

// helper methods
const { productSchema } = require('../helpers/schema_validation.helper')

exports.newProduct = async (Request, Response, Next) => {
	try {
		const productInfo = await productSchema.validateAsync(Request.body)

		const prod = await product.findOne(productInfo)
		if (prod) {
			throw createError.Conflict(`${productInfo.name} already exist`)
		}

		const newProduct = new product(productInfo)
		const savedProduct = await newProduct.save()

		Response.status(201).send({
			message: 'new product created',
			productId: savedProduct._id,
			data: savedProduct.name,
		})
	} catch (error) {
		if (error.isJoi === true) {
			error.status = createError.UnprocessableEntity
		} else if (!error.statusCode || error) {
			error.statusCode = createError.InternalServerError
		}
		Next(error)
	}
}
