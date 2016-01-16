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
    private updates: Subject<TodoOperation> = new Subject<TodoOperation>();
    private create: Subject<Todo> = new Subject<Todo>();
    private delete: Subject<Todo> = new Subject<Todo>();
    private toggleStatus: Subject<Todo> = new Subject<Todo>();


    constructor(){
        this.updates
            .scan((todos : Todo[], operation: TodoOperation) => {
                return operation(todos);
            }, [])
            .subscribe(this.todos);

        this.create
            .map((todo : Todo) => (state : Todo[]) => {
                return [
                    ...state,
                    todo
                ];
            })
            .subscribe(this.updates);

        this.delete
            .map((todo : Todo) => (state: Todo[]) => {
                const todoIndex = state.indexOf(todo);
                return[
                    ...state.slice(0, todoIndex),
                    ...state.slice(todoIndex + 1)
                ]
            })
            .subscribe(this.updates);

        this.toggleStatus
            .map((todo: Todo) => (state: Todo[]) => {
                return state.map((todoItem : Todo) => {
                    if(todoItem === todo){
                        todoItem.complete = !todoItem.complete;
                    }
                    return todoItem;
                });
            })
            .subscribe(this.updates);
    }

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