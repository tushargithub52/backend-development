const http = require('http')

var server = http.createServer()

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})