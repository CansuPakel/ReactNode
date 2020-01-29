const fs = require('fs') //fs module

fs.writeFileSync('notes.txt', 'My name is Cansu')
//write some text in textfile
//first name of  file
//second is the data

fs.appendFileSync('notes.txt','\nI\'m 21 years old');
