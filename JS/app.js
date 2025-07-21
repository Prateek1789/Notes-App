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
        this.editingNote;
        this.elements;
        this.manager = new Manager();
        this.ui = new NoteUI(this.manager);
        this.initApp();
    }

    initApp() {
        this.elements = this.getAppElements();
        this.initAppEvents();
        this.tabName.textContent = "Home";
    }

    getAppElements() {
        return {
            searchBar: document.querySelector('.search-container'),
            searchInput: document.querySelector('#search'),
            searchShortcut: document.querySelector(".search-shortcut"),
            themeToggle: document.querySelector('.theme-toggle'),
            dialog: document.querySelector("dialog"),
            colorOptions: [...document.querySelectorAll(".input-radio")]
        }
    }

    initAppEvents() {
        /* Storage.clear(); */
        this.loadNotes();
        // Event Listener for KEYDOWN events 
        document.addEventListener("keydown", (e) => {
            if (e.metaKey && e.key === "k") {
                e.preventDefault();
                this.handleSearchNote(true, this.elements.searchBar, this.elements.searchInput, this.elements.searchShortcut);
            }

            if (e.key === "Escape" && 
                this.elements.searchBar.classList.contains("active") && 
                this.elements.searchShortcut.classList.contains("hide") && 
                this.elements.searchInput.value === "") {

                this.handleSearchNote(false, this.elements.searchBar, this.elements.searchInput, this.elements.searchShortcut);
            }
        });

        this.handleFormListener();
        // Event Listeners for CLICK events
        document.addEventListener("click", (e) => {
            if (e.target.closest(".search-container")) this.handleSearchNote(true, this.elements.searchBar, this.elements.searchInput, this.elements.searchShortcut);

            if (!e.target.closest(".search-container")) this.handleSearchNote(false, this.elements.searchBar, this.elements.searchInput, this.elements.searchShortcut);

            if (e.target.closest(".theme-toggle")) this.handleTheme(this.elements.themeToggle);

            if (e.target.closest(".btn-add-note") && !this.inTrash) this.openForm();

            if (e.target.closest(".home-btn")) this.handleSwitchTabs(e);

            if (e.target.closest(".trash-btn")) this.handleSwitchTabs(e);

            if (e.target.closest(".btn-edit")) this.handleEditForm(e);

            if (e.target.closest(".btn-del")) this.handleDeleteNote(e);

            if (e.target.closest(".btn-restore")) this.handleRestore(e);
        });
    };

    handleTheme(toggle) {
        document.querySelector('.toggle-ball').classList.toggle('active');
        toggle.classList.toggle('active');
        this.app.classList.toggle('dark-mode');
    };

    handleNoteColour() {
        let color = '';

        if (!this.isEditing) {
            const checkedInput = this.elements.colorOptions.find(itm => itm.checked);
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

    handleFormListener() {
        const noteTitle = this.elements.dialog.querySelector("#note-form-heading");
        const noteContent = this.elements.dialog.querySelector("#note-form-text");

        this.elements.dialog.querySelector("form").addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target.closest(".btn-cancel")) this.closeForm(noteTitle, noteContent);

            if (e.target.closest(".btn-save") && !this.isEditing) this.handleAddNote(noteTitle, noteContent);

            if (e.target.closest(".btn-save") && this.isEditing) this.handleEditNote(noteTitle, noteContent);
        });
    };

    openForm() {
        const formHead = this.elements.dialog.querySelector(".form-head");
        const titleElement = this.elements.dialog.querySelector("#note-form-heading");
        const contentElement = this.elements.dialog.querySelector("#note-form-text");
        let noteColor =  this.handleNoteColour();

        formHead.style.backgroundColor = noteColor;
        this.elements.dialog.showModal();
        titleElement.focus();

        if (this.isEditing) {
            const noteTitle = this.editingNote.querySelector("h3");
            const noteContent = this.editingNote.querySelector("textarea");
            titleElement.value = noteTitle.textContent;
            contentElement.value = noteContent.value;
        }
    }

    closeForm(elm1, elm2) {
        elm1.value = '';
        elm2.value = '';
        this.elements.dialog.close();
        this.isEditing = false;
        this.editingNote = '';
    };

    handleAddNote(title, content) {
        const noteColor = this.handleNoteColour();
        const noteTitle = title.value || 'Untitled';
        const noteContent = content.value;

        if (content) {
            const newNote = this.manager.create(noteTitle, noteContent, noteColor);
            this.ui.renderNote(newNote, this.noteArea);
            this.saveNotes();
            this.closeForm(title, content);
        }
    };

    handleEditForm(e) {
        this.isEditing = true;
        this.editingNote = e.target.closest('.note');
        this.openForm();
    }

    handleEditNote(title, content) {
        const noteID = this.editingNote.dataset.id;
        const noteTitle = this.editingNote.querySelector("h3");
        const noteContent = this.editingNote.querySelector("textarea");

        noteTitle.textContent = title.value;
        noteContent.value = content.value;
        
        this.manager.update(noteID, title.value, content.value);
        this.closeForm(title, content);
    }

    handleDeleteNote(event) {
        const parent = event.target.closest(".note");
        parent.remove();

        if (!this.inTrash) this.manager.softDelete(parent.dataset.id);

        if (this.inTrash) this.manager.hardDelete(parent.dataset.id);

    }

    handleRestore(event) {
        const parent = event.target.closest(".note");
        parent.remove();
        this.manager.restoreNote(parent.dataset.id);
    }

    handleSwitchTabs(event) {
        if (event.target.closest('.home-btn')) {
            this.inHome = true;
            this.inTrash = false;
            this.tabName.textContent = "Home";
        }

        if (event.target.closest('.trash-btn')) {
            this.inHome = false;
            this.inTrash = true;
            this.tabName.textContent = "Trash";
        }

        this.loadNotes();
    }

    handleSearchNote(isActive, element, input, shortcut) {
        if (isActive) {
            element.classList.add('active');
            shortcut.classList.add('hide');
            input.focus();
        }
        else {
            element.classList.remove('active');
            shortcut.classList.remove('hide');
            input.blur();
        }
    }

    handlClearAll() {

    }

    loadNotes() {
        if (this.inHome && !this.inTrash) this.ui.renderMainNotes(this.noteArea);

        if (this.inTrash && !this.inHome) this.ui.renderDeletedNotes(this.noteArea);
    }

    saveNotes() {
        this.manager.saveNotes();
    }
}

const App = new NotesApp();