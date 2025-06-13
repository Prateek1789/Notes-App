class App {
    constructor() {
        this.app = document.querySelector(".app-container");
        this.addNoteBtn = document.querySelector(".add-note-btn");
        this.noteArea = document.querySelector(".notes-area");
        this.noteColourOptions = document.querySelectorAll(".clr-circle");
        this.notesColour = ['#64adff', '#ffc681', '#ff7e7e'];
        this.noteID = 0;
        this.init()
    };

    init() {
        this.appFunctions();
    };

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
        if (this.noteColourOptions[0].classList.contains("active")) {
            this.noteArea.appendChild(this.createNote(this.noteID, this.notesColour[0]));
            this.noteID++;
        }
        else if (this.noteColourOptions[1].classList.contains("active")) {
            this.noteArea.appendChild(this.createNote(this.noteID, this.notesColour[1]));
            this.noteID++;
        }
        else if (this.noteColourOptions[2].classList.contains("active")) {
            this.noteArea.appendChild(this.createNote(this.noteID, this.notesColour[2]));
            this.noteID++;
        }
    }
    appFunctions() {
        
        this.app.addEventListener("click", e => {
            
            if (e.target.closest(".crcl-1")) {
                e.target.classList.toggle("active");
                if (this.noteColourOptions[1].classList.contains("active") || this.noteColourOptions[2].classList.contains("active")) {
                    this.noteColourOptions[1].classList.remove("active");
                    this.noteColourOptions[2].classList.remove("active");
                }
            }
            else if (e.target.closest(".crcl-2")) {
                e.target.classList.toggle("active");
                if (this.noteColourOptions[0].classList.contains("active") || this.noteColourOptions[2].classList.contains("active")) {
                    this.noteColourOptions[0].classList.remove("active");
                    this.noteColourOptions[2].classList.remove("active");
                }
            }
            else if (e.target.closest(".crcl-3")) {
                e.target.classList.toggle("active");
                if (this.noteColourOptions[0].classList.contains("active") || this.noteColourOptions[1].classList.contains("active")) {
                    this.noteColourOptions[0].classList.remove("active");
                    this.noteColourOptions[1].classList.remove("active");
                }
            }
            else if (e.target.closest(".add-note-btn")) {
                this.addNote();
            }
        });
    
        /* const noteContent = [...document.querySelectorAll(".note-content")];
        noteContent.forEach(itm => {
            itm.addEventListener("keydown", (e) => {
                    if (itm.value && e.key === "Enter") {
                        console.log(itm.value);
                        itm.textContent = itm.value;
                        itm.setAttribute("disabled", "");
                }
            })
        }); */
    }
}

const myApp = new App;
