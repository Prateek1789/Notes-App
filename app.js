class App {
    constructor() {
        this.addNoteBtn = document.querySelector(".add-note-btn");
        this.noteArea = document.querySelector(".notes-area");
        this.noteColourOptions = document.querySelectorAll(".clr-circle");
        this.init()
    };
    init() {
        this.appFunctions();
    }
    appFunctions() {
        const note = `<div class="note">
                        <div class="note-header">
                            <span class="note-date">09-06-2025</span>
                            <h3>Homework</h3>
                        </div>
                        <textarea name="content" id="note-1" class="note-content" autofocus="on"></textarea>
                        <div class="note-footer">
                            <span class="note-time">08:08PM, </span>
                            <span class="note-day">Monday</span>
                        </div>
                      </div>`;

        this.addNoteBtn.addEventListener("click", () => {
            this.noteArea.innerHTML += note;
        });

        const noteContent = document.querySelectorAll(".note-content");
        noteContent.forEach(itm => {
            itm.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {
                        itm.setAttribute("disabled", "");
                }
            })
        })
    }
}

const myApp = new App;
