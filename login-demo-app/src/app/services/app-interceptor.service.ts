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
import 'rxjs/add/operator/finally';
import { CommonService } from './common.service';

@Injectable()
export class AppInterceptorService implements HttpInterceptor {

  constructor(private commonService: CommonService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('processing request', request);
    // For showing loading. . . when a request starts.
    this.commonService.loading = true;

    return next
      .handle(request)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          console.log('processing response', ev);
        }
      })
      .catch(response => {
        if (response instanceof HttpErrorResponse) {
          console.log('Processing http error', response);
        }
        return Observable.throw(response);
      })
      .finally(() => {
        console.log('Finally.. hiding the loading message.');
        // Adding a delay of 2 sec to make the loading message visible.
        setTimeout(() => {
          this.commonService.loading = false;
        }, 2000);
      });
  }

}
