const renderProjects = (projects) => {
    if(projects.length == 0) return;

    const userProjects = document.getElementById('user-projects');

    projects.forEach((project, index) => {

        const projectItem = document.createElement('li'); 
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');
        const projectDrag = document.createElement('i');
        const projectSettings = document.createElement('i');
        const projectName = document.createElement('h3');

        projectItem.classList.add('project-item');
        projectItem.classList.add('sidebar-item');
        projectDrag.classList.add('project-drag');
        projectSettings.classList.add('project-settings');
        
        projectItem.appendChild(btn1);
        projectItem.appendChild(projectName);
        projectItem.appendChild(btn2);
        btn1.appendChild(projectDrag);
        btn2.appendChild(projectSettings);

        projectItem.setAttribute('data-index', index+1);
        projectName.textContent = project.title;
        userProjects.appendChild(projectItem);
    });
}

const loadProjForm = () => {

    const background = document.createElement('div');
    const projectForm = document.createElement('div');
    const projectNameBox = document.createElement('div');
    const labelName = document.createElement('label');
    const inputName = document.createElement('input');
    const btnConfirm = document.createElement('button');
    
    background.setAttribute('id', 'blur-background');
    projectForm.setAttribute('id', 'project-form');
    projectNameBox.setAttribute('id', 'project-name-box');
    labelName.setAttribute('for', 'name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'name');
    inputName.setAttribute('placeholder', 'Ex: My Essay');
    btnConfirm.setAttribute('id', 'confirm-project');
    btnConfirm.setAttribute('type', 'button');

    labelName.textContent = 'Name';
    btnConfirm.textContent = 'Ok';
    
    background.appendChild(projectForm);
    projectForm.appendChild(projectNameBox);
    projectNameBox.appendChild(labelName);
    projectNameBox.appendChild(inputName);
    projectForm.appendChild(btnConfirm);
    
    document.body.appendChild(background);
}

export { loadProjForm, renderProjects };