const { Schema, model } = require('mongoose')

const foodSchema = new Schema({
	_id: { required: true },
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
	},
	food_type: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
})

module.exports = model('food', foodSchema)
