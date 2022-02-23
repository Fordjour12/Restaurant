const { createClient } = require('redis')

const client = createClient({ port: 6379, host: '127.0.0.3' })

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
