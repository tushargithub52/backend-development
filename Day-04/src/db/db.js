const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect("mongodb+srv://tusharrai:q7Ish6UsIMCN333l@cluster0.qqfjvjx.mongodb.net/Cohort")
    .then(() => {
        console.log("Connected to DB")
    })
    .catch(() => {
        console.log("Error connecting DB")
    })
}

module.exports = connectToDB;