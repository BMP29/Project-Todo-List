import '../src/style.css'
import html from "./index.html";
import { loadProjects, getAllProjects } from './modules/ProjectsController';
import { loadProjForm, renderProjects, loadTaskForm, renderAllTasks, 
    renderAllWithInInterval, renderAllImportantTasks, showSideBarBtn, switchTheme } from './modules/InterfaceController';

loadProjects();

const btnAddProj = document.getElementById('btnAddProject');
const btnAddTask = document.getElementById('btnAddTask');
const btnInbox = document.getElementById('inbox');
const btnToday = document.getElementById('today');
const btnWeek = document.getElementById('week');
const btnMonth = document.getElementById('month');
const btnImportant = document.getElementById('important');
const btnSB = document.getElementById('btnSideBar');
const btnTheme = document.getElementById('btnTheme');

btnSB.addEventListener('click', () => {
    showSideBarBtn();
})

btnTheme.addEventListener('click', () => {
    switchTheme();
});

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