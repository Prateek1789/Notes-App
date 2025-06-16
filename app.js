class App {
    constructor() {
        this.app = document.querySelector(".app-container");
        this.themeBall = document.querySelector(".toggle-ball");
        this.addNoteBtn = document.querySelector(".add-note-btn");
        this.noteArea = document.querySelector(".notes-area");
        this.noteColourOptions = [...document.querySelectorAll(".clr-circle")];
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

            if (e.target.closest(".clr-circle")) {
                this.noteColourSelector(e);
            }
        
            if (e.target.closest(".add-note-btn")) {
                this.addNote();
            }
        });
    };

    createNote(id, colour, dateObj) {
        const note = document.createElement("div");
        note.setAttribute("class", "note");
        note.innerHTML = `<div class="note-header">
                            <span class="note-date">${dateObj.date}</span>
                            <h3>Homework</h3>
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

    addNote() {
        const date = this.getDate();

        // Check if at least one colour option is selected
        this.noteColourOptions.forEach((itm, idx) => {
            let displayColour = this.isDarkMode ? [...this.noteColourMap.values()] : [...this.noteColourMap.keys()];
            if (itm.classList.contains("active")) {
                this.noteArea.appendChild(this.createNote(this.noteID, displayColour[idx], date));
                this.noteID++;
            }
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

    setTheme() {
        this.app.classList.toggle("dark-mode");
        this.themeBall.classList.toggle("active");
        this.isDarkMode = this.app.classList.contains("dark-mode");
        this.updateAllNotesTheme();
    }

    noteColourSelector(e) {
        // Get colour option clicked by user
        const clickedElement = e.target.closest(".clr-circle");
        if (!clickedElement) return;

        // Toggle Active class on the clicked colour option
        let isActive = clickedElement.classList.contains("active");
        isActive ? clickedElement.classList.remove("active") : clickedElement.classList.add("active");

        // Remove 'active' class only from unselected color options
        this.noteColourOptions.forEach(option => {
           if (option !== clickedElement && option.classList.contains("active")) option.classList.remove("active");
        });
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
