import '../src/style.css'
import './btnTheme'
import './btnSideBar'
import { loadProjects, getAllProjects } from './modules/ProjectsController';
import { loadProjForm, renderProjects, loadTaskForm, renderAllTasks, renderAllWithInInterval } from './modules/UI-UX';

loadProjects();

const btnAddProj = document.getElementById('btnAddProject');
const btnAddTask = document.getElementById('btnAddTask');
const btnInbox = document.getElementById('inbox');
const btnToday = document.getElementById('today');
const btnWeek = document.getElementById('week');
const btnMonth = document.getElementById('month');

btnAddProj.addEventListener('click', () => {
    loadProjForm();
});

btnAddTask.addEventListener('click', loadTaskForm);

btnInbox.addEventListener('click', () => {
    renderAllTasks();
});

btnToday.addEventListener('click', () => {
    renderAllWithInInterval('today');
});

btnWeek.addEventListener('click', () => {
    renderAllWithInInterval('week');
});

btnMonth.addEventListener('click', () => {
    renderAllWithInInterval('month');
});

renderProjects(getAllProjects());

console.log("Everything is OK!")