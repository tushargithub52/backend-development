const generateCaption = require('../service/ai.service');
const uploadFile = require('../service/storage.service');
const { v4: uuidv4 } = require('uuid');
const postModel = require('../models/post.model')

async function createpostController(req, res) {
    try {
        const file = req.file;
        if (!file || !file.buffer) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const base64ImageFile = Buffer.from(file.buffer).toString('base64');

        const caption = await generateCaption(base64ImageFile);

        const result = await uploadFile(file.buffer, `${uuidv4()}`);

        const post = await postModel.create({
            image: result.url,
            caption: caption,
            user: req.user._id,
        })

        res.status(200).json({
            message: "Post created successfully",
            post: post,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

module.exports = {createpostController};