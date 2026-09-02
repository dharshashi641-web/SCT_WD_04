
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const activeTasks = document.getElementById("activeTasks");
const completedTasks = document.getElementById("completedTasks");

const currentTime = document.getElementById("currentTime");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const remainingText = document.getElementById("remainingText");
const clearCompleted = document.getElementById("clearCompleted");
const themeBtn = document.getElementById("themeBtn");

const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(timestamp) {
    const date = new Date(timestamp);

    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

function updateCurrentTime() {
    const now = new Date();

    currentTime.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}

updateCurrentTime();
setInterval(updateCurrentTime, 1000);

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: Date.now()
    };

    tasks.unshift(newTask);
    saveTasks();

    taskInput.value = "";
    taskInput.focus();

    renderTasks();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function renderTasks() {
    taskList.innerHTML = "";

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredTasks = tasks.filter(function(task) {
        const matchesSearch = task.text
            .toLowerCase()
            .includes(searchTerm);

        if (!matchesSearch) {
            return false;
        }

        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    emptyState.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        const content = document.createElement("div");
        content.className = "task-content";

        const text = document.createElement("div");
        text.className = "task-text";
        text.textContent = task.text;

        const time = document.createElement("small");
        time.className = "task-time";
        time.textContent = "Created: " + formatDate(task.createdAt);

        content.appendChild(text);
        content.appendChild(time);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editButton = document.createElement("button");
        editButton.className = "edit-btn";
        editButton.innerHTML = "✏️";
        editButton.title = "Edit task";

        editButton.addEventListener("click", function() {
            editTask(task.id, content, text);
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerHTML = "🗑️";
        deleteButton.title = "Delete task";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateStats();
}

function toggleTask(id) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

function editTask(id, content, textElement) {
    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (!task) {
        return;
    }

    const input = document.createElement("input");

    input.type = "text";
    input.className = "edit-input";
    input.value = task.text;
    input.maxLength = 100;

    content.replaceChild(input, textElement);

    input.focus();
    input.select();

    let saved = false;

    function saveEdit() {
        if (saved) {
            return;
        }

        saved = true;

        const newText = input.value.trim();

        if (newText === "") {
            renderTasks();
            return;
        }

        tasks = tasks.map(function(task) {
            if (task.id === id) {
                return {
                    ...task,
                    text: newText
                };
            }

            return task;
        });

        saveTasks();
        renderTasks();
    }

    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            saveEdit();
        }

        if (event.key === "Escape") {
            saved = true;
            renderTasks();
        }
    });

    input.addEventListener("blur", saveEdit);
}

function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const active = total - completed;

    totalTasks.textContent = total;
    activeTasks.textContent = active;
    completedTasks.textContent = completed;

    remainingText.textContent =
        `${active} ${active === 1 ? "task" : "tasks"} remaining`;
}

searchInput.addEventListener("input", renderTasks);

filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

clearCompleted.addEventListener("click", function() {
    const completedCount = tasks.filter(function(task) {
        return task.completed;
    }).length;

    if (completedCount === 0) {
        alert("There are no completed tasks.");
        return;
    }

    const confirmClear = confirm(
        "Remove all completed tasks?"
    );

    if (!confirmClear) {
        return;
    }

    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    saveTasks();
    renderTasks();
});

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeBtn.textContent = isDark ? "☀️" : "🌙";

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );
});

renderTasks();