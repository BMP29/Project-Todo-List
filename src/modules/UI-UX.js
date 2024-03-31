import Project from './Project';
import { addProject, getAllProjects, getProject, addTodoAt, removeProject, saveState, editProject, getIndexOf } from './ProjectsController';
const { startOfToday, isToday, addDays, interval, isWithinInterval} = require("../../node_modules/date-fns");

const renderProjects = (projects = []) => {
    //get the project list
    const userProjects = document.getElementById('user-projects');

    //clean the project list
    userProjects.textContent = '';

    //exits the function if there's no projects to render
    if(projects.length == 0) return;

    projects.forEach((project, index) => {
        //creates the necessary elements
        const projectItem = document.createElement('li');
        const btn1 = document.createElement('button');
        const btn2 = document.createElement('button');
        const projectDrag = document.createElement('i');
        const projectSettings = document.createElement('i');
        const projectName = document.createElement('h3');

        //add the attributes to them
        btn1.classList.add('draggable');
        btn2.classList.add('settings');
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

        const options = document.createElement('ul');
        const renameProj = document.createElement('li');
        const deleteProj = document.createElement('li');
        const btnRename = document.createElement('button');
        const btnDelete = document.createElement('button');

        options.classList.add('options');
        btnRename.classList.add('rename');
        btnDelete.classList.add('delete');

        btnRename.textContent = 'Rename';
        btnDelete.textContent = 'Delete';

        btnRename.disabled = true;
        btnDelete.disabled = true;

        options.appendChild(renameProj);
        options.appendChild(deleteProj);
        renameProj.appendChild(btnRename);
        deleteProj.appendChild(btnDelete);

        projectItem.appendChild(options);

        //inserts the project in the DOM
        userProjects.appendChild(projectItem);

        //show/unhide the menu when the user clicks the project's option icon
        btn2.addEventListener('click', (event) => {
            const state = window.getComputedStyle(options).getPropertyValue('opacity');

            if(state < 1) {
                switchOptionsMenuVisibility(index, true);
            }
            else if(state == 1) {
                switchOptionsMenuVisibility(index, false);
            }
        });

        //hide the options menu when the user click anywhere in the page
        window.addEventListener('click', (event) => {
            const hasClass = event.target.classList.contains('project-settings');

            if(hasClass == true) return;

            switchOptionsMenuVisibility(false);
        });

        //prevents the options menu from being hidden when the user clicks inside it
        options.addEventListener('click', (event) => {
            event.stopPropagation();
        });

        //when clicked, deletes the project, re-render the projects in the sidebar and
        //the tasks being shown
        btnDelete.addEventListener('click', () => {
            removeProject(index);
            options.remove();
            saveState();
            renderProjects(getAllProjects());
            renderProjectsTasks();
        });

        btnRename.addEventListener('click', () => {
            loadProjForm(index);
        })

        //displays the project's tasks clicked
        projectName.addEventListener('click', () => {
            renderProjectsTasks(projectItem.getAttribute('data-index'));
        });

        //hide and unhide the project's option menu at the index passed
        //and hides all the other options menu
        function switchOptionsMenuVisibility(index = undefined, show = false) {

            const optionsMenuList = document.querySelectorAll('.options');
            const toBeUnhidden = optionsMenuList[index];

            optionsMenuList.forEach((item) => {
                const btnRename = item.childNodes[0].childNodes[0];
                const btnDelete = item.childNodes[1].childNodes[0];

                if(toBeUnhidden == item && show == true) {
                    item.style.visibility = 'visible';
                    item.style.transform = 'translateY(0px)';
                    item.style.opacity = 1;
                    btnRename.disabled = false;
                    btnDelete.disabled = false;
                    item.style.cursor = 'pointer';
                    btnRename.style.cursor = 'pointer';
                    btnDelete.style.cursor = 'pointer';
                }else {
                    item.style.transform = 'translateY(5px)';
                    item.style.opacity = 0;
                    btnRename.disabled = true;
                    btnDelete.disabled = true;
                    item.style.cursor = 'default';
                    btnRename.style.cursor = 'default';
                    btnDelete.style.cursor = 'default';
                    setTimeout(() => {
                        item.style.visibility = 'hidden';
                    }, 200);
                }
            });
        }
    });
}

const showBtnAddTaskSwitch = (input) => {
    const on = true, off = false;
    const btnAddTask = document.getElementById('btnAddTask');

    if(input == on) {
        btnAddTask.style.visibility = 'visible';
        btnAddTask.style.opacity = 100;
        btnAddTask.disabled = false;
    }else if(input == off) {
        btnAddTask.style.opacity = 0;
        btnAddTask.disabled = true;

        setTimeout(() => {
            btnAddTask.style.visibility = 'hidden';
        }, 500);
    }
}

