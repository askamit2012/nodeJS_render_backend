const fs = require("fs");

function getAllTasks() {
  const allTasks = fs.readFileSync("./data/tasks.json");
  const tasks = JSON.parse(allTasks);
  return tasks;
}

function getId(tasks) {
  if (tasks.length === 0) {
    return 1;
  } else {
    return tasks[tasks.length - 1].id + 1;
  }
}

function addTask(tasks) {
  return fs.writeFileSync("./data/tasks.json", tasks);
}

function deleteTask(id) {
  let tasks = getAllTasks();
  let index = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
  addTask(JSON.stringify(tasks));
}

function checkTask(id) {
  let tasks = getAllTasks();
  let index = tasks.findIndex((task) => task.id === id);
  tasks[index].isChecked = !tasks[index].isChecked;
  addTask(JSON.stringify(tasks));
}

function editTask(id) {
  let tasks = getAllTasks();
  let index = tasks.findIndex((task) => task.id === id);
  tasks[index].isEditable = !tasks[index].isEditable;
  addTask(JSON.stringify(tasks));
}

function modifyTask(id, task) {
  let newTask = {
    id,
    task,
    isChecked: false,
    isEditable: false,
  };
  let tasks = getAllTasks();
  let index = tasks.findIndex((item) => item.id === id);
  tasks.splice(index, 1, newTask);
  addTask(JSON.stringify(tasks));
}

module.exports = {
  getAllTasks,
  addTask,
  getId,
  deleteTask,
  checkTask,
  editTask,
  modifyTask,
};
