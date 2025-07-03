const express = require("express")

//server ko create krte hai 
const app = express()

//middleware to read the req.body data in json format
app.use(express.json());

//initialize the notes array
notes=[]

app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.json({
        message: "Notes added successfully",
        notes: notes,
    })
})

//server ko start krte hai 
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})