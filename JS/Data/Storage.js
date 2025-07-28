class NotesStorage {
    static save(allNotes) {
        localStorage.setItem("notes", JSON.stringify(allNotes));
    }

    static load() {
        const data = localStorage.getItem("notes");
        return data ? JSON.parse(data) : [];
    }

    static clear() {
        localStorage.removeItem('notes');
    }
}

export default NotesStorage;