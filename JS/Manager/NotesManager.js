import Note from '../DataModel/Note.js'

class NotesManager {
    constructor() {
        this.notes = [];
        this.deletedNotes = [];
    };

    create(title, content, color) {
        const note = new Note(title, content, color);
        this.notes.push(note);
        /* this.notes.unshift(note); */
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

    trash(id) {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        const note = this.read(id);
        this.deletedNotes.push(note);
        this.notes[noteIndex] = note.createSkeleton(id);
    }

    getAll() {
        return [...this.notes];
    };

    getDeletedNotes() {
        return [...this.deletedNotes];
    }

    delete(id) {
        const noteIndexOnMain = this.notes.findIndex(note => note.id === id);
        const noteIndexOnTrash = this.deletedNotes.findIndex(note => note.id === id);
        if (noteIndexOnMain > -1) return this.notes.splice(noteIndexOnMain, 1)[0];
        if (noteIndexOnTrash > -1) return this.deletedNotes.splice(noteIndexOnTrash, 1)[0];

        return null;
    };

    search(query) {
        return this.notes.filter(note => {
            note.title.toLowerCase().includes(query.toLowerCase()) || 
            note.content.toLowerCase().includes(query.toLowerCase());
        });
    }
}

export default NotesManager;