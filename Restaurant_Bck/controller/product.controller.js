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

exports.allProducts = async (_Request, Response, Next) => {
	try {
		const prods = await product.find()
		if (prods.length === 0) {
			throw createError.NotFound('product empty')
		}
		Response.status(200).json(prods)
	} catch (error) {
		if (!error.statusCode || error) {
			error.statusCode = createError.InternalServerError
		}
		Next(error)
	}
}

exports.singleProduct = async (Request, Response, Next) => {
	let prod
	try {
		prod = await product.findById(Request.params.id)
		if (prod === null) {
			throw createError.NotFound(`${Request.params.id} is not found`)
		}
		Response.status(200).json(prod)
	} catch (error) {
		if (!error.statusCode || error) {
			error.statusCode = createError.InternalServerError
		}
		Next(error)
	}
}

exports.updateProduct = async (Request, Response, Next) => {
	try {
		const productInfo = await productSchema.validateAsync(Request.body)
		let prodId = Request.params.id

		if (prodId === null) {
			throw createError.NotFound(`${prodId} is not found`)
		}
		const prod = await product.findByIdAndUpdate(prodId, productInfo)

		Response.status(201).send({
			message: 'new product created',
			productId: prod._id,
			data: prod.name,
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

exports.deleteProduct = async (Request, Response, Next) => {
	try {
		let prodId = Request.params.id

		const prod = await product.findByIdAndDelete(prodId)
		if (prod) {
			product.remove
		}
		Response.json({ message: 'Deleted successfully' })
	} catch (error) {
		if (!error.statusCode || error) {
			error.statusCode = createError.InternalServerError
		}
		Next(error)
	}
}
