const joi = require('joi')

const productSchema = joi.object({
	name: joi.string().min(3).required(),
	image: joi.string().required(),
	food_type: joi.string().required(),
	price: joi.number().required(),
	description: joi.string().required(),
})

const userSchema = joi.object({
	username: joi.string().min(3).required(),
	email: joi.string().email().lowercase(),
	password: joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3-30}$')),
})

module.exports = { productSchema, userSchema }
