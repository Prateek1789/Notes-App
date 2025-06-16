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
                                <span class="note-time">${dateObj.time}, </span>
                                <span class="note-day">${dateObj.day}</span>
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
