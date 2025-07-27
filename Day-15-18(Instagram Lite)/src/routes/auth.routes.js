const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/register', async (req, res) => {
    const {username, password} = req.body

    const IsUserAlreadyExists = await userModel.findOne({username})
    
    if(IsUserAlreadyExists){
        return res.status(409).json({
            message: "Username already in use"
        })
    }

    const user = await userModel.create({
        username, password
    })

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token, {
        expires: new Date(Date.now() + 1000*60*60*24*7) // 7 days of expiry
    })

    res.status(201).json({
        message:"User registered successfully",
        user
    })
})

router.get('/user', async (req, res) => {
    const {token} = req.cookies

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access - [token not found]"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findOne({
            _id: decoded.id
        })

        res.status(200).json({
            message: "User data fetched successfully",
            user
        })
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized access - [Invalid token]"
        })
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const user = await userModel.findOne({username})

    if(!user){
        return res.status(404).json({
            message: "User account not found"
        })
    }

    const IsPasswordValid = password == user.password

    if(!IsPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token, {
        expires: new Date(Date.now() + 1000*60*60*24*7) // 7 days
    })

    res.status(200).json({
        message: "User logged in successfully",
        user
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')

    res.status(200).json({
        message: "User logged out successfully"
    })
})

module.exports = router