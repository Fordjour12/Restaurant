const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
	signAccessToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {}
			const secret = process.env.ACCESS_TOKEN_SECRET
			const options = {
				expiresIn: '3d',
				issuer: 'thephantombistro.site',
				audience: userId,
			}

			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err.message)
					reject(createError.InternalServerError)
					return
				}
				resolve(token)
			})
		})
	},
	verifyAccessToken: (Request, Response, Next) => {
		if (!Request.headers['authorization']) {
			return Next(createError.Unauthorized)
		}
		const authHeader = Request.headers['authorization']
		const bearerToken = authHeader.split(' ')
		const token = bearerToken[1]

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
			if (err) {
				// eslint-disable-next-line no-constant-condition
				const message = (err.name = 'JsonWebTokenError'
					? 'Unauthorized'
					: err.message)
				return Next(createError.Unauthorized(message))
			}
			Request.payload = payload
			Next()
		})
	},
	signRefreshToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {}
			const secret = process.env.REFRESH_TOKEN_SECRET
			const options = {
				expiresIn: '1y',
				issuer: 'thephantombistro.site',
				audience: userId,
			}

			jwt.sign(payload, secret, options, (err, token) => {
				if (err) {
					console.log(err.message)
					reject(createError.InternalServerError)
					return
				}
				resolve(token)
			})
		})
	},
	verifyRefreshToken: (refreshToken) => {
		return new Promise((resolve, reject) => {
			jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
				(err, payload) => {
					if (err) return reject(createError.Unauthorized())
					const userId = payload.aud

					resolve(userId)
				}
			)
		})
	},
}
