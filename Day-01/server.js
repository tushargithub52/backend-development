const express = require("express")

//create the server
const app = express()

//program the server to handle requests and response
app.get('/home', (req, res) => {
    res.send("Home page Hello")
})

app.get('/about', (req, res) => {
    res.send("About page Hello")
})

//start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})