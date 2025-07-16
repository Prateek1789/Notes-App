import DateUtility from "../Utils/DateUtility.js";

class Note {
    constructor(title = '', content = '', color, id = new Date()) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.color = color;
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
}

export default Note;