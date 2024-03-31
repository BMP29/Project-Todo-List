import Task from './Task' 

class Project {
    title;
    todos;
    constructor(title) {
        this.title = title;
        this.todos = [];
    }

    addTodo(title, description, date, important) { 
        this.todos.push(new Task(title, description, date, important)); 
    }
    removeTodo(index) { 
        const toBeRemoved = this.todos[index];

        const temp = this.todos.filter((todo) => todo !== toBeRemoved);
        this.todos = temp;
    }

    getPositionOf(todo) {
        let todoIndex;
        this.todos.forEach((item, index) => {
            if(item == todo) 
                todoIndex = index;
        });

        return todoIndex;
    }
}

export default Project;