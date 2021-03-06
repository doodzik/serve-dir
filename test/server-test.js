let Server = require('../src/server')
var assert = require('assert')
const fs   = require('fs-extra')
let fetch  = require('node-fetch')
let path   = require('path')

let testDir = path.resolve('./test/file-server-test-dir/')

describe('Server', function() {
	let server = new Server({dir: testDir})
	let url = server.listen().then(port => {
		return `http://${server.host}:${port}/`
	})

	describe('#listen()', function() {
		it('should serve files', (done) => {
			url.then(fetch).then(res => res.text()).then(result => {
				assert.equal(result, 'test\n')
				done()
			})
		})

		it('should change content when file changed', function(done) {
			url
				.then(url => {
					// create index2.html
					return fs.outputFile(path.resolve(testDir, 'index2.html'), 'test2\n').then(() => url + 'index2.html')
				})
				.then(fetch)
				.then(res => res.text()).then(result => {
					return fs.unlink(path.resolve(testDir, 'index2.html')).then(() => {
						assert.equal(result, 'test2\n')
						done()
					})
				})
		})
	})

	describe('#destroy()', function() {
		it('should stop the server', (done) => {
			server.destroy().then(() => url).then(fetch)
				.then(() => assert.ok(false))
				.catch(() => assert.ok(true))
				.then(() => done())
		})
	})
})


