const createError = require('http-errors')

// user model
const user = require('../model/users.model')

// helper methods
const { userSchema } = require('../helpers/schema_validation.helper')
const {signAccessToken} = require('../helpers/json_token.helper')


exports.register = async (Request, Response, Next) => {
	try {
		const userInfo = await userSchema.validateAsync(Request.body)
		const userData = await user.findOne(userInfo)
		if (userData) {
			throw createError.Conflict(`${userInfo.username} already exits`)
		}
		const newUser = new user(userInfo)
		const savedUser = await newUser.save()

        const accessToken = await signAccessToken(savedUser.id)


		Response.status(201).send({
			message: 'new user created',
			userId: savedUser._id,
			data: savedUser.username,
            token:accessToken,
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
exports.login = async (Request, Response, Next) => {
	const userInfo = await userSchema.validateAsync(Request.body)
	const userData = await user.findOne({ email: userInfo.email })

	if (!userData) {
		throw createError.NotFound('user not found')
	}
    const 
}
