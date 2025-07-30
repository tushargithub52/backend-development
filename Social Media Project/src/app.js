const express = require('express')
const authRoutes = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const cookieparser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(cookieparser())
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)

module.exports = app