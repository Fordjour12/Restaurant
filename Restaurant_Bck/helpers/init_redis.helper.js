const redis = require('redis')
require('dotenv').config()

const client = redis.createClient({
	url: process.env.REDIS_URI,
})

// const client = createClient()

client.on('connect', () => {
	console.log('Client connection to redis...')
})

client.on('ready', () => {
	console.log('client connected to redis and ready to use...')
})

client.on('error', (err) => {
	console.log(err.message)
})

client.on('end', () => {
	console.log('Client disconnected from redis')
})

client.connect()

process.on('SIGINT', () => {
	client.quit()
})

module.exports = client

// #MONGODB_URI = mongodb+srv://thephantomdev-trial:8CiqfoLglFkBmhEv@cluster0.74xar.mongodb.net/Restaurant?retryWrites=true&w=majority
