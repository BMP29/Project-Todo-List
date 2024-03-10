import { addProject, getAllProjects } from './ProjectsController';

const renderProjects = (projects = []) => {
    //exits the function if there's no projects to render
    if(projects.length == 0) return;

    //get the project list
    const userProjects = document.getElementById('user-projects');
    
    //clean the project list
    userProjects.textContent = '';
    
    projects.forEach((project, index) => {
        //creates the necessary elements
        const projectItem = document.createElement('li'); 
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');
        const projectDrag = document.createElement('i');
        const projectSettings = document.createElement('i');
        const projectName = document.createElement('h3');

        //add the attributes to them
        projectItem.classList.add('project-item');
        projectItem.classList.add('sidebar-item');
        projectDrag.classList.add('project-drag');
        projectSettings.classList.add('project-settings');
        projectItem.setAttribute('data-index', index+1);
        
        //append them 
        projectItem.appendChild(btn1);
        projectItem.appendChild(projectName);
        projectItem.appendChild(btn2);
        btn1.appendChild(projectDrag);
        btn2.appendChild(projectSettings);

        //add the project's name
        projectName.textContent = project.title;

        //inserts the project in the DOM
        userProjects.appendChild(projectItem);
    });
}

const loadProjForm = (controller) => {
    //creates the necessary elements
    const background = document.createElement('div');
    const projectForm = document.createElement('div');
    const projectNameBox = document.createElement('div');
    const labelName = document.createElement('label');
    const inputName = document.createElement('input');
    const btnConfirm = document.createElement('button');
    
    //add the attributes to them
    background.setAttribute('id', 'blur-background');
    projectForm.setAttribute('id', 'project-form');
    projectNameBox.setAttribute('id', 'project-name-box');
    labelName.setAttribute('for', 'name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('placeholder', 'Ex: My Essay');
    btnConfirm.setAttribute('id', 'confirm-project');
    btnConfirm.setAttribute('type', 'button');

    //add text to the necessary elements
    labelName.textContent = 'Name';
    btnConfirm.textContent = 'Ok';
    
    //append them 
    background.appendChild(projectForm);
    projectForm.appendChild(projectNameBox);
    projectNameBox.appendChild(labelName);
    projectNameBox.appendChild(inputName);
    projectForm.appendChild(btnConfirm);

    //when clicked, will create the project with the name typed in the inputName
    //then it'll close the modal
    btnConfirm.addEventListener('click', () => {
        addProject(inputName.value);
        renderProjects(getAllProjects());
        document.body.removeChild(background);
    });

    //inserts the project in the DOM
    document.body.appendChild(background);
}

export { loadProjForm, renderProjects };