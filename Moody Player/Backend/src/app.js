const express = require('express')
const songroutes = require('./routes/song.routes')

const app = express();

app.use(express.json())

app.use('/', songroutes);

module.exports = app;