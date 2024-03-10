import Project from "./Project";

export { addProject, removeProject, getProject,loadProjects }

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

function saveState() {
    const state = JSON.stringify(this);
    localStorage.setItem('ProjectList', state);
}

function loadProjects() {
    const size = localStorage.length + 1;

    const state = JSON.parse(localStorage.getItem('ProjectList'));

    if(state == null) return;
    
    state.Projects.forEach(project => {
        addProject(project.title);
    });
}