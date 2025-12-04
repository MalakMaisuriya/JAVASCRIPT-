var addBtn = document.getElementById("addBtn");
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var clearAll = document.getElementById("clearAll");

window.onload = function() {
    var saved = JSON.parse(localStorage.getItem("tasks")) || [];
    for(var i=0; i<saved.length; i++){
        loadTask(saved[i].text, saved[i].done);
    }
};

function saveTasks() {
    var tasks = [];
    var allTasks = document.getElementsByClassName("task-item");
    for(var i=0; i<allTasks.length; i++){
        var span = allTasks[i].getElementsByClassName("task-text")[0];
        tasks.push({
            text: span.textContent,
            done: span.classList.contains("task-done")
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask(text, done) {
    if(done === undefined) done = false;

    var div = document.createElement("div");
    div.className = "task-item";

    var span = document.createElement("span");
    span.className = "task-text";
    if(done) span.className += " task-done";
    span.textContent = text;

    var btnDiv = document.createElement("div");

    var doneBtn = document.createElement("button");
    doneBtn.className = "btn btn-success btn-sm me-2";
    doneBtn.textContent = "Done";

    var delBtn = document.createElement("button");
    delBtn.className = "btn btn-danger btn-sm";
    delBtn.textContent = "Delete";

    btnDiv.appendChild(doneBtn);
    btnDiv.appendChild(delBtn);

    div.appendChild(span);
    div.appendChild(btnDiv);
    taskList.appendChild(div);

    doneBtn.onclick = function() {
        span.className = "task-text task-done"; 
        doneBtn.disabled = true; 
        saveTasks();
    };

    delBtn.onclick = function() {
        taskList.removeChild(div);
        saveTasks();
    };
}

function addTask() {
    var text = taskInput.value.trim();
    if(text === "") return;
    loadTask(text);
    saveTasks();
    taskInput.value = "";
}

addBtn.onclick = addTask;

taskInput.onkeypress = function(e) {
    if(e.key === "Enter") addTask();
};

clearAll.onclick = function() {
    taskList.innerHTML = "";
    saveTasks();
};
