import {Injectable} from "angular2/core";
import {Http} from "angular2/http";

@Injectable()
export class SampleService{
    constructor(
        private http:Http
    ){}

    sampleBasicPromise(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve([
                    {
                        name: 'Joe Smith'
                    },
                    {
                        name: 'Bob Jones'
                    }
                ])
            }, 2000);
        });
    };

    sampleNgHttp(userName : string){
        return this.http
                    .get(`https://api.github.com/users/${userName}/orgs`)
                    .map(res => res.json())
                    .toPromise();
    }
}