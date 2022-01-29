import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { isNil } from 'lodash-es';
import { SpinnerService } from '../../core/services/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public spinnerService: SpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.show();

    const hideFactory = () => {
      let hidden = false;
      return () => {
        if (!hidden) {
          hidden = true;
          this.spinnerService.hide();
        }
      };
    };
    const hideAction = hideFactory();
    return next.handle(req).pipe(
      filter(res => isNil(res.type) || res.type === HttpEventType.Response),
      tap(hideAction, hideAction, hideAction)
    );
  }
}
