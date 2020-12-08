import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../model/auth-user';
import { Credentials } from '../model/dto/credentials';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSource = new ReplaySubject<AuthUser>(1);
  public currentUser$: Observable<AuthUser>;
  private currentUser: AuthUser;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUser$ = this.currentUserSource.asObservable();
    this.currentUser$.subscribe(res => {
      this.currentUser = res;
    });
  }

  login(credenciais: Credentials): Observable<HttpResponse<any>> {
    return this.http.post(
      `${environment.springboot.baseURL}/login`,
      credenciais,
      {
        observe: 'response',
        responseType: 'json'
      }
    ).pipe(tap(res => {
      const auth = res.headers.get('Authorization');
      if (auth) {
        this.successfulLogin(auth);
      }
    }));
  }

  logout(): void {
    this.setAcessToken(null);
    this.currentUserSource.next(undefined);
    this.router.navigate([environment.loginPage]);
  }

  successfulLogin(authorizationValue: string): void {
    let token = authorizationValue;
    if (token.substring(0, 7) === 'Bearer ') {
      token = token.substring(7);
    }
    this.setAcessToken(token);
    this.currentUserSource.next(this.decodeToken(token));
  }

  getCurrentUser(): AuthUser {
    if (!this.currentUser) {
      if (this.isAuthenticated()) {
        const aToken = this.getAcessToken();
        if (aToken) {
          this.currentUserSource.next(this.decodeToken(aToken));
        }
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    const aToken = this.getAcessToken();
    if (aToken) {
      return !this.jwtHelper.isTokenExpired(aToken);
    }
    return false;
  }

  hasPermission(permission: string): boolean {
    let has = false;
    if (this.getCurrentUser()) {
      this.currentUser.permissions.forEach(a => {
        if (a === permission) {
          has = true;
        }
      });
    }
    return has;
  }

  decodeToken(token: string): AuthUser {
    const usuario: AuthUser = {
      id: this.jwtHelper.decodeToken(token).id,
      nome: this.jwtHelper.decodeToken(token).nome,
      email: this.jwtHelper.decodeToken(token).sub,
      token,
      permissions: this.jwtHelper.decodeToken(token).permissions
    };
    return usuario;
  }

  setAcessToken(token: string | null): void {
    if (token == null) {
      localStorage.removeItem(environment.storage.accessTokenKey);
    } else {
      localStorage.setItem(environment.storage.accessTokenKey, token);
    }
  }

  getAcessToken(): string | null {
    return localStorage.getItem(environment.storage.accessTokenKey);
  }
}
