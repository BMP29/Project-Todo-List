import '../src/style.css'
import './btnTheme'
import './btnSideBar'
import { loadProjects, getAllProjects } from './modules/ProjectsController';
import { loadProjForm, renderProjects, loadTaskForm } from './modules/UI-UX';

loadProjects();

const btnAddProj = document.getElementById('btnAddProject');
const btnAddTask = document.getElementById('btnAddTask');

btnAddProj.addEventListener('click', loadProjForm);

btnAddTask.addEventListener('click', loadTaskForm);

renderProjects(getAllProjects());

console.log("Everything is OK!")