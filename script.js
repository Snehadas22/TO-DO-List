const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');


document.addEventListener('DOMContentLoaded', getTodos);


addBtn.addEventListener('click', () => {
    if (todoInput.value === "") return;
    
    const todoObj = {
        text: todoInput.value,
        completed: false
    };

    createTodoElement(todoObj);
    saveLocalTodo(todoObj);
    todoInput.value = "";
});


function createTodoElement(todo) {
    const li = document.createElement('li');
    
    const span = document.createElement('span');
    span.innerText = todo.text;
    if (todo.completed) span.classList.add('completed');
    
  
    span.addEventListener('click', () => {
        span.classList.toggle('completed');
        updateLocalTodo(todo.text);
    });

  
    const delBtn = document.createElement('button');
    delBtn.innerText = 'Delete';
    delBtn.classList.add('delete-btn');
    delBtn.addEventListener('click', () => {
        li.remove();
        removeLocalTodo(todo.text);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
}



function saveLocalTodo(todo) {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    todos.forEach(todo => createTodoElement(todo));
}

function removeLocalTodo(text) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    const filteredTodos = todos.filter(t => t.text !== text);
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
}

function updateLocalTodo(text) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(t => {
        if (t.text === text) t.completed = !t.completed;
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}