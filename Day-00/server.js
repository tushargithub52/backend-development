const http = require('http')

//create the server...
var server = http.createServer((req, res) => {
    res.end("Hello world from the server");
})

//start the server...
server.listen(3000, () => {
    console.log("Server is running on port 3000")
})