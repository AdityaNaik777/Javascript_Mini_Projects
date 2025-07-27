const todoInput=document.getElementById("todo-input");
const addTaskButton=document.getElementById("add-task");
const todoList=document.getElementById("todo-list");
let tasks=[];

// Load tasks from local storage if available
tasks=JSON.parse(localStorage.getItem("tasks"))||[];
// Render existing tasks from local storage
addTaskButton.addEventListener('click',function(){
  const taskText=todoInput.value.trim();
  if(taskText===""){
    alert("Please enter a task");
    return;
  }
  else{
    const newTask={
      id:Date.now(),
      taskname:taskText,
      completed:false,
    }
    tasks.push(newTask);
    todoInput.value=""; //clear input
    saveTask(); // Save tasks to local storage 
    rendertask(newTask); // Render the new task
  }
  
})

function rendertask(task){
  const li=document.createElement('li');
  li.setAttribute("data-id",task.id);
  li.textContent=task.taskname;
  if(task.completed){
    li.classList.add("completed");
  }
  li.innerHTML=
  `<span>${task.taskname}</span>
  <button class="delete-task">Delete</button>`;

  // if delete button is clicked
  li.querySelector('.delete-task').addEventListener('click',(e)=>{
    const taskId=task.id;
    e.stopPropagation(); // Prevent the click event from bubbling up to the li
    tasks=tasks.filter(t=>t.id!==taskId); // Remove the task from the tasks array
    li.remove(); // Remove the task from the UI
    // Save the updated tasks array to local storage
    saveTask();
  })
  todoList.appendChild(li);
}

function saveTask(){
  localStorage.setItem("tasks",JSON.stringify(tasks));
  // Save tasks to local storage
}