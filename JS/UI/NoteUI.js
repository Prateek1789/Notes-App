class NoteUI {
    constructor(manager) {
        this.NotesManager = manager;
    }

    createNoteElement(note) {
        const noteElement = document.createElement("div");
        noteElement.setAttribute("class", "note");
        noteElement.setAttribute("data-id", note.id);

        noteElement.innerHTML = `<textarea name="content" id="note-${note.id + 1}" class="note-content" autofocus="on" disabled>${note.content}</textarea>
                                 <div class="note-footer" style="background-color: ${note.color};">
                                     <h3>${note.title}</h3>
                                     <div class="note-actions">
                                         <time datetime="" class="note-time-day">${note.createdOn} • ${note.createdAt}</time>
                                         <ul class="note-actions-list">
                                             <li class="note-action-items na-list-item-1">
                                                 <button type="button" class="note-action-btn btn-star">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                                                        <path d="M18 2H6c-1.1 0-2 .9-2 2v17c0 .36.19.69.5.87s.69.18 1 0l6.5-3.72 6.5 3.72c.15.09.32.13.5.13s.35-.04.5-.13c.31-.18.5-.51.5-.87V4c0-1.1-.9-2-2-2m0 8v9.28l-5.5-3.14a.98.98 0 0 0-.99 0l-5.5 3.14V4h12v6Z"></path><path d="M13.08 8.4 12 6l-1.08 2.4-2.52.2 2 1.8-.8 2.8 2.4-1.6 2.4 1.6-.8-2.8 2-1.8z"></path>
                                                    </svg>
                                                 </button>
                                             </li>
                                             <li class="note-action-items na-list-item-2">
                                                 <button type="button" class="note-action-btn btn-edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                                                        <path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z"/></svg>
                                                 </button>
                                             </li>
                                             <li class="note-action-items na-list-item-3 hidden">
                                                <button type="button" class="note-action-btn btn-restore">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#eaeaea">
                                                        <path d="M440-320h80v-166l64 62 56-56-160-160-160 160 56 56 64-62v166ZM280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/>
                                                    </svg>
                                                </button>
                                             </li>
                                             <li class="note-action-items na-list-item-4">
                                                 <button type="button" class="note-action-btn btn-del">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
                                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                    </svg>
                                                 </button>
                                             </li>
                                         </ul>
                                     </div>
                                 </div>`;
        return noteElement;
    }

    renderNote(note, container) {
        const newNoteElement = this.createNoteElement(note);
        container.appendChild(newNoteElement);
    }

    renderMainNotes(container) {
        const notes = this.NotesManager.getAll();
        container.innerHTML = '';
        notes.forEach(note => !note.isTrashed && this.renderNote(note, container));
    }

    renderDeletedNotes(container) {
        const deletedNotes = this.NotesManager.getDeletedNotes();
        container.innerHTML = '';
        deletedNotes.forEach(note => this.renderNote(note, container));
        const notes = document.querySelectorAll(".note");

        notes.forEach(note => {
            note.querySelector(".na-list-item-1").classList.add("hidden");
            note.querySelector(".na-list-item-2").classList.add("hidden");
            note.querySelector(".na-list-item-3").classList.remove("hidden");
            note.querySelector(".btn-del").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg>`;
        });
    }
} 

export default NoteUI;