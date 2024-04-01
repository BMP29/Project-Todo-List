import '../src/style.css'
import './btnTheme'
import './btnSideBar'
import html from "./index.html";
import { loadProjects, getAllProjects } from './modules/ProjectsController';
import { loadProjForm, renderProjects, loadTaskForm, renderAllTasks, renderAllWithInInterval, renderAllImportantTasks} from './modules/UI-UX';

loadProjects();

const btnAddProj = document.getElementById('btnAddProject');
const btnAddTask = document.getElementById('btnAddTask');
const btnInbox = document.getElementById('inbox');
const btnToday = document.getElementById('today');
const btnWeek = document.getElementById('week');
const btnMonth = document.getElementById('month');
const btnImportant = document.getElementById('important');

btnAddProj.addEventListener('click', () => {
    loadProjForm();
});

btnAddTask.addEventListener('click', () => {
    loadTaskForm();
});

btnInbox.addEventListener('click', () => {
    renderAllTasks();
});

btnToday.addEventListener('click', () => {
    renderAllWithInInterval('Today');
});

btnWeek.addEventListener('click', () => {
    renderAllWithInInterval('Week');
});

btnMonth.addEventListener('click', () => {
    renderAllWithInInterval('Month');
});

btnImportant.addEventListener('click', () => {
    renderAllImportantTasks();
});

renderProjects(getAllProjects());

console.log("Everything is OK!")