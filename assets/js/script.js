var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");

formEl.addEventListener("submit",taskFormHandler);


function taskFormHandler(event)
{
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    if(!taskNameInput||!taskTypeInput)
    {
        alert("Please fill out the form");
        return false;
    }

    var taskDataObj = {
        name:taskNameInput,
        type:taskTypeInput
    };

    formEl.reset();

    createTaskEl(taskDataObj);
}

function createTaskEl(taskDataObj)
{
    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";

    var taskInfoEl=document.createElement("div");
    taskInfoEl.className="task-info";

    taskInfoEl.innerHTML="<h3 class='task-name'>"+taskDataObj.name+"</h3><span class='task-type'>"+ taskDataObj.type+"</span>";

    listItemEl.appendChild(taskInfoEl);
    
    tasksToDoEl.appendChild(listItemEl);
}
