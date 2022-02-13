const bcrypt = require('bcryptjs')

const { Schema, model } = require('mongoose')

const userSchema = new Schema({
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

userSchema.pre('save', async function (Next) {
	try {
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(this.password, salt)
		this.password = hashedPassword
		Next()
	} catch (error) {
		Next(error)
	}
})

userSchema.methods.isValidPassword = async function (password) {
	// eslint-disable-next-line no-useless-catch
	try {
		return await bcrypt.compare(password, this.password)
	} catch (error) {
		throw error
	}
}

module.exports = model('User', userSchema)
