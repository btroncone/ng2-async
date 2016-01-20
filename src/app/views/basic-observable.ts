import {Component} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'basic-observable',
    pipes: [AsyncPipe],
    template: `
    <h2>Current Total (Async Pipe): {{timerAsync | async}}</h2>
    <h2>Current Total (Non-Async Pipe): {{timer}}</h2>
    `
})
export class BasicObservable{
    //async pipe will manually subscribe to observable, updating the view when new values are emitted
    timerAsync = Observable.interval(1000).startWith(0);
    timer: number;
    //without async pipe we need to manually update variable to be used in template each time a new value is emitted
    timerBase = Observable.interval(1000).startWith(0).subscribe(num => this.timer = num);
}