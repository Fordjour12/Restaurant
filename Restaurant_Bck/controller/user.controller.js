const createError = require('http-errors')

// user model
const user = require('../model/users.model')

// helper methods
const { userSchema } = require('../helpers/schema_validation.helper')
const {
	signAccessToken,
	verifyAccessToken,
	signRefreshToken,
	verifyRefreshToken,
} = require('../helpers/json_token.helper')

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
		const verifyToken = await verifyAccessToken(savedUser.id)

		Response.status(201).send({
			message: 'new user created',
			userId: savedUser._id,
			data: savedUser.username,
			token: accessToken,
			verify: verifyToken,
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
	try {
		const userInfo = await userSchema.validateAsync(Request.body)
		const userData = await user.findOne({ email: userInfo.email })

		if (!userData) {
			throw createError.NotFound('user not found')
		}
		const isUserData = await user.isValidPassword(userInfo.password)
		if (!isUserData) {
			throw createError.Unauthorized('username/password not valid')
		}
		const accessToken = await signAccessToken(user.id)
		const verifyToken = await verifyAccessToken(user.id)

		Response.status(201).send({
			message: 'new user created',
			userId: isUserData._id,
			data: isUserData.username,
			token: accessToken,
			verify: verifyToken,
		})
	} catch (error) {
		if (error.isJoi === true) {
			return Next(createError.BadRequest('Invalid username/password'))
		} else if (!error.statusCode || error) {
			error.statusCode = createError.InternalServerError
		}
		Next()
	}
}

exports.refreshToken = async (Request, Response, Next) => {
	try {
		const { refreshToken } = Request.body
		if (!refreshToken) throw createError.BadRequest
		const userId = await verifyRefreshToken(userId)

		const accessToken = await signAccessToken(userId)
		const refToken = await signRefreshToken(userId)

		Response.status(200).send({
			accessToken: accessToken,
			refreshToken: refToken,
		})
	} catch (error) {
		Next(error)
	}
}

