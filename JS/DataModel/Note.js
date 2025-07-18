import DateUtility from "../Utils/DateUtility.js";

class Note {
    constructor(title = '', content = '', color) {
        this.id = 'n_' + Date.now().toString(36).slice(-6);
        this.title = title;
        this.content = content;
        this.color = color;
        this.isTrashed = false;
        this.createdOn = DateUtility.getCurrentDate().date;
        this.createdAt = DateUtility.getCurrentDate().time;
        this.updatedOn = DateUtility.getCurrentDate().date;
        this.updatedAt = DateUtility.getCurrentDate().time;
    };

    update(title, content) {
        this.title = title;
        this.content = content;
        this.updatedOn = DateUtility.getCurrentDate().date;
        this.updatedAt = DateUtility.getCurrentDate().time;
    };

    createSkeleton(id) {
        return {
            id,
            isTrashed: true
        }
    }
}

export default Note;