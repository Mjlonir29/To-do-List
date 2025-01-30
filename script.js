document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.textContent = taskInput.value;

    // Add complete button
    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.style.background = "green";
    completeBtn.style.color = "white";
    completeBtn.onclick = function() {
        li.classList.toggle("completed");
        saveTasks();
    };

    // Add delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.background = "red";
    deleteBtn.style.color = "white";
    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(task => {
        tasks.push({
            text: task.textContent.replace("✔❌", "").trim(),
            completed: task.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskData => {
        let li = document.createElement("li");
        li.textContent = taskData.text;

        if (taskData.completed) {
            li.classList.add("completed");
        }

        let completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.style.background = "green";
        completeBtn.style.color = "white";
        completeBtn.onclick = function() {
            li.classList.toggle("completed");
            saveTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.style.background = "red";
        deleteBtn.style.color = "white";
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks();
        };

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
