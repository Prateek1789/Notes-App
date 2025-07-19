import Note from '../DataModel/Note.js'
import NotesStorage from '../Data/Storage.js';

class NotesManager {
    constructor() {
        this.notes = [];
        this.deletedNotes = [];
    };

    create(title, content, color) {
        const note = new Note('', title, content, color);
        this.notes.push(note);
        return note;
        /* this.notes.unshift(note);
        this.save(this.notes, this.deletedNotes); */
    };

    update(id, title, content) {
        const savedNotes = this.getAll();
        const noteIndex = savedNotes.findIndex(note => note.id === id);

        if (noteIndex > -1) {
            const note = savedNotes[noteIndex];
            savedNotes[noteIndex] = new Note(id, title, content, note.color, note.createdAt, note.createdOn);
            NotesStorage.save('notes', savedNotes);
        };
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
        NotesStorage.save('notes', savedData);

        this.notes = [];
    };

    setTrash(deletedNotes) {
        const savedTrash = this.getDeletedNotes();
        savedTrash.push(...deletedNotes);
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