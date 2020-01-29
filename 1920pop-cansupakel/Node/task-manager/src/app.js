const express = require('express')
require('./db/mongoose')

const taskRouter =require('./routes/task')
const userRouter = require('./routes/user')

const app = express()

app.use(express.json()) //automatic parse incoming json to object
app.use(userRouter)
app.use(taskRouter)

module.exports = app