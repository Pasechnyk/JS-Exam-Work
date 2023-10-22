window.onload = loadListPage;

let listname = "";
  
// Load lists names from local storage
function loadListPage() {
  const lists = JSON.parse(localStorage.getItem("lists"));
  if (localStorage.getItem("lists") === null) return;

  const list = document.querySelector("select"); 
  list.innerHTML = "";

  const arrayNameList = [];
  for (let i = 0; i < lists.length; i++)
  {  
      let val = Object.values(lists[i]);
      let value = Object.values(val);
      listname = value[0];               
      if(!arrayNameList[listname])
      { 
        arrayNameList.push(listname);
        const option = document.createElement("option"); 
        option.innerText = listname; 
        list.insertBefore(option, list.children[0]); 
      }
  }
}

// Add list
function addList() {
  const list = document.querySelector("#listText");
  const select = document.querySelector("select");

  if (list.value === "")
  {
    alert("Write the task first!");
    return false;
  }  
  localStorage.setItem(
    "lists",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("lists") || "[]"),
      { name: list.value },
    ])
  );  
  const option = document.createElement("option");
  option.innerText = list.value;
  select.insertBefore(option, select.children[0]);  
  list.value = "";
}

// Load list by name
function loadList(listname) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (localStorage.getItem("tasks") === null) return;

  const list = document.querySelector("ul");
  list.innerHTML = "";  

  tasks.filter(x => x.list == listname).forEach((task) => {    
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
     <input type="text" value="${task.task}"
     class="task ${task.completed ? "completed" : ""}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
     <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

// Load tasks from the lists
const tasks = JSON.parse(localStorage.getItem("tasks"));
const lists = JSON.parse(localStorage.getItem("lists"));

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));

  if (localStorage.getItem("tasks") === null) return;  
  tasks.forEach((task) => {
    const list = document.querySelector("ul");
    const li = document.createElement("li");

    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
      task.completed ? "checked" : ""
    }>
     <input type="text" value="${task.task}" class="task ${
      task.completed ? "completed" : ""
    }" onfocus="getCurrentTask(this)" onblur="editTask(this)">
     <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);
  });
}

// Add task
function addTask() {
  const task = document.querySelector("#toDoTask");
  const list = document.querySelector("ul");  

  if (task.value === "") {
    alert("Write the task first!");
    return false;
  }  
  if (document.querySelector(`#toDoTask[value="${task.value}"]`)) {
    alert("Such task already exists!");
    return false;
  } 
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { list: listname, task: task.value, completed: false },
    ])
  ); 
  const li = document.createElement("li");

  li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
  <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
  <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
  list.insertBefore(li, list.children[0]); 
  task.value = "";
}

// Query selectors for lists/tasks add and load work
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault(); 
  addTask();
});

document.querySelector("#list").addEventListener("submit", (e) => {
  e.preventDefault(); 
  addList();
});

document.querySelector("select").addEventListener("change", (e) => {
  listname = e.target.value;
  loadList(e.target.value);
});

// Mark task completed
function taskComplete(event) {
  tasks.forEach((task) => {
    if (task.task === event.nextElementSibling.value)
    {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

// Dynamic edit
function editTask(event) {
  const tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  if (event.value === "")
  {   
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  tasks.forEach((task) => {    
    if (task.task === event.value)
    {
      alert("Such task already exists!");
      event.value = currentTask;
      return;
    }
  });
  tasks.forEach((task) => {    
    if (task.task === currentTask)
    {
      task.task = event.value;
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

// Remove task
function removeTask(event) {
  const tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach((task) => {
    if (task.task === event.parentNode.children[1].value)
    {
      tasks.splice(tasks.indexOf(task), 1); 
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.parentElement.remove();
}

// Get current task
let currentTask = null; 
function getCurrentTask(event) {  
  currentTask = event.value;
}

// Clock display
(function () {  
  const clockContainer = document.querySelector(".clock");

  function updateClock() {
    clockContainer.innerText = new Date().toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
})();

// Date display
(function () {
  const dateContainer = document.querySelector(".date");

  function updateDat() {
    dateContainer.innerText = new Date().toDateString({
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  setInterval(updateDat, 1000);
})();