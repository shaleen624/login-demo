import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CommonService } from './common.service';

@Injectable()
export class AppInterceptorService implements HttpInterceptor {

  constructor(private commonService: CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('processing request', request);
    this.commonService.loading = true;
    // const customReq = request.clone({
    //   // headers: request.headers.set('app-language', 'it')
    // });

    return next
      .handle(request)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          console.log('processing response', ev);
          setTimeout(() => {
            this.commonService.loading = false;
          }, 2000);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }

        return Observable.throw(response);
      });
  }

}
