import Project from "./Project";

export { addProject, removeProject, getProject,loadProjects, getAllProjects, saveState, addTodoAt };

const Projects = [];

function addProject(title) {
    const newProject = new Project(title);
    Projects.push(newProject);

    saveState();
}

function removeProject(index) {
    index--;
    const toBeRemoved = Projects[index];

    const temp = Projects.filter((project) => project !== toBeRemoved);
    Projects = temp;
    saveState();
}

function getProject(index) {
    return Projects[index];
}

function getAllProjects() {
    return Projects;
}

function saveState() {
    const state = JSON.stringify(Projects);
    localStorage.setItem('ProjectList', state);
}

function addTodoAt(index, task = undefined) {
    if(task == undefined) return;
    
    const project = getProject(index);

    project.addTodo(task.title, task.description, task.date, task.priority);
    saveState();
}

function loadProjects() {
    const size = localStorage.length + 1;

    const state = JSON.parse(localStorage.getItem('ProjectList'));

    if(state == null) return;

    state.forEach((project, index) => {
        addProject(project.title);

        const tasks = project.todos;
        tasks.forEach(task => {
            Projects[index].addTodo(task.title, task.description, task.date, task.priority);
        })
    });
    saveState();
}