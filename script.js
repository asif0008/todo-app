  // Task Class
  class Task {
    constructor(title) {
      this.title = title;
    }
  }

  // UI Class
  class UI {
    // Add task to list
    static addTaskToList(task) {
      const taskList = document.querySelector('#list');
      const div = document.createElement('div');

      div.className = 'd-flex align-items-center justify-content-between gap-2 my-3 added-list';
      div.innerHTML = `<span class="flex-fill task">${task.title}</span>
      <div class="d-flex align-items-center gap-2">
          <span class="fw-bold">
              <div class="form-check form-switch mb-0">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
              </div>
          </span>
          <span class="fw-bold"><i class="bi bi-x-lg bg-danger btn btn-sm fs-5 py-1 px-2 text-white rounded delete"></i></span>
      </div>`;
      
      taskList.appendChild(div);

    }

    // Clear fields
    static clearFields() {
      document.querySelector('#task-title').value = '';
    }

    // Alert
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));

      const container = document.querySelector('main .container');
      const form = document.querySelector('#form');
      container.insertBefore(div, form);

      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, 3000);
    }

    // Remove task from list 
    static removeTask(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.parentElement.remove();

        UI.showAlert('Task removed successfully', 'success');
      }
    }
  }

  // Display and remove Task in Local Storage
document.addEventListener('DOMContentLoaded', () => {
  const tasks = Store.getTasks();
  tasks.forEach((task) => {
    UI.addTaskToList(task);
  })
})

  // Store Class
  class Store {
    static getTasks() {
      return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    static addTaskToLocalStorage(task) {
      const tasks = Store.getTasks();
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTaskFromLocalStorage(index) {
      const tasks = Store.getTasks();
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  // Event for Adding task
  document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault()
    
    // Getting input value
    const title = document.querySelector('#task-title').value;

    // instantiate a task
    const task = new Task(title);

    if(title == '') {
      // Showing danger message
      UI.showAlert('Please add your task in the field', 'danger');
    }else {
      // Adding task to list
    UI.addTaskToList(task);

    // Clearing fields
    UI.clearFields();

    // Showing Success message
    UI.showAlert('Task has been added', 'success');

    // Saving Task in local storage
    Store.addTaskToLocalStorage(task);
    }
  });

  // Event for removing task
  document.querySelector('#list').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
      UI.removeTask(e.target);

      const taskTitle = e.target.parentElement.parentElement.previousElementSibling.textContent;
      const tasks = Store.getTasks();
      const index = tasks.findIndex(task => task.title === taskTitle);
      if (index !== -1) {
        Store.removeTaskFromLocalStorage(index);
      }
    }
  })



