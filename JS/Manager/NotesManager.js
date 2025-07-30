import Note from '../DataModel/Note.js'
import NotesStorage from '../Data/Storage.js';

class NotesManager {
    create(title, content, tags, color) {
        const note = new Note('', title, content, tags, color);
        this.saveNote(note);
        return note;
    };

    update(id, title, content, tags) {
        const savedNotes = this.getAllNotes();
        const noteIndex = savedNotes.findIndex(note => note.id === id);

        if (noteIndex > -1) {
            const note = savedNotes[noteIndex];
            savedNotes[noteIndex] = new Note(id, title, content, tags, note.color, note.createdAt, note.createdOn);
            NotesStorage.save(savedNotes);
        };
        return null;
    };

    getAllNotes() {
        return NotesStorage.load();
    };

    getStarredNotes() {
        return this.getAllNotes().filter(note => note.isStarred);
    }

    getWorkNotes() {
        return this.getAllNotes().filter(note => note.tags?.toLowerCase().includes("work"));
    }

    getPersonalNotes() {
        return this.getAllNotes().filter(note => note.tags?.toLowerCase().includes("personal"));
    }

    saveNote(note) {
        const savedNotes = this.getAllNotes();
        savedNotes.unshift(note);
        NotesStorage.save(savedNotes);
    };

    toggleStar(id) {
        const savedNotes = this.getAllNotes();
        const noteIndex = savedNotes.findIndex(note => note.id === id);
        if (noteIndex > -1) {
            savedNotes[noteIndex].isStarred = !savedNotes[noteIndex].isStarred;
            NotesStorage.save(savedNotes);
        }
    }

    softDelete(id) {
        const savedNotes = this.getAllNotes();
        const noteIndex = savedNotes.findIndex(note => note.id === id);
        savedNotes[noteIndex].isTrashed = true;

        NotesStorage.save(savedNotes);
    };

    hardDelete(id) {
        const savedNotes = this.getAllNotes();
        const mainIndex = savedNotes.findIndex(note => note.id === id);

        if (mainIndex > -1) {
            savedNotes.splice(mainIndex, 1);
            NotesStorage.save(savedNotes);
        }

        return null;
    };

    restoreNote(id) {
        const savedNotes = this.getAllNotes();
        const indexMain = savedNotes.findIndex(note => note.id === id);
        savedNotes[indexMain].isTrashed = false;

        NotesStorage.save(savedNotes);
    };

    geSearchParameters(query, tab) {
        const searchTerm = query.toLowerCase().trim();

        if (tab === 'dashboard') {
            const notes = this.getAllNotes().filter(note => !note.isTrashed);
            if (!query) return notes;

            return this.search(searchTerm, notes);
        }
        
        if (tab === 'trash') {
            const notes = this.getAllNotes().filter(note => note.isTrashed);
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