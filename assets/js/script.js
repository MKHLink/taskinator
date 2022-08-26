var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");

formEl.addEventListener("submit",taskFormHandler);

var taskIdCounter = 0;


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

    listItemEl.setAttribute("data-task-id",taskIdCounter);

    var taskInfoEl=document.createElement("div");
    taskInfoEl.className="task-info";

    taskInfoEl.innerHTML="<h3 class='task-name'>"+taskDataObj.name+"</h3><span class='task-type'>"+ taskDataObj.type+"</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
    
    tasksToDoEl.appendChild(listItemEl);

    taskIdCounter++;
}

function createTaskActions(taskId)
{
    //edit button
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);

    actionContainerEl.appendChild(editButtonEl);

    //delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);
    
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name","status-change");
    statusSelectEl.setAttribute("data-task-id",taskId);

    var statusChoices = ["To Do","In Progress","Completed"];
    for(var i = 0;i<statusChoices.length;i++)
    {
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value",statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
}