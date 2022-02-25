function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => element[key] = props[key]);

    if (children.length > 0) {
        children.forEach(child => {
            if (typeof child === 'string') {
                child = document.createTextNode(child);
            }

            element.appendChild(child);
        });
    }

    return element;
}

function create(title) {
    let todoTitle = createElement('label', { className: 'todoTitle' }, title);
    let todoCheckbox = createElement('input', { type: 'checkbox', className: 'todoCheckbox' });
    let buttonDelete = createElement('button', { className: 'delete' }, 'X');

    let listItem = createElement('div', { className: 'todoitem' }, todoCheckbox, todoTitle, buttonDelete);

    listItem.querySelector('.todoCheckbox').addEventListener('change', makeCompleted);
    listItem.querySelector('button.delete').addEventListener('click', deleteTodo);

    return listItem;
}

function addTodoItem(event) {
    event.preventDefault();

    todoList.appendChild(create(addInput.value));

    addInput.value = '';
}

function makeCompleted() {
    let listItem = this.parentNode;

    listItem.classList.toggle('completed');
}

function deleteTodo() {
    todoList.removeChild(this.parentNode);
}

const todoForm = document.getElementById('form');
const addInput = document.getElementById('addInput');
const todoList = document.getElementById('todolist');
const todoItems = document.querySelectorAll('.todoitem');

function main() {
    todoForm.addEventListener('submit', addTodoItem);

    todoItems.forEach(item => {
        item.querySelector('.todoCheckbox').addEventListener('change', makeCompleted);
        item.querySelector('button.delete').addEventListener('click', deleteTodo);
    });
}

main();