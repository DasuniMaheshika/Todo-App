interface ToDo {
  name: string;
  completed: boolean;
}

class Todo {
  private task: ToDo[];

  constructor() {
      this.task = [];
  }

  //add task
  addToList(taskName: string): void {
      const task: ToDo = {
          name: taskName,
          completed: false,
      };
      this.task.push(task);
      this.functioningTask();
  }

  //edit task
  editDoList(index: number, taskName: string): void {
      this.task[index].name = taskName;
      this.functioningTask();
  }

  //delete task
  deleteToDoList(index: number): void {
      this.task.splice(index, 1);
      this.functioningTask();
  }

  //tick complete task
  completeTask(index: number): void {
      this.task[index].completed = !this.task[index].completed;
      this.functioningTask();
  }

  //functions for tasks
  functioningTask(): void {
      const doList = document.getElementById("todo-list") as HTMLLIElement;
      const allAboutTasks = document.getElementById("count") as HTMLElement;
      let count = 0;

      doList.innerHTML = "";

      this.task.forEach((task: ToDo, index: number) => {
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

          const taskName = document.createElement("span");
          taskName.textContent = task.name;
          taskName.className = "task-name";

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.className = "edit";
          editButton.addEventListener("click", () => {
              const newTaskName = prompt("Edit Your Task :", task.name);
              if (newTaskName) {
                  this.editDoList(index, newTaskName);
              }
          });

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.className = "del";
          deleteButton.addEventListener("click", () => {
              this.deleteToDoList(index);
          });

          listItem.appendChild(checkbox);
          listItem.appendChild(taskName);
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);
          doList.appendChild(listItem);
      });

      const Total = this.task.length;
      const Incomplete = Total - count;

      allAboutTasks.innerHTML = `<nav class="nav todo-nav">
                                  <p>All : <span>${Total}</span>|</p>
                                  <p>Completed : <span>${count}</span>|</p>
                                  <p>Incomplete :  <span>${Incomplete}</span></p>
                                  </nav>`;
  }
}

const todo = new Todo();

const Input = document.getElementById("toDoInput") as HTMLInputElement;
const addButton = document.getElementById("addTodoButton") as HTMLButtonElement;
addButton.addEventListener("click", () => {
  const taskName = Input.value.trim();
  if (taskName) {
      todo.addToList(taskName);
      Input.value = "";
  }
})