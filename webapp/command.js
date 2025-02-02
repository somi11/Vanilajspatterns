import { TodoItem, TodoList } from "./classes.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }

}

export const Commands = {
  ADD: "add",
  DELETE: "delete"
}

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance()
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const iteminList = todoList.find(todoText);
        if (todoText != "" && iteminList == undefined) {
          todoInput.value = "";
          todoList.add(new TodoItem(todoText));
        }
        break;
      case Commands.DELETE:
        const [texttoDelete] = command.args;
        todoList.delete(texttoDelete);
        break;
      
      
    }
  }
}