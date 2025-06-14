class App {
    constructor() {
        this.app = document.querySelector(".app-container");
        this.addNoteBtn = document.querySelector(".add-note-btn");
        this.noteArea = document.querySelector(".notes-area");
        this.noteColourOptions = [...document.querySelectorAll(".clr-circle")];
        this.noteColours = ['#64adff', '#ffc681', '#ff7e7e'];
        this.noteID = 0;
        this.init();
    };

    init() { 
        this.app.addEventListener("click", e => {
            if (e.target.closest(".clr-circle")) {
                this.noteColourSelector(e);
            }
        
            if (e.target.closest(".add-note-btn")) {
                this.addNote();
            }
        });
    };

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

    createNote(id, colour) {
        const note = document.createElement("div");
        note.setAttribute("class", "note");
        note.innerHTML = `<div class="note-header">
                            <span class="note-date">09-06-2025</span>
                            <h3>Homework</h3>
                          </div>
                          <textarea name="content" id="note-${id}" class="note-content" autofocus="on"></textarea>
                          <div class="note-footer">
                                <span class="note-time">08:08PM, </span>
                                <span class="note-day">Monday</span>
                          </div>`;
        note.style.backgroundColor = `${colour}`;
        return note;
    }

    addNote() {
        this.noteColourOptions.forEach((itm, idx) => {
            if (itm.classList.contains("active")) {
                this.noteArea.appendChild(this.createNote(this.noteID, this.noteColours[idx]));
                this.noteID++;
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
