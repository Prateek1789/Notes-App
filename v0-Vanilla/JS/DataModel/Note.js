import DateUtility from "../Utils/DateUtility.js";

class Note {
    constructor(id, title = '', content = '', tags = '', color, createdAt, createdOn) {
        this.id = id || 'n_' + Date.now().toString(36).slice(-6);
        this.title = title;
        this.content = content;
        this.tags = tags 
        this.color = color;
        this.isTrashed = false;
        this.isStarred = false;
        this.createdOn = createdOn || DateUtility.getCurrentDate().date;
        this.createdAt = createdAt || DateUtility.getCurrentDate().time;
        this.updatedOn = DateUtility.getCurrentDate().date;
        this.updatedAt = DateUtility.getCurrentDate().time;
    };
}

export default Note;