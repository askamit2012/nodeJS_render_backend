const express = require("express");
const {
  getAllTasks,
  addTask,
  getId,
  deleteTask,
  checkTask,
  editTask,
  modifyTask,
} = require("./helpers/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", (req, res) => {
  let tasks = getAllTasks();
  res.status(200).send(tasks);
});

app.post("/tasks", (req, res) => {
  const taskVal = req.body.task;
  //   let allTasks = getAllTasks();
  //   let tasks = JSON.parse(allTasks);
  let tasks = getAllTasks();
  console.log("tasks in post task : ", tasks, taskVal);
  let newTask = {
    id: getId(tasks),
    task: taskVal,
    isChecked: false,
    isEditable: false,
  };
  tasks.push(newTask);
  addTask(JSON.stringify(tasks));
  res.status(200).send("posting task ...!");
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  //   console.log("id in delete : ", id);
  deleteTask(id);
  res.status(200).send("deleting the task : ");
});

app.put("/tasks", (req, res) => {
  const id = req.body.id;
  const type = req.body.type;
  const task = req.body.task;
  //   console.log("type in put : ", type);
  if (type === "check") {
    checkTask(id);
  } else if (type === "edit") {
    editTask(id);
  } else {
    modifyTask(id, task);
  }

  res.status(200).send("updating task : ");
});

app.listen(PORT, function () {
  console.log(`app running on port ${PORT}`);
});
