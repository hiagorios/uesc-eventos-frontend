import { AuthService } from './../services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const acessToken = this.auth.getAcessToken();

    const N = environment.springboot.baseURL.length;
    const requestToAPI = req.url.substring(0, N) === environment.springboot.baseURL;

    if (acessToken && requestToAPI) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + acessToken) });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
