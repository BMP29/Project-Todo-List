import Project from "./Project";

export { addProject, removeProject, getProject,loadProjects, getAllProjects };

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

function loadProjects() {
    const size = localStorage.length + 1;

    const state = JSON.parse(localStorage.getItem('ProjectList'));

    if(state == null) return;

    state.forEach(project => {
        addProject(project.title);
    });
}