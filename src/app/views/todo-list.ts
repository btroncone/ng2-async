import {Component, ChangeDetectionStrategy} from "angular2/core";
import {TodoService, Todo} from "../services/todo-service";
import {TodoItem} from "./../components/todo-item";
import {AsyncPipe, AbstractControl, ControlGroup, FormBuilder, Validators} from "angular2/common";

@Component({
    selector: 'todo-list',
    providers: [TodoService],
    template: `
    <form [ngFormModel]="todoForm"
          (ngSubmit)="addTodo(todoForm.value)"
          class="pure-form">
        <fieldset>
            <legend>Todo List</legend>
            <input type="text" #todoInput [ngFormControl]="todoDescription" placeholder="Enter Todo..."/>
            <button class="pure-button"
            type="submit"
            [class.pure-button-disabled]="!todoForm.valid"
            [disabled]="!todoForm.valid">
                Add Todo
            </button>
        </fieldset>
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
            'todoDescription': ['', Validators.compose([
                Validators.required,
                Validators.minLength(4)
            ])]
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