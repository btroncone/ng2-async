import {Component} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {SampleService} from "../services/sample-service";

@Component({
    template:`
    <button class="pure-button" (click)="sampleService.sampleBasicPromise()">Test Base Promise</button>
    <button class="pure-button" (click)="sampleService.sampleNgHttp('btroncone')">Test Angular Http</button>
    <button class="pure-button" (click)="testNgHttpNoAsyncPipe()">Test Angular Http (No Async Pipe)</button>
    <button class="pure-button" (click)="testBasePromiseNoAsyncPipe()">Test Base Promise (No Async Pipe)</button>
    <div class="pure-g">
        <div class="pure-u-1-4">
            <p>{{basePromiseResponse | async}}</p>
        </div>
        <div class="pure-u-1-4">
            <p>{{ngHttpResponse | async}}</p>
        </div>
        <div class="pure-u-1-4">
            <p>Thirds</p>
        </div>
        <div class="pure-u-1-4">
            <p>Thirds</p>
        </div>
    </div>
    `,
    pipes: [AsyncPipe]
})
export class BasicAsync{
    basePromiseReponseNoAsyncPipe;
    ngHttpResponseNoAsyncPipe;

    constructor(
        private sampleService : SampleService
    ){}

    testBasePromiseNoAsyncPipe(){
        this.sampleService.sampleBasicPromise().then(res => {
            this.basePromiseReponseNoAsyncPipe = res;
        });
    }

    testNgHttpNoAsyncPipe(){
        this.sampleService.sampleNgHttp('btroncone').subscribe(res => {
            this.ngHttpResponseNoAsyncPipe = res;
        });
    }
}