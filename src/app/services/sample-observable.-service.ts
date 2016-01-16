import {Injectable} from "angular2/core";
import {ReplaySubject} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";

@Injectable()
export class SampleObservableService{
    public total : ReplaySubject<number> = new ReplaySubject<number>();
    public add : Subject<number> = new Subject<number>();

    constructor(){
        this.total
            .scan((acc : number, curr : number) => {
                return acc + curr;
            }, 0);
    }
}