import Manager from './Manager/NotesManager.js'
import Storage from './Data/Storage.js';
/* import Note from './DataModel/Note.js'; */
import NoteUI from './UI/NoteUI.js'

class NotesApp {
    constructor() {
        this.app = document.querySelector('#root');
        this.noteArea = document.querySelector(".notes-area");
        this.tabName = document.querySelector(".tab");
        this.inHome = true;
        this.inTrash = false;
        this.isEditing = false;
        this.currentTagView = "all"
        this.editingNote;
        this.domREF;
        this.timer;
        this.manager = new Manager();
        this.ui = new NoteUI();
        this.initApp();
    }

    initApp() {
        this.domREF = this.getDOMReference();
        this.initAppEvents();
        this.tabName.textContent = "Dashboard";
    }

    getDOMReference() {
        return {
            searchBar: document.querySelector('.search-container'),
            searchInput: document.querySelector('#search'),
            searchShortcut: document.querySelector(".search-shortcut"),
            themeToggle: document.querySelector('.theme-toggle'),
            dialog: document.querySelector("dialog"),
            colorOptions: [...document.querySelectorAll(".color-option-radio")],
            tagViewOptions: [...document.querySelectorAll(".tag-view-radio")],
            btnHome: document.querySelector(".home-btn"),
            btnTrash: document.querySelector(".trash-btn")
        }
    }

    initAppEvents() {
        /* Storage.clear(); */
        this.displayNotesForActiveTab();

        // Event Listener for tag view changes
        this.activateTagViewEvents();

        // Event Listener for Search Bar
        this.activateSearchEvents();

        // Event Listener for KEYDOWN events 
        this.activateKeyboardEvents();

        // Event Listeners for CLICK events
        this.activateClickEvents();
    };

    activateClickEvents() {
        document.addEventListener("click", (e) => {
            if (e.target.closest(".theme-toggle")) this.switchTheme(this.domREF.themeToggle);

            if (e.target.closest(".btn-add-note") && !this.inTrash) this.showNoteModal();

            if (e.target.closest(".btn-cancel")) {
                e.preventDefault();
                this.closeNoteModal(...this.getNoteModalInputs());
            };

            if (e.target.closest(".btn-save")) {
                e.preventDefault();
                if (!this.isEditing) this.createNewNote(...this.getNoteModalInputs());
                
                if (this.isEditing) this.updateNote(...this.getNoteModalInputs());
            };

            if (e.target.closest(".home-btn")) this.switchTab(e);

            if (e.target.closest(".trash-btn")) this.switchTab(e);

            if (e.target.closest(".btn-star")) this.bookmarkNotes(e);

            if (e.target.closest(".btn-edit")) this.enterEditMode(e);

            if (e.target.closest(".btn-del")) this.deleteNote(e);

            if (e.target.closest(".btn-restore")) this.restoreTrashedNotes(e);
        });
    };

    activateKeyboardEvents() {
        document.addEventListener("keydown", (e) => {
            if (e.metaKey && e.key === "k") {
                e.preventDefault();
                this.domREF.searchInput.focus();
            }
        
            if (e.key === "Escape" && this.domREF.searchInput.value === "") this.domREF.searchInput.blur();
        });
    };

    activateTagViewEvents() {
        this.domREF.tagViewOptions.forEach(input => {
            input.addEventListener("change", (e) => {
                if (e.target.checked) {
                    this.currentTagView = e.target.value;
                    this.displayNotesForActiveTab();
                }
            });
        });
    };

    activateSearchEvents() {
        this.domREF.searchInput.addEventListener('focus', () => this.activateSearch());

        this.domREF.searchInput.addEventListener('blur', () => this.deactivateSearch());

        this.domREF.searchInput.addEventListener('input', () => this.performNoteSearch());
    };

    activateSearch() {
        this.domREF.searchBar.classList.add('active');
        this.domREF.searchShortcut.classList.add('hide');
    };

    deactivateSearch() {
        this.domREF.searchBar.classList.remove('active');
        this.domREF.searchShortcut.classList.remove('hide');
    };

    switchTheme(toggle) {
        document.querySelector('.toggle-ball').classList.toggle('active');
        toggle.classList.toggle('active');
        this.app.classList.toggle('dark-mode');
    };

    getNoteColor() {
        let color = '';

        if (!this.isEditing) {
            const checkedInput = this.domREF.colorOptions.find(itm => itm.checked);
            if (checkedInput) {
                const label = checkedInput.parentElement;
                const colorProperty = label.dataset.color;
                color = `var(${colorProperty})` || '';
            }
        }
        
        if (this.isEditing) {
           const noteFooter = this.editingNote.querySelector(".note-footer");
           color = noteFooter.style.backgroundColor;
        }

        return color;
    };

