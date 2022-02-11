const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
	signAccessToken: (userId) => {
		return new Promise((resolve, reject) => {
			const payload = {}
			const secret = 'some secret'
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
}