const renderProjectsTasks = (projIndex = undefined) => {
    const project = getProject(projIndex);
    const projectList = document.getElementById('project-tasks');
    projectList.textContent = '';
    projectList.setAttribute('data-projId', projIndex);

    const projectTitle = document.getElementById('project-title');

    if(projIndex == undefined) {
        projectTitle.textContent = 'No Projects Selected';
        showBtnAddTaskSwitch(false);
        return;
    }

    projectTitle.textContent = project.title;

    project.todos.forEach((task, index) => {
        renderTask(project, index);
    });

    showBtnAddTaskSwitch(true);
}

const renderAllTasks = () => {
    const projects = getAllProjects();
    const projectList = document.getElementById('project-tasks');
    projectList.textContent = '';
    projectList.setAttribute('data-projId', 'Inbox');

    const projectTitle = document.getElementById('project-title');

    projectTitle.textContent = 'Inbox';
    showBtnAddTaskSwitch(false);

    projects.forEach((project) => {
        project.todos.forEach((task, index) => {
            renderTask(project, index);
        });
    });
}

const renderAllWithInInterval = (typeOfInterval) => {
    const projects = getAllProjects();
    const projectList = document.getElementById('project-tasks');
    projectList.textContent = '';
    projectList.setAttribute('data-projId', typeOfInterval);

    const projectTitle = document.getElementById('project-title');

    const today = startOfToday();
    const Days7FromToday= addDays(today, 6);
    const Days29FromToday = addDays(today, 29);

    const interval7Days = interval(today, Days7FromToday);
    const interval30Days = interval(today, Days29FromToday);

    showBtnAddTaskSwitch(false);
    switch(typeOfInterval) {
        case 'Today':
            projectTitle.textContent = 'Today';

            projects.forEach((project) => {
                project.todos.forEach((task, index) => {
                    if(isToday(new Date(task.date + " 00:00:00")))
                        renderTask(project, index);
                });
            });
        break;

        case 'Week':
            projectTitle.textContent = 'Week';

            projects.forEach((project) => {
                project.todos.forEach((task, index) => {
                    if(isWithinInterval(new Date(task.date + " 00:00:00"), interval7Days))
                        renderTask(project, index);
                });
            });
        break;

        case 'Month':
            projectTitle.textContent = 'Month';

            projects.forEach((project, index) => {
                project.todos.forEach((task) => {
                    if(isWithinInterval(new Date(task.date + " 00:00:00"), interval30Days))
                        renderTask(project, index);
                });
            });
        break;

        default:
            alert('something went wrong');
        break;
    }
}

const renderAllImportantTasks = () => {
    const projects = getAllProjects();
    const projectList = document.getElementById('project-tasks');
    projectList.textContent = '';
    projectList.setAttribute('data-projId', 'Important');

    const projectTitle = document.getElementById('project-title');

    projectTitle.textContent = 'Important';
    showBtnAddTaskSwitch(false);

    projects.forEach((project) => {
        project.todos.forEach((task, index) => {
            if(task.important == true)
                renderTask(project, index);
        });
    });
}

const renderTask = (project, taskIndex) => {
    const projectList = document.getElementById('project-tasks');
    const todo = project.todos[taskIndex];

    //index of the project/section(inbox, week etc) being displayed
    const idDisplayedProj = projectList.getAttribute('data-projid');

    //index of the task's project
    const idProj = getIndexOf(project);

    const task = document.createElement('div');
    const taskTitle = document.createElement('h3');
    const taskContent = document.createElement('div');
    const description = document.createElement('p');
    const date = document.createElement('span');
    const editIcon = document.createElement('i');
    const taskDeleteIco = document.createElement('i');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');
    const details = document.createElement('div');

    task.classList.add('task');
    task.setAttribute('data-indexTask', taskIndex);
    task.setAttribute('data-projectId', idProj);
    taskTitle.classList.add('task-title');
    taskContent.classList.add('task-content');
    description.classList.add('task-description');
    date.classList.add('task-date');
    btnEdit.classList.add('edit-task');
    btnDelete.classList.add('delete-task');
    editIcon.classList.add('edit-task-icon');
    taskDeleteIco.classList.add('task-deleteIco');
    details.classList.add('tasks-details');

    taskTitle.textContent = todo.title;
    description.textContent = todo.description;
    date.textContent = todo.date.replaceAll('-', '/');

    task.appendChild(taskContent);
    task.appendChild(details);
    details.appendChild(date);
    details.appendChild(btnEdit);
    details.appendChild(btnDelete);
    btnEdit.appendChild(editIcon);
    btnDelete.appendChild(taskDeleteIco);
    taskContent.append(taskTitle);
    taskContent.append(description);

    projectList.appendChild(task);
    task.style.visibility = 'visible';
    setTimeout(() => {
        task.style.opacity = 100;
    }, 1);

    btnEdit.addEventListener('click', () => {
        loadTaskForm(taskIndex);
    });

    btnDelete.addEventListener('click', () => {
        project.removeTodo(taskIndex);
        saveState();

        switch(idDisplayedProj) {
            case 'Inbox':
                renderAllTasks();
            break;

            case 'Today':
                renderAllWithInInterval('Today');
            break;

            case 'Week':
                renderAllWithInInterval('Week');
            break;

            case 'Month':
                renderAllWithInInterval('Month');
            break;

            case 'Important':
                renderAllImportantTasks();
            break;

            default:
                renderProjectsTasks(idDisplayedProj);
            break;
        }
    });

    /*
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
    */
}

