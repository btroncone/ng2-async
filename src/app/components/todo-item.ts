import {Component, Input, Output, EventEmitter} from "angular2/core";
import {Todo} from "../services/Todo-Service";

@Component({
    selector: 'todo-item',
    styles: [
        `
        .complete{
            text-decoration: line-through;
        }
        `
    ],
    template: `
    <section class="post">
        <header class="post-header">
            <h2 class="post-title" [class.complete]="todo.complete">{{todo.description}}</h2>
            <p class="post-meta">
                <button [ngClass]="{'post-category-design': !todo.complete, 'post-category-js': todo.complete}"
                        class="post-category"
                        (click)="toggleTodo.emit(todo)">
                    {{todo.complete ? 'Undo' : 'Complete'}}
                </button>
                <button class="post-category post-category-js"
                        (click)="deleteTodo.emit(todo)">
                    Delete
                </button>
            </p>
        </header>
    </section>
    `
})
export class TodoItem{
    @Input() todo : Todo;
    @Output() toggleTodo = new EventEmitter<Todo>();
    @Output() deleteTodo = new EventEmitter<Todo>();
}