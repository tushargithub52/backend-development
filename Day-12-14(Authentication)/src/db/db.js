const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected To DB')
    })
    .catch((err) => {
        console.log('Error connecting DB', err)
    })
}

module.exports = connectDB