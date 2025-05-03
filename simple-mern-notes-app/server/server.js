const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());    

// db connection
mongoose.connect(
    'mongodb+srv://abc:123@cluster0.atrompv.mongodb.net/'
).then(
    console.log('Connected to MongoDB')
).catch(
    (err)=>{
        console.log(err);
    }
);

//schema
const noteSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Note = mongoose.model('Note', noteSchema);

//routes and controllers

app.get('/api/notes', async(req, res)=>{
    try{
        const notes = await Note.find();
        res.status(200).json(notes);
    }
    catch(err){
        res.status(500).json(err);
    }
})

app.post('/api/notes', async(req, res)=>{
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    });
    try{
        const savedNote = await note.save();
        res.status(200).json(savedNote);
    }
    catch(err){
        res.status(500).json(err);
    }
})



app.listen(5000, () => console.log('Server running on port 5000'));



