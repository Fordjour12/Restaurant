const { createClient } = require('redis')

const client = createClient({ port: 6379, host: '192.168.100.35' })

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
