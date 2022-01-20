const router = require('express').Router();
const { createNewNote } = require('../../lib/notes');
const { Notes } = require('../../db/db.json');



router.post('/notes', (req, res) => {
    const newNote = createNewNote(req.body, Notes);
    res.json(newNote);
});



module.exports = {
    router
}; 