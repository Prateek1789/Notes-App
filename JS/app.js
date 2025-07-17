import Manager from './Manager/NotesManager.js'
/* import Storage from './Data/Storage.js';
import Note from './DataModel/Note.js'; */
import NoteUI from './UI/NoteUI.js'

class NotesApp {
    constructor() {
        this.app = document.querySelector('#root');
        this.noteArea = document.querySelector(".notes-area");
        this.manager = new Manager();
        this.ui = new NoteUI();
        this.elements = this.getAppElements();
        this.initialiseAppEvents();
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

    initialiseAppEvents() {

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

            if (e.target.closest(".btn-add-note")) this.openForm();

            if (e.target.closest(".btn-del")) this.handleDeleteNote(e);
        });
    };

    handleTheme(toggle) {
        document.querySelector('.toggle-ball').classList.toggle('active');
        toggle.classList.toggle('active');
        this.app.classList.toggle('dark-mode');
    };

    handleNoteColour() {
        const checkedInput = this.elements.colorOptions.find(itm => itm.checked);

        if (checkedInput) {
            const label = checkedInput.parentElement;
            const color = label.dataset.color || '';
            return color;
        }
    };

    handleFormListener() {
        const noteTitle = this.elements.dialog.querySelector("#note-form-heading");
        const noteContent = this.elements.dialog.querySelector("#note-form-text");

        this.elements.dialog.querySelector("form").addEventListener("click", (e) => {
            e.preventDefault();

            if (e.target.closest(".btn-cancel")) this.closeForm(noteTitle, noteContent);

            if (e.target.closest(".btn-save")) this.handleAddNote(noteTitle, noteContent);
        });
    };

    openForm() {
        let noteColor =  this.handleNoteColour();
        const formHead = this.elements.dialog.querySelector(".form-head");
        formHead.style.backgroundColor = `var(${noteColor})`;
        this.elements.dialog.showModal();
        this.elements.dialog.querySelector("#note-form-heading").focus();
    }

    closeForm(elm1, elm2) {
        elm1.value = '';
        elm2.value = '';
        this.elements.dialog.close();
    };

    handleAddNote(title, content) {
        const noteColor = this.handleNoteColour();
        const noteTitle = title.value || 'Untitled';
        const noteContent = content.value;

        if (content) {
            const newNote = this.manager.create(noteTitle, noteContent, noteColor);
            this.ui.renderNoteUI(newNote, this.noteArea);

            this.closeForm(title, content);
        }
    };

    handleEditNote() {

    }

    handleDeleteNote(event) {
        const parent = event.target.closest('.note');
        parent.remove();
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

    }

    saveNotes() {

    }
}

const App = new NotesApp();


