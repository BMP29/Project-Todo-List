import { addProject, getAllProjects, getProject, addTodoAt } from './ProjectsController';

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
        projectItem.setAttribute('data-index', index);
        
        //append them 
        projectItem.appendChild(btn1);
        projectItem.appendChild(projectName);
        projectItem.appendChild(btn2);
        btn1.appendChild(projectDrag);
        btn2.appendChild(projectSettings);

        //adding the project's name
        projectName.textContent = project.title;

        //displays the tasks of the project when clicked
        projectItem.addEventListener('click', () => {
            displayProjectsTasks(projectItem.getAttribute('data-index'));
        });

        //inserts the project in the DOM
        userProjects.appendChild(projectItem);
    });
}

const displayProjectsTasks = (index) => {
    const project = getProject(index);

    const projectList = document.getElementById('project-tasks');
    projectList.textContent = '';
    projectList.setAttribute('data-projId', index);

    const projectTitle = document.getElementById('project-title');
    projectTitle.textContent = project.title;

    project.todos.forEach((todo, index) => {
        const task = document.createElement('div');
        const taskTitle = document.createElement('h3');
        const lowerContainer = document.createElement('div');
        const description = document.createElement('p');
        const date = document.createElement('span');
    
        task.classList.add('task');
        task.setAttribute('data-index', index);
        task.setAttribute('data-project', project.title);
        taskTitle.classList.add('task-title');
        lowerContainer.classList.add('task-lowerPart');
        description.classList.add('task-description');
        date.classList.add('task-date');

        taskTitle.textContent = todo.title;
        description.textContent = todo.description;
        date.textContent = todo.date;

        task.appendChild(taskTitle);
        task.appendChild(lowerContainer);
        lowerContainer.append(description);
        lowerContainer.append(date);

        projectList.appendChild(task);

        task.addEventListener('click', () => {
            const height = window.getComputedStyle(task).getPropertyValue('min-height');
            const minimized = '53px';
            const expanded  = '250px';

            if(height == expanded) {
                task.style.minHeight = minimized;
            }else if(height == minimized) {
                task.style.minHeight = expanded;
            }

        });
    });
}

const loadProjForm = () => {
    //creates the necessary elements
    const background = document.createElement('div');
    const projectForm = document.createElement('div');
    const projectNameBox = document.createElement('div');
    const labelName = document.createElement('label');
    const inputName = document.createElement('input');
    const btnConfirm = document.createElement('button');
    const btnCancel = document.createElement('button');
    const buttonBox = document.createElement('div'); 
    
    //add the attributes to them
    background.setAttribute('id', 'background-form');
    projectForm.setAttribute('id', 'project-form');
    projectNameBox.setAttribute('id', 'project-name-box');
    labelName.setAttribute('for', 'name');
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('id', 'name');
    btnConfirm.setAttribute('id', 'confirm-project');
    btnConfirm.classList.add('btnConfirm');
    btnConfirm.setAttribute('type', 'button');
    btnCancel.setAttribute('id', 'btnCancel');
    buttonBox.setAttribute('id', 'button-box');

    //add text to the necessary elements
    labelName.textContent = 'Name';
    btnConfirm.textContent = 'Ok';
    btnCancel.textContent = 'Cancel';
    
    //append them 
    background.appendChild(projectForm);
    projectForm.appendChild(projectNameBox);
    projectNameBox.appendChild(labelName);
    projectNameBox.appendChild(inputName);
    buttonBox.appendChild(btnCancel);
    buttonBox.appendChild(btnConfirm);
    projectForm.appendChild(buttonBox);

    //when clicked, will create the project with the name typed in the inputName
    //then it'll close the modal
    btnConfirm.addEventListener('click', () => {
        addProject(inputName.value);
        renderProjects(getAllProjects());
        document.body.removeChild(background);
    });

    btnCancel.addEventListener('click', () => {
        document.body.removeChild(background);
    });

    //inserts the project in the DOM
    document.body.appendChild(background);
}

