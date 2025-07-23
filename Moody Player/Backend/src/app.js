const express = require('express')
const songroutes = require('./routes/song.routes')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

app.use('/', songroutes);

module.exports = app;