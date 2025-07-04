const express = require("express")

//server ko create krte hai 
const app = express()

//middleware to read the req.body data in json format
app.use(express.json());

//initialize the notes array
notes=[]

//show notes operation(READ)
app.get('/notes', (req, res) => {
    console.log(notes)
    res.json(notes)
})

//create notes operation(CREATE)
app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message: "Notes added successfully",
        notes: notes,
    })
})

//delete notes operation(DELETE)
app.delete('/notes/:index', (req, res) => {
    const index = req.params.index;

    delete notes[index];

    res.json({
        message: "Note deleted successfully"
    })
})

//update notes operation(UPDATE)
app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;

    const { title } = req.body

    notes[index].title = title;

    res.json({
        message:"Note updated successfully"
    })
})

//server ko start krte hai 
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})