import {Component} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {SampleService} from "../services/sample-service";

@Component({
    template:`
    <div class="pure-g">
        <div class="pure-u-1-2">
            <button class="pure-button" (click)="testBasePromise()">Test Base Promise</button>
            <ul>
                <li *ngFor="#item of basePromiseResponse | async">
                    {{item.name}}
                </li>
            </ul>
        </div>
        <div class="pure-u-1-2">
            <button class="pure-button" (click)="testBasePromiseNoAsyncPipe()">Test Base Promise (No Async Pipe)</button>
            <ul>
                <li *ngFor="#item of basePromiseResponseNoAsyncPipe">
                    {{item.name}}
                </li>
            </ul>
        </div>
    </div>
    `,
    pipes: [AsyncPipe]
})
export class BasicAsync{
    basePromiseResponse;
    basePromiseResponseNoAsyncPipe;

    constructor(
        private sampleService : SampleService
    ){}

    testBasePromise(){
        this.basePromiseResponse = this.sampleService.sampleBasicPromise();
    }

    testBasePromiseNoAsyncPipe(){
        this.sampleService.sampleBasicPromise().then(res => {
            this.basePromiseResponseNoAsyncPipe = res;
        });
    }

}