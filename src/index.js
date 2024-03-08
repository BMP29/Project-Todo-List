import '../src/style.css'
import './btnTheme'
import './btnSideBar'
import './modules/loadProjForm'
import loadProjForm from './modules/loadProjForm';

const btnAddProj = document.getElementById('btnAddProject');

btnAddProj.addEventListener('click', loadProjForm);

console.log("Everything is OK!")