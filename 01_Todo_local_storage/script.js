document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-todo-btn");
  const todoList = document.getElementById("todo-list");
let tasks=[];
  tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => rendertask(task)); 
  addTaskButton.addEventListener("click", function () {
    const tasktext = todoInput.value.trim();
    //trim removes leading and trailing spaces
    if (tasktext == "") {
      alert("Please enter a task");
      return;
    } else {
      const newTask = {
        id: Date.now(),
        text: tasktext,
        completed: false,
      };
      tasks.push(newTask);
      todoInput.value = ""; //clear input
      // console.log(tasks);
      saveTask();
      rendertask(newTask); // Render existing tasks from local storage
    }
  });

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    //save tasks to local storage
  }

  function rendertask(task) {
    // console.log(task.text);
    const li=document.createElement('li');
    li.setAttribute("data-id",task.id);
    if(task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML=
    `<span>${task.text}</span>
    <button>delete</button>`
    li.addEventListener('click',(e) => {
      if (e.target.tagName === "BUTTON") {
        return;
      }
        task.completed=!task.completed;
        li.classList.toggle("completed")
        saveTask();
    });

    li.querySelector('button').addEventListener('click',(e)=>{
      e.stopPropagation();
      //stop the event from bubbling up to the li click event
      tasks=tasks.filter(t=> t.id!==task.id);
      li.remove();
      //remove the task from the list
      saveTask();
    })
    todoList.appendChild(li);
  }
});
