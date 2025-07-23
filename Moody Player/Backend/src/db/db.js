const mongoose = require('mongoose')

function ConnectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log("Error connecting DB", err)
    })
}

module.exports = ConnectDB