var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");

formEl.addEventListener("click",createTaskHandler);

function createTaskHandler()
{
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";
    listItemEl.textContent="New Task";
    tasksToDoEl.appendChild(listItemEl);
}