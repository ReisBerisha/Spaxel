const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');


window.addEventListener('DOMContentLoaded', () => {
  const saved = JSON.parse(localStorage.getItem('todos')) || [];
  saved.forEach(todo => addTodo(todo.text, todo.completed));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    addTodo(text);
    input.value = '';
  }
});

function addTodo(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTodos();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = '✖';
  delBtn.addEventListener('click', () => {
    li.remove();
    saveTodos();
  });

  li.appendChild(delBtn);
  list.appendChild(li);
  saveTodos();
}

function saveTodos() {
  const todos = [];
  list.querySelectorAll('li').forEach(li => {
    todos.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}