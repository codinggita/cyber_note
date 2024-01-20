const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let saved_notes = {
    cse: [
        {
          tag: "frontend",
          NoteId: 1,
        },
        {
            tag: "DSA",
            NoteId: 2,
        },
        {
            tag: "DBMS",
            NoteId: 3,
        },
        {
            tag: "backend",
            NoteId: 4,
        },
    ],
};

app.get("/", (req, res) => {
    res.send("Welcome to Cybernote");
});

// Route for new note
app.post("/saved_notes", (req, res) => {
    saved_notes.cse.push(req.body);
    res.send("Note added");
});

// Route for saved notes
app.get("/saved_notes", (req, res) => {
    res.json(saved_notes.cse);
});

// Route for searching notes by ID
app.get('/saved_notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = saved_notes.cse.find((c) => c.NoteId === id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

// Route for searching notes by tags
app.get('/saved_notes/tag/:tagName', (req, res) => {
    const tag = req.params.tagName;
    const notesWithTag = saved_notes.cse.filter((c) => c.tag === tag);

    if (notesWithTag.length > 0) {
        res.json(notesWithTag);
    } else {
        res.status(404).json({ error: 'Notes with the specified tag not found' });
    }
});

// Route for sharing a note
app.get('/saved_notes/:id/share', (req, res) => {
    const id = parseInt(req.params.id);
    const note = saved_notes.cse.find((c) => c.NoteId === id);

    if (note) {
        const shareableLink = `http://cybernote.com/note/${id}`;
        res.json({ shareableLink });
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});

// Handle 404 - Not Found
app.use((req, res) => {
    res.status(404).send('404 - Not Found');
  });
  
// Handle errors
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).send('500 - Server Error');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