    getNoteModalInputs() {
        const noteTitle = this.domREF.dialog.querySelector("#note-form-heading");
        const noteContent = this.domREF.dialog.querySelector("#note-form-text");
        const noteTags = this.domREF.dialog.querySelector("#note-tags");

        return [noteTitle, noteContent, noteTags];
    };

    showNoteModal() {
        const formHead = this.domREF.dialog.querySelector(".form-head");
        const formInputs = this.getNoteModalInputs();
        let noteColor =  this.getNoteColor();

        formHead.style.backgroundColor = noteColor;
        this.domREF.dialog.showModal();
        formInputs[0].focus();

        if (this.isEditing) {
            formInputs[0].value = this.editingNote.querySelector("h3").textContent;
            formInputs[1].value = this.editingNote.querySelector("textarea").value;
            formInputs[2].value = this.manager.getAllNotes().find(note => note.id === this.editingNote.dataset.id).tags;
        }
    };

    closeNoteModal(elm1, elm2, elm3) {
        elm1.value = '';
        elm2.value = '';
        elm3.value = '';
        this.domREF.dialog.close();
        this.isEditing = false;
        this.editingNote = '';
    };

    createNewNote(title, content, tags) {
        const noteColor = this.getNoteColor();
        const noteTitle = title.value || 'Untitled';
        const noteContent = content.value;
        const noteTags = tags.value;

        if (content) {
            const newNote = this.manager.create(noteTitle, noteContent, noteTags, noteColor);
            this.ui.renderNote(newNote, this.noteArea);
            this.closeNoteModal(title, content, tags);
        }
    };

    enterEditMode(e) {
        this.isEditing = true;
        this.editingNote = e.target.closest('.note');
        this.showNoteModal();
    };

    bookmarkNotes(event) {
        const note = event.target.closest(".note");
        note.classList.toggle("starred");
        this.manager.toggleStar(note.dataset.id);
    };

    updateNote(title, content, tags) {
        const noteID = this.editingNote.dataset.id;
        const noteTitle = this.editingNote.querySelector("h3");
        const noteContent = this.editingNote.querySelector("textarea");

        noteTitle.textContent = title.value;
        noteContent.value = content.value;
        
        this.manager.update(noteID, title.value, content.value, tags.value);
        this.closeNoteModal(title, content, tags);
    };

    deleteNote(event) {
        const parent = event.target.closest(".note");
        parent.remove();

        if (!this.inTrash) this.manager.softDelete(parent.dataset.id);

        if (this.inTrash) this.manager.hardDelete(parent.dataset.id);
    };

    restoreTrashedNotes(event) {
        const note = event.target.closest(".note");
        note.remove();
        this.manager.restoreNote(note.dataset.id);
    };

    switchTab(event) {
        if (event.target.closest('.home-btn')) {
            this.inHome = true;
            this.inTrash = false;
            this.tabName.textContent = "Dashboard";
        }

        if (event.target.closest('.trash-btn')) {
            this.inHome = false;
            this.inTrash = true;
            this.tabName.textContent = "Trash";
        }
        this.displayNotesForActiveTab();
    };

    performNoteSearch() {
        const delay = 750;
        const tab = this.inHome ? 'dashboard' : 'trash';
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            const query = this.domREF.searchInput.value;
            const result = this.manager.geSearchParameters(query, tab);
            this.noteArea.innerHTML = '';
            result.forEach(note => this.ui.renderNote(note, this.noteArea));
        }, delay);
    };

    /* clearAllNotes() {

    } */

    updateActiveTabButton() {
        if (this.inHome && !this.domREF.btnHome.classList.contains("btn-active")) {
            this.domREF.btnHome.classList.add("btn-active");
            this.domREF.btnTrash.classList.remove("btn-active");
        }
        
        if (this.inTrash && !this.domREF.btnTrash.classList.contains("btn-active")) {
            this.domREF.btnTrash.classList.add("btn-active");
            this.domREF.btnHome.classList.remove("btn-active");
        }
    };

    getNotesbyTags() {
        switch (this.currentTagView) {
            case "bookmarks":
                return this.manager.getStarredNotes();
            case "work":
                return this.manager.getWorkNotes();
            case "personal":
                return this.manager.getPersonalNotes();
            case "all":
            default:
                return this.manager.getAllNotes();
        }
    };

    displayNotesForActiveTab() {
        const allNotes = this.getNotesbyTags();

        if (this.inHome && !this.inTrash) {
            const activeNotes = allNotes.filter(note => !note.isTrashed);
            this.noteRenderer(activeNotes);
        };

        if (this.inTrash && !this.inHome) {
            const deletedNotes = allNotes.filter(note => note.isTrashed);
            this.noteRenderer(deletedNotes);
        };

        this.updateActiveTabButton();
    };

    noteRenderer(notes) {
        this.noteArea.innerHTML = "";
        notes.forEach(note => this.ui.renderNote(note, this.noteArea));
    }
}

const App = new NotesApp();