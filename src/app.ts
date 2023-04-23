// define the TodoItem interface with taskName and completed properties
interface TodoItem {
    taskName: string;
    completed: boolean;
}

// Define the Todo class & Initialize the items array, todoList, and summary elements
class Todo {
    private items: TodoItem[] = [];
    private todoList = document.getElementById("todo-list")!;
    private summary = document.getElementById("count")!;

    // Render the initial state of the Todo list
    constructor() {
        this.render();
    }

    // Add an item to the list
    public addItem(name: string): void {
        const item: TodoItem = { taskName: name, completed: false };
        this.items.push(item);
        this.render();
    }

    // Edit an existing item in the list
    public editItem(index: number, newName: string): void {
        this.items[index].taskName = newName;
        this.render();
    }

    // Remove an item from the list
    public removeItem(index: number): void {
        this.items.splice(index, 1);
        this.render();
    }

    // Toggle the completed status of an item in the list
    public toggleCompleted(index: number): void {
        this.items[index].completed = !this.items[index].completed;
        this.render();
    }

    // Render an individual Todo item
    private renderTodoItem(item: TodoItem, index: number) {
        const listItem = document.createElement("li");  // create a new list item element

        const checkbox = document.createElement("input");  // create a new input element
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.addEventListener("change", () => this.toggleCompleted(index));

        const taskName = document.createElement("span");  // create a new span element
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
    private render(): void {
        this.todoList.innerHTML = "";
        let completedCount = 0;

        // Render each Todo item and add it to the Todo list
        this.items.forEach((item: TodoItem, index: number) => {
            const listItem = this.renderTodoItem(item, index);
            this.todoList.appendChild(listItem);

            if (item.completed) {
                completedCount++;
            }
        });

        const totalCount = this.items.length;
        const incompleteCount = totalCount - completedCount;

        // Set the text content of the summary element to a string containing the total count, completed count, and incomplete count of todo items using template literals
        this.summary.textContent = `All : ${totalCount} | Completed : ${completedCount} | Incomplete : ${incompleteCount}`;
    }
}

const todoInput = document.getElementById("toDoInput") as HTMLInputElement;
const addButton = document.getElementById("addTodoButton") as HTMLButtonElement;
const todo = new Todo();  // Create a new instance of the Todo class and assign it to the constant todo

addButton.addEventListener("click", () => {
    const name = todoInput.value.trim();
    if (name) {
        todo.addItem(name);
        todoInput.value = "";
    }
});
