# serve-dir

Serve a directory as a website.

# Installation

```
$ npm install doodzik/serve-dir
```

If you want to use the command line command `serve-dir` install this module globally 
```
$ npm install -g doodzik/serve-dir
```

# Usage

```
const Server = require('serve-dir')
const dir    = __dirname
const server = new Server({dir})

server.listen().then(port => {
  console.log(`serving dir at: http://${server.host}:${port}/`)
}).then(() => server.destroy())
```

```
# Or in the CLI
# serve current dir
$ serve-dir
# serve a dir
$ serve-dir ./path/to/dir
```

# API

# Author

[Frederik Dudzik](https://dudzik.co)

