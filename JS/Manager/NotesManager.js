import Note from '../DataModel/Note.js'

class NotesManager {
    constructor() {
        this.notes = [];
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

    delete(id) {
        const noteIndex = this.notes.findIndex(note => note.id === id);
        if(noteIndex > -1) return this.notes.splice(noteIndex, 1)[0];
        return null;
    };

    getAll() {
        return [...this.notes];
    };

    search(query) {
        return this.notes.filter(note => {
            note.title.toLowerCase().includes(query.toLowerCase()) || 
            note.content.toLowerCase().includes(query.toLowerCase());
        });
    }
}

export default NotesManager;