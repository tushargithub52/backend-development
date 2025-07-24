const express = require('express')
const multer = require('multer')
const uploadFile = require('../service/storage.service')
const songModel = require('../models/song.model')
const router = express.Router();

//middleware for handling form data
const upload = multer({storage: multer.memoryStorage()})

router.post('/songs', upload.single('audio'), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    const fileData = await uploadFile(req.file);
    console.log(fileData)

    const song = await songModel.create({
        title: req.body.title,
        artist: req.body.artist,
        mood: req.body.mood,
        audio: fileData.url,
    })

    res.status(201).json({
        message: "Song uploaded successfully",
        song: song
    })
})

router.get('/songs', async (req, res) => {
    const {mood} = req.query;

    const songs = await songModel.find({
        mood:mood
    })

    res.status(200).json({
        message: songs.length > 0 ? "Songs fetched successfully" : "No songs found",
        songs: songs
    })
})

module.exports = router