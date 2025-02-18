document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    
    
    let taskInput = document.getElementById("taskInput");
    let taskCategory = document.getElementById("taskCategory").value;
    let taskPriority = document.getElementById("taskPriority").value;
    let taskDate = document.getElementById("taskDate").value;
    let taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `<strong>${taskInput.value}</strong> - ${taskCategory} | ${taskPriority} | Due: ${taskDate}`;

    let completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = function() {
        li.classList.toggle("completed");
        saveTasks();
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
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
        tasks.push({ text: task.innerText, completed: task.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(taskData => {
        let li = document.createElement("li");
        li.innerHTML = taskData.text;
        if (taskData.completed) li.classList.add("completed");
        taskList.appendChild(li);
    });
}
