import Manager from './Manager/NotesManager.js'
import NoteUI from './UI/NoteUI.js'

class NotesApp {
    constructor() {
        this.app = document.querySelector('#root');
        this.noteArea = document.querySelector(".notes-area");
        this.tabName = document.querySelector(".tab");
        this.inHome = true;
        this.inTrash = false;
        this.isEditing = false;
        this.currentView = "all";
        this.currentSortOrder = "newest";
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
            sortBar: document.querySelector(".sort-bar"),
            sortBtn: document.querySelector(".menu-btn"),
            sortMenu: document.querySelector(".options-list"),
            btnHome: document.querySelector(".home-btn"),
            btnTrash: document.querySelector(".trash-btn")
        }
    }

    initAppEvents() {
        this.displayNotesForActiveTab();

        // Event Listener for Change Events in Sort Bar 
        this.activateSortBarEvents();

        // Event Listener for Search Bar
        this.activateSearchEvents();

        // Event Listener for KEYDOWN events 
        this.activateKeyboardEvents();

        // Event Listeners for CLICK events
        this.activateClickEvents();
    };

    activateClickEvents() {
        const actionMap = {
            'add-note': () => { if (!this.inTrash) this.showNoteModal(); },
            'open-dashboard': (e) => this.switchTab(e),
            'open-trash': (e) => this.switchTab(e),
            'cancel-note': (e) => {
                e.preventDefault();
                this.closeNoteModal(...this.getNoteModalInputs());
            },
            'confirm-note': (e) => {
                e.preventDefault();
                !this.editingNote ? this.createNewNote(...this.getNoteModalInputs()) : 
                                    this.updateNote(...this.getNoteModalInputs()); 
            },
            'toggle-theme': () => this.switchTheme(this.domREF.themeToggle),            
            'open-sort-menu': () => {
                const isPressed = this.domREF.sortBtn.ariaPressed;
                this.domREF.sortBtn.setAttribute('aria-pressed', `${isPressed === 'false' ? 'true' : 'false'}`);
                this.domREF.sortBtn.classList.toggle("active");
                this.domREF.sortMenu.classList.toggle("active");
            },
            'star-note': (e) => this.bookmarkNotes(e),
            'edit-note': (e) => this.enterEditMode(e),
            'delete-note': (e) => this.deleteNote(e),
            'restore-note': (e) => this.restoreTrashedNotes(e)
        };

        document.addEventListener("click", (e) => {
            const targetElement = e.target.closest('[data-action]');

            if (targetElement) {
                const actionName = targetElement.dataset.action;
                const action = actionMap[actionName];
                if (typeof action === 'function') action(e);
            }
        
            if (!e.target.closest('[data-action]') && this.domREF.sortBtn.classList.contains("active")) {
                this.domREF.sortBtn.setAttribute('aria-pressed', 'false');
                this.domREF.sortBtn.classList.remove("active");
                this.domREF.sortMenu.classList.remove("active");
            }
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

    activateSortBarEvents() {
        this.domREF.sortBar.addEventListener("change", (e) => {
            const target = e.target.closest("input");
            
            if (!target) return;

            const action = e.target.dataset.action;
            
            if (action === 'tag-view' && target.checked) {
                this.currentView = target.value;
                this.displayNotesForActiveTab();
            }
            else if (action === 'sort') {
                this.currentSortOrder = target.value;
                this.updateSortButton();
                this.displayNotesForActiveTab();
            }
        });
    };

    updateSortButton() {
        const text = this.currentSortOrder === "newest" ? "Newest First" : "Oldest First";
        this.domREF.sortBtn.querySelector("span").lastChild.textContent = text;
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
            this.ui.renderNote(newNote, this.noteArea, 'start');
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
            this.noteRenderer(result);
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
        switch (this.currentView) {
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
        notes.sort((a, b) => {
            const aKey = `${a.createdOn} ${a.createdAt}`;
            const bKey = `${b.createdOn} ${b.createdAt}`;

            if (this.currentSortOrder === "newest") {
                return bKey.localeCompare(aKey);
            }
            else {
                return aKey.localeCompare(bKey)
            }
        });

        const fragment = document.createDocumentFragment();
        notes.forEach(note => {
            const noteElm = this.ui.createNoteElement(note);
            fragment.appendChild(noteElm);
        });
        this.noteArea.innerHTML = '';
        this.noteArea.appendChild(fragment);
    }
};

const App = new NotesApp();