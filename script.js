const taskInput = document.querySelector(".input input");
const addBtn = document.getElementById("add-btn");
tasksContainer = document.querySelector(".tasks-container");
const clearAllBtn = document.querySelector(".clearAll");
const filters = document.querySelectorAll(".filters div");
const completeAll = document.querySelector(".completedAll");
// getting localstorage to work
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(e => {
    e.addEventListener('click', () => {
        document.querySelector("div.active").classList.remove("active");
        e.classList.add("active")
        showTodo(e.id);
    })
})

// function to show todo list fro local storage...
function showTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            // if the task is completed then it will show strike in the page even if refreshes...
            let completed = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all") {
                li += ` <li class="task">
                            <label for="${id}">
                                <input onclick="changeStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <span class="${completed}">${todo.name}</span>
                            </label>
                            <div onclick="deleteTask(${id})" class="delete">
                                <i class="fas fa-trash-alt"></i>
                            </div>
                        </li>`;
            }
        });
        showCount(todos.length);
    }
    tasksContainer.innerHTML = li;
}
showTodo("all");

function changeStatus(currentTask) {
    // console.log(currentTask);
    let task = currentTask.parentElement.lastElementChild;
    if (currentTask.checked) {
        // striking a line through if the checkbox is selected
        task.classList.add("checked");
        // and changing its state to completed is checkbox is selected
        todos[currentTask.id].status = "completed";
    } else {
        task.classList.remove("checked");
        // and changing its state to incompleted is checkbox is de-selected
        todos[currentTask.id].status = "incomplete";
    }
    // saving the changed status to local storage
    localStorage.setItem("todo-list", JSON.stringify(todos));
}

// this function will show the count of tasks left to complete....
function showCount(count) {
    document.getElementById("count").innerHTML = count;
}

// to delete
function deleteTask(taskId) {
    todos.splice(taskId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}
clearAllBtn.addEventListener("click", () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
})

completeAll.addEventListener("click", () => {
    if (todos) {
        todos.forEach((todo) => {
            todo.status = "completed"
        })
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all")
})

// to save the list in local storage
addBtn.addEventListener("click", e => {
    let userTask = taskInput.value.trim();
    if (addBtn && userTask) {
        if (!todos) {
            // if list is empty then pass an empty array
            todos = [];
        }
        taskInput.value = "";
        let taskInfo = { name: userTask, status: "incomplete" };
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
    }
})
