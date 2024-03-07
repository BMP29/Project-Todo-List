import '../src/style.css'
import './btnTheme'
import './btnSideBar'
import './functions/loadProjForm'
import loadProjForm from './functions/loadProjForm';

const btnAddProj = document.getElementById('btnAddProject');

btnAddProj.addEventListener('click', loadProjForm);

console.log("Everything is OK!")