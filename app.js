class App {
    constructor() {
        this.app = document.querySelector(".app-container");
        this.themeBall = document.querySelector(".toggle-ball");
        this.addNoteBtn = document.querySelector(".add-note-btn");
        this.noteArea = document.querySelector(".notes-area");
        this.noteOptions = [...document.querySelectorAll(".new-note-option")];
        this.noteTitle = '';
        this.isDarkMode = this.app.classList.contains("dark-mode");
        this.noteColourMap = new Map([
            ['#64adff',' #2c81e3'],
            ['#ffc681',' #e99733'],
            ['#ff7e7e',' #e02929']
        ]);
        this.noteID = 0;
        this.init();
    };

    init() {
        // Event listener to handle App click events
        this.app.addEventListener("click", e => {
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

    createNote(id, title, colour, dateObj) {
        const note = document.createElement("div");
        note.setAttribute("class", "note");
        note.innerHTML = `<div class="note-header">
                            <span class="note-date">${dateObj.date}</span>
                            <h3>${title}</h3>
                          </div>
                          <textarea name="content" id="note-${id}" class="note-content" autofocus="on"></textarea>
                          <div class="note-footer">
                                <span class="note-time">${dateObj.time}, ${dateObj.day}</span>
                                <ul class="note-actions-list">
                                    <li class="note-action-items">
                                        <button type="button" class="note-action-btn btn-star-note">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/></svg>
                                        </button>
                                    </li>
                                    <li class="note-action-items">
                                        <button type="button" class="note-action-btn btn-edit-content">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                                        </button>
                                    </li>
                                    <li class="note-action-items">
                                        <button type="button" class="note-action-btn btn-del">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                        </button>
                                    </li>
                                </ul>
                          </div>`;

        note.dataset.hexColor = `${colour}`;
        note.style.backgroundColor = `${colour}`;
        return note;
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
        /* isActive ? clickedElement.classList.remove("active") : clickedElement.classList.add("active"); */
        
        // Remove 'active' class from unselected note options
        this.noteOptions.forEach(option => {
            const colourCircle = option.querySelector(".clr-circle");
            if (option !== clickedElement && option.classList.contains("active") && colourCircle.classList.contains("active")) {
                option.classList.remove("active");
                colourCircle.classList.remove("active");
            };
        });
    }

    // Method to get current date object
    getDate() {
        const newDate = new Date();

        const date = {
            date: newDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }),
            time: newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            day: newDate.toLocaleString('default', { weekday: 'long' }),
            month: newDate.toLocaleString('default', { month: 'long' })
        };
        return date;
    }

    addNote() {
        const date = this.getDate();
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
            let displayColour = this.isDarkMode ? [...this.noteColourMap.values()] : [...this.noteColourMap.keys()];
            if (itm.classList.contains("active")) {
                this.noteArea.appendChild(this.createNote(this.noteID, this.noteTitle, displayColour[idx], date));
                this.noteID++;
            }
        });
    }
    
    setTheme() {
        this.app.classList.toggle("dark-mode");
        this.themeBall.classList.toggle("active");
        this.isDarkMode = this.app.classList.contains("dark-mode");
        this.updateAllNotesTheme();
    }

    updateAllNotesTheme() {
        // Select all existing note 
        const allNotes = this.noteArea.querySelectorAll(".note");

        // Iterate over each note and retrieve colour hex code from dataset
        allNotes.forEach(note => {
            let currentColour = note.dataset.hexColor;

            if (this.isDarkMode) {
                note.style.backgroundColor = `${this.noteColourMap.get(currentColour)}`;
                note.dataset.hexColor = `${this.noteColourMap.get(currentColour)}`;
                currentColour = note.dataset.hexColor;
            }
            else {
                let originalColour;
                for (const [key, val] of this.noteColourMap.entries()) {
                    if (val === currentColour) originalColour = key;
                }
                note.style.backgroundColor = originalColour;
                note.dataset.hexColor = `${originalColour}`;
            }
        });
    }


    /* appFunctions() {
        const noteContent = [...document.querySelectorAll(".note-content")];
        noteContent.forEach(itm => {
            itm.addEventListener("keydown", (e) => {
                    if (itm.value && e.key === "Enter") {
                        console.log(itm.value);
                        itm.textContent = itm.value;
                        itm.setAttribute("disabled", "");
                }
            })
        });
    } */
}

const myApp = new App;