// Kept old Appp class for reference and comparision 
/* class App {
    constructor() {
        this.app = document.querySelector(".app-container");
        this.searchArea = document.querySelector(".itm-2");
        this.searchInput = document.querySelector("#search");
        this.shortCutStr = document.querySelector(".search-shortcut");
        this.themeBall = document.querySelector(".toggle-ball");
        this.addNoteBtn = document.querySelector(".add-note-btn");
        this.noteArea = document.querySelector(".notes-area");
        this.noteGrid = document.querySelector(".note-container");
        this.noteOptions = [...document.querySelectorAll(".new-note-option")];
        this.noteTitle = '';
        this.isDarkMode = this.app.classList.contains("dark-mode");
        this.noteFactory = new NoteFactory();
        this.noteID = 0;
        this.init();
    };

    init() {
        document.addEventListener("keydown", e => {
            if (e.metaKey && e.key === "k") {
                e.preventDefault();
                this.activateSearch(true);
            }
            if (e.key === "Escape" && this.searchArea.classList.contains("active") && this.shortCutStr.classList.contains("active") && this.searchInput.value === "") {
                this.activateSearch(false);
            }
        });

        // Event listener to handle App click events
        document.addEventListener("click", e => {
            if (e.target === this.searchInput) {
                this.activateSearch(true);
            }

            if (!e.target.closest("#search")) {
                this.activateSearch(false);
            }

            if (e.target.closest(".theme-toggle")) {
                this.setTheme();
                let isPressed = e.target.getAttribute("aria-pressed") == "true";
                e.target.setAttribute("aria-pressed", !isPressed ? "true" : "false");
            }

            if (e.target.closest(".new-note-option")) {
                this.newNoteSelector(e);
            }
        
            if (e.target.closest(".add-note-btn")) {
                this.addNote();
            }
        });
    };

    activateSearch(bool) {
        if (bool) {
            this.searchArea.classList.add("active");
            this.shortCutStr.classList.add("active");
            this.searchInput.focus();
        }
        else {
            this.searchArea.classList.remove("active");
            this.shortCutStr.classList.remove("active");
            this.searchInput.blur();
        }
    }

    newNoteSelector(e) {
        // Get colour option clicked by user
        const clickedElement = e.target.closest(".new-note-option");
        const colourCircle = clickedElement.querySelector(".clr-circle");
        
        // If no colour option is selected, return early
        if (!clickedElement) return;
        
        // Toggle Active class on the selected note option
        let isActive = clickedElement.classList.contains("active");
        if (isActive) {
            clickedElement.classList.remove("active");
            colourCircle.classList.remove("active");
        }
        else {
            clickedElement.classList.add("active");
            colourCircle.classList.add("active");
        }
        // isActive ? clickedElement.classList.remove("active") : clickedElement.classList.add("active"); 
        
        // Remove 'active' class from unselected note options
        this.noteOptions.forEach(option => {
            const colourCircle = option.querySelector(".clr-circle");
            if (option !== clickedElement && option.classList.contains("active") && colourCircle.classList.contains("active")) {
                option.classList.remove("active");
                colourCircle.classList.remove("active");
            };
        });
    }

    addNote() {
        const date = DateUtility.getCurrentDate();
        // Get the note title from the input field
        this.noteOptions.forEach(itm => {
            // Checks which note option is selected
            if (itm.classList.contains("active")) {
                // Gets input field withing the selected note option gets the value, If no value is entered, sets default title
                const titleInput = itm.querySelector(".note-title");
                this.noteTitle = titleInput.value ? titleInput.value : `Untitled ${this.noteID + 1}`;
            }
        });
        // Check if at least one colour option is selected
        this.noteOptions.forEach((itm, idx) => {
            if (itm.classList.contains("active")) {
                const colour = this.noteFactory.getColourForMode(this.isDarkMode, idx);
                this.noteGrid.appendChild(this.noteFactory.createNote(this.noteID, this.noteTitle, colour, date));
                this.noteID++;
            }
        });
    }
    
    setTheme() {
        this.app.classList.toggle("dark-mode");
        this.themeBall.classList.toggle("active");
        this.isDarkMode = this.app.classList.contains("dark-mode");
        document.querySelector(".moon").classList.toggle("active");
        this.updateAllNotesTheme();
    }

    updateAllNotesTheme() {
        // Select all existing note 
        const allNotes = this.noteArea.querySelectorAll(".note");
        const noteColourMap = this.noteFactory.getColourMap();

        // Iterate over each note and retrieve colour hex code from dataset
        allNotes.forEach(note => {
            let currentColour = note.dataset.hexColor;

            if (this.isDarkMode) {
                note.style.backgroundColor = `${noteColourMap.get(currentColour)}`;
                note.dataset.hexColor = `${noteColourMap.get(currentColour)}`;
                currentColour = note.dataset.hexColor;
            }
            else {
                let originalColour;
                for (const [key, val] of noteColourMap.entries()) {
                    if (val === currentColour) originalColour = key;
                }
                note.style.backgroundColor = originalColour;
                note.dataset.hexColor = `${originalColour}`;
            }
        });
    }
}

const myApp = new App(); */
