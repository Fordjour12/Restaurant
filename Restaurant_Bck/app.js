const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const createError = require('http-errors')

// eslint-disable-next-line no-unused-vars
const mongo = require('./helpers/init_mongoose.helper')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(async (Request, Response, Next) => {
	Next(createError.NotFound())
})

// error middleware catches all error
app.use((error, _Request, Response) => {
	const status = error.statusCode || 500
	const message = error.message
	const data = error.data
	Response.status(status).json({ message: message, data: data })
})

module.exports = app
