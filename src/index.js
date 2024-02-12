import '../src/style.css'
import './btnTheme'
import './btnSideBar'
import './loadProjForm'
import loadProjForm from './loadProjForm';

const btnAddProj = document.getElementById('btnAddProject');

btnAddProj.addEventListener('click', loadProjForm);

console.log("Everything is OK!")