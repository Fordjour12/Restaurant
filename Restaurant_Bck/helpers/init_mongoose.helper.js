const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
	dbName: process.env.DB_NAME,
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
// .then(() => console.log('Mongodb Connected'))
// .catch((err) => console.log(err.message))

mongoose.connection.once('connection', () => {
	console.log('Mongoose connected to DB')
})
mongoose.connection.on('error', (error) => {
	console.log(error.message)
})

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose connection is disconnected')
})

mongoose.connection.on('SIGINT', async () => {
	await mongoose.connection.close()
	process.exit(0)
})
