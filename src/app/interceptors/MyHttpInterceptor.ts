import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, from, Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(
    private snackbar: SnackbarService,
    private loadingService: LoadingService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);
    return next.handle(request).pipe(
      retry(1), catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
          console.log(errorMessage);
        } else {
          // server-side error
          if (error.status === 0) {
            this.snackbar.open('Não foi possível fazer conexão com o servidor');
            return EMPTY;
          }
        }
        return throwError(error);
      }), finalize(() => this.loadingService.setLoading(false, request.url))
    ).toPromise();
  }
}

export const HttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MyHttpInterceptor,
  multi: true
};
