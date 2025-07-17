class NoteUI {
    constructor(manager, onEditNote, onDeleteNote) {
        this.NotesManager = manager;
        this.onEdit = onEditNote;
        this.onDelete = onDeleteNote;
    }

    createNoteElement(note) {
        const noteData = note;
        const noteElement = document.createElement("div");
        noteElement.setAttribute("class", "note");
        noteElement.setAttribute("data-id", note.id);

        noteElement.innerHTML = `<textarea name="content" id="note-${note.id + 1}" class="note-content" autofocus="on" disabled>${note.content}</textarea>
                                 <div class="note-footer" style="background-color: ${note.color};">
                                     <h3>${note.title}</h3>
                                     <div class="note-actions">
                                         <time datetime="" class="note-time-day">${note.createdOn} • ${note.createdAt}</time>
                                         <ul class="note-actions-list">
                                             <li class="note-action-items">
                                                 <button type="button" class="note-action-btn btn-star">
                                                     <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                                                         <path d="M200-120v-640q0-33 23.5-56.5T280-840h240v80H280v518l200-86 200 86v-278h80v400L480-240 200-120Zm80-640h240-240Zm400 160v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
                                                     </svg>
                                                 </button>
                                             </li>
                                             <li class="note-action-items">
                                                 <button type="button" class="note-action-btn btn-edit">
                                                     <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                                                     <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
                                                     </svg>
                                                 </button>
                                             </li>
                                             <li class="note-action-items">
                                                 <button type="button" class="note-action-btn btn-del">
                                                     <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                                                     <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                                                     </svg>
                                                 </button>
                                             </li>
                                         </ul>
                                     </div>
                                 </div>`;
        return noteElement;
    }

    renderNoteUI(note, parent) {
        const newNoteElement = this.createNoteElement(note);
        parent.appendChild(newNoteElement);
    }
} 

export default NoteUI;