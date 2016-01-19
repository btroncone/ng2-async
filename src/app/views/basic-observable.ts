import {Component} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {Observable} from "rxjs/Observable";

@Component({
    template: 'basic-observable',
    pipes: [AsyncPipe],
    template: `
    <h2>Current Total (Async Pipe): {{timerAsync | async}}</h2>
    <h2>Current Total (Non-Async Pipe): {{timer}}</h2>
    `
})
export class BasicObservable{
    timerAsync = Observable.interval(1000).startWith(0);
    timer: number;
    timerBase = Observable.interval(1000).startWith(0).subscribe(num => this.timer = num);
}