const loadProjForm = (index = undefined) => {
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
    btnConfirm.addEventListener('click', handleBtnConfirmClick);
    btnCancel.addEventListener('click', handleBtnCancelClick);
    background.addEventListener('click', handleBackgroundClick);

    function handleBtnConfirmClick() {
        if(index == undefined) {
            addProject(inputName.value);
        }
        else {
            editProject(index, inputName.value);
            renderProjectsTasks(index);
        }

        renderProjects(getAllProjects());
        document.body.removeChild(background);
    }

    function handleBtnCancelClick() {
        document.body.removeChild(background);
    }

    function handleBackgroundClick(event) {
        if (event.target === background)
            document.body.removeChild(background);
    }

    //inserts the project in the DOM
    document.body.appendChild(background);
}

const loadTaskForm = (taskIndex = undefined) => {
    const projectIdDisplayed = document.getElementById('project-tasks').getAttribute('data-projid');
    
    // Create button box
    const buttonBox = document.createElement('div');
    buttonBox.id = 'button-box';

    // Create 'Ok' button
    const btnOk = document.createElement('button');
    btnOk.id = 'btnOk';
    btnOk.classList.add('btnConfirm');
    btnOk.textContent = 'Ok';
    btnOk.type = 'button';

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

    // Create a div for the important of the task
    const taskPrioBoxDiv = document.createElement('div');
    taskPrioBoxDiv.id = 'taskPrio-box';

    // Create a label for the important select input
    const importantLabel = document.createElement('label');
    importantLabel.htmlFor = 'inputImportant';
    importantLabel.textContent = 'Important';

    const inputImportant = document.createElement('input');
    inputImportant.id = 'inputImportant';
    inputImportant.setAttribute('type', 'checkbox');

    // Append important label and select input to the important box div
    taskPrioBoxDiv.appendChild(inputImportant);
    taskPrioBoxDiv.appendChild(importantLabel);


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

    // Append important box and task data box to the details box div
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

    let taskObj = undefined;
    let taskElem = undefined;
    if(taskIndex != undefined) {
        taskElem = document.querySelector(`[data-indexTask="${taskIndex}"`);
        const idProj = taskElem.getAttribute('data-projectid');
        taskObj = getProject(idProj).todos[taskIndex];
        
        titleInput.value = taskObj.title;
        descriptionTextarea.textContent = taskObj.description;
        dateInput.value = taskObj.date;
        inputImportant.checked = taskObj.important;
    }

    // Add event listeners
    btnOk.addEventListener('click', handleOkButtonClick);
    btnCancel.addEventListener('click', handleCancelButtonClick);
    bgTaskFormDiv.addEventListener('click', handleBackgroundClick);

    // Event listener functions
    function handleOkButtonClick() {
        const title = titleInput.value;
        const description = descriptionTextarea.value;
        const important = inputImportant.checked;
        const date = dateInput.value;

        const project = getProject(projectIdDisplayed);

        if(title === '' && description === '' && date === '' && important === '' ) return;


        if(taskIndex == undefined) {
            addTodoAt(projectIdDisplayed, { title, description, date, important });
            renderTask(project, project.todos.length-1);
        }else {    
            taskObj.title = title;
            taskObj.description = description;
            taskObj.important = important;
            taskObj.date = date;

            saveState();

            switch(projectIdDisplayed) {
                case 'Today':
                    renderAllWithInInterval('Today');
                break;

                case 'Week':
                    renderAllWithInInterval('Week');
                break;

                case 'Month':
                    renderAllWithInInterval('Month');
                break;

                case 'Important':
                    renderAllImportantTasks();
                break;
    
                default:    
                    editTask(taskObj, taskElem);
                break;
            }
        }
        document.body.removeChild(bgTaskFormDiv);
    }

    function handleCancelButtonClick() {
        document.body.removeChild(bgTaskFormDiv);
    }

    function handleBackgroundClick(event) {
        if (event.target === bgTaskFormDiv)
            document.body.removeChild(bgTaskFormDiv);
    }
};

const editTask = (taskObj, taskElem) => {
    const title = taskElem.childNodes[0].childNodes[0];
    const description = taskElem.childNodes[0].childNodes[1];
    const date = taskElem.childNodes[1].childNodes[0];

    title.textContent = taskObj.title;
    description.textContent = taskObj.description;
    date.textContent = taskObj.date.replaceAll('-', '/');
}

export { loadProjForm, renderProjects, loadTaskForm, renderAllTasks, renderAllWithInInterval, renderAllImportantTasks };