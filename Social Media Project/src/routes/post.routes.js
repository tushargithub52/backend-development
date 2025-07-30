const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const multer = require('multer')
const postController = require('../controllers/post.controller')

const router = express.Router()

const upload = multer({ storage: multer.memoryStorage() })

router.post('/', authMiddleware, upload.single('image'), postController)

module.exports = router