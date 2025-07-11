const express = require('express')
const connectTODB = require('./src/db/db')

const app = express()
app.use(express.json())

connectTODB();

app.get('/notes', (req, res) => {
    console.log("HELLO WPRLD")
})

app.post('/notes', (req, res) => {
    const {title, content} = req.body

    res.json(req.body)
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})