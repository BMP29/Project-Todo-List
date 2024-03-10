import '../src/style.css'
import './btnTheme'
import './btnSideBar'
import { loadProjects, getAllProjects } from './modules/ProjectsController';
import { loadProjForm, renderProjects } from './modules/UI-UX';

loadProjects();

const btnAddProj = document.getElementById('btnAddProject');

btnAddProj.addEventListener('click', () => {
    loadProjForm();
});

renderProjects(getAllProjects());

console.log("Everything is OK!")