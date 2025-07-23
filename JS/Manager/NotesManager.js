import Note from '../DataModel/Note.js'
import NotesStorage from '../Data/Storage.js';

class NotesManager {
    constructor() {
        this.notes = [];
        this.deletedNotes = [];
    };

    create(title, content, tags, color) {
        const note = new Note('', title, content, tags, color);
        this.notes.push(note);
        return note;
        /* this.notes.unshift(note);
        this.save(this.notes, this.deletedNotes); */
    };

    update(id, title, content, tags) {
        const savedNotes = this.getAll();
        const noteIndex = savedNotes.findIndex(note => note.id === id);

        if (noteIndex > -1) {
            const note = savedNotes[noteIndex];
            savedNotes[noteIndex] = new Note(id, title, content, tags, note.color, note.createdAt, note.createdOn);
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
        const savedNotes = this.getAll();
        const trashNotes = this.getDeletedNotes();

        const mainIndex = savedNotes.findIndex(note => note.id === id);
        const trashIndex = trashNotes.findIndex(note => note.id === id);

        if (mainIndex > -1 && trashIndex > -1) {
            savedNotes.splice(mainIndex, 1);
            trashNotes.splice(trashIndex, 1);
            NotesStorage.save('notes', savedNotes);
            NotesStorage.save('trash', trashNotes);
        }

        return null;
    };

    restoreNote(id) {
        const savedNotes = this.getAll();
        const trashNotes = this.getDeletedNotes();
        const indexMain = savedNotes.findIndex(note => note.id === id);
        const note = trashNotes.find(note => note.id === id);
        savedNotes[indexMain] = note;

        NotesStorage.save('notes', savedNotes);
        NotesStorage.save('trash', trashNotes.filter(note => note.id !== id));
    }

    geSearchParameters(query, tab) {
        const searchTerm = query.toLowerCase().trim();

        if (tab === 'dashboard') {
            const notes = this.getAll().filter(note => !note.isTrashed);
            if (!query) return notes;

            return this.search(searchTerm, notes);
        }
        
        if (tab === 'trash') {
            const notes = this.getDeletedNotes();
            if (!query) return notes;

            return this.search(searchTerm, notes);
        }
    };

    search(query, noteArray) {
        return noteArray.filter(note => note.title?.toLowerCase().includes(query) || 
                                    note.content?.toLowerCase().includes(query) || 
                                    note.tags?.toLowerCase().includes(query));
    };
};

export default NotesManager;