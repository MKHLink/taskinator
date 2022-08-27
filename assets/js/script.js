var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");
var taskInProgressEl = document.querySelector("#task-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var pageContentEl = document.querySelector("#page-content");

var tasks=[];

pageContentEl.addEventListener("click",taskButtonHandler);

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

    var isEdit = formEl.hasAttribute("data-task-id");
    
    if(isEdit)
    {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput,taskTypeInput,taskId);
    }
    else
    {
        var taskDataObj = {
            name:taskNameInput,
            type:taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }

    
    formEl.reset();
    
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

    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

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

function taskButtonHandler(event)
{
    var targetEl = event.target;

    if(targetEl.matches(".edit-btn"))
    {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if(targetEl.matches(".delete-btn"))
    {
        var taskId = targetEl.getAttribute("data-task-id");
        deletTask(taskId);
    }

}

function deletTask(taskId)
{
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
    taskSelected.remove();

    var updatedTaskArr = [];
    for (var i = 0; i < tasks.length; i++) 
    {
        if (tasks[i].id !== parseInt(taskId)) 
        {
          updatedTaskArr.push(tasks[i]);
        }
    }
    tasks = updatedTaskArr;
}

function editTask(taskId)
{
    var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id",taskId);
}

function completeEditTask(taskName, taskType,taskId)
{
    var taskSelected = document.querySelector(".task-item[data-task-id = '"+taskId+"']");

    taskSelected.querySelector("h3.task-name").textContent=taskName;
    taskSelected.querySelector("span.task-type").textContent=taskType;

    for(var i =0;i<tasks.length;i++)
    {
        if(tasks[i].id===parseInt(tasksId))
        {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }

    alert("Task Updated");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
}

pageContentEl.addEventListener("change",tasksStausChangeHandler);

function tasksStausChangeHandler(event)
{
    var taskId = event.target.getAttribute("data-task-id");

    var statusValue = event.target.value.toLowerCase();

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if(statusValue==="to do")
    {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") 
    {
        taskInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed")
    {
        tasksCompletedEl.appendChild(taskSelected);
    }

    for (var i = 0; i < tasks.length; i++) 
    {
        if (tasks[i].id === parseInt(taskId)) 
        {
          tasks[i].status = statusValue;
        }
    }
}