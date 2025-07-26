const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, password} = req.body

    const user = await userModel.create({
        username: username,
        password: password
    })

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET_KEY)

    res.cookie('token', token)

    res.status(201).json({
        message:  "User registered successfully",
        user
    })
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const user = await userModel.findOne({
        username: username
    })

    if(!user) {
        return res.status(401).json({
            message: "User do not exists - [ invalid username ]"
        })
    }

    const isPasswordValid = password == user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    res.status(200).json({
        message: "User Logged In successfully"
    })
})

router.get('/user', async (req, res) => {
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
        const user = await userModel.findOne({
            _id: decoded.id,
        })
    
        res.status(200).json({
            message: "User data fetched successfully",
            user
        })
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized - Invalid token",
        })
    }
})

module.exports = router