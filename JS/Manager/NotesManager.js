import Note from '../DataModel/Note.js'
import NotesStorage from '../Data/Storage.js';

class NotesManager {
    constructor() {
        this.notes = [];
        this.deletedNotes = [];
    };

    create(title, content, color) {
        const note = new Note(title, content, color);
        this.notes.push(note);
        /* this.notes.unshift(note); */
        /* this.save(this.notes, this.deletedNotes); */
        return note;
    };

    read(id) {
        return this.notes.find(note => note.id === id);
    };

    update(id, title, content) {
        const note = this.read(id);
        if (note) {
            note.update(title, content);
            return note;
        }
        return null;
    };

    getAll() {
        return NotesStorage.load('notes');
    };

    getDeletedNotes() {
        return NotesStorage.load('trash');
    };

    saveNotes() {
        const savedData = this.getAll();
        savedData.push(...this.notes);
        console.log(savedData);
        NotesStorage.save('notes', savedData);

        this.notes = [];
    };

    setTrash(deletedNotes) {
        const savedTrash = this.getDeletedNotes();
        savedTrash.push(...deletedNotes);
        console.log(savedTrash);
        NotesStorage.save('trash', savedTrash);

        this.deletedNotes = [];
    };

    softDelete(id) {
        const savedNotes = this.getAll();
        const noteIndex = savedNotes.findIndex(note => note.id === id);

        this.deletedNotes.push(savedNotes[noteIndex]);
        savedNotes[noteIndex] = Note.createSkeleton(id);

        NotesStorage.save('notes', savedNotes);
        this.setTrash(this.deletedNotes);
    };

    hardDelete(id) {
        const noteIndexOnMain = this.notes.findIndex(note => note.id === id);
        const noteIndexOnTrash = this.deletedNotes.findIndex(note => note.id === id);

        if (noteIndexOnMain > -1 && noteIndexOnTrash > -1) {
            this.notes.splice(noteIndexOnMain, 1);
            this.deletedNotes.splice(noteIndexOnTrash, 1);
        }

        return null;
    };

    search(query) {
        return this.notes.filter(note => {
            note.title.toLowerCase().includes(query.toLowerCase()) || 
            note.content.toLowerCase().includes(query.toLowerCase());
        });
    };
}

export default NotesManager;