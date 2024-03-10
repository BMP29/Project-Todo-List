export default class Task {
    title;
    description;
    date;
    priority;

    constructor(title, description, date, priority) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }
}