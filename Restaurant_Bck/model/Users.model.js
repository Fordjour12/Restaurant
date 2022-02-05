const { Schema, model } = require('mongoose')

const userSchema = new Schema({
	_id: { required: true },
	username: {
		type: String,
		required: true,
		min: 3,
		unique: true,
	},
	email: {
		type: String,
		lowercase: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		min: 6,
	},
})

module.exports = model('User', userSchema)
