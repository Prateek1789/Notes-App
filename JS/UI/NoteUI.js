class NoteUI {
    createNoteElement(note) {
        const noteElement = document.createElement("div");
        const classes = [
            'note', 
            note.isStarred ? 'starred' : '',
            note.isTrashed ? 'deleted' : 'active'
        ].filter(Boolean).join(" ");

        noteElement.setAttribute("class", classes);
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24">
                                                        <path d="M18 2H6c-1.1 0-2 .9-2 2v17c0 .36.19.69.5.87s.69.18 1 0l6.5-3.72 6.5 3.72c.15.09.33.13.5.13s.35-.04.5-.13c.31-.18.5-.51.5-.87V4c0-1.1-.9-2-2-2m-3.6 11.2L12 11.6l-2.4 1.6.8-2.8-2-1.8 2.52-.2L12 6l1.08 2.4 2.52.2-2 1.8z"></path>
                                                    </svg>
                                                 </button>
                                             </li>
                                             <li class="note-action-items na-list-item-2">
                                                 <button type="button" class="note-action-btn btn-edit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" >
                                                        <path d="M5 21h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"></path><path d="M7 13v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l9-9a.996.996 0 0 0 0-1.41l-3-3a.996.996 0 0 0-1.41 0l-9.01 8.99A1 1 0 0 0 7 13m10-7.59L18.59 7 17.5 8.09 15.91 6.5zm-8 8 5.5-5.5 1.59 1.59-5.5 5.5H9z"></path>
                                                    </svg>
                                                 </button>
                                             </li>
                                             <li class="note-action-items na-list-item-3 hidden">
                                                <button type="button" class="note-action-btn btn-restore">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                        <path d="M440-320h80v-166l64 62 56-56-160-160-160 160 56 56 64-62v166ZM280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/>
                                                    </svg>
                                                </button>
                                             </li>
                                             <li class="note-action-items na-list-item-4">
                                                 <button type="button" class="note-action-btn btn-del">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" class="">
                                                        <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/>
                                                    </svg>
                                                 </button>
                                             </li>
                                         </ul>
                                     </div>
                                 </div>`;
        return noteElement;
    }

    renderNote(note, container, position = 'end') {
        const newNote = this.createNoteElement(note);
        position === 'start' ? container.prepend(newNote) : container.appendChild(newNote);
    }
};

export default NoteUI;