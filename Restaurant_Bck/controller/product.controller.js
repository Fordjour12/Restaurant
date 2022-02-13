const createError = require('http-errors')

// model
const product = require('../model/produces.model')

// helper methods
const { productSchema } = require('../helpers/schema_validation.helper')

exports.newProduct = async (Request, Response, Next) => {
	try {
		const productInfo = await productSchema.validateAsync(Request.body)

		const prod = await product.findOne(productInfo)
		// const prod = await product.findOne({ name: productInfo.name })
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
			error.status = 422
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

//needs refining
exports.singleProduct = async (Request, Response, Next) => {
	let prod
	try {
		const prodInfo = Request.params.id
		prod = await product.findById(prodInfo)
		if (prod == null) {
			throw createError.NotFound(`${prodInfo} is not found`)
		}
	} catch (error) {
		if (!error.statusCode || error) {
			error.statusCode = createError.InternalServerError
		}
	}
	Response.prod = prod
	Next()
}

exports.updateProduct = async (Request, Response, Next) => {
	try {
		const productInfo = await productSchema.validateAsync(Request.body)
		let prodId = Request.params.id

		if (prodId === null) {
			throw createError.NotFound(`${prodId} is not found`)
		}
		const prod = await product.findByIdAndUpdate(prodId, productInfo)

		Response.status(201).json({
			message: 'update created',
			productId: prod._id,
			dataBefore: prod.name,
		})
	} catch (error) {
		if (error.isJoi === true) {
			error.status = 422
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
