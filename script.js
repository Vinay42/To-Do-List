const taskList = {};

document.getElementById('add-task-btn').addEventListener('click', addTask);
document.getElementById('date-picker').addEventListener('change', displayTasks);
document.getElementById('task-list').addEventListener('click', manageTask);

function addTask() {
    const date = document.getElementById('date-picker').value;
    const taskInput = document.getElementById('task-input');
    const taskValue = taskInput.value.trim();

    if (date && taskValue) {
        if (!taskList[date]) {
            taskList[date] = [];
        }
        taskList[date].push(taskValue);
        taskInput.value = '';
        displayTasks();
    }
}

function displayTasks() {
    const date = document.getElementById('date-picker').value;
    const taskListElement = document.getElementById('task-list');
    taskListElement.innerHTML = '';

    if (taskList[date]) {
        taskList[date].forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');

            taskItem.innerHTML = `
                <div class="task-info">
                    <span class="task">${task}</span>
                </div>
                <button class="delete-btn" data-index="${index}" data-date="${date}">Delete</button>
            `;

            taskListElement.appendChild(taskItem);
        });
    }
}

function manageTask(e) {
    if (e.target.classList.contains('delete-btn')) {
        const date = e.target.getAttribute('data-date');
        const index = e.target.getAttribute('data-index');
        taskList[date].splice(index, 1);
        displayTasks();
    }
}
