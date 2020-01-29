const validator = require('validator')
const getNotes = require('../notes.js')
const chalk = require('chalk')
const msg = getNotes()
console.log(msg)
console.log(validator.isEmail('test@test.be'))

const greenMsg = chalk.green.inverse.bold('red!');
console.log(greenMsg)


console.log(process.argv[2])