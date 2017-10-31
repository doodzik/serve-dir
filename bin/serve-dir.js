/*eslint no-console: "warn"*/

const { resolve } = require('path')
const Server      = require('../index')

const argv = require('minimist')(process.argv.slice(2))

const dirList = argv._ || []
const dir = (dirList.length === 0) ? process.cwd() : resolve(...dirList)

const server = new Server({dir})
  
server.listen().then(port => `http://${server.host}:${port}/`).then(url => {
	console.log('serving dir: ', dir)
	console.log('at: ', url)
})

if (process.platform === 'win32') {
	var rl = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	})

	rl.on('SIGINT', () => process.emit('SIGINT'))
}

process.on('SIGINT', () => {
	console.log('graceful shutdown')
	server.destroy().then(() => process.exit())
})

