import './style.css';
import ViewMore from './assets/view-more.png';
import addNewTask from './add-task.js';
import editTask from './edit-task.js';
import { setStorage, getStorage } from './store-list.js';
import Delete from './remove-task.js';

const addTask = document.getElementById('add-new-task');
const currentTasks = document.querySelector('.current-tasks');

const tasks = getStorage();

// Delete an item from local storage
const removeIndex = (index) => {
  setStorage(Delete.deleteOne(getStorage(), index));
  populateTasks(getStorage()); // eslint-disable-line
};

const populateTasks = (arr) => {
  currentTasks.innerHTML = '';
  for (let i = 0; i <= arr.length; i += 1) {
    // Add an item to local storage
    const newDiv = document.createElement('div');
    newDiv.className = 'to-do-item';
    const tick = document.createElement('input');
    const description = document.createElement('input');
    description.className = 'task-description';
    const menuImg = document.createElement('img');
    menuImg.src = `${ViewMore}`;
    tick.setAttribute('type', 'checkbox');
    tick.id = `item${i}`;
    newDiv.append(tick);
    description.value = `${arr[i].description}`;
    newDiv.append(description);
    newDiv.append(menuImg);
    currentTasks.appendChild(newDiv);

    // Double click the input area to display the delete icon
    description.addEventListener('dblclick', () => {
      newDiv.classList.add('edit-mode');
      newDiv.innerHTML = `<input type="checkbox" id="${i}"></input><input id = "update${i}" class="update" type="text" value = "${arr[i].description}"></input><i id="delete${i}" class="fas fa-trash-alt"></i>`;
      document.getElementById(`update${i}`).focus();
      document.getElementById(`delete${i}`).addEventListener('click', () => {
        removeIndex(i);
      });
    });
    document.body.addEventListener('click', (e) => {
      // Update task on clicking body
      if (!newDiv.contains(e.target) && document.getElementById(`update${i}`)) {
        newDiv.classList.remove('edit-mode');
        const arr = getStorage();
        setStorage(editTask(arr, i));
        populateTasks(editTask(arr, i));
      }
    });
  }
  setStorage(arr);
};

// Add new task
addTask.addEventListener('click', () => {
  populateTasks(addNewTask(getStorage()));
});

// Display tasks
document.addEventListener('DOMContentLoaded', () => {
  populateTasks(tasks);
});
