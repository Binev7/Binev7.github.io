// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let dueDateInput = document.getElementById("dueDate");
    let taskText = taskInput.value.trim();
    let dueDate = dueDateInput.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    // Create list item
    let li = document.createElement("li");

    // Task text
    let taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.addEventListener("click", function () {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.appendChild(taskSpan);

    // Due date
    if (dueDate) {
        let dateSpan = document.createElement("span");
        dateSpan.textContent = `Due: ${dueDate}`;
        dateSpan.classList.add("due-date");
        li.appendChild(dateSpan);
    }

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Save tasks in localStorage
    saveTasks();

    // Clear input fields
    taskInput.value = "";
    dueDateInput.value = "";
}

// Save tasks to localStorage
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let taskText = li.querySelector("span").textContent;
        let dueDate = li.querySelector(".due-date") ? li.querySelector(".due-date").textContent.replace("Due: ", "") : "";
        let isCompleted = li.classList.contains("completed");
        tasks.push({ text: taskText, dueDate: dueDate, completed: isCompleted });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    savedTasks.forEach(task => {
        let li = document.createElement("li");

        let taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;
        if (task.completed) {
            li.classList.add("completed");
        }
        taskSpan.addEventListener("click", function () {
            li.classList.toggle("completed");
            saveTasks();
        });

        li.appendChild(taskSpan);

        if (task.dueDate) {
            let dateSpan = document.createElement("span");
            dateSpan.textContent = `Due: ${task.dueDate}`;
            dateSpan.classList.add("due-date");
            li.appendChild(dateSpan);
        }

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Clear all tasks
function clearTasks() {
    document.getElementById("taskList").innerHTML = "";
    localStorage.removeItem("tasks");
}
