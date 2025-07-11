const express = require('express')
const connectTODB = require('./src/db/db')
const noteModel = require("./src/models/note.model")

const app = express()
app.use(express.json())
connectTODB()

//CREATE Operation
app.post('/notes', async (req, res) => {
    const {title, content} = req.body;

    await noteModel.create({
        title, content
    })

    res.json({
        message: "Note created successfully"
    })
})

//READ Operation
app.get('/notes', async (req, res) => {
    const notes = await noteModel.find();

    res.json({
        notes
    })
})

//UPDATE Operation
app.patch('/notes/:id', async (req, res) => {
    let noteId = req.params.id;

    let updatedtitle = req.body.title;

    await noteModel.findOneAndUpdate({
        _id:noteId
    },{
        title: updatedtitle
    })

    res.json({
        message: "Note updated successfully"
    })
})


//DELETE Operation
app.delete('/notes/:id', async (req, res) => {
    let noteId = req.params.id;

    await noteModel.deleteOne({
        _id: noteId
    })

    res.json({
        message: "Note deleted successfully"
    })
})



app.listen(3000, () => {
    console.log("Server is running on port 3000")
})