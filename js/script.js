const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const filterButtons = document.querySelectorAll('.filter-buttons button');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task${task.completed ? ' completed' : ''}`;

        const circle = document.createElement('div');
        circle.className = `circle${task.completed ? ' completed' : ''}`;
        circle.innerHTML = task.completed ? '&#10003;' : '';
        circle.onclick = () => completeTask(index);

        const text = document.createElement('span');
        text.textContent = task.text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);

        li.appendChild(circle);
        li.appendChild(text);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const newText = prompt('Edit your task:', tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function filterTasks(filter) {
    filterButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`button[onclick="filterTasks('${filter}')"]`).classList.add('active');
    renderTasks(filter);
}

renderTasks();
