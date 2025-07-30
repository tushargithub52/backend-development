const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function authMiddleware(req, res, next){
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message: "Unauthorized access [token not found], please login"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
        
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token, please login again"
        })
    }
}

module.exports = authMiddleware;