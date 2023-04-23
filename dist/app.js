"use strict";
// Define the Todo class & Initialize the items array, todoList, and summary elements
class Todo {
    // Render the initial state of the Todo list
    constructor() {
        this.items = []; // initialize items as an empty array of TodoItems
        this.todoList = document.getElementById("todo-list"); // get reference to the todo list element in the DOM
        this.summary = document.getElementById("count"); // get reference to the summary element in the DOM
        this.render(); // call the render method 
    }
    // Add an item to the list
    addItem(name) {
        const item = { taskName: name, completed: false }; // create a new TodoItem object
        this.items.push(item); // add the item to the items array
        this.render(); // Render the updated state of the Todo list
    }
    // Edit an existing item in the list
    editItem(index, newName) {
        this.items[index].taskName = newName; // update the name of the specified item
        this.render(); // Render the updated state of the Todo list
    }
    // Remove an item from the list
    removeItem(index) {
        this.items.splice(index, 1); // remove the specified item from the items array
        this.render(); // Render the updated state of the Todo list
    }
    // Toggle the completed status of an item in the list
    toggleCompleted(index) {
        this.items[index].completed = !this.items[index].completed; // toggle the completed state of the specified item
        this.render(); // Render the updated state of the Todo list
    }
    // Render an individual Todo item
    renderTodoItem(item, index) {
        const listItem = document.createElement("li"); // create a new list item element
        const checkbox = document.createElement("input"); // create a new input element
        checkbox.type = "checkbox"; // set the input type to checkbox
        checkbox.checked = item.completed; // set the checked state based on the completed property of the item
        // add an event listener to toggle the completed state when the checkbox is changed
        checkbox.addEventListener("change", () => this.toggleCompleted(index));
        const taskName = document.createElement("span"); // create a new span element
        taskName.textContent = item.taskName; // set the text content to the task name of the item
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";
        // Add an event listener to edit the item when the Edit button is clicked
        editButton.addEventListener("click", () => {
            const newName = prompt("Edit task name:", item.taskName);
            if (newName) { // if a new name is provided
                this.editItem(index, newName); // call the editItem method to update the item name
            }
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "del";
        // Add an event listener to remove the item when the Delete button is clicked
        deleteButton.addEventListener("click", () => this.removeItem(index));
        // Add the elements to the Todo item
        listItem.appendChild(checkbox); // Append a checkbox element to the list item
        listItem.appendChild(taskName); // Append a span element containing the task name to the list item
        listItem.appendChild(editButton); // Append an edit button element to the list item
        listItem.appendChild(deleteButton); // Append a delete button element to the list item
        return listItem; // Return the list item with its contents appended
    }
    // Render the entire Todo list
    render() {
        this.todoList.innerHTML = ""; // Clear the existing Todo list
        let completedCount = 0; // Initialize the completedCount to 0
        // Render each Todo item and add it to the Todo list
        this.items.forEach((item, index) => {
            const listItem = this.renderTodoItem(item, index);
            this.todoList.appendChild(listItem);
            // Increment the completedCount if the item is completed
            if (item.completed) {
                completedCount++;
            }
        });
        // Increment the completedCount if the item is completed
        const totalCount = this.items.length;
        const incompleteCount = totalCount - completedCount;
        // Set the text content of the summary element to a string containing the total count, completed count, and incomplete count of todo items using template literals
        this.summary.textContent = `All : ${totalCount} | Completed : ${completedCount} | Incomplete : ${incompleteCount}`;
    }
}
const todoInput = document.getElementById("toDoInput"); // Get the HTMLInputElement with id "toDoInput" and assign it to the constant todoInput
const addButton = document.getElementById("addTodoButton"); // Get the HTMLButtonElement with id "addTodoButton" and assign it to the constant addButton
const todo = new Todo(); // Create a new instance of the Todo class and assign it to the constant todo
addButton.addEventListener("click", () => {
    const name = todoInput.value.trim(); // Get the value of the todoInput and remove any whitespace at the beginning or end, then assign it to the constant name
    if (name) { // If the name is not an empty string
        todo.addItem(name); // Add a new item to the todo list with the name
        todoInput.value = ""; // Clear the value of the todoInput
    }
});
