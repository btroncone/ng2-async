import {Component} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {SampleService} from "../services/sample-service";

@Component({
    template:`
    <button class="pure-button" (click)="testBasePromise()">Test Base Promise</button>
    <button class="pure-button" (click)="testBasePromiseNoAsyncPipe()">Test Base Promise (No Async Pipe)</button>
    <div class="pure-g">
        <div class="pure-u-1-2">
            <p>{{basePromiseResponse | async | json}}</p>
        </div>
        <div class="pure-u-1-2">
            <p>{{basePromiseResponseNoAsyncPipe | json}}</p>
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