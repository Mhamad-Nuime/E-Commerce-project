import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(){
    console.log(`hi I'm interceptor instance`);
  }
  loaderService = inject(LoaderService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`catch the request before be sending.....`)
    this.loaderService.isLoad.next(false);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.loaderService.isLoad.next(true);
        }
      )
    )
  }
}
