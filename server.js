const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config()

//const { clog } = require('./middleware/clog');
//const api = require('./routes/index.js');

const PORT = process.env.port || 12999;

const app = express();

// Import custom middleware, "cLog"
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

app.get('/api/notes/:id', (req, res) => {
    let dbNotes = JSON.parse(fs.readFileSync('./db/db.json','utf-8'))
    res.json(dbNotes[Number(req.params.id)])
    
});
  
app.post('/api/notes', (req, res) => {
    let dbNotes = JSON.parse(fs.readFileSync('./db/db.json','utf-8'))
    let note = req.body;
    let id = dbNotes.length.toString();
    note.id = id;
    dbNotes.push(note);

    fs.writeFileSync('./db/db.json', JSON.stringify(dbNotes));
    res.json(dbNotes);
    
});
// GET Route for feedback page
// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
// );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
