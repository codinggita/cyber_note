const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let saved_notes = {
    cse: [
        {
          tag: "frontend",
          NoteId: 1,
          averagerating: 1,
        },
        {
            tag: "DSA",
            NoteId: 2,
            averagerating: 1,
        },
        {
            tag: "DBMS",
            NoteId: 3,
            averagerating: 1,
        },
        {
            tag: "backend",
            NoteId: 4,
            averagerating: 1,
        },
    ],
};

app.get("/", (req, res) => {
    res.send("Welcome to Cybernote");
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
// Route for new note
app.post("/saved_notes", (req, res) => {
    saved_notes.cse.push(req.body);
    res.send("Note added");
});
//upadte rating
app.post("/saved_notes/:tag/ -rating", (req, res) => {
    const tag = saved_notes.cse.find((c) => c.tag === req.params.tag);
    if (!tag) {
        return res.status(404).json({ error: "Tag not found" });
    }
    const rating = parseFloat(req.body.averagerating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
        return res.status(400).json({ error: "Invalid or missing rating value" });
    }
    if (tag.userRated > 0) {
        tag.averagerating =
            (tag.averagerating * tag.userRated + rating) /
            (tag.userRated + 1);
        tag.userRated++;
        res.json({ message: "Rating updated", newAverageRating: tag.averagerating });
    } else {
        res.status(500).json({ error: "Unexpected error in calculating average rating" });
    }
});
 // Route for updating specific properties of a note using PATCH
app.patch('/saved_notes/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProperties = req.body;

    // Find the note with the specified NoteId
    const noteToUpdate = saved_notes.cse.find((c) => c.NoteId === id);

    if (noteToUpdate) {
        // Update only the specified properties
        for (const property in updatedProperties) {
            if (Object.prototype.hasOwnProperty.call(updatedProperties, property)) {
                noteToUpdate[property] = updatedProperties[property];
            }
        }

        res.json({ message: 'Note updated successfully', updatedNote: noteToUpdate });
    } else {
        res.status(404).json({ error: 'Note not found' });
    }
});


// Route for deleting notes by tagName
app.delete('/saved_notes/tag/:tagName', (req, res) => {
    const tagToDelete = req.params.tagName;
    
    // Filter out notes with the specified tag
    saved_notes.cse = saved_notes.cse.filter((c) => c.tag !== tagToDelete);

    res.json(saved_notes.cse);
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
