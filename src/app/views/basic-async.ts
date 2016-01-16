import {Component} from "angular2/core";
import {AsyncPipe} from "angular2/common";
import {SampleService} from "../services/sample-service";

@Component({
    template:`
    <button class="pure-button" (click)="testBasePromise()">Test Base Promise</button>
    <button class="pure-button" (click)="testNgHttp()">Test Angular Http</button>
    <button class="pure-button" (click)="testBasePromiseNoAsyncPipe()">Test Base Promise (No Async Pipe)</button>
    <button class="pure-button" (click)="testNgHttpNoAsyncPipe()">Test Angular Http (No Async Pipe)</button>
    <div class="pure-g">
        <div class="pure-u-1-4">
            <p>{{basePromiseResponse | async | json}}</p>
        </div>
        <div class="pure-u-1-4">
            <p>{{ngHttpResponse | async | json}}</p>
        </div>
        <div class="pure-u-1-4">
            <p>{{basePromiseReponseNoAsyncPipe | json}}</p>
        </div>
        <div class="pure-u-1-4">
            <p>Thirds</p>
        </div>
    </div>
    `,
    pipes: [AsyncPipe]
})
export class BasicAsync{
    basePromiseResponse;
    ngHttpResponse;
    basePromiseReponseNoAsyncPipe;
    ngHttpResponseNoAsyncPipe;

    constructor(
        private sampleService : SampleService
    ){}

    testBasePromise(){
        this.basePromiseResponse = this.sampleService.sampleBasicPromise();
    }

    testNgHttp(){
        this.ngHttpResponse = this.sampleService.sampleNgHttp('btroncone');
    }

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