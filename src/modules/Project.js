class Project {
    title;
    todos;
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    get title() { return this.title; }
    set title(newtitle) { this.title = newtitle; }

    addTodo(todo) { this.todos.push(todo); }
    removeTodo(index) { this.todos[index] = undefined; }
}

export default Project;