const loadTaskForm = () => {
    // Create button box
    const buttonBox = document.createElement('div');
    buttonBox.id = 'button-box';

    // Create 'Ok' button
    const btnOk = document.createElement('button');
    btnOk.id = 'btnOk';
    btnOk.classList.add('btnConfirm');
    btnOk.textContent = 'Ok';

    // Create 'Cancel' button
    const btnCancel = document.createElement('button');
    btnCancel.id = 'btnCancel';
    btnCancel.textContent = 'Cancel';
    btnCancel.type = 'button';

    // Create background div for the task form
    const bgTaskFormDiv = document.createElement('div');
    bgTaskFormDiv.id = 'background-form';

    // Create the main task form div
    const taskFormDiv = document.createElement('form');
    taskFormDiv.id = 'taskForm';

    // Create a div for the title of the task
    const titleBoxDiv = document.createElement('div');
    titleBoxDiv.id = 'title-box';

    // Create a label for the title input
    const titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'title';
    titleLabel.textContent = 'Title';

    // Create an input for the title
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.id = 'title';
    titleInput.required = true;

    // Append title label and input to the title box div
    titleBoxDiv.appendChild(titleLabel);
    titleBoxDiv.appendChild(titleInput);

    // Create a div for the description of the task
    const descriptionBoxDiv = document.createElement('div');
    descriptionBoxDiv.id = 'description-box';

    // Create a label for the description textarea
    const descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'description';
    descriptionLabel.textContent = 'Description';

    // Create a textarea for the description
    const descriptionTextarea = document.createElement('textarea');
    descriptionTextarea.name = 'description';
    descriptionTextarea.id = 'description';
    descriptionTextarea.cols = '30';
    descriptionTextarea.rows = '10';
    descriptionTextarea.required = true;

    // Append description label and textarea to the description box div
    descriptionBoxDiv.appendChild(descriptionLabel);
    descriptionBoxDiv.appendChild(descriptionTextarea);

    // Create a div for the details of the task
    const detailsBoxDiv = document.createElement('div');
    detailsBoxDiv.id = 'details-box';

    // Create a div for the priority of the task
    const taskPrioBoxDiv = document.createElement('div');
    taskPrioBoxDiv.id = 'taskPrio-box';

    // Create a label for the priority select input
    const priorityLabel = document.createElement('label');
    priorityLabel.htmlFor = 'task-priority';
    priorityLabel.textContent = 'Priority';

    // Create a select input for the priority
    const prioritySelect = document.createElement('select');
    prioritySelect.name = 'task-priority';
    prioritySelect.id = 'task-priority';
    prioritySelect.required = true;

    // Create options for priority
    const lowOption = document.createElement('option');
    lowOption.value = 'low';
    lowOption.textContent = 'Low';
    lowOption.selected = true;

    const mediumOption = document.createElement('option');
    mediumOption.value = 'medium';
    mediumOption.textContent = 'Medium';

    const highOption = document.createElement('option');
    highOption.value = 'high';
    highOption.textContent = 'High';

    // Append options to the select input
    prioritySelect.appendChild(lowOption);
    prioritySelect.appendChild(mediumOption);
    prioritySelect.appendChild(highOption);

    // Append priority label and select input to the priority box div
    taskPrioBoxDiv.appendChild(priorityLabel);
    taskPrioBoxDiv.appendChild(prioritySelect);

    // Create a div for the date of the task
    const taskDataBoxDiv = document.createElement('div');
    taskDataBoxDiv.id = 'taskData-box';

    // Create a label for the date input
    const dateLabel = document.createElement('label');
    dateLabel.htmlFor = 'date';
    dateLabel.textContent = 'Date';

    // Create an input for the date
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.name = 'date';
    dateInput.id = 'date';
    dateInput.required = true;

    // Append date label and input to the task data box div
    taskDataBoxDiv.appendChild(dateLabel);
    taskDataBoxDiv.appendChild(dateInput);

    // Append priority box and task data box to the details box div
    detailsBoxDiv.appendChild(taskPrioBoxDiv);
    detailsBoxDiv.appendChild(taskDataBoxDiv);

    // Append title box, description box, details box, and 'Ok' button to the task form div
    taskFormDiv.appendChild(titleBoxDiv);
    taskFormDiv.appendChild(descriptionBoxDiv);
    taskFormDiv.appendChild(detailsBoxDiv);
    buttonBox.appendChild(btnCancel);
    buttonBox.appendChild(btnOk);
    taskFormDiv.appendChild(buttonBox);

    // Append task form to the background task form div
    bgTaskFormDiv.appendChild(taskFormDiv);

    // Append background task form to the body or any desired parent element
    document.body.appendChild(bgTaskFormDiv);

    // Add event listeners
    btnOk.addEventListener('click', handleOkButtonClick);
    btnCancel.addEventListener('click', handleCancelButtonClick);
    bgTaskFormDiv.addEventListener('click', handleBackgroundClick);

    // Event listener functions
    function handleOkButtonClick() {
        const title = titleInput.value;
        const description = descriptionTextarea.value;
        const priority = prioritySelect.value;
        const date = dateInput.value;

        if (title !== '' && description !== '' && date !== '' && priority !== '') {
            const projectId = document.getElementById('project-tasks').getAttribute('data-projid');
            addTodoAt(projectId, { title, description, date, priority });
            displayProjectsTasks(projectId);
            document.body.removeChild(bgTaskFormDiv);
        }
    }

    function handleCancelButtonClick() {
        document.body.removeChild(bgTaskFormDiv);
    }

    function handleBackgroundClick(event) {
        if (event.target === bgTaskFormDiv)
            document.body.removeChild(bgTaskFormDiv);
    }
};

export { loadProjForm, renderProjects, loadTaskForm };