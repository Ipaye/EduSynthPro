const crypto = require('crypto')

const generateSecret = () => {
  return crypto.randomBytes(32).toString('hex')
}

console.log(generateSecret())
