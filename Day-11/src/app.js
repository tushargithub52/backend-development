const express = require('express')
const indexroute = require('./routes/index.routes')

const app = express()

app.use((req, res, next) => {
    console.log("Hello middleware between app and router...Application level middleware")
    next()
})

app.use('/', indexroute)

module.exports = app