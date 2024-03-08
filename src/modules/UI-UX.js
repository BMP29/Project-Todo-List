const renderProjects = (projects) => {

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