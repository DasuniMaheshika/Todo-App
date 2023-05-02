"use strict";
// Define the Todo class & Initialize the items array, todoList, and summary elements
class Todo {
    // Render the initial state of the Todo list
    constructor() {
        this.items = [];
        this.todoList = document.getElementById("todo-list");
        this.summary = document.getElementById("count");
        this.render();
    }
    // Add an item to the list
    addItem(name) {
        const item = { taskName: name, completed: false };
        this.items.push(item);
        this.render();
    }
    // Edit an existing item in the list
    editItem(index, newName) {
        this.items[index].taskName = newName;
        this.render();
    }
    // Remove an item from the list
    removeItem(index) {
        this.items.splice(index, 1);
        this.render();
    }
    // Toggle the completed status of an item in the list
    toggleCompleted(index) {
        this.items[index].completed = !this.items[index].completed;
        this.render();
    }
    // Render an individual Todo item
    renderTodoItem(item, index) {
        const listItem = document.createElement("li"); // create a new list item element
        const checkbox = document.createElement("input"); // create a new input element
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.addEventListener("change", () => this.toggleCompleted(index));
        const taskName = document.createElement("span"); // create a new span element
        taskName.textContent = item.taskName;
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        editButton.addEventListener("click", () => {
            const newName = prompt("Edit task name:", item.taskName);
            if (newName) {
                this.editItem(index, newName);
            }
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "del";
        deleteButton.addEventListener("click", () => this.removeItem(index));
        // Add the elements to the Todo item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskName);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        return listItem;
    }
    // Render the entire Todo list
    render() {
        this.todoList.innerHTML = "";
        let completedCount = 0;
        // Render each Todo item and add it to the Todo list
        const transformedItems = this.items.map((item, index) => {
            const listItem = this.renderTodoItem(item, index);
            if (item.completed) {
                completedCount++;
            }
            return listItem;
        });
        this.todoList.append(...transformedItems);
        const totalCount = this.items.length;
        const incompleteCount = totalCount - completedCount;
        // Set the text content of the summary element to a string containing the total count, completed count, and incomplete count of todo items using template literals
        this.summary.textContent = `All : ${totalCount} | Completed : ${completedCount} | Incomplete : ${incompleteCount}`;
    }
}
const todoInput = document.getElementById("toDoInput");
const addButton = document.getElementById("addTodoButton");
const todo = new Todo(); // Create a new instance of the Todo class and assign it to the constant todo
addButton.addEventListener("click", () => {
    const name = todoInput.value.trim();
    if (name) {
        todo.addItem(name);
        todoInput.value = "";
    }
});
