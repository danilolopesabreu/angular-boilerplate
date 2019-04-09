import { LoadingService } from './loading.service';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpSentEvent } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class LoadingInterceptor implements HttpInterceptor{
    
    constructor(private loadingService:LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpSentEvent
        | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> 
        | HttpUserEvent<any>> {
        
        return next.handle(req)
            .pipe(tap(event => {
                if(event instanceof HttpResponse){
                    this.loadingService.stop();
                }else{
                    this.loadingService.start();
                }
            }
        ));

    }

}