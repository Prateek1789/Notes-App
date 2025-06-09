class App {
    constructor() {
        this.addNoteBtn = document.querySelector(".head");
        this.init()
    };
    init() {
        this.show();
    }
    show() {
        this.addNoteBtn.addEventListener("click", () => {
            document.querySelector(".add-note-tab").classList.toggle("active");
            document.querySelectorAll(".new-note-option").forEach(itm => {
                itm.classList.toggle("active");
            });
        })
    }
}

const myApp = new App;
