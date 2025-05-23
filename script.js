window.onload = function () {
    
    const taskInput = document.getElementById("task-input");
    const addButton = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    let tasks = [];
    let currentFilter = "all";
  
    
    addButton.addEventListener("click", function () {
      let taskText = taskInput.value;
  
      if (taskText.trim() !== "") {
        let newTask = {
          id: Date.now(),
          text: taskText,
          completed: false
        };
  
        tasks.push(newTask);
        taskInput.value = ""; 
        showTasks();
      }
    });
  
    
    function showTasks() {
      taskList.innerHTML = ""; 
  
      let filtered = tasks.filter(function (task) {
        if (currentFilter === "all") return true;
        if (currentFilter === "completed") return task.completed;
        if (currentFilter === "pending") return !task.completed;
      });
  
      filtered.forEach(function (task) {
        
        let li = document.createElement("li");
        if (task.completed) {
          li.classList.add("completed");
        }
  
        
        let span = document.createElement("span");
        span.innerText = task.text;
        span.style.cursor = "pointer";
  
        
        span.addEventListener("click", function () {
          task.completed = !task.completed;
          showTasks();
        });
  
        
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
  
        deleteBtn.addEventListener("click", function () {
          tasks = tasks.filter(function (t) {
            return t.id !== task.id;
          });
          showTasks();
        });
  
        
        li.appendChild(span);
        li.appendChild(deleteBtn);
  
        
        taskList.appendChild(li);
      });
    }
  
    
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active");
        });
  
        
        button.classList.add("active");
  
        
        currentFilter = button.getAttribute("data-filter");
  
        
        showTasks();
      });
    });
  
    
    showTasks();
  };
  