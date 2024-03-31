export default class Task {
    title;
    description;
    date;
    important;

    constructor(title, description, date, important) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.important = important;
    }

    editTask(title, description, date, important) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.important = important;
    }
}