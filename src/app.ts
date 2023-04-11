interface ToDoApp {
    name: string;
    completed: boolean;
}

class Todo {
    private todos: ToDoApp[];
    constructor() {
        this.todos = [];
    }

    //add task
    addToList(todoName: string): void {
        const task: ToDoApp = {
            name: todoName,
            completed: false,
        };
        this.todos.push(task);
        this.allFunctionHandler();
    }

    //edit task
    editDoList(index: number, todoName: string): void {
        this.todos[index].name = todoName;
        this.allFunctionHandler();
    }

    //delete task
    deleteToDoList(index: number): void {
        this.todos.splice(index, 1);
        this.allFunctionHandler();
    }

    //mark completed task
    completeTask(index: number): void {
        this.todos[index].completed = !this.todos[index].completed;
        this.allFunctionHandler();
    }

    //all functions
    allFunctionHandler(): void {
        const todoList = document.getElementById("todo-list") as HTMLLIElement;
        const allTasks = document.getElementById("count") as HTMLElement;
        let count = 0;
        todoList.innerHTML = "";

        this.todos.forEach((task: ToDoApp, index: number) => {
            const listItem = document.createElement("li");
            listItem.className = "task-item";
            if (task.completed) {
                listItem.classList.add("completed");
                count++;
            }

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => {
                this.completeTask(index);
            });

            const todoName = document.createElement("span");
            todoName.textContent = task.name;
            todoName.className = "task-name";

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.className = "edit";
            editButton.addEventListener("click", () => {
                const newtodoName = prompt("Edit Your Task :", task.name);
                if (newtodoName) {
                    this.editDoList(index, newtodoName);
                }
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "del";
            deleteButton.addEventListener("click", () => {
                this.deleteToDoList(index);
            });

            listItem.appendChild(checkbox);
            listItem.appendChild(todoName);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
        });

        const Total = this.todos.length;
        const Incomplete = Total - count;

        allTasks.innerHTML = `<nav class="nav todo-nav">
                                  <p>All : <span>${Total}</span>|</p>
                                  <p>Completed : <span>${count}</span>|</p>
                                  <p>Incompleted :  <span>${Incomplete}</span></p>
                                  </nav>`;
    }
}

const todo = new Todo();

const todoInput = document.getElementById("toDoInput") as HTMLInputElement;
const addButton = document.getElementById("addTodoButton") as HTMLButtonElement;
addButton.addEventListener("click", () => {
    const todoName = todoInput.value.trim();
    if (todoName) {
        todo.addToList(todoName);
        todoInput.value = "";
    }
});
