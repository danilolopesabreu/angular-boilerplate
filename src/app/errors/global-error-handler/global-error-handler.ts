import { environment } from 'src/environments/environment';
import { ServerLogService } from './server-log.service';
import { UserService } from './../../core/user/user.service';
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as stacktrace from 'stacktrace-js';
import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{
    
    constructor(private injector: Injector) {}

    handleError(error: any): void {
        
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const logService = this.injector.get(ServerLogService);
        const router = this.injector.get(Router);

        const url = location instanceof PathLocationStrategy ? location.path() : '';

        console.log('custom error handler')

        const message = error.message ? error.message : error.toString();

        environment.production ? router.navigate(['/error']) : '';
        
        stacktrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n');
            
            logService.log({
                message, 
                url, 
                userName:userService.getUserName(), 
                stack:stackAsString
            }).subscribe(
                () => console.log('Error logged on server', message),
                err => {
                    console.log(err);
                    console.log('fail to send error log to server')
                }
            );
        });

    }

}