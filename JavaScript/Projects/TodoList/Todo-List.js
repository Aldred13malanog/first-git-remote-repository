const todoList = [{
	name: 'make dinner',
	dueDate: '2022-12-22'
}, {
	name: 'wash dishes',
	dueDate: '2022-12-22'
}];

renderTodoList();

function renderTodoList() {
	let todoListHtml = '';
	for (let i = 0; i < todoList.length; i++) {
		const todoObject = todoList[i];
		const { name, dueDate } = todoObject;
		const html = `
		<div>${name}</div>
		<div>${dueDate}</div>
		<button class="delete-button js-delete-button">
			Delete
		</button>
		`;
		todoListHtml += html;
	}
	document.querySelector('.todo-list').innerHTML = todoListHtml;

	document.querySelectorAll('.js-delete-button')
		.forEach((deleteButton, index) => {
			deleteButton.addEventListener('click', () => {
				todoList.splice(index, 1);
				renderTodoList();
			});
	});
}

document.querySelector('.js-add-button').addEventListener('click', () => {
	addTodo();
});

function addTodo() {
	const inputName = document.querySelector('.js-input-name');
	const inputDueDate = document.querySelector('.js-duedate-input');

	const name = inputName.value;
	const dueDate = inputDueDate.value;

	todoList.push({
		name: name,
		dueDate: dueDate
	});

	inputName.value = '';
	inputDueDate.value = '';

	renderTodoList();
}