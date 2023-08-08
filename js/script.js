//Clase Task
class Task {
  constructor(name, taskComment, assignedTo, dueDate, priority) {
    this.name = name;
    this.taskComment = taskComment;
    this.assignedTo = assignedTo;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = false;
  }
}

// Array de tareas
let tasks = [];

// DOM 
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task-btn");

// Funcion para crear y agregar una tarea
function addTask() {
  const taskName = document.getElementById("task-name").value;
  const taskComment = document.getElementById("task-comment").value;
  const assignedTo = document.getElementById("assigned-to").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;

  if (taskName && taskComment && assignedTo && dueDate) {
    const task = new Task(taskName, taskComment, assignedTo, dueDate, priority);
    
    tasks.push(task);

    //Ordenar por fecha y prioridad
    /*tasks.sort((a, b) => {
      const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
      if (dateComparison === 0) {
        const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        return dateComparison;
      }
    });*/
    tasks.sort((a, b) => {
      const dateComparison = new Date(a.dueDate) - new Date(b.dueDate);
      const priorityOrder = { Alta: 1, Media: 2, Baja: 3 };
      
      // Utilizar operador ternario para determinar el orden
      return dateComparison === 0
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : dateComparison;
    });
    
    saveTasksToLocalStorage();
    renderTasks();
    clearFormFields();
    Swal.fire({
      icon: 'success',
      title: 'Tarea agregada con éxito!',
      background: '#444',
      color: '#fff'
    })
  }
  else{
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No puedes dejar el formulario incompleto',
      background: '#444',
      color: '#fff'
    })
  }
}

// Funcion para mostrar la tarea
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-li");
    taskElement.classList.add("task");
    taskElement.classList.toggle("low-priority", task.priority === "Baja");
    taskElement.classList.toggle("medium-priority", task.priority === "Media");
    taskElement.classList.toggle("high-priority", task.priority === "Alta");
    taskElement.classList.toggle("completed", task.completed);

    const dueDate = task.dueDate.split('-').reverse().join('/');

    taskElement.innerHTML = `
      <div>
        <h3>${task.name}</h3>
        <p><span>Especificacion de la tarea:</span> ${task.taskComment}</p>
        <p><span>Asignada a:</span> ${task.assignedTo}</p>
        <p><span>Hacer antes de:</span> ${dueDate}</p>
        <p><span>Nivel de prioridad:</span> ${task.priority}</p>
      </div>
      
    `;

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-button");
    taskDiv.innerHTML = `
      <button onclick="completeTask(${index})">Completar</button>
      <button onclick="deleteTask(${index})">Eliminar</button>
    `;

    taskElement.appendChild(taskDiv);
    taskList.appendChild(taskElement);
    
  });
}

// Funcion para borrar una tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
  Swal.fire({
    icon: 'error',
    title: 'Tarea Eliminada!',
    background: '#444',
    color: '#fff'
  })
}

// Funcion para marcar una tarea como completa
/*function completeTask(index) {
  tasks[index].completed = true;
  saveTasksToLocalStorage();
  renderTasks();
}*/

function completeTask(index) {
  tasks = [
    ...tasks.slice(0, index),
    { ...tasks[index], completed: true },
    ...tasks.slice(index + 1)
  ];
  saveTasksToLocalStorage();
  renderTasks();
  Swal.fire({
    icon: 'success',
    title: 'Tarea Completada!',
    background: '#444',
    color: '#fff'
  })
}

// Funcion para guardar las tareas en el local storage
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Funcion para cargar las tareas del local storage
function loadTasksFromLocalStorage() {
  const tasksData = JSON.parse(localStorage.getItem("tasks"));
  if (tasksData) {
    tasks = tasksData;
    renderTasks();
  }
}

// Funcion para borrar los campos una vez agregada la tarea
function clearFormFields() {
  document.getElementById("task-name").value = "";
  document.getElementById("task-comment").value = "";
  document.getElementById("assigned-to").value = "";
  document.getElementById("due-date").value = "";
  document.getElementById("priority").value = "Baja";
}

// Event listener para el boton de agregar tarea
addTaskBtn.addEventListener("click", addTask);

// cargar las tareas del local storage al cargar la pagina
loadTasksFromLocalStorage();
