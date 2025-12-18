function addTask() {
  // Function to add a new task
  const input = document.getElementById("task-input");
  const task = input.value.trim();
  if (task !== "") {
    const taskList = document.getElementById("task-list");
    const li = document.createElement("li");

    const removeBtton = document.createElement("button");
    removeBtton.textContent = "Remove";
    removeBtton.onclick = removeTask;

    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.onclick = markTaskComplete;

    li.textContent = task + " ";
    li.appendChild(completeButton);
    li.appendChild(removeBtton);
    taskList.appendChild(li);
    input.value = "";
  }
}

function removeTask() {
  // Function to remove an existing task
  this.parentElement.remove();
}

function markTaskComplete() {
  this.parentElement.classList.toggle("completed");
}

function filterTasks() {
  // Function to filter tasks based on their completion status
  const filter = document.getElementById("search").value.trim().toLowerCase();

  const tasks = document.getElementById("task-list").children;

  for (let task of tasks) {
    if (task.textContent.toLowerCase().includes(filter)) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  }
}
