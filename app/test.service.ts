import {Injectable} from 'angular2/core';

//declare var Firebase: any;

@Injectable()
export class TestService {
    ref: Firebase;

    constructor(/*_environment: Environment*/) {
        this.ref = new Firebase('_environment.firebaseUrl');
    }

    addNotification = (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            /*this.refNotifications.push("test", () => {
                resolve(true);
            });*/
        });
    }
}