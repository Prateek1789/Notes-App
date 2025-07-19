class NotesStorage {
    static save(itm, items) {
        localStorage.setItem(itm, JSON.stringify(items));
    }

    static load(itm) {
        const data = localStorage.getItem(itm);
        return data ? JSON.parse(data) : [];
    }

    static clear() {
        localStorage.removeItem('notes');
        localStorage.removeItem('trash');
    }
}

export default NotesStorage;