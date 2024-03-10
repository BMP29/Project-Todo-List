import Task from './Task' 

class Project {
    title;
    todos;
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    get title() { return this.title; }
    set title(newtitle) { this.title = newtitle; }

    addTodo(title, description, date, priority) { 
        this.todos.push(new Task(title, description, date, priority)); 
    }
    removeTodo(index) { this.todos[index] = undefined; }
}

export default Project;