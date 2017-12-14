// requiring the fs node package to be able to read and write files from our app
const fs = require('fs');

var fetchNotes = () => {
    try {
        // sets a variable to the string version of our created note objects.
        var notesString = fs.readFileSync('notes-data.json');
        // returns the sting note object back to a js object to be able to read from.
        return JSON.parse(notesString);

    } catch (err) {
        return [];
    }

};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));

};
//function to add note 
var addNote = (title, body) => {
    var notes = fetchNotes();
    //structure of our note object to be sent to notes-data.json
    var note = {
        title,
        body
    };
    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        //pushes the new note made into the blank notes array to be read later
        notes.push(note);
        // writes a json string object to notes-data.json to be used later
        saveNotes(notes);
        return note;
    }

};
var getAll = () => {
    return fetchNotes();
};
var getNote = (title) => {
    var notes = fetchNotes();
    var searchedNotes = notes.filter((note) => note.title === title)
    return searchedNotes[0];
}
var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}
var logNote = (note) => {
    console.log('--');
    console.log(`Title:  ${note.title}`);
    console.log(`Body:  ${note.body}`);
    console.log('--');
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};