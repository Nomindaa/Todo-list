document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const todoButton = document.getElementById("todo-button");
  const todoItems = document.getElementById("todo-items");
  const clearAllButton = document.getElementById("clear-button");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function displayOrHideClearAllButton(todos) {
    if (todos.length > 1) {
      console.log("todos", todos.length);
      clearAllButton.style.display = "block";
    } else {
      clearAllButton.style.display = "none";
    }
  }

  function displayTasks() {
    todoItems.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
      const newListElement = createTodoItem(todos[i], i);
      todoItems.appendChild(newListElement);
    }
  }

  function createTodoItem(item, index) {
    const li = document.createElement("li");

    li.dataset.index = index;

    // Create a checkbox and insert it into the list item
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    li.appendChild(checkbox);

    // Create a span and insert it into the list item
    const span = document.createElement("span");
    span.innerHTML = item;
    li.appendChild(span);

    // Create a delete button and insert it into the list item
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.id = "delete-button";
    li.appendChild(deleteButton);

    return li;
  }

  todoButton.addEventListener("click", function (e) {
    e.preventDefault();

    const newTask = todoInput.value.trim();

    if (newTask == "") {
      alert("Please enter a task");
    } else {
      todos.push(newTask);

      localStorage.setItem("todos", JSON.stringify(todos));

      displayOrHideClearAllButton(todos);

      const newListElement = createTodoItem(newTask, todos.length - 1);
      todoItems.appendChild(newListElement);

      todoInput.value = "";
    }
  });

  todoItems.addEventListener("click", function (e) {
    if (e.target.id === "delete-button") {
      const index = e.target.parentElement.dataset.index;
      todos.splice(index, 1);

      displayOrHideClearAllButton(todos);

      localStorage.setItem("todos", JSON.stringify(todos));

      displayTasks();
    }

    if (e.target.id === "checkbox") {
      const span = e.target.nextElementSibling;

      if (e.target.checked) {
        span.style.textDecoration = "line-through";
        span.style.color = "grey";
      } else {
        span.style.textDecoration = "none";
        span.style.color = "black";
      }
    }
  });

  clearAllButton.addEventListener("click", function () {
    localStorage.setItem("todos", JSON.stringify([]));
    todos = [];
    displayOrHideClearAllButton(todos);
    displayTasks();
  });

  displayTasks();
});
