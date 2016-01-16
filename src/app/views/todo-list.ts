import {Component, ChangeDetectionStrategy} from "angular2/core";
import {TodoService, Todo} from "../services/Todo-Service";
import {TodoItem} from "./../components/todo-item";
import {AsyncPipe, AbstractControl, ControlGroup, FormBuilder, Validators} from "angular2/common";

@Component({
    selector: 'todo-list',
    providers: [TodoService],
    template: `
    <h1 class="content-subhead">Todo List</h1>
        <form [ngFormModel]="todoForm"
              (ngSubmit)="addTodo(todoForm.value)">
            <input type="text" #todoInput [ngFormControl]="todoDescription"/>
            <div [hidden]="todoForm.valid || !todoForm.dirty">
                Todo Description is Required
            </div>
            <button type="submit" [disabled]="!todoForm.valid"> Add Todo</button>
        </form>
        <todo-item
            *ngFor="#todo of todoService.todos | async"
            [todo]="todo"
            (deleteTodo)="todoService.deleteTodo($event)"
            (toggleTodo)="todoService.toggleTodo($event)">
        </todo-item>
    `,
    directives: [TodoItem],
    pipes: [AsyncPipe],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoList{
    todoForm : ControlGroup;
    todoDescription: AbstractControl;

    constructor(private todoService : TodoService, private fb : FormBuilder){
        this.todoForm = fb.group({
            'todoDescription': ['', Validators.required]
        });
        this.todoDescription = this.todoForm.controls['todoDescription'];
    }

    addTodo(form){
        const { todoDescription } = form;
        this.todoService.createTodo({
            description: todoDescription,
            complete: false
        });
        this.todoDescription.updateValue('');
    }

}