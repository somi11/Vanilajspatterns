import { TodoList } from "./webapp/classes.js";
import { Command, CommandExecutor, Commands } from "./webapp/command.js";
import {LocalStorage} from './webapp/storage.js'
globalThis.DOM = {};

const DOM = globalThis.DOM;



document.addEventListener("DOMContentLoaded", () => {
    DOM.todoList =document.getElementById("todo-list");
    DOM.addBtn = document.getElementById("add-btn");
    DOM.todoInput = document.getElementById("todo-input");

    DOM.addBtn.addEventListener("click", () => {
      
        CommandExecutor.execute(new Command(Commands.ADD))
    })

    DOM.todoList.addEventListener("click", event => {
     
        if (event.target.classList.contains("delete-btn")) {
            const todo = event.target.parentNode.dataset.text;
            const cmd = new Command(Commands.DELETE, [todo])
            CommandExecutor.execute(cmd);
        }
    })
   //    renderList();
   TodoList.getInstance().addObserver(renderList);
   LocalStorage.load();
})

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault(); 
        const cmd = new Command(Commands.ADD);
        CommandExecutor.execute(cmd);
    }
    if (event.ctrlKey && event.key === 'z') {
        event.preventDefault(); 
        const cmd = new Command(Commands.UNDO);
        CommandExecutor.execute(cmd);
    }    
});

function renderList() {
    DOM.todoList.innerHTML = "";
    const list = TodoList.getInstance()
    for (let todo of list.items) {
        const listItem = document.createElement("li");
        listItem.classList.add("todo-item");
        listItem.innerHTML = `
        ${todo.text} <button class='delete-btn'>Delete</button>
        `;
        listItem.dataset.text = todo.text;
        DOM.todoList.appendChild(listItem);
    }

}