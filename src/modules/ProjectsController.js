import Project from "./Project";

export default class ProjectsController {
    #Projects = [];

    addProject(title) {
        const newProject = new Project(title);
        this.#Projects.push(newProject);

        this.storeProject(newProject);
    }
    
    removeProject(index) {
        this.#Projects[index] = undefined;
    }
    
    getProject(index) {
        return this.#Projects[index];
    }

    getAllProjects() {
        return this.#Projects;
    }

    storeProject(project) {
        const strProject = JSON.stringify(project);
        localStorage.setItem(strProject, strProject);
    }
}