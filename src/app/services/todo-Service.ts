import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/Rx";

export interface Todo{
    description: string,
    complete: boolean
}

export interface TodoOperation{
    (todos : Todo[] | any): Todo[];
}

@Injectable()
export class TodoService{
    public todos: ReplaySubject<Todo[]> = new ReplaySubject<Todo[]>();
    private updateTodos: Subject<TodoOperation> = new Subject<TodoOperation>();
    private create: Subject<Todo> = new Subject<Todo>();
    private delete: Subject<Todo> = new Subject<Todo>();
    private toggleStatus: Subject<Todo> = new Subject<Todo>();


    constructor(){
        this.updateTodos
            .scan((todos : Todo[], operation: TodoOperation) => {
                return operation(todos);
            }, [])
            .subscribe(this.todos);
        //emit function to add new todo to current array of todo's
        this.create
            .map((todo : Todo) => (state : Todo[]) => {
                return [
                    ...state,
                    todo
                ];
            })
            //subscribe the updates stream to emitted functions
            .subscribe(this.updateTodos);
        //emit function to apply appropriate deletion transformation to current state
        this.delete
            .map((todo : Todo) => (state: Todo[]) => {
                const todoIndex = state.indexOf(todo);
                return[
                    ...state.slice(0, todoIndex),
                    ...state.slice(todoIndex + 1)
                ]
            })
            //subscribe the updates stream to emitted functions
            .subscribe(this.updateTodos);
        //emit function to toggle appropriate todo
        this.toggleStatus
            .map((todo: Todo) => (state: Todo[]) => {
                return state.map((todoItem : Todo) => {
                    if(todoItem === todo){
                        todoItem.complete = !todoItem.complete;
                    }
                    return todoItem;
                });
            })
            //subscribe the updates stream to emitted functions
            .subscribe(this.updateTodos);
    }
    //public api used by controller, simply calls appropriate 'next' function adding value to stream,
    //ultimately applying appropriate state transformation in this.updateTodos
    createTodo(todo: Todo){
        this.create.next(todo);
    }

    deleteTodo(todo: Todo){
        this.delete.next(todo);
    }

    toggleTodo(todo: Todo){
        this.toggleStatus.next(todo);
    }

}