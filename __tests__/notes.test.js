const fs = require('fs');
const { createNewNote } = require('../lib/notes');
const { notes } = require('../db/db.json');

test('creates a new note', () => {
    const note = createNewNote({ title: 'Title', text: 'Text'}, notes);

    expect(note.title).toBe('Title');
    expect(note.text).toBe('Text');
});