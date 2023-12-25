const s = require('./lib/index.cjs')

console.log(s);

s('https://upload.wikimedia.org/wikipedia/commons/d/db/Npm-logo.svg').then(x => {
	console.log(s.isReachable(x))
})