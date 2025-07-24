const express = require('express')

const router = express.Router();

router.use((req, res, next) => {
    console.log("Hello from middleware between router and API...Router level middleware")
    next()
})

router.get('/', (req, res) => {
    res.json({
        message: "Hello babe! How are you ?"
    })
})

module.exports